import Vector2, { IVector2 } from "../vector/Vector2";
import IRectangle from "./interfaces/IRectangle";

export default class Rectangle2 implements IRectangle {
	public min: IVector2 = Vector2.create();
	public max: IVector2 = Vector2.create();
	public constructor(a: Float32Array = Vector2.create(), b: Float32Array = Vector2.create(1, 1)) {
		Vector2.min(a, b, this.min);
		Vector2.max(a, b, this.max);
	}
}

export const area = (a: IRectangle): number => {
	return (a.max[0] - a.min[0]) * (a.max[1] - a.min[1]);
};

export const containsPoint = (rect: IRectangle, a: Float32Array): boolean => {
	return a[0] >= rect.min[0] && a[0] <= rect.max[0] && a[1] >= rect.min[1] && a[1] <= rect.max[1];
};

export const containsRectangle = (rect: IRectangle, box: IRectangle): boolean => {
	return (
		rect.min[0] <= box.min[0] &&
		box.max[0] <= rect.max[0] &&
		rect.min[1] <= box.min[1] &&
		box.max[1] <= rect.max[1]
	);
};

export const create = (
	a: Float32Array = Vector2.create(),
	b: Float32Array = Vector2.create(1, 1)
): IRectangle => {
	return {
		max: Vector2.max(a, b),
		min: Vector2.min(a, b)
	};
};

export const equals = (a: IRectangle, b: IRectangle): boolean => {
	return Vector2.equals(a.min, b.min) && Vector2.equals(a.max, b.max);
};

export const getCenter = (a: IRectangle, out: IVector2 = Vector2.create()): Float32Array => {
	Vector2.add(a.min, a.max, out);

	return Vector2.multiplyScalar(out, 0.5, out);
};

export const getSize = (a: IRectangle, out: IVector2 = Vector2.create()): Float32Array => {
	return Vector2.minus(a.max, a.min, out);
};

export const height = (a: IRectangle): number => {
	return a.max[1] - a.min[1];
};

export const intersect = (
	a: IRectangle,
	b: IRectangle,
	out: IRectangle = new Rectangle2()
): IRectangle => {
	Vector2.max(a.min, b.min, out.min);
	Vector2.min(a.max, b.max, out.max);

	return out;
};

export const stretch = (
	a: IRectangle,
	b: Float32Array,
	c: Float32Array,
	out: IRectangle = new Rectangle2()
): IRectangle => {
	Vector2.add(a.min, b, out.min);
	Vector2.add(a.max, c, out.max);

	return out;
};

export const translate = (
	a: IRectangle,
	b: Float32Array,
	out: IRectangle = new Rectangle2()
): IRectangle => {
	Vector2.add(a.min, b, out.min);
	Vector2.add(a.max, b, out.max);

	return out;
};

export const union = (
	a: IRectangle,
	b: IRectangle,
	out: IRectangle = new Rectangle2()
): IRectangle => {
	Vector2.min(a.min, b.min, out.min);
	Vector2.max(a.max, b.max, out.max);

	return out;
};

export const width = (a: IRectangle): number => {
	return a.max[0] - a.min[0];
};
