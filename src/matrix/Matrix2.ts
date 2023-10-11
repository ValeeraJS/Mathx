import { closeTo } from "../common/closeTo";
import { Vector2Like } from "./../vector/Vector2";

let a00 = 0;
let a01 = 0;
let a10 = 0;
let a11 = 0;
let b00 = 0;
let b01 = 0;
let b10 = 0;
let b11 = 0;
let det = 0;
let x = 0;
let y = 0;

const UNIT_MATRIX2_DATA = [1, 0, 0, 1];

export type Matrix2Like = Matrix2 | Float32Array | number[];

export class Matrix2 extends Float32Array {
	public static readonly UNIT_MATRIX2 = new Matrix2([1, 0, 0, 1]);
	public static add = <T extends Matrix2Like>(a: Matrix2Like, b: Matrix2Like, out: T = new Matrix2() as T): T => {
		out[0] = a[0] + b[0];
		out[1] = a[1] + b[1];
		out[2] = a[2] + b[2];
		out[3] = a[3] + b[3];

		return out;
	};

	public static adjoint = <T extends Matrix2Like>(a: Matrix2Like, out: T = new Matrix2() as T): T => {
		a00 = a[0];
		out[0] = a[3];
		out[1] = -a[1];
		out[2] = -a[2];
		out[3] = a00;

		return out;
	};

	public static clone = <T extends Matrix2Like>(source: Matrix2Like, out: T = new Matrix2() as T): T => {
		out[0] = source[0];
		out[1] = source[1];
		out[2] = source[2];
		out[3] = source[3];

		return out;
	};

	public static closeTo = (a: Matrix2Like, b: Matrix2Like): boolean => {
		a00 = a[0];
		a10 = a[1];
		a01 = a[2];
		a11 = a[3];
		b00 = b[0];
		b10 = b[1];
		b01 = b[2];
		b11 = b[3];

		return closeTo(a00, b00) && closeTo(a01, b01) && closeTo(a10, b10) && closeTo(a11, b11);
	};

	public static create = (a: Matrix2Like = UNIT_MATRIX2_DATA): Matrix2 => {
		return new Matrix2(a);
	};

	public static determinant = (a: Matrix2Like): number => {
		return a[0] * a[3] - a[1] * a[2];
	};

	public static equals = (a: Matrix2Like, b: Matrix2Like): boolean => {
		return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
	};

	public static frobNorm = (a: Matrix2Like): number => {
		return Math.hypot(a[0], a[1], a[2], a[3]);
	};

	public static fromArray = <T extends Matrix2Like>(source: Matrix2Like, out: T = new Matrix2() as T): T => {
		out[0] = source[0];
		out[1] = source[1];
		out[2] = source[2];
		out[3] = source[3];

		return out;
	};

	public static fromRotation = <T extends Matrix2Like>(rad: number, out: T = new Matrix2() as T): T => {
		y = Math.sin(rad);
		x = Math.cos(rad);
		out[0] = x;
		out[1] = y;
		out[2] = -y;
		out[3] = x;

		return out;
	};

	public static fromScaling = <T extends Matrix2Like>(v: Vector2Like, out: T = new Matrix2() as T): T => {
		out[0] = v[0];
		out[1] = 0;
		out[2] = 0;
		out[3] = v[1];

		return out;
	};

	public static identity = <T extends Matrix2Like>(out: T = new Matrix2() as T): T => {
		out[0] = 1;
		out[1] = 0;
		out[2] = 0;
		out[3] = 1;

		return out;
	};

	public static invert = <T extends Matrix2Like>(a: Matrix2Like, out: T = new Matrix2() as T): T | null => {
		a00 = a[0];
		a10 = a[1];
		a01 = a[2];
		a11 = a[3];

		det = Matrix2.determinant(a);

		if (!det) {
			return null;
		}

		det = 1.0 / det;

		out[0] = a11 * det;
		out[1] = -a10 * det;
		out[2] = -a01 * det;
		out[3] = a00 * det;

		return out;
	};

	public static lerp = <T extends Matrix2Like>(
		a: Matrix2Like,
		b: Matrix2Like,
		alpha: number,
		out: T = new Matrix2() as T,
	): T => {
		out[0] = (b[0] - a[0]) * alpha + a[0];
		out[1] = (b[1] - a[1]) * alpha + a[1];
		out[2] = (b[2] - a[2]) * alpha + a[2];
		out[3] = (b[3] - a[3]) * alpha + a[3];
		return out;
	};

	public static minus = <T extends Matrix2Like>(a: Matrix2Like, b: Matrix2Like, out: T = new Matrix2() as T): T => {
		out[0] = a[0] - b[0];
		out[1] = a[1] - b[1];
		out[2] = a[2] - b[2];
		out[3] = a[3] - b[3];

		return out;
	};

	public static multiply = <T extends Matrix2Like>(
		a: Matrix2Like,
		b: Matrix2Like,
		out: T = new Matrix2() as T,
	): T => {
		a00 = a[0];
		a10 = a[1];
		a01 = a[2];
		a11 = a[3];
		b00 = b[0];
		b10 = b[1];
		b01 = b[2];
		b11 = b[3];
		out[0] = a00 * b00 + a01 * b10;
		out[1] = a10 * b00 + a11 * b10;
		out[2] = a00 * b01 + a01 * b11;
		out[3] = a10 * b01 + a11 * b11;

		return out;
	};

	public static multiplyScalar = <T extends Matrix2Like>(
		a: Matrix2Like,
		b: number,
		out: T = new Matrix2() as T,
	): T => {
		out[0] = a[0] * b;
		out[1] = a[1] * b;
		out[2] = a[2] * b;
		out[3] = a[3] * b;

		return out;
	};

	public static rotate = <T extends Matrix2Like>(a: Matrix2Like, rad: number, out: T = new Matrix2() as T): T => {
		a00 = a[0];
		a10 = a[1];
		a01 = a[2];
		a11 = a[3];
		y = Math.sin(rad);
		x = Math.cos(rad);
		out[0] = a00 * x + a01 * y;
		out[1] = a10 * x + a11 * y;
		out[2] = a00 * -y + a01 * x;
		out[3] = a10 * -y + a11 * x;

		return out;
	};

	public static scale = <T extends Matrix2Like>(a: Matrix2Like, v: Vector2Like, out: T = new Matrix2() as T): T => {
		a00 = a[0];
		a10 = a[1];
		a01 = a[2];
		a11 = a[3];
		x = v[0];
		y = v[1];
		out[0] = a00 * x;
		out[1] = a10 * x;
		out[2] = a01 * y;
		out[3] = a11 * y;

		return out;
	};

	public static toString = (a: Matrix2Like): string => {
		return `mat2(${a[0]}, ${a[1]}, ${a[2]}, ${a[3]})`;
	};

	public static transpose = <T extends Matrix2Like>(a: Matrix2Like, out: T = new Matrix2() as T): T => {
		if (out === a) {
			a01 = a[1];
			out[1] = a[2];
			out[2] = a01;
		} else {
			out[0] = a[0];
			out[1] = a[2];
			out[2] = a[1];
			out[3] = a[3];
		}

		return out;
	};

	public constructor(data: Matrix2Like = UNIT_MATRIX2_DATA) {
		super(data);
	}
}
