// import clampCommon from "../common/clamp";
// import clampSafeCommon from "../common/clampSafe";
import closeToCommon from "../common/closeTo";
import { IPairs4Float32 } from "../common/interfaces/IPairs4";

export interface IVector4Json {
	x: number;
	y: number;
	z: number;
	w: number;
}

export interface IVector4 extends IPairs4Float32, IVector4Json {}

let ax: number, ay: number, az: number, aw: number, bx: number, by: number, bz: number, len: number;
let ix: number, iy: number, iz: number, iw: number;
let A: number,
	B: number,
	C: number,
	D: number,
	E: number,
	F: number,
	G: number,
	H: number,
	I: number,
	J: number;

export default class Vector4 extends Float32Array implements IVector4 {
	public static add = (
		a: Float32Array | IVector4 | number[],
		b: Float32Array | IVector4 | number[],
		out: IVector4 = new Vector4()
	): IVector4 => {
		out[0] = a[0] + b[0];
		out[1] = a[1] + b[1];
		out[2] = a[2] + b[2];
		out[3] = a[3] + b[3];

		return out;
	};

	public static ceil = (
		a: Float32Array | IVector4 | number[],
		out: IVector4 = new Vector4()
	): IVector4 => {
		out[0] = Math.ceil(a[0]);
		out[1] = Math.ceil(a[1]);
		out[2] = Math.ceil(a[2]);
		out[3] = Math.ceil(a[3]);

		return out;
	};

	public static closeTo = (
		a: Float32Array | IVector4 | number[],
		b: Float32Array | IVector4 | number[]
	): boolean => {
		return (
			closeToCommon(a[0], b[0]) &&
			closeToCommon(a[1], b[1]) &&
			closeToCommon(a[2], b[2]) &&
			closeToCommon(a[3], b[3])
		);
	};

	public static create = (
		x = 0,
		y = 0,
		z = 0,
		w = 0,
		out: IVector4 = new Vector4()
	): IVector4 => {
		out[0] = x;
		out[1] = y;
		out[2] = z;
		out[3] = w;

		return out;
	};

	public static cross = (
		u: Float32Array | IVector4 | number[],
		v: Float32Array | IVector4 | number[],
		w: Float32Array | IVector4 | number[],
		out: Float32Array = new Float32Array(4)
	): Float32Array => {
		A = v[0] * w[1] - v[1] * w[0];
		B = v[0] * w[2] - v[2] * w[0];
		C = v[0] * w[3] - v[3] * w[0];
		D = v[1] * w[2] - v[2] * w[1];
		E = v[1] * w[3] - v[3] * w[1];
		F = v[2] * w[3] - v[3] * w[2];
		G = u[0];
		H = u[1];
		I = u[2];
		J = u[3];

		out[0] = H * F - I * E + J * D;
		out[1] = -(G * F) + I * C - J * B;
		out[2] = G * E - H * C + J * A;
		out[3] = -(G * D) + H * B - I * A;

		return out;
	};

	public static distanceTo = (
		a: Float32Array | IVector4 | number[],
		b: Float32Array | IVector4 | number[]
	): number => {
		ax = b[0] - a[0];
		ay = b[1] - a[1];
		az = b[2] - a[2];
		aw = b[3] - a[3];

		return Math.hypot(ax, ay, az, aw);
	};

	public static distanceToSquared = (
		a: Float32Array | IVector4 | number[],
		b: Float32Array | IVector4 | number[]
	): number => {
		ax = b[0] - a[0];
		ay = b[1] - a[1];
		az = b[2] - a[2];
		aw = b[3] - a[3];

		return ax * ax + ay * ay + az * az + aw * aw;
	};

	public static divide = (
		a: Float32Array | IVector4 | number[],
		b: Float32Array | IVector4 | number[],
		out: IVector4 = new Vector4()
	): IVector4 => {
		out[0] = a[0] / b[0];
		out[1] = a[1] / b[1];
		out[2] = a[2] / b[2];
		out[3] = a[3] / b[3];

		return out;
	};

	public static dot = (
		a: Float32Array | IVector4 | number[],
		b: Float32Array | IVector4 | number[]
	): number => {
		return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
	};

	public static equals = (
		a: Float32Array | IVector4 | number[],
		b: Float32Array | IVector4 | number[]
	): boolean => {
		return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
	};

	public static floor = (
		a: Float32Array | IVector4 | number[],
		out: IVector4 = new Vector4()
	): IVector4 => {
		out[0] = Math.floor(a[0]);
		out[1] = Math.floor(a[1]);
		out[2] = Math.floor(a[2]);
		out[3] = Math.floor(a[3]);

		return out;
	};

	public static fromValues = (
		x: number,
		y: number,
		z: number,
		w: number,
		out: IVector4 = new Vector4()
	): IVector4 => {
		out[0] = x;
		out[1] = y;
		out[2] = z;
		out[3] = w;

		return out;
	};

	public static inverse = (
		a: Float32Array | IVector4 | number[],
		out: IVector4 = new Vector4()
	): IVector4 => {
		out[0] = 1.0 / a[0];
		out[1] = 1.0 / a[1];
		out[2] = 1.0 / a[2];
		out[3] = 1.0 / a[3];

		return out;
	};

	public static norm = (a: Float32Array | IVector4 | number[]): number => {
		return Math.hypot(a[0], a[1], a[2], a[3]);
	};

	public static lengthSquared = (a: Float32Array | IVector4 | number[]): number => {
		ax = a[0];
		ay = a[1];
		az = a[2];
		aw = a[3];

		return ax * ax + ay * ay + az * az + aw * aw;
	};

	public static lerp = (
		a: Float32Array | IVector4 | number[],
		b: Float32Array | IVector4 | number[],
		t: number,
		out: IVector4 = new Vector4()
	): IVector4 => {
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

	public static max = (
		a: Float32Array | IVector4 | number[],
		b: Float32Array | IVector4 | number[],
		out: IVector4 = new Vector4()
	): IVector4 => {
		out[0] = Math.max(a[0], b[0]);
		out[1] = Math.max(a[1], b[1]);
		out[2] = Math.max(a[2], b[2]);
		out[3] = Math.max(a[3], b[3]);

		return out;
	};

	public static min = (
		a: Float32Array | IVector4 | number[],
		b: Float32Array | IVector4 | number[],
		out: IVector4 = new Vector4()
	): IVector4 => {
		out[0] = Math.min(a[0], b[0]);
		out[1] = Math.min(a[1], b[1]);
		out[2] = Math.min(a[2], b[2]);
		out[3] = Math.min(a[3], b[3]);

		return out;
	};

	public static minus = (
		a: Float32Array | IVector4 | number[],
		b: Float32Array | IVector4 | number[],
		out: IVector4 = new Vector4()
	): IVector4 => {
		out[0] = a[0] - b[0];
		out[1] = a[1] - b[1];
		out[2] = a[2] - b[2];
		out[3] = a[3] - b[3];

		return out;
	};

	public static multiply = (
		a: Float32Array | IVector4 | number[],
		b: Float32Array | IVector4 | number[],
		out: IVector4 = new Vector4()
	): IVector4 => {
		out[0] = a[0] * b[0];
		out[1] = a[1] * b[1];
		out[2] = a[2] * b[2];
		out[3] = a[3] * b[3];

		return out;
	};

	public static multiplyScalar = (
		a: Float32Array | IVector4 | number[],
		b: number,
		out: IVector4 = new Vector4()
	): IVector4 => {
		out[0] = a[0] * b;
		out[1] = a[1] * b;
		out[2] = a[2] * b;
		out[3] = a[3] * b;

		return out;
	};

	public static negate = (
		a: Float32Array | IVector4 | number[],
		out: IVector4 = new Vector4()
	): IVector4 => {
		out[0] = -a[0];
		out[1] = -a[1];
		out[2] = -a[2];
		out[3] = -a[3];

		return out;
	};

	public static normalize = (
		a: Float32Array | IVector4 | number[],
		out: IVector4 = new Vector4()
	): IVector4 => {
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

	public static round = (
		a: Float32Array | IVector4 | number[],
		out: IVector4 = new Vector4()
	): IVector4 => {
		out[0] = Math.round(a[0]);
		out[1] = Math.round(a[1]);
		out[2] = Math.round(a[2]);
		out[3] = Math.round(a[3]);

		return out;
	};

	public static toString = (a: Float32Array | IVector4 | number[]): string => {
		return `(${a[0]}, ${a[1]}, ${a[2]}, ${a[3]})`;
	};

	public static transformMatrix4 = (
		a: Float32Array | IVector4 | number[],
		m: Float32Array,
		out: IVector4 = new Vector4()
	): IVector4 => {
		ax = a[0];
		ay = a[1];
		az = a[2];
		aw = a[3];
		out[0] = m[0] * ax + m[4] * ay + m[8] * az + m[12] * aw;
		out[1] = m[1] * ax + m[5] * ay + m[9] * az + m[13] * aw;
		out[2] = m[2] * ax + m[6] * ay + m[10] * az + m[14] * aw;
		out[3] = m[3] * ax + m[7] * ay + m[11] * az + m[15] * aw;

		return out;
	};

	public static transformQuat = (
		a: Float32Array | IVector4 | number[],
		q: Float32Array | number[],
		out: IVector4 = new Vector4()
	): IVector4 => {
		bx = a[0];
		by = a[1];
		bz = a[2];
		ax = q[0];
		ay = q[1];
		az = q[2];
		aw = q[3];

		ix = aw * bx + ay * bz - az * by;
		iy = aw * by + az * bx - ax * bz;
		iz = aw * bz + ax * by - ay * bx;
		iw = -ax * bx - ay * by - az * bz;

		out[0] = ix * aw + iw * -ax + iy * -az - iz * -ay;
		out[1] = iy * aw + iw * -ay + iz * -ax - ix * -az;
		out[2] = iz * aw + iw * -az + ix * -ay - iy * -ax;
		out[3] = a[3];

		return out;
	};

	public readonly length!: 4;
	public constructor(x = 0, y = 0, z = 0, w = 0) {
		super(2);
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
