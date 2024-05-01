import { STRIPE_SECRET_KEY } from '@/config'
import stripe from 'stripe'

const _stripe = new stripe(STRIPE_SECRET_KEY, {
  typescript: true,
})

export default _stripe
