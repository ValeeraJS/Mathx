export const swap = (arr: any[], a: number, b: number) => {
	const tmp = arr[a];
	arr[a] = arr[b];
	arr[b] = tmp;

	return arr;
};
