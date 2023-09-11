import { useMemoizedFn } from "ahooks"
import { useMemo, useRef, useState } from "react"
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

  const isCtrl = useMemo(() => props.hasOwnProperty(valuePropName), [props, valuePropName])
  const [_value, _onChange] = useState<T>(props[valuePropName] ?? props[defaultValuePropName] ?? defaultValue)
  const valueRef = useRef<T>(_value)
  const value: T = useMemo(() => props[valuePropName] ?? _value, [_value, props, valuePropName])

  const onChange = useMemoizedFn((newValue: T | ((val: T) => T), ...rest: any[]) => {
    const res = typeof newValue === "function" ? (newValue as Function)(valueRef.current) : newValue

    if (valueRef.current === res) return
    valueRef.current = res

    if (!isCtrl) _onChange(valueRef.current)
    props[onChangePropName]?.(valueRef.current, ...rest)
  })

  return [value, onChange] as const
}

export default useCtrlComponent
