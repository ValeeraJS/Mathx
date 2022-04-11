import { IVector3 } from "../vector/Vector3";
import ITriangle3 from "./interfaces/ITriangle";
export default class Triangle3 implements ITriangle3 {
    a: Float32Array;
    b: Float32Array;
    c: Float32Array;
    constructor(a?: Float32Array, b?: Float32Array, c?: Float32Array);
}
export declare const area: (t: ITriangle3) => number;
export declare const create: (a?: Float32Array, b?: Float32Array, c?: Float32Array) => ITriangle3;
export declare const getABLength: (t: ITriangle3) => number;
export declare const getBCLength: (t: ITriangle3) => number;
export declare const getCALength: (t: ITriangle3) => number;
export declare const normal: (t: ITriangle3, out?: IVector3) => IVector3;
export declare const toFloat32Array: (t: ITriangle3, out?: Float32Array) => Float32Array;
