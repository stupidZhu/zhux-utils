import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import { defineConfig } from "rollup"
import autoExternal from "rollup-plugin-auto-external"
import copy from "rollup-plugin-copy"
import esBuild from "rollup-plugin-esbuild"
import { terser } from "rollup-plugin-terser"

import pkg from "./package.json"

// eslint-disable-next-line turbo/no-undeclared-env-vars
const isProd = process.env.NODE_ENV === "production"

export default defineConfig({
  input: "src/index.ts",
  output: [{ file: pkg.main, format: "umd", name: "ZhuxUtils" }],
  plugins: [
    autoExternal(),
    resolve(),
    commonjs(),
    esBuild({ tsconfig: "tsconfig.build.json" }),
    copy({ targets: [{ src: "src/type", dest: "dist" }] }),
    isProd && terser(),
  ],
})
