export const rndFloat = (min = 0, max = 1): number => {
	return min + Math.random() * (max - min);
};
