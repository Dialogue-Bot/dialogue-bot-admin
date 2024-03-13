import { useEffect } from 'react'

const calcScrollbarWidth = () => {
  const scrollDiv = document.createElement('div')
  scrollDiv.style.width = '100px'
  scrollDiv.style.height = '100px'
  scrollDiv.style.overflow = 'scroll'
  scrollDiv.style.position = 'absolute'
  scrollDiv.style.top = '-9999px'
  document.body.appendChild(scrollDiv)

  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth

  document.body.removeChild(scrollDiv)

  return scrollbarWidth
}

export const useBodyOverflow = (isOpen: boolean, withMargin?: boolean) => {
  useEffect(() => {
    const body = document.querySelector('body')

    if (!body) return

    if (isOpen) {
      body.setAttribute('data-overflow', 'true')
      body.id = 'body-overflow'

      body.style.setProperty('--scrollbar-width', `${calcScrollbarWidth()}px`)
    } else {
      body.removeAttribute('data-overflow')
      body.removeAttribute('id')
      body.removeAttribute('data-overflow-margin')
      body.style.removeProperty('--scrollbar-width')
    }

    if (withMargin) {
      body.setAttribute('data-overflow-margin', 'true')
    }
  }, [isOpen, withMargin])
}
