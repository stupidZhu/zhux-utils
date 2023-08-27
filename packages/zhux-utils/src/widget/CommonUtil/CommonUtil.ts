import { cloneDeep, isPlainObject, merge } from "lodash"
import { IKey, IObj, IOption } from "../../type"
import TreeUtil from "./TreeUtil"

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

const addCacheWrapper = <T extends (...rest: any[]) => any>(func: T): T => {
  const cache: IObj = {}

  return function (...rest: any[]) {
    const key = hashCacheKey(rest)
    if (cache[key]) return cache[key]
    cache[key] = (func as unknown as Function)(...rest)
    return cache[key]
  } as T
}

const genSetRefObjFunc = <T extends IObj>(obj: { current: T }) => {
  return (val: Partial<T> | ((v: T) => T)) => {
    if (typeof val === "function") obj.current = val(obj.current)
    else obj.current = merge(obj.current, val)
  }
}

const genSetObjFunc = <T extends IObj>(obj: T) => {
  return (val: Partial<T> | ((v: T) => void)) => {
    if (typeof val === "function") val(obj)
    else merge(obj, val)
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

const getDom = (id: string, option: { className?: string; tag?: keyof HTMLElementTagNameMap } = {}) => {
  const { className, tag = "div" } = option

  let dom = document.querySelector(`#${id}`)
  if (!dom) {
    dom = document.createElement(tag)
    dom.id = id
    document.body.appendChild(dom)
  }
  className && dom.classList.add(className)
  return dom as HTMLElement
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

interface ClearEmptyValOption<T> {
  /** 是否移除空字符串 */
  clearEmptyStr?: boolean
  /** 如果是字符串是否调用 trim 移除空格 */
  clearSpace?: boolean
  /** 返回：true - 该字段保留；false - 该字段移除 */
  customCb?: <K extends keyof T>(k: K, v: T[K]) => boolean
}
const clearEmptyVal = <T extends {} = IObj>(obj: T, option: ClearEmptyValOption<T> = {}) => {
  const { clearEmptyStr = true, clearSpace = true, customCb } = option
  if (!isPlainObject(obj)) return obj
  const newObj = cloneDeep(obj)

  const condition = (k: string, v: unknown) => {
    if (v === undefined || v === null || v === "$$") return false
    if (clearEmptyStr && v === "") return false
    if (customCb) return customCb(k as any, v)
    return true
  }

  Object.entries(newObj).forEach(([k, v]) => {
    if (clearSpace && typeof v === "string") newObj[k] = v.trim()
    if (!condition(k, newObj[k])) Reflect.deleteProperty(newObj, k)
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
  hashCacheKey,
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
