import { Matrix4, Matrix4Like } from "./../matrix/Matrix4";
import { Vector3, IVector3, Vector3Like } from "./../vector/Vector3";
import { Cube } from "./Cube";
import { ICube } from "./interfaces/ICube";
import { ISphere } from "./interfaces/ISphere";

let r = 0;
let v = new Vector3();

export class Sphere implements ISphere {
	public static containsPoint = (a: ISphere, b: IVector3 | number[] | Float32Array): boolean => {
		return Vector3.distanceToSquared(a.position, b) <= a.radius * a.radius;
	};

	public static distanceToPoint = (a: ISphere, b: IVector3 | number[] | Float32Array): number => {
		return Vector3.distanceTo(a.position, b) - a.radius;
	};

	public static equals = (a: ISphere, b: ISphere): boolean => {
		return Vector3.equals(a.position, b.position) && a.radius === b.radius;
	};

	public static fromBoundingBox = (a: ICube, out: ISphere = new Sphere()): ISphere => {
		Cube.center(a, out.position);
		Cube.size(a, v);
		out.radius = Vector3.norm(v) * 0.5;

		return out;
	};

	public static intersectsSphere = (a: ISphere, b: ISphere): boolean => {
		r = a.radius + b.radius;

		return Vector3.distanceToSquared(a.position, b.position) <= r * r;
	};

	public static transformMatrix4 = (a: ISphere, b: Matrix4Like, out: ISphere): ISphere => {
		Vector3.transformMatrix4(a.position, b, out.position);
		out.radius = a.radius * Matrix4.maxScale(b);

		return out;
	};

	public position: Vector3 = new Vector3();
	public radius: number;

	public constructor(position: Vector3Like = Vector3.VECTOR3_ZERO, radius = 1) {
		this.position.set(position);
		this.radius = radius;
	}
}
