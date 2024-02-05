import { EPSILON } from "../constants";
import { Vector3, Vector3Like } from "../vector/Vector3";
import { ITriangle3 } from "./interfaces/ITriangle3";

const ab = new Vector3();
const bc = new Vector3();
const ca = new Vector3();

export class Triangle3 implements ITriangle3 {
	public static area = (t: ITriangle3): number => {
		const c = Triangle3.getABLength(t);
		const a = Triangle3.getBCLength(t);
		const b = Triangle3.getCALength(t);
		const p = (c + a + b) / 2;

		return Math.sqrt(p * (p - a) * (p - b) * (p - c));
	};

	public static centerOfGravity = <T extends Vector3Like>(t: ITriangle3, out: T = new Vector3() as T): T => {
		out[0] = t.a[0] + t.b[0] + t.c[0];
		out[1] = t.a[1] + t.b[1] + t.c[1];
		out[2] = t.a[2] + t.b[2] + t.c[2];

		return Vector3.multiplyScalar(out, 1 / 3, out);
	}

	public static containsPoint = (t: ITriangle3, epsilon = EPSILON, point: Vector3Like): boolean => {
		Vector3.minus(t.b, t.a, ab);
		Vector3.minus(t.c, t.b, bc);
		Vector3.minus(t.a, t.c, ca);

		const v1 = Vector3.minus(t.a, point);
		const v2 = Vector3.minus(t.b, point);
		const v3 = Vector3.minus(t.c, point);
		Vector3.normalize(Vector3.cross(v1, v2, ab), ab);
		Vector3.normalize(Vector3.cross(v2, v3, bc), bc);
		Vector3.normalize(Vector3.cross(v3, v1, ca), ca);

		if (Vector3.closeToRect(ab, bc, epsilon) && Vector3.closeToRect(ab, ca, epsilon)) {
			return true;
		}

		return false;
	}

	public static cosAngle = (t: ITriangle3, point: "a" | "b" | "c" | Vector3Like): number => {
		let a: number, other: number[] = [];
		const a2 = Vector3.lengthSquared(t.a);
		const b2 = Vector3.lengthSquared(t.b);
		const c2 = Vector3.lengthSquared(t.c);

		if (typeof point === 'string') {
			if (point === "a") {
				a = a2;
				other.push(b2, c2);
			} else if (point === "b") {
				a = b2;
				other.push(a2, c2);
			} else {
				a = c2;
				other.push(a2, b2);
			}
		} else {
			if (point === t.a) {
				a = a2;
				other.push(b2, c2);
			} else if (point === t.b) {
				a = b2;
				other.push(a2, c2);
			} else if (point === t.c) {
				a = c2;
				other.push(a2, b2);
			} else {
				throw new Error("The point is not in triangle.");
			}
		}

		return (other[0] + other[1] - a) * 0.5 / Math.sqrt(other[0] * other[1]);
	}

	public static create = (
		a: Vector3 = new Vector3(-1, -1, 0),
		b: Vector3 = new Vector3(1, -1, 0),
		c: Vector3 = new Vector3(0, 1, 0),
	): Triangle3 => {
		return new Triangle3(a, b, c);
	};

	public static getABLength = (t: ITriangle3): number => {
		return Vector3.distanceTo(t.a, t.b);
	};

	public static getBCLength = (t: ITriangle3): number => {
		return Vector3.distanceTo(t.b, t.c);
	};

	public static getCALength = (t: ITriangle3): number => {
		return Vector3.distanceTo(t.c, t.a);
	};

	public static normal = <T extends Vector3Like = Vector3>(t: ITriangle3, out: T = new Vector3() as T): T => {
		Vector3.minus(t.c, t.b, bc);
		Vector3.minus(t.b, t.a, ab);

		Vector3.cross(ab, bc, out);

		return Vector3.normalize(out);
	};

	public static toFloat32Array = (t: ITriangle3, out: Float32Array = new Float32Array(9)): Float32Array => {
		out.set(t.a, 0);
		out.set(t.b, 3);
		out.set(t.c, 6);

		return out;
	};

	public a: Vector3;
	public b: Vector3;
	public c: Vector3;

	public constructor(
		a: Vector3 = new Vector3(-1, -1, 0),
		b: Vector3 = new Vector3(1, -1, 0),
		c: Vector3 = new Vector3(0, 1, 0),
	) {
		this.a = a;
		this.b = b;
		this.c = c;
	}
}
