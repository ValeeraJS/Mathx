import IEuler, { EulerRotationOrders } from "./IEuler";
import clamp from "../common/clamp";

const createDefault = () => {
	return {
		order: EulerRotationOrders.XYZ,
		x: 0,
		y: 0,
		z: 0
	};
};

export const create = (
	x = 0,
	y = 0,
	z = 0,
	order = EulerRotationOrders.XYZ,
	out: IEuler = createDefault()
): IEuler => {
	out.x = x;
	out.y = y;
	out.z = z;
	out.order = order;

	return out;
};

export const from = (euler: IEuler, out: IEuler = createDefault()): IEuler => {
	out.x = euler.x;
	out.y = euler.y;
	out.z = euler.z;
	out.order = euler.order;

	return out;
};

export const fromMatrix4 = (matrix: Float32Array, out: IEuler = createDefault()): IEuler => {
	const m11 = matrix[0],
		m12 = matrix[4],
		m13 = matrix[8];
	const m21 = matrix[1],
		m22 = matrix[5],
		m23 = matrix[9];
	const m31 = matrix[2],
		m32 = matrix[6],
		m33 = matrix[10];

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
};
