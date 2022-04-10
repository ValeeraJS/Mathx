import { IVector2 } from "./../vector/Vector2";
export default class Matrix2 extends Float32Array {
    static readonly UNIT_MATRIX2: Matrix2;
    static add: (a: Float32Array | number[] | Matrix2, b: Float32Array | number[] | Matrix2, out: Matrix2) => Matrix2;
    static adjoint: (a: Float32Array | number[] | Matrix2, out: Matrix2) => Matrix2;
    static closeTo: (a: Float32Array | number[] | Matrix2, b: Float32Array | number[] | Matrix2) => boolean;
    static create: (a?: number[]) => Matrix2;
    static determinant: (a: Float32Array | number[] | Matrix2) => number;
    static equals: (a: Float32Array | number[] | Matrix2, b: Float32Array | number[] | Matrix2) => boolean;
    static frobNorm: (a: Float32Array | number[] | Matrix2) => number;
    static fromRotation: (rad: number, out?: Matrix2) => Matrix2;
    static fromScaling: (v: Float32Array | IVector2 | number[], out?: Matrix2) => Matrix2;
    static identity: (out?: Matrix2) => Float32Array;
    static invert: (a: Float32Array | Matrix2 | number[], out?: Matrix2) => Matrix2 | null;
    static minus: (a: Float32Array | Matrix2 | number[], b: Float32Array | Matrix2 | number[], out?: Matrix2) => Float32Array;
    static multiply: (a: Float32Array | Matrix2 | number[], b: Float32Array | Matrix2 | number[], out?: Matrix2) => Float32Array;
    static multiplyScalar: (a: Float32Array | Matrix2 | number[], b: number, out?: Matrix2) => Float32Array;
    static rotate: (a: Float32Array | Matrix2 | number[], rad: number, out?: Matrix2) => Float32Array;
    static scale: (a: Float32Array | Matrix2 | number[], v: Float32Array | IVector2 | number[], out?: Matrix2) => Float32Array;
    static toString: (a: Float32Array | Matrix2 | number[]) => string;
    static transpose: (a: Float32Array | Matrix2 | number[], out?: Matrix2) => Float32Array;
    constructor(data?: number[] | Float32Array | Matrix2);
}
