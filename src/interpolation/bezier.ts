export const quadraticBezier = (t: number, p0: number, p1: number, p2: number) => {
	return p1 + (1 - t) * (1 - t) * (p0 - p1) + t * t * (p2 - p1);
};

export const cubicBezier = (t: number, p0: number, p1: number, p2: number, p3: number) => {
	const t2 = t * t;
	const t3 = t2 * t;
	return p0 * (1 - 3 * (t - t2) - t3) + 3 * (t2 - t - t + 1) * p1 + 3 * (t2 - t3) * p2 + t3 * p3;
};
