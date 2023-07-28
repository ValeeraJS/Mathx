import { Vector2Like } from "../vector/Vector2";

export const generateLagrange = (points: Vector2Like[]) => {
	let n = points.length - 1;

	function p(i: number, j: number, x: number): number {
		if (i === j) {
			return points[i][1];
		}

		return (
			((points[j][0] - x) * p(i, j - 1, x) + (x - points[i][0]) * p(i + 1, j, x)) / (points[j][0] - points[i][0])
		);
	}

	return function (x: number) {
		if (points.length === 0) {
			return 0;
		}
		return p(0, n, x);
	};
};
