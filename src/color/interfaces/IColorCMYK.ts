export interface IColorCMYKJson {
	c: number;
	m: number;
	y: number;
	k: number;
}

export interface IColorCMYK extends Float32Array, IColorCMYKJson {}
