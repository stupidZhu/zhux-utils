import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import path from "path"
import { defineConfig } from "rollup"
import autoExternal from "rollup-plugin-auto-external"
import copy from "rollup-plugin-copy"
import esBuild from "rollup-plugin-esbuild"
import postcss from "rollup-plugin-postcss"
import { terser } from "rollup-plugin-terser"
import pkg from "./package.json"

// eslint-disable-next-line turbo/no-undeclared-env-vars
const isProd = process.env.NODE_ENV === "production"

export default [
  defineConfig({
    input: "src/index.ts",
    output: { file: pkg.main, format: "umd", name: "ZhuxUtilsReact", globals: { "zhux-utils": "ZhuxUtils" } },
    plugins: [
      autoExternal(),
      resolve(),
      commonjs(),
      esBuild({ tsconfig: "tsconfig.build.json" }),
      copy({
        targets: [
          { src: "src/type", dest: "dist" },
          { src: "src/**/*.scss", dest: "dist", rename: (name, extension, fullPath) => fullPath.replace("src/", "") },
        ],
      }),
      isProd && terser(),
    ],
  }),
  defineConfig({
    input: "src/style/index.ts",
    plugins: [postcss({ extract: path.resolve("dist/index.css"), minimize: true })],
    output: { dir: "dist", entryFileNames: "style/index.js" },
  }),
]
