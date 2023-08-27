---
order: 400
toc: content
group:
  title: hooks
  order: 1
---

# useAsyncMemo

本来实现了一个可用于异步获取值的 useMemo，然后又参照 [react-query/useQuery](https://tanstack.com/query/v4/docs/reference/useQuery) 的 api 加上了状态和一些参数，结果发现这不就是 [ahooks/useRequest](https://ahooks.js.org/zh-CN/hooks/use-request/index) 或 [react-query/useQuery](https://tanstack.com/query/v4/docs/reference/useQuery) 的乞丐版吗 🤣

<code src="./demo/useAsyncMemo/base.tsx"></code>

<code src="./demo/useAsyncMemo/options.tsx"></code>

## props

| 参数    | 说明                                                        | 类型                          | 默认值 |
| :------ | :---------------------------------------------------------- | :---------------------------- | :----- |
| factory | 类似 useMemo 第一个参数，不过需要返回一个 promise           | `() => Promise<T>`            | 必填   |
| deps    | 类似 useMemo 第二个参数，值改变会触发 useAsyncMemo 重新求值 | `DependencyList \| undefined` | /      |
| options | 一些其他参数                                                | `UseAsyncMemoOptions<T>`      | /      |

## options (UseAsyncMemoOptions\<T\>)

| 参数         | 说明                                          | 类型     | 默认值 |
| :----------- | :-------------------------------------------- | :------- | :----- |
| defaultValue | 获取 promise 值之前的默认值，不传为 undefined | `T`      |        |
| reFetchTimes | reject 后重新尝试的次数                       | `number` | 0      |
| reFetchDelay | 每次重新尝试前等待时间                        | `number` | 0      |

## result

| 数据/方法 | 说明             | 类型                                          |
| :-------- | :--------------- | :-------------------------------------------- |
| value     | promise 的返回值 | `T`                                           |
| status    | hook 的状态      | `"idle" \| "error" \| "loading" \| "success"` |
