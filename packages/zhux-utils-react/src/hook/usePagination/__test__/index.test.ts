import { act, renderHook } from "@testing-library/react-hooks"
import usePagination, { UsePaginationProps } from "../usePagination"

describe("usePagination", () => {
  test("should be defined", () => {
    expect(usePagination).toBeDefined()
  })

  test("测试默认只传 total 的情况", () => {
    const { result, rerender } = renderHook(() => usePagination({ total: 88 }))

    expect(result.current.pageList.length).toBe(7)
    expect(result.current.utils.summary).toEqual({
      displayPagesCount: 3,
      fastForwardPages: 5,
      pageCount: 9,
      pageSize: 10,
      total: 88,
      value: 1,
    })
    expect(result.current.pageList[0]).toEqual({ type: "prev", page: -1, active: false, disabled: true })
    expect(result.current.pageList[1]).toEqual({ type: "page", page: 1, active: true, disabled: false })
    expect(result.current.pageList[4]).toEqual({ type: "ellipsis-next", page: -1, active: false, disabled: false })

    act(() => {
      // 下一页
      result.current.itemClick(result.current.pageList.at(-1)!)
    })
    expect(result.current.pageList[1].active).toBe(false)
    expect(result.current.pageList[2].active).toBe(true)

    act(() => {
      // 快进3页
      result.current.itemClick(result.current.pageList[4])
    })
    expect(result.current.pageList[4]).toEqual({ type: "page", page: 7, active: true, disabled: false })

    act(() => {
      // 最后一页
      result.current.itemClick(result.current.pageList.at(-2)!)
    })
    expect(result.current.pageList.at(-2)).toEqual({
      type: "page",
      page: 9,
      active: true,
      disabled: false,
    })
    expect(result.current.pageList.at(-1)?.disabled).toBe(true)
  })

  // TODO: 受控有问题
  test("测试传入不同参数的情况", () => {
    let initialValue: UsePaginationProps = { total: 500 }
    const { result, rerender } = renderHook(({ initialValue }) => usePagination(initialValue), {
      initialProps: { initialValue },
    })

    expect(result.current.utils.summary).toEqual({
      displayPagesCount: 3,
      fastForwardPages: 5,
      pageCount: 50,
      pageSize: 10,
      total: 500,
      value: 1,
    })

    act(() => {
      // 最后一页
      result.current.itemClick(result.current.pageList.at(-2)!)
    })
    initialValue = { ...initialValue, total: 100 }
    rerender({ initialValue })

    // 最后一页是 10，但未选中，需要用户自行编写组件处理
    expect(result.current.pageList.at(-2)).toEqual({ active: false, disabled: false, page: 10, type: "page" })
    expect(result.current.utils.summary.total).toBe(100)

    // value 为 1，且受控
    initialValue = {
      ...initialValue,
      value: 1,
      onChange(val: number) {
        this.value = val
      },
    }
    rerender({ initialValue })

    expect(result.current.pageList[1]).toEqual({ active: true, disabled: false, page: 1, type: "page" })

    // 受控的情况下可以正常翻页
    act(() => {
      result.current.itemClick(result.current.pageList[2])
    })
    // expect(result.current.pageList[2]).toEqual({ active: true, disabled: false, page: 2, type: "page" })

    initialValue = { ...initialValue, pageSize: 5 }
    rerender({ initialValue })

    expect(result.current.utils.summary).toEqual({
      displayPagesCount: 3,
      fastForwardPages: 5,
      pageCount: 20,
      pageSize: 5,
      total: 100,
      value: 2,
    })

    initialValue = { ...initialValue, fastForwardPages: 3 }
    rerender({ initialValue })
    act(() => {
      // 快进三页
      result.current.itemClick(result.current.pageList.at(-3)!)
    })

    // expect(result.current.pageList[4]).toEqual({ type: "page", page: 4, active: true, disabled: false })

    // 省略号中间显示 7 页
    initialValue = { ...initialValue, displayPagesCount: 7 }
    rerender({ initialValue })

    expect(result.current.utils.summary).toEqual({
      displayPagesCount: 7,
      fastForwardPages: 3,
      pageCount: 20,
      pageSize: 5,
      total: 100,
      value: 5,
    })

    act(() => {
      // 点击省略号
      result.current.itemClick(result.current.pageList.at(-3)!)
    })

    // expect(result.current.pageList.length).toBe(13)
  })
})
