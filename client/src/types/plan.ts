export type TPlan = {
  id: string
  expirationTime: number
  maxChannels: number
  maxFlows: number
  features: Array<{
    name: string
  }>
  name: string
  price: number
  stripePriceId: string
  stripeProductId: string
  image: string
}
