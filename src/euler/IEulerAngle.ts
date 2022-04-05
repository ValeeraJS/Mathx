export enum EulerRotationOrders {
	XYZ = "xyz",
	ZXY = "zxy",
	YZX = "yzx",
	XZY = "xzy",
	ZYX = "zyx",
	YXZ = "yxz"
}

export default interface IEulerAngle {
	x: number;
	y: number;
	z: number;
	order: EulerRotationOrders;
}
