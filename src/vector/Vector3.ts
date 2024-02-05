import { ArraybufferDataType } from "../ArraybufferDataType";
import { clamp } from "../common/clamp";
import { clampSafe } from "../common/clampSafe";
import { closeTo } from "../common/closeTo";
import { EPSILON } from "../constants";
import type { Matrix3Like } from "../matrix/Matrix3";
import type { Matrix4Like } from "../matrix/Matrix4";

let ax: number;
let ay: number;
let az: number;
let bx: number;
let by: number;
let bz: number;
let ag: number;
let s: number;

export interface IVector3Json {
	x: number;
	y: number;
	z: number;
}

export interface IVector3 extends Float32Array, IVector3Json {}
export type Vector3Like = IVector3 | Vector3 | number[] | Float32Array;

export class Vector3 extends Float32Array implements IVector3 {
	public static readonly VECTOR3_ZERO = new Vector3(0, 0, 0);
	public static readonly VECTOR3_ONE = new Vector3(1, 1, 1);
	public static readonly VECTOR3_TOP = new Vector3(0, 1, 0);
	public static readonly VECTOR3_BOTTOM = new Vector3(0, -1, 0);
	public static readonly VECTOR3_LEFT = new Vector3(-1, 0, 0);
	public static readonly VECTOR3_RIGHT = new Vector3(1, 0, 0);
	public static readonly VECTOR3_FRONT = new Vector3(0, 0, -1);
	public static readonly VECTOR3_BACK = new Vector3(0, 0, 1);

	public static add = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		b: Vector3Like,
		out: T = new Vector3() as T,
	): T => {
		out[0] = a[0] + b[0];
		out[1] = a[1] + b[1];
		out[2] = a[2] + b[2];

		return out;
	};

	public static addScalar = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		b: number,
		out: T = new Vector3() as T,
	): T => {
		out[0] = a[0] + b;
		out[1] = a[1] + b;
		out[2] = a[2] + b;

		return out;
	};

	public static angle = (a: Vector3Like, b: Vector3Like): number => {
		ax = a[0];
		ay = a[1];
		az = a[2];
		bx = b[0];
		by = b[1];
		bz = b[2];
		const mag1 = Math.sqrt(ax * ax + ay * ay + az * az);
		const mag2 = Math.sqrt(bx * bx + by * by + bz * bz);
		const mag = mag1 * mag2;
		const cosine = mag && Vector3.dot(a, b) / mag;

		return Math.acos(clamp(cosine, -1, 1));
	};

	public static clamp = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		min: Vector3Like,
		max: Vector3Like,
		out: T = new Vector3() as T,
	): T => {
		out[0] = clamp(a[0], min[0], max[0]);
		out[1] = clamp(a[1], min[1], max[1]);
		out[2] = clamp(a[2], min[2], max[2]);

		return out;
	};

	public static clampSafe = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		min: Vector3Like,
		max: Vector3Like,
		out: T = new Vector3() as T,
	): T => {
		out[0] = clampSafe(a[0], min[0], max[0]);
		out[1] = clampSafe(a[1], min[1], max[1]);
		out[1] = clampSafe(a[2], min[2], max[2]);

		return out;
	};

	public static clampScalar = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		min: number,
		max: number,
		out: T = new Vector3() as T,
	): T => {
		out[0] = clamp(a[0], min, max);
		out[1] = clamp(a[1], min, max);
		out[2] = clamp(a[2], min, max);

		return out;
	};

	public static clone = <T extends Vector3Like = Vector3>(a: Vector3Like, out: T = new Vector3() as T): T => {
		out[0] = a[0];
		out[1] = a[1];
		out[2] = a[2];

		return out;
	};

	public static closeTo = (a: Vector3Like, b: Vector3Like, epsilon = EPSILON): boolean => {
		return Vector3.distanceTo(a, b) <= epsilon;
	};

	public static closeToRect = (a: Vector3Like, b: Vector3Like, epsilon = EPSILON): boolean => {
		return closeTo(a[0], b[0], epsilon) && closeTo(a[1], b[1], epsilon) && closeTo(a[2], b[2], epsilon);
	};

	public static create = (x = 0, y = 0, z = 0): Vector3 => {
		const out = new Vector3();
		out[0] = x;
		out[1] = y;
		out[2] = z;

		return out;
	};

	public static cross = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		b: Vector3Like,
		out: T = new Vector3() as T,
	): T => {
		ax = a[0];
		ay = a[1];
		az = a[2];
		bx = b[0];
		by = b[1];
		bz = b[2];

		out[0] = ay * bz - az * by;
		out[1] = az * bx - ax * bz;
		out[2] = ax * by - ay * bx;

		return out;
	};

	public static distanceTo = (a: Vector3Like, b: Vector3Like): number => {
		ax = b[0] - a[0];
		ay = b[1] - a[1];
		az = b[2] - a[2];

		return Math.hypot(ax, ay, az);
	};

	public static distanceToManhattan = (a: Vector3Like, b: Vector3Like): number => {
		return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
	};

	public static distanceToSquared = (a: Vector3Like, b: Vector3Like): number => {
		ax = a[0] - b[0];
		ay = a[1] - b[1];
		az = a[2] - b[2];

		return ax * ax + ay * ay + az * az;
	};

	public static divide = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		b: Vector3Like,
		out: T = new Vector3() as T,
	): T => {
		out[0] = a[0] / b[0];
		out[1] = a[1] / b[1];
		out[2] = a[2] / b[2];

		return out;
	};

	public static divideScalar = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		b: number,
		out: T = new Vector3() as T,
	): T => {
		out[0] = a[0] / b;
		out[1] = a[1] / b;
		out[2] = a[2] / b;

		return out;
	};

	public static dot = (a: Vector3Like, b: Vector3Like): number => {
		return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	};

	public static equals = (a: Vector3Like, b: Vector3Like): boolean => {
		return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
	};

	public static floor = <T extends Vector3Like = Vector3>(a: Vector3Like, out: T = new Vector3() as T): T => {
		out[0] = Math.floor(a[0]);
		out[1] = Math.floor(a[1]);
		out[2] = Math.floor(a[2]);

		return out;
	};

	public static fromArray = <T extends Vector3Like = Vector3>(
		a: ArrayLike<number> | Vector3Like,
		offset = 0,
		out: T = new Vector3() as T,
	): T => {
		out[0] = a[offset];
		out[1] = a[offset + 1];
		out[2] = a[offset + 2];

		return out;
	};

	public static fromScalar = <T extends Vector3Like = Vector3>(num: number, out: T = new Vector3() as T): T => {
		out[0] = out[1] = out[2] = num;

		return out;
	};

	public static fromXYZ = <T extends Vector3Like = Vector3>(
		x: number,
		y: number,
		z: number,
		out: T = new Vector3() as T,
	): T => {
		out[0] = x;
		out[1] = y;
		out[2] = z;

		return out;
	};

	public static fromMatrix4Scale = <T extends Vector3Like = Vector3>(
		mat: Matrix4Like,
		out: T = new Vector3() as T,
	): T => {
		out[0] = mat[0];
		out[1] = mat[5];
		out[2] = mat[10];

		return out;
	};

	public static fromMatrix4Translate = <T extends Vector3Like = Vector3>(
		mat: Matrix4Like,
		out: T = new Vector3() as T,
	): T => {
		out[0] = mat[12];
		out[1] = mat[13];
		out[2] = mat[14];

		return out;
	};

	public static hermite = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		b: Vector3Like,
		c: Vector3Like,
		d: Vector3Like,
		t: number,
		out: T = new Vector3() as T,
	): T => {
		ag = t * t;
		const factor1 = ag * (2 * t - 3) + 1;
		const factor2 = ag * (t - 2) + t;
		const factor3 = ag * (t - 1);
		const factor4 = ag * (3 - 2 * t);

		out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
		out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
		out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

		return out;
	};

	public static inverse = <T extends Vector3Like = Vector3>(a: Vector3Like, out: T = new Vector3() as T): T => {
		out[0] = 1.0 / a[0];
		out[1] = 1.0 / a[1];
		out[2] = 1.0 / a[2];

		return out;
	};

	public static norm = (a: Vector3Like): number => {
		return Math.sqrt(Vector3.lengthSquared(a));
	};

	public static lengthManhattan = (a: Vector3Like): number => {
		return Math.abs(a[0]) + Math.abs(a[1]) + Math.abs(a[2]);
	};

	public static lengthSquared = (a: Vector3Like): number => {
		return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
	};

	public static lerp = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		b: Vector3Like,
		alpha: number,
		out: T = new Vector3() as T,
	): T => {
		out[0] = (b[0] - a[0]) * alpha + a[0];
		out[1] = (b[1] - a[1]) * alpha + a[1];
		out[2] = (b[2] - a[2]) * alpha + a[2];

		return out;
	};

	public static max = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		b: Vector3Like,
		out: T = new Vector3() as T,
	): T => {
		out[0] = Math.max(a[0], b[0]);
		out[1] = Math.max(a[1], b[1]);
		out[2] = Math.max(a[2], b[2]);

		return out;
	};

	public static min = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		b: Vector3Like,
		out: T = new Vector3() as T,
	): T => {
		out[0] = Math.min(a[0], b[0]);
		out[1] = Math.min(a[1], b[1]);
		out[2] = Math.min(a[2], b[2]);

		return out;
	};

	public static minus = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		b: Vector3Like,
		out: T = new Vector3() as T,
	): T => {
		out[0] = a[0] - b[0];
		out[1] = a[1] - b[1];
		out[2] = a[2] - b[2];

		return out;
	};

	public static minusScalar = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		b: number,
		out: T = new Vector3() as T,
	): T => {
		out[0] = a[0] - b;
		out[1] = a[1] - b;
		out[2] = a[2] - b;

		return out;
	};

	public static multiply = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		b: Vector3Like,
		out: T = new Vector3() as T,
	): T => {
		out[0] = a[0] * b[0];
		out[1] = a[1] * b[1];
		out[2] = a[2] * b[2];

		return out;
	};

	public static multiplyScalar = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		scalar: number,
		out: T = new Vector3() as T,
	): T => {
		out[0] = a[0] * scalar;
		out[1] = a[1] * scalar;
		out[2] = a[2] * scalar;

		return out;
	};

	public static negate = <T extends Vector3Like = Vector3>(a: Vector3Like, out: T = new Vector3() as T): T => {
		out[0] = -a[0];
		out[1] = -a[1];
		out[2] = -a[2];

		return out;
	};

	public static normalize = <T extends Vector3Like = Vector3>(a: Vector3Like, out: T = new Vector3() as T): T => {
		return Vector3.divideScalar(a, Vector3.norm(a) || 1, out);
	};

	public static opposite = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		center: Vector3Like,
		out: T = new Vector3() as T,
	): T => {
		ax = center[0];
		ay = center[1];
		az = center[2];
		out[0] = ax + ax - a[0];
		out[1] = ay + ay - a[1];
		out[2] = az + az - a[2];

		return out;
	};

	public static reflect = <T extends Vector3Like = Vector3>(
		origin: Vector3Like,
		normal: Vector3Like,
		out: T = new Vector3() as T,
	): T => {
		Vector3.multiplyScalar(normal, 2 * Vector3.dot(origin, normal), out);

		return Vector3.minus(origin, out, out);
	};

	public static rotateX = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		b: Vector3Like,
		rad: number,
		out: T = new Vector3() as T,
	): T => {
		ax = a[0] - b[0];
		ay = a[1] - b[1];
		az = a[2] - b[2];

		bx = ax;
		by = ay * Math.cos(rad) - az * Math.sin(rad);
		bz = ay * Math.sin(rad) + az * Math.cos(rad);

		out[0] = bx + b[0];
		out[1] = by + b[1];
		out[2] = bz + b[2];

		return out;
	};

	public static rotateY = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		b: Vector3Like,
		rad: number,
		out: T = new Vector3() as T,
	): T => {
		ax = a[0] - b[0];
		ay = a[1] - b[1];
		az = a[2] - b[2];

		bx = az * Math.sin(rad) + ax * Math.cos(rad);
		by = ay;
		bz = az * Math.cos(rad) - ax * Math.sin(rad);

		out[0] = bx + b[0];
		out[1] = by + b[1];
		out[2] = bz + b[2];

		return out;
	};

	public static rotateZ = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		b: Vector3Like,
		rad: number,
		out: T = new Vector3() as T,
	): T => {
		ax = a[0] - b[0];
		ay = a[1] - b[1];
		az = a[2] - b[2];

		bx = ax * Math.cos(rad) - ay * Math.sin(rad);
		by = ax * Math.sin(rad) + ay * Math.cos(rad);
		bz = az;

		out[0] = bx + b[0];
		out[1] = by + b[1];
		out[2] = bz + b[2];

		return out;
	};

	public static round = <T extends Vector3Like = Vector3>(a: Vector3Like, out: T = new Vector3() as T): T => {
		out[0] = Math.round(a[0]);
		out[1] = Math.round(a[1]);
		out[2] = Math.round(a[2]);

		return out;
	};

	public static setNorm = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		norm: number,
		out: T = new Vector3() as T,
	): T => {
		return Vector3.multiplyScalar(Vector3.normalize(a, out), norm, out);
	};

	public static slerp = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		b: Vector3Like,
		t: number,
		out: T = new Vector3() as T,
	): T => {
		ag = Math.acos(Math.min(Math.max(Vector3.dot(a, b), -1), 1));
		s = Math.sin(ag);

		ax = Math.sin((1 - t) * ag) / s;
		bx = Math.sin(t * ag) / s;
		out[0] = ax * a[0] + bx * b[0];
		out[1] = ax * a[1] + bx * b[1];
		out[2] = ax * a[2] + bx * b[2];

		return out;
	};

	public static toString = (a: Vector3Like): string => {
		return `(${a[0]}, ${a[1]}, ${a[2]})`;
	};

	public static transformMatrix3 = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		m: Matrix3Like,
		out: T = new Vector3() as any,
	): T => {
		ax = a[0];
		ay = a[1];
		az = a[2];
		out[0] = ax * m[0] + ay * m[3] + az * m[6];
		out[1] = ax * m[1] + ay * m[4] + az * m[7];
		out[2] = ax * m[2] + ay * m[5] + az * m[8];

		return out;
	};

	public static transformDirection = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		m: Matrix4Like,
		out: T = new Vector3() as T,
	): T => {
		ax = a[0];
		ay = a[1];
		az = a[2];

		out[0] = m[0] * ax + m[4] * ay + m[8] * az;
		out[1] = m[1] * ax + m[5] * ay + m[9] * az;
		out[2] = m[2] * ax + m[6] * ay + m[10] * az;

		return Vector3.normalize(out, out);
	};

	public static transformMatrix4 = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		m: Matrix4Like,
		out: T = new Vector3() as T,
	): T => {
		ax = a[0];
		ay = a[1];
		az = a[2];
		ag = m[3] * ax + m[7] * ay + m[11] * az + m[15];
		ag = ag ? 1 / ag : 1.0;
		out[0] = (m[0] * ax + m[4] * ay + m[8] * az + m[12]) * ag;
		out[1] = (m[1] * ax + m[5] * ay + m[9] * az + m[13]) * ag;
		out[2] = (m[2] * ax + m[6] * ay + m[10] * az + m[14]) * ag;

		return out;
	};

	public static transformQuat = <T extends Vector3Like = Vector3>(
		a: Vector3Like,
		q: Vector3Like,
		out: T = new Vector3() as T,
	): T => {
		const qx = q[0];
		const qy = q[1];
		const qz = q[2];
		const qw = q[3];
		const x = a[0];
		const y = a[1];
		const z = a[2];
		// var qvec = [qx, qy, qz];
		// var uv = vec3.cross([], qvec, a);
		let uvx = qy * z - qz * y;
		let uvy = qz * x - qx * z;
		let uvz = qx * y - qy * x;
		// var uuv = vec3.cross([], qvec, uv);
		let uuvx = qy * uvz - qz * uvy;
		let uuvy = qz * uvx - qx * uvz;
		let uuvz = qx * uvy - qy * uvx;
		// vec3.scale(uv, uv, 2 * w);
		const w2 = qw * 2;

		uvx *= w2;
		uvy *= w2;
		uvz *= w2;
		// vec3.scale(uuv, uuv, 2);
		uuvx *= 2;
		uuvy *= 2;
		uuvz *= 2;
		// return vec3.add(out, a, vec3.add(out, uv, uuv));
		out[0] = x + uvx + uuvx;
		out[1] = y + uvy + uuvy;
		out[2] = z + uvz + uuvz;

		return out;
	};

	public static volume = (a: Vector3Like): number => {
		return a[0] * a[1] * a[2];
	};

	public readonly dataType = ArraybufferDataType.VECTOR3;
	public constructor(x = 0, y = 0, z = 0) {
		super(3);
		this[0] = x;
		this[1] = y;
		this[2] = z;
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
