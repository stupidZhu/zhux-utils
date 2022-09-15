import { cloneDeep } from "lodash"
import { useCallback } from "react"
import { IKey, IObj } from "zhux-utils/dist/type"
import { CommonComProps } from "../../type"
import useCtrlComponent from "../useCtrlComponent/useCtrlComponent"
import useMemoValue from "../useMemoValue/useMemoValue"

export type ChangeFieldFunc<T = any> = (changeType: "edit" | "del" | "add", value?: T & { _key?: IKey }) => IKey | undefined

interface UseCustomFieldsProps<T extends IObj>
  extends Omit<CommonComProps<Array<T & { _key: IKey }>>, "className" | "style"> {
  templateItem: T
  addType?: "push" | "unshift"
}

const useCustomFields = <T extends IObj = any>(props: UseCustomFieldsProps<T>) => {
  const { templateItem: item, addType = "push" } = props
  const [fields, setFields] = useCtrlComponent<Array<T & { _key: IKey }>>(props, { defaultValue: [] })

  const templateItem = useMemoValue(item)

  const changeField: ChangeFieldFunc<T> = useCallback(
    (changeType, value) => {
      const _fields = [...fields]
      let key: IKey | undefined = undefined

      if (changeType === "add") {
        const v: any = value ?? cloneDeep(templateItem)
        if (!v._key) v._key = Date.now() + Math.random()
        _fields[addType](v)
        key = v._key
      } else {
        if (!value?._key) return
        const index = _fields.findIndex(item => item._key === value._key)
        if (index === -1) return

        if (changeType === "del") _fields.splice(index, 1)
        else _fields[index] = value as T & { _key: IKey }

        key = value._key
      }
      setFields(_fields)
      return key
    },
    [addType, fields, templateItem]
  )

  return [fields, changeField] as const
}

export default useCustomFields
