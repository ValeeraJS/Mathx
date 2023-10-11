import { ITriangle2 } from "./interfaces/ITriangle2";
import { Vector2 } from "../vector/Vector2";

const ab = new Vector2();
const bc = new Vector2();

export class Triangle2 implements ITriangle2 {
	public static area = (t: ITriangle2): number => {
		const c = Triangle2.getABLength(t);
		const a = Triangle2.getBCLength(t);
		const b = Triangle2.getCALength(t);
		const p = (c + a + b) / 2;

		return Math.sqrt(p * (p - a) * (p - b) * (p - c));
	};

	public static create = (
		a: Vector2 = new Vector2(-1, -1),
		b: Vector2 = new Vector2(1, -1),
		c: Vector2 = new Vector2(0, 1),
	): ITriangle2 => {
		return new Triangle2(a, b, c);
	};

	public static getABLength = (t: ITriangle2): number => {
		return Vector2.distanceTo(t.a, t.b);
	};

	public static getBCLength = (t: ITriangle2): number => {
		return Vector2.distanceTo(t.b, t.c);
	};

	public static getCALength = (t: ITriangle2): number => {
		return Vector2.distanceTo(t.c, t.a);
	};

	public static normal = (t: ITriangle2): number => {
		Vector2.minus(t.c, t.b, bc);
		Vector2.minus(t.b, t.a, ab);

		const v = Vector2.cross(ab, bc);

		if (v > 0) {
			return 1;
		}
		if (v < 0) {
			return -1;
		}

		return 0;
	};

	public static toFloat32Array = (t: ITriangle2, out: Float32Array = new Float32Array(2)): Float32Array => {
		out.set(t.a, 0);
		out.set(t.b, 2);
		out.set(t.c, 4);

		return out;
	};

	public a: Vector2;
	public b: Vector2;
	public c: Vector2;

	public constructor(
		a: Vector2 = new Vector2(-1, -1),
		b: Vector2 = new Vector2(1, -1),
		c: Vector2 = new Vector2(0, 1),
	) {
		this.a = a;
		this.b = b;
		this.c = c;
	}
}
