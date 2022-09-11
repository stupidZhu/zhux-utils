import { defineConfig } from "dumi"
import path from "path"

export default defineConfig({
  title: "Hello zhux !",
  mode: "site",
  logo: "http://43.142.32.143:7777/zhux-site/logo.svg",
  locales: [["zh-CN", "中文"]],
  navs: [
    { title: "Doc", path: "/util-doc" },
    { title: "Blog", path: "/blog" },
    { title: "GitHub", path: "https://github.com/stupidZhu" },
  ],
  styles: ["http://file.zhux.cc/zhux-site/common.css"],
  alias: {
    "dumi-theme-some": path.resolve("./node_modules/dumi-theme-some"),
  },
  // more config: https://d.umijs.org/config
})
