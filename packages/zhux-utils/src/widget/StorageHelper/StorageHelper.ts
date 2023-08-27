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

  key = (index: number) => {
    return this._storage.key(index)
  }

  keys = (withPrefix = false) => {
    let rawKeys = Object.keys(this._storage).filter(key => key.startsWith(this._prefix))
    if (!withPrefix) rawKeys = rawKeys.map(key => key.replace(this._prefix, ""))
    return rawKeys
  }

  clear = () => {
    this.keys(true).forEach(key => {
      this._storage.removeItem(key)
    })
  }

  removeItem = (key: string) => {
    key = this._prefix + key
    this._storage.removeItem(key)
  }

  getItem = <T = any>(key: string): T | null => {
    const data = this._storage.getItem(this._prefix + key)

    if (!data) return null
    const dataObj = CommonUtil.parseJson(data, true)
    if (!dataObj) return null
    if (!dataObj._expire || typeof dataObj._expire !== "number" || !("data" in dataObj)) return null

    if (dataObj._expire < Date.now()) {
      this.removeItem(key)
      return null
    }
    return dataObj.data
  }

  setItem = (key: string, value: any, _expire?: DurationUnitsObjectType | number) => {
    if (isNil(value)) return
    key = this._prefix + key
    const data = { data: value, _expire }
    if (_expire) {
      const ms = typeof _expire === "number" ? _expire : dayjs.duration(_expire).asMilliseconds()
      data._expire = Date.now() + ms
    } else data._expire = Number.MAX_SAFE_INTEGER
    this._storage.setItem(key, JSON.stringify(data))
  }
}

export default StorageHelper
