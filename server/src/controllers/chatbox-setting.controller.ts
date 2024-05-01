import { LOCALE_KEY } from '@/constants'
import { LocaleService } from '@/i18n/ctx'
import { ChatboxSettingService } from '@/services/chatbox-setting.service'
import { catchAsync } from '@/utils/catch-async'
import Container from 'typedi'

export class ChatboxSettingController {
  private readonly chatboxSettingService = Container.get(ChatboxSettingService)
  private readonly localeService = Container.get<LocaleService>(LOCALE_KEY)

  getChatboxSetting = catchAsync(async (req, res) => {
    const data = await this.chatboxSettingService.getChatboxSetting(
      req.params.channelId as string,
    )

    res.json({
      data,
    })
  })

  updateChatboxSetting = catchAsync(async (req, res) => {
    const data = await this.chatboxSettingService.updateChatboxSetting(
      req.params.channelId as string,
      req.body,
    )

    res.json({
      data,
      message: this.localeService
        .i18n()
        .CHANNEL.UPDATE_CHATBOT_SETTING_SUCCESS(),
    })
  })
}
