import { ENDPOINTS } from '@/constants'
import http_client from '@/lib/http-client'
import { TPlan } from '@/types/plan'
import { TBaseResponse } from '@/types/share'

export class PlanApi {
  getAllPlans(): Promise<TBaseResponse<TPlan[]>> {
    return http_client.get(ENDPOINTS.PLANS.INDEX)
  }
}

export const planApi = new PlanApi()
