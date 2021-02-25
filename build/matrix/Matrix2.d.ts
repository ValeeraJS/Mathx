import { IVector2 } from "../vector";
import IMatrix2, { IMatrix2Data } from "./interfaces/IMatrix2";
export declare const UNIT_MATRIX2_DATA: IMatrix2Data;
export default class Matrix2 extends Float32Array implements IMatrix2 {
    readonly isMatrix2 = true;
    readonly length: 4;
    static readonly UNIT_MATRIX: Readonly<Matrix2>;
    constructor(data?: IMatrix2Data);
}
export declare const add: (a: IMatrix2Data, b: IMatrix2Data, out: IMatrix2Data) => IMatrix2Data;
export declare const adjoint: (a: IMatrix2Data, out: IMatrix2Data) => IMatrix2Data;
export declare const closeTo: (a: IMatrix2Data, b: IMatrix2Data) => boolean;
export declare const create: (a?: IMatrix2Data) => IMatrix2Data;
export declare const determinant: (a: IMatrix2Data) => number;
export declare const equals: (a: IMatrix2Data, b: IMatrix2Data) => boolean;
export declare const frobNorm: (a: IMatrix2Data) => number;
export declare const from: (a: IMatrix2Data, out?: IMatrix2Data) => IMatrix2Data;
export declare const fromRotation: (rad: number, out: IMatrix2Data) => IMatrix2Data;
export declare const fromScaling: (v: IVector2, out: IMatrix2Data) => IMatrix2Data;
export declare const identity: (out: IMatrix2Data) => IMatrix2Data;
export declare function invert(a: IMatrix2Data, out: IMatrix2Data): IMatrix2Data | null;
export declare function minus(a: IMatrix2Data, b: IMatrix2Data, out: IMatrix2Data): IMatrix2Data;
export declare const multiply: (a: IMatrix2Data, b: IMatrix2Data, out: IMatrix2Data) => IMatrix2Data;
export declare const multiplyScalar: (a: IMatrix2Data, b: number, out: IMatrix2Data) => IMatrix2Data;
export declare const rotate: (a: IMatrix2Data, rad: number, out: IMatrix2Data) => IMatrix2Data;
export declare const scale: (a: IMatrix2Data, v: IVector2, out: IMatrix2Data) => IMatrix2Data;
export declare function toString(a: IMatrix2Data): string;
export declare const transpose: (a: IMatrix2Data, out?: IMatrix2Data) => IMatrix2Data;
