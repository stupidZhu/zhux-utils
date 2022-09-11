---
order: 300
---

# useDateTime

<code src="./demos/base.tsx"></code>

## props

| 参数      | 说明                             | 类型                 | 默认值                |
| :-------- | :------------------------------- | :------------------- | :-------------------- |
| formatter | dayjs (moment) 格式化字符串/数组 | `string \| string[]` | 'YYYY-MM-DD HH:mm:ss' |
| interval  | 刷新间隔 (>=1000)                | `number`             | 1000                  |

## result

| 数据/方法 | 说明                             | 类型     |
| :-------- | :------------------------------- | :------- |
| formatRes | 数组第一项，格式化后的字符串     | `string` |
| date      | 数组第二项，当前时间的 Date 对象 | `Date`   |
