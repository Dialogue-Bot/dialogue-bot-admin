import { TSetting } from '@/types/setting'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type TSettingState = {
  setting: TSetting | null
  setSetting: (setting: TSetting | null) => void
}

export const useSettingStore = create<TSettingState>()(
  devtools((set) => ({
    setting: null,
    setSetting(setting) {
      return set((state) => ({
        ...state,
        setting,
      }))
    },
  })),
)
