import { IPairs4Float32 } from "../common/interfaces/IPairs4";
export interface IVector4Json {
    x: number;
    y: number;
    z: number;
    w: number;
}
export interface IVector4 extends IPairs4Float32, IVector4Json {
}
export default class Vector4 extends Float32Array implements IVector4 {
    static add: (a: Float32Array | IVector4 | number[], b: Float32Array | IVector4 | number[], out?: IVector4) => IVector4;
    static ceil: (a: Float32Array | IVector4 | number[], out?: IVector4) => IVector4;
    static closeTo: (a: Float32Array | IVector4 | number[], b: Float32Array | IVector4 | number[]) => boolean;
    static create: (x?: number, y?: number, z?: number, w?: number, out?: IVector4) => IVector4;
    static cross: (u: Float32Array | IVector4 | number[], v: Float32Array | IVector4 | number[], w: Float32Array | IVector4 | number[], out?: Float32Array) => Float32Array;
    static distanceTo: (a: Float32Array | IVector4 | number[], b: Float32Array | IVector4 | number[]) => number;
    static distanceToSquared: (a: Float32Array | IVector4 | number[], b: Float32Array | IVector4 | number[]) => number;
    static divide: (a: Float32Array | IVector4 | number[], b: Float32Array | IVector4 | number[], out?: IVector4) => IVector4;
    static dot: (a: Float32Array | IVector4 | number[], b: Float32Array | IVector4 | number[]) => number;
    static equals: (a: Float32Array | IVector4 | number[], b: Float32Array | IVector4 | number[]) => boolean;
    static floor: (a: Float32Array | IVector4 | number[], out?: IVector4) => IVector4;
    static fromValues: (x: number, y: number, z: number, w: number, out?: IVector4) => IVector4;
    static inverse: (a: Float32Array | IVector4 | number[], out?: IVector4) => IVector4;
    static norm: (a: Float32Array | IVector4 | number[]) => number;
    static lengthSquared: (a: Float32Array | IVector4 | number[]) => number;
    static lerp: (a: Float32Array | IVector4 | number[], b: Float32Array | IVector4 | number[], t: number, out?: IVector4) => IVector4;
    static max: (a: Float32Array | IVector4 | number[], b: Float32Array | IVector4 | number[], out?: IVector4) => IVector4;
    static min: (a: Float32Array | IVector4 | number[], b: Float32Array | IVector4 | number[], out?: IVector4) => IVector4;
    static minus: (a: Float32Array | IVector4 | number[], b: Float32Array | IVector4 | number[], out?: IVector4) => IVector4;
    static multiply: (a: Float32Array | IVector4 | number[], b: Float32Array | IVector4 | number[], out?: IVector4) => IVector4;
    static multiplyScalar: (a: Float32Array | IVector4 | number[], b: number, out?: IVector4) => IVector4;
    static negate: (a: Float32Array | IVector4 | number[], out?: IVector4) => IVector4;
    static normalize: (a: Float32Array | IVector4 | number[], out?: IVector4) => IVector4;
    static round: (a: Float32Array | IVector4 | number[], out?: IVector4) => IVector4;
    static toString: (a: Float32Array | IVector4 | number[]) => string;
    static transformMatrix4: (a: Float32Array | IVector4 | number[], m: Float32Array, out?: IVector4) => IVector4;
    static transformQuat: (a: Float32Array | IVector4 | number[], q: Float32Array | number[], out?: IVector4) => IVector4;
    readonly length: 4;
    constructor(x?: number, y?: number, z?: number, w?: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get z(): number;
    set z(value: number);
    get w(): number;
    set w(value: number);
}
