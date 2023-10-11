export const isPowerOf2 = (value: number): boolean => {
	return (value & (value - 1)) === 0 && value !== 0;
};
