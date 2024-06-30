import flows from '@/assets/flows.png'
import { Badge, buttonVariants } from '@/components/ui'
import { ROUTES } from '@/constants'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

// million-ignore
const Sparkle = ({
  className,
  index,
}: {
  className?: string
  index: number
}) => {
  const [left, setLeft] = useState(Math.floor(Math.random() * 100))

  useEffect(() => {
    const interval = setInterval(
      () => {
        setLeft(Math.floor(Math.random() * 100))
      },
      4000 + index * 500,
    )

    return () => clearInterval(interval)
  })

  return (
    <div
      className={cn('absolute h-6 w-6 flex opacity-0 ease-in-out', className)}
      style={{
        animationName: 'fadeInOut',
        animationDuration: '4s',
        animationIterationCount: 'infinite',
        left: `${left}%`,
        animationDelay: `${index * 0.5}s`,
        top: index % 2 === 0 ? '0' : '80%',
      }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='23'
        height='23'
        viewBox='0 0 23 23'
        fill='none'
      >
        <path
          d='M10.9188 20.4728C10.9188 15.5719 7.42828 12.0812 2.52723 12.0812C1.82426 12.0126 1.82426 10.9874 2.52723 10.9188C7.42828 10.9188 10.9188 7.42836 10.9188 2.52723C10.9874 1.82425 12.0126 1.82426 12.0812 2.52723C12.0812 7.42836 15.5718 10.9188 20.4728 10.9188C21.1757 10.9874 21.1757 12.0126 20.4728 12.0812C15.5718 12.0812 12.0812 15.5719 12.0812 20.4728C12.0126 21.1757 10.9874 21.1757 10.9188 20.4728Z'
          fill='white'
          stroke='#FACC15'
          stroke-width='3'
          stroke-linejoin='round'
        ></path>
      </svg>
    </div>
  )
}

const AIChatbots = () => {
  return (
    <>
      <br className='md:hidden' />
      <span className='bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent relative'>
        Script Chatbots{' '}
        {[1, 2, 3, 4, 5].map((i) => (
          <Sparkle key={i} index={i} />
        ))}
      </span>{' '}
      <br />
    </>
  )
}

// million-ignore
export const Hero = () => {
  const { t } = useTranslation('landingPage')
  const h1Ref = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // useGSAP(() => {
  //   const tl = gsap.timeline()

  //   tl.from(badgeRef.current, {
  //     opacity: 0,
  //     y: 50,
  //     duration: 0.5,
  //   })
  //     .from(h1Ref.current, {
  //       opacity: 0,
  //       y: 50,
  //       duration: 0.5,
  //     })
  //     .from(textRef.current, {
  //       opacity: 0,
  //       y: 50,
  //       duration: 0.5,
  //     })
  //     .from(buttonRef.current, {
  //       opacity: 0,
  //       y: 50,
  //       duration: 0.5,
  //     })
  //     .from(imageRef.current, {
  //       opacity: 0,
  //       y: 50,
  //       duration: 0.5,
  //     })
  // }, [])

  return (
    <div className='pt-header bg-no-repeat bg-center overflow-hidden'>
      <div className='container w-full py-10 md:py-20'>
        <div className='flex items-center w-full justify-between'>
          <div className='max-w-4xl mx-auto flex flex-col md:gap-10 gap-5   text-center items-center'>
            <div ref={badgeRef}>
              <Badge className='select-none'>Chatbot Builder</Badge>
            </div>
            <div ref={h1Ref}>
              <h1 className='font-bold md:text-7xl text-5xl'>
                <Trans
                  i18nKey='landingPage:hero_title'
                  components={{
                    AIChatbots: <AIChatbots />,
                  }}
                ></Trans>
              </h1>
            </div>
            <p className='!mt-0 text-base font-medium md:text-lg' ref={textRef}>
              {t('hero_subtitle')}
            </p>
            <div className='flex items-center justify-center w-full'>
              <Link
                to={ROUTES.PRIVATE.FLOW.INDEX}
                className={buttonVariants({
                  size: 'lg',
                })}
                ref={buttonRef}
              >
                {t('start_now')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='container mb-10 md:mb-20'>
        <img
          src={flows}
          alt='hero'
          className='rounded-md select-none'
          style={{
            boxShadow: '0 12px 48px -12px rgba(0,0,0,.12)',
          }}
          draggable={false}
          ref={imageRef}
        />
      </div>
    </div>
  )
}

export default Hero
