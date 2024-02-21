import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TUserState = {
   user: any | null;
   setUser: (user: any) => void;
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
