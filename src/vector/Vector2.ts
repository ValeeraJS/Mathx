import { DEG_360_RAD, EPSILON } from "../constants";
import clampCommon from "../common/clamp";
import clampSafeCommon from "../common/clampSafe";
import closeToCommon from "../common/closeTo";
import floorToZeroCommon from "../common/floorToZero";
import { IPairs2Float32 } from "../common/interfaces/IPairs2";
import { IPolar } from "../polar";
import ArraybufferDataType from "../ArraybufferDataType";

let x = 0,
	y = 0,
	c = 0,
	s = 0;

export interface IVector2Json {
	x: number;
	y: number;
}

export interface IVector2 extends IPairs2Float32, IVector2Json {}

export default class Vector2 extends Float32Array implements IVector2 {
	public static readonly VECTOR2_ZERO = new Float32Array([0, 0]);
	public static readonly VECTOR2_TOP = new Float32Array([0, 1]);
	public static readonly VECTOR2_BOTTOM = new Float32Array([0, -1]);
	public static readonly VECTOR2_LEFT = new Float32Array([-1, 0]);
	public static readonly VECTOR2_RIGHT = new Float32Array([1, 0]);

	public static add = (
		a: Float32Array | number[] | IVector2,
		b: Float32Array | number[] | IVector2,
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = a[0] + b[0];
		out[1] = a[1] + b[1];

		return out;
	};

	public static addScalar = (
		a: Float32Array | number[],
		b: number,
		out: IVector2 = new Vector2(2)
	): IVector2 => {
		out[0] = a[0] + b;
		out[1] = a[1] + b;

		return out;
	};

	public static angle = (a: Float32Array | number[] | IVector2): number => {
		return Math.atan2(a[1], a[0]);
	};

	public static ceil = (
		a: Float32Array | number[] | IVector2,
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = Math.ceil(a[0]);
		out[1] = Math.ceil(a[1]);

		return out;
	};

	public static clamp = (
		a: Float32Array | number[] | IVector2,
		min: Float32Array | number[] | IVector2,
		max: Float32Array | number[] | IVector2,
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = clampCommon(a[0], min[0], max[0]);
		out[1] = clampCommon(a[1], min[1], max[1]);

		return out;
	};

	public static clampSafe = (
		a: Float32Array | number[] | IVector2,
		min: Float32Array | number[] | IVector2,
		max: Float32Array | number[] | IVector2,
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = clampSafeCommon(a[0], min[0], max[0]);
		out[1] = clampSafeCommon(a[1], min[1], max[1]);

		return out;
	};

	public static clampLength = (
		a: Float32Array | number[] | IVector2,
		min: Float32Array | number[] | IVector2,
		max: Float32Array | number[] | IVector2,
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = clampSafeCommon(a[0], min[0], max[0]);
		out[1] = clampSafeCommon(a[1], min[1], max[1]);

		return out;
	};

	public static clampScalar = (
		a: Float32Array | number[] | IVector2,
		min: number,
		max: number,
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = clampCommon(a[0], min, max);
		out[1] = clampCommon(a[1], min, max);

		return out;
	};

	public static closeTo = (
		a: Float32Array | number[] | IVector2,
		b: Float32Array | number[] | IVector2,
		epsilon = EPSILON
	): boolean => {
		return Vector2.distanceTo(a, b) <= epsilon;
	};

	public static closeToRect = (
		a: Float32Array | number[] | IVector2,
		b: Float32Array | number[] | IVector2,
		epsilon = EPSILON
	): boolean => {
		return closeToCommon(a[0], b[0], epsilon) && closeToCommon(a[1], b[1], epsilon);
	};

	public static closeToManhattan = (
		a: Float32Array | IVector2 | number[],
		b: Float32Array | IVector2 | number[],
		epsilon = EPSILON
	): boolean => {
		return Vector2.distanceToManhattan(a, b) <= epsilon;
	};

	public static clone = (
		a: Float32Array | number[] | IVector2,
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = a[0];
		out[1] = a[1];

		return out;
	};

	public static cross = (
		a: Float32Array | number[] | IVector2,
		b: Float32Array | number[] | IVector2
	): number => {
		return a[0] * b[1] - a[1] * b[0];
	};

	public static create = (x = 0, y = 0, out: IVector2 = new Vector2()): IVector2 => {
		out[0] = x;
		out[1] = y;

		return out;
	};

	public static distanceTo = (
		a: Float32Array | number[] | IVector2,
		b: Float32Array | number[] | IVector2
	): number => {
		x = b[0] - a[0];
		y = b[1] - a[1];

		return Math.hypot(x, y);
	};

	public static distanceToManhattan = (
		a: Float32Array | number[] | IVector2,
		b: Float32Array | number[] | IVector2
	): number => {
		return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
	};

	public static distanceToSquared = (
		a: Float32Array | number[] | IVector2,
		b: Float32Array | number[] | IVector2
	): number => {
		x = a[0] - b[0];
		y = a[1] - b[1];

		return x * x + y * y;
	};

	public static divide = (
		a: Float32Array | number[] | IVector2,
		b: Float32Array | number[] | IVector2,
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = a[0] / b[0];
		out[1] = a[1] / b[1];

		return out;
	};

	public static divideScalar = (
		a: Float32Array | number[] | IVector2,
		scalar: number,
		out: IVector2 = new Vector2()
	): IVector2 => {
		return Vector2.multiplyScalar(a, 1 / scalar, out);
	};

	public static dot = (
		a: Float32Array | number[] | IVector2,
		b: Float32Array | number[] | IVector2
	): number => {
		return a[0] * b[0] + a[1] * b[1];
	};

	public static equals = (
		a: Float32Array | number[] | IVector2,
		b: Float32Array | number[] | IVector2
	): boolean => {
		return a[0] === b[0] && a[1] === b[1];
	};

	public static floor = (
		a: Float32Array | number[] | IVector2,
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = Math.floor(a[0]);
		out[1] = Math.floor(a[1]);

		return out;
	};

	public static floorToZero = (
		a: Float32Array | number[] | IVector2,
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = floorToZeroCommon(a[0]);
		out[1] = floorToZeroCommon(a[1]);

		return out;
	};

	public static fromArray = (
		arr: IVector2 | number[] | Float32Array,
		index = 0,
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = arr[index];
		out[1] = arr[index + 1];

		return out;
	};

	public static fromJson = (
		j: { x: number; y: number },
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = j.x;
		out[1] = j.y;

		return out;
	};

	public static fromPolar = (p: IPolar, out: IVector2 = new Vector2()): IVector2 => {
		out[0] = Math.cos(p.a) * p.r;
		out[1] = Math.sin(p.a) * p.r;

		return out;
	};

	public static fromScalar = (value = 0, out: IVector2 = new Vector2()): IVector2 => {
		out[0] = out[1] = value;

		return out;
	};

	public static inverse = (
		a: Float32Array | number[] | IVector2,
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = 1 / a[0] || 0;
		out[1] = 1 / a[1] || 0;

		return out;
	};

	public static norm = (a: Float32Array | number[] | IVector2): number => {
		return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
	};

	public static lengthManhattan = (a: Float32Array | number[] | IVector2): number => {
		return Math.abs(a[0]) + Math.abs(a[1]);
	};

	public static lengthSquared = (a: Float32Array | number[] | IVector2): number => {
		return a[0] * a[0] + a[1] * a[1];
	};

	public static lerp = (
		a: Float32Array | number[] | IVector2,
		b: Float32Array | number[] | IVector2,
		alpha: number,
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = (b[0] - a[0]) * alpha + a[0];
		out[1] = (b[1] - a[1]) * alpha + a[1];

		return out;
	};

	public static max = (
		a: Float32Array | number[] | IVector2,
		b: Float32Array | number[] | IVector2,
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = Math.max(a[0], b[0]);
		out[1] = Math.max(a[1], b[1]);

		return out;
	};

	public static min = (
		a: Float32Array | number[] | IVector2,
		b: Float32Array | number[] | IVector2,
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = Math.min(a[0], b[0]);
		out[1] = Math.min(a[1], b[1]);

		return out;
	};

	public static minus = (
		a: Float32Array | number[] | IVector2,
		b: Float32Array | number[] | IVector2,
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = a[0] - b[0];
		out[1] = a[1] - b[0];

		return out;
	};

	public static minusScalar = (
		a: Float32Array | number[] | IVector2,
		num: number,
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = a[0] - num;
		out[1] = a[1] - num;

		return out;
	};

	public static multiply = (
		a: Float32Array | number[] | IVector2,
		b: Float32Array | number[] | IVector2,
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = a[0] * b[0];
		out[1] = a[1] * b[1];

		return out;
	};

	public static multiplyScalar = (
		a: Float32Array | number[] | IVector2,
		scalar: number,
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = a[0] * scalar;
		out[1] = a[1] * scalar;

		return out;
	};

	public static negate = (
		a: Float32Array | number[] | IVector2,
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = -a[0];
		out[1] = -a[1];

		return out;
	};

	public static normalize = (
		a: Float32Array | number[] | IVector2,
		out: IVector2 = new Vector2()
	): IVector2 => {
		return Vector2.divideScalar(a, Vector2.norm(a) || 1, out);
	};

	public static random = (norm = 1, out: IVector2 = new Vector2()): IVector2 => {
		x = Math.random() * DEG_360_RAD;
		out[0] = Math.cos(x) * norm;
		out[1] = Math.sin(x) * norm;

		return out;
	};

	public static rotate = (
		a: Float32Array | number[] | IVector2,
		angle: number,
		center: Float32Array | number[] | IVector2 = Vector2.VECTOR2_ZERO,
		out: IVector2 = new Vector2(2)
	): IVector2 => {
		c = Math.cos(angle);
		s = Math.sin(angle);

		x = a[0] - center[0];
		y = a[1] - center[1];

		out[0] = x * c - y * s + center[0];
		out[1] = x * s + y * c + center[1];

		return out;
	};

	public static round = (
		a: Float32Array | number[] | IVector2,
		out: IVector2 = new Vector2()
	): IVector2 => {
		out[0] = Math.round(a[0]);
		out[1] = Math.round(a[1]);

		return out;
	};

	public static set = (x = 0, y = 0, out: IVector2 = new Vector2()): IVector2 => {
		out[0] = x;
		out[1] = y;

		return out;
	};

	public static setLength = (
		a: Float32Array | number[] | IVector2,
		length: number,
		out: IVector2 = new Vector2(2)
	): IVector2 => {
		Vector2.normalize(a, out);
		Vector2.multiplyScalar(out, length, out);

		return out;
	};

	public static toArray = (
		a: Float32Array | number[] | IVector2,
		arr: number[] = []
	): number[] => {
		arr[0] = a[0];
		arr[1] = a[1];

		return arr;
	};

	public static toPalorJson = (
		a: Float32Array | number[] | IVector2,
		p = { a: 0, r: 0 }
	): IPolar => {
		p.r = Vector2.norm(a);
		p.a = Vector2.angle(a);

		return p;
	};

	public static toString = (a: Float32Array | number[] | IVector2): string => {
		return `(${a[0]}, ${a[1]})`;
	};

	public static transformMatrix3 = (
		a: Float32Array | number[] | IVector2,
		m: Float32Array | number[],
		out: Vector2
	): Vector2 => {
		x = a[0];
		y = a[1];
		out[0] = m[0] * x + m[3] * y + m[6];
		out[1] = m[1] * x + m[4] * y + m[7];

		return out;
	};

	public readonly length!: 2;
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
