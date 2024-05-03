import { db } from '@/database/db'
import { plans } from '@/database/schema'
import { eq } from 'drizzle-orm'
import Stripe from 'stripe'
import { Service } from 'typedi'
import { StripeService } from './stripe.service'

@Service()
export class PlanService {
  constructor(private readonly stripeService: StripeService) {}

  public async getAllPlans() {
    return db.select().from(plans).orderBy(plans.price)
  }

  /**
   * Seeds subscriptions into the database.
   * Retrieves product and price data from Stripe API,
   * maps the data to the required format, and inserts
   * the values into the database.
   *
   * @returns A promise that resolves to the result of the database insertion.
   */
  public async seedPlans() {
    await db.delete(plans)

    const products = await this.stripeService.getProducts()

    const values = products.map((price) => {
      const product = price.product as Stripe.Product

      const maxFlows =
        product.metadata.max_flows === 'unlimited'
          ? 0
          : parseInt(product.metadata.max_flows)

      const maxChannels =
        product.metadata.max_channels === 'unlimited'
          ? 0
          : parseInt(product.metadata.max_channels)

      return {
        name: product.name,
        stripePriceId: price.id,
        stripeProductId: product.id,
        expirationTime: 30,
        price: price.unit_amount / 100,
        image: product.images[0],
        maxFlows,
        maxChannels,
        features: product.marketing_features,
      } as typeof plans.$inferInsert
    })

    return db.insert(plans).values(values).returning().onConflictDoNothing()
  }

  async getPlanById(id: string) {
    const [plan] = await db
      .select()
      .from(plans)
      .where(eq(plans.id, id))
      .limit(1)

    return plan
  }

  async getPlanByStripeProductId(stripeProductId: string) {
    const [plan] = await db
      .select()
      .from(plans)
      .where(eq(plans.stripeProductId, stripeProductId))
      .limit(1)

    return plan
  }

  async createPlan(plan: typeof plans.$inferInsert) {
    return db.insert(plans).values(plan).returning()
  }

  async updatePlan(
    stripeProductId: string,
    plan: Partial<typeof plans.$inferInsert>,
  ) {
    const existingPlan = await this.getPlanByStripeProductId(stripeProductId)

    if (!existingPlan) {
      return this.createPlan(plan as typeof plans.$inferInsert)
    }

    return db
      .update(plans)
      .set(plan)
      .where(eq(plans.stripeProductId, stripeProductId))
      .returning()
  }

  async deletePlan(stripeProductId: string) {
    return db
      .delete(plans)
      .where(eq(plans.stripeProductId, stripeProductId))
      .returning()
  }
}
