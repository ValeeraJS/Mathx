import { Vector3, Vector3Like } from "../vector/Vector3";
import { IRay3 } from "./interfaces/IRay3";
import { ISphere } from "../shape/interfaces/ISphere";
import { Plane3 } from "../shape/Plane3";
export declare class Ray3 implements IRay3 {
    static at: (a: IRay3, b: number, out?: Vector3) => Vector3;
    static distanceToPlane: (ray: Ray3, plane: Plane3) => number | null;
    static distanceToPoint: (a: IRay3, point: Vector3Like) => number;
    static distanceSqToPoint: (a: IRay3, point: Vector3Like) => number;
    static lookAt: (a: IRay3, b: Vector3Like, out?: Ray3) => Ray3;
    static intersectPlanePoint: (ray: Ray3, plane: Plane3, out?: Vector3) => Vector3 | null;
    static intersectSpherePoint: (ray: IRay3, sphere: ISphere, target: Vector3) => null | Vector3;
    static isIntersectSphere: (ray: IRay3, sphere: ISphere) => boolean;
    static intersectsPlane: (ray: Ray3, plane: Plane3) => boolean;
    static recast: (ray: IRay3, distance: number, out?: Ray3) => Ray3;
    position: Vector3;
    direction: Vector3;
    constructor(position?: Vector3Like, direction?: Vector3Like);
}
