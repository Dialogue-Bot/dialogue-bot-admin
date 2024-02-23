export enum ELang {
   EN = 'en',
   VI = 'vi',
}

export type TBaseResponse<T> = {
   data: T;
   message: string;
};

export type TToken = {
   accessToken: string;
   refreshToken: string;
};
