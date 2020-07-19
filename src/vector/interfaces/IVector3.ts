export interface IVector3Data extends Float32Array {
	readonly length: 3;
}

export interface IVector3Json {
	x: number;
	y: number;
	z: number;
}

export default interface IVector3 extends IVector3Json, IVector3Data {
	readonly isVector3: true;
}
