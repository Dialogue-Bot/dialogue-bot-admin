import { IsNotEmpty, IsString } from 'class-validator'

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  priceSubscriptionId: string

  @IsString()
  @IsNotEmpty()
  successUrl: string

  @IsString()
  @IsNotEmpty()
  cancelUrl: string

  @IsString()
  @IsNotEmpty()
  billingPortalReturnUrl: string
}

export class CreateBillingPortalSessionDto {
  @IsString()
  @IsNotEmpty()
  returnUrl: string
}
