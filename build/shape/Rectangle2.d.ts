import { IVector2 } from "../vector/Vector2";
import IRectangle2 from "./interfaces/IRectangle2";
export default class Rectangle2 implements IRectangle2 {
    static area: (a: IRectangle2) => number;
    static containsPoint: (rect: IRectangle2, a: Float32Array) => boolean;
    static containsRectangle: (rect: IRectangle2, box: IRectangle2) => boolean;
    static create: (a?: Float32Array, b?: Float32Array) => IRectangle2;
    static equals: (a: IRectangle2, b: IRectangle2) => boolean;
    static getCenter: (a: IRectangle2, out?: IVector2) => IVector2;
    static getSize: (a: IRectangle2, out?: IVector2) => IVector2;
    static height: (a: IRectangle2) => number;
    static intersect: (a: IRectangle2, b: IRectangle2, out?: IRectangle2) => IRectangle2;
    static stretch: (a: IRectangle2, b: Float32Array | IVector2 | number[], c: Float32Array | IVector2 | number[], out?: IRectangle2) => IRectangle2;
    static translate: (a: IRectangle2, b: Float32Array | IVector2 | number[], out?: IRectangle2) => IRectangle2;
    static union: (a: IRectangle2, b: IRectangle2, out?: IRectangle2) => IRectangle2;
    static width: (a: IRectangle2) => number;
    min: IVector2;
    max: IVector2;
    constructor(a?: IVector2 | Float32Array | number[], b?: IVector2 | Float32Array | number[]);
}
