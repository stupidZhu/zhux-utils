---
title: useDialog
---

# useDialog

<code src="./demos/base.tsx"></code>

<code src="./demos/provider.tsx"></code>

## props

| 参数           | 说明                                            | 类型                     | 默认值                        |
| :------------- | :---------------------------------------------- | :----------------------- | :---------------------------- |
| dialogRef      | dialog 本体 ref                                 | `RefObject<HTMLElement>` | 必填                          |
| moveFieldRef   | 可移动区域 ref                                  | `RefObject<HTMLElement>` | /                             |
| resizeFieldRef | 可 resize 区域 ref                              | `RefObject<HTMLElement>` | /                             |
| minSize        | 可 resize 时，弹窗最小宽高                      | `ISize`                  | `{ width: 200, height: 150 }` |
| confine        | 是否限制在可视范围内                            | `boolean`                | `true`                        |
| moveCb         | Moving / MoveStart / MoveEnd 时的回调函数       | `DialogMoveCb`           | /                             |
| resizeCb       | Resizing / ResizeStart / ResizeEnd 时的回调函数 | `DialogResizeCb`         | /                             |

## result

| 数据/方法  | 说明            | 类型      |
| :--------- | :-------------- | :-------- |
| isMoving   | 是否正在 move   | `boolean` |
| isResizing | 是否正在 resize | `boolean` |

## about ConfigProvider

| 参数          | 说明                      | 类型     | 默认值 |
| :------------ | :------------------------ | :------- | :----- |
| initMaxZIndex | 默认初始 dialog 的 zIndex | `number` | `1000` |

## types

| 类型                     | 说明                | 类型                                                                                                             |
| :----------------------- | :------------------ | :--------------------------------------------------------------------------------------------------------------- |
| RefObject\<HTMLElement\> | HTML 元素的 ref     | /                                                                                                                |
| IPosition                | IPosition           | `{ top: number; left: number }`                                                                                  |
| ISize                    | ISize               | `{ width: number; height: number }`                                                                              |
| DialogMoveFunc           | Move 回调函数类型   | `(props: { type: "moving" \| "moveStart" \| "moveEnd"; position: IPosition; mousePosition: IPosition }) => void` |
| DialogResizeFunc         | Resize 回调函数类型 | `(props: { type: "resizing" \| "resizeStart" \| "resizeEnd"; size: ISize; mousePosition: IPosition }) => void`   |

## 备注

如果 confine 为 true，请不要给 dialog 设置 margin 或 translate，否则会计算出错。
