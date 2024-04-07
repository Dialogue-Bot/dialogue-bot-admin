import { useButtonSchema } from './button'

import * as z from 'zod'

export const useButtonsSchema = () => {
  const buttonSchema = useButtonSchema()

  return z.object({
    buttons: z.array(buttonSchema),
  })
}

export type TButtons = z.infer<ReturnType<typeof useButtonsSchema>>
