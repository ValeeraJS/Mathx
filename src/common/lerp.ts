export const lerp = (a: number, b: number, p: number): number => {
	return (b - a) * p + a;
};
