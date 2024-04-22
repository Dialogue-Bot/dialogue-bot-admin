import { Button } from '@/components/ui'
import { ROUTES } from '@/constants'
import { useCreateCheckoutSession } from '@/hooks/subscription/use-create-checkout-session'
import { queryPlansOptions } from '@/lib/query-options/plan'
import { TPlan } from '@/types/plan'
import { useSuspenseQuery } from '@tanstack/react-query'
import { CheckCircle } from 'lucide-react'

const Card = ({ plan }: { plan: TPlan }) => {
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
            billingPortalReturnUrl: `${window.location.origin}${ROUTES.PRIVATE.FLOW.INDEX}`,
            cancelUrl: `${window.location.origin}${ROUTES.PRIVATE.FLOW.INDEX}`,
            successUrl: `${window.location.origin}${ROUTES.PUBLIC.CHECKOUT_SUCCESS}`,
          })
        }
        loading={createCheckoutSession.isPending}
      >
        Choose Plan
      </Button>
    </div>
  )
}

export const Prices = () => {
  const { data } = useSuspenseQuery(queryPlansOptions)
  return (
    <div className='py-10 md:py-20 bg-white'>
      <div className='container'>
        <div className='flex items-center flex-col gap-5 md:gap-10'>
          <div className='flex items-center justify-center flex-col gap-4 md:gap-5'>
            <h2 className='text-3xl md:text-5xl font-bold text-center max-w-2xl'>
              Pricing
            </h2>
            <p className='text-center font-medium text-sm md:text-lg text-muted-foreground'>
              Choose the plan that works best for you.
            </p>
          </div>
          <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
            {data?.map((plan) => {
              return <Card key={plan.id} plan={plan} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Prices
