---
order: 100
---

# useWatchEffect

<code src="./demos/watch.tsx"></code>

<code src="./demos/watchRef.tsx"></code>

## WARNING !!!

**如果 dep 改变不会触发组件重渲染，那使用 useWatchEffect 监听这个 dep 往往是无效的！！！**

## props

| 参数                    | 说明                          | 类型                                           | 默认值 |
| :---------------------- | :---------------------------- | :--------------------------------------------- | :----- |
| cb                      | 和 useEffect 的第一个参数一致 | `EffectCallback`                               | 必填   |
| dep (useWatchEffect)    | 需要监听的值                  | `any`                                          | 必填   |
| dep (useWatchRefEffect) | 需要监听的值                  | [`IRef`](/util-doc/type#来自-zhux-utils-react) | 必填   |
