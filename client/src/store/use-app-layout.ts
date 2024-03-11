import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type TAppLayoutState = {
  title: string
  setTitle: (title: string) => void
}

export const useAppLayoutStore = create<TAppLayoutState>()(
  devtools((set) => ({
    title: '',
    setTitle: (title) => {
      return set((state) => {
        return { ...state, title }
      })
    },
  })),
)
