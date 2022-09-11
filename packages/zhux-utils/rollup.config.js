import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import { defineConfig } from "rollup"
import autoExternal from "rollup-plugin-auto-external"
import clear from "rollup-plugin-clear"
import copy from "rollup-plugin-copy"
import esBuild from "rollup-plugin-esbuild"
import { terser } from "rollup-plugin-terser"

export default defineConfig({
  input: "src/index.ts",
  output: [{ file: "dist/index.umd.js", format: "umd", name: "ZhuxUtils" }],
  plugins: [
    autoExternal(),
    resolve(),
    commonjs(),
    esBuild(),
    copy({ targets: [{ src: "src/type", dest: "dist" }] }),
    terser(),
    clear({ targets: ["dist"] }),
  ],
})
