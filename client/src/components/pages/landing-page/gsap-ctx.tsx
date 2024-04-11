import { createContext, useContext, useRef, useState } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type TGsapCtx = {
  tl: gsap.core.Timeline | null
  setTl?: React.Dispatch<React.SetStateAction<gsap.core.Timeline | null>>
  containerRef?: React.RefObject<HTMLDivElement>
}

type Props = {
  scrollTriggerOptions?: ScrollTrigger.Vars
  children: React.ReactNode
}

export const GsapCtx = createContext<TGsapCtx>({
  tl: null,
})

export const GsapProvider = ({ children, scrollTriggerOptions }: Props) => {
  const [tl, setTl] = useState<gsap.core.Timeline | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        ...scrollTriggerOptions,
      },
    })
    setTl(tl)
  }, [scrollTriggerOptions])

  return (
    <GsapCtx.Provider value={{ tl, setTl, containerRef }}>
      {children}
    </GsapCtx.Provider>
  )
}

export const useGsapCtx = () => {
  return useContext(GsapCtx)
}
