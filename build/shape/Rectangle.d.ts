import IRectangle from "./interfaces/IRectangle";
import { IVector2Data } from "../vector/interfaces/IVector2";
export default class Rectangle implements IRectangle {
    min: IVector2Data;
    max: IVector2Data;
    constructor(a?: IVector2Data, b?: IVector2Data);
}
export declare const area: (a: IRectangle) => number;
export declare const containsPoint: (a: IVector2Data) => boolean;
export declare const containsRectangle: (box: IRectangle) => boolean;
export declare const equals: (a: IRectangle, b: IRectangle) => boolean;
export declare const getCenter: (a: IRectangle, out?: IVector2Data) => IVector2Data;
export declare const getSize: (a: IRectangle, out?: IVector2Data) => IVector2Data;
export declare const height: (a: IRectangle) => number;
export declare const intersect: (a: IRectangle, b: IRectangle, out?: IRectangle) => IRectangle;
export declare const stretch: (a: IRectangle, b: IVector2Data, c: IVector2Data, out?: IRectangle) => IRectangle;
export declare const translate: (a: IRectangle, b: IVector2Data, out?: IRectangle) => typeof globalThis;
export declare const union: (a: IRectangle, b: IRectangle, out?: IRectangle) => IRectangle;
export declare const width: (a: IRectangle) => number;
