import { IsString } from 'class-validator'

export class VerifyWebhookDTO {
  @IsString()
  contactId: string
}
