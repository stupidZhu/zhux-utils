import { act, renderHook } from "@testing-library/react-hooks"
import { useState } from "react"
import useWhyDidYouRender from "./../useWhyDidYouRender"

describe("useWhyDidYouRender", () => {
  test("should be defined", () => {
    expect(useWhyDidYouRender).toBeDefined()
  })

  test("should work", () => {
    console.log = jest.fn()

    const { result } = renderHook(() => {
      const [count, setCount] = useState(100)
      useWhyDidYouRender("test", { count })
      return {
        setCount,
      }
    })

    act(() => {
      result.current.setCount(1)
    })

    expect(console.log).toHaveBeenCalledWith("test", "---", { count: { prev: 100, current: 1 } })
  })
})
