import { IObj } from "../../type"

class CacheHelper {
  private store: IObj = {}

  add = <T>(key: string, value: T): T => {
    console.log("hello world!!!")
    this.store[key] = value
    return value
  }

  remove = (key: string) => Reflect.deleteProperty(this.store, key)

  clear = () => (this.store = {})

  get = async <T = unknown>(key: string, cb: () => T | Promise<T>): Promise<T> => {
    if (!this.store[key]) this.store[key] = await cb()
    return this.store[key]
  }
}

export default CacheHelper
