import { Vector3, IVector3, Vector3Like } from "./../vector/Vector3";
import { Cube } from "./Cube";
import { ICube } from "./interfaces/ICube";
import { ISphere } from "./interfaces/ISphere";

let r = 0;

export class Sphere implements ISphere {
	public static boundingBox = (a: ISphere, out: Cube = new Cube()): ICube => {
		Vector3.minusScalar(a.position, a.radius, out.min);
		Vector3.addScalar(a.position, a.radius, out.max);

		return out;
	};

	public static containsPoint = (a: ISphere, b: IVector3 | number[] | Float32Array): boolean => {
		return Vector3.distanceToSquared(a.position, b) <= a.radius * a.radius;
	};

	public static distanceToPoint = (a: ISphere, b: IVector3 | number[] | Float32Array): number => {
		return Vector3.distanceTo(a.position, b) - a.radius;
	};

	public static equals = (a: ISphere, b: ISphere): boolean => {
		return Vector3.equals(a.position, b.position) && a.radius === b.radius;
	};

	public static intersectsSphere = (a: ISphere, b: ISphere): boolean => {
		r = a.radius + b.radius;

		return Vector3.distanceToSquared(a.position, b.position) <= r * r;
	};

	public position: Vector3 = new Vector3();
	public radius: number;

	public constructor(position: Vector3Like = Vector3.VECTOR3_ZERO, radius = 1) {
		this.position.set(position);
		this.radius = radius;
	}
}
