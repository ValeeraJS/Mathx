export interface IColorGPUData extends Float32Array {}
export interface IColorGPUJson {
	r: number;
	g: number;
	b: number;
	a: number;
}

export const create = (r = 0, g = 0, b = 0, a = 1, out: IColorGPUData = new Float32Array(4)): IColorGPUData => {
	out[0] = r; 
	out[1] = g; 
	out[2] = b; 
	out[3] = a;

	return out;
}

export const createJson = (r = 0, g = 0, b = 0, a = 1): IColorGPUJson => {
    return {
		r,
		g,
		b,
		a
	};
}

export const fromScalar = (scalar: number, a = 1, out: IColorGPUData) => {
	out[0] = scalar;
	out[1] = scalar;
	out[2] = scalar;
	out[3] = a;

	return out;
}
