import { Button, Input } from '@/components/ui'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
gsap.registerPlugin(ScrollTrigger)
export const JoinNewsletter = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const h2Ref = useRef<HTMLHeadingElement | null>(null)
  const pRef = useRef<HTMLParagraphElement | null>(null)
  const inputRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation(['landingPage', 'forms'])

  // useGSAP(() => {
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: containerRef.current,
  //       start: '-10% center',
  //       end: 'bottom bottom',
  //       scrub: 1,
  //     },
  //   })

  //   tl.from(h2Ref.current, {
  //     opacity: 0,
  //     y: 50,
  //     duration: 0.5,
  //     ease: 'power3.out',
  //   })
  //     .from(pRef.current, {
  //       opacity: 0,
  //       y: 50,
  //       duration: 0.5,
  //       ease: 'power3.out',
  //     })
  //     .from(inputRef.current, {
  //       opacity: 0,
  //       y: 50,
  //       duration: 0.5,
  //       ease: 'power3.out',
  //     })
  // }, [])

  return (
    <div className='py-10 md:py-20 bg-white' ref={containerRef}>
      <div className='container'>
        <div className='flex items-center flex-col gap-5 md:gap-10'>
          <div className='flex items-center justify-center flex-col gap-4 md:gap-5'>
            <h2
              className='text-3xl md:text-5xl font-bold text-center max-w-2xl'
              ref={h2Ref}
            >
              {t('join_out_newsletter')}
            </h2>
            <p
              className='text-center font-medium text-sm md:text-lg text-muted-foreground'
              ref={pRef}
            >
              {t('join_out_newsletter_subtitle')}
            </p>
          </div>
          <div
            className='flex items-center justify-center gap-3 max-w-2xl w-full md:flex-row flex-col'
            ref={inputRef}
          >
            <Input
              placeholder={t('forms:email.placeholder')}
              className='max-w-96 w-full flex-1 h-9'
              type='email'
            />
            <Button className='w-full md:w-auto'>
              {t('join_out_newsletter_button')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JoinNewsletter
