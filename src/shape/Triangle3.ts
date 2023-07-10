import { Vector3, Vector3Like } from "../vector/Vector3";
import { ITriangle3 } from "./interfaces/ITriangle3";

const ab = new Vector3();
const bc = new Vector3();

export class Triangle3 implements ITriangle3 {
	public static area = (t: ITriangle3): number => {
		const c = Triangle3.getABLength(t);
		const a = Triangle3.getBCLength(t);
		const b = Triangle3.getCALength(t);
		const p = (c + a + b) / 2;

		return Math.sqrt(p * (p - a) * (p - b) * (p - c));
	};

	public static create = (
		a: Vector3 = new Vector3(-1, -1, 0),
		b: Vector3 = new Vector3(1, -1, 0),
		c: Vector3 = new Vector3(0, 1, 0)
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

	public static normal = <T extends Vector3Like = Vector3>(t: ITriangle3, out: T = new Vector3() as T): T => {
		Vector3.minus(t.c, t.b, bc);
		Vector3.minus(t.b, t.a, ab);

		Vector3.cross(ab, bc, out);

		return Vector3.normalize(out);
	};

	public static toFloat32Array = (
		t: ITriangle3,
		out: Float32Array = new Float32Array(9)
	): Float32Array => {
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
		c: Vector3 = new Vector3(0, 1, 0)
	) {
		this.a = a;
		this.b = b;
		this.c = c;
	}
}
