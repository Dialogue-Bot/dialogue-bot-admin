import type { Request } from 'express';
import type * as z from 'zod';
import type { InferResultType, ROLES } from '@/database/types';

export type TTokenStore = {
   id: string;
   roles: z.infer<typeof ROLES>[];
};

export type TTokenData = {
   accessToken: string;
   refreshToken: string;
};

export interface RequestWithUser extends Request {
   user: InferResultType<'users'> | null | undefined;
}
