import { cloneDeep, isNil } from "lodash"
import { IKey, IObj } from "../../type"

// 广度优先
export type BFSOptions = { childrenStr?: string }
const bfsTree = <T = any>(tree: T[], cb: (item: T) => void | boolean, options: BFSOptions = {}) => {
  const { childrenStr = "children" } = options
  const queue = [...tree]
  while (queue.length > 0) {
    const node = queue.shift()!
    if (cb(node) === false) break
    Array.isArray(node[childrenStr]) && queue.push(...node[childrenStr])
  }
}

// 深度优先
export type DFSOptions = { childrenStr?: string }
const dfsTree1 = <T = any>(tree: T[], cb: (item: T) => void, options: DFSOptions = {}) => {
  const { childrenStr = "children" } = options
  const _dfs = (tree: T[], cb: (item: T) => void) => {
    for (const node of tree) {
      cb(node)
      if (Array.isArray(node[childrenStr])) _dfs(node[childrenStr] as T[], cb)
    }
  }
  _dfs(tree, cb)
}

const dfsTree = <T = any>(tree: T[], cb: (item: T) => void | boolean, options: DFSOptions = {}) => {
  const { childrenStr = "children" } = options
  const stack = [...tree]
  while (stack.length > 0) {
    const node = stack.pop()!
    if (cb(node) === false) break
    if (Array.isArray(node[childrenStr])) stack.push(...node[childrenStr].reverse())
  }
}

export interface TreeTransformOptions {
  idStr?: string
  pidStr?: string
  childrenStr?: string
}

const TreeTransform = {
  pid2children<T = IObj>(data: T[], options: TreeTransformOptions = {}) {
    const { idStr = "id", pidStr = "pid", childrenStr = "children" } = options
    const map = {},
      res: T[] = [],
      _data: T[] = cloneDeep(data)

    _data.forEach(item => (map[item[idStr]] = item))

    _data.forEach(item => {
      const p = map[item[pidStr]]
      if (p) p[childrenStr] ? p[childrenStr].push(item) : (p[childrenStr] = [item])
      else res.push(item)
    })
    return res
  },
  children2pid<T = IObj>(data: T[], options: TreeTransformOptions = {}) {
    const resArr: any[] = []

    const _flatTreeArr = (data: any[], options: TreeTransformOptions & { pid?: IKey }) => {
      const { idStr = "id", pidStr = "pid", childrenStr = "children", pid } = options
      data.forEach(item => {
        const tempItem = cloneDeep(item)
        if (!isNil(pid)) tempItem[pidStr] = pid
        Reflect.deleteProperty(tempItem, childrenStr)
        resArr.push(tempItem)
        if (Array.isArray(item[childrenStr]) && item[childrenStr].length > 0) {
          _flatTreeArr(item[childrenStr], { ...options, pid: item[idStr] })
        }
      })
    }
    _flatTreeArr(data, options)
    return resArr
  },
}

export default {
  bfsTree,
  dfsTree,
  TreeTransform,
}
