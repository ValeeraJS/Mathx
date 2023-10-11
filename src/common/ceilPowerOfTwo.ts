export const ceilPowerOfTwo = (value: number): number => {
	return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
};
