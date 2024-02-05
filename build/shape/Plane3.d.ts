import { Sphere } from "./Sphere";
import { Vector3, Vector3Like } from "../vector/Vector3";
import { ITriangle3 } from "./interfaces/ITriangle3";
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
    fromTriangle3(triangle: ITriangle3): this;
    negate(): this;
    normalize(): this;
    projectPoint<T extends Vector3Like = Vector3>(point: Vector3Like, out?: T): T;
    set(normal: Vector3Like, distance?: number): this;
}
