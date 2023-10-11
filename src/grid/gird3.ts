import { Vector3, Vector3Like } from "../vector/Vector3";
import { Sphere } from "../shape/Sphere";
import { ICube } from "../shape/interfaces/ICube";
import { ISphere } from "../shape/interfaces/ISphere";
import { Cube } from "../shape/Cube";

export class Grid3 {
	public data: Vector3[] = []; // 格子索引
	public gridSize: Vector3 = new Vector3(); // 格子尺寸，默认1*1*1
	public min: Vector3 = new Vector3(); // 格子位置，默认0,0,0
	public size: Vector3 = new Vector3(); // 格子宽高深的最大数量
	public max: Vector3 = new Vector3();

	public constructor(
		size: Vector3Like = new Vector3(Infinity, Infinity, Infinity),
		gridSize: Vector3Like = new Vector3(1, 1, 1),
		min: Vector3Like = new Vector3(),
	) {
		this.size.set(size);
		this.gridSize.set(gridSize);
		this.min.set(min);
		this.max = Vector3.add(Vector3.multiply(this.gridSize, this.size), this.min);
	}
}

let tmpCude: Cube;
let min3: Vector3 = new Vector3();
let max3: Vector3 = new Vector3();
let x: number;
let y: number;
let z: number;
let rr: number;
let i: number;
let j: number;
let k: number;
let sx: number;
let sy: number;
let sz: number;

// 将方块信息转化为格子数组，方块与格子重合部分才会记录信息
export const dataFromSolidCube = (a: ICube, out: Grid3 = new Grid3()): Grid3 => {
	Vector3.max(a.min, out.min, min3); // 起始遍历位置
	Vector3.min(a.max, out.max, max3);

	x = out.gridSize[0];
	y = out.gridSize[1];
	z = out.gridSize[2];

	sx = Math.round((min3[0] - out.min[0]) / out.gridSize[0]);
	sy = Math.round((min3[1] - out.min[1]) / out.gridSize[1]);
	sy = Math.round((min3[2] - out.min[2]) / out.gridSize[2]);

	for (i = min3[0]; i <= max3[0]; i += x, sx++) {
		for (j = min3[1]; j <= max3[1]; j += y, sy++) {
			for (k = min3[2]; k <= max3[2]; k += z, sz++) {
				out.data.push(new Vector3(sx, sy, sz));
			}
		}
	}

	return out;
};

// 将球信息转化为格子数组，方块与格子重合部分才会记录信息
export const dataFromSolidSphere = (a: ISphere, out: Grid3 = new Grid3()): Grid3 => {
	Sphere.boundingBox(a, tmpCude);
	Vector3.max(tmpCude.min, out.min, min3); // 起始遍历位置
	Vector3.min(tmpCude.max, out.max, max3);

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
					out.data.push(new Vector3(sx, sy, sz));
				}
			}
		}
	}

	return out;
};
