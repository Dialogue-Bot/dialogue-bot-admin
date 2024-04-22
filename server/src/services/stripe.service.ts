import _stripe from '@/libs/stripe'
import Stripe from 'stripe'
import { Service } from 'typedi'

@Service()
/**
 * Service class for interacting with the Stripe API.
 */
export class StripeService {
  constructor() {}

  /**
   * Creates a new customer in Stripe.
   * If a customer with the same email already exists, returns the existing customer.
   * @param customerData - The data of the customer to create.
   * @returns The created or existing customer object.
   */
  public async createCustomer(customerData: Stripe.CustomerCreateParams) {
    const existingCustomer = await _stripe.customers.list({
      email: customerData.email,
    })

    if (existingCustomer.data.length > 0) {
      return existingCustomer.data[0]
    }

    const customer = await _stripe.customers.create(customerData)

    return customer
  }

  /**
   * Retrieves the list of products from Stripe.
   * @returns The list of product price data.
   */
  public async getProducts() {
    const productPriceData = await _stripe.prices.list({
      expand: ['data.product'],
    })

    return productPriceData.data
  }

  /**
   * Creates a checkout session.
   *
   * @param checkoutData - The data for creating the checkout session.
   * @returns The created checkout session.
   */
  public async createCheckoutSession(
    checkoutData: Stripe.Checkout.SessionCreateParams,
  ) {
    let customer: Stripe.Customer | undefined

    const { customer_email, ...rest } = checkoutData

    if (checkoutData.customer_email) {
      customer = await this.createCustomer({
        email: customer_email,
      })
    }

    const session = await _stripe.checkout.sessions.create({
      ...rest,
      customer: customer?.id,
    })

    return session
  }

  /**
   * Retrieves the active subscription for a customer based on their email.
   * @param email - The email of the customer.
   * @returns The active subscription if found, otherwise null.
   */
  public async getSubscriptionsByCustomerMail(email: string) {
    const customer = await this.createCustomer({
      email,
    })

    const subscriptions = await _stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1,
    })

    return subscriptions.data.length > 0 ? subscriptions.data[0] : null
  }

  public async createBillingPortalSession(email: string, returnUrl: string) {
    const customer = await this.createCustomer({
      email,
    })

    const session = await _stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: returnUrl,
    })

    return session
  }

  public async createSubscription(
    subscriptionData: Omit<Stripe.SubscriptionCreateParams, 'customer'> & {
      customer_email: string
    },
  ) {
    const { customer_email, ...rest } = subscriptionData

    const customer = await this.createCustomer({
      email: customer_email,
    })

    const subscription = await _stripe.subscriptions.create({
      ...rest,
      customer: customer.id,
    })

    return subscription
  }

  public async getProductByPlan(plan: 'free' | 'premium' | 'ultra_medium') {
    const prices = await _stripe.prices.list({
      active: true,
      expand: ['data.product'],
    })

    const products = prices.data.map((p) => {
      const product = p.product as Stripe.Product

      return product
    })

    const product = products.find((p) => p.metadata.plan === plan)

    return product
  }
}
