---
title: CRA 工程项目中的 lint 和格式化工具
---

# CRA 工程项目中的 lint 和格式化工具

## 为什么要使用 lint 和格式化工具

前端工程项目日益庞大，协同开发不可避免。协同开发固然有许多好处，但也带来了许多问题。每个人编码风格的差异就是其中之一。有的人喜欢加分号有的人不喜欢（不加分号 yyds），有的人喜欢用双引号也有人选择单引号（我选双引号）；有的人左大括号换行有点人不换行（这点倒是比较统一基本上都不换行）；有的人缩进四个空格有的人两个（前端基本上都是两个空格吧）······

尤其是现在代码编辑器的智能提示波浪号让这些问题变的更加明显，谁能忍得了满屏的波浪号？所以，约定并统一代码风格，使用相关 lint 和格式化工具就很有必要。

## 前端常用的几个 lint 和格式化工具

1. eslint(tslint)

tslint 已经被弃用了，就不多说了。eslint 应该是前端开发人员最熟悉的 lint 工具了，作为一种代码检查工具，可用于保证代码质量，如果安装了相关的编辑器插件，可以在开发的过程中就提示代码的问题。

1. stylelint

这是用于检查/格式化样式文件，我主要用它搭配 stylelint-order 来格式化样式代码的顺序。也可以安装相应插件在开发时智能提示。

3. commitlint

用于检查 git 的 commit 消息是否符合一定格式。

4. prettier

可以用来格式化代码，可搭配插件在代码保存时格式化。

## 如何在 CRA 项目中集成这些工具？

这些工具可以在开发阶段对代码进行检查和格式化，我们一般也搭配其和 git hooks 工具在代码 commit 时对其格式化，不管你的代码在编写的时候是什么样的，至少在 git 仓库里它是符合配置文件的。

### 准备工作

1. 首先我们要安装相关依赖

```bash
yarn add husky lint-staged prettier stylelint @commitlint/cli -D
```

lint-staged 用于在 commit 信息通过后调用 eslint stylelint prettier 等工具对代码进行检查修复和格式化。

这里没有安装 eslint 因为 CRA 已经自带 eslint 了，安装最新的 eslint 可能会有冲突

这些依赖都属于开发工具，都应该以 devDependencies 进行安装

2. 配置 husky（需要先 git init）

[执行以下脚本](https://typicode.github.io/husky/#/?id=manual)

```bash
npx husky install

npm set-script prepare "husky install"
```

[然后执行](https://commitlint.js.org/#/guides-local-setup?id=install-husky)

```bash
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'
```

[添加 .husky/pre-commit](https://github.com/okonet/lint-staged#examples)

```shell
#!/usr/bin/env sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

3. commitlint

安装一个 [commitlint/config](https://github.com/conventional-changelog/commitlint#shared-configuration) ，这里我选择了 @commitlint/config-conventional

### 写配置

1. commitlint 配置

在项目根目录新建 .commitlintrc 文件，写上

```json
{
  "extends": ["@commitlint/config-conventional"]
}
```

就可以启用 @commitlint/config-conventional 的[默认配置](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#rules)，如果有自定义的要求可以参考 commitlint 文档的 [rules](https://commitlint.js.org/#/reference-rules?id=rules) 部分

|   前缀   | desc                                                   |
| :------: | :----------------------------------------------------- |
|  build   | 编译相关的修改，例如发布版本、对项目构建或者依赖的改动 |
|  chore   | 其他修改, 比如改变构建流程、或者增加依赖库、工具等     |
|    ci    | 持续集成修改                                           |
|   docs   | 文档修改                                               |
|   feat   | 新特性、新功能                                         |
|   fix    | 修改 bug                                               |
|   perf   | 优化相关，比如提升性能、体验                           |
| refactor | 代码重构                                               |
|  revert  | 回滚到上一个版本                                       |
|  style   | 代码格式修改, 注意不是 css 修改                        |
|   test   | 测试用例修改                                           |

2. eslint

   - 如果你的 cra 使用的 typescript 模板，你需要安装 @typescript-eslint/parser @typescript-eslint/eslint-plugin

   ```bash
   yarn add @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
   ```

   react 项目建议安装 eslint-plugin-react eslint-plugin-react-hooks

   ```bash
   yarn add eslint-plugin-react eslint-plugin-react-hooks -D
   ```

   - 在根目录新建 .eslintrc

     ```json
     {
       "parserOptions": {
         "ecmaVersion": 6,
         "sourceType": "module",
         "ecmaFeatures": { "jsx": true }
       },
       "parser": "@typescript-eslint/parser",
       "extends": [
         "eslint:recommended",
         "plugin:@typescript-eslint/recommended",
         "plugin:react-hooks/recommended", // hook dep 检查
         "plugin:react/recommended",
         "plugin:react/jsx-runtime" // 允许 tsx 不引入 React
       ],
       "plugins": ["@typescript-eslint", "react", "react-hooks"],
       "rules": {}
     }
     ```

     - 当然肯定还要自定义 rules，你可以在代码出现波浪号后鼠标 hover 查看解决方案（或者在最后 fix 时查看违反的规则），选择修改代码或者调整 eslint [rules](http://eslint.cn/docs/rules/)

3. stylelint

   - 安装 stylelint-config-standard （我们项目使用了 scss，所以选择安装 stylelint-config-standard-scss）

   ```bash
   yarn add stylelint-config-standard -D
   ```

   如果想对 style 文件的顺序进行格式化，可以安装 stylelint-order ，并选择安装一个格式化[配置](https://github.com/hudochenkov/stylelint-order#example-configs)

   ```bash
   yarn add stylelint-order stylelint-config-idiomatic-order -D
   ```

   - 在根目录创建 .stylelintrc

   ```json
   {
     "extends": ["stylelint-config-standard-scss", "stylelint-config-idiomatic-order"],
     "plugins": ["stylelint-order"],
     "rules": {}
   }
   ```

   - 当然肯定还要自定义 rules，你可以在代码出现波浪号后鼠标 hover 查看解决方案（或者在最后 fix 时查看违反的规则），选择修改代码或者调整 stylelint [rules](https://stylelint.io/user-guide/rules/list)

4. prettier

在根目录创建 .prettierrc ，自定义格式化[配置](https://prettier.io/docs/en/options.html)

5. lint-staged

在根目录创建 .lintstagedrc ，自定义 commit 时对暂存区代码格式化的[配置](https://github.com/okonet/lint-staged#configuration)

```json
{
  "src/**/*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write --ignore-unknown"],
  "src/**/*.{css,scss}": "stylelint --fix"
}
```

6. tslint

如果编辑器安装了 tslint 插件，你可能还需要创建 tslint.json 写一些[配置](https://palantir.github.io/tslint/rules/)来摆脱烦人的波浪号。

以上都配置完后就可以 commit 试试看了，如果有报错提交失败很正常，调整配置文件或者修改代码就好了。

## 写在最后

配置这些工具参考了很多文章和文档，但前端工具的发展实在是太快了，很多文章的配置方法已经过时不起作用。我以上写的也只是我配置过程的一个记录，并不保证长期有效。遇到问题还需各位前端小伙伴自行摸索。
