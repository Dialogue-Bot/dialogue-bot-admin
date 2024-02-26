import { TUser } from '@/types/user';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TUserState = {
   user: TUser | null;
   setUser: (user: TUser | null) => void;
};

export const useUserStore = create<TUserState>()(
   devtools((set) => ({
      user: null,
      setUser: (user) => {
         set((state) => {
            return { ...state, user };
         });
      },
   }))
);
