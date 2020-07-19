export interface IVector2Data extends Float32Array {
	length: 2;
}

export interface IVector2Json {
	x: number;
	y: number;
}

export default interface IVector2 extends IVector2Data, IVector2Json {
	readonly isVector2: true;
}
