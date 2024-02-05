import { Vector3, Vector3Like } from "../vector/Vector3";
import { ITriangle3 } from "./interfaces/ITriangle3";
export declare class Triangle3 implements ITriangle3 {
    static area: (t: ITriangle3) => number;
    static centerOfGravity: <T extends Vector3Like>(t: ITriangle3, out?: T) => T;
    static containsPoint: (t: ITriangle3, epsilon: number | undefined, point: Vector3Like) => boolean;
    static cosAngle: (t: ITriangle3, point: "a" | "b" | "c" | Vector3Like) => number;
    static create: (a?: Vector3, b?: Vector3, c?: Vector3) => Triangle3;
    static getABLength: (t: ITriangle3) => number;
    static getBCLength: (t: ITriangle3) => number;
    static getCALength: (t: ITriangle3) => number;
    static normal: <T extends Vector3Like = Vector3>(t: ITriangle3, out?: T) => T;
    static toFloat32Array: (t: ITriangle3, out?: Float32Array) => Float32Array;
    a: Vector3;
    b: Vector3;
    c: Vector3;
    constructor(a?: Vector3, b?: Vector3, c?: Vector3);
}
