import { ITriangle2 } from "./interfaces/ITriangle2";
import { Vector2 } from "../vector/Vector2";
export declare class Triangle2 implements ITriangle2 {
    static area: (t: ITriangle2) => number;
    static create: (a?: Vector2, b?: Vector2, c?: Vector2) => ITriangle2;
    static getABLength: (t: ITriangle2) => number;
    static getBCLength: (t: ITriangle2) => number;
    static getCALength: (t: ITriangle2) => number;
    static normal: (t: ITriangle2) => number;
    static toFloat32Array: (t: ITriangle2, out?: Float32Array) => Float32Array;
    a: Vector2;
    b: Vector2;
    c: Vector2;
    constructor(a?: Vector2, b?: Vector2, c?: Vector2);
}
