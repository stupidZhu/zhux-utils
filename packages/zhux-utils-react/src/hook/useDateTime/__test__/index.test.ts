import { renderHook } from "@testing-library/react-hooks"
import useDateTime from "../useDateTime"

// https://github.com/testing-library/react-testing-library/issues/281#issuecomment-480349256

const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})
afterAll(() => {
  console.error = originalError
})

describe("useDateTime", () => {
  test("should be defined", () => {
    expect(useDateTime).toBeDefined()
  })

  beforeEach(() => {
    // 1640966400000
    jest.useFakeTimers().setSystemTime(new Date("2022-01-01 00:00:00"))
  })

  test("测试默认情况", () => {
    const { result } = renderHook(({ initialValue }) => useDateTime(initialValue), {
      initialProps: { initialValue: undefined as any },
    })

    expect(result.current[0]).toBe("2022-01-01 00:00:00")
    expect(result.current[1].getTime()).toBe(1640966400000)

    jest.advanceTimersByTime(1000)
    expect(result.current[0]).toBe("2022-01-01 00:00:01")
    expect(result.current[1].getTime()).toBe(1640966401000)

    jest.advanceTimersByTime(5000)
    expect(result.current[0]).toBe("2022-01-01 00:00:06")
    expect(result.current[1].getTime()).toBe(1640966406000)
  })

  test("测试参数", () => {
    const { result, rerender } = renderHook(({ initialValue }) => useDateTime(initialValue), {
      initialProps: { initialValue: { formatter: "YYYY-MM-DD" } as any },
    })

    expect(result.current[0]).toBe("2022-01-01")
    expect(result.current[1].getTime()).toBe(1640966400000)

    rerender({ initialValue: { formatter: ["YYYY-MM-DD", "HH:mm:ss"] } })
    jest.advanceTimersByTime(1000)

    expect(result.current[0]).toEqual(["2022-01-01", "00:00:01"])
    expect(result.current[1].getTime()).toBe(1640966401000)

    rerender({ initialValue: { formatter: ["YYYY-MM-DD", "HH:mm:ss"], interval: 3000 } })
    jest.advanceTimersByTime(2000)

    expect(result.current[0]).toEqual(["2022-01-01", "00:00:01"])
    expect(result.current[1].getTime()).toBe(1640966401000)

    jest.advanceTimersByTime(1000)
    expect(result.current[0]).toEqual(["2022-01-01", "00:00:04"])
    expect(result.current[1].getTime()).toBe(1640966404000)

    jest.advanceTimersByTime(6000)
    expect(result.current[0]).toEqual(["2022-01-01", "00:00:10"])
    expect(result.current[1].getTime()).toBe(1640966410000)
  })
})
