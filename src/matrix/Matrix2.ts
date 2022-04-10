import closeToCommon from "../common/closeTo";
import { IVector2 } from "./../vector/Vector2";

let a00 = 0,
	a01 = 0,
	a10 = 0,
	a11 = 0;
let b00 = 0,
	b01 = 0,
	b10 = 0,
	b11 = 0,
	det = 0;
let x = 0,
	y = 0;

const UNIT_MATRIX2_DATA = [1, 0, 0, 1];

export default class Matrix2 extends Float32Array {
	public static readonly UNIT_MATRIX2 = new Matrix2(UNIT_MATRIX2_DATA);
	public static add = (
		a: Float32Array | number[] | Matrix2,
		b: Float32Array | number[] | Matrix2,
		out: Matrix2
	): Matrix2 => {
		out[0] = a[0] + b[0];
		out[1] = a[1] + b[1];
		out[2] = a[2] + b[2];
		out[3] = a[3] + b[3];

		return out;
	};

	public static adjoint = (a: Float32Array | number[] | Matrix2, out: Matrix2): Matrix2 => {
		a00 = a[0];
		out[0] = a[3];
		out[1] = -a[1];
		out[2] = -a[2];
		out[3] = a00;

		return out;
	};

	public static closeTo = (
		a: Float32Array | number[] | Matrix2,
		b: Float32Array | number[] | Matrix2
	): boolean => {
		a00 = a[0];
		a10 = a[1];
		a01 = a[2];
		a11 = a[3];
		b00 = b[0];
		b10 = b[1];
		b01 = b[2];
		b11 = b[3];

		return (
			closeToCommon(a00, b00) &&
			closeToCommon(a01, b01) &&
			closeToCommon(a10, b10) &&
			closeToCommon(a11, b11)
		);
	};

	public static create = (a = UNIT_MATRIX2_DATA): Matrix2 => {
		return new Matrix2(a);
	};

	public static determinant = (a: Float32Array | number[] | Matrix2): number => {
		return a[0] * a[3] - a[1] * a[2];
	};

	public static equals = (
		a: Float32Array | number[] | Matrix2,
		b: Float32Array | number[] | Matrix2
	): boolean => {
		return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
	};

	public static frobNorm = (a: Float32Array | number[] | Matrix2): number => {
		return Math.hypot(a[0], a[1], a[2], a[3]);
	};

	public static fromRotation = (rad: number, out: Matrix2 = new Matrix2()): Matrix2 => {
		y = Math.sin(rad);
		x = Math.cos(rad);
		out[0] = x;
		out[1] = y;
		out[2] = -y;
		out[3] = x;

		return out;
	};

	public static fromScaling = (
		v: Float32Array | IVector2 | number[],
		out: Matrix2 = new Matrix2()
	): Matrix2 => {
		out[0] = v[0];
		out[1] = 0;
		out[2] = 0;
		out[3] = v[1];

		return out;
	};

	public static identity = (out: Matrix2 = new Matrix2()): Float32Array => {
		out[0] = 1;
		out[1] = 0;
		out[2] = 0;
		out[3] = 1;

		return out;
	};

	public static invert = (
		a: Float32Array | Matrix2 | number[],
		out: Matrix2 = new Matrix2()
	): Matrix2 | null => {
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

	public static minus = (
		a: Float32Array | Matrix2 | number[],
		b: Float32Array | Matrix2 | number[],
		out: Matrix2 = new Matrix2()
	): Float32Array => {
		out[0] = a[0] - b[0];
		out[1] = a[1] - b[1];
		out[2] = a[2] - b[2];
		out[3] = a[3] - b[3];

		return out;
	};

	public static multiply = (
		a: Float32Array | Matrix2 | number[],
		b: Float32Array | Matrix2 | number[],
		out: Matrix2 = new Matrix2()
	): Float32Array => {
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

	public static multiplyScalar = (
		a: Float32Array | Matrix2 | number[],
		b: number,
		out: Matrix2 = new Matrix2()
	): Float32Array => {
		out[0] = a[0] * b;
		out[1] = a[1] * b;
		out[2] = a[2] * b;
		out[3] = a[3] * b;

		return out;
	};

	public static rotate = (
		a: Float32Array | Matrix2 | number[],
		rad: number,
		out: Matrix2 = new Matrix2()
	): Float32Array => {
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

	public static scale = (
		a: Float32Array | Matrix2 | number[],
		v: Float32Array | IVector2 | number[],
		out: Matrix2 = new Matrix2()
	): Float32Array => {
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

	public static toString = (a: Float32Array | Matrix2 | number[]): string => {
		return `mat2(${a[0]}, ${a[1]}, ${a[2]}, ${a[3]})`;
	};

	public static transpose = (
		a: Float32Array | Matrix2 | number[],
		out: Matrix2 = new Matrix2()
	): Float32Array => {
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

	public constructor(data: number[] | Float32Array | Matrix2 = UNIT_MATRIX2_DATA) {
		super(data);
	}
}
