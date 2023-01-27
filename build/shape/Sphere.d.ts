import { Vector3, IVector3, Vector3Like } from "./../vector/Vector3";
import { Cube } from "./Cube";
import { ICube } from "./interfaces/ICube";
import { ISphere } from "./interfaces/ISphere";
export declare class Sphere implements ISphere {
    static boundingBox: (a: ISphere, out?: Cube) => ICube;
    static containsPoint: (a: ISphere, b: IVector3 | number[] | Float32Array) => boolean;
    static distanceToPoint: (a: ISphere, b: IVector3 | number[] | Float32Array) => number;
    static equals: (a: ISphere, b: ISphere) => boolean;
    static intersectsSphere: (a: ISphere, b: ISphere) => boolean;
    position: Vector3;
    radius: number;
    constructor(position?: Vector3Like, radius?: number);
}
