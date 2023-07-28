// https://www.mvps.org/directx/articles/catmull/
export const catmullRom = (t: number, p0: number, p1: number, p2: number, p3: number, alpha: number = 0.5) => {
	const t2 = t * t;
	const t3 = t * t2;
	return alpha * (p1 + p1 + (p2 - p0) * t + (p0 + p0 - 5 * p1 + 4 * p2 - p3) * t2 + (3 * (p1 - p2) + p3 - p0) * t3);
};
