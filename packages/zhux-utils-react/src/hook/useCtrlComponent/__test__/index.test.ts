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

  test("非受控模式", () => {
    const initialValue = { defaultValue: 1 }
    const { result, rerender } = renderHook(({ initialValue }) => useCtrlComponent<number>(initialValue), {
      initialProps: { initialValue },
    })
    const onChange = result.current[1]

    expect(result.current[0]).toBe(1)

    act(() => onChange(2))
    expect(result.current[0]).toBe(2)

    act(() => onChange(-100))
    expect(result.current[0]).toBe(-100)
  })

  test("受控模式", () => {
    let initialValue = {
      value: 1,
      onChange(val: number) {
        this.value = val
      },
    }

    const { result, rerender } = renderHook(({ initialValue }) => useCtrlComponent<number>(initialValue), {
      initialProps: { initialValue },
    })
    const onChange = result.current[1]

    expect(result.current[0]).toBe(1)

    act(() => onChange(2))
    expect(initialValue.value).toBe(2)
    initialValue = { ...initialValue }
    // * 因为 initialValue 改变不会引起组件重渲染（他不是useState），需要手动重渲染
    rerender({ initialValue })
    expect(result.current[0]).toBe(2)
  })

  test("onChange 参数", () => {
    const fn = jest.fn((...rest: any[]) => {})
    const initialValue = {
      onChange(val: number, ...rest: any[]) {
        fn(val, ...rest)
      },
    }
    const { result } = renderHook(({ initialValue }) => useCtrlComponent<number>(initialValue), {
      initialProps: { initialValue },
    })
    const onChange = result.current[1]

    act(() => onChange(2, "hello", 1))
    expect(fn).toHaveBeenCalledWith(2, "hello", 1)
  })

  test("测试 useCtrlComponent 的第二个参数", () => {
    let initialValue = {
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
    const onChange = result.current[1]

    expect(result.current[0]).toBe(0)

    rerender({ initialValue })
    expect(result.current[0]).toBe(1)

    act(() => onChange(2))
    initialValue = { ...initialValue }
    rerender({ initialValue })
    expect(initialValue._value).toBe(2)
  })

  test("测试 onChange 传入函数", () => {
    const fn = jest.fn((...rest: any[]) => {})
    const initialValue = {
      onChange(val: number) {
        fn(val)
      },
      defaultValue: 0,
    }

    const { result } = renderHook(({ initialValue }) => useCtrlComponent<number>(initialValue), {
      initialProps: { initialValue },
    })
    const onChange = result.current[1]

    act(() => {
      for (let i = 0; i < 3; i++) {
        onChange(v => v + 1)
      }
    })

    expect(fn).toHaveBeenCalledTimes(3)
    expect(fn).toHaveBeenCalledWith(1)
    expect(fn).toHaveBeenCalledWith(2)
    expect(fn).toHaveBeenCalledWith(3)
    expect(result.current[0]).toBe(3)
  })
})
