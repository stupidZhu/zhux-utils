import { renderHook } from "@testing-library/react-hooks"
import useOnceEffect from "../useOnceEffect"

describe("useOnceEffect", () => {
  test("should be defined", () => {
    expect(useOnceEffect).toBeDefined()
  })

  test("无条件触发一次", () => {
    const fn = jest.fn()
    const clearFn = jest.fn()
    const { rerender } = renderHook(() => {
      useOnceEffect(() => {
        fn()
        return () => {
          clearFn()
        }
      })
    })
    expect(fn).toHaveBeenCalledTimes(1)
    expect(clearFn).not.toHaveBeenCalled()
    rerender()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(clearFn).toHaveBeenCalledTimes(1)
    rerender()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(clearFn).toHaveBeenCalledTimes(1)
  })

  test("符合条件时触发 1", () => {
    const fn = jest.fn()
    const clearFn = jest.fn()
    let condition = false
    const { rerender } = renderHook(() => {
      useOnceEffect(
        () => {
          fn()
          return () => {
            clearFn()
          }
        },
        undefined,
        () => condition
      )
    })
    expect(fn).not.toHaveBeenCalled()
    rerender()
    expect(fn).not.toHaveBeenCalled()
    expect(clearFn).not.toHaveBeenCalled()
    condition = true
    rerender()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(clearFn).not.toHaveBeenCalled()
    rerender()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(clearFn).toHaveBeenCalledTimes(1)
  })

  test("符合条件时触发 2", () => {
    const fn = jest.fn()
    const clearFn = jest.fn()
    const condition = { current: false }
    const { rerender } = renderHook(() => {
      useOnceEffect(
        () => {
          fn()
          return () => {
            clearFn()
          }
        },
        undefined,
        condition
      )
    })
    expect(fn).not.toHaveBeenCalled()
    rerender()
    expect(fn).not.toHaveBeenCalled()
    expect(clearFn).not.toHaveBeenCalled()
    condition.current = true
    rerender()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(clearFn).not.toHaveBeenCalled()
    rerender()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(clearFn).toHaveBeenCalledTimes(1)
  })

  test("测试依赖数组", () => {
    const fn = jest.fn()
    const clearFn = jest.fn()
    let count = 0
    let condition = false

    const { rerender } = renderHook(() => {
      useOnceEffect(
        () => {
          fn()
          return () => {
            clearFn()
          }
        },
        [count],
        () => condition
      )
    })
    expect(fn).not.toHaveBeenCalled()
    condition = true
    rerender()
    expect(fn).not.toHaveBeenCalled()
    count++
    rerender()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(clearFn).not.toHaveBeenCalled()
    rerender()
    expect(clearFn).not.toHaveBeenCalled()
    count++
    rerender()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(clearFn).toHaveBeenCalledTimes(1)
  })
})
