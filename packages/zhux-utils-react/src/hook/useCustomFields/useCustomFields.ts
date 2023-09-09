import { useMemoizedFn } from "ahooks"
import { cloneDeep } from "lodash"
import { IObj } from "zhux-utils/dist/type"
import { CtrlProps } from "../../type"
import useMemoValue from "../memo/useMemoValue"
import useCtrlComponent from "../useCtrlComponent/useCtrlComponent"
import {
  ChangeFieldInfo,
  addField as _addField,
  delField as _delField,
  editField as _editField,
  validate as _validate,
} from "./util"

export interface UseCustomFieldsProps<T extends IObj> extends CtrlProps<T[]> {
  templateItem: Partial<T>
  keyName?: string
  validateItem?: (item: Partial<T>) => boolean
  onAction?: (info: ChangeFieldInfo<T>) => void
}

const useCustomFields = <T extends IObj = any>(props: UseCustomFieldsProps<T>) => {
  const { templateItem: item, validateItem, keyName = "id", onAction } = props
  const [fields, setFields] = useCtrlComponent<T[]>(props, { defaultValue: [] })
  const templateItem = useMemoValue(item)

  const addField = useMemoizedFn((value?: Partial<T>, addFunc: "push" | "unshift" = "push") => {
    const template = cloneDeep(templateItem)
    setFields(rawFields => {
      const [fields, info] = _addField({ rawFields, value, keyName, template, addFunc, validateItem })
      onAction?.(info)
      return fields
    })
  })

  const editField = useMemoizedFn((value: Partial<T>, merge?: boolean) => {
    setFields(rawFields => {
      const [fields, info] = _editField({ rawFields, value, keyName, merge })
      onAction?.(info)
      return fields
    })
  })

  const delField = useMemoizedFn((value: Partial<T>) => {
    setFields(rawFields => {
      const [fields, info] = _delField({ rawFields, value, keyName })
      onAction?.(info)
      return fields
    })
  })

  // include 优先级高于 exclude
  const validate = useMemoizedFn((include?: T[], exclude?: T[]) => {
    const info = _validate({ fields, include, exclude, validateItem })
    onAction?.(info)
  })

  return { fields, setFields, addField, editField, delField, validate }
}

export default useCustomFields
