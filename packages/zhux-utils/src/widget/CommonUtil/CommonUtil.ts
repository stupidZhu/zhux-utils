import { cloneDeep, isPlainObject } from "lodash"
import { IKey, IObj, IOption } from "../../type"
import TreeUtil from "./TreeUtil"

const addCacheWrapper = <T extends (...rest: any[]) => any>(func: T): T => {
  const cache: IObj = {}

  return function (...rest: any[]) {
    const key = JSON.stringify(rest)
    if (cache[key]) return cache[key]
    cache[key] = (func as unknown as Function)(...rest)
    return cache[key]
  } as T
}

const genSetRefObjFunc = <T extends IObj>(obj: { current: T }) => {
  return <K extends keyof T>(key: K | Partial<T> | ((v: T) => T), value?: T[K]) => {
    if (typeof key === "string") {
      if (typeof value === "undefined") Reflect.deleteProperty(obj.current, key)
      else obj.current = { ...obj.current, [key]: value }
    } else if (typeof key === "function") obj.current = key(obj.current)
    else obj.current = { ...obj.current, ...(key as Partial<T>) }
  }
}

const genSetObjFunc = <T extends IObj>(obj: T) => {
  return <K extends keyof T>(key: K | Partial<T> | ((v: T) => void), value?: T[K]) => {
    if (typeof key === "string") {
      if (typeof value === "undefined") Reflect.deleteProperty(obj, key)
      else obj[key as keyof T] = value
    } else if (typeof key === "function") key(obj)
    else Object.entries(key).map(<Key extends keyof T>([k, v]: [Key, T[Key]]) => (obj[k] = v))
  }
}

const parseJson = <T = any>(json: string, preventLog = false): T | null => {
  let res: T | null = null
  if (!json) return res
  try {
    res = JSON.parse(json)
  } catch (e) {
    !preventLog && console.error(e)
  }
  return res
}

const getDom = (id: string, className?: string) => {
  let dom = document.querySelector(`#${id}`)
  if (!dom) {
    dom = document.createElement("div")
    dom.id = id
    document.body.appendChild(dom)
  }
  className && dom.classList.add(className)
  return dom as HTMLDivElement
}

// https://juejin.cn/post/7140558929750130719
const abortablePromise = <T>(promise: Promise<T>) => {
  const abortController = new AbortController()
  const { signal } = abortController

  return {
    promise: new Promise<T>((resolve, reject) => {
      signal.addEventListener("abort", () => reject(signal?.reason))
      promise.then(resolve).catch(reject)
    }),
    abortController,
  }
}

interface ClearEmptyValOption {
  clearEmptyStr?: boolean
  clearSpace?: boolean
}
const clearEmptyVal = <T extends {} = IObj>(obj: T, option: ClearEmptyValOption = {}) => {
  const { clearEmptyStr = true, clearSpace = true } = option
  if (!isPlainObject(obj)) return obj
  const newObj = cloneDeep(obj)
  const condition = (v: any, clearEmptyStr = true) => {
    let res = typeof v === "undefined" || v === null || v === "$$"
    clearEmptyStr && (res = res || v === "")
    return res
  }

  Object.entries(newObj).forEach(([k, v]) => {
    if (clearSpace && typeof v === "string") newObj[k] = v.trim()
    if (condition(v, clearEmptyStr)) Reflect.deleteProperty(newObj, k)
  })
  return newObj
}

const toOptions = {
  arr2options<T extends IKey>(arr: T[]): IOption<T, T>[] {
    return arr.map(item => ({ label: item, value: item }))
  },
  enum2options(e: Record<IKey, IKey>) {
    const keys = Object.keys(e).filter(item => Number.isNaN(+item))
    return keys.map(item => ({ value: e[item], label: item }))
  },
}

/** 求差集 第一个减去第二个 */
const subSet = <T = IKey>(arr1: T[], arr2: T[]): T[] => {
  const set1 = new Set(arr1)
  const set2 = new Set(arr2)
  const result: T[] = []

  set1.forEach(item => {
    if (!set2.has(item)) result.push(item)
  })

  return result
}

const union = <T = IKey>(arr1: T[], arr2: T[]) => {
  const set1 = new Set(arr1)
  const set2 = new Set(arr2)
  const result: T[] = []

  set1.forEach(item => {
    if (set2.has(item)) result.push(item)
  })

  return result
}

const genMap = <T extends IObj>(map: T) => {
  return new Proxy(map, {
    get(target, prop: string) {
      if (!prop) return
      return target[prop] ?? prop
    },
  })
}

const removeStr = (str: string, config: { removeStart?: string; removeEnd?: string }) => {
  const { removeStart, removeEnd } = config
  if (!removeStart && !removeEnd) return str
  const regStrList = []
  removeStart && regStrList.push(`^(${removeStart})+`)
  removeEnd && regStrList.push(`(${removeEnd})+$`)
  const reg = new RegExp(regStrList.join("|"), "g")
  return str.replace(reg, "")
}

export default {
  addCacheWrapper,
  abortablePromise,
  genSetRefObjFunc,
  genSetObjFunc,
  parseJson,
  getDom,
  clearEmptyVal,
  toOptions,
  subSet,
  union,
  genMap,
  removeStr,
  ...TreeUtil,
}
