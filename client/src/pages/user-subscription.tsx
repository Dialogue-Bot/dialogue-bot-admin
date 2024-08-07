import PageTitle from '@/components/page-title'
import { PricingCard } from '@/components/pricing-card'
import { Progress } from '@/components/ui/progress'
import { queryPlansOptions } from '@/lib/query-options/plan'
import {
  queryCurrentUserSubscription,
  queryUsageSubscription,
} from '@/lib/query-options/user-subscription'
import { cn } from '@/lib/utils'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useDocumentTitle } from 'usehooks-ts'

const calcPercentage = (value: number, max: number) => {
  return (value / max) * 100
}

const UserSubscriptions = () => {
  const { t } = useTranslation(['userSubscriptions', 'common'])
  const { data: userSubscription } = useSuspenseQuery(
    queryCurrentUserSubscription,
  )
  const { data: usage } = useSuspenseQuery(queryUsageSubscription)

  const { data: plans } = useSuspenseQuery(queryPlansOptions)

  useDocumentTitle(t('page_title'))

  return (
    <div className='p-6 space-y-4'>
      <PageTitle>{t('title')}</PageTitle>
      <div className='max-w-4xl mx-auto space-y-4'>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
          {plans?.map((plan) => {
            return (
              <PricingCard
                key={plan.id}
                plan={plan}
                isCurrentPlan={userSubscription?.planId === plan.id}
              />
            )
          })}
        </div>
        <div className='flex flex-col gap-4'>
          <div className='text-lg font-semibold'>{t('usage')}</div>
          <div className='flex space-y-2 flex-col gap-2'>
            <span>
              {t('channels', {
                used: usage.numberOfChannels,
                max: usage.totalChannels === 0 ? '∞' : usage.totalChannels,
              })}
            </span>
            <Progress
              value={
                usage.totalChannels === 0
                  ? 0
                  : calcPercentage(usage.numberOfChannels, usage.totalChannels)
              }
              innerClassName={cn({
                'bg-destructive':
                  calcPercentage(usage.numberOfChannels, usage.totalChannels) >
                  70,
              })}
            />
          </div>
          <div className='flex space-y-2 flex-col gap-2'>
            <span>
              {t('flows', {
                used: usage.numberOfFlows,
                max: usage.totalFlows === 0 ? '∞' : usage.totalFlows,
              })}
            </span>
            <Progress
              value={
                usage.totalFlows === 0
                  ? 0
                  : calcPercentage(usage.numberOfFlows, usage.totalFlows)
              }
              innerClassName={cn({
                'bg-destructive':
                  calcPercentage(usage.numberOfFlows, usage.totalFlows) > 70,
              })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSubscriptions
