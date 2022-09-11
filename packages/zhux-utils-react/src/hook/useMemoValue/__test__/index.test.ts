import { renderHook } from "@testing-library/react-hooks"
import useMemoValue from "../useMemoValue"

describe("useMemoValue", () => {
  test("should be defined", () => {
    expect(useMemoValue).toBeDefined()
  })

  test("测试 useMemoValue", () => {
    const initialValue: any = [1, { hello: "world", aaa: "bbb" }]
    const { result, rerender } = renderHook(({ initialValue }) => useMemoValue(initialValue), {
      initialProps: { initialValue },
    })

    expect(result.current).toBe(initialValue)

    rerender({ initialValue: [1, { aaa: "bbb", hello: "world" }] })
    expect(result.current).toBe(initialValue)

    rerender({ initialValue: [{ hello: "world", aaa: "bbb" }, 1] })
    expect(result.current).not.toBe(initialValue)

    rerender({ initialValue: [{ hello: "world", _aaa: "bbb" }, 1] })
    expect(result.current).not.toBe(initialValue)
  })
})
