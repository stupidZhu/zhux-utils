import { defineConfig } from "dumi"

const home = process.env.HOMEPAGE

export default defineConfig({
  themeConfig: {
    name: "ZHUX",
    logo: "https://s2.loli.net/2023/08/15/viFKg9krfsMJU2Y.png",
    socialLinks: {
      github: "https://github.com/stupidZhu/zhux-utils",
    },
    lastUpdated: false,
  },
  styles: ["//at.alicdn.com/t/font_2346762_78tfqsq57sm.css"],
  base: home,
  publicPath: home,
})
