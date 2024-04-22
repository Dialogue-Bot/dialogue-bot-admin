import { RequestWithUser } from '@/interfaces/auth.interface'
import { SubscriptionService } from '@/services/subscription.service'
import { catchAsync } from '@/utils/catch-async'
import Container from 'typedi'

export class SubscriptionController {
  private readonly subscriptionService = Container.get(SubscriptionService)

  subscribe = catchAsync(async (req: RequestWithUser, res) => {
    const data = await this.subscriptionService.subscribe(
      req.user.email as string,
      req.body,
    )

    // If the subscription is a checkout session, return the session ID
    if (data.type === 'checkout') {
      return res.json({
        data: {
          sessionId: data.session.id,
          type: data.type,
        },
      })
    }

    // Redirect to billing portal
    return res.json({
      data: {
        url: data.session.url,
        type: data.type,
      },
    })
  })

  createBillingPortalSession = catchAsync(async (req: RequestWithUser, res) => {
    const data = await this.subscriptionService.createBillingPortalSession(
      req.user.email as string,
      req.body,
    )

    return res.json({
      data: data.url,
    })
  })
}
