import type { Matrix4Like } from "../matrix";
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
    static readonly VECTOR4_ZERO: Vector4;
    static readonly VECTOR4_ONE: Vector4;
    static add: <T extends Vector4Like = Vector4>(a: Vector4Like, b: Vector4Like, out?: T) => T;
    static ceil: <T extends Vector4Like = Vector4>(a: Vector4Like, out?: T) => T;
    static closeTo: (a: Vector4Like, b: Vector4Like, epsilon?: number) => boolean;
    static closeToRect: (a: Vector4Like, b: Vector4Like, epsilon?: number) => boolean;
    static create: (x?: number, y?: number, z?: number, w?: number) => Vector4;
    static cross: <T extends Vector4Like = Vector4>(u: Vector4Like, v: Vector4Like, w: Vector4Like, out?: T) => T;
    static distanceTo: (a: Vector4Like, b: Vector4Like) => number;
    static distanceToSquared: (a: Vector4Like, b: Vector4Like) => number;
    static divide: <T extends Vector4Like = Vector4>(a: Vector4Like, b: Vector4Like, out?: T) => T;
    static dot: (a: Vector4Like, b: Vector4Like) => number;
    static equals: (a: Vector4Like, b: Vector4Like) => boolean;
    static floor: <T extends Vector4Like = Vector4>(a: Vector4Like, out?: T) => T;
    static fromArray: <T extends Vector4Like = Vector4>(a: ArrayLike<number> | Vector4Like, offset?: number, out?: T) => T;
    static fromScalar: <T extends Vector4Like = Vector4>(num: number, out?: T) => T;
    static fromXYZW: <T extends Vector4Like = Vector4>(x: number, y: number, z: number, w: number, out?: T) => T;
    static inverse: <T extends Vector4Like = Vector4>(a: Vector4Like, out?: T) => T;
    static norm: (a: Vector4Like) => number;
    static lengthSquared: (a: Vector4Like) => number;
    static lerp: <T extends Vector4Like = Vector4>(a: Vector4Like, b: Vector4Like, t: number, out?: T) => T;
    static max: <T extends Vector4Like = Vector4>(a: Vector4Like, b: Vector4Like, out?: T) => T;
    static min: <T extends Vector4Like = Vector4>(a: Vector4Like, b: Vector4Like, out?: T) => T;
    static minus: <T extends Vector4Like = Vector4>(a: Vector4Like, b: Vector4Like, out?: T) => T;
    static multiply: <T extends Vector4Like = Vector4>(a: Vector4Like, b: Vector4Like, out?: T) => T;
    static multiplyScalar: <T extends Vector4Like = Vector4>(a: Vector4Like, b: number, out?: T) => T;
    static negate: <T extends Vector4Like = Vector4>(a: Vector4Like, out?: T) => T;
    static normalize: <T extends Vector4Like = Vector4>(a: Vector4Like, out?: T) => T;
    static round: <T extends Vector4Like = Vector4>(a: Vector4Like, out?: T) => T;
    static setNorm: <T extends Vector4Like = Vector4>(a: Vector4Like, length: number, out?: T) => T;
    static toString: (a: Vector4Like) => string;
    static transformMatrix4: <T extends Vector4Like = Vector4>(a: Vector4Like, m: Matrix4Like, out?: T) => T;
    static transformQuat: <T extends Vector4Like = Vector4>(a: Vector4Like, q: Matrix4Like, out?: T) => T;
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
