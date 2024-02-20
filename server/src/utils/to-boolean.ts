export const toBoolean = (value: string | boolean) => {
   if (typeof value === 'boolean') return value;

   if (value === 'true') return true;
   if (value === 'false') return false;

   return false;
};
