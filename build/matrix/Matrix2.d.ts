import { Vector2Like } from "./../vector/Vector2";
export type Matrix2Like = Matrix2 | Float32Array | number[];
export declare class Matrix2 extends Float32Array {
    static readonly UNIT_MATRIX2: Matrix2;
    static add: <T extends Matrix2Like>(a: Matrix2Like, b: Matrix2Like, out?: T) => T;
    static adjoint: <T extends Matrix2Like>(a: Matrix2Like, out?: T) => T;
    static clone: <T extends Matrix2Like>(source: Matrix2Like, out?: T) => T;
    static closeTo: (a: Matrix2Like, b: Matrix2Like) => boolean;
    static create: (a?: Matrix2Like) => Matrix2;
    static determinant: (a: Matrix2Like) => number;
    static equals: (a: Matrix2Like, b: Matrix2Like) => boolean;
    static frobNorm: (a: Matrix2Like) => number;
    static fromArray: <T extends Matrix2Like>(source: Matrix2Like, out?: T) => T;
    static fromRotation: <T extends Matrix2Like>(rad: number, out?: T) => T;
    static fromScaling: <T extends Matrix2Like>(v: Vector2Like, out?: T) => T;
    static identity: <T extends Matrix2Like>(out?: T) => T;
    static invert: <T extends Matrix2Like>(a: Matrix2Like, out?: T) => T | null;
    static lerp: <T extends Matrix2Like>(a: Matrix2Like, b: Matrix2Like, alpha: number, out?: T) => T;
    static minus: <T extends Matrix2Like>(a: Matrix2Like, b: Matrix2Like, out?: T) => T;
    static multiply: <T extends Matrix2Like>(a: Matrix2Like, b: Matrix2Like, out?: T) => T;
    static multiplyScalar: <T extends Matrix2Like>(a: Matrix2Like, b: number, out?: T) => T;
    static rotate: <T extends Matrix2Like>(a: Matrix2Like, rad: number, out?: T) => T;
    static scale: <T extends Matrix2Like>(a: Matrix2Like, v: Vector2Like, out?: T) => T;
    static toString: (a: Matrix2Like) => string;
    static transpose: <T extends Matrix2Like>(a: Matrix2Like, out?: T) => T;
    constructor(data?: Matrix2Like);
}
