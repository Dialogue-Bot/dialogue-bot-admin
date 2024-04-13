import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { PagingDTO } from './paging.dto'

export class ConversationLiveChatQueryDto extends PagingDTO {
  @IsString()
  @IsOptional()
  channelId: string
}

export class ConversationLiveChatCreateDto {
  @IsString()
  @IsNotEmpty()
  userId: string

  @IsString()
  @IsNotEmpty()
  channelId: string
}
