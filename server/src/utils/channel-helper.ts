import { TEST_YOUR_BOT_CHANNEL } from '@/constants'

export const getTestBotContactId = (userId: string, flowId?: string) => {
  if (!flowId) {
    return `${TEST_YOUR_BOT_CHANNEL}${userId}`
  }

  return `${TEST_YOUR_BOT_CHANNEL}${userId}${flowId}`
}
