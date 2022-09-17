import { cloneDeep, isEqual } from "lodash"
import { Key, useCallback, useEffect, useRef, useState } from "react"
import { IObj } from "zhux-utils/dist/type"
import { pid2children } from "../../util"
import useCtrlComponent from "../useCtrlComponent/useCtrlComponent"

export interface UseTreeOptions<T, C extends string = "children"> {
  idStr?: string
  pidStr?: string
  childrenStr?: C
  defaultExpandedIds?: Set<Key>
  expandedIds?: Set<Key>
  onExpanded?: (expandedIds: Set<Key>, node: TreeNode<T, C>) => void
  defaultCheckedIds?: Set<Key>
  checkedIds?: Set<Key>
  onChecked?: (checkedIds: Set<Key>, node: TreeNode<T, C>) => void
}

//防止与 treeData 原有属性同名而加上 _ 前缀
export type TreeNode<T = IObj, C extends string = "children"> = {
  _checked: boolean
  _expanded?: boolean
  _isLeaf: boolean
  _level: number
  _broIds?: Key[]
  _halfChecked?: boolean
} & {
  [key in C]?: Array<TreeNode<T, C>>
} & T

const useTree = <T, C extends string = "children">(treeData: T[], options: UseTreeOptions<T, C> = {}) => {
  // treeData 的备份
  const treeDataMemo = useRef<T[]>([])
  // 因为对象的引用类型，treeDataMap 的值改变会导致 treeDataRef 的值改变，再由 treeDataRef 生成 treeDataRender 用于渲染
  const treeDataMap = useRef<IObj<TreeNode<T, C>>>({})
  const treeDataRef = useRef<Array<TreeNode<T, C>>>([])
  // 用于 render 的树
  const [treeDataRender, setTreeData] = useState<Array<TreeNode<T, C>>>([])

  const [checked, setChecked] = useCtrlComponent<Set<Key>>(options, {
    // defaultValuePropName: "defaultCheckedIds", 手动设置default
    valuePropName: "checkedIds",
    onChangePropName: "onChecked",
    defaultValue: new Set(),
  })
  const [expanded, setExpanded] = useCtrlComponent<Set<Key>>(options, {
    defaultValuePropName: "defaultExpandedIds",
    valuePropName: "expandedIds",
    onChangePropName: "onExpanded",
    defaultValue: new Set(),
  })
  const [halfChecked, setHalfChecked] = useState<Set<Key>>(new Set())

  const { idStr = "id", pidStr = "pid", childrenStr = "children", defaultCheckedIds } = options

  const checkedFunc = useCallback(
    (nodeId: Key, type?: boolean) => {
      if ((type === true && checked.has(nodeId)) || (type === false && !checked.has(nodeId))) return
      const treeNode = treeDataMap.current[nodeId]
      checked.has(treeNode[idStr]) ? checked.delete(treeNode[idStr]) : checked.add(treeNode[idStr])
      halfChecked.delete(treeNode[idStr])
      if (!("checkedIds" in options)) {
        //查找子节点并更新 _checked
        const findDown = (node: TreeNode<T, C>) => {
          if (node[childrenStr as C]?.length) {
            node[childrenStr as C]?.forEach(item => {
              checked.has(treeNode[idStr]) ? checked.add(item[idStr]) : checked.delete(item[idStr])
              halfChecked.delete(item[idStr])
              if (item[childrenStr as C]?.length) findDown(item)
            })
          }
        }
        findDown(treeNode)

        //查找父节点并更新 _checked 和 _halfChecked
        const findUp = (node: TreeNode<T, C>) => {
          if (node?._broIds?.length) {
            let allChecked = true,
              allNotChecked = true
            node._broIds.forEach(item => {
              if (checked.has(item) || halfChecked.has(item)) allNotChecked = false
              if (!checked.has(item)) allChecked = false
            })
            if (allChecked) {
              checked.add(node[pidStr])
              halfChecked.delete(node[pidStr])
            } else if (allNotChecked) {
              checked.delete(node[pidStr])
              halfChecked.delete(node[pidStr])
            } else {
              halfChecked.add(node[pidStr])
              checked.delete(node[pidStr])
            }
            findUp(treeDataMap.current[node[pidStr]])
          }
        }
        findUp(treeNode)
      }
      setChecked(new Set(checked), cloneDeep({ ...treeNode, _checked: checked.has(nodeId) }))
      setHalfChecked(new Set(halfChecked))
    },
    [checked, childrenStr, halfChecked, idStr, options, pidStr, setChecked]
  )

  const expandedFunc = useCallback(
    (nodeId: Key, type?: boolean) => {
      if ((type === true && expanded.has(nodeId)) || (type === false && !expanded.has(nodeId))) return
      const treeNode = treeDataMap.current[nodeId]
      if (typeof treeNode?._expanded === "undefined") return
      treeNode._expanded ? expanded.delete(treeNode[idStr]) : expanded.add(treeNode[idStr])
      setExpanded(new Set(expanded), cloneDeep({ ...treeNode, _expanded: expanded.has(nodeId) }))
    },
    [expanded, idStr, setExpanded]
  )

  const initTree = useCallback(
    (tree: T[]) => {
      const tempTree = tree.map(item => ({ ...item, _checked: false }))
      const [res, map] = pid2children(tempTree, { idStr, pidStr, childrenStr }) as [
        Array<TreeNode<T, C>>,
        IObj<TreeNode<T, C>>
      ]
      setTreeData(res)
      treeDataMap.current = map
      treeDataRef.current = res
    },
    [childrenStr, idStr, pidStr]
  )

  useEffect(() => {
    // 防止对象无限循环
    if (isEqual(treeData, treeDataMemo.current)) return
    treeDataMemo.current = treeData

    treeData && initTree(treeData)
    if (defaultCheckedIds?.size) {
      defaultCheckedIds.forEach(item => {
        checkedFunc(item)
      })
    }
  }, [treeData])

  useEffect(() => {
    Object.values(treeDataMap.current).forEach(item => {
      item._checked = checked.has(item[idStr])
    })
    setTreeData([...treeDataRef.current])
  }, [checked, idStr])

  useEffect(() => {
    Object.values(treeDataMap.current).forEach(item => {
      if (typeof item._expanded !== "undefined") {
        item._expanded = expanded.has(item[idStr])
      }
    })
    setTreeData([...treeDataRef.current])
  }, [expanded, idStr])

  useEffect(() => {
    Object.values(treeDataMap.current).forEach(item => {
      if (typeof item._halfChecked !== "undefined") {
        item._halfChecked = halfChecked.has(item[idStr])
      }
    })
    setTreeData([...treeDataRef.current])
  }, [halfChecked, idStr])

  return [treeDataRender, { checkedFunc, expandedFunc }] as const
}

export default useTree
