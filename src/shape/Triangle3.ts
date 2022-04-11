import Vector3, { IVector3 } from "../vector/Vector3";
import ITriangle3 from "./interfaces/ITriangle3";

const defaultA = [-1, -1, 0];
const defaultB = [1, -1, 0];
const defaultC = [0, 1, 0];

const ab = new Vector3();
const bc = new Vector3();

export default class Triangle3 implements ITriangle3 {
	public static area = (t: ITriangle3): number => {
		const c = Triangle3.getABLength(t);
		const a = Triangle3.getBCLength(t);
		const b = Triangle3.getCALength(t);
		const p = (c + a + b) / 2;

		return Math.sqrt(p * (p - a) * (p - b) * (p - c));
	};

	public static create = (
		a: Float32Array = new Float32Array(defaultA),
		b: Float32Array = new Float32Array(defaultB),
		c: Float32Array = new Float32Array(defaultC)
	): ITriangle3 => {
		return { a, b, c };
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

	public static normal = (t: ITriangle3, out: IVector3 = Vector3.create()): IVector3 => {
		Vector3.minus(t.c, t.b, bc);
		Vector3.minus(t.b, t.a, ab);

		Vector3.cross(ab, bc, out);

		return Vector3.normalize(out);
	};

	public static toFloat32Array = (
		t: ITriangle3,
		out: Float32Array = new Float32Array(3)
	): Float32Array => {
		out.set(t.a, 0);
		out.set(t.b, 3);
		out.set(t.c, 6);

		return Vector3.normalize(out);
	};

	public a: Float32Array;
	public b: Float32Array;
	public c: Float32Array;

	public constructor(
		a: Float32Array = new Float32Array(defaultA),
		b: Float32Array = new Float32Array(defaultB),
		c: Float32Array = new Float32Array(defaultC)
	) {
		this.a = a;
		this.b = b;
		this.c = c;
	}
}
