import { db } from '@/database/db'
import { chatboxSettings } from '@/database/schema'
import { ChatboxSettingDto } from '@/dtos/chatbox-setting.dto'
import { eq } from 'drizzle-orm'
import { Service } from 'typedi'
import { ChannelService } from './channels.service'

@Service()
export class ChatboxSettingService {
  constructor(private readonly channelService: ChannelService) {}

  async getChatboxSetting(contactId: string) {
    const channel = await this.channelService.findOneByContactId(contactId)

    if (channel.channelType !== 'WEB') return null
    const chatboxSetting = await db.query.chatboxSettings.findFirst({
      where: eq(chatboxSettings.channelId, channel.id),
    })

    if (!chatboxSetting) {
      const [newChatboxSetting] = await db
        .insert(chatboxSettings)
        .values({
          channelId: channel.id,
        })
        .returning()

      return newChatboxSetting
    }

    return chatboxSetting
  }

  async updateChatboxSetting(channelId: string, data: ChatboxSettingDto) {
    const [updated] = await db
      .update(chatboxSettings)
      .set(data)
      .where(eq(chatboxSettings.channelId, channelId))
      .returning()

    return updated
  }
}
