export default (p: number): number => {
	return 1 - Math.sin(((1.0 - p) * Math.PI) / 2);
};
