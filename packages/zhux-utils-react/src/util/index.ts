import { cloneDeep } from "lodash"
import { IObj } from "zhux-utils/dist/type"
import { IRef } from "../type"

export const getCurrent = <T = any>(ref: IRef<T>) => {
  if (typeof ref === "function") return ref()
  return ref?.current
}

interface FormatIntProps {
  defaultVal: number
  max?: number
  min?: number
}
export const formatInt = (
  num: number | undefined,
  { defaultVal, max = Number.MAX_SAFE_INTEGER, min = Number.MIN_SAFE_INTEGER }: FormatIntProps
) => {
  if (typeof num === "undefined") num = defaultVal
  if (!Number.isInteger(num)) num = ~~num
  if (num > max || num < min) return defaultVal
  return num
}

export const randomStr = (e = 32) => {
  const t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz",
    a = t.length
  let str = ""
  for (let i = 0; i < e; i++) str += t.charAt(Math.floor(Math.random() * a))
  return str
}

export interface Pid2ChildrenOption {
  idStr?: string
  pidStr?: string
  childrenStr?: string
  customField?: IObj
}

export const pid2children = <T extends {} = IObj>(
  data: T[],
  { idStr = "id", pidStr = "pid", childrenStr = "children", customField = {} }: Pid2ChildrenOption = {}
) => {
  const map: IObj = {},
    res: T[] = [],
    _data: T[] = cloneDeep(data),
    broIdsMap: IObj<React.Key[]> = {}

  _data.forEach(item => {
    item = Object.assign(item, { _isLeaf: true, _level: 0, ...customField })
    map[item[idStr]] = item
  })

  _data.forEach(item => {
    const p = map[item[pidStr]]
    if (p) {
      p[childrenStr] ? p[childrenStr].push(item) : (p[childrenStr] = [item])
      broIdsMap[p[idStr]] ? broIdsMap[p[idStr]].push(item[idStr]) : (broIdsMap[p[idStr]] = [item[idStr]])
      item["_broIds"] = broIdsMap[p[idStr]]
      item["_level"] = p["_level"] + 1
      p["_isLeaf"] = false
      p["_expanded"] = false
      p["_halfChecked"] = false
    } else res.push(item)
  })

  return [res, map] as const
}
