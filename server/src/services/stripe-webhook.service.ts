import { HttpException } from '@/exceptions/http-exception'
import stripe from '@/libs/stripe'
import { logger } from '@/utils/logger'
import { StatusCodes } from 'http-status-codes'
import Stripe from 'stripe'
import { Service } from 'typedi'
import { PlanService } from './plan.service'
import { StripeService } from './stripe.service'
import { UserSubscriptionService } from './user-subscription.service'

const ENDPOINT_SECRET = 'whsec_GX2Faw79vKcK1xeTXhEqWyQCAez0rS0V' // REPLACE WHEN DEPLOYING TO PRODUCTION

@Service()
export class StripeWebhookService {
  constructor(
    private readonly userSubscriptionService: UserSubscriptionService,
    private readonly stripeService: StripeService,
    private readonly planService: PlanService,
  ) {
    this._handleInvoicePaymentSucceeded =
      this._handleInvoicePaymentSucceeded.bind(this)
    this._handleCustomerSubscriptionDeleted =
      this._handleCustomerSubscriptionDeleted.bind(this)
    this._handleProductCreated = this._handleProductCreated.bind(this)
    this._handleProductUpdated = this._handleProductUpdated.bind(this)
    this._handleProductDeleted = this._handleProductDeleted.bind(this)
  }

  async handleStripeWebhook({ body, sig }: { sig: string; body: any }) {
    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, sig, ENDPOINT_SECRET)
    } catch (err) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        `Webhook Error: ${err.message}`,
      )
    }

    logger.info(`[StripeWebhookService] Received event: ${event.type}`)

    const MAP_EVENT_TO_HANDLER: Partial<
      Record<Stripe.Event.Type, (event: Stripe.Event) => Promise<void>>
    > = {
      'invoice.payment_succeeded': this._handleInvoicePaymentSucceeded,
      'product.created': this._handleProductCreated,
      'product.updated': this._handleProductUpdated,
      'product.deleted': this._handleProductDeleted,
      'customer.subscription.deleted': this._handleCustomerSubscriptionDeleted,
    }

    const handler = MAP_EVENT_TO_HANDLER[event.type]

    if (handler) {
      await handler(event)
    }
  }

  private async _handleInvoicePaymentSucceeded(event: Stripe.Event) {
    const invoiceObj = event.data.object as Stripe.Invoice

    const subscription = await stripe.subscriptions.retrieve(
      invoiceObj.subscription as string,
    )

    const [product, customer] = await Promise.all([
      stripe.products.retrieve(
        subscription.items.data[0].price.product as string,
      ),
      stripe.customers
        .retrieve(invoiceObj.customer as string)
        .then((c) => c as Stripe.Customer),
    ])

    if (invoiceObj.billing_reason === 'subscription_create') {
      await this.userSubscriptionService.upsertSubscription({
        email: customer.email as string,
        stripeProductId: product.id,
        startedAt: new Date(subscription.created * 1000),
        endedAt: new Date(subscription.current_period_end * 1000),
      })

      logger.info(
        `[StripeWebhookService] Created subscription for customer ${customer.email}`,
      )
    } else if (
      invoiceObj.billing_reason === 'subscription_cycle' ||
      invoiceObj.billing_reason === 'subscription_update'
    ) {
      await this.userSubscriptionService.upsertSubscription({
        email: customer.email as string,
        stripeProductId: product.id,
        startedAt: new Date(subscription.current_period_start * 1000),
        endedAt: new Date(subscription.current_period_end * 1000),
      })

      logger.info(
        `[StripeWebhookService] User ${customer.email} subscription updated successfully`,
      )
    }
  }

  private async _handleCustomerSubscriptionDeleted(event: Stripe.Event) {
    const subscriptionObj = event.data.object as Stripe.Subscription

    const subscription = await stripe.subscriptions.retrieve(subscriptionObj.id)

    const customer = await stripe.customers
      .retrieve(subscription.customer as string)
      .then((c) => c as Stripe.Customer)

    const planFree = await this.stripeService.getProductByPlan('free')

    await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: planFree.priceId,
          quantity: 1,
        },
      ],
    })

    logger.info(
      `[StripeWebhookService] User ${customer.email} subscription backed to free plan successfully`,
    )
  }

  private async _handleProductCreated(event: Stripe.Event) {
    const product = await this.stripeService.getProductById(
      (event.data.object as Stripe.Product).id,
    )

    await this.planService.createPlan({
      name: product.name,
      stripePriceId: product.price.id,
      stripeProductId: product.id,
      price: product.price.unit_amount / 100,
      image: product.images[0],
      expirationTime: 30,
      features: product.marketing_features.map((f) => {
        return {
          name: f.name,
        }
      }),
      maxChannels:
        product.metadata.max_channels === 'unlimited'
          ? 0
          : parseInt(product.metadata.max_channels),
      maxFlows:
        product.metadata.max_flows === 'unlimited'
          ? 0
          : parseInt(product.metadata.max_flows),
    })

    logger.info(
      `[StripeWebhookService] Created plan for product ${product.name}`,
    )
  }

  private async _handleProductUpdated(event: Stripe.Event) {
    const product = await this.stripeService.getProductById(
      (event.data.object as Stripe.Product).id,
    )

    await this.planService.updatePlan(product.id, {
      name: product.name,
      stripePriceId: product.price.id,
      stripeProductId: product.id,
      price: product.price.unit_amount / 100,
      image: product.images[0],
      expirationTime: 30,
      features: product.marketing_features.map((f) => {
        return {
          name: f.name,
        }
      }),
      maxChannels:
        product.metadata.max_channels === 'unlimited'
          ? 0
          : parseInt(product.metadata.max_channels),
      maxFlows:
        product.metadata.max_flows === 'unlimited'
          ? 0
          : parseInt(product.metadata.max_flows),
      archived: product.active,
    })

    logger.info(
      `[StripeWebhookService] Updated plan for product ${product.name}`,
    )
  }

  private async _handleProductDeleted(event: Stripe.Event) {
    const product = event.data.object as Stripe.Product

    await this.planService.deletePlan(product.id)

    logger.info(
      `[StripeWebhookService] Deleted plan for product ${product.name}`,
    )
  }
}
