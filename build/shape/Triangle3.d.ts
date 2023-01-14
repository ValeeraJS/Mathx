import Vector3, { Vector3Like } from "../vector/Vector3";
import ITriangle3 from "./interfaces/ITriangle3";
export default class Triangle3 implements ITriangle3 {
    static area: (t: ITriangle3) => number;
    static create: (a?: Vector3, b?: Vector3, c?: Vector3) => ITriangle3;
    static getABLength: (t: ITriangle3) => number;
    static getBCLength: (t: ITriangle3) => number;
    static getCALength: (t: ITriangle3) => number;
    static normal: (t: ITriangle3, out?: Vector3Like) => Vector3Like;
    static toFloat32Array: (t: ITriangle3, out?: Float32Array) => Float32Array;
    a: Vector3;
    b: Vector3;
    c: Vector3;
    constructor(a?: Vector3, b?: Vector3, c?: Vector3);
}
