export const hue2rgb = (p: number, q: number, t: number): number => {
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1 / 6) return p + (q - p) * 6 * t;
	if (t < 1 / 2) return q;
	if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
	return p;
};

export const linearToSrgb = (c: number) => {
	if (c <= 0) {
		return 0;
	} else if (c >= 1) {
		return 1;
	} else if (c < 0.0031308) {
		return c * 12.92;
	} else {
		return Math.pow(c, 1 / 2.4) * 1.055 - 0.055;
	}
};

export const srgbToLinear = (x: number) => {
	if (x <= 0) {
		return 0;
	} else if (x >= 1) {
		return 1;
	} else if (x < 0.04045) {
		return x / 12.92;
	} else {
		return Math.pow((x + 0.055) / 1.055, 2.4);
	}
};
