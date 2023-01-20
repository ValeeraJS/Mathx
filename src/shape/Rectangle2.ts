import Vector2, { IVector2 } from "../vector/Vector2";
import { Vector2Like } from "../vector/Vector2";
import IRectangle2 from "./interfaces/IRectangle2";

export default class Rectangle2 implements IRectangle2 {
	public static area = (a: IRectangle2): number => {
		return (a.max[0] - a.min[0]) * (a.max[1] - a.min[1]);
	};

	public static containsPoint = (rect: IRectangle2, a: Float32Array): boolean => {
		return (
			a[0] >= rect.min[0] && a[0] <= rect.max[0] && a[1] >= rect.min[1] && a[1] <= rect.max[1]
		);
	};

	public static containsRectangle = (rect: IRectangle2, box: IRectangle2): boolean => {
		return (
			rect.min[0] <= box.min[0] &&
			box.max[0] <= rect.max[0] &&
			rect.min[1] <= box.min[1] &&
			box.max[1] <= rect.max[1]
		);
	};

	public static create = (
		a: Vector2Like = Vector2.VECTOR2_ZERO,
		b: Vector2Like = Vector2.VECTOR2_ONE
	): Rectangle2 => {
		return new Rectangle2(a, b);
	};

	public static equals = (a: IRectangle2, b: IRectangle2): boolean => {
		return Vector2.equals(a.min, b.min) && Vector2.equals(a.max, b.max);
	};

	public static getCenter = (a: IRectangle2, out: Vector2 = Vector2.create()): Vector2 => {
		Vector2.add(a.min, a.max, out);

		return Vector2.multiplyScalar(out, 0.5, out);
	};

	public static getSize = (a: IRectangle2, out: Vector2 = Vector2.create()): Vector2 => {
		return Vector2.minus(a.max, a.min, out);
	};

	public static height = (a: IRectangle2): number => {
		return a.max[1] - a.min[1];
	};

	public static intersect = (
		a: IRectangle2,
		b: IRectangle2,
		out: Rectangle2 = new Rectangle2()
	): Rectangle2 => {
		Vector2.max(a.min, b.min, out.min);
		Vector2.min(a.max, b.max, out.max);

		return out;
	};

	public static stretch = (
		a: IRectangle2,
		b: Float32Array | IVector2 | number[],
		c: Float32Array | IVector2 | number[],
		out: Rectangle2 = new Rectangle2()
	): Rectangle2 => {
		Vector2.add(a.min, b, out.min);
		Vector2.add(a.max, c, out.max);

		return out;
	};

	public static translate = (
		a: IRectangle2,
		b: Float32Array | IVector2 | number[],
		out: Rectangle2 = new Rectangle2()
	): Rectangle2 => {
		Vector2.add(a.min, b, out.min);
		Vector2.add(a.max, b, out.max);

		return out;
	};

	public static union = (
		a: IRectangle2,
		b: IRectangle2,
		out: Rectangle2 = new Rectangle2()
	): Rectangle2 => {
		Vector2.min(a.min, b.min, out.min);
		Vector2.max(a.max, b.max, out.max);

		return out;
	};

	public static width = (a: IRectangle2): number => {
		return a.max[0] - a.min[0];
	};

	public min: Vector2 = new Vector2();
	public max: Vector2 = new Vector2();
	public constructor(
		a: Vector2Like = Vector2.VECTOR2_ZERO,
		b: Vector2Like = Vector2.VECTOR2_ONE
	) {
		Vector2.min(a, b, this.min);
		Vector2.max(a, b, this.max);
	}
}
