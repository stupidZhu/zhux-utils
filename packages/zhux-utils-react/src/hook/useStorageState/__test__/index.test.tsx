import { act, renderHook } from "@testing-library/react-hooks"
import React from "react"
import { StorageHelper } from "zhux-utils"
import { ConfigProvider } from "../../../component/ConfigProvider/ConfigProvider"
import { WithChildren } from "../../../type"
import useStorageState from "../useStorageState"

describe("useStorageState", () => {
  test("should be defined", () => {
    expect(useStorageState).toBeDefined()
  })

  afterEach(() => {
    localStorage.clear()
  })

  const defaultValue = { str: "storage", num: 10, arr: [1, 2, 3], obj: { hello: "world" } }

  test("三种 set 方式", () => {
    const { result, rerender } = renderHook(() => useStorageState("TEST", defaultValue))
    expect(result.current[0]).toEqual(defaultValue)

    act(() => {
      result.current[1]({ str: "helloStorage" })
    })
    expect(result.current[0].str).toBe("helloStorage")

    act(() => {
      result.current[1]("arr", [2, 3, 4])
    })
    expect(result.current[0].arr).toEqual([2, 3, 4])

    act(() => {
      result.current[1](v => ({ ...v, num: 100 }))
    })
    expect(result.current[0].num).toBe(100)
    expect(result.current[0]).toEqual({ str: "helloStorage", num: 100, arr: [2, 3, 4], obj: { hello: "world" } })
  })

  const storageHelper1 = new StorageHelper("CUSTOM1")
  const storageHelper2 = new StorageHelper("CUSTOM2")
  const wrapper: React.FC<WithChildren> = ({ children }) => (
    <ConfigProvider storageHelper={storageHelper1}>{children}</ConfigProvider>
  )

  test("with ConfigProvider", () => {
    renderHook(() => useStorageState("TEST", defaultValue), {
      wrapper,
    })

    expect(localStorage.getItem("TEST_TEST")).toBeNull()
    expect(localStorage.getItem("CUSTOM1_TEST")).not.toBeNull()
  })

  test("with customStorageHelper", () => {
    renderHook(() => useStorageState("TEST", defaultValue, storageHelper2), {
      wrapper,
    })

    expect(localStorage.getItem("TEST_TEST")).toBeNull()
    expect(localStorage.getItem("CUSTOM1_TEST")).toBeNull()
    expect(localStorage.getItem("CUSTOM2_TEST")).not.toBeNull()
  })
})
