/**
 * Converts a value to a boolean.
 * @param value - The value to be converted.
 * @returns The converted boolean value.
 */
export const toBoolean = (value: string | boolean) => {
  if (typeof value === 'boolean') return value

  if (value === 'true') return true
  if (value === 'false') return false

  return false
}
