---
title: useCustomFields
---

# useCustomFields

<code src="./demos/base.tsx"></code>

<code src="./demos/base2.tsx"></code>

<code src="./demos/customDemo.tsx"></code>

<code src="./demos/ctrlDemo.tsx"></code>

## props

| 参数         | 说明                                          | 类型                                  | 默认值 |
| :----------- | :-------------------------------------------- | :------------------------------------ | :----- |
| value        | 受控组件 value                                | `CustomFieldItem[]`                   | /      |
| defaultValue | 初始值                                        | `CustomFieldItem[]`                   | /      |
| defaultType  | 新增 field 的默认 type (没用到 type 可以忽略) | `React.Key`                           | /      |
| onChange     | value 改变的回调                              | `(fields: CustomFieldItem[]) => void` | /      |
| formatter    | 对 field 的格式化函数                         | `(field: CustomFieldItem) => any`     | /      |

## result

| 数据/方法    | 说明                                                                                    | 类型                |
| :----------- | :-------------------------------------------------------------------------------------- | :------------------ |
| fields       | 用于渲染的数据，也可作为结果，但还是建议通过 getFormatRes 获取结果                      | `CustomFieldItem[]` |
| changeField  | 对 field 造成改变的一系列操作的处理函数                                                 | `ChangeFieldFunc`   |
| getFormatRes | 获取经过 formatter 处理的结果，结果进行了深拷贝，不用担心对结果进行操作而导致奇怪的问题 | `() => any[]`       |
| checkNull    | fields 非空检查，会检查 undefined，null，""                                             | `CheckNullFunc`     |

## types

| 类型            | 说明             | 类型                                                                                                                     |
| :-------------- | :--------------- | :----------------------------------------------------------------------------------------------------------------------- |
| CustomFieldItem | 单个 field 类型  | `{ type?: React.Key; id: React.Key; label: React.Key; value: any }`                                                      |
| ChangeFieldFunc | changeField 类型 | `(changeType: 'value' \| 'label' \| 'type' \| 'del' \| 'add', index?: number, value?: any) => void`                      |
| CheckNullFunc   | checkNull 类型   | `(properties?: Array<keyof CustomFieldItem>) => { flag: boolean; propName: keyof CustomFieldItem \| ''; index: number }` |
