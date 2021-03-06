import ICube from "./interfaces/ICube";
import ISphere from "./interfaces/ISphere";
import ITriangle3 from "./interfaces/ITriangle";
export default class Cube implements ICube {
    min: Float32Array;
    max: Float32Array;
    constructor(a?: Float32Array, b?: Float32Array);
}
export declare const clampPoint: (a: ICube, point: Float32Array, out?: Float32Array) => Float32Array;
export declare const containsPoint: (a: ICube, b: Float32Array) => boolean;
export declare const containsCube: (a: ICube, b: ICube) => boolean;
export declare const depth: (a: ICube) => number;
export declare const equals: (a: ICube, b: ICube) => boolean;
export declare const getCenter: (a: ICube, out?: Float32Array) => Float32Array;
export declare const getSize: (a: ICube, out?: Float32Array) => Float32Array;
export declare const height: (a: ICube) => number;
export declare const intersect: (a: ICube, b: ICube, out?: ICube) => ICube;
export declare const intersectsBox: (a: ICube, b: ICube) => boolean;
export declare const intersectsSphere: (a: ICube, b: ISphere) => boolean;
export declare const intersectsTriangle: (a: ICube, b: ITriangle3) => boolean;
export declare const isEmpty: (a: ICube) => boolean;
export declare const round: (a: ICube, out?: ICube) => ICube;
export declare const size: (a: ICube, out?: Float32Array) => Float32Array;
export declare const stretch: (a: ICube, b: Float32Array, c: Float32Array, out?: ICube) => ICube;
export declare const translate: (a: ICube, b: Float32Array, out?: ICube) => typeof globalThis;
export declare const union: (a: ICube, b: ICube, out?: ICube) => ICube;
export declare const volume: (a: ICube) => number;
export declare const width: (a: ICube) => number;
