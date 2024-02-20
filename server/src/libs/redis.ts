import { Redis } from 'ioredis';
import { REDIS_HOST, REDIS_PORT } from '@/config';

export const redis = new Redis({
   host: REDIS_HOST,
   port: Number(REDIS_PORT || 6379),
   maxRetriesPerRequest: null,
});
