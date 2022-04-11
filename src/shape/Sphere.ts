import Vector3, { IVector3, IVector3Data } from "../vector/interfaces/IVector3";
import Cube from "./Cube";
import ICube from "./interfaces/ICube";
import ISphere from "./interfaces/ISphere";

let r = 0;

export default class Sphere implements ISphere {
	public static boundingBox = (a: ISphere, out: ICube = new Cube()): ICube => {
		Vector3.minusScalar(a.position, a.radius, out.min);
		Vector3.addScalar(a.position, a.radius, out.max);

		return out;
	};

	public static containsPoint = (a: ISphere, b: IVector3Data): boolean => {
		return Vector3.distanceToSquared(a.position, b) <= a.radius * a.radius;
	};

	public static distanceToPoint = (a: ISphere, b: IVector3Data): number => {
		return Vector3.distanceTo(a.position, b) - a.radius;
	};

	public static equals = (a: ISphere, b: ISphere): boolean => {
		return Vector3.equals(a.position, b.position) && a.radius === b.radius;
	};

	public static intersectsSphere = (a: ISphere, b: ISphere): boolean => {
		r = a.radius + b.radius;

		return Vector3.distanceToSquared(a.position, b.position) <= r * r;
	};

	public position: IVector3;
	public radius: number;

	public constructor(position: IVector3 = new Vector3(), radius = 1) {
		this.position = position;
		this.radius = radius;
	}
}
