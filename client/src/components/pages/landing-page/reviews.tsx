import { Avatar, AvatarImage } from '@/components/ui'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
gsap.registerPlugin(ScrollTrigger)

const REVIEWS = [
  {
    name: 'John Doe',
    review:
      'Our customers satisfaction rate have dialougebot since implementing the robot chatbot. The Ai technology is truly amazing.',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    name: 'Muhammad Ali',
    review:
      "I've been using dialougebot for a while now and I'm really impressed with the results. It's a great tool for any business looking to improve their customer service.",
    avatar: 'https://randomuser.me/api/portraits/men/74.jpg',
  },
  {
    name: 'Helen Keller',
    review:
      'I love how easy it is to use dialougebot. It has helped me save time and money while providing a better experience for my customers.',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    name: 'Albert Einstein',
    review:
      'I have been using dialougebot for a few months now and I am very impressed with the results. The chatbot has helped me increase my sales and improve my customer service.',
    avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
  },
  {
    name: 'Van Gogh',
    review:
      "This magical product actually works! I've seen a huge increase in my sales since I started using dialougebot. Highly recommended!",
    avatar: 'https://randomuser.me/api/portraits/men/77.jpg',
  },
]

export const Reviews = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const h2Ref = useRef<HTMLHeadingElement>(null)
  const pRef = useRef<HTMLParagraphElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const reviewItemsRef = useRef<HTMLDivElement[]>([])
  const pinRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation('landingPage')

  return (
    <div>
      <div className='py-10 md:py-20 overflow-x-hidden' ref={containerRef}>
        <div className='container'>
          <div className='space-y-4 md:space-y-5'>
            <h2
              className='text-3xl md:text-5xl font-bold text-center max-w-2xl mx-auto'
              ref={h2Ref}
            >
              {t('what_people_say_title')}
            </h2>
            <p
              ref={pRef}
              className='text-center font-medium text-sm md:text-lg text-muted-foreground'
            >
              {t('what_people_say_subtitle')}
            </p>
          </div>

          <div ref={pinRef} className='mt-5'>
            <div
              className='sm:flex grid grid-cols-1 gap-4 select-none'
              ref={reviewsRef}
            >
              {REVIEWS.map((review, index) => (
                <div
                  key={index}
                  className='bg-white shadow-md p-4 rounded-lg flex-shrink-0 border-input border flex-col flex gap-4 sm:min-w-[400px] sm:max-w-[400px]'
                  //@ts-ignore
                  ref={(el) => (reviewItemsRef.current[index] = el)}
                >
                  <p className='text-lg  text-muted-foreground line-clamp-4'>
                    {review.review}
                  </p>
                  <div className='flex items-center gap-2 mt-auto'>
                    <Avatar>
                      <AvatarImage src={review.avatar} />
                    </Avatar>
                    <p className='text-lg font-medium mt-3'>{review.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reviews
