export default (p: number): number => {
	return 0.5 * (1 - Math.sin(Math.PI * (0.5 - p)));
};
