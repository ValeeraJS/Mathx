import Vector3, { Vector3Like } from "../vector/Vector3";
import IRay3 from "./interfaces/IRay3";
import ISphere from "../shape/interfaces/ISphere";
import { Plane3 } from "../shape/Plane3";

let dis: number, r2: number, d2: number;
const v = new Vector3();

export default class Ray3 implements IRay3 {
	public static at = (a: IRay3, b: number, out: Vector3 = new Vector3()): Vector3 => {
		return Vector3.multiplyScalar(a.direction, b, out);
	};

	public static distanceToPlane = (ray: Ray3, plane: Plane3) => {
		const denominator = Vector3.dot(plane.normal, ray.direction);

		if (denominator === 0) {
			// line is coplanar, return origin
			if (plane.distanceToPoint(ray.position) === 0) {
				return 0;
			}
			return null;
		}

		const t = - (Vector3.dot(ray.position, plane.normal) + plane.distance) / denominator;

		return t >= 0 ? t : null;
	}

	public static distanceToPoint = (a: IRay3, point: Vector3Like): number => {
		return Math.sqrt(Ray3.distanceSqToPoint(a, point));
	};

	public static distanceSqToPoint = (a: IRay3, point: Vector3Like): number => {
		Vector3.minus(point, a.position, v);
		dis = Vector3.dot(v, a.direction);

		if (dis < 0) {
			return Vector3.distanceToSquared(a.position, point);
		}

		Vector3.multiplyScalar(a.direction, dis, v);
		Vector3.add(v, a.position, v);

		return Vector3.distanceToSquared(v, point);
	};

	public static lookAt = (a: IRay3, b: Vector3Like, out: Ray3 = new Ray3()): Ray3 => {
		if (a !== out) {
			Vector3.fromArray(a.position, 0, out.position);
		}

		Vector3.normalize(Vector3.minus(b, a.position, out.direction));

		return out;
	};

	public static intersectPlanePoint = (ray: Ray3, plane: Plane3, out: Vector3 = new Vector3()): Vector3 | null => {
		const t = Ray3.distanceToPlane(ray, plane);

		if (t === null) {
			return null;
		}

		return Ray3.at(ray, t, out);
	}

	public static intersectSpherePoint = (
		ray: IRay3,
		sphere: ISphere,
		target: Vector3
	): null | Vector3 => {
		Vector3.minus(sphere.position, ray.position, v);
		dis = Vector3.dot(v, ray.direction);
		d2 = Vector3.dot(v, v) - dis * dis;
		r2 = sphere.radius * sphere.radius;

		if (d2 > r2) return null;

		const thc = Math.sqrt(r2 - d2);

		const t0 = dis - thc;

		const t1 = dis + thc;

		if (t0 < 0 && t1 < 0) return null;

		if (t0 < 0) return Ray3.at(ray, t1, target);

		return Ray3.at(ray, t0, target);
	};

	public static isIntersectSphere = (ray: IRay3, sphere: ISphere): boolean => {
		return Ray3.distanceSqToPoint(ray, sphere.position) <= sphere.radius * sphere.radius;
	};

	public static intersectsPlane = (ray: Ray3, plane: Plane3): boolean => {
		const distToPoint = plane.distanceToPoint(ray.position);

		if (distToPoint === 0) {
			return true;
		}

		const denominator = Vector3.dot(plane.normal, ray.direction);

		if (denominator * distToPoint < 0) {
			return true;
		}

		return false;
	}

	public static recast = (ray: IRay3, distance: number, out: Ray3 = new Ray3()) => {
		v.set(Ray3.at(ray, distance));
		out.direction.set(v);

		return out;
	}

	public position: Vector3 = new Vector3();
	public direction: Vector3 = new Vector3();
	public constructor(
		position: Vector3Like = Vector3.VECTOR3_ZERO,
		direction: Vector3Like = Vector3.VECTOR3_BACK
	) {
		this.position.set(position)
		Vector3.normalize(direction, this.direction);
	}
}
