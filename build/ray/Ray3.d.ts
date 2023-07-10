import { Vector3, Vector3Like } from "../vector/Vector3";
import { IRay3 } from "./interfaces/IRay3";
import { ISphere } from "../shape/interfaces/ISphere";
import { Plane3 } from "../shape/Plane3";
export declare class Ray3 implements IRay3 {
    static at: <T extends Vector3Like = Vector3>(a: IRay3, b: number, out?: T) => T;
    static distanceToPlane: (ray: Ray3, plane: Plane3) => number | null;
    static distanceToPoint: (a: IRay3, point: Vector3Like) => number;
    static distanceSqToPoint: (a: IRay3, point: Vector3Like) => number;
    static lookAt: (a: IRay3, b: Vector3Like, out?: Ray3) => Ray3;
    static intersectPlanePoint: <T extends Vector3Like = Vector3>(ray: Ray3, plane: Plane3, out?: T) => T | null;
    static intersectSpherePoint: <T extends Vector3Like = Vector3>(ray: IRay3, sphere: ISphere, out?: T) => T | null;
    static isIntersectSphere: (ray: IRay3, sphere: ISphere) => boolean;
    static intersectsPlane: (ray: Ray3, plane: Plane3) => boolean;
    static recast: (ray: IRay3, distance: number, out?: Ray3) => Ray3;
    position: Vector3;
    direction: Vector3;
    constructor(position?: Vector3Like, direction?: Vector3Like);
}
