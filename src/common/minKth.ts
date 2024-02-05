import { swap } from "./swap";

function findPartition<T>(arr: T[], low: number, high: number, compare: (a: T, b: T) => boolean): number {
	let pivot = arr[high];
	let pivotloc = low;

	for (let i = low; i <= high; i++) {
		if (compare(pivot, arr[i])) {
			swap(arr, i, pivotloc);
			pivotloc++;
		}
	}

	swap(arr, high, pivotloc);

	return pivotloc;
}

function kthSmallest<T>(arr: T[], low: number, high: number, k: number, compare: (a: T, b: T) => boolean): T {
	let partition = findPartition(arr, low, high, compare);

	if (partition == k - 1) {
		return arr[partition];
	} else if (partition < k - 1) {
		return kthSmallest(arr, partition + 1, high, k, compare);
	}

	return kthSmallest(arr, low, partition - 1, k, compare);
}

const defaultCompare = <T>(a: T, b: T) => {
	return a > b;
};

export const minKth = <T>(arr: T[], k: number = 0, compare = defaultCompare): T => {
	return kthSmallest(arr, 0, arr.length - 1, k, compare);
};
