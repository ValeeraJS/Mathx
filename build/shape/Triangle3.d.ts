import { IVector3 } from "../vector/Vector3";
import ITriangle3 from "./interfaces/ITriangle";
export default class Triangle3 implements ITriangle3 {
    static area: (t: ITriangle3) => number;
    static create: (a?: Float32Array, b?: Float32Array, c?: Float32Array) => ITriangle3;
    static getABLength: (t: ITriangle3) => number;
    static getBCLength: (t: ITriangle3) => number;
    static getCALength: (t: ITriangle3) => number;
    static normal: (t: ITriangle3, out?: IVector3) => IVector3;
    static toFloat32Array: (t: ITriangle3, out?: Float32Array) => Float32Array;
    a: Float32Array;
    b: Float32Array;
    c: Float32Array;
    constructor(a?: Float32Array, b?: Float32Array, c?: Float32Array);
}
