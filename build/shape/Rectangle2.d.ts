import { IVector2 } from "../vector/Vector2";
import { Vector2Like } from "../vector/Vector2";
import IRectangle2 from "./interfaces/IRectangle2";
export default class Rectangle2 implements IRectangle2 {
    static area: (a: IRectangle2) => number;
    static containsPoint: (rect: IRectangle2, a: Float32Array) => boolean;
    static containsRectangle: (rect: IRectangle2, box: IRectangle2) => boolean;
    static create: (a?: Vector2Like, b?: Vector2Like) => IRectangle2;
    static equals: (a: IRectangle2, b: IRectangle2) => boolean;
    static getCenter: (a: IRectangle2, out?: Vector2Like) => Vector2Like;
    static getSize: (a: IRectangle2, out?: Vector2Like) => Vector2Like;
    static height: (a: IRectangle2) => number;
    static intersect: (a: IRectangle2, b: IRectangle2, out?: IRectangle2) => IRectangle2;
    static stretch: (a: IRectangle2, b: Float32Array | IVector2 | number[], c: Float32Array | IVector2 | number[], out?: IRectangle2) => IRectangle2;
    static translate: (a: IRectangle2, b: Float32Array | IVector2 | number[], out?: IRectangle2) => IRectangle2;
    static union: (a: IRectangle2, b: IRectangle2, out?: IRectangle2) => IRectangle2;
    static width: (a: IRectangle2) => number;
    min: Vector2Like;
    max: Vector2Like;
    constructor(a?: Vector2Like, b?: Vector2Like);
}
