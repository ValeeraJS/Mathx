import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';

export default {
	input: 'src/index.ts',
	plugins: [
		json(),
		typescript({
			tsconfig: './tsconfig.legacy.json'
		})
	],
	output: [
		{
			externalLiveBindings: true,
			format: 'umd',
			name: 'Mathx',
			file: 'build/Mathx.legacy.js',
			sourcemap: true,
			indent: '\t'
		},
		{
			format: 'es',
			file: 'build/Mathx.legacy.module.js',
			sourcemap: true,
			indent: '\t'
		}
	]
};
