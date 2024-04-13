import { LOCALE_KEY } from '@/constants'
import { LocaleService } from '@/i18n/ctx'
import { RequestWithUser } from '@/interfaces/auth.interface'
import { ConversationLiveChatService } from '@/services/conversation-live-chat.service'
import { MessageService } from '@/services/message.service'
import { catchAsync } from '@/utils/catch-async'
import { StatusCodes } from 'http-status-codes'
import Container from 'typedi'

export class ConversationLiveChatController {
  private readonly conversationLiveChatService = Container.get(
    ConversationLiveChatService,
  )

  private readonly localeService = Container.get<LocaleService>(LOCALE_KEY)

  private readonly messageService = Container.get(MessageService)

  public createConversation = catchAsync(async (req, res) => {
    const data = await this.conversationLiveChatService.createConversation(
      req.body,
    )

    res.status(StatusCodes.OK).json({
      message: this.localeService
        .i18n()
        .CONVERSATION_LIVE_CHAT.CREATE_SUCCESS(),
      data,
    })
  })

  public getConversations = catchAsync(async (req: RequestWithUser, res) => {
    const data = await this.conversationLiveChatService.getConversations(
      req.user.id as string,
      req.query as any,
    )

    res.status(StatusCodes.OK).json({ data })
  })

  public getMessages = catchAsync(async (req: RequestWithUser, res) => {
    const data = await this.messageService.getMessages({
      channelId: req.params.channelId,
      userId: req.params.userId,
    })

    res.status(StatusCodes.OK).json({ data })
  })
}
