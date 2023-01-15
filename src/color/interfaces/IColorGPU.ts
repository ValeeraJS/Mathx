export interface IColorGPUJson {
	a: number;
	b: number;
	g: number;
	r: number;
}

export default interface IColorGPU extends Float32Array, IColorGPUJson {}
