import { Vector3, Vector3Like } from "../vector/Vector3";
import { IRay3 } from "./interfaces/IRay3";
import { ISphere } from "../shape/interfaces/ISphere";
import { Plane3 } from "../shape/Plane3";
import { ITriangle3 } from "../shape";
import { Matrix4Like } from "../matrix";
import { Vector2Like } from "../vector";
export declare class Ray3 implements IRay3 {
    static at: <T extends Vector3Like = Vector3>(a: IRay3, b: number, out?: T) => T;
    static distanceToPlane: (ray: IRay3, plane: Plane3) => number | null;
    static distanceToPoint: (a: IRay3, point: Vector3Like) => number;
    static distanceSqToPoint: (a: IRay3, point: Vector3Like) => number;
    static fromCameraMatrixAndScreenCoord(projectionMatrix: Matrix4Like, worldMatrix: Matrix4Like, screenCoord: Vector2Like, out?: Ray3): Ray3;
    static lookAt: (a: IRay3, b: Vector3Like, out?: Ray3) => Ray3;
    static intersectPlane3Point: <T extends Vector3Like = Vector3>(ray: IRay3, plane: Plane3, out?: T) => T | null;
    static intersectSpherePoint: <T extends Vector3Like = Vector3>(ray: IRay3, sphere: ISphere, out?: T) => T | null;
    static intersectsTriangle3Point: <T extends Vector3Like = Vector3>(ray: IRay3, triangle: ITriangle3, epsilon: number | undefined, out: T) => T | null;
    static intersectsPlane3: (ray: IRay3, plane: Plane3) => boolean;
    static intersectsSphere: (ray: IRay3, sphere: ISphere) => boolean;
    static recast: (ray: IRay3, distance: number, out?: Ray3) => Ray3;
    position: Vector3;
    direction: Vector3;
    constructor(position?: Vector3Like, direction?: Vector3Like);
}
