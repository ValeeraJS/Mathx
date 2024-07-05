export const swap = <T>(arr: T[], a: number, b: number): T[] => {
	const tmp = arr[a];
	arr[a] = arr[b];
	arr[b] = tmp;

	return arr;
};
