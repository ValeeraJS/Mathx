import { IEulerAngle, EulerRotationOrders } from "./IEulerAngle";
import { ArraybufferDataType } from "../ArraybufferDataType";
import { clamp } from "../common/clamp";

export class EulerAngle extends Float32Array implements IEulerAngle {
	public static readonly ORDERS = EulerRotationOrders;
	public static clone(euler: IEulerAngle): EulerAngle {
		return new EulerAngle(euler.x, euler.y, euler.z, euler.order);
	}

	public static create(x = 0, y = 0, z = 0, order = EulerRotationOrders.XYZ): EulerAngle {
		return new EulerAngle(x, y, z, order);
	}

	public static fromMatrix4(matrix4: Float32Array, out: IEulerAngle = new EulerAngle()): IEulerAngle {
		const m11 = matrix4[0];
		const m12 = matrix4[4];
		const m13 = matrix4[8];
		const m21 = matrix4[1];
		const m22 = matrix4[5];
		const m23 = matrix4[9];
		const m31 = matrix4[2];
		const m32 = matrix4[6];
		const m33 = matrix4[10];

		switch (out.order) {
			case EulerRotationOrders.XYZ:
				out.y = Math.asin(clamp(m13, -1, 1));

				if (Math.abs(m13) < 0.9999999) {
					out.x = Math.atan2(-m23, m33);
					out.z = Math.atan2(-m12, m11);
				} else {
					out.x = Math.atan2(m32, m22);
					out.z = 0;
				}

				break;

			case EulerRotationOrders.YXZ:
				out.x = Math.asin(-clamp(m23, -1, 1));

				if (Math.abs(m23) < 0.9999999) {
					out.y = Math.atan2(m13, m33);
					out.z = Math.atan2(m21, m22);
				} else {
					out.y = Math.atan2(-m31, m11);
					out.z = 0;
				}

				break;

			case EulerRotationOrders.ZXY:
				out.x = Math.asin(clamp(m32, -1, 1));

				if (Math.abs(m32) < 0.9999999) {
					out.y = Math.atan2(-m31, m33);
					out.z = Math.atan2(-m12, m22);
				} else {
					out.y = 0;
					out.z = Math.atan2(m21, m11);
				}

				break;

			case EulerRotationOrders.ZYX:
				out.y = Math.asin(-clamp(m31, -1, 1));

				if (Math.abs(m31) < 0.9999999) {
					out.x = Math.atan2(m32, m33);
					out.z = Math.atan2(m21, m11);
				} else {
					out.x = 0;
					out.z = Math.atan2(-m12, m22);
				}

				break;

			case EulerRotationOrders.YZX:
				out.z = Math.asin(clamp(m21, -1, 1));

				if (Math.abs(m21) < 0.9999999) {
					out.x = Math.atan2(-m23, m22);
					out.y = Math.atan2(-m31, m11);
				} else {
					out.x = 0;
					out.y = Math.atan2(m13, m33);
				}

				break;

			case EulerRotationOrders.XZY:
				out.z = Math.asin(-clamp(m12, -1, 1));

				if (Math.abs(m12) < 0.9999999) {
					out.x = Math.atan2(m32, m22);
					out.y = Math.atan2(m13, m11);
				} else {
					out.x = Math.atan2(-m23, m33);
					out.y = 0;
				}

				break;
		}

		return out;
	}

	public order: EulerRotationOrders;
	public readonly dataType = ArraybufferDataType.EULER;
	public constructor(x = 0, y = 0, z = 0, order = EulerRotationOrders.XYZ) {
		super(3);
		this[0] = x;
		this[1] = y;
		this[2] = z;
		this.order = order;
	}

	public get x(): number {
		return this[0];
	}

	public set x(value: number) {
		this[0] = value;
	}

	public get y(): number {
		return this[1];
	}

	public set y(value: number) {
		this[1] = value;
	}

	public get z(): number {
		return this[2];
	}

	public set z(value: number) {
		this[2] = value;
	}
}
