import { StripeWebhookService } from '@/services/stripe-webhook.service'
import { catchAsync } from '@/utils/catch-async'
import Container from 'typedi'

export class StripeWebhookController {
  private readonly stripeWebhookService = Container.get(StripeWebhookService)

  handleStripeWebhook = catchAsync(async (req, res) => {
    const sig = req.headers['stripe-signature'] as string

    await this.stripeWebhookService.handleStripeWebhook({
      sig,
      body: req['body'],
    })

    res.send()
  })
}
