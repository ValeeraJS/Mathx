import { Sphere } from "./Sphere";
import { Vector3, Vector3Like } from "../vector/Vector3";
export declare class Plane3 {
    static normalize(p: Plane3, out?: Plane3): Plane3;
    normal: Vector3;
    distance: number;
    constructor(normal?: Vector3, distance?: number);
    distanceToPoint(point: Vector3Like): number;
    distanceToSphere(sphere: Sphere): number;
    from(p: Plane3): void;
    fromCoplanarPoints(a: Vector3Like, b: Vector3Like, c: Vector3Like): this;
    formCoplanarPointAndNormal(point: Vector3Like, normal: Vector3Like): this;
    negate(): this;
    normalize(): this;
    projectPoint(point: Vector3Like, out?: Vector3): Vector3;
    set(normal: Vector3Like, distance?: number): this;
}
