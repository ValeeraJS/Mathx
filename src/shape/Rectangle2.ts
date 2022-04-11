import Vector2, { IVector2 } from "../vector/Vector2";
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
		a: Float32Array = Vector2.create(),
		b: Float32Array = Vector2.create(1, 1)
	): IRectangle2 => {
		return {
			max: Vector2.max(a, b),
			min: Vector2.min(a, b)
		};
	};

	public static equals = (a: IRectangle2, b: IRectangle2): boolean => {
		return Vector2.equals(a.min, b.min) && Vector2.equals(a.max, b.max);
	};

	public static getCenter = (a: IRectangle2, out: IVector2 = Vector2.create()): IVector2 => {
		Vector2.add(a.min, a.max, out);

		return Vector2.multiplyScalar(out, 0.5, out);
	};

	public static getSize = (a: IRectangle2, out: IVector2 = Vector2.create()): IVector2 => {
		return Vector2.minus(a.max, a.min, out);
	};

	public static height = (a: IRectangle2): number => {
		return a.max[1] - a.min[1];
	};

	public static intersect = (
		a: IRectangle2,
		b: IRectangle2,
		out: IRectangle2 = new Rectangle2()
	): IRectangle2 => {
		Vector2.max(a.min, b.min, out.min);
		Vector2.min(a.max, b.max, out.max);

		return out;
	};

	public static stretch = (
		a: IRectangle2,
		b: Float32Array | IVector2 | number[],
		c: Float32Array | IVector2 | number[],
		out: IRectangle2 = new Rectangle2()
	): IRectangle2 => {
		Vector2.add(a.min, b, out.min);
		Vector2.add(a.max, c, out.max);

		return out;
	};

	public static translate = (
		a: IRectangle2,
		b: Float32Array | IVector2 | number[],
		out: IRectangle2 = new Rectangle2()
	): IRectangle2 => {
		Vector2.add(a.min, b, out.min);
		Vector2.add(a.max, b, out.max);

		return out;
	};

	public static union = (
		a: IRectangle2,
		b: IRectangle2,
		out: IRectangle2 = new Rectangle2()
	): IRectangle2 => {
		Vector2.min(a.min, b.min, out.min);
		Vector2.max(a.max, b.max, out.max);

		return out;
	};

	public static width = (a: IRectangle2): number => {
		return a.max[0] - a.min[0];
	};

	public min: IVector2 = Vector2.create();
	public max: IVector2 = Vector2.create();
	public constructor(
		a: IVector2 | Float32Array | number[] = Vector2.create(),
		b: IVector2 | Float32Array | number[] = Vector2.create(1, 1)
	) {
		Vector2.min(a, b, this.min);
		Vector2.max(a, b, this.max);
	}
}
