import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import path from "path"
import { defineConfig } from "rollup"
import autoExternal from "rollup-plugin-auto-external"
import clear from "rollup-plugin-clear"
import copy from "rollup-plugin-copy"
import esBuild from "rollup-plugin-esbuild"
import postcss from "rollup-plugin-postcss"
import { terser } from "rollup-plugin-terser"

export default [
  defineConfig({
    input: "src/index.ts",
    output: { file: "dist/index.umd.js", format: "umd", name: "ZhuxUtilsReact", globals: { "zhux-utils": "ZhuxUtils" } },
    plugins: [
      autoExternal(),
      resolve(),
      commonjs(),
      esBuild(),
      copy({
        targets: [
          { src: "src/type", dest: "dist" },
          {
            src: "**/*.scss",
            dest: "dist",
            rename: (name, extension, fullPath) => fullPath.replace("src/", ""),
          },
        ],
      }),
      terser(),
      clear({ targets: ["dist"] }),
    ],
  }),
  defineConfig({
    input: "src/style/index.ts",
    plugins: [postcss({ extract: path.resolve("dist/index.css"), minimize: true })],
    output: { dir: "dist" },
  }),
]
