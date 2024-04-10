import { useCallback, useEffect, useState } from 'react'
import { useCountdown } from 'usehooks-ts'

type Props = {
  time: number
  intervalMs: number
}

export const useLimitAction = ({ intervalMs, time }: Props) => {
  const [lastSubmitAction, setLastSubmitAction] = useState<Date | null>(null)

  const [counter, { startCountdown, resetCountdown, stopCountdown }] =
    useCountdown({
      countStart: time,
      intervalMs,
    })

  const isActionAllowed = useCallback(() => {
    const currentTime = new Date().getTime()

    if (
      lastSubmitAction &&
      currentTime - lastSubmitAction.getTime() < time * 1000
    ) {
      return false
    }

    return true
  }, [lastSubmitAction, time])

  const handleAction = useCallback(
    (action: () => void) => {
      if (isActionAllowed()) {
        setLastSubmitAction(new Date())
        action()
      }
    },
    [isActionAllowed],
  )

  useEffect(() => {
    if (counter === 0) {
      resetCountdown()
    }
  }, [counter, resetCountdown])

  return {
    counter,
    startCountdown,
    resetCountdown,
    stopCountdown,
    isActionAllowed,
    handleAction,
    setLastSubmitAction,
  }
}
