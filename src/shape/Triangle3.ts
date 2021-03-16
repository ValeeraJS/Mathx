import ITriangle3 from "./interfaces/ITriangle";
import { Vector3 } from "../vector";

const defaultA = [-1, -1, 0];
const defaultB = [1, -1, 0];
const defaultC = [0, 1, 0];

let ab: Float32Array, bc: Float32Array;

export default class Triangle3 implements ITriangle3 {
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

export const area = (t: ITriangle3): number => {
	const c = getABLength(t);
	const a = getBCLength(t);
	const b = getCALength(t);
	const p = (c + a + b) / 2;

	return Math.sqrt(p * (p - a) * (p - b) * (p - c));
};

export const create = (
	a: Float32Array = new Float32Array(defaultA),
	b: Float32Array = new Float32Array(defaultB),
	c: Float32Array = new Float32Array(defaultC)
): ITriangle3 => {
	return { a, b, c };
};

export const getABLength = (t: ITriangle3): number => {
	return Vector3.distanceTo(t.a, t.b);
};

export const getBCLength = (t: ITriangle3): number => {
	return Vector3.distanceTo(t.b, t.c);
};

export const getCALength = (t: ITriangle3): number => {
	return Vector3.distanceTo(t.c, t.a);
};

export const normal = (t: ITriangle3, out: Float32Array = Vector3.create()): Float32Array => {
	Vector3.minus(t.c, t.b, bc);
	Vector3.minus(t.b, t.a, ab);

	Vector3.cross(ab, bc, out);

	return Vector3.normalize(out);
};

export const toFloat32Array = (
	t: ITriangle3,
	out: Float32Array = new Float32Array(3)
): Float32Array => {
	out.set(t.a, 0);
	out.set(t.b, 3);
	out.set(t.c, 6);

	return Vector3.normalize(out);
};
