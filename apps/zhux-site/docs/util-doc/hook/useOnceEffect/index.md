---
order: 200
---

# useOnceEffect

<code src="./demos/base.tsx"></code>

## WARNING !!!

**如果 condition 改变不会触发组件重渲染，那么 useOnceEffect 的 callback 也不会执行。(组件重渲染时 condition 计算为 true，或者不传 condition，callback 才会执行)**

## props

| 参数      | 说明                          | 类型                                           | 默认值 |
| :-------- | :---------------------------- | :--------------------------------------------- | :----- |
| cb        | 和 useEffect 的第一个参数一致 | `EffectCallback`                               | 必填   |
| dep       | 和 useEffect 的第二个参数一致 | `DependencyList`                               | /      |
| condition | effect 触发的条件             | [`IRef`](/util-doc/type#来自-zhux-utils-react) | /      |
