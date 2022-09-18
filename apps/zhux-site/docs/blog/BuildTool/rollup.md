---
title: 用 rollup 构建一个工具库
---

### 初始项目

新建你的工具库文件夹，然后执行：

```bash
npm init -y
```

### 安装 rollup 以及相关插件

```bash
yarn add @rollup/plugin-commonjs @rollup/plugin-node-resolve rollup-plugin-auto-external rollup-plugin-clear rollup-plugin-terser rollup-plugin-copy -D
```

- rollup-plugin-auto-external 防止打包 dependencies 中的依赖，也可以在 rollup.config.js 使用 external 参数手动去除
- rollup-plugin-clear 每次打包前清除打包目录
- rollup-plugin-terser 压缩代码
- rollup-plugin-copy 复制工作目录中的资源到打包目录

### typescript 支持

我打算用 typescript 构建这个工具库，安装以下依赖

```bash
yarn add typescript rollup-plugin-typescript2 -D
```

也可以试试 esbuild 打包飞快（和上面的 rollup-plugin-typescript2 二选一）

```bash
yarn add esbuild rollup-plugin-esbuild -D
```

### rollup 配置

新建 rollup.config.js，编写 rollup 配置。初步配置如下：

```js
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import { defineConfig } from "rollup"
import autoExternal from "rollup-plugin-auto-external"
import clear from "rollup-plugin-clear"
import copy from "rollup-plugin-copy"
import { terser } from "rollup-plugin-terser"
import typescript from "rollup-plugin-typescript2"
import esBuild from "rollup-plugin-esbuild"

export default defineConfig({
  input: "src/index.ts",
  output: [{ file: "dist/index.umd.js", format: "umd", name: "ZhuxUtils" }],
  plugins: [
    autoExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfigOverride: { compilerOptions: { declaration: false } } }),
    // esBuild(),// 和上面的 typescript 二选一
    copy({ targets: [{ src: "src/type", dest: "dist" }] }),
    terser(),
    clear({ targets: ["dist"] }),
  ],
})
```

部分 tsconfig.json

```json
{
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true,
    "declarationDir": "dist",
    "...": "..."
  },
  "...": "..."
}
```

关于上述的配置有几点说明：

- 打包的 format 选择了 umd，这种格式同时兼容 CJS 和 AMD，可以在浏览器和 node 环境中使用
- 目前以及未来前端的主流模块方案是 esm，我们也应该打包出一分 esm 的包。这里我没有选择用 rollup 打包 esm 模式，而是直接通过 typescript 的 tsc 命令来转换 .ts 文件并同时生成 .d.ts 类型文件。这样生成的结果不是单个 .js 文件，而会和你的工作目录有类似的文件结构。上面的 tsconfig.json 中，`outDir` 用于指定 .js 文件输出目录、`declaration` 参数自动生成 .d.ts 文件、`declarationDir` 指定 .d.ts 输出目录
- 由于我使用 tsc 生成 .d.ts 文件，rollup-plugin-typescript2 也会生成 .d.ts 文件，所以这里传入参数`{ tsconfigOverride: { compilerOptions: { declaration: false } } }` 使其不生产类型声明文件。如果是 esbuild，它不会生成类型声明文件。

### package.json 相关配置

在 package.json 中写上打包脚本和对应入口文件：

```json
{
  "module": "dist/index.js",
  "main": "dist/index.umd.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "rollup -c"
  }
}
```

因为我们打包了 umd，编译了 esm，所以上面定义了两个入口文件（module 和 main。其实还有个 browser，关于它们的区别，请自行查阅）。在使用 webpack 等打包工具的，运行在浏览器的项目，一般是优先使用 module 的入口文件。

现在一般都走 module 入口，那 umd 是不是没必要打包了？一开始我也是这样想并且这样做的，但是在写单元测试的时候发现 jest 对 ES Module 的支持不是很好，我按照 jest 的提示进行了相关配置，但并没有用，还是太菜。最后还是老老实实打包一分 umd 好了。

这时就初步完成 rollup 工具库的构建了，新建 src/index.ts，打个包试试看。

### 样式文件支持

如果你编写的是一个组件库，那还需要对样式文件进行打包

```bash
yarn add rollup-plugin-postcss -D
```

```js
import path from "path"
import postcss from "rollup-plugin-postcss"

export default defineConfig({
  // ...
  plugins: [
    // ...
    postcss({ extract: path.resolve("dist/index.css"), minimize: true }),
    // ...
  ],
})
```

- 如果需要对 .scss/.sass，.less ，则需要安装 sass，less。postcss 默认支持，不需要额外配置
- 以上的写法是将所有样式单独打包成一个 .css 文件。类似 antd，样式文件需要单独引用
- 也可以将样式文件注入到打包出来的 .js 文件中，但这种不分离的做法个人不喜欢

### 单元测试

工具库当然少不了单元测试，jest 安排上：

```bash
yarn add jest ts-jest @types/jest -D
```

jest.config.js:

```js
/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
}
```

tsconfig.json 也要做一些调整：

```json
{
  "compilerOptions": {
    "types": ["jest", "node"],
    "...": "..."
  },
  "exclude": ["src/**/__test__", "..."],
  "...": "..."
}
```

### 开发环境

能不能实现像 webpack 那样的 devServer 呢？

毕竟 rollup 只是一个打包工具，开发服务这种事还是 webpack 比较擅长。但 rollup 也有 `rollup-plugin-serve`，`rollup-plugin-livereload`之类的插件，搭配 `rollup -c -w` 和 `tsc -w`对代码监听自动打包编译，也是可以实现开发服务的。但个人觉得体验并不好

后来我使用 monorepo 工具 `turbo` 实现了体验还不错的本地开发服务，但这就不属于 rollup 相关的内容了，这里也就不多展开讲了

### 写在最后

rollup 相对于 webpack 来说，学习门槛和相关配置还是比较简单的，也更推荐用来打包库，还是很值得尝试一下的

以上是我使用 rollup 打包自己的工具库的过程记录和一些想法。水平有限，如果不对的地方，欢迎指正
