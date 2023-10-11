export const floorPowerOfTwo = (value: number): number => {
	return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
};
