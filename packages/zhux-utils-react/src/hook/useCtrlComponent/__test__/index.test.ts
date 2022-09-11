import { act, renderHook } from "@testing-library/react-hooks"
import { IObj } from "zhux-utils/dist/type"
import useCtrlComponent from "../useCtrlComponent"

describe("useCtrlComponent", () => {
  test("should be defined", () => {
    expect(useCtrlComponent).toBeDefined()
  })

  test("默认 value 应该是 undefined", () => {
    const { result, rerender } = renderHook(({ initialValue }) => useCtrlComponent<number>(initialValue), {
      initialProps: { initialValue: {} },
    })

    expect(result.current[0]).toBeUndefined()
  })

  test("测试 value 和 defaultValue 参数, 且 defaultValue 只在初次渲染时有效", () => {
    const { result, rerender } = renderHook(({ initialValue }) => useCtrlComponent<number>(initialValue), {
      initialProps: { initialValue: { defaultValue: 0 } as IObj },
    })
    expect(result.current[0]).toBe(0)

    rerender({ initialValue: { defaultValue: 1 } })
    expect(result.current[0]).toBe(0)

    rerender({ initialValue: { value: 2 } })
    expect(result.current[0]).toBe(2)

    rerender({ initialValue: { value: 3, defaultValue: 4 } })
    expect(result.current[0]).toBe(3)
  })

  test("onChange 参数", () => {
    const fn = jest.fn((...rest: any[]) => {})
    const initialValue = {
      value: 1,
      onChange(val: number) {
        fn("hello")
        this.value = val
      },
    }
    const { result, rerender } = renderHook(({ initialValue }) => useCtrlComponent<number>(initialValue), {
      initialProps: { initialValue },
    })

    expect(result.current[0]).toBe(1)

    act(() => result.current[1](2))
    expect(fn).toHaveBeenCalledWith("hello")
    // expect(result.current[0]).toBe(2) 为什么这个不行
    expect(initialValue.value).toBe(2)
  })

  test("测试 useCtrlComponent 的第二个参数", () => {
    const initialValue = {
      _value: 1,
      _onChange(val: number) {
        this._value = val
      },
    }
    const option = {
      defaultValuePropName: "_defaultValue",
      valuePropName: "_value",
      onChangePropName: "_onChange",
      defaultValue: 0,
    }

    const { result, rerender } = renderHook(({ initialValue }) => useCtrlComponent<number>(initialValue, option), {
      initialProps: { initialValue: {} },
    })

    expect(result.current[0]).toBe(0)

    rerender({ initialValue })
    expect(result.current[0]).toBe(1)

    act(() => result.current[1](2))
    expect(initialValue._value).toBe(2)
  })
})
