---
title: align-* & justify-*
toc: content
group:
  title: CSS
  order: 3
---

# align-\* 和 justify-\*

## 为什么要讲这个？

一开始在学习 flex 布局的时候，用到了 justify-content 和 align-items，那时候我就在想，为什么没有 justify-items 和 align-content？后来学习了 grid 布局，发现 grid 里面出现了 justify-items 和 align-content。

这些个属性长得都差不多，用的时候总是会用混（或者一个一个试，试出来一个效果对的 😂），所以有必要把他们放一起来看看，它们都是些啥。

## 都有哪些属性？

| 用在 flex/grid 容器上的                                                                                         | 用在子元素上的                                 |
| :-------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- |
| align-content <br/> justify-content <br/> place-content <br/> align-items <br/> justify-items <br/> place-items | align-self <br/> justify-self <br/> place-self |

## 它们都有啥用？

### flex 的 demo （结论都基于 `flex-direction: row;`）

<code src="./demo/alignJustify/flex.tsx"></code>

通过操作这些 radio 我们可以看出

1. \*-content 属性会改变 行/列 的布局，只有容器大于 行/列 的 宽/高 时才可以看出效果

2. \*-items 属性会改变子元素的大小

> align-items 的初始值为 stretch，这就是为什么 flex 元素会默认被拉伸到最高元素的高度。实际上，它们被拉伸来填满 flex 容器 —— 最高的元素定义了容器的高度。 -- [来源](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox#align-items)

3. \*-self 用在子元素上，效果类似 \*-items，优先级比 \*-items 高

4. justify-items 对于 flex 没有效果。个人理解的原因是 flex 不像 grid 可以设置 grid-template-columns ，每行每个小格子的大小都是由子元素填充的，这也是 flex “弹性” 的原因。

5. align-content 只在盒子高度大于子元素内容高度时有效果，但是往往我们不会给盒子设置一个高度（一般由子元素填充高度），所以这个属性我们用的也比较少。

6. place-\* 属性是 align-\* 和 justify-\* 的简写，就不多说了

### grid 的 demo

<code src="./demo/alignJustify/grid.tsx"></code>

其实和 flex 是差不多的

## 居中

现在我们可以得出两种子元素居中（讨论只有一个子元素的情况）的办法了

```css
display: flex;
align-items: center;
justify-content: center;
```

为什么不是 `justify-items: center;`？因为 flex 子元素的宽度如果不指定（flex-basis）的话就是子元素最小宽度。`justify-items: center;`没有意义。flex 容器里面的格子的宽度等于子元素的宽度，把格子居中就相当于把子元素居中。

```css
display: grid;
place-items: center;
```

其实 grid 中随意一种 `justify-\*:center;`和 `align-\*:center;` 搭配都可以实现居中效果（只考虑一个子元素的情况），但还是推荐以上写法。

## 写在最后

这篇 blog 完全是写给自己看的，毕竟这些属性久了不用肯定会忘记的。里面充斥着各种个人理解，水平有限，如果不对的地方，欢迎指正。
