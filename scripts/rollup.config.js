import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';

export default {
	input: 'src/index.ts',
	plugins: [
		json(),
		typescript({
			tsconfig: './tsconfig.json'
		})
	],
	output: [
		{
			format: 'umd',
			name: 'Mathx',
			file: 'build/Mathx.js',
			sourcemap: true,
			indent: '\t'
		},
		{
			format: 'es',
			file: 'build/Mathx.module.js',
			sourcemap: true,
			indent: '\t'
		}
	]
};
