import { ArraybufferDataType } from "../ArraybufferDataType";
import { closeTo } from "../common/closeTo";
import { EPSILON } from "../constants";
import type { Matrix4Like } from "../matrix";

export interface IVector4Json {
	x: number;
	y: number;
	z: number;
	w: number;
}

export interface IVector4 extends Float32Array, IVector4Json {}
export type Vector4Like = IVector4 | Vector4 | number[] | Float32Array;

let ax: number;
let ay: number;
let az: number;
let aw: number;
let bx: number;
let by: number;
let bz: number;
let len: number;
let ix: number;
let iy: number;
let iz: number;
let iw: number;
let A: number;
let B: number;
let C: number;
let D: number;
let E: number;
let F: number;
let G: number;
let H: number;
let I: number;
let J: number;

export class Vector4 extends Float32Array implements IVector4 {
	public static readonly VECTOR4_ZERO = new Vector4(0, 0, 0, 0);
	public static readonly VECTOR4_ONE = new Vector4(1, 1, 1, 1);
	public static add = <T extends Vector4Like = Vector4>(
		a: Vector4Like,
		b: Vector4Like,
		out: T = new Vector4() as T,
	): T => {
		out[0] = a[0] + b[0];
		out[1] = a[1] + b[1];
		out[2] = a[2] + b[2];
		out[3] = a[3] + b[3];

		return out;
	};

	public static ceil = <T extends Vector4Like = Vector4>(a: Vector4Like, out: T = new Vector4() as T): T => {
		out[0] = Math.ceil(a[0]);
		out[1] = Math.ceil(a[1]);
		out[2] = Math.ceil(a[2]);
		out[3] = Math.ceil(a[3]);

		return out;
	};

	public static closeTo = (a: Vector4Like, b: Vector4Like, epsilon = EPSILON): boolean => {
		return Vector4.distanceTo(a, b) <= epsilon;
	};

	public static closeToRect = (a: Vector4Like, b: Vector4Like, epsilon = EPSILON): boolean => {
		return closeTo(a[0], b[0], epsilon) && closeTo(a[1], b[1], epsilon) && closeTo(a[2], b[2], epsilon) && closeTo(a[3], b[3], epsilon);
	};

	public static create = (x = 0, y = 0, z = 0, w = 0): Vector4 => {
		const out: Vector4 = new Vector4();
		out[0] = x;
		out[1] = y;
		out[2] = z;
		out[3] = w;

		return out;
	};

	public static cross = <T extends Vector4Like = Vector4>(
		u: Vector4Like,
		v: Vector4Like,
		w: Vector4Like,
		out: T = new Vector4(4) as T,
	): T => {
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

	public static distanceTo = (a: Vector4Like, b: Vector4Like): number => {
		ax = b[0] - a[0];
		ay = b[1] - a[1];
		az = b[2] - a[2];
		aw = b[3] - a[3];

		return Math.hypot(ax, ay, az, aw);
	};

	public static distanceToSquared = (a: Vector4Like, b: Vector4Like): number => {
		ax = b[0] - a[0];
		ay = b[1] - a[1];
		az = b[2] - a[2];
		aw = b[3] - a[3];

		return ax * ax + ay * ay + az * az + aw * aw;
	};

	public static divide = <T extends Vector4Like = Vector4>(
		a: Vector4Like,
		b: Vector4Like,
		out: T = new Vector4() as T,
	): T => {
		out[0] = a[0] / b[0];
		out[1] = a[1] / b[1];
		out[2] = a[2] / b[2];
		out[3] = a[3] / b[3];

		return out;
	};

	public static dot = (a: Vector4Like, b: Vector4Like): number => {
		return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
	};

	public static equals = (a: Vector4Like, b: Vector4Like): boolean => {
		return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
	};

	public static floor = <T extends Vector4Like = Vector4>(a: Vector4Like, out: T = new Vector4() as T): T => {
		out[0] = Math.floor(a[0]);
		out[1] = Math.floor(a[1]);
		out[2] = Math.floor(a[2]);
		out[3] = Math.floor(a[3]);

		return out;
	};

	public static fromArray = <T extends Vector4Like = Vector4>(
		a: ArrayLike<number> | Vector4Like,
		offset = 0,
		out: T = new Vector4() as T,
	): T => {
		out[0] = a[offset];
		out[1] = a[offset + 1];
		out[2] = a[offset + 2];
		out[3] = a[offset + 3];

		return out;
	};

	public static fromScalar = <T extends Vector4Like = Vector4>(num: number, out: T = new Vector4() as T): T => {
		out[0] = out[1] = out[2] = out[3] = num;

		return out;
	};

	public static fromXYZW = <T extends Vector4Like = Vector4>(
		x: number,
		y: number,
		z: number,
		w: number,
		out: T = new Vector4() as T,
	): T => {
		out[0] = x;
		out[1] = y;
		out[2] = z;
		out[3] = w;

		return out;
	};

	public static inverse = <T extends Vector4Like = Vector4>(a: Vector4Like, out: T = new Vector4() as T): T => {
		out[0] = 1.0 / a[0];
		out[1] = 1.0 / a[1];
		out[2] = 1.0 / a[2];
		out[3] = 1.0 / a[3];

		return out;
	};

	public static norm = (a: Vector4Like): number => {
		return Math.hypot(a[0], a[1], a[2], a[3]);
	};

	public static lengthSquared = (a: Vector4Like): number => {
		ax = a[0];
		ay = a[1];
		az = a[2];
		aw = a[3];

		return ax * ax + ay * ay + az * az + aw * aw;
	};

	public static lerp = <T extends Vector4Like = Vector4>(
		a: Vector4Like,
		b: Vector4Like,
		t: number,
		out: T = new Vector4() as T,
	): T => {
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

	public static max = <T extends Vector4Like = Vector4>(
		a: Vector4Like,
		b: Vector4Like,
		out: T = new Vector4() as T,
	): T => {
		out[0] = Math.max(a[0], b[0]);
		out[1] = Math.max(a[1], b[1]);
		out[2] = Math.max(a[2], b[2]);
		out[3] = Math.max(a[3], b[3]);

		return out;
	};

	public static min = <T extends Vector4Like = Vector4>(
		a: Vector4Like,
		b: Vector4Like,
		out: T = new Vector4() as T,
	): T => {
		out[0] = Math.min(a[0], b[0]);
		out[1] = Math.min(a[1], b[1]);
		out[2] = Math.min(a[2], b[2]);
		out[3] = Math.min(a[3], b[3]);

		return out;
	};

	public static minus = <T extends Vector4Like = Vector4>(
		a: Vector4Like,
		b: Vector4Like,
		out: T = new Vector4() as T,
	): T => {
		out[0] = a[0] - b[0];
		out[1] = a[1] - b[1];
		out[2] = a[2] - b[2];
		out[3] = a[3] - b[3];

		return out;
	};

	public static multiply = <T extends Vector4Like = Vector4>(
		a: Vector4Like,
		b: Vector4Like,
		out: T = new Vector4() as T,
	): T => {
		out[0] = a[0] * b[0];
		out[1] = a[1] * b[1];
		out[2] = a[2] * b[2];
		out[3] = a[3] * b[3];

		return out;
	};

	public static multiplyScalar = <T extends Vector4Like = Vector4>(
		a: Vector4Like,
		b: number,
		out: T = new Vector4() as T,
	): T => {
		out[0] = a[0] * b;
		out[1] = a[1] * b;
		out[2] = a[2] * b;
		out[3] = a[3] * b;

		return out;
	};

	public static negate = <T extends Vector4Like = Vector4>(a: Vector4Like, out: T = new Vector4() as T): T => {
		out[0] = -a[0];
		out[1] = -a[1];
		out[2] = -a[2];
		out[3] = -a[3];

		return out;
	};

	public static normalize = <T extends Vector4Like = Vector4>(a: Vector4Like, out: T = new Vector4() as T): T => {
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

	public static round = <T extends Vector4Like = Vector4>(a: Vector4Like, out: T = new Vector4() as T): T => {
		out[0] = Math.round(a[0]);
		out[1] = Math.round(a[1]);
		out[2] = Math.round(a[2]);
		out[3] = Math.round(a[3]);

		return out;
	};

	public static setNorm = <T extends Vector4Like = Vector4>(
		a: Vector4Like,
		length: number,
		out: T = new Vector4(2) as T,
	): T => {
		Vector4.normalize(a, out);
		Vector4.multiplyScalar(out, length, out);

		return out;
	};

	public static toString = (a: Vector4Like): string => {
		return `(${a[0]}, ${a[1]}, ${a[2]}, ${a[3]})`;
	};

	public static transformMatrix4 = <T extends Vector4Like = Vector4>(
		a: Vector4Like,
		m: Matrix4Like,
		out: T = new Vector4() as T,
	): T => {
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

	public static transformQuat = <T extends Vector4Like = Vector4>(
		a: Vector4Like,
		q: Matrix4Like,
		out: T = new Vector4() as T,
	): T => {
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

	public readonly dataType = ArraybufferDataType.VECTOR4;
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
