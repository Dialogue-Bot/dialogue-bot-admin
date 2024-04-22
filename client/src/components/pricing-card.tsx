import { ROUTES } from '@/constants'
import { useCreateCheckoutSession } from '@/hooks/subscription'
import { TPlan } from '@/types/plan'
import { CheckCircle } from 'lucide-react'
import { Button } from './ui'

type TProps = {
  plan: TPlan
  isCurrentPlan?: boolean
}

export const PricingCard = ({ plan, isCurrentPlan }: TProps) => {
  const createCheckoutSession = useCreateCheckoutSession()

  return (
    <div className='p-4 border border-input shadow-md bg-white rounded-md flex flex-col items-center text-center gap-4'>
      <span className='text-xl font-semibold'>{plan.name}</span>
      <img src={plan.image} alt={plan.name} />
      <div className='flex gap-1'>
        <span className='self-start'>$</span>
        <span className='text-5xl font-bold'>{plan.price}</span>
        <span className='self-end'>/mo</span>
      </div>

      <ul className='flex flex-col gap-1'>
        {plan.features.map((feature, index) => (
          <li key={index} className='font-medium flex items-center gap-2'>
            <CheckCircle className='w-4 h-4 text-green-500' />
            <span>{feature.name}</span>
          </li>
        ))}
      </ul>

      <Button
        className='w-full'
        variant={plan.maxFlows === 6 ? 'default' : 'outline'}
        onClick={() =>
          createCheckoutSession.mutate({
            priceSubscriptionId: plan.stripePriceId,
            billingPortalReturnUrl: window.location.href,
            cancelUrl: window.location.href,
            successUrl: `${window.location.origin}${ROUTES.PUBLIC.CHECKOUT_SUCCESS}`,
          })
        }
        loading={createCheckoutSession.isPending}
        disabled={isCurrentPlan}
      >
        {isCurrentPlan ? 'Current Plan' : 'Choose Plan'}
      </Button>
    </div>
  )
}
