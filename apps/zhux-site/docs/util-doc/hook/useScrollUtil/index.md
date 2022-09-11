---
title: useScrollUtil
---

# useScrollUtil

<code src="./demos/api.tsx"></code>

<code src="./demos/reach.tsx"></code>

<code src="./demos/scrollWrapper.tsx"></code>

## 关于 ScrollWrapper

```ts
// props 类型
type ScrollRef = { current: ReturnType<typeof useScrollUtil> | undefined }
interface ScrollWrapperProps extends ClassStyle, Omit<UseScrollUtilProps, "scrollDom"> {
  scrollRef?: ScrollRef
}
```

可以通过 scrollRef 获取 useScrollUtil result 的所有方法

## props (UseScrollUtilProps)

| 参数           | 说明                 | 类型                                                                               | 默认值 |
| :------------- | :------------------- | :--------------------------------------------------------------------------------- | :----- |
| scrollType     | 滚动类型             | `"horizontal" \| "vertical"`                                                       | 必填   |
| scrollDom      | 滚动容器             | `IRef<HTMLElement>`                                                                | 必填   |
| reachThreshold | 触碰边界阈值 (px)    | `number`                                                                           | 20     |
| onScroll       | 滚动时触发的事件     | `(data?: ScrollInfo, e: any) => void`                                              | /      |
| onReach        | 接触边界时触发的事件 | `(type: "top" \| "bottom" \| "left" \| "right", info: ScrollInfo, e: any) => void` | /      |

## result

| 数据/方法     | 说明                                               | 类型                                                |
| :------------ | :------------------------------------------------- | :-------------------------------------------------- |
| scrollTo      | 滚动到指定位置，默认`behavior: 'smooth'`           | `(options?: ScrollToOptions) => void`               |
| scrollBy      | 滚动指定像素，默认`behavior: 'smooth'`             | `(options?: ScrollToOptions) => void`               |
| getScrollInfo | 获取滚动容器信息                                   | `() => ScrollInfo`                                  |
| scrollPixel   | 滚动 xx 像素，pixel<5 时`behavior: 'auto'`         | `(type: 'prev' \| 'next', pixel = 20) => void`      |
| turnPage      | 滚动一页                                           | `(type: 'prev' \| 'next', holdPixel = 20) => void`  |
| autoScroll    | 自动滚动（返回一个函数，调用返回函数停止自动滚动） | `(interval = 100, speed = 1) => (() => void)`       |
| autoTurnPage  | 自动翻页（返回一个函数，调用返回函数停止自动翻页） | `(interval = 5000, holdPixel = 20) => (() => void)` |

## types

| 类型       | 说明            | 类型                                                                                                                              |
| :--------- | :-------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| ScrollInfo | scroll 容器信息 | `{ offsetWidth: number; offsetHeight: number; scrollHeight: number; scrollLeft: number; scrollTop: number; scrollWidth: number }` |
