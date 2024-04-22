import { Button } from '@/components/ui'
import { CheckCircle } from 'lucide-react'

const CheckoutSuccess = () => {
  return (
    <div className='min-h-screen pt-header flex items-center justify-center'>
      <div className='container py-10 md:py-20'>
        <div className='flex flex-col items-center gap-4 '>
          <CheckCircle className='w-20 h-20 text-green-500' />
          <h1 className='text-xl md:text-5xl font-bold text-center max-w-2xl mx-auto'>
            Thank you for your purchase!
          </h1>
          <Button>Go to Dashboard</Button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccess
