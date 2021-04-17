import json from "rollup-plugin-json";
import typescript from "rollup-plugin-typescript2";

export default {
	input: "src/index.ts",
	output: [
		{
			externalLiveBindings: true,
			file: "build/Mathx.legacy.js",
			format: "umd",
			indent: "\t",
			name: "Mathx",
			sourcemap: true
		},
		{
			file: "build/Mathx.legacy.module.js",
			format: "es",
			indent: "\t",
			sourcemap: false
		}
	],
	plugins: [
		json(),
		typescript({
			tsconfig: "./tsconfig.legacy.json"
		})
	]
};
