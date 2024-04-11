import earth from '@/assets/earth.svg'
import gmail from '@/assets/gmail.svg'
import google from '@/assets/google.svg'
import line from '@/assets/line.svg'
import messenger from '@/assets/messenger.png'
import { Badge } from '@/components/ui'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
gsap.registerPlugin(ScrollTrigger)

const IMAGES = [google, gmail, line, messenger, earth]

export const Integrations = () => {
  const imagesRef = useRef<HTMLDivElement[]>([])
  const badgeRef = useRef<HTMLDivElement | null>(null)
  const h2Ref = useRef<HTMLHeadingElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation('landingPage')

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 30%',
        end: 'bottom bottom',
        scrub: 1,
      },
    })

    tl.from(badgeRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.5,
      ease: 'power3.out',
    }).from(h2Ref.current, {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power3.out',
    })

    imagesRef.current.forEach((image) => {
      tl.from(image, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      })
    })
  }, [])

  return (
    <div className='py-10 md:py-20 bg-white' ref={containerRef}>
      <div className='container'>
        <div className='flex items-center flex-col gap-10'>
          <div className='flex items-center justify-center flex-col gap-4'>
            <div ref={badgeRef}>
              <Badge className='text-lg'>Integrations</Badge>
            </div>
            <h2
              className='text-3xl md:text-5xl font-bold text-center max-w-2xl'
              ref={h2Ref}
            >
              {t('integrations_title')}
            </h2>
          </div>
          <div className='relative rounded-full grid items-center justify-center gap-10 py-0 grid-cols-2 md:grid-cols-5'>
            {IMAGES.map((image, index) => {
              return (
                <img
                  //@ts-ignore
                  ref={(el) => (imagesRef.current[index] = el)}
                  key={index}
                  src={image}
                  alt={image}
                  className='w-20 h-20 object-contain drop-shadow-xl'
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Integrations
