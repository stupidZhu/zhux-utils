import { isPlainObject } from "lodash"
import { IObj } from "../../type"

const hashCacheKey = (cacheKey: any[]): string => {
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

class CacheHelper {
  private store: IObj = {}

  add = <T>(key: any[], value: T): T => {
    const hashKey = hashCacheKey(key)
    this.store[hashKey] = value
    return value
  }

  remove = (key: any[]) => {
    const hashKey = hashCacheKey(key)
    Reflect.deleteProperty(this.store, hashKey)
  }

  clear = () => (this.store = {})

  get<T = unknown>(key: any[], cb: () => T | Promise<T>): Promise<T>
  get<T = unknown>(key: any[]): Promise<T | undefined>
  async get<T = unknown>(key: any[], cb?: () => T | Promise<T>) {
    const hashKey = hashCacheKey(key)
    if (!this.store[hashKey]) this.store[hashKey] = await cb?.()
    return this.store[hashKey]
  }
}

export default CacheHelper
