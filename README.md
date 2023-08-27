### 基本使用

1. `pnpm i` 安装依赖
2. 执行 zhux-site 的 dev 脚本

## Git commit 规范

|   前缀   |                                                   en                                                   |                          desc                          |
| :------: | :----------------------------------------------------------------------------------------------------: | :----------------------------------------------------: |
|  build   |                        changes affecting build systems or external dependencies                        | 编译相关的修改，例如发布版本、对项目构建或者依赖的改动 |
|  chore   |                          updating grunt tasks etc.; no production code change                          |   其他修改, 比如改变构建流程、或者增加依赖库、工具等   |
|    ci    |            updating configuration files for continuous integration and deployment services             |                      持续集成修改                      |
|   docs   |                                       documentation-only changes                                       |                        文档修改                        |
|   feat   |                                             a new feature                                              |                     新特性、新功能                     |
|   fix    |                                               a bug fix                                                |                        修改 bug                        |
|   perf   |                                a code change that improves performance                                 |              优化相关，比如提升性能、体验              |
| refactor |                       a code change that neither fixes a bug nor adds a feature                        |                        代码重构                        |
|  revert  |                                                 revert                                                 |                    回滚到上一个版本                    |
|  style   | changes that do not affect the meaning of the code (white-space, formatting, missing semicolons, etc.) |            代码格式修改, 注意不是 css 修改             |
|   test   |                           adding missing tests or correcting existing tests                            |                      测试用例修改                      |

## [Turborepo](https://turbo.build/repo/docs) Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
