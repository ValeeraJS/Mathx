export const rndInt = (min = 0, max = 1): number => {
	return min + Math.floor(Math.random() * (max - min + 1));
};
