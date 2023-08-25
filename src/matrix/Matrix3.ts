import { Vector2Like } from "../vector/Vector2";
import { Matrix2Like } from "./Matrix2";

let a00 = 0;
let a01 = 0;
let a02 = 0;
let a11 = 0;
let a10 = 0;
let a12 = 0;
let a20 = 0;
let a21 = 0;
let a22 = 0;
let b00 = 0;
let b01 = 0;
let b02 = 0;
let b11 = 0;
let b10 = 0;
let b12 = 0;
let b20 = 0;
let b21 = 0;
let b22 = 0;
let x = 0;
let y = 0;

export const UNIT_MATRIX3_DATA = [1, 0, 0, 0, 1, 0, 0, 0, 1];
export type Matrix3Like = Matrix3 | number[] | Float32Array;

export class Matrix3 extends Float32Array {
	public static readonly UNIT_MATRIX3 = new Matrix3(UNIT_MATRIX3_DATA);

	public static clone = (source: Matrix3Like): Matrix3 => {
		return new Matrix3(source);
	};

	public static cofactor00 = (a: Matrix3Like): number => {
		return a[4] * a[8] - a[5] * a[7];
	};

	public static cofactor01 = (a: Matrix3Like): number => {
		return a[1] * a[8] - a[7] * a[2];
	};

	public static cofactor02 = (a: Matrix3Like): number => {
		return a[1] * a[5] - a[4] * a[2];
	};

	public static cofactor10 = (a: Matrix3Like): number => {
		return a[3] * a[8] - a[6] * a[5];
	};

	public static cofactor11 = (a: Matrix3Like): number => {
		return a[0] * a[8] - a[6] * a[2];
	};

	public static cofactor12 = (a: Matrix3Like): number => {
		return a[0] * a[5] - a[3] * a[2];
	};

	public static cofactor20 = (a: Matrix3Like): number => {
		return a[3] * a[7] - a[6] * a[4];
	};

	public static cofactor21 = (a: Matrix3Like): number => {
		return a[0] * a[7] - a[6] * a[1];
	};

	public static cofactor22 = (a: Matrix3Like): number => {
		return a[0] * a[4] - a[3] * a[1];
	};

	public static create = (): Matrix3 => {
		return new Matrix3(UNIT_MATRIX3_DATA);
	};

	public static determinant = (a: Matrix3Like): number => {
		a00 = a[0];
		a01 = a[1];
		a02 = a[2];
		a10 = a[3];
		a11 = a[4];
		a12 = a[5];
		a20 = a[6];
		a21 = a[7];
		a22 = a[8];

		return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
	};

	public static fromArray = <T extends Matrix2Like>(source: Matrix3Like, out: T = new Matrix3() as T): T => {
		out[0] = source[0];
		out[1] = source[1];
		out[2] = source[2];
		out[3] = source[3];
		out[4] = source[4];
		out[5] = source[5];
		out[6] = source[6];
		out[7] = source[7];
		out[8] = source[8];

		return out;
	};

	public static fromMatrix2 = <T extends Matrix2Like>(mat4: Matrix2Like, out: T = new Matrix3() as T): T => {
		out[0] = mat4[0];
		out[1] = mat4[1];
		out[2] = 0;

		out[3] = mat4[2];
		out[4] = mat4[3];
		out[5] = 0;

		out[6] = 0;
		out[7] = 0;
		out[8] = 1;

		return out;
	};

	public static fromMatrix4 = <T extends Matrix2Like>(mat4: Matrix3Like, out: T = new Matrix3() as T): T => {
		out[0] = mat4[0];
		out[1] = mat4[1];
		out[2] = mat4[2];

		out[3] = mat4[4];
		out[4] = mat4[5];
		out[5] = mat4[6];

		out[6] = mat4[8];
		out[7] = mat4[9];
		out[8] = mat4[10];

		return out;
	};

	public static fromRotation = <T extends Matrix2Like>(rad: number, out: T = new Matrix3() as T): T => {
		y = Math.sin(rad);
		x = Math.cos(rad);

		out[0] = x;
		out[1] = y;
		out[2] = 0;

		out[3] = -y;
		out[4] = x;
		out[5] = 0;

		out[6] = 0;
		out[7] = 0;
		out[8] = 1;

		return out;
	};

	public static fromScaling = <T extends Matrix2Like>(v: Vector2Like, out: T = new Matrix3() as T): T => {
		out[0] = v[0];
		out[1] = 0;
		out[2] = 0;

		out[3] = 0;
		out[4] = v[1];
		out[5] = 0;

		out[6] = 0;
		out[7] = 0;
		out[8] = 1;

		return out;
	};

	public static fromSkew = <T extends Matrix2Like>(v: Vector2Like, out: T = new Matrix3() as T): T => {
		out[0] = 1;
		out[1] = v[1];
		out[2] = 0;

		out[3] = v[0];
		out[4] = 1;
		out[5] = 0;

		out[6] = 0;
		out[7] = 0;
		out[8] = 1;

		return out;
	};

	public static fromTranslation = <T extends Matrix2Like>(v: Vector2Like, out: T = new Matrix3() as T): T => {
		out[0] = 1;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 1;
		out[5] = 0;
		out[6] = v[0];
		out[7] = v[1];
		out[8] = 1;

		return out;
	};

	public static identity = <T extends Matrix2Like>(out: T = new Matrix3() as T): T => {
		out[0] = 1;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 1;
		out[5] = 0;
		out[6] = 0;
		out[7] = 0;
		out[8] = 1;

		return out;
	};

	public static invert = <T extends Matrix2Like>(a: Matrix3Like, out: T = new Matrix3() as T): T | null => {
		a00 = a[0];
		a01 = a[1];
		a02 = a[2];
		a10 = a[3];
		a11 = a[4];
		a12 = a[5];
		a20 = a[6];
		a21 = a[7];
		a22 = a[8];

		b01 = a22 * a11 - a12 * a21;
		b11 = -a22 * a10 + a12 * a20;
		b21 = a21 * a10 - a11 * a20;

		let det = a00 * b01 + a01 * b11 + a02 * b21;

		if (!det) {
			return null;
		}

		det = 1.0 / det;

		out[0] = b01 * det;
		out[1] = (-a22 * a01 + a02 * a21) * det;
		out[2] = (a12 * a01 - a02 * a11) * det;
		out[3] = b11 * det;
		out[4] = (a22 * a00 - a02 * a20) * det;
		out[5] = (-a12 * a00 + a02 * a10) * det;
		out[6] = b21 * det;
		out[7] = (-a21 * a00 + a01 * a20) * det;
		out[8] = (a11 * a00 - a01 * a10) * det;

		return out;
	};

	public static multiply = <T extends Matrix2Like>(
		a: Matrix3Like,
		b: Matrix3Like,
		out: T = new Matrix3() as T,
	): T => {
		a00 = a[0];
		a01 = a[1];
		a02 = a[2];
		a10 = a[3];
		a11 = a[4];
		a12 = a[5];
		a20 = a[6];
		a21 = a[7];
		a22 = a[8];

		b00 = b[0];
		b01 = b[1];
		b02 = b[2];
		b10 = b[3];
		b11 = b[4];
		b12 = b[5];
		b20 = b[6];
		b21 = b[7];
		b22 = b[8];

		out[0] = b00 * a00 + b01 * a10 + b02 * a20;
		out[1] = b00 * a01 + b01 * a11 + b02 * a21;
		out[2] = b00 * a02 + b01 * a12 + b02 * a22;

		out[3] = b10 * a00 + b11 * a10 + b12 * a20;
		out[4] = b10 * a01 + b11 * a11 + b12 * a21;
		out[5] = b10 * a02 + b11 * a12 + b12 * a22;

		out[6] = b20 * a00 + b21 * a10 + b22 * a20;
		out[7] = b20 * a01 + b21 * a11 + b22 * a21;
		out[8] = b20 * a02 + b21 * a12 + b22 * a22;

		return out;
	};

	public static multiplyRotationMatrix = (a: Matrix3Like, b: Matrix3Like, out: Matrix3 = new Matrix3()): Matrix3 => {
		a00 = a[0];
		a01 = a[1];
		a02 = a[2];
		a10 = a[3];
		a11 = a[4];
		a12 = a[5];
		a20 = a[6];
		a21 = a[7];
		a22 = a[8];

		b00 = b[0];
		b01 = b[1];
		b10 = b[3];
		b11 = b[4];

		out[0] = b00 * a00 + b01 * a10;
		out[1] = b00 * a01 + b01 * a11;
		out[2] = b00 * a02 + b01 * a12;

		out[3] = b10 * a00 + b11 * a10;
		out[4] = b10 * a01 + b11 * a11;
		out[5] = b10 * a02 + b11 * a12;

		out[6] = a20;
		out[7] = a21;
		out[8] = a22;

		return out;
	};

	public static multiplyScaleMatrix = <T extends Matrix2Like>(
		a: Matrix3Like,
		b: Matrix3Like,
		out: T = new Matrix3() as T,
	): T => {
		a00 = a[0];
		a01 = a[1];
		a02 = a[2];
		a10 = a[3];
		a11 = a[4];
		a12 = a[5];
		a20 = a[6];
		a21 = a[7];
		a22 = a[8];

		b00 = b[0];
		b11 = b[4];

		out[0] = b00 * a00;
		out[1] = b00 * a01;
		out[2] = b00 * a02;

		out[3] = b11 * a10;
		out[4] = b11 * a11;
		out[5] = b11 * a12;

		out[6] = a20;
		out[7] = a21;
		out[8] = a22;

		return out;
	};

	public static multiplyTranslateMatrix = <T extends Matrix2Like>(
		a: Matrix3Like,
		b: Matrix3Like,
		out: T = new Matrix3() as T,
	): T => {
		a00 = a[0];
		a01 = a[1];
		a02 = a[2];
		a10 = a[3];
		a11 = a[4];
		a12 = a[5];
		a20 = a[6];
		a21 = a[7];
		a22 = a[8];

		b20 = b[6];
		b21 = b[7];

		out[0] = a00;
		out[1] = a01;
		out[2] = a02;

		out[3] = a10;
		out[4] = a11;
		out[5] = a12;

		out[6] = b20 * a00 + b21 * a10 + a20;
		out[7] = b20 * a01 + b21 * a11 + a21;
		out[8] = b20 * a02 + b21 * a12 + a22;

		return out;
	};

	public static rotate = <T extends Matrix2Like>(a: Matrix3Like, rad: number, out: T = new Matrix3() as T): T => {
		a00 = a[0];
		a01 = a[1];
		a02 = a[2];
		a10 = a[3];
		a11 = a[4];
		a12 = a[5];
		a20 = a[6];
		a21 = a[7];
		a22 = a[8];
		y = Math.sin(rad);
		x = Math.cos(rad);

		out[0] = x * a00 + y * a10;
		out[1] = x * a01 + y * a11;
		out[2] = x * a02 + y * a12;

		out[3] = y * a10 - x * a00;
		out[4] = y * a11 - x * a01;
		out[5] = y * a12 - x * a02;

		out[6] = a20;
		out[7] = a21;
		out[8] = a22;

		return out;
	};

	public static scale = <T extends Matrix2Like>(a: Matrix3Like, v: Vector2Like, out: T = new Matrix3() as T): T => {
		x = v[0];
		y = v[1];

		out[0] = x * a[0];
		out[1] = x * a[1];
		out[2] = x * a[2];

		out[3] = y * a[3];
		out[4] = y * a[4];
		out[5] = y * a[5];

		out[6] = a[6];
		out[7] = a[7];
		out[8] = a[8];

		return out;
	};

	public static translate = <T extends Matrix2Like>(
		a: Matrix3Like,
		v: Vector2Like,
		out: T = new Matrix3() as T,
	): T => {
		a00 = a[0];
		a01 = a[1];
		a02 = a[2];
		a10 = a[3];
		a11 = a[4];
		a12 = a[5];
		a20 = a[6];
		a21 = a[7];
		a22 = a[8];
		x = v[0];
		y = v[1];

		out[0] = a00;
		out[1] = a01;
		out[2] = a02;

		out[3] = a10;
		out[4] = a11;
		out[5] = a12;

		out[6] = x * a00 + y * a10 + a20;
		out[7] = x * a01 + y * a11 + a21;
		out[8] = x * a02 + y * a12 + a22;

		return out;
	};

	public static transpose = <T extends Matrix2Like>(a: Matrix3Like, out: T = new Matrix3() as T): T => {
		if (out === a) {
			a01 = a[1];
			a02 = a[2];
			a12 = a[5];
			out[1] = a[3];
			out[2] = a[6];
			out[3] = a01;
			out[5] = a[7];
			out[6] = a02;
			out[7] = a12;
		} else {
			out[0] = a[0];
			out[1] = a[3];
			out[2] = a[6];
			out[3] = a[1];
			out[4] = a[4];
			out[5] = a[7];
			out[6] = a[2];
			out[7] = a[5];
			out[8] = a[8];
		}

		return out;
	};

	public constructor(data: Matrix3Like = UNIT_MATRIX3_DATA) {
		super(data);
	}
}
