import { IVector2 } from "../vector/Vector2";
import IRectangle from "./interfaces/IRectangle";
export default class Rectangle2 implements IRectangle {
    min: IVector2;
    max: IVector2;
    constructor(a?: Float32Array, b?: Float32Array);
}
export declare const area: (a: IRectangle) => number;
export declare const containsPoint: (rect: IRectangle, a: Float32Array) => boolean;
export declare const containsRectangle: (rect: IRectangle, box: IRectangle) => boolean;
export declare const create: (a?: Float32Array, b?: Float32Array) => IRectangle;
export declare const equals: (a: IRectangle, b: IRectangle) => boolean;
export declare const getCenter: (a: IRectangle, out?: IVector2) => Float32Array;
export declare const getSize: (a: IRectangle, out?: IVector2) => Float32Array;
export declare const height: (a: IRectangle) => number;
export declare const intersect: (a: IRectangle, b: IRectangle, out?: IRectangle) => IRectangle;
export declare const stretch: (a: IRectangle, b: Float32Array, c: Float32Array, out?: IRectangle) => IRectangle;
export declare const translate: (a: IRectangle, b: Float32Array, out?: IRectangle) => IRectangle;
export declare const union: (a: IRectangle, b: IRectangle, out?: IRectangle) => IRectangle;
export declare const width: (a: IRectangle) => number;
