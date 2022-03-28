import {
	add as addVec3,
	max as maxVec3,
	min as minVec3,
	multiply as multiplyVec3
} from "../vector/Vector3";
import { boundingBox } from "../shape/Sphere";
import ICube from "../shape/interfaces/ICube";
import ISphere from "../shape/interfaces/ISphere";

export default class Grid3 {
	public data: Float32Array[] = []; // 格子索引
	public gridSize: Float32Array; // 格子尺寸，默认1*1*1
	public min: Float32Array; // 格子位置，默认0,0,0
	public size: Float32Array; // 格子宽高深的最大数量
	public max: Float32Array;

	public constructor(
		size: Float32Array = new Float32Array([Infinity, Infinity, Infinity]),
		gridSize: Float32Array = new Float32Array([1, 1, 1]),
		min: Float32Array = new Float32Array(3)
	) {
		this.size = size;
		this.gridSize = gridSize;
		this.min = min;
		this.max = addVec3(multiplyVec3(this.gridSize, this.size), this.min);
	}
}

let tmpCude: ICube,
	min3: Float32Array,
	max3: Float32Array,
	x: number,
	y: number,
	z: number,
	rr: number,
	i: number,
	j: number,
	k: number,
	sx: number,
	sy: number,
	sz: number;

// 将方块信息转化为格子数组，方块与格子重合部分才会记录信息
export const dataFromSolidCube = (a: ICube, out: Grid3 = new Grid3()): Grid3 => {
	maxVec3(a.min, out.min, min3); // 起始遍历位置
	minVec3(a.max, out.max, max3);

	x = out.gridSize[0];
	y = out.gridSize[1];
	z = out.gridSize[2];

	sx = Math.round((min3[0] - out.min[0]) / out.gridSize[0]);
	sy = Math.round((min3[1] - out.min[1]) / out.gridSize[1]);
	sy = Math.round((min3[2] - out.min[2]) / out.gridSize[2]);

	for (i = min3[0]; i <= max3[0]; i += x, sx++) {
		for (j = min3[1]; j <= max3[1]; j += y, sy++) {
			for (k = min3[2]; k <= max3[2]; k += z, sz++) {
				out.data.push(new Float32Array([sx, sy, sz]));
			}
		}
	}

	return out;
};

// 将球信息转化为格子数组，方块与格子重合部分才会记录信息
export const dataFromSolidSphere = (a: ISphere, out: Grid3 = new Grid3()): Grid3 => {
	boundingBox(a, tmpCude);
	maxVec3(tmpCude.min, out.min, min3); // 起始遍历位置
	minVec3(tmpCude.max, out.max, max3);

	x = out.gridSize[0];
	y = out.gridSize[1];
	z = out.gridSize[2];
	rr = a.radius * a.radius;

	sx = Math.round((min3[0] - out.min[0]) / out.gridSize[0]);
	sy = Math.round((min3[1] - out.min[1]) / out.gridSize[1]);
	sy = Math.round((min3[2] - out.min[2]) / out.gridSize[2]);

	for (i = min3[0]; i <= max3[0]; i += x, sx++) {
		for (j = min3[1]; j <= max3[1]; j += y, sy++) {
			for (k = min3[2]; k <= max3[2]; k += z, sz++) {
				if (rr >= i * i + j * j + k * k) {
					out.data.push(new Float32Array([sx, sy, sz]));
				}
			}
		}
	}

	return out;
};
