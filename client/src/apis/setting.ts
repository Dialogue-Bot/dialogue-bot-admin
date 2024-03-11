import { ENDPOINTS } from '@/constants'
import http_client from '@/lib/http-client'
import { TSetting } from '@/types/setting'
import { TBaseResponse } from '@/types/share'
import { decrypt, encrypt } from '@/utils'

class SettingApi {
  async getSetting(): Promise<TBaseResponse<TSetting>> {
    const res: TBaseResponse<string> = await http_client.get(
      ENDPOINTS.SETTING.INDEX,
    )

    return {
      data: JSON.parse(decrypt(res.data)),
      message: res.message,
    }
  }

  updateMailSetting(
    data: TSetting['email'],
  ): Promise<TBaseResponse<TSetting['email']>> {
    return http_client.put(ENDPOINTS.SETTING.MAIL, {
      encrypted: encrypt(JSON.stringify(data)),
    })
  }
}

export const settingApi = new SettingApi()
