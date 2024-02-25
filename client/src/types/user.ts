export type TUser = {
   id: string;
   email: string;
   name: string;
   avatar: string | null;
   roles: Array<'USER' | 'ADMIN'>;
   provider: string;
};
