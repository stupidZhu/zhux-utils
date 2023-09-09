---
order: 1200
toc: content
group:
  title: hooks
  order: 1
---

# useCustomFields

<code src="./demo/useCustomField/base.tsx"></code>

<code src="./demo/useCustomField/ctrlDemo.tsx"></code>

## props

| 参数         | 说明               | 类型                                 | 默认值 |
| :----------- | :----------------- | :----------------------------------- | :----- |
| value        | 受控组件 value     | `T`                                  | /      |
| defaultValue | 初始值             | `T`                                  | /      |
| onChange     | value 改变的回调   | `(value: T, ...rest: any[]) => void` | /      |
| templateItem | 新增值的模板       | `Partial<T>`                         | 必填   |
| keyName      | 唯一标识字段       | `string`                             | "id"   |
| validateItem | 对每一项校验的函数 | `(item: Partial<T>) => boolean`      | /      |
| onAction     | 监听操作的结果     | `(info: ChangeFieldInfo<T>) => void` | /      |

## result

| 数据/方法 | 说明                                 | 类型                                                                         |
| :-------- | :----------------------------------- | :--------------------------------------------------------------------------- |
| fields    | 用于渲染的数据                       | `T[]`                                                                        |
| setFields | 直接设置 fields 的函数（一般不使用） | `(v: T[] \| ((val: T[]) => T[]), ...rest: any[]) => void`                    |
| addField  | 新增一项的方法                       | `(value?: Partial<T> \| undefined, addFunc?: "push" \| "unshift") => void`   |
| editField | 编辑一项的方法                       | `(value: Partial<T>, merge?: boolean) => void`                               |
| delField  | 删除一项的方法                       | `(value: Partial<T>) => void`                                                |
| validate  | 校验数据的方法                       | `validate: (include?: T[] \| undefined, exclude?: T[] \| undefined) => void` |

## types

| 类型                 | 说明           | 类型                                                                                     |
| :------------------- | :------------- | :--------------------------------------------------------------------------------------- |
| Actions              | 操作类型       | `"add" \| "edit" \| "del" \| "validate"`                                                 |
| ChangeFieldInfo\<T\> | 操作的结果信息 | `{ flag: boolean; type: Actions; field?: Partial<T>; index?: number; message?: string }` |

## 备注

除了新增操作，所有类型为`Partial<T>`的值都需要传入 `keyName` 字段，例如

```ts
delField({ id: 1 })
// 当 keyName = myKey 时
editField({ myKey: 2 }, true)
```

新增如果不传入 `keyName` 字段的话，会使用 `nanoid` 自动生成
