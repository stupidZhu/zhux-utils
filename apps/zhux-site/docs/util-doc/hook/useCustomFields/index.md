---
title: useCustomFields
---

# useCustomFields

```ts
// 为了方便下面的受控组件 demo，下面的 demo 中用到了 type BaseDemoProps = Omit<CommonComProps<Array<FieldItem & { _key: IKey }>>, "className" | "style">
// 其中 Omit<CommonComProps<T>, "className" | "style"> 的类型为
type Temp<T> = { value?: T; defaultValue?: T; onChange?: (value: T) => void }
```

<code src="./demos/base.tsx"></code>

<code src="./demos/ctrlDemo.tsx"></code>

## props

| 参数         | 说明             | 类型                                          | 默认值 |
| :----------- | :--------------- | :-------------------------------------------- | :----- |
| value        | 受控组件 value   | `T & { _key: IKey }`                          | /      |
| defaultValue | 初始值           | `T & { _key: IKey }`                          | /      |
| onChange     | value 改变的回调 | `(fields: Array<T & { _key: IKey }>) => void` | /      |
| templateItem | 新增值的模板     | `T`                                           | /      |
| addType      | 新增值的方式     | `"push" \| "unshift"`                         | /      |

## result

| 数据/方法   | 说明                                                               | 类型                        |
| :---------- | :----------------------------------------------------------------- | :-------------------------- |
| fields      | 用于渲染的数据，也可作为结果，但还是建议通过 getFormatRes 获取结果 | `Array<T & { _key: IKey }>` |
| changeField | 对 field 造成改变的一系列操作的处理函数                            | `ChangeFieldFunc`           |

## types

| 类型            | 说明 | 类型                                                                                                                  |
| :-------------- | :--- | :-------------------------------------------------------------------------------------------------------------------- |
| ChangeFieldFunc | /    | `ChangeFieldFunc<T = any> = (changeType: "edit" \| "del" \| "add", value?: T & { _key?: IKey }) => IKey \| undefined` |
