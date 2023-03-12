import dayjs from "dayjs"
import duration, { DurationUnitsObjectType } from "dayjs/plugin/duration"
import { isNil } from "lodash"
import CommonUtil from "../CommonUtil/CommonUtil"
dayjs.extend(duration)

class StorageHelper implements Storage {
  private _prefix: string
  private _storage: Storage

  constructor(prefix: string, type: "local" | "session" = "local") {
    this._prefix = prefix ? `${prefix}_` : prefix
    this._storage = type === "local" ? globalThis.localStorage : globalThis.sessionStorage
  }

  get length(): number {
    return this._storage.length
  }

  clear() {
    this._storage.clear()
  }

  key(index: number) {
    return this._storage.key(index)
  }

  removeItem(key: string) {
    key = this._prefix + key
    this._storage.removeItem(key)
  }

  getItem(key: string) {
    const data = this._storage.getItem(this._prefix + key)
    if (!data) return data
    const dataObj = CommonUtil.parseJson(data)
    if (!dataObj) return data
    if (!dataObj._expire || typeof dataObj._expire !== "number" || !("value" in dataObj)) return data
    if (dataObj._expire < Date.now()) {
      this.removeItem(key)
      return null
    }
    return dataObj.value
  }

  setItem(key: string, value: any, _expire?: DurationUnitsObjectType | number) {
    if (isNil(value)) return
    key = this._prefix + key
    const data = { value, _expire }
    if (_expire) {
      const ms = typeof _expire === "number" ? _expire : dayjs.duration(_expire).asMilliseconds()
      data._expire = Date.now() + ms
    } else data._expire = Number.MAX_SAFE_INTEGER
    this._storage.setItem(key, JSON.stringify(data))
  }
}

export default StorageHelper
