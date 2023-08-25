import { Vector3, IVector3, Vector3Like } from "../vector/Vector3";
import { EPSILON } from "../constants";
import { IPairs4Float32 } from "../common/interfaces/IPairs4";
import { Matrix3 } from "../matrix/Matrix3";
import { ArraybufferDataType } from "../ArraybufferDataType";

let ax: number;
let ay: number;
let az: number;
let aw: number;
let bx: number;
let by: number;
let bz: number;
let bw: number;
let s = 0;
let c = 0;
let rad = 0;
let dotTmp = 0;
let omega = 0;
let len = 0;
let scale0 = 0;
let scale1 = 0;
const tmpVec3 = new Vector3();

export interface IQuaternionJson {
	x: number;
	y: number;
	z: number;
	w: number;
}

export interface IQuaternion extends IPairs4Float32, IQuaternionJson {}
export type QuaternionLike = Quaternion | Float32Array | number[];

export default class Quaternion extends Float32Array implements IQuaternion {
	public static angleTo = (
		a: Float32Array | number[] | IQuaternion,
		b: Float32Array | number[] | IQuaternion,
	): number => {
		dotTmp = Quaternion.dot(a, b);

		return Math.acos(2 * dotTmp * dotTmp - 1);
	};

	public static conjugate = (
		a: Float32Array | number[] | IQuaternion,
		out: Quaternion = new Quaternion(),
	): Quaternion => {
		out[0] = -a[0];
		out[1] = -a[1];
		out[2] = -a[2];
		out[3] = a[3];

		return out;
	};

	public static create = (x = 0, y = 0, z = 0, w = 1, out = new Quaternion()): Quaternion => {
		out[0] = x;
		out[1] = y;
		out[2] = z;
		out[3] = w;

		return out;
	};

	public static dot = (
		a: Float32Array | IQuaternion | number[],
		b: Float32Array | IQuaternion | number[],
	): number => {
		return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
	};

	public static fromAxisAngle = (
		axis: Float32Array | IVector3 | number[],
		rad: number,
		out: Quaternion = new Quaternion(),
	): Quaternion => {
		rad = rad * 0.5;
		s = Math.sin(rad);
		out[0] = s * axis[0];
		out[1] = s * axis[1];
		out[2] = s * axis[2];
		out[3] = Math.cos(rad);

		return out;
	};

	public static fromMatrix3 = (
		m: Float32Array | Matrix3 | number[],
		out: Quaternion = new Quaternion(),
	): Quaternion => {
		const fTrace = m[0] + m[4] + m[8];
		let fRoot;

		if (fTrace > 0.0) {
			fRoot = Math.sqrt(fTrace + 1.0); // 2w
			out[3] = 0.5 * fRoot;
			fRoot = 0.5 / fRoot; // 1/(4w)
			out[0] = (m[5] - m[7]) * fRoot;
			out[1] = (m[6] - m[2]) * fRoot;
			out[2] = (m[1] - m[3]) * fRoot;
		} else {
			let i = 0;

			if (m[4] > m[0]) i = 1;
			if (m[8] > m[i * 3 + i]) i = 2;
			const j = (i + 1) % 3;
			const k = (i + 2) % 3;

			fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
			out[i] = 0.5 * fRoot;
			fRoot = 0.5 / fRoot;
			out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
			out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
			out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
		}

		return out;
	};

	public static identity = (out: IQuaternion = new Quaternion()): IQuaternion => {
		out[0] = 0;
		out[1] = 0;
		out[2] = 0;
		out[3] = 1;

		return out;
	};

	public static invert = (
		a: Float32Array | IQuaternion | number[],
		out: Quaternion = new Quaternion(),
	): Quaternion => {
		ax = a[0];
		ay = a[1];
		az = a[2];
		aw = a[3];
		dotTmp = ax * ax + ay * ay + az * az + aw * aw;

		if (dotTmp) {
			c = 1.0 / dotTmp;
			out[0] = -ax * c;
			out[1] = -ay * c;
			out[2] = -az * c;
			out[3] = aw * c;
		} else {
			out[0] = 0;
			out[1] = 0;
			out[2] = 0;
			out[3] = 0;
		}

		return out;
	};

	public static lerp = (
		a: Float32Array | IQuaternion | number[],
		b: Float32Array | IQuaternion | number[],
		t: number,
		out: Quaternion = new Quaternion(),
	): Quaternion => {
		ax = a[0];
		ay = a[1];
		az = a[2];
		aw = a[3];
		out[0] = ax + t * (b[0] - ax);
		out[1] = ay + t * (b[1] - ay);
		out[2] = az + t * (b[2] - az);
		out[3] = aw + t * (b[3] - aw);

		return out;
	};

	public static multiply = (
		a: Float32Array | IQuaternion | number[],
		b: Float32Array | IQuaternion | number[],
		out: Quaternion = new Quaternion(),
	): Quaternion => {
		ax = a[0];
		ay = a[1];
		az = a[2];
		aw = a[3];
		bx = b[0];
		by = b[1];
		bz = b[2];
		bw = b[3];

		out[0] = ax * bw + aw * bx + ay * bz - az * by;
		out[1] = ay * bw + aw * by + az * bx - ax * bz;
		out[2] = az * bw + aw * bz + ax * by - ay * bx;
		out[3] = aw * bw - ax * bx - ay * by - az * bz;

		return out;
	};

	public static normalize = (
		a: Float32Array | IQuaternion | number[],
		out: Quaternion = new Quaternion(),
	): Quaternion => {
		ax = a[0];
		ay = a[1];
		az = a[2];
		aw = a[3];
		len = ax * ax + ay * ay + az * az + aw * aw;
		if (len > 0) {
			len = 1 / Math.sqrt(len);
		}
		out[0] = ax * len;
		out[1] = ay * len;
		out[2] = az * len;
		out[3] = aw * len;

		return out;
	};

	public static random = (out: IQuaternion = new Quaternion()): IQuaternion => {
		ax = Math.random();
		ay = Math.random();
		az = Math.random();

		c = Math.sqrt(1 - ax);
		s = Math.sqrt(ax);

		out[0] = c * Math.sin(2.0 * Math.PI * ay);
		out[1] = c * Math.cos(2.0 * Math.PI * ay);
		out[2] = s * Math.sin(2.0 * Math.PI * az);
		out[3] = s * Math.cos(2.0 * Math.PI * az);

		return out;
	};

	public static rotationTo = (a: Vector3Like, b: Vector3Like, out: Quaternion = new Quaternion()): Quaternion => {
		dotTmp = Vector3.dot(a, b);
		if (dotTmp < -1 + EPSILON) {
			Vector3.cross(Vector3.VECTOR3_LEFT, a, tmpVec3);
			if (Vector3.norm(tmpVec3) < EPSILON) {
				Vector3.cross(Vector3.VECTOR3_TOP, a, tmpVec3);
			}
			Vector3.normalize(tmpVec3, tmpVec3);
			Quaternion.fromAxisAngle(tmpVec3, Math.PI, out);

			return out;
		} else if (dotTmp > 1 - EPSILON) {
			out[0] = 0;
			out[1] = 0;
			out[2] = 0;
			out[3] = 1;

			return out;
		} else {
			Vector3.cross(a, b, tmpVec3);
			out[0] = tmpVec3[0];
			out[1] = tmpVec3[1];
			out[2] = tmpVec3[2];
			out[3] = 1 + dotTmp;

			return Quaternion.normalize(out, out);
		}
	};

	public static rotateX = (
		a: Float32Array | IQuaternion | number[],
		rad: number,
		out: Quaternion = new Quaternion(),
	): Quaternion => {
		rad *= 0.5;

		ax = a[0];
		ay = a[1];
		az = a[2];
		aw = a[3];
		bx = Math.sin(rad);
		bw = Math.cos(rad);

		out[0] = ax * bw + aw * bx;
		out[1] = ay * bw + az * bx;
		out[2] = az * bw - ay * bx;
		out[3] = aw * bw - ax * bx;

		return out;
	};

	public static rotateY = (
		a: Float32Array | IQuaternion | number[],
		rad: number,
		out: Quaternion = new Quaternion(),
	): Quaternion => {
		rad *= 0.5;

		ax = a[0];
		ay = a[1];
		az = a[2];
		aw = a[3];
		by = Math.sin(rad);
		bw = Math.cos(rad);

		out[0] = ax * bw - az * by;
		out[1] = ay * bw + aw * by;
		out[2] = az * bw + ax * by;
		out[3] = aw * bw - ay * by;

		return out;
	};

	public static rotateZ = (
		a: Float32Array | IQuaternion | number[],
		rad: number,
		out: Quaternion = new Quaternion(),
	): Quaternion => {
		rad *= 0.5;

		ax = a[0];
		ay = a[1];
		az = a[2];
		aw = a[3];
		bz = Math.sin(rad);
		bw = Math.cos(rad);

		out[0] = ax * bw + ay * bz;
		out[1] = ay * bw - ax * bz;
		out[2] = az * bw + aw * bz;
		out[3] = aw * bw - az * bz;

		return out;
	};

	public static slerp = (
		a: Float32Array | IQuaternion | number[],
		b: Float32Array | IQuaternion | number[],
		t: number,
		out: Quaternion = new Quaternion(),
	): Quaternion => {
		ax = a[0];
		ay = a[1];
		az = a[2];
		aw = a[3];
		bx = b[0];
		by = b[1];
		bz = b[2];
		bw = b[3];

		c = ax * bx + ay * by + az * bz + aw * bw;

		if (c < 0.0) {
			c = -c;
			bx = -bx;
			by = -by;
			bz = -bz;
			bw = -bw;
		}
		if (1.0 - c > EPSILON) {
			omega = Math.acos(c);
			s = Math.sin(omega);
			scale0 = Math.sin((1.0 - t) * omega) / s;
			scale1 = Math.sin(t * omega) / s;
		} else {
			scale0 = 1.0 - t;
			scale1 = t;
		}

		out[0] = scale0 * ax + scale1 * bx;
		out[1] = scale0 * ay + scale1 * by;
		out[2] = scale0 * az + scale1 * bz;
		out[3] = scale0 * aw + scale1 * bw;

		return out;
	};

	public static toAxisAngle = (q: Float32Array | IQuaternion | number[], outAxis: IVector3): number => {
		rad = Math.acos(q[3]) * 2.0;
		s = Math.sin(rad / 2.0);
		if (s > EPSILON) {
			outAxis[0] = q[0] / s;
			outAxis[1] = q[1] / s;
			outAxis[2] = q[2] / s;
		} else {
			outAxis[0] = 1;
			outAxis[1] = 0;
			outAxis[2] = 0;
		}

		return rad;
	};

	public static toString = (a: Float32Array | IQuaternion | number[]): string => {
		return `quat("${a[0]}, ${a[1]}, ${a[2]}, ${a[3]})`;
	};

	public readonly length!: 4;
	public readonly dataType = ArraybufferDataType.QUATERNION;
	public constructor(x = 0, y = 0, z = 0, w = 0) {
		super(4);
		this[0] = x;
		this[1] = y;
		this[2] = z;
		this[3] = w;
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

	public get w(): number {
		return this[3];
	}

	public set w(value: number) {
		this[3] = value;
	}
}
