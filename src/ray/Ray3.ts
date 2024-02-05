import { Vector3, Vector3Like } from "../vector/Vector3";
import { IRay3 } from "./interfaces/IRay3";
import { ISphere } from "../shape/interfaces/ISphere";
import { Plane3 } from "../shape/Plane3";
import { ITriangle3, Triangle3 } from "../shape";
import { EPSILON } from "../constants";
import { Matrix4, Matrix4Like } from "../matrix";
import { Vector2Like } from "../vector";

let dis: number;
let r2: number;
let d2: number;
const v = new Vector3();

export class Ray3 implements IRay3 {
	public static at = <T extends Vector3Like = Vector3>(a: IRay3, b: number, out: T = new Vector3() as T): T => {
		Vector3.multiplyScalar(a.direction, b, out);

		return Vector3.add(a.position, out, out);
	};

	public static distanceToPlane = (ray: IRay3, plane: Plane3) => {
		const denominator = Vector3.dot(plane.normal, ray.direction);

		if (denominator === 0) {
			// line is coplanar, return origin
			if (plane.distanceToPoint(ray.position) === 0) {
				return 0;
			}
			return null;
		}

		const t = -(Vector3.dot(ray.position, plane.normal) + plane.distance) / denominator;

		return t >= 0 ? t : null;
	};

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

	public static fromCameraMatrixAndScreenCoord(projectionMatrix: Matrix4Like, worldMatrix: Matrix4Like, screenCoord: Vector2Like, out: Ray3 = new Ray3): Ray3 {
		Vector3.fromMatrix4Translate(worldMatrix, out.position);
		Vector3.fromXYZ(screenCoord[0], screenCoord[1], 0.5, out.direction);

		Matrix4.unproject(out.direction, projectionMatrix, worldMatrix, out.direction);
		Vector3.minus(out.direction, out.position, out.direction);
		Vector3.normalize(out.direction, out.direction);

		return out;
	}

	public static lookAt = (a: IRay3, b: Vector3Like, out: Ray3 = new Ray3()): Ray3 => {
		if (a !== out) {
			Vector3.fromArray(a.position, 0, out.position);
		}

		Vector3.normalize(Vector3.minus(b, a.position, out.direction));

		return out;
	};

	public static intersectPlane3Point = <T extends Vector3Like = Vector3>(
		ray: IRay3,
		plane: Plane3,
		out: T = new Vector3() as T,
	): T | null => {
		const t = Ray3.distanceToPlane(ray, plane);

		if (t === null) {
			return null;
		}

		return Ray3.at(ray, t, out);
	};

	public static intersectSpherePoint = <T extends Vector3Like = Vector3>(
		ray: IRay3,
		sphere: ISphere,
		out: T = new Vector3() as T,
	): null | T => {
		Vector3.minus(sphere.position, ray.position, v);
		dis = Vector3.dot(v, ray.direction);
		d2 = Vector3.dot(v, v) - dis * dis;
		r2 = sphere.radius * sphere.radius;

		if (d2 > r2) return null;

		const thc = Math.sqrt(r2 - d2);

		const t0 = dis - thc;

		const t1 = dis + thc;

		if (t0 < 0 && t1 < 0) return null;

		if (t0 < 0) return Ray3.at(ray, t1, out);

		return Ray3.at(ray, t0, out);
	};

	public static intersectsTriangle3Point = <T extends Vector3Like = Vector3>(ray: IRay3, triangle: ITriangle3, epsilon = EPSILON, out: T): null | T => {
		const plane = new Plane3();
		plane.fromTriangle3(triangle);

		const result = Ray3.intersectPlane3Point(ray, plane, out);
		if (!result) {
			return null;
		}		

		const isInTriangle = Triangle3.containsPoint(triangle, epsilon, out);

		if (!isInTriangle) {
			return null;
		}
		
		return out;
	}

	public static intersectsPlane3 = (ray: IRay3, plane: Plane3): boolean => {
		const distToPoint = plane.distanceToPoint(ray.position);

		if (distToPoint === 0) {
			return true;
		}

		const denominator = Vector3.dot(plane.normal, ray.direction);

		if (denominator * distToPoint < 0) {
			return true;
		}

		return false;
	};

	public static intersectsSphere = (ray: IRay3, sphere: ISphere): boolean => {
		return Ray3.distanceSqToPoint(ray, sphere.position) <= sphere.radius * sphere.radius;
	};

	public static recast = (ray: IRay3, distance: number, out: Ray3 = new Ray3()): Ray3 => {
		v.set(Ray3.at(ray, distance));
		out.direction.set(v);

		return out;
	};

	public position: Vector3 = new Vector3();
	public direction: Vector3 = new Vector3();
	public constructor(position: Vector3Like = Vector3.VECTOR3_ZERO, direction: Vector3Like = Vector3.VECTOR3_BACK) {
		this.position.set(position);
		Vector3.normalize(direction, this.direction);
	}
}
