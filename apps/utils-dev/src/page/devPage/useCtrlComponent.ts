import { useMemoizedFn } from "ahooks"
import { useMemo, useState } from "react"
import { IObj } from "zhux-utils/dist/type"

export interface UseCtrlComponentOptions<T = any> {
  defaultValuePropName?: string
  valuePropName?: string
  onChangePropName?: string
  defaultValue?: T
}

// * 因为存在 *PropName 所以没有进行类型推断
const useCtrlComponent = <T = any>(props: IObj, options: UseCtrlComponentOptions<T> = {}) => {
  const {
    defaultValuePropName = "defaultValue",
    valuePropName = "value",
    onChangePropName = "onChange",
    defaultValue,
  } = options
  const [_value, _onChange] = useState<T>(props[defaultValuePropName] ?? defaultValue)
  // 如果传入了 value 则说明组件是受控的，就用不到上面的 useState
  const value: T = useMemo(() => props[valuePropName] ?? _value, [_value, props, valuePropName])

  const onChange = useMemoizedFn((newValue: T | ((val: T) => T), ...rest: any[]) => {
    // if (typeof newValue === "function") newValue = (newValue as Function)(value)
    if (newValue === value) return
    // 无论是否受控都要执行传入的 onChange
    props[onChangePropName]?.(newValue, ...rest)
    // 如果组件是受控的就不需要触发内部定义的 _onChange
    if (!(valuePropName in props)) _onChange(newValue)
  })

  return [value, onChange] as const
}

export default useCtrlComponent
