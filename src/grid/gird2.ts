import Vector2 from "../vector/Vector2";

export default class Grid2 {
	public data: Float32Array[] = []; // 格子索引
	public gridSize: Float32Array; // 格子尺寸，默认1*1*1
	public min: Float32Array; // 格子位置，默认0,0,0
	public size: Float32Array; // 格子宽高深的最大数量
	public max: Float32Array;

	public constructor(
		size: Float32Array = new Float32Array([Infinity, Infinity]),
		gridSize: Float32Array = new Float32Array([1, 1]),
		min: Float32Array = new Float32Array(2)
	) {
		this.size = size;
		this.gridSize = gridSize;
		this.min = min;
		this.max = Vector2.add(Vector2.multiply(this.gridSize, this.size), this.min);
	}
}
