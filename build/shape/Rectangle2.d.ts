import { IVector2 } from "../vector/Vector2";
import IRectangle from "./interfaces/IRectangle";
export default class Rectangle2 implements IRectangle {
    static area: (a: IRectangle) => number;
    static containsPoint: (rect: IRectangle, a: Float32Array) => boolean;
    static containsRectangle: (rect: IRectangle, box: IRectangle) => boolean;
    static create: (a?: Float32Array, b?: Float32Array) => IRectangle;
    static equals: (a: IRectangle, b: IRectangle) => boolean;
    static getCenter: (a: IRectangle, out?: IVector2) => IVector2;
    static getSize: (a: IRectangle, out?: IVector2) => IVector2;
    static height: (a: IRectangle) => number;
    static intersect: (a: IRectangle, b: IRectangle, out?: IRectangle) => IRectangle;
    static stretch: (a: IRectangle, b: Float32Array | IVector2 | number[], c: Float32Array | IVector2 | number[], out?: IRectangle) => IRectangle;
    static translate: (a: IRectangle, b: Float32Array | IVector2 | number[], out?: IRectangle) => IRectangle;
    static union: (a: IRectangle, b: IRectangle, out?: IRectangle) => IRectangle;
    static width: (a: IRectangle) => number;
    min: IVector2;
    max: IVector2;
    constructor(a?: IVector2 | Float32Array | number[], b?: IVector2 | Float32Array | number[]);
}
