import ISphere from "./interfaces/ISphere";
import { IVector3 } from "../vector";
import ICube from "./interfaces/ICube";
export default class Sphere implements ISphere {
    position: IVector3;
    radius: number;
    constructor(position?: IVector3, radius?: number);
}
export declare const boundingBox: (a: ISphere, out?: ICube) => ICube;
export declare const containsPoint: (a: ISphere, b: IVector3Data) => boolean;
export declare const distanceToPoint: (a: ISphere, b: IVector3Data) => number;
export declare const equals: (a: ISphere, b: ISphere) => any;
export declare const intersectsSphere: (a: ISphere, b: ISphere) => boolean;
