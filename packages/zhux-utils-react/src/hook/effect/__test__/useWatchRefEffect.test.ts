import { renderHook } from "@testing-library/react-hooks"
import { useWatchEffect, useWatchRefEffect } from "../useWatchEffect"

describe("useWatchRefEffect", () => {
  test("should be defined", () => {
    expect(useWatchRefEffect).toBeDefined()
    expect(useWatchEffect).toBeDefined()
  })

  test("测试 useWatchEffect", () => {
    const fn = jest.fn((val, prevVal) => {})
    const clearFn = jest.fn((val, prevVal) => {})
    let count = 0
    const { rerender } = renderHook(() => {
      useWatchEffect((val, prevVal) => {
        fn(val, prevVal)
        return () => {
          clearFn(val, prevVal)
        }
      }, count)
    })

    expect(fn).toHaveBeenCalledWith(0, undefined)
    expect(clearFn).not.toHaveBeenCalled()
    rerender()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(clearFn).toHaveBeenCalledTimes(0)
    count++
    rerender()
    expect(clearFn).toHaveBeenCalledWith(0, undefined)
    expect(fn).toHaveBeenCalledWith(1, 0)
  })

  test("测试 useWatchRefEffect", () => {
    const fn = jest.fn((val, prevVal) => {})
    const clearFn = jest.fn((val, prevVal) => {})
    const fnRef = jest.fn((val, prevVal) => {})
    const clearFnRef = jest.fn((val, prevVal) => {})
    let count = 0
    const countRef = { current: 0 }
    const { rerender } = renderHook(() => {
      useWatchRefEffect(
        (val, prevVal) => {
          fn(val, prevVal)
          return () => {
            clearFn(val, prevVal)
          }
        },
        () => count
      )
      useWatchRefEffect((val, prevVal) => {
        fnRef(val, prevVal)
        return () => {
          clearFnRef(val, prevVal)
        }
      }, countRef)
    })

    expect(fn).toHaveBeenCalledWith(0, undefined)
    expect(clearFn).not.toHaveBeenCalled()
    expect(fnRef).toHaveBeenCalledWith(0, undefined)
    expect(clearFnRef).not.toHaveBeenCalled()
    rerender()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(clearFn).toHaveBeenCalledTimes(0)
    expect(fnRef).toHaveBeenCalledTimes(1)
    expect(clearFnRef).toHaveBeenCalledTimes(0)
    count++
    rerender()
    expect(fn).toHaveBeenCalledWith(1, 0)
    expect(clearFn).toHaveBeenCalledWith(0, undefined)
    expect(fnRef).toHaveBeenCalledTimes(1)
    expect(clearFnRef).toHaveBeenCalledTimes(0)
    countRef.current = 1
    rerender()
    expect(fnRef).toHaveBeenCalledWith(1, 0)
    expect(clearFnRef).toHaveBeenCalledWith(0, undefined)
  })
})
