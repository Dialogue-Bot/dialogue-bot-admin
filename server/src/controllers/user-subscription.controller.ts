import { RequestWithUser } from '@/interfaces/auth.interface'
import { UserSubscriptionService } from '@/services/user-subscription.service'
import { catchAsync } from '@/utils/catch-async'
import { StatusCodes } from 'http-status-codes'
import Container from 'typedi'

export class UserSubscriptionController {
  private readonly userSubscriptionService = Container.get(
    UserSubscriptionService,
  )

  getCurrentUserSubscription = catchAsync(async (req: RequestWithUser, res) => {
    const userSubscription =
      await this.userSubscriptionService.getSubscriptionsByUserId(req.user.id)
    res.json({ data: userSubscription })
  })

  getUsage = catchAsync(async (req: RequestWithUser, res) => {
    const data = await this.userSubscriptionService.getUsageSubscription(
      req.user.id,
    )

    res.status(StatusCodes.OK).json({ data })
  })
}
