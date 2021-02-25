import ICube from "./interfaces/ICube";
import { IVector3Data } from "../vector/interfaces/IVector3";
export default class Cube implements ICube {
    min: IVector3Data;
    max: IVector3Data;
    constructor(a?: IVector3Data, b?: IVector3Data);
}
export declare const containsPoint: (a: IVector3Data) => boolean;
export declare const containsCube: (box: ICube) => boolean;
export declare const depth: (a: ICube) => number;
export declare const equals: (a: ICube, b: ICube) => boolean;
export declare const getCenter: (a: ICube, out?: IVector3Data) => IVector3Data;
export declare const getSize: (a: ICube, out?: IVector3Data) => IVector3Data;
export declare const height: (a: ICube) => number;
export declare const intersect: (a: ICube, b: ICube, out?: ICube) => ICube;
export declare const round: (a: ICube, out?: ICube) => ICube;
export declare const stretch: (a: ICube, b: IVector3Data, c: IVector3Data, out?: ICube) => ICube;
export declare const translate: (a: ICube, b: IVector3Data, out?: ICube) => typeof globalThis;
export declare const union: (a: ICube, b: ICube, out?: ICube) => ICube;
export declare const volume: (a: ICube) => number;
export declare const width: (a: ICube) => number;
