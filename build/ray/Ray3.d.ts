import { Vector3Like } from "../vector/Vector3";
import IRay3 from "./interfaces/IRay3";
import ISphere from "../shape/interfaces/ISphere";
export default class Ray3 implements IRay3 {
    static at: (a: IRay3, b: number, out?: Vector3Like) => Vector3Like;
    static distanceToPoint: (a: IRay3, point: Vector3Like) => number;
    static distanceSqToPoint: (a: IRay3, point: Vector3Like) => number;
    static lookAt: (a: IRay3, b: Vector3Like, out?: IRay3) => IRay3;
    static intersectSphere: (ray: IRay3, sphere: ISphere, target: Vector3Like) => null | Vector3Like;
    static intersectsSphere: (ray: IRay3, sphere: ISphere) => boolean;
    position: Vector3Like;
    direction: Vector3Like;
    constructor(position?: Vector3Like, direction?: Vector3Like);
}
