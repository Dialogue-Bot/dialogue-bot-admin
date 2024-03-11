import { SToaster } from '@/components/ui'
import { QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import i18n from './i18n'
import './index.css'
import { queryClient } from './lib/query-client'
import { RouterProvider } from 'react-router-dom'
import { router } from './app'
import { I18nextProvider } from 'react-i18next'

const rootElement = document.getElementById('root')!

if (!rootElement?.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <SToaster position='top-center' />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </I18nextProvider>
    </>,
  )
}
