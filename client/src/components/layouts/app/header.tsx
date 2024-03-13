import ButtonLang from '@/components/btn-lang'
import { useAppLayoutStore } from '@/store/use-app-layout'

export const Header = () => {
  const { title } = useAppLayoutStore()
  return (
    <header className='fixed h-header left-sidebar top-0 right-0 bg-background border-b border-border shadow-sm px-6 flex items-center justify-between z-50'>
      <span className='text-lg font-semibold'>{title}</span>
      <ButtonLang />
    </header>
  )
}
