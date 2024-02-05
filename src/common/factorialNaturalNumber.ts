const tmpResult: number[] = [];

export const factorialNaturalNumber = (n: number): number => {
	if (n === 0 || n === 1) {
		return 1;
	}
	if (tmpResult[n] > 0) {
		return tmpResult[n];
	}
	return tmpResult[n] = factorialNaturalNumber(n - 1) * n;
}
