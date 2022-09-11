import { useCallback, useMemo } from "react"
import useCtrlComponent from "../useCtrlComponent/useCtrlComponent"

export interface UsePaginationProps {
  /** 总页数*/
  total: number
  /** 每页item数 */
  pageSize?: number
  /** 初始页数*/
  defaultValue?: number
  /** 页数（受控） */
  value?: number
  /** 处理页数改变 */
  onChange?: (page: number) => void
  /** 点击省略号快进快退页数 */
  fastForwardPages?: number
  /** 省略号中间展示的页数的数量（奇数） */
  displayPagesCount?: number
}

export type PaginationItemType = "page" | "first" | "last" | "next" | "prev" | "ellipsis-prev" | "ellipsis-next"

export interface PaginationItem {
  type: PaginationItemType
  page: number
  active: boolean
  disabled: boolean
}

const usePagination = (props: UsePaginationProps) => {
  const { total, pageSize = 10, fastForwardPages = 5, displayPagesCount: DPC = 3 } = props

  const displayPagesCount = useMemo(() => {
    if (DPC <= 0) return 3
    return DPC % 2 ? DPC : DPC + 1
  }, [DPC])

  const pageCount = useMemo(() => Math.ceil(total / pageSize), [total, pageSize])

  const calcPage = useCallback(
    (page: number) => {
      if (page > pageCount) page = pageCount
      if (page < 1) page = 1
      return page ?? 1
    },
    [pageCount]
  )

  const [curPage, setCurPage] = useCtrlComponent<number>(props, { defaultValue: 1 })

  const itemClick = useCallback(
    (item: PaginationItem) => {
      if (item.disabled) return
      let page = 0
      if (item.type === "first") page = 1
      else if (item.type === "last") page = pageCount
      else if (item.type === "next") page = calcPage(curPage + 1)
      else if (item.type === "prev") page = calcPage(curPage - 1)
      else if (item.type === "ellipsis-next") page = calcPage(curPage + fastForwardPages)
      else if (item.type === "ellipsis-prev") page = calcPage(curPage - fastForwardPages)
      else page = item.page
      if (page) setCurPage(page)
    },
    [calcPage, curPage, fastForwardPages, pageCount, setCurPage]
  )

  const pageList = useMemo(() => {
    let list: PaginationItem[] = []
    const prev: PaginationItem = { type: "prev", page: -1, active: false, disabled: curPage <= 1 }
    const next: PaginationItem = { type: "next", page: -1, active: false, disabled: curPage >= pageCount }
    if (pageCount < 0) return list
    if (pageCount <= displayPagesCount + 2) {
      list = Array.from(Array(pageCount)).map((_, index) => {
        return { type: "page", page: index + 1, active: curPage === index + 1, disabled: false }
      })
    } else {
      const first: PaginationItem = { type: "page", page: 1, active: curPage === 1, disabled: false }
      const last: PaginationItem = { type: "page", page: pageCount, active: curPage === pageCount, disabled: false }
      const ellipsisPrev: PaginationItem = { type: "ellipsis-prev", page: -1, active: false, disabled: false }
      const ellipsisNext: PaginationItem = { type: "ellipsis-next", page: -1, active: false, disabled: false }
      // 这个 temp，不知道取什么名字了！
      const temp = Math.floor(displayPagesCount / 2)

      if (curPage - temp <= 2) {
        // curPage - temp <= 1 + 1 没有前面的省略号
        list = Array.from(Array(Math.max(curPage + temp, displayPagesCount))).map((_, index) => {
          const page = index + 1
          return { type: "page", page, active: curPage === page, disabled: false }
        })
        list.push(ellipsisNext, last)
      } else if (curPage + temp >= pageCount - 1) {
        // 没有后面的省略号
        list = Array.from(Array(Math.max(pageCount - (curPage - temp) + 1, displayPagesCount))).map((_, index) => {
          const page = pageCount - index
          return { type: "page", page, active: curPage === page, disabled: false }
        })
        list.push(ellipsisPrev, first)
        list.reverse()
      } else {
        // 前后都有省略号
        list = Array.from(Array(displayPagesCount)).map((_, index) => {
          const page = curPage - temp + index
          return { type: "page", page, active: curPage === page, disabled: false }
        })
        list = [first, ellipsisPrev, ...list, ellipsisNext, last]
      }
    }
    return [prev, ...list, next]
  }, [curPage, displayPagesCount, pageCount])

  const summary = useMemo(
    () => ({ pageSize, pageCount, value: curPage, total, displayPagesCount, fastForwardPages }),
    [curPage, displayPagesCount, pageCount, pageSize, total, fastForwardPages]
  )

  return { pageList, itemClick, utils: { summary, calcPage } }
}

export default usePagination
