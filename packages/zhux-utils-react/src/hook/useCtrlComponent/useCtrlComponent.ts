import { useCallback, useMemo, useState } from "react"
import { IObj } from "zhux-utils/dist/type"

export interface UseCtrlComponentOptions<T = any> {
  defaultValuePropName?: string
  valuePropName?: string
  onChangePropName?: string
  defaultValue?: T
}

const useCtrlComponent = <T = any>(props: IObj, options: UseCtrlComponentOptions<T> = {}) => {
  const {
    defaultValuePropName = "defaultValue",
    valuePropName = "value",
    onChangePropName = "onChange",
    defaultValue,
  } = options
  const [_value, _onChange] = useState<T>(props[defaultValuePropName] ?? defaultValue)
  const value: T = useMemo(() => props[valuePropName] ?? _value, [_value, props, valuePropName])

  const onChange = useCallback(
    (newValue: T | ((val: T) => T), ...rest: any[]) => {
      if (typeof newValue === "function") newValue = (newValue as Function)(value)
      if (newValue === value) return
      props[onChangePropName]?.(newValue, ...rest)
      if (!(valuePropName in props)) _onChange(newValue)
    },
    [onChangePropName, props, valuePropName, value]
  )
  return [value, onChange] as const
}

export default useCtrlComponent
