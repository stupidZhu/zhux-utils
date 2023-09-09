import { cloneDeep, merge as mergeFunc } from "lodash"
import { nanoid } from "nanoid"

type Actions = "add" | "edit" | "del" | "validate"
export type ChangeFieldInfo<T> = { flag: boolean; type: Actions; field?: Partial<T>; index?: number; message?: string }
export type ValidateItemFunc<T> = (item: Partial<T>) => boolean

type FieldWithVisible<T> = { field: T; _visible: boolean }
const isFieldWithVisible = <T>(v: T | FieldWithVisible<T>): v is FieldWithVisible<T> => {
  return (v as any).hasOwnProperty("_visible")
}

export const validateFields = <T = any>(
  fields: T[] | FieldWithVisible<T>[],
  validateItem: ValidateItemFunc<T>
): ChangeFieldInfo<T> | undefined => {
  for (let i = 0; i < fields.length; i++) {
    const temp = fields[i]
    let field: T
    let visible = true
    if (isFieldWithVisible(temp)) {
      field = temp.field
      visible = temp._visible
    } else {
      field = temp
    }

    if (!visible) continue
    const flag = validateItem(field)
    if (!flag) {
      return { flag: false, type: "validate", field, index: i, message: `第 ${i + 1} 项校验不通过` }
    }
  }
}

interface BaseFieldActionProps<T> {
  rawFields: T[]
  value: Partial<T>
  keyName: string
}

interface AddFieldProps<T> extends Omit<BaseFieldActionProps<T>, "value"> {
  value?: Partial<T>
  template: Partial<T>
  addFunc: "push" | "unshift"
  validateItem?: ValidateItemFunc<T>
}
export const addField = <T>(props: AddFieldProps<T>): [T[], ChangeFieldInfo<T>] => {
  const { rawFields, value, keyName, template, addFunc, validateItem } = props
  if (validateItem) {
    const res = validateFields(rawFields, validateItem)
    if (res) return [rawFields, res]
  }

  const field: any = value ?? cloneDeep(template)
  if (!field[keyName]) field[keyName] = nanoid()

  if (rawFields.find(item => item[keyName] === field[keyName])) {
    return [rawFields, { flag: false, type: "add", message: `已经存在 ${keyName} 为 ${field[keyName]} 的项` }]
  }

  const fields = [...rawFields]
  fields[addFunc](field)
  const index = addFunc === "push" ? fields.length - 1 : 0

  return [fields, { flag: true, type: "add", field, index }]
}

interface EditFieldProps<T> extends BaseFieldActionProps<T> {
  merge?: boolean
}
export const editField = <T>(props: EditFieldProps<T>): [T[], ChangeFieldInfo<T>] => {
  const { rawFields, value, keyName, merge } = props
  if (!value?.hasOwnProperty(keyName)) {
    return [rawFields, { flag: false, type: "edit", message: `${keyName} 缺失` }]
  }
  const index = rawFields.findIndex(item => item[keyName] === value[keyName])
  if (index === -1) {
    return [rawFields, { flag: false, type: "edit", message: `没有 ${keyName} 为 ${value[keyName]} 的记录` }]
  }

  const fields = [...rawFields]
  // ? 这个顺序对吗
  const field = merge ? mergeFunc(fields[index], value) : (value as T)
  fields[index] = field
  return [fields, { flag: true, type: "edit", index, field }]
}

export const delField = <T>(props: BaseFieldActionProps<T>): [T[], ChangeFieldInfo<T>] => {
  const { rawFields, value, keyName } = props
  if (!value?.hasOwnProperty(keyName)) {
    return [rawFields, { flag: false, type: "del", message: `${keyName} 缺失` }]
  }
  const index = rawFields.findIndex(item => item[keyName] === value[keyName])
  if (index === -1) {
    return [rawFields, { flag: false, type: "del", message: `没有 ${keyName} 为 ${value[keyName]} 的记录` }]
  }

  const fields = [...rawFields]
  fields.splice(index, 1)
  return [fields, { flag: true, type: "del", index }]
}

interface ValidateProps<T> {
  fields: T[]
  include?: T[]
  exclude?: T[]
  validateItem?: ValidateItemFunc<T>
}
export const validate = <T>(props: ValidateProps<T>): ChangeFieldInfo<T> => {
  const { fields, include, exclude = [], validateItem } = props

  if (!validateItem) return { flag: false, type: "validate", message: "validateItem 参数缺失" }

  let list: FieldWithVisible<T>[]
  if (include?.length) {
    list = fields.map(field => {
      return { field, _visible: include.includes(field) }
    })
  } else {
    list = fields.map(field => {
      return { field, _visible: !exclude.includes(field) }
    })
  }

  return validateFields(list, validateItem) ?? { flag: true, type: "validate" }
}
