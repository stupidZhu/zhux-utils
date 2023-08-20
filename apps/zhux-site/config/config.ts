import { defineConfig } from "dumi"
import path from "path"

export default defineConfig({
  title: "Hello zhux !",
  mode: "site",
  logo: "/logo.svg",
  locales: [["zh-CN", "中文"]],
  navs: [
    { title: "Doc", path: "/util-doc" },
    { title: "Blog", path: "/blog" },
    { title: "GitHub", path: "https://github.com/stupidZhu/zhux-utils" },
  ],
  styles: [
    "button{cursor:pointer}.btn-wrapper{display:flex;gap:10px;width:100%}.column{flex-direction:column}.info-img{box-shadow:1px 1px 4px #00000010}",
    "//at.alicdn.com/t/font_2346762_78tfqsq57sm.css",
  ],
  alias: {
    "dumi-theme-some": path.resolve("./node_modules/dumi-theme-some"),
  },
  base: "/zhux-utils",
  publicPath: "/zhux-utils/",
  // more config: https://d.umijs.org/config
})
