import { PricingCard } from '@/components/pricing-card'
import { queryPlansOptions } from '@/lib/query-options/plan'
import { useSuspenseQuery } from '@tanstack/react-query'

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
              return <PricingCard key={plan.id} plan={plan} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Prices
