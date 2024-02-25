import { auth } from '@/apis/auth';
import { queryOptions } from '@tanstack/react-query';

export const currentUserQueryOptions = () =>
   queryOptions({
      queryKey: ['currentUser'],
      queryFn: () =>
         auth
            .getCurrentUser()
            .then((res) => res.data)
            .catch(() => null),
   });
