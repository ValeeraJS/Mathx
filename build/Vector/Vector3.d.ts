import type { Matrix3Like } from "../matrix/Matrix3";
import type { Matrix4Like } from "../matrix/Matrix4";
export interface IVector3Json {
    x: number;
    y: number;
    z: number;
}
export interface IVector3 extends Float32Array, IVector3Json {
}
export type Vector3Like = IVector3 | Vector3 | number[] | Float32Array;
export declare class Vector3 extends Float32Array implements IVector3 {
    static readonly VECTOR3_ZERO: Vector3;
    static readonly VECTOR3_ONE: Vector3;
    static readonly VECTOR3_TOP: Vector3;
    static readonly VECTOR3_BOTTOM: Vector3;
    static readonly VECTOR3_LEFT: Vector3;
    static readonly VECTOR3_RIGHT: Vector3;
    static readonly VECTOR3_FRONT: Vector3;
    static readonly VECTOR3_BACK: Vector3;
    static add: <T extends Vector3Like = Vector3>(a: Vector3Like, b: Vector3Like, out?: T) => T;
    static addScalar: <T extends Vector3Like = Vector3>(a: Vector3Like, b: number, out?: T) => T;
    static angle: (a: Vector3Like, b: Vector3Like) => number;
    static clamp: <T extends Vector3Like = Vector3>(a: Vector3Like, min: Vector3Like, max: Vector3Like, out?: T) => T;
    static clampSafe: <T extends Vector3Like = Vector3>(a: Vector3Like, min: Vector3Like, max: Vector3Like, out?: T) => T;
    static clampScalar: <T extends Vector3Like = Vector3>(a: Vector3Like, min: number, max: number, out?: T) => T;
    static clone: <T extends Vector3Like = Vector3>(a: Vector3Like, out?: T) => T;
    static closeTo: (a: Vector3Like, b: Vector3Like) => boolean;
    static create: (x?: number, y?: number, z?: number) => Vector3;
    static cross: <T extends Vector3Like = Vector3>(a: Vector3Like, b: Vector3Like, out?: T) => T;
    static distanceTo: (a: Vector3Like, b: Vector3Like) => number;
    static distanceToManhattan: (a: Vector3Like, b: Vector3Like) => number;
    static distanceToSquared: (a: Vector3Like, b: Vector3Like) => number;
    static divide: <T extends Vector3Like = Vector3>(a: Vector3Like, b: Vector3Like, out?: T) => T;
    static divideScalar: <T extends Vector3Like = Vector3>(a: Vector3Like, b: number, out?: T) => T;
    static dot: (a: Vector3Like, b: Vector3Like) => number;
    static equals: (a: Vector3Like, b: Vector3Like) => boolean;
    static floor: <T extends Vector3Like = Vector3>(a: Vector3Like, out?: T) => T;
    static fromArray: <T extends Vector3Like = Vector3>(a: ArrayLike<number> | Vector3Like, offset?: number, out?: T) => T;
    static fromScalar: <T extends Vector3Like = Vector3>(num: number, out?: T) => T;
    static fromValues: <T extends Vector3Like = Vector3>(x: number, y: number, z: number, out?: T) => T;
    static fromMatrix4Translate: <T extends Vector3Like = Vector3>(mat: Matrix4Like, out?: T) => T;
    static hermite: <T extends Vector3Like = Vector3>(a: Vector3Like, b: Vector3Like, c: Vector3Like, d: Vector3Like, t: number, out?: T) => T;
    static inverse: <T extends Vector3Like = Vector3>(a: Vector3Like, out?: T) => T;
    static norm: (a: Vector3Like) => number;
    static lengthManhattan: (a: Vector3Like) => number;
    static lengthSquared: (a: Vector3Like) => number;
    static lerp: <T extends Vector3Like = Vector3>(a: Vector3Like, b: Vector3Like, alpha: number, out?: T) => T;
    static max: <T extends Vector3Like = Vector3>(a: Vector3Like, b: Vector3Like, out?: T) => T;
    static min: <T extends Vector3Like = Vector3>(a: Vector3Like, b: Vector3Like, out?: T) => T;
    static minus: <T extends Vector3Like = Vector3>(a: Vector3Like, b: Vector3Like, out?: T) => T;
    static minusScalar: <T extends Vector3Like = Vector3>(a: Vector3Like, b: number, out?: T) => T;
    static multiply: <T extends Vector3Like = Vector3>(a: Vector3Like, b: Vector3Like, out?: T) => T;
    static multiplyScalar: <T extends Vector3Like = Vector3>(a: Vector3Like, scalar: number, out?: T) => T;
    static negate: <T extends Vector3Like = Vector3>(a: Vector3Like, out?: T) => T;
    static normalize: <T extends Vector3Like = Vector3>(a: Vector3Like, out?: T) => T;
    static opposite: <T extends Vector3Like = Vector3>(a: Vector3Like, center: Vector3Like, out?: T) => T;
    static reflect: <T extends Vector3Like = Vector3>(origin: Vector3Like, normal: Vector3Like, out?: T) => T;
    static rotateX: <T extends Vector3Like = Vector3>(a: Vector3Like, b: Vector3Like, rad: number, out?: T) => T;
    static rotateY: <T extends Vector3Like = Vector3>(a: Vector3Like, b: Vector3Like, rad: number, out?: T) => T;
    static rotateZ: <T extends Vector3Like = Vector3>(a: Vector3Like, b: Vector3Like, rad: number, out?: T) => T;
    static round: <T extends Vector3Like = Vector3>(a: Vector3Like, out?: T) => T;
    static setNorm: <T extends Vector3Like = Vector3>(a: Vector3Like, norm: number, out?: T) => T;
    static slerp: <T extends Vector3Like = Vector3>(a: Vector3Like, b: Vector3Like, t: number, out?: T) => T;
    static toString: (a: Vector3Like) => string;
    static transformMatrix3: <T extends Vector3Like = Vector3>(a: Vector3Like, m: Matrix3Like, out?: T) => T;
    static transformDirection: <T extends Vector3Like = Vector3>(a: Vector3Like, m: Matrix4Like, out?: T) => T;
    static transformMatrix4: <T extends Vector3Like = Vector3>(a: Vector3Like, m: Matrix4Like, out?: T) => T;
    static transformQuat: <T extends Vector3Like = Vector3>(a: Vector3Like, q: Vector3Like, out?: T) => T;
    static volume: (a: Vector3Like) => number;
    readonly dataType: string;
    constructor(x?: number, y?: number, z?: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get z(): number;
    set z(value: number);
}
