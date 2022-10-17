// https://github.com/jonschlinkert/is-plain-object/blob/master/is-plain-object.js
function isObject(o: any) {
  return Object.prototype.toString.call(o) === "[object Object]"
}
export function isPlainObject(o: any) {
  if (isObject(o) === false) return false
  // If has modified constructor
  const ctor = o.constructor
  if (ctor === undefined) return true

  // If has modified prototype
  const prot = ctor.prototype
  if (isObject(prot) === false) return false

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty("isPrototypeOf") === false) {
    return false
  }

  // Most likely a plain Object
  return true
}

// https://github.com/tanstack/query/blob/HEAD/packages/query-core/src/utils.ts#L269
export function hashCacheKey(cacheKey: any[]): string {
  return JSON.stringify(cacheKey, (_, val) =>
    isPlainObject(val)
      ? Object.keys(val)
          .sort()
          .reduce((result, key) => {
            result[key] = val[key]
            return result
          }, {} as any)
      : val
  )
}
