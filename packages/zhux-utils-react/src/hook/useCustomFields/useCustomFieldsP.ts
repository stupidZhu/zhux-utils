import { cloneDeep } from "lodash"
import { useCallback } from "react"
import { IKey } from "zhux-utils/dist/type"
import { CommonComProps } from "../../type"
import useCtrlComponent from "../useCtrlComponent/useCtrlComponent"
import useMemoValue from "../useMemoValue/useMemoValue"

export type ChangeFieldFunc<T = any> = (
  changeType: "edit" | "del" | "add",
  options?: { index?: number; value?: T & { _key?: IKey } }
) => { key: IKey | undefined; flag: boolean }

interface UseCustomFieldsProps<T> extends Omit<CommonComProps<Array<T & { _key: IKey }>>, "className" | "style"> {
  templateItem: T
  addType?: "push" | "unshift"
}

const useCustomFields = <T = any>(props: UseCustomFieldsProps<T>) => {
  const { templateItem: item, addType = "push" } = props
  const [fields, setFields] = useCtrlComponent<Array<T & { _key: IKey }>>(props, { defaultValue: [] })

  const templateItem = useMemoValue(item)

  const changeField: ChangeFieldFunc<T> = useCallback(
    (changeType, options = {}) => {
      const _fields = [...fields]
      const { index, value } = options
      let key: IKey | undefined = undefined,
        flag = false

      if (changeType === "del") {
        if (typeof index === "undefined") return { key, flag }
        const item = _fields[index]
        if (item) {
          key = item._key
          flag = true
          _fields.splice(index, 1)
        }
      } else if (changeType === "add") {
        const _key = Date.now() + Math.random()
        const _value = value ? cloneDeep({ ...value, _key }) : cloneDeep({ ...templateItem, _key })
        _fields[addType](_value)
        key = _key
        flag = true
      } else {
        if (typeof index === "undefined" || !value) return { key, flag }
        if (_fields[index]?._key !== value._key) return { key, flag }
        _fields[index] = value as T & { _key: IKey }
        key = value._key
        flag = true
      }
      setFields(_fields)
      return { key, flag }
    },
    [addType, fields, setFields, templateItem]
  )

  return [fields, changeField] as const
}

export default useCustomFields
