/* eslint-disable max-lines */
import { IEulerAngle, EulerRotationOrders } from "../euler/IEulerAngle";
import { Vector3, Vector3Like } from "../vector/Vector3";
import { closeTo } from "../common";
import { EPSILON } from "../constants";
import { Matrix3Like } from "./Matrix3";
import { Plane3 } from "../shape/Plane3";
import { QuaternionLike } from "../quaternion";

let a00 = 0;
let a01 = 0;
let a02 = 0;
let a03 = 0;
let a11 = 0;
let a10 = 0;
let a12 = 0;
let a13 = 0;
let a20 = 0;
let a21 = 0;
let a22 = 0;
let a23 = 0;
let a31 = 0;
let a30 = 0;
let a32 = 0;
let a33 = 0;
let b00 = 0;
let b01 = 0;
let b02 = 0;
let b03 = 0;
let b11 = 0;
let b10 = 0;
let b12 = 0;
let b13 = 0;
let b20 = 0;
let b21 = 0;
let b22 = 0;
let b23 = 0;
let b31 = 0;
let b30 = 0;
let b32 = 0;
let b33 = 0;
let x = 0;
let y = 0;
let z = 0;
let det = 0;
let len = 0;
let s = 0;
let t = 0;
let a = 0;
let b = 0;
let c = 0;
let d = 0;
let e = 0;
let f = 0;

const UNIT_MATRIX4_DATA = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

export type Matrix4Like = Matrix4 | Float32Array | number[];

export class Matrix4 extends Float32Array {
	public static readonly UNIT_MATRIX4 = new Matrix4(UNIT_MATRIX4_DATA);

	public static clone = <T extends Matrix4Like = Matrix4>(source: Matrix4Like, out: T = new Matrix4() as T): T => {
		out[0] = source[0];
		out[1] = source[1];
		out[2] = source[2];
		out[3] = source[3];
		out[4] = source[4];
		out[5] = source[5];
		out[6] = source[6];
		out[7] = source[7];
		out[8] = source[8];
		out[9] = source[9];
		out[10] = source[10];
		out[11] = source[11];
		out[12] = source[12];
		out[13] = source[13];
		out[14] = source[14];
		out[15] = source[15];

		return out;
	};

	public static create = (): Matrix4 => {
		return new Matrix4(UNIT_MATRIX4_DATA);
	};

	public static determinant = (a: Matrix4Like): number => {
		a00 = a[0];
		a01 = a[1];
		a02 = a[2];
		a03 = a[3];

		a10 = a[4];
		a11 = a[5];
		a12 = a[6];
		a13 = a[7];

		a20 = a[8];
		a21 = a[9];
		a22 = a[10];
		a23 = a[11];

		a30 = a[12];
		a31 = a[13];
		a32 = a[14];
		a33 = a[15];

		b00 = a00 * a11 - a01 * a10;
		b01 = a00 * a12 - a02 * a10;
		b02 = a01 * a12 - a02 * a11;
		b03 = a20 * a31 - a21 * a30;
		b10 = a20 * a32 - a22 * a30;
		b11 = a21 * a32 - a22 * a31;
		b12 = a00 * b11 - a01 * b10 + a02 * b03;
		b13 = a10 * b11 - a11 * b10 + a12 * b03;
		b20 = a20 * b02 - a21 * b01 + a22 * b00;
		b21 = a30 * b02 - a31 * b01 + a32 * b00;

		return a13 * b12 - a03 * b13 + a33 * b20 - a23 * b21;
	};

	public static fromArray = <T extends Matrix4Like = Matrix4>(
		source: Matrix4Like,
		out: T = new Matrix4() as T,
	): T => {
		out[0] = source[0];
		out[1] = source[1];
		out[2] = source[2];
		out[3] = source[3];
		out[4] = source[4];
		out[5] = source[5];
		out[6] = source[6];
		out[7] = source[7];
		out[8] = source[8];
		out[9] = source[9];
		out[10] = source[10];
		out[11] = source[11];
		out[12] = source[12];
		out[13] = source[13];
		out[14] = source[14];
		out[15] = source[15];

		return out;
	};

	public static fromEuler = <T extends Matrix4Like = Matrix4>(euler: IEulerAngle, out: T = new Matrix4() as T): T => {
		x = euler.x;
		y = euler.y;
		z = euler.z;

		a = Math.cos(x);
		b = Math.sin(x);
		c = Math.cos(y);
		d = Math.sin(y);
		e = Math.cos(z);
		f = Math.sin(z);

		if (euler.order === EulerRotationOrders.XYZ) {
			const ae = a * e;
			const af = a * f;
			const be = b * e;
			const bf = b * f;

			out[0] = c * e;
			out[4] = -c * f;
			out[8] = d;

			out[1] = af + be * d;
			out[5] = ae - bf * d;
			out[9] = -b * c;

			out[2] = bf - ae * d;
			out[6] = be + af * d;
			out[10] = a * c;
		} else if (euler.order === EulerRotationOrders.YXZ) {
			const ce = c * e;
			const cf = c * f;
			const de = d * e;
			const df = d * f;

			out[0] = ce + df * b;
			out[4] = de * b - cf;
			out[8] = a * d;

			out[1] = a * f;
			out[5] = a * e;
			out[9] = -b;

			out[2] = cf * b - de;
			out[6] = df + ce * b;
			out[10] = a * c;
		} else if (euler.order === EulerRotationOrders.ZXY) {
			const ce = c * e;
			const cf = c * f;
			const de = d * e;
			const df = d * f;

			out[0] = ce - df * b;
			out[4] = -a * f;
			out[8] = de + cf * b;

			out[1] = cf + de * b;
			out[5] = a * e;
			out[9] = df - ce * b;

			out[2] = -a * d;
			out[6] = b;
			out[10] = a * c;
		} else if (euler.order === EulerRotationOrders.ZYX) {
			const ae = a * e;
			const af = a * f;
			const be = b * e;
			const bf = b * f;

			out[0] = c * e;
			out[4] = be * d - af;
			out[8] = ae * d + bf;

			out[1] = c * f;
			out[5] = bf * d + ae;
			out[9] = af * d - be;

			out[2] = -d;
			out[6] = b * c;
			out[10] = a * c;
		} else if (euler.order === EulerRotationOrders.YZX) {
			const ac = a * c;
			const ad = a * d;
			const bc = b * c;
			const bd = b * d;

			out[0] = c * e;
			out[4] = bd - ac * f;
			out[8] = bc * f + ad;

			out[1] = f;
			out[5] = a * e;
			out[9] = -b * e;

			out[2] = -d * e;
			out[6] = ad * f + bc;
			out[10] = ac - bd * f;
		} else if (euler.order === EulerRotationOrders.XZY) {
			const ac = a * c;
			const ad = a * d;
			const bc = b * c;
			const bd = b * d;

			out[0] = c * e;
			out[4] = -f;
			out[8] = d * e;

			out[1] = ac * f + bd;
			out[5] = a * e;
			out[9] = ad * f - bc;

			out[2] = bc * f - ad;
			out[6] = b * e;
			out[10] = bd * f + ac;
		}

		// bottom row
		out[3] = 0;
		out[7] = 0;
		out[11] = 0;

		// last column
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;

		return out;
	};

	public static fromMatrix3 = <T extends Matrix4Like>(data: Matrix3Like, out: T = new Matrix4() as T): T => {
		out[0] = data[0];
		out[1] = data[1];
		out[2] = data[2];
		out[3] = 0;

		out[4] = data[3];
		out[5] = data[4];
		out[6] = data[5];
		out[7] = 0;

		out[8] = data[6];
		out[9] = data[7];
		out[10] = data[8];
		out[11] = 0;

		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;

		return out;
	};

	public static fromMatrix3MVP = <T extends Matrix4Like>(data: Matrix3Like, out: T = new Matrix4() as T): T => {
		out[0] = data[0];
		out[1] = data[1];
		out[2] = 0;
		out[3] = 0;

		out[4] = data[3];
		out[5] = data[4];
		out[6] = 0;
		out[7] = 0;

		out[8] = 0;
		out[9] = 0;
		out[10] = 1;
		out[11] = 0;

		out[12] = data[6];
		out[13] = data[7];
		out[14] = 0;
		out[15] = 1;

		return out;
	};

	public static fromQuaternion = <T extends Matrix4Like>(q: QuaternionLike, out: T = new Matrix4() as T): T => {
		const x = q[0];
		const y = q[1];
		const z = q[2];
		const w = q[3];
		const x2 = x + x;
		const y2 = y + y;
		const z2 = z + z;

		const xx = x * x2;
		const yx = y * x2;
		const yy = y * y2;
		const zx = z * x2;
		const zy = z * y2;
		const zz = z * z2;
		const wx = w * x2;
		const wy = w * y2;
		const wz = w * z2;

		out[0] = 1 - yy - zz;
		out[1] = yx + wz;
		out[2] = zx - wy;
		out[3] = 0;

		out[4] = yx - wz;
		out[5] = 1 - xx - zz;
		out[6] = zy + wx;
		out[7] = 0;

		out[8] = zx + wy;
		out[9] = zy - wx;
		out[10] = 1 - xx - yy;
		out[11] = 0;

		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;

		return out;
	};

	public static fromReflectPlane = <T extends Matrix4Like>(plane: Plane3, out: T = new Matrix4() as T): T => {
		x = plane.normal.x;
		y = plane.normal.y;
		z = plane.normal.z;
		d = plane.distance;

		a = x * 2;
		b = y * 2;
		c = z * 2;

		out[0] = 1 - a * x;
		out[1] = -a * y;
		out[2] = -a * z;
		out[3] = 0;

		out[4] = out[1];
		out[5] = 1 - b * y;
		out[6] = -b * z;
		out[7] = 0;

		out[8] = out[2];
		out[9] = out[6];
		out[10] = 1 - c * z;
		out[11] = 0;

		out[8] = -d * a;
		out[9] = -d * b;
		out[10] = -d * c;
		out[11] = 1;

		return out;
	};

	public static fromRotation = <T extends Matrix4Like>(
		rad: number,
		axis: Vector3Like,
		out: T = new Matrix4() as T,
	): T | null => {
		x = axis[0];
		y = axis[1];
		z = axis[2];
		len = Math.hypot(x, y, z);

		if (len < EPSILON) {
			return null;
		}

		len = 1 / len;
		x *= len;
		y *= len;
		z *= len;

		s = Math.sin(rad);
		c = Math.cos(rad);
		t = 1 - c;

		out[0] = x * x * t + c;
		out[1] = y * x * t + z * s;
		out[2] = z * x * t - y * s;
		out[3] = 0;
		out[4] = x * y * t - z * s;
		out[5] = y * y * t + c;
		out[6] = z * y * t + x * s;
		out[7] = 0;
		out[8] = x * z * t + y * s;
		out[9] = y * z * t - x * s;
		out[10] = z * z * t + c;
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;

		return out;
	};

	public static fromRotationX = <T extends Matrix4Like>(rad: number, out: T = new Matrix4() as T): T => {
		s = Math.sin(rad);
		c = Math.cos(rad);

		out[0] = 1;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = c;
		out[6] = s;
		out[7] = 0;
		out[8] = 0;
		out[9] = -s;
		out[10] = c;
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;

		return out;
	};

	public static fromRotationY = <T extends Matrix4Like>(rad: number, out: T = new Matrix4() as T): T => {
		s = Math.sin(rad);
		c = Math.cos(rad);

		out[0] = c;
		out[1] = 0;
		out[2] = -s;
		out[3] = 0;
		out[4] = 0;
		out[5] = 1;
		out[6] = 0;
		out[7] = 0;
		out[8] = s;
		out[9] = 0;
		out[10] = c;
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;

		return out;
	};

	public static fromRotationZ = <T extends Matrix4Like>(rad: number, out: T = new Matrix4() as T): T => {
		s = Math.sin(rad);
		c = Math.cos(rad);

		out[0] = c;
		out[1] = s;
		out[2] = 0;
		out[3] = 0;
		out[4] = -s;
		out[5] = c;
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[10] = 1;
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;

		return out;
	};

	public static fromScaling = <T extends Matrix4Like>(v: Vector3Like, out: T = new Matrix4() as T): T => {
		out[0] = v[0];
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = v[1];
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[10] = v[2];
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;

		return out;
	};

	public static fromTranslation = <T extends Matrix4Like>(v: Vector3Like, out: T = new Matrix4() as T): T => {
		out[0] = 1;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = 1;
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[10] = 1;
		out[11] = 0;
		out[12] = v[0];
		out[13] = v[1];
		out[14] = v[2];
		out[15] = 1;

		return out;
	};

	public static identity = <T extends Matrix4Like>(out: T = new Matrix4() as T): T => {
		out[0] = 1;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = 1;
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[10] = 1;
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;

		return out;
	};

	public static invert = <T extends Matrix4Like>(a: Matrix4Like, out: T = new Matrix4() as T): T | null => {
		a00 = a[0];
		a01 = a[1];
		a02 = a[2];
		a03 = a[3];

		a10 = a[4];
		a11 = a[5];
		a12 = a[6];
		a13 = a[7];

		a20 = a[8];
		a21 = a[9];
		a22 = a[10];
		a23 = a[11];

		a30 = a[12];
		a31 = a[13];
		a32 = a[14];
		a33 = a[15];

		b00 = a00 * a11 - a01 * a10;
		b01 = a00 * a12 - a02 * a10;
		b02 = a00 * a13 - a03 * a10;
		b03 = a01 * a12 - a02 * a11;
		b20 = a01 * a13 - a03 * a11;
		b21 = a02 * a13 - a03 * a12;
		b22 = a20 * a31 - a21 * a30;
		b23 = a20 * a32 - a22 * a30;
		b30 = a20 * a33 - a23 * a30;
		b31 = a21 * a32 - a22 * a31;
		b32 = a21 * a33 - a23 * a31;
		b33 = a22 * a33 - a23 * a32;

		det = b00 * b33 - b01 * b32 + b02 * b31 + b03 * b30 - b20 * b23 + b21 * b22;

		if (!det) {
			return null;
		}
		det = 1.0 / det;

		out[0] = (a11 * b33 - a12 * b32 + a13 * b31) * det;
		out[1] = (a02 * b32 - a01 * b33 - a03 * b31) * det;
		out[2] = (a31 * b21 - a32 * b20 + a33 * b03) * det;
		out[3] = (a22 * b20 - a21 * b21 - a23 * b03) * det;
		out[4] = (a12 * b30 - a10 * b33 - a13 * b23) * det;
		out[5] = (a00 * b33 - a02 * b30 + a03 * b23) * det;
		out[6] = (a32 * b02 - a30 * b21 - a33 * b01) * det;
		out[7] = (a20 * b21 - a22 * b02 + a23 * b01) * det;
		out[8] = (a10 * b32 - a11 * b30 + a13 * b22) * det;
		out[9] = (a01 * b30 - a00 * b32 - a03 * b22) * det;
		out[10] = (a30 * b20 - a31 * b02 + a33 * b00) * det;
		out[11] = (a21 * b02 - a20 * b20 - a23 * b00) * det;
		out[12] = (a11 * b23 - a10 * b31 - a12 * b22) * det;
		out[13] = (a00 * b31 - a01 * b23 + a02 * b22) * det;
		out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
		out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

		return out;
	};

	public static lookAt = <T extends Matrix4Like>(
		eye: Vector3Like,
		center: Vector3Like,
		up: Vector3Like = Vector3.VECTOR3_TOP,
		out: T = new Matrix4() as T,
	): T => {
		let x0;
		let x1;
		let x2;
		let y0;
		let y1;
		let y2;
		let z0;
		let z1;
		let z2;
		let len;
		const eyex = eye[0];
		const eyey = eye[1];
		const eyez = eye[2];
		const upx = up[0];
		const upy = up[1];
		const upz = up[2];
		const centerx = center[0];
		const centery = center[1];
		const centerz = center[2];

		if (closeTo(eyex, centerx) && closeTo(eyey, centery) && closeTo(eyez, centerz)) {
			return Matrix4.identity(out);
		}

		z0 = eyex - centerx;
		z1 = eyey - centery;
		z2 = eyez - centerz;

		len = 1 / Math.hypot(z0, z1, z2);
		z0 *= len;
		z1 *= len;
		z2 *= len;

		x0 = upy * z2 - upz * z1;
		x1 = upz * z0 - upx * z2;
		x2 = upx * z1 - upy * z0;
		len = Math.hypot(x0, x1, x2);
		if (!len) {
			x0 = 0;
			x1 = 0;
			x2 = 0;
		} else {
			len = 1 / len;
			x0 *= len;
			x1 *= len;
			x2 *= len;
		}

		y0 = z1 * x2 - z2 * x1;
		y1 = z2 * x0 - z0 * x2;
		y2 = z0 * x1 - z1 * x0;

		len = Math.hypot(y0, y1, y2);
		if (!len) {
			y0 = 0;
			y1 = 0;
			y2 = 0;
		} else {
			len = 1 / len;
			y0 *= len;
			y1 *= len;
			y2 *= len;
		}

		out[0] = x0;
		out[1] = y0;
		out[2] = z0;
		out[3] = 0;
		out[4] = x1;
		out[5] = y1;
		out[6] = z1;
		out[7] = 0;
		out[8] = x2;
		out[9] = y2;
		out[10] = z2;
		out[11] = 0;
		out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
		out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
		out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
		out[15] = 1;

		return out;
	};

	public static multiply = <T extends Matrix4Like>(
		a: Matrix4Like,
		b: Matrix4Like,
		out: T = new Matrix4() as T,
	): T => {
		a00 = a[0];
		a01 = a[1];
		a02 = a[2];
		a03 = a[3];

		a10 = a[4];
		a11 = a[5];
		a12 = a[6];
		a13 = a[7];

		a20 = a[8];
		a21 = a[9];
		a22 = a[10];
		a23 = a[11];

		a30 = a[12];
		a31 = a[13];
		a32 = a[14];
		a33 = a[15];

		b00 = b[0];
		b01 = b[1];
		b02 = b[2];
		b03 = b[3];
		out[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
		out[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
		out[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
		out[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;

		b00 = b[4];
		b01 = b[5];
		b02 = b[6];
		b03 = b[7];
		out[4] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
		out[5] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
		out[6] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
		out[7] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;

		b00 = b[8];
		b01 = b[9];
		b02 = b[10];
		b03 = b[11];
		out[8] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
		out[9] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
		out[10] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
		out[11] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;

		b00 = b[12];
		b01 = b[13];
		b02 = b[14];
		b03 = b[15];
		out[12] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
		out[13] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
		out[14] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
		out[15] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;

		return out;
	};

	// 乘以缩放矩阵
	public static multiplyScaleMatrix = <T extends Matrix4Like>(
		a: Matrix4Like,
		b: Matrix4Like,
		out: T = new Matrix4() as T,
	): T => {
		a00 = a[0];
		a01 = a[1];
		a02 = a[2];
		a03 = a[3];

		a10 = a[4];
		a11 = a[5];
		a12 = a[6];
		a13 = a[7];

		a20 = a[8];
		a21 = a[9];
		a22 = a[10];
		a23 = a[11];

		a30 = a[12];
		a31 = a[13];
		a32 = a[14];
		a33 = a[15];

		b00 = b[0];
		out[0] = b00 * a00;
		out[1] = b00 * a01;
		out[2] = b00 * a02;
		out[3] = b00 * a03;

		b01 = b[5];
		out[4] = b01 * a10;
		out[5] = b01 * a11;
		out[6] = b01 * a12;
		out[7] = b01 * a13;

		b02 = b[10];
		out[8] = b02 * a20;
		out[9] = b02 * a21;
		out[10] = b02 * a22;
		out[11] = b02 * a23;

		out[12] = a30;
		out[13] = a31;
		out[14] = a32;
		out[15] = a33;

		return out;
	};

	// 乘以平移矩阵
	public static multiplyTranslateMatrix = <T extends Matrix4Like>(
		a: Matrix4Like,
		b: Matrix4Like,
		out: T = new Matrix4() as T,
	): T => {
		a00 = a[0];
		a01 = a[1];
		a02 = a[2];
		a03 = a[3];

		a10 = a[4];
		a11 = a[5];
		a12 = a[6];
		a13 = a[7];

		a20 = a[8];
		a21 = a[9];
		a22 = a[10];
		a23 = a[11];

		a30 = a[12];
		a31 = a[13];
		a32 = a[14];
		a33 = a[15];

		out[0] = a00;
		out[1] = a01;
		out[2] = a02;
		out[3] = a03;

		out[4] = a10;
		out[5] = a11;
		out[6] = a12;
		out[7] = a13;

		out[8] = a20;
		out[9] = a21;
		out[10] = a22;
		out[11] = a23;

		b00 = b[12];
		b01 = b[13];
		b02 = b[14];
		out[12] = b00 * a00 + b01 * a10 + b02 * a20 + a30;
		out[13] = b00 * a01 + b01 * a11 + b02 * a21 + a31;
		out[14] = b00 * a02 + b01 * a12 + b02 * a22 + a32;
		out[15] = b00 * a03 + b01 * a13 + b02 * a23 + a33;

		return out;
	};

	public static orthogonal = <T extends Matrix4Like>(
		left: number,
		right: number,
		bottom: number,
		top: number,
		near: number,
		far: number,
		out: T = new Matrix4() as T,
	): T => {
		c = 1 / (left - right);
		b = 1 / (bottom - top);
		a = 1 / (near - far);

		out[0] = -2 * c;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = -2 * b;
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[10] = 2 * a;
		out[11] = 0;
		out[12] = (left + right) * c;
		out[13] = (top + bottom) * b;
		out[14] = (far + near) * a;
		out[15] = 1;

		return out;
	};

	public static orthogonalZ0 = <T extends Matrix4Like>(
		left: number,
		right: number,
		bottom: number,
		top: number,
		near: number,
		far: number,
		out: T = new Matrix4() as T,
	): T => {
		c = 1 / (left - right);
		b = 1 / (bottom - top);
		a = 1 / (near - far);

		out[0] = -2 * c;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = -2 * b;
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[10] = a;
		out[11] = 0;
		out[12] = (left + right) * c;
		out[13] = (top + bottom) * b;
		out[14] = near * a;
		out[15] = 1;

		return out;
	};

	public static perspective = <T extends Matrix4Like>(
		fovy: number,
		aspect: number,
		near: number,
		far: number,
		out: T = new Matrix4() as T,
	): T => {
		f = 1.0 / Math.tan(fovy / 2);

		out[0] = f / aspect;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = f;
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[11] = -1;
		out[12] = 0;
		out[13] = 0;
		out[15] = 0;
		if (far !== null && far !== Infinity) {
			a = 1 / (near - far);
			out[10] = (far + near) * a;
			out[14] = 2 * far * near * a;
		} else {
			out[10] = -1;
			out[14] = -2 * near;
		}

		return out;
	};

	public static perspectiveZ0 = <T extends Matrix4Like>(
		fovy: number,
		aspect: number,
		near: number,
		far: number,
		out: T = new Matrix4() as T,
	): T => {
		f = 1.0 / Math.tan(fovy / 2);

		out[0] = f / aspect;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = f;
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[11] = -1;
		out[12] = 0;
		out[13] = 0;
		out[15] = 0;
		if (far !== null && far !== Infinity) {
			a = 1 / (near - far);
			out[10] = far * a;
			out[14] = far * near * a;
		} else {
			out[10] = -1;
			out[14] = -near;
		}

		return out;
	};

	public static rotate = <T extends Matrix4Like>(
		a: Matrix4Like,
		rad: number,
		axis: Vector3Like,
		out: T = new Matrix4() as T,
	): T | null => {
		x = axis[0];
		y = axis[1];
		z = axis[2];
		len = Math.hypot(x, y, z);

		if (len < EPSILON) {
			return null;
		}

		len = 1 / len;
		x *= len;
		y *= len;
		z *= len;

		s = Math.sin(rad);
		c = Math.cos(rad);
		t = 1 - c;

		a00 = a[0];
		a01 = a[1];
		a02 = a[2];
		a03 = a[3];
		a10 = a[4];
		a11 = a[5];
		a12 = a[6];
		a13 = a[7];
		a20 = a[8];
		a21 = a[9];
		a22 = a[10];
		a23 = a[11];

		b00 = x * x * t + c;
		b01 = y * x * t + z * s;
		b02 = z * x * t - y * s;
		b10 = x * y * t - z * s;
		b11 = y * y * t + c;
		b12 = z * y * t + x * s;
		b20 = x * z * t + y * s;
		b21 = y * z * t - x * s;
		b22 = z * z * t + c;

		out[0] = a00 * b00 + a10 * b01 + a20 * b02;
		out[1] = a01 * b00 + a11 * b01 + a21 * b02;
		out[2] = a02 * b00 + a12 * b01 + a22 * b02;
		out[3] = a03 * b00 + a13 * b01 + a23 * b02;
		out[4] = a00 * b10 + a10 * b11 + a20 * b12;
		out[5] = a01 * b10 + a11 * b11 + a21 * b12;
		out[6] = a02 * b10 + a12 * b11 + a22 * b12;
		out[7] = a03 * b10 + a13 * b11 + a23 * b12;
		out[8] = a00 * b20 + a10 * b21 + a20 * b22;
		out[9] = a01 * b20 + a11 * b21 + a21 * b22;
		out[10] = a02 * b20 + a12 * b21 + a22 * b22;
		out[11] = a03 * b20 + a13 * b21 + a23 * b22;

		if (a !== out) {
			out[12] = a[12];
			out[13] = a[13];
			out[14] = a[14];
			out[15] = a[15];
		}

		return out;
	};

	public static rotateX = <T extends Matrix4Like>(a: Matrix4Like, rad: number, out: T = new Matrix4() as T): T => {
		s = Math.sin(rad);
		c = Math.cos(rad);
		a10 = a[4];
		a11 = a[5];
		a12 = a[6];
		a13 = a[7];
		a20 = a[8];
		a21 = a[9];
		a22 = a[10];
		a23 = a[11];

		if (a !== out) {
			out[0] = a[0];
			out[1] = a[1];
			out[2] = a[2];
			out[3] = a[3];
			out[12] = a[12];
			out[13] = a[13];
			out[14] = a[14];
			out[15] = a[15];
		}

		out[4] = a10 * c + a20 * s;
		out[5] = a11 * c + a21 * s;
		out[6] = a12 * c + a22 * s;
		out[7] = a13 * c + a23 * s;
		out[8] = a20 * c - a10 * s;
		out[9] = a21 * c - a11 * s;
		out[10] = a22 * c - a12 * s;
		out[11] = a23 * c - a13 * s;

		return out;
	};

	public static rotateY = <T extends Matrix4Like>(a: Matrix4Like, rad: number, out: T = new Matrix4() as T): T => {
		s = Math.sin(rad);
		c = Math.cos(rad);
		a00 = a[0];
		a01 = a[1];
		a02 = a[2];
		a03 = a[3];
		a20 = a[8];
		a21 = a[9];
		a22 = a[10];
		a23 = a[11];

		if (a !== out) {
			out[4] = a[4];
			out[5] = a[5];
			out[6] = a[6];
			out[7] = a[7];
			out[12] = a[12];
			out[13] = a[13];
			out[14] = a[14];
			out[15] = a[15];
		}

		out[0] = a00 * c - a20 * s;
		out[1] = a01 * c - a21 * s;
		out[2] = a02 * c - a22 * s;
		out[3] = a03 * c - a23 * s;
		out[8] = a00 * s + a20 * c;
		out[9] = a01 * s + a21 * c;
		out[10] = a02 * s + a22 * c;
		out[11] = a03 * s + a23 * c;

		return out;
	};

	public static rotateZ = <T extends Matrix4Like>(a: Matrix4Like, rad: number, out: T = new Matrix4() as T): T => {
		s = Math.sin(rad);
		c = Math.cos(rad);
		a00 = a[0];
		a01 = a[1];
		a02 = a[2];
		a03 = a[3];
		a10 = a[4];
		a11 = a[5];
		a12 = a[6];
		a13 = a[7];

		if (a !== out) {
			out[8] = a[8];
			out[9] = a[9];
			out[10] = a[10];
			out[11] = a[11];
			out[12] = a[12];
			out[13] = a[13];
			out[14] = a[14];
			out[15] = a[15];
		}

		out[0] = a00 * c + a10 * s;
		out[1] = a01 * c + a11 * s;
		out[2] = a02 * c + a12 * s;
		out[3] = a03 * c + a13 * s;
		out[4] = a10 * c - a00 * s;
		out[5] = a11 * c - a01 * s;
		out[6] = a12 * c - a02 * s;
		out[7] = a13 * c - a03 * s;

		return out;
	};

	public static scale = <T extends Matrix4Like>(a: Matrix4Like, v: Vector3Like, out: T = new Matrix4() as T): T => {
		x = v[0];
		y = v[1];
		z = v[2];

		out[0] = a[0] * x;
		out[1] = a[1] * x;
		out[2] = a[2] * x;
		out[3] = a[3] * x;
		out[4] = a[4] * y;
		out[5] = a[5] * y;
		out[6] = a[6] * y;
		out[7] = a[7] * y;
		out[8] = a[8] * z;
		out[9] = a[9] * z;
		out[10] = a[10] * z;
		out[11] = a[11] * z;
		if (out !== a) {
			out[12] = a[12];
			out[13] = a[13];
			out[14] = a[14];
			out[15] = a[15];
		}

		return out;
	};

	public static targetTo = <T extends Matrix4Like>(
		eye: Vector3Like,
		target: Vector3Like,
		up: Vector3Like = Vector3.VECTOR3_TOP,
		out: T = new Matrix4() as T,
	): T => {
		const eyex = eye[0];
		const eyey = eye[1];
		const eyez = eye[2];
		const upx = up[0];
		const upy = up[1];
		const upz = up[2];

		let z0 = eyex - target[0];
		let z1 = eyey - target[1];
		let z2 = eyez - target[2];

		let len = z0 * z0 + z1 * z1 + z2 * z2;

		if (len > 0) {
			len = 1 / Math.sqrt(len);
			z0 *= len;
			z1 *= len;
			z2 *= len;
		}

		let x0 = upy * z2 - upz * z1;
		let x1 = upz * z0 - upx * z2;
		let x2 = upx * z1 - upy * z0;

		len = x0 * x0 + x1 * x1 + x2 * x2;
		if (len > 0) {
			len = 1 / Math.sqrt(len);
			x0 *= len;
			x1 *= len;
			x2 *= len;
		}

		out[0] = x0;
		out[1] = x1;
		out[2] = x2;
		out[3] = 0;
		out[4] = z1 * x2 - z2 * x1;
		out[5] = z2 * x0 - z0 * x2;
		out[6] = z0 * x1 - z1 * x0;
		out[7] = 0;
		out[8] = z0;
		out[9] = z1;
		out[10] = z2;
		out[11] = 0;
		out[12] = eyex;
		out[13] = eyey;
		out[14] = eyez;
		out[15] = 1;

		return out;
	};

	public static translate = <T extends Matrix4Like>(
		a: Matrix4Like,
		v: Vector3Like,
		out: T = new Matrix4() as T,
	): T => {
		x = v[0];
		y = v[1];
		z = v[2];

		if (a === out) {
			out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
			out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
			out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
			out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
		} else {
			a00 = a[0];
			a01 = a[1];
			a02 = a[2];
			a03 = a[3];
			a10 = a[4];
			a11 = a[5];
			a12 = a[6];
			a13 = a[7];
			a20 = a[8];
			a21 = a[9];
			a22 = a[10];
			a23 = a[11];

			out[0] = a00;
			out[1] = a01;
			out[2] = a02;
			out[3] = a03;
			out[4] = a10;
			out[5] = a11;
			out[6] = a12;
			out[7] = a13;
			out[8] = a20;
			out[9] = a21;
			out[10] = a22;
			out[11] = a23;

			out[12] = a00 * x + a10 * y + a20 * z + a[12];
			out[13] = a01 * x + a11 * y + a21 * z + a[13];
			out[14] = a02 * x + a12 * y + a22 * z + a[14];
			out[15] = a03 * x + a13 * y + a23 * z + a[15];
		}

		return out;
	};

	public static transpose = <T extends Matrix4Like>(a: Matrix4Like, out: T = new Matrix4() as T): T => {
		if (out === a) {
			a01 = a[1];
			a02 = a[2];
			a03 = a[3];
			a12 = a[6];
			a13 = a[7];
			a23 = a[11];

			out[1] = a[4];
			out[2] = a[8];
			out[3] = a[12];
			out[4] = a01;
			out[6] = a[9];
			out[7] = a[13];
			out[8] = a02;
			out[9] = a12;
			out[11] = a[14];
			out[12] = a03;
			out[13] = a13;
			out[14] = a23;
		} else {
			out[0] = a[0];
			out[1] = a[4];
			out[2] = a[8];
			out[3] = a[12];
			out[4] = a[1];
			out[5] = a[5];
			out[6] = a[9];
			out[7] = a[13];
			out[8] = a[2];
			out[9] = a[6];
			out[10] = a[10];
			out[11] = a[14];
			out[12] = a[3];
			out[13] = a[7];
			out[14] = a[11];
			out[15] = a[15];
		}

		return out;
	};

	public static unproject = <T extends Vector3Like = Vector3>(
		vec3: Vector3Like,
		projectionMatrix: Matrix4Like,
		worldMatrix: Matrix4Like,
		out: T = new Vector3() as T,
	): T => {
		tmpMatrix4Data.set(projectionMatrix);
		Matrix4.invert(tmpMatrix4Data, tmpMatrix4Data);
		Vector3.transformMatrix4(vec3, tmpMatrix4Data, out);
		return Vector3.transformMatrix4(out, worldMatrix, out);
	};

	public constructor(data: Matrix4Like = UNIT_MATRIX4_DATA) {
		super(data);
	}
}

const tmpMatrix4Data = new Float32Array(16);
