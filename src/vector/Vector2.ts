import { DEG_360_RAD, EPSILON } from "../constants";
import { ArraybufferDataType } from "../ArraybufferDataType";
import { clamp } from "../common/clamp";
import { clampSafe } from "../common/clampSafe";
import { closeTo } from "../common/closeTo";
import { floorToZero } from "../common/floorToZero";
import type { IPolar } from "../polar";
import type { Matrix3Like } from "../matrix/Matrix3";

let x = 0;
let y = 0;
let c = 0;
let s = 0;

export interface IVector2Json {
	x: number;
	y: number;
}

export interface IVector2 extends Float32Array, IVector2Json {}
export type Vector2Like = IVector2 | Vector2 | number[] | Float32Array;

export class Vector2 extends Float32Array implements IVector2 {
	public static readonly VECTOR2_ZERO = new Vector2(0, 0);
	public static readonly VECTOR2_TOP = new Vector2(0, 1);
	public static readonly VECTOR2_BOTTOM = new Vector2(0, -1);
	public static readonly VECTOR2_LEFT = new Vector2(-1, 0);
	public static readonly VECTOR2_RIGHT = new Vector2(1, 0);
	public static readonly VECTOR2_ONE = new Vector2(1, 1);

	public static add = <T extends Vector2Like = Vector2>(
		a: Vector2Like,
		b: Vector2Like,
		out: T = new Vector2() as T,
	): T => {
		out[0] = a[0] + b[0];
		out[1] = a[1] + b[1];

		return out;
	};

	public static addScalar = <T extends Vector2Like = Vector2>(
		a: Vector2Like,
		b: number,
		out: T = new Vector2() as T,
	): T => {
		out[0] = a[0] + b;
		out[1] = a[1] + b;

		return out;
	};

	public static angle = (a: Vector2Like): number => {
		return Math.atan2(a[1], a[0]);
	};

	public static area = (a: Vector2Like): number => {
		return a[0] * a[1];
	};

	public static ceil = <T extends Vector2Like = Vector2>(a: Vector2Like, out: T = new Vector2() as T): T => {
		out[0] = Math.ceil(a[0]);
		out[1] = Math.ceil(a[1]);

		return out;
	};

	public static clamp = <T extends Vector2Like = Vector2>(
		a: Vector2Like,
		min: Vector2Like,
		max: Vector2Like,
		out: T = new Vector2() as T,
	): T => {
		out[0] = clamp(a[0], min[0], max[0]);
		out[1] = clamp(a[1], min[1], max[1]);

		return out;
	};

	public static clampSafe = <T extends Vector2Like = Vector2>(
		a: Vector2Like,
		min: Vector2Like,
		max: Vector2Like,
		out: T = new Vector2() as T,
	): T => {
		out[0] = clampSafe(a[0], min[0], max[0]);
		out[1] = clampSafe(a[1], min[1], max[1]);

		return out;
	};

	public static clampLength = <T extends Vector2Like = Vector2>(
		a: Vector2Like,
		min: Vector2Like,
		max: Vector2Like,
		out: T = new Vector2() as T,
	): T => {
		out[0] = clampSafe(a[0], min[0], max[0]);
		out[1] = clampSafe(a[1], min[1], max[1]);

		return out;
	};

	public static clampScalar = <T extends Vector2Like = Vector2>(
		a: Vector2Like,
		min: number,
		max: number,
		out: T = new Vector2() as T,
	): T => {
		out[0] = clamp(a[0], min, max);
		out[1] = clamp(a[1], min, max);

		return out;
	};

	public static closeTo = (a: Vector2Like, b: Vector2Like, epsilon = EPSILON): boolean => {
		return Vector2.distanceTo(a, b) <= epsilon;
	};

	public static closeToRect = (a: Vector2Like, b: Vector2Like, epsilon = EPSILON): boolean => {
		return closeTo(a[0], b[0], epsilon) && closeTo(a[1], b[1], epsilon);
	};

	public static closeToManhattan = (a: Vector2Like, b: Vector2Like, epsilon = EPSILON): boolean => {
		return Vector2.distanceToManhattan(a, b) <= epsilon;
	};

	public static clone = <T extends Vector2Like = Vector2>(a: Vector2Like, out: T = new Vector2() as T): T => {
		out[0] = a[0];
		out[1] = a[1];

		return out;
	};

	public static cross = (a: Vector2Like, b: Vector2Like): number => {
		return a[0] * b[1] - a[1] * b[0];
	};

	public static create = (x = 0, y = 0): Vector2 => {
		const out: Vector2 = new Vector2();
		out[0] = x;
		out[1] = y;

		return out;
	};

	public static distanceTo = (a: Vector2Like, b: Vector2Like): number => {
		x = b[0] - a[0];
		y = b[1] - a[1];

		return Math.hypot(x, y);
	};

	public static distanceToManhattan = (a: Vector2Like, b: Vector2Like): number => {
		return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
	};

	public static distanceToSquared = (a: Vector2Like, b: Vector2Like): number => {
		x = a[0] - b[0];
		y = a[1] - b[1];

		return x * x + y * y;
	};

	public static divide = <T extends Vector2Like = Vector2>(
		a: Vector2Like,
		b: Vector2Like,
		out: T = new Vector2() as T,
	): T => {
		out[0] = a[0] / b[0];
		out[1] = a[1] / b[1];

		return out;
	};

	public static divideScalar = <T extends Vector2Like = Vector2>(
		a: Vector2Like,
		scalar: number,
		out: T = new Vector2() as T,
	): T => {
		return Vector2.multiplyScalar(a, 1 / scalar, out);
	};

	public static dot = (a: Vector2Like, b: Vector2Like): number => {
		return a[0] * b[0] + a[1] * b[1];
	};

	public static equals = (a: Vector2Like, b: Vector2Like): boolean => {
		return a[0] === b[0] && a[1] === b[1];
	};

	public static floor = <T extends Vector2Like = Vector2>(a: Vector2Like, out: T = new Vector2() as T): T => {
		out[0] = Math.floor(a[0]);
		out[1] = Math.floor(a[1]);

		return out;
	};

	public static floorToZero = <T extends Vector2Like = Vector2>(a: Vector2Like, out: T = new Vector2() as T): T => {
		out[0] = floorToZero(a[0]);
		out[1] = floorToZero(a[1]);

		return out;
	};

	public static fromArray = <T extends Vector2Like = Vector2>(
		arr: Vector2Like,
		index = 0,
		out: T = new Vector2() as T,
	): T => {
		out[0] = arr[index];
		out[1] = arr[index + 1];

		return out;
	};

	public static fromJson = <T extends Vector2Like = Vector2>(j: IVector2Json, out: T = new Vector2() as T): T => {
		out[0] = j.x;
		out[1] = j.y;

		return out;
	};

	public static fromPolar = <T extends Vector2Like = Vector2>(p: IPolar, out: T = new Vector2() as T): T => {
		out[0] = Math.cos(p.a) * p.r;
		out[1] = Math.sin(p.a) * p.r;

		return out;
	};

	public static fromPointerEvent = <T extends Vector2Like = Vector2>(
		e: PointerEvent,
		out: T = new Vector2() as T,
	): T => {
		if (e.target) {
			out[0] = (e.clientX / (e.target as HTMLElement).offsetWidth) * 2 - 1;
			out[1] = 1 - (e.clientY / (e.target as HTMLElement).offsetHeight) * 2;
		}

		return out;
	};

	public static fromScalar = <T extends Vector2Like = Vector2>(value = 0, out: T = new Vector2() as T): T => {
		out[0] = out[1] = value;

		return out;
	};

	public static fromXY = <T extends Vector2Like = Vector2>(x: number, y: number, out: T = new Vector2() as T): T => {
		out[0] = x;
		out[1] = y;

		return out;
	};

	public static inverse = <T extends Vector2Like = Vector2>(a: Vector2Like, out: T = new Vector2() as T): T => {
		out[0] = 1 / a[0] || 0;
		out[1] = 1 / a[1] || 0;

		return out;
	};

	public static norm = (a: Vector2Like): number => {
		return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
	};

	public static lengthManhattan = (a: Vector2Like): number => {
		return Math.abs(a[0]) + Math.abs(a[1]);
	};

	public static lengthSquared = (a: Vector2Like): number => {
		return a[0] * a[0] + a[1] * a[1];
	};

	public static lerp = <T extends Vector2Like = Vector2>(
		a: Vector2Like,
		b: Vector2Like,
		alpha: number,
		out: T = new Vector2() as T,
	): T => {
		out[0] = (b[0] - a[0]) * alpha + a[0];
		out[1] = (b[1] - a[1]) * alpha + a[1];

		return out;
	};

	public static max = <T extends Vector2Like = Vector2>(
		a: Vector2Like,
		b: Vector2Like,
		out: T = new Vector2() as T,
	): T => {
		out[0] = Math.max(a[0], b[0]);
		out[1] = Math.max(a[1], b[1]);

		return out;
	};

	public static min = <T extends Vector2Like = Vector2>(
		a: Vector2Like,
		b: Vector2Like,
		out: T = new Vector2() as T,
	): T => {
		out[0] = Math.min(a[0], b[0]);
		out[1] = Math.min(a[1], b[1]);

		return out;
	};

	public static minus = <T extends Vector2Like = Vector2>(
		a: Vector2Like,
		b: Vector2Like,
		out: T = new Vector2() as T,
	): T => {
		out[0] = a[0] - b[0];
		out[1] = a[1] - b[1];

		return out;
	};

	public static minusScalar = <T extends Vector2Like = Vector2>(
		a: Vector2Like,
		num: number,
		out: T = new Vector2() as T,
	): T => {
		out[0] = a[0] - num;
		out[1] = a[1] - num;

		return out;
	};

	public static multiply = <T extends Vector2Like = Vector2>(
		a: Vector2Like,
		b: Vector2Like,
		out: T = new Vector2() as T,
	): T => {
		out[0] = a[0] * b[0];
		out[1] = a[1] * b[1];

		return out;
	};

	public static multiplyScalar = <T extends Vector2Like = Vector2>(
		a: Vector2Like,
		scalar: number,
		out: T = new Vector2() as T,
	): T => {
		out[0] = a[0] * scalar;
		out[1] = a[1] * scalar;

		return out;
	};

	public static negate = <T extends Vector2Like = Vector2>(a: Vector2Like, out: T = new Vector2() as T): T => {
		out[0] = -a[0];
		out[1] = -a[1];

		return out;
	};

	public static normalize = <T extends Vector2Like = Vector2>(a: Vector2Like, out: T = new Vector2() as T): T => {
		return Vector2.divideScalar(a, Vector2.norm(a) || 1, out);
	};

	public static opposite = <T extends Vector2Like = Vector2>(
		a: Vector2Like,
		center: Vector2Like,
		out: T = new Vector2() as T,
	): T => {
		x = center[0];
		y = center[1];
		out[0] = x + x - a[0];
		out[1] = y + y - a[1];

		return out;
	};

	public static random = <T extends Vector2Like = Vector2>(norm = 1, out: T = new Vector2() as T): T => {
		x = Math.random() * DEG_360_RAD;
		out[0] = Math.cos(x) * norm;
		out[1] = Math.sin(x) * norm;

		return out;
	};

	public static reflect = <T extends Vector2Like = Vector2>(
		origin: Vector2Like,
		normal: Vector2Like,
		out: T = new Vector2() as T,
	): T => {
		Vector2.multiplyScalar(normal, 2 * Vector2.dot(origin, normal), out);

		return Vector2.minus(origin, out, out);
	};

	public static rotate = <T extends Vector2Like = Vector2>(
		a: Vector2Like,
		angle: number,
		center: Vector2Like = Vector2.VECTOR2_ZERO,
		out: T = new Vector2() as T,
	): T => {
		c = Math.cos(angle);
		s = Math.sin(angle);

		x = a[0] - center[0];
		y = a[1] - center[1];

		out[0] = x * c - y * s + center[0];
		out[1] = x * s + y * c + center[1];

		return out;
	};

	public static round = <T extends Vector2Like = Vector2>(a: Vector2Like, out: T = new Vector2() as T): T => {
		out[0] = Math.round(a[0]);
		out[1] = Math.round(a[1]);

		return out;
	};

	public static setNorm = <T extends Vector2Like = Vector2>(
		a: Vector2Like,
		norm: number,
		out: T = new Vector2(2) as T,
	): T => {
		Vector2.normalize(a, out);
		return Vector2.multiplyScalar(out, norm, out);
	};

	public static toArray = (a: Vector2Like, arr: number[] = []): number[] => {
		arr[0] = a[0];
		arr[1] = a[1];

		return arr;
	};

	public static toPalorJson = (a: Vector2Like, p = { a: 0, r: 0 }): IPolar => {
		p.r = Vector2.norm(a);
		p.a = Vector2.angle(a);

		return p;
	};

	public static toString = (a: Vector2Like): string => {
		return `(${a[0]}, ${a[1]})`;
	};

	public static transformDirection = <T extends Vector2Like = Vector2>(
		a: Vector2Like,
		m: Matrix3Like,
		out: T = new Vector2() as T,
	): T => {
		x = a[0];
		y = a[1];

		out[0] = m[0] * x + m[3] * y;
		out[1] = m[1] * x + m[4] * y;

		return Vector2.normalize(out, out);
	};

	public static transformMatrix3 = <T extends Vector2Like = Vector2>(
		a: Vector2Like,
		m: Float32Array | number[],
		out: T = new Vector2() as T,
	): T => {
		x = a[0];
		y = a[1];
		out[0] = m[0] * x + m[3] * y + m[6];
		out[1] = m[1] * x + m[4] * y + m[7];

		return out;
	};

	public readonly dataType = ArraybufferDataType.VECTOR2;
	public constructor(x = 0, y = 0) {
		super(2);
		this[0] = x;
		this[1] = y;
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
}
