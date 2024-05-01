import {
  CreateBillingPortalSessionDto,
  CreateSubscriptionDto,
} from '@/dtos/subscription.dto'
import { Service } from 'typedi'
import { StripeService } from './stripe.service'

@Service()
export class SubscriptionService {
  constructor(private readonly stripeService: StripeService) {}

  /**
   * Subscribes a customer to a price subscription and returns the appropriate session.
   *
   * @param customerId - The ID of the customer.
   * @param priceSubscriptionId - The ID of the price subscription.
   * @param cancelUrl - The URL to redirect the customer to if they cancel the subscription.
   * @param successUrl - The URL to redirect the customer to after a successful subscription.
   * @param billingPortalReturnUrl - The URL to redirect the customer to after accessing the billing portal.
   * @returns An object containing the type of session and the session itself.
   */
  public async subscribe(
    email: string,
    {
      priceSubscriptionId,
      cancelUrl,
      successUrl,
      billingPortalReturnUrl,
    }: CreateSubscriptionDto,
  ) {
    const currentSubscription =
      await this.stripeService.getSubscriptionsByCustomerMail(email)

    if (!currentSubscription) {
      const checkoutSession = await this.stripeService.createCheckoutSession({
        customer_email: email,
        mode: 'subscription',
        success_url: successUrl,
        cancel_url: cancelUrl,
        line_items: [
          {
            price: priceSubscriptionId,
            quantity: 1,
          },
        ],
        payment_method_types: ['card'],
      })

      return {
        type: 'checkout',
        session: checkoutSession,
      }
    }

    const billingPortalSession =
      await this.stripeService.createBillingPortalSession(
        email,
        billingPortalReturnUrl,
      )

    return {
      type: 'billing_portal',
      session: billingPortalSession,
    }
  }

  public async createBillingPortalSession(
    email: string,
    { returnUrl }: CreateBillingPortalSessionDto,
  ) {
    const session = await this.stripeService.createBillingPortalSession(
      email,
      returnUrl,
    )

    return session
  }
}
