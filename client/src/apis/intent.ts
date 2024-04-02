import { ENDPOINTS } from '@/constants'
import http_client from '@/lib/http-client'
import { TIntent, TIntentInput } from '@/types/intent'
import { TBaseQuery, TBaseResponse, TResPagination } from '@/types/share'

class IntentApi {
  create(data: TIntentInput): Promise<TBaseResponse<TIntent>> {
    return http_client.post(ENDPOINTS.INTENT.INDEX, data)
  }

  update(id: string, data: TIntentInput): Promise<TBaseResponse<TIntent>> {
    return http_client.put(`${ENDPOINTS.INTENT.INDEX}/${id}`, data)
  }

  delete(id: string): Promise<TBaseResponse<null>> {
    return http_client.delete(`${ENDPOINTS.INTENT.INDEX}/${id}`)
  }

  get(id: string): Promise<TBaseResponse<TIntent>> {
    return http_client.get(`${ENDPOINTS.INTENT.INDEX}/${id}`)
  }

  getAll(q?: TBaseQuery): Promise<TResPagination<TIntent>> {
    return http_client.get(ENDPOINTS.INTENT.INDEX, { params: q })
  }
}

export const intentApi = new IntentApi()
