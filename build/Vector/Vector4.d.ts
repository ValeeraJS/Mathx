export interface IVector4Json {
    x: number;
    y: number;
    z: number;
    w: number;
}
export interface IVector4 extends Float32Array, IVector4Json {
}
export type Vector4Like = IVector4 | Vector4 | number[] | Float32Array;
export declare class Vector4 extends Float32Array implements IVector4 {
    static readonly VECTOR3_ZERO: Vector4;
    static readonly VECTOR3_ONE: Vector4;
    static add: (a: Vector4Like, b: Vector4Like, out?: Vector4) => Vector4;
    static ceil: (a: Vector4Like, out?: Vector4) => Vector4;
    static closeTo: (a: Vector4Like, b: Vector4Like) => boolean;
    static create: (x?: number, y?: number, z?: number, w?: number, out?: Vector4) => Vector4;
    static cross: (u: Vector4Like, v: Vector4Like, w: Vector4Like, out?: Vector4) => Vector4;
    static distanceTo: (a: Vector4Like, b: Vector4Like) => number;
    static distanceToSquared: (a: Vector4Like, b: Vector4Like) => number;
    static divide: (a: Vector4Like, b: Vector4Like, out?: Vector4) => Vector4;
    static dot: (a: Vector4Like, b: Vector4Like) => number;
    static equals: (a: Vector4Like, b: Vector4Like) => boolean;
    static floor: (a: Vector4Like, out?: Vector4) => Vector4;
    static fromValues: (x: number, y: number, z: number, w: number, out?: Vector4) => Vector4;
    static inverse: (a: Vector4Like, out?: Vector4) => Vector4;
    static norm: (a: Vector4Like) => number;
    static lengthSquared: (a: Vector4Like) => number;
    static lerp: (a: Vector4Like, b: Vector4Like, t: number, out?: Vector4) => Vector4;
    static max: (a: Vector4Like, b: Vector4Like, out?: Vector4) => Vector4;
    static min: (a: Vector4Like, b: Vector4Like, out?: Vector4) => Vector4;
    static minus: (a: Vector4Like, b: Vector4Like, out?: Vector4) => Vector4;
    static multiply: (a: Vector4Like, b: Vector4Like, out?: Vector4) => Vector4;
    static multiplyScalar: (a: Vector4Like, b: number, out?: Vector4) => Vector4;
    static negate: (a: Vector4Like, out?: Vector4) => Vector4;
    static normalize: (a: Vector4Like, out?: Vector4) => Vector4;
    static round: (a: Vector4Like, out?: Vector4) => Vector4;
    static set: (x?: number, y?: number, z?: number, w?: number, out?: Vector4) => Vector4;
    static setNorm: (a: Vector4Like, length: number, out?: Vector4) => Vector4;
    static toString: (a: Vector4Like) => string;
    static transformMatrix4: (a: Vector4Like, m: Float32Array, out?: Vector4) => Vector4;
    static transformQuat: (a: Vector4Like, q: Float32Array | number[], out?: Vector4) => Vector4;
    readonly length: 4;
    readonly dataType: string;
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
