import { Vector2, Vector2Like } from "../vector/Vector2";
import { IRectangle2 } from "./interfaces/IRectangle2";
export declare class Rectangle2 implements IRectangle2 {
    static area: (a: IRectangle2) => number;
    static containsPoint: (rect: IRectangle2, a: Float32Array) => boolean;
    static containsRectangle: (rect: IRectangle2, box: IRectangle2) => boolean;
    static create: (a?: Vector2Like, b?: Vector2Like) => Rectangle2;
    static equals: (a: IRectangle2, b: IRectangle2) => boolean;
    static getCenter: (a: IRectangle2, out?: Vector2) => Vector2;
    static getSize: (a: IRectangle2, out?: Vector2) => Vector2;
    static height: (a: IRectangle2) => number;
    static intersect: (a: IRectangle2, b: IRectangle2, out?: Rectangle2) => Rectangle2;
    static stretch: (a: IRectangle2, b: Vector2Like, c: Vector2Like, out?: Rectangle2) => Rectangle2;
    static translate: (a: IRectangle2, b: Vector2Like, out?: Rectangle2) => Rectangle2;
    static union: (a: IRectangle2, b: IRectangle2, out?: Rectangle2) => Rectangle2;
    static width: (a: IRectangle2) => number;
    min: Vector2;
    max: Vector2;
    constructor(a?: Vector2Like, b?: Vector2Like);
}
