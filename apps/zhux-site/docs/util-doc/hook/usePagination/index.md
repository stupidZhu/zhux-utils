---
title: usePagination
---

# usePagination

<code src="./demos/base.tsx"></code>

<code src="./demos/ctrlDemo.tsx"></code>

## props (UsePaginationProps)

| 参数              | 说明                               | 类型                     | 默认值      |
| :---------------- | :--------------------------------- | :----------------------- | :---------- |
| total             | 条目总数                           | `number`                 | 必填        |
| pageSize          | 每页 item 数                       | `number`                 | `10`        |
| defaultValue      | 初始页数                           | `number`                 | `1`         |
| value             | 页数（受控）                       | `number`                 | `undefined` |
| onChange          | 页数改变的回调                     | `(page: number) => void` | `undefined` |
| fastForwardPages  | 点击省略号快进快退页数             | `number`                 | `5`         |
| displayPagesCount | 省略号中间展示的页数的数量（奇数） | `number`                 | `5`         |

## result

| 数据/方法 | 说明                                                                | 类型                                                                  |
| :-------- | :------------------------------------------------------------------ | :-------------------------------------------------------------------- |
| list      | 用于渲染的列表                                                      | `PaginationItem[]`                                                    |
| summary   | 当前组件状态的概述                                                  | `UsePaginationProps`                                                  |
| itemClick | 处理 item 的点击事件                                                | `(item: PaginationItem) => void`                                      |
| utils     | summary: 当前组件状态的概述; calcPage: 计算 page 的合法值(防止溢出) | `{ summary: UsePaginationProps; calcPage: (page: number) => number }` |

## types

| 类型               | 说明 | 类型                                                                                    |
| :----------------- | :--- | :-------------------------------------------------------------------------------------- |
| PaginationItemType |      | `"page" \| "first" \| "last" \| "next" \| "prev" \| "ellipsis-prev" \| "ellipsis-next"` |
| PaginationItem     |      | `{ type: PaginationItemType; page: number; active: boolean; disabled: boolean }`        |
