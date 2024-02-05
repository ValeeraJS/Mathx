import { Sphere } from "./Sphere";
import { Vector3, Vector3Like } from "../vector/Vector3";
import { ITriangle3 } from "./interfaces/ITriangle3";

const v1 = new Vector3();
const v2 = new Vector3();
const v3 = new Vector3();

export class Plane3 {
	static normalize(p: Plane3, out: Plane3 = new Plane3()): Plane3 {
		const normal = p.normal;

		const factor = 1.0 / Vector3.norm(normal);
		Vector3.multiplyScalar(normal, factor, out.normal);
		out.distance = p.distance * factor;

		return out;
	}
	public normal: Vector3 = new Vector3();
	public distance: number;
	constructor(normal: Vector3 = Vector3.VECTOR3_TOP, distance: number = 0) {
		this.normal.set(normal);
		this.distance = distance;
	}

	distanceToPoint(point: Vector3Like): number {
		return Vector3.dot(this.normal, point) + this.distance;
	}

	distanceToSphere(sphere: Sphere): number {
		return this.distanceToPoint(sphere.position) - sphere.radius;
	}

	from(p: Plane3) {
		this.distance = p.distance;
		this.normal.set(p.normal);
	}

	fromCoplanarPoints(a: Vector3Like, b: Vector3Like, c: Vector3Like): this {
		Vector3.minus(b, a, v1);
		Vector3.minus(c, a, v2);
		Vector3.cross(v1, v2, v3);
		Vector3.normalize(v3, v3);

		// TODO check zero vec

		return this.formCoplanarPointAndNormal(a, v3);
	}

	formCoplanarPointAndNormal(point: Vector3Like, normal: Vector3Like): this {
		this.normal.set(normal);
		this.distance = -Vector3.dot(point, normal);

		return this;
	}

	fromTriangle3(triangle: ITriangle3): this {
		return this.fromCoplanarPoints(triangle.a, triangle.b, triangle.c);
	}

	negate(): this {
		this.distance *= -1;
		Vector3.negate(this.normal, this.normal);

		return this;
	}

	normalize(): this {
		Plane3.normalize(this, this);

		return this;
	}

	projectPoint<T extends Vector3Like = Vector3>(point: Vector3Like, out: T = new Vector3() as T): T {
		Vector3.fromArray(this.normal, 0, out);
		Vector3.multiplyScalar(out, -this.distanceToPoint(point), out);

		return Vector3.add(out, point, out);
	}

	set(normal: Vector3Like, distance = this.distance): this {
		this.normal.set(normal);
		this.distance = distance;

		return this;
	}
}
