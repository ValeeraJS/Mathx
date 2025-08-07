export const softmax = (data: number[] | ArrayLike<number>, from = 0, to = data.length): number[] => {
	let max = -Infinity;
	for (let id = from; id < to; id++) {
		if (max < data[id]) {
			max = data[id];
		}
	}
	let sumOfExp = 0;
	const result = [];
	for (let id = from; id < to; id++) {
		result[id] = Math.exp(data[id] - max);
		sumOfExp += result[id];
	}
	for (let id = from; id < to; id++) {
		result[id] = result[id] / sumOfExp;
	}

	return result;
}
