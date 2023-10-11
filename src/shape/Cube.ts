import { Vector3, IVector3, Vector3Like } from "../vector/Vector3";
import { ICube } from "./interfaces/ICube";
import { ISphere } from "./interfaces/ISphere";
import { ITriangle3 } from "./interfaces/ITriangle3";
// import Matrix3 from "../matrix/Matrix3";

const v1: Vector3 = new Vector3();
const v2: Vector3 = new Vector3();
const v0: Vector3 = new Vector3();
const f1: Vector3 = new Vector3();
const f2: Vector3 = new Vector3();
const f0: Vector3 = new Vector3();
const ta: Vector3 = new Vector3();
// const ma: Matrix3 = new Matrix3();
const tb: Vector3 = new Vector3();
const vA: Vector3 = new Vector3();

export class Cube implements ICube {
	public static center = <T extends Vector3Like = Vector3>(a: ICube, out: T = new Vector3() as T): T => {
		Vector3.add(a.min, a.max, out);

		return Vector3.multiplyScalar(out, 0.5, out);
	};

	public static clampPoint = <T extends Vector3Like = Vector3>(
		a: ICube,
		point: Vector3Like,
		out: T = new Vector3() as T,
	): T => {
		return Vector3.clamp(point, a.min, a.max, out);
	};

	public static containsPoint = (a: ICube, b: Vector3Like): boolean => {
		return (
			b[0] >= a.min[0] &&
			b[0] <= a.max[0] &&
			b[1] >= a.min[1] &&
			b[1] <= a.max[1] &&
			b[2] >= a.min[2] &&
			b[2] <= a.max[2]
		);
	};

	public static containsCube = (a: ICube, b: ICube): boolean => {
		return (
			a.min[0] <= b.min[0] &&
			b.max[0] <= a.max[0] &&
			a.min[1] <= b.min[1] &&
			b.max[1] <= a.max[1] &&
			a.min[2] <= b.min[2] &&
			b.max[2] <= a.max[2]
		);
	};

	public static depth = (a: ICube): number => {
		return a.max[2] - a.min[2];
	};

	public static equals = (a: ICube, b: ICube): boolean => {
		return Vector3.equals(a.min, b.min) && Vector3.equals(a.max, b.max);
	};

	public static getSize = <T extends Vector3Like = Vector3>(a: ICube, out: T = new Vector3() as T): T => {
		return Vector3.minus(a.max, a.min, out);
	};

	public static height = (a: ICube): number => {
		return a.max[1] - a.min[1];
	};

	public static intersect = (a: ICube, b: ICube, out: Cube = new Cube()): Cube => {
		Vector3.max(a.min, b.min, out.min);
		Vector3.min(a.max, b.max, out.max);

		return out;
	};

	public static intersectsBox = (a: ICube, b: ICube): boolean => {
		return !(
			b.max[0] < a.min[0] ||
			b.min[0] > a.max[0] ||
			b.max[1] < a.min[1] ||
			b.min[1] > a.max[1] ||
			b.max[2] < a.min[2] ||
			b.min[2] > a.max[2]
		);
	};

	public static intersectsSphere = (a: ICube, b: ISphere): boolean => {
		Cube.clampPoint(a, b.position, ta);

		return Vector3.distanceToSquared(ta, b.position) <= b.radius * b.radius;
	};

	public static intersectsTriangle = (a: ICube, b: ITriangle3): boolean => {
		if (Cube.isEmpty(a)) {
			return false;
		}

		Cube.center(a, ta);
		Vector3.minus(a.max, ta, tb);

		// translate triangle to aabb origin
		Vector3.minus(b.a, ta, v0);
		Vector3.minus(b.b, ta, v1);
		Vector3.minus(b.c, ta, v2);

		// compute edge vectors for triangle
		Vector3.minus(v1, v0, f0);
		Vector3.minus(v2, v1, f1);
		Vector3.minus(v0, v2, f2);

		// test against axes that are given by cross product combinations of the edges of the triangle and the edges of the aabb
		// make an axis testing of each of the 3 sides of the aabb against each of the 3 sides of the triangle = 9 axis of separation
		// axis_ij = u_i x f_j (u0, u1, u2 = face normals of aabb = x,y,z axes vectors since aabb is axis aligned)
		const axes = [
			0,
			-f0[2],
			f0[1],
			0,
			-f1[2],
			f1[1],
			0,
			-f2[2],
			f2[1],

			f0[2],
			0,
			-f0[0],
			f1[2],
			0,
			-f1[0],
			f2[2],
			0,
			-f2[0],

			-f0[1],
			f0[0],
			0,
			-f1[1],
			f1[0],
			0,
			-f2[1],
			f2[0],
			0,
		];

		if (!satForAxes(axes, v0, v1, v2, tb)) {
			return false;
		}

		// test 3 face normals from the aabb
		// ta = Matrix3.identity(); ???

		if (!satForAxes(axes, v0, v1, v2, tb)) {
			return false;
		}

		// finally testing the face normal of the triangle
		// use already existing triangle edge vectors here
		Vector3.cross(f0, f1, ta);
		// axes = [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z];

		return satForAxes(ta, v0, v1, v2, tb);
	};

	public static isEmpty = (a: ICube): boolean => {
		return a.max[0] < a.min[0] || a.max[0] < a.min[0] || a.max[0] < a.min[0];
	};

	public static round = (a: ICube, out: Cube = new Cube()): Cube => {
		Vector3.round(a.min, out.min);
		Vector3.round(a.max, out.max);

		return out;
	};

	public static size = <T extends Vector3Like = Vector3>(a: ICube, out: T = new Vector3() as T): T => {
		return Vector3.minus(a.max, a.min, out);
	};

	public static stretch = (
		a: ICube,
		b: Float32Array | number[] | IVector3,
		c: Float32Array | number[] | IVector3,
		out: Cube = new Cube(),
	): Cube => {
		Vector3.add(a.min, b, out.min);
		Vector3.add(a.max, c, out.max);

		return out;
	};

	public static surfaceArea = (a: ICube): number => {
		Cube.getSize(a, ta);

		return (ta.x * ta.y + ta.x * ta.z + ta.y * ta.z) * 2;
	};

	public static translate = (a: ICube, b: Float32Array | number[] | IVector3, out: Cube = new Cube()): Cube => {
		Vector3.add(a.min, b, out.min);
		Vector3.add(a.max, b, out.max);

		return out;
	};

	public static union = (a: ICube, b: ICube, out: Cube = new Cube()): Cube => {
		Vector3.min(a.min, b.min, out.min);
		Vector3.max(a.max, b.max, out.max);

		return out;
	};

	public static volume = (a: ICube): number => {
		return (a.max[0] - a.min[0]) * (a.max[1] - a.min[1]) * (a.max[2] - a.min[2]);
	};

	public static width = (a: ICube): number => {
		return a.max[0] - a.min[0];
	};

	public min: Vector3 = new Vector3();
	public max: Vector3 = new Vector3();
	public constructor(a: Vector3Like = new Vector3(), b: Vector3Like = Vector3.VECTOR3_ONE) {
		Vector3.min(a, b, this.min);
		Vector3.max(a, b, this.max);
	}
}

let i: number;
let j: number;
let p0: number;
let p1: number;
let p2: number;
let r: number;

function satForAxes(
	axes: number[] | Float32Array,
	v0: Float32Array,
	v1: Float32Array,
	v2: Float32Array,
	extents: Float32Array,
) {
	for (i = 0, j = axes.length - 3; i <= j; i += 3) {
		Vector3.fromArray(axes, i, vA);
		// project the aabb onto the seperating axis
		r = extents[0] * Math.abs(vA[0]) + extents[1] * Math.abs(vA[1]) + extents[2] * Math.abs(vA[2]);
		// project all 3 vertices of the triangle onto the seperating axis
		p0 = Vector3.dot(v0, vA);
		p1 = Vector3.dot(v1, vA);
		p2 = Vector3.dot(v2, vA);
		// actual test, basically see if either of the most extreme of the triangle points intersects r
		if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) {
			// points of the projected triangle are outside the projected half-length of the aabb
			// the axis is seperating and we can exit
			return false;
		}
	}

	return true;
}
