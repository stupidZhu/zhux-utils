import dayjs from "dayjs"
import duration, { DurationUnitsObjectType } from "dayjs/plugin/duration"
import { IKey } from "../../type"
dayjs.extend(duration)

class StorageHelper {
  private prefix: IKey
  length = localStorage.length

  constructor(prefix: IKey) {
    this.prefix = prefix
  }

  private calcExpire(duration?: DurationUnitsObjectType | number) {
    if (!duration) return Number.MAX_SAFE_INTEGER
    if (typeof duration === "number") return Date.now() + duration
    const milliseconds = dayjs.duration(duration).asMilliseconds()
    return milliseconds ? Date.now() + milliseconds : Number.MAX_SAFE_INTEGER
  }

  getItem<T>(key: IKey): T | null
  getItem<T>(key: IKey, defaultValue: T): T
  getItem<T>(key: IKey, defaultValue?: T) {
    if (this.prefix) key = `${this.prefix}_${key}`
    let res: any = localStorage.getItem(String(key))
    if (res) {
      try {
        res = JSON.parse(res ?? "null")
      } catch (e) {}
    }
    if (typeof res === "object" && typeof res?._expire === "number" && res?.data) {
      if (res._expire < Date.now()) {
        localStorage.removeItem(String(key))
        return defaultValue ?? null
      }
      return res?.data ?? defaultValue ?? null
    } else return res ?? defaultValue ?? null
  }

  setItem = (key: IKey, value: any, _expire?: DurationUnitsObjectType | number) => {
    if (this.prefix) key = `${this.prefix}_${key}`
    _expire = this.calcExpire(_expire)
    const res = { data: value, _expire }
    localStorage.setItem(String(key), JSON.stringify(res))
  }

  removeItems = (keys: IKey[]) => {
    keys.forEach(item => {
      if (this.prefix) item = `${this.prefix}_${item}`
      localStorage.removeItem(String(item))
    })
  }

  removeItem = localStorage.removeItem.bind(localStorage)
  clear = localStorage.clear.bind(localStorage)
  key = localStorage.key.bind(localStorage)
}

export default StorageHelper
