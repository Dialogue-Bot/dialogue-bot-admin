import { db } from '@/database/db'
import { plans, userSubscriptions } from '@/database/schema'
import { and, eq } from 'drizzle-orm'
import { Inject, Service } from 'typedi'
import { ChannelService } from './channels.service'
import { FlowService } from './flows.service'
import { PlanService } from './plan.service'
import { StripeService } from './stripe.service'
import { UserService } from './users.service'

@Service()
export class UserSubscriptionService {
  @Inject((type) => UserService)
  private readonly userService: UserService

  @Inject((type) => ChannelService)
  private readonly channelService: ChannelService

  @Inject((type) => FlowService)
  private readonly flowService: FlowService

  constructor(
    private readonly planService: PlanService,
    private readonly stripeService: StripeService,
  ) {}

  async upsertSubscription({
    email,
    stripeProductId,
    endedAt,
    startedAt,
  }: {
    email: string
    stripeProductId: string
    startedAt: Date
    endedAt: Date
  }) {
    const [user, plan] = await Promise.all([
      this.userService.findOneByEmail(email),
      this.planService.getPlanByStripeProductId(stripeProductId),
    ])

    if (!user || !plan) {
      return
    }

    const userSubscriptionExists = await this.getSubscriptionsByUserId(user?.id)

    if (userSubscriptionExists) {
      return db
        .update(userSubscriptions)
        .set({
          startedAt,
          endedAt,
          planId: plan.id,
        })
        .where(and(eq(userSubscriptions.userId, user.id)))
        .returning()
    }

    const userSubscription = await db
      .insert(userSubscriptions)
      .values({
        planId: plan.id,
        userId: user?.id,
        startedAt,
        endedAt,
      })
      .returning()

    return userSubscription
  }

  async getSubscriptionsByUserIdAndPlanId(userId: string, planId: string) {
    const [subscription] = await db
      .select()
      .from(userSubscriptions)
      .where(
        and(
          eq(userSubscriptions.userId, userId),
          eq(userSubscriptions.planId, planId),
        ),
      )
      .limit(1)

    return subscription
  }

  async getSubscriptionsByUserId(userId: string) {
    const [subscription] = await db
      .select()
      .from(userSubscriptions)
      .where(eq(userSubscriptions.userId, userId))

    return subscription
  }

  async initFreeSubscription(email: string) {
    try {
      const stripePlanFree = await this.stripeService.getProductByPlan('free')

      const plan = await this.planService.getPlanByStripeProductId(
        stripePlanFree.id,
      )

      if (!plan) {
        return
      }

      await this.stripeService.createSubscription({
        customer_email: email,
        items: [
          {
            price: plan.stripePriceId,
            quantity: 1,
          },
        ],
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getCurrentSubscription(
    userId: string,
    opts: {
      with?: {
        plan?: boolean
      }
    },
  ) {
    const subscription = await db.query.userSubscriptions.findFirst({
      where: and(eq(userSubscriptions.userId, userId)),
      with: opts.with?.plan
        ? {
            plan: true,
          }
        : {},
    })

    return subscription
  }

  async getUsageSubscription(userId: string) {
    const [totalChannels, totalFlows, plan] = await Promise.all([
      this.channelService.countTotalChannels(userId),
      this.flowService.countTotalFlows(userId),
      this.getCurrentSubscription(userId, {
        with: {
          plan: true,
        },
      }).then((s: any) => s?.plan as typeof plans.$inferSelect),
    ])

    return {
      numberOfChannels: totalChannels,
      numberOfFlows: totalFlows,
      totalChannels: plan.maxChannels,
      totalFlows: plan.maxFlows,
    }
  }

  async checkIsUsageExceed(
    userId: string,
    {
      forChannel,
      forFlow,
    }: {
      forChannel?: boolean
      forFlow?: boolean
    },
  ) {
    const usage = await this.getUsageSubscription(userId)

    if (usage.totalChannels === 0 && forChannel) {
      return false
    }

    if (usage.totalFlows === 0 && forFlow) {
      return false
    }

    if (usage.numberOfChannels >= usage.totalChannels && forChannel) {
      return true
    }

    if (usage.numberOfFlows >= usage.totalFlows && forFlow) {
      return true
    }

    return false
  }
}
