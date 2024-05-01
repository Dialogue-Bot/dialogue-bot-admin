export type TCreateSubscriptionCheckoutSession = {
  priceSubscriptionId: string
  successUrl: string
  cancelUrl: string
  billingPortalReturnUrl: string
}

export type TCreateBillingPortalSession = {
  returnUrl: string
}
