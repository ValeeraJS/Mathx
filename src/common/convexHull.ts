import { swap } from "../common";
import { Vector2Like, Vector2 } from "../vector";

function findSmallest(acc: number, val: Vector2Like, idx: number, arr: Vector2Like[]): number {
	return (val[1] < arr[acc][1] || (val[1] === arr[acc][1] && val[0] < arr[acc][0])) ? idx : acc;
}

const tmpA = new Vector2();
const tmpB = new Vector2();

export const convexHull2 = <T extends Vector2Like>(points: T[]) => {
	const start = points.reduce(findSmallest, 0);

	swap(points, 0, start).sort((a, b) => {
		Vector2.minus(a, points[0], tmpA);
		Vector2.minus(b, points[0], tmpB);
		const cp = Vector2.cross(a, b);
		if (cp === 0) {
			return Vector2.norm(tmpA) - Vector2.norm(tmpB);
		}
		return -cp;
	});

	// 初始化凸包栈，起点肯定是凸包的一部分
	const stack = [points[0], points[1], points[2]];
	let stackLen = stack.length;
	for (let i = 3, len = points.length; i < len; i++) {
		// 如果栈顶的两个点与下一个点构成的角不是左转，则弹出栈顶
		while (stackLen > 1 && Vector2.crossAOB(stack[stackLen - 1], stack[stackLen - 2], points[i]) <= 0) {
			stack.pop();
		}
		stack.push(points[i]);
		stackLen = stack.length;
	}

	return stack;
}
