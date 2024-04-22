import { ENDPOINTS } from '@/constants'
import http_client from '@/lib/http-client'
import { TBaseResponse } from '@/types/share'
import { TUserSubscription } from '@/types/user-subscription'

export class UserSubscriptionApi {
  async getCurrentUserSubscription(): Promise<
    TBaseResponse<TUserSubscription>
  > {
    return http_client.get(ENDPOINTS.USER_SUBSCRIPTIONS.CURRENT)
  }

  async getUsageSubscription(): Promise<
    TBaseResponse<{
      numberOfChannels: number
      numberOfFlows: number
      totalChannels: number
      totalFlows: number
    }>
  > {
    return http_client.get(ENDPOINTS.USER_SUBSCRIPTIONS.USAGE)
  }
}

export const userSubscriptionApi = new UserSubscriptionApi()
