import { IObj } from "../../type"

class CacheUtil {
  protected cacheStore: IObj = {}

  addToStore = <T>(key: string, value: T): T => {
    this.cacheStore[key] = value
    return value
  }

  removeFromStore = (key: string) => Reflect.deleteProperty(this.cacheStore, key)

  clearStore = () => {
    this.cacheStore = {}
  }

  getStoreItem = async <T = unknown>(key: string, cb: () => T | Promise<T>): Promise<T> => {
    if (!this.cacheStore[key]) this.cacheStore[key] = await cb()
    return this.cacheStore[key]
  }
}

export default CacheUtil
