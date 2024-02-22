const isObject = (obj: Record<any, any>) =>
   obj != null && obj.constructor.name === 'Object';

/**
 * Get all keys from an object or array
 * @param obj  object to get keys from
 * @param keepObjKeys  - keep object keys in the result
 * @param keys  array to store keys
 * @param scope  array to store the path
 * @returns array of keys
 */
export function getKeys(
   obj: Record<any, any> | any[],
   keepObjKeys: boolean = false,
   keys = [] as string[],
   scope = [] as string[]
) {
   if (Array.isArray(obj)) {
      obj.forEach((o) => getKeys(o, keepObjKeys, keys, scope), keys);
   } else if (isObject(obj)) {
      Object.keys(obj).forEach((k) => {
         if ((!Array.isArray(obj[k]) && !isObject(obj[k])) || keepObjKeys) {
            const path = scope.concat(k).join('.').replace(/\.\[/g, '[');
            if (!keys.includes(path)) keys.push(path);
         }
         getKeys(obj[k], keepObjKeys, keys, scope.concat(k));
      }, keys);
   }
   return keys;
}
