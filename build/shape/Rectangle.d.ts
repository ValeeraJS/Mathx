import IRectangle from "./interfaces/IRectangle";
import { IVector2Data } from "../vector/interfaces/IVector2";
export default class Rectangle implements IRectangle {
    min: IVector2Data;
    max: IVector2Data;
    constructor(a?: IVector2Data, b?: IVector2Data);
}
export declare const area: (a: IRectangle) => number;
export declare const containsPoint: (a: any) => boolean;
export declare const containsRectangle: (box: IRectangle) => boolean;
export declare const equals: (a: IRectangle, b: IRectangle) => boolean;
export declare const getCenter: (a: IRectangle, out?: any) => Float32Array;
export declare const getSize: (a: IRectangle, out?: any) => Float32Array;
export declare const height: (a: IRectangle) => number;
export declare const intersect: (a: IRectangle, b: IRectangle, out?: IRectangle) => IRectangle;
export declare const stretch: (a: IRectangle, b: any, c: any, out?: IRectangle) => IRectangle;
export declare const translate: (a: IRectangle, b: any, out?: IRectangle) => undefined;
export declare const union: (a: IRectangle, b: IRectangle, out?: IRectangle) => IRectangle;
export declare const width: (a: IRectangle) => number;
