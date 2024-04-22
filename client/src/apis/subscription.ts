import { ENDPOINTS } from '@/constants'
import http_client from '@/lib/http-client'
import { TBaseResponse } from '@/types/share'
import {
  TCreateBillingPortalSession,
  TCreateSubscriptionCheckoutSession,
} from '@/types/subscription'

export class SubscriptionApi {
  async createCheckoutSession(
    data: TCreateSubscriptionCheckoutSession,
  ): Promise<
    TBaseResponse<{
      sessionId: string
      type: string
      url: string
    }>
  > {
    return http_client.post(
      ENDPOINTS.SUBSCRIPTIONS.CREATE_CHECKOUT_SESSION,
      data,
    )
  }

  async createBillingPortalSession(
    data: TCreateBillingPortalSession,
  ): Promise<TBaseResponse<string>> {
    return http_client.post(
      ENDPOINTS.SUBSCRIPTIONS.CREATE_BILLING_PORTAL_SESSION,
      data,
    )
  }
}

export const subscriptionApi = new SubscriptionApi()
