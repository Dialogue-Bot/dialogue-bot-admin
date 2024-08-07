import { ENDPOINTS } from '@/constants'
import http_client from '@/lib/http-client'
import { TFlowInput } from '@/lib/schema/flow-input'
import { TFLow } from '@/types/flow'
import {
  TBaseQuery,
  TBaseResponse,
  TResPagination,
  TSelectResponse,
} from '@/types/share'

export class FlowApi {
  create(data: TFlowInput): Promise<TBaseResponse<TFLow>> {
    return http_client.post(ENDPOINTS.FLOW.INDEX, data)
  }

  update(id: string, data: TFlowInput): Promise<TBaseResponse<TFLow>> {
    return http_client.put(`${ENDPOINTS.FLOW.INDEX}/${id}`, data)
  }

  delete(id: string): Promise<TBaseResponse<null>> {
    return http_client.delete(`${ENDPOINTS.FLOW.INDEX}/${id}`)
  }

  publish(id: string): Promise<TBaseResponse<TFLow>> {
    return http_client.post(`${ENDPOINTS.FLOW.PUBLISH}/${id}`)
  }

  get(id: string): Promise<TBaseResponse<TFLow>> {
    return http_client.get(`${ENDPOINTS.FLOW.GET_ONE}/${id}`)
  }

  getAll(
    q?: TBaseQuery,
  ): Promise<TResPagination<Pick<TFLow, 'id' | 'name' | 'publishAt'>>> {
    return http_client.get(ENDPOINTS.FLOW.INDEX, { params: q })
  }

  getFlowsForSelect(
    channelId: string,
  ): Promise<TBaseResponse<TSelectResponse<string, string>[]>> {
    return http_client.get(`${ENDPOINTS.FLOW.INDEX}/for-select`, {
      params: { channelId },
    })
  }

  getTemplates(): Promise<TBaseResponse<Array<TFLow>>> {
    return http_client.get(`${ENDPOINTS.FLOW.TEMPLATES}`)
  }

  duplicateTemplate({
    flowName,
    templateName,
  }: {
    flowName: string
    templateName: string
  }): Promise<TBaseResponse<TFLow>> {
    return http_client.post(`${ENDPOINTS.FLOW.DUPLICATE_TEMPLATE}`, {
      flowName,
      templateName,
    })
  }
}

export const flowApi = new FlowApi()
