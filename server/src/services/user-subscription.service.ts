import { db } from '@/database/db'
import { plans, userSubscriptions } from '@/database/schema'
import { logger } from '@/utils/logger'
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
        logger.error(
          `[UserSubscriptionService] Plan ${stripePlanFree.name} not found`,
        )

        return
      }

      logger.info(
        `Receive stripe plan ${stripePlanFree.name} and plan ${plan.image}`,
      )

      logger.info(
        `[UserSubscriptionService] Try to init free subscription for user ${email}`,
      )

      const stripeSubscription = await this.stripeService.createSubscription({
        customer_email: email,
        items: [
          {
            price: plan.stripePriceId,
            quantity: 1,
          },
        ],
      })

      const user = await this.userService.findOneByEmail(email)

      if (!user) {
        logger.error(
          `[UserSubscriptionService] User with email ${email} not found`,
        )

        return
      }

      const userSubscription = await this.upsertSubscription({
        email,
        stripeProductId: stripePlanFree.id,
        startedAt: new Date(),
        endedAt: new Date(stripeSubscription.current_period_end * 1000),
      })

      logger.info(
        `[UserSubscriptionService] Free subscription for user ${email} created successfully`,
      )

      return userSubscription
    } catch (error) {
      logger.error(
        `[UserSubscriptionService] Error while init free subscription for user ${email}`,
        error,
      )
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
      totalChannels: plan?.maxChannels,
      totalFlows: plan?.maxFlows,
    }
  }

  async checkIsUsageExceed(
    userId: string,
    {
      forChannel,
      forFlow,
      forTemplate,
    }: {
      forChannel?: boolean
      forFlow?: boolean
      forTemplate?: number
    },
  ) {
    const isAdmin = await this.userService.isAdminAccount(userId)

    if (isAdmin) {
      return false
    }

    const usage = await this.getUsageSubscription(userId)

    if (usage.totalChannels === 0 && forChannel) {
      return false
    }

    if (usage.totalFlows === 0 && forFlow) {
      return false
    }

    if (usage.totalFlows === 0 && forTemplate) {
      return false
    }

    if (usage.numberOfChannels >= usage.totalChannels && forChannel) {
      return true
    }

    if (usage.numberOfFlows >= usage.totalFlows && forFlow) {
      return true
    }

    if (forTemplate && usage.numberOfFlows + forTemplate > usage.totalFlows) {
      return true
    }

    return false
  }
}
