import { Vector2 } from "../vector/Vector2";
import { Vector2Like } from "../vector/Vector2";

export class Grid2 {
	public data: Vector2Like[] = []; // 格子索引
	public gridSize: Vector2Like; // 格子尺寸，默认1*1*1
	public min: Vector2Like; // 格子位置，默认0,0,0
	public size: Vector2Like; // 格子宽高深的最大数量
	public max: Vector2Like;

	public constructor(
		size: Vector2Like = new Vector2(Infinity, Infinity),
		gridSize: Vector2Like = new Vector2(1, 1),
		min: Vector2Like = new Vector2(),
	) {
		this.size = size;
		this.gridSize = gridSize;
		this.min = min;
		this.max = Vector2.add(Vector2.multiply(this.gridSize, this.size), this.min);
	}
}
