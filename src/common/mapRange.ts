let d1 = 0;
let d2 = 0;

/**
 * @function mapRange
 * @desc 将目标值按照区间线性映射到另一个区间里面的值。
 * @param {number} value 目标值
 * @param {number} range1 值所在的线性区间
 * @param {number} range2 值需要映射到的目标区间
 * @returns {number} 映射之后的值
 * @example Mathx.mapRange(50, [0, 100], [0, 1]); // 0.5;
 * Mathx.clamp(150, [100, 200], [0, -100]); // -50;
 * Mathx.clamp(10, [0, 1], [0, -2]); // -20;
 */
export const mapRange = (value: number, range1: number[] | Float32Array, range2: number[] | Float32Array): number => {
	d1 = range1[1] - range1[0];
	d2 = range2[1] - range2[0];

	return (value - d1 * 0.5) / d2 / d1;
};
