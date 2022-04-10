import { IPairs2Float32 } from "../common/interfaces/IPairs2";
import { IPolar } from "../polar";
declare let x: number, y: number;
export interface IVector2Json {
    x: number;
    y: number;
}
export interface IVector2 extends IPairs2Float32, IVector2Json {
}
export default class Vector2 extends Float32Array implements IVector2 {
    static readonly VECTOR2_ZERO: Float32Array;
    static readonly VECTOR2_TOP: Float32Array;
    static readonly VECTOR2_BOTTOM: Float32Array;
    static readonly VECTOR2_LEFT: Float32Array;
    static readonly VECTOR2_RIGHT: Float32Array;
    static add: (a: Float32Array | number[] | IVector2, b: Float32Array | number[] | IVector2, out?: IVector2) => IVector2;
    static addScalar: (a: Float32Array | number[], b: number, out?: IVector2) => IVector2;
    static angle: (a: Float32Array | number[] | IVector2) => number;
    static ceil: (a: Float32Array | number[] | IVector2, out?: IVector2) => IVector2;
    static clamp: (a: Float32Array | number[] | IVector2, min: Float32Array | number[] | IVector2, max: Float32Array | number[] | IVector2, out?: IVector2) => IVector2;
    static clampSafe: (a: Float32Array | number[] | IVector2, min: Float32Array | number[] | IVector2, max: Float32Array | number[] | IVector2, out?: IVector2) => IVector2;
    static clampLength: (a: Float32Array | number[] | IVector2, min: Float32Array | number[] | IVector2, max: Float32Array | number[] | IVector2, out?: IVector2) => IVector2;
    static clampScalar: (a: Float32Array | number[] | IVector2, min: number, max: number, out?: IVector2) => IVector2;
    static closeTo: (a: Float32Array | number[] | IVector2, b: Float32Array | number[] | IVector2, epsilon?: number) => boolean;
    static closeToRect: (a: Float32Array | number[] | IVector2, b: Float32Array | number[] | IVector2, epsilon?: number) => boolean;
    static closeToManhattan: (a: Float32Array | IVector2 | number[], b: Float32Array | IVector2 | number[], epsilon?: number) => boolean;
    static clone: (a: Float32Array | number[] | IVector2, out?: IVector2) => IVector2;
    static cross: (a: Float32Array | number[] | IVector2, b: Float32Array | number[] | IVector2) => number;
    static create: (x?: number, y?: number, out?: IVector2) => IVector2;
    static distanceTo: (a: Float32Array | number[] | IVector2, b: Float32Array | number[] | IVector2) => number;
    static distanceToManhattan: (a: Float32Array | number[] | IVector2, b: Float32Array | number[] | IVector2) => number;
    static distanceToSquared: (a: Float32Array | number[] | IVector2, b: Float32Array | number[] | IVector2) => number;
    static divide: (a: Float32Array | number[] | IVector2, b: Float32Array | number[] | IVector2, out?: IVector2) => IVector2;
    static divideScalar: (a: Float32Array | number[] | IVector2, scalar: number, out?: IVector2) => IVector2;
    static dot: (a: Float32Array | number[] | IVector2, b: Float32Array | number[] | IVector2) => number;
    static equals: (a: Float32Array | number[] | IVector2, b: Float32Array | number[] | IVector2) => boolean;
    static floor: (a: Float32Array | number[] | IVector2, out?: IVector2) => IVector2;
    static floorToZero: (a: Float32Array | number[] | IVector2, out?: IVector2) => IVector2;
    static fromArray: (arr: IVector2 | number[] | Float32Array, index?: number, out?: IVector2) => IVector2;
    static fromJson: (j: {
        x: number;
        y: number;
    }, out?: IVector2) => IVector2;
    static fromPolar: (p: IPolar, out?: IVector2) => IVector2;
    static fromScalar: (value?: number, out?: IVector2) => IVector2;
    static inverse: (a: Float32Array | number[] | IVector2, out?: IVector2) => IVector2;
    static norm: (a: Float32Array | number[] | IVector2) => number;
    static lengthManhattan: (a: Float32Array | number[] | IVector2) => number;
    static lengthSquared: (a: Float32Array | number[] | IVector2) => number;
    static lerp: (a: Float32Array | number[] | IVector2, b: Float32Array | number[] | IVector2, alpha: number, out?: IVector2) => IVector2;
    static max: (a: Float32Array | number[] | IVector2, b: Float32Array | number[] | IVector2, out?: IVector2) => IVector2;
    static min: (a: Float32Array | number[] | IVector2, b: Float32Array | number[] | IVector2, out?: IVector2) => IVector2;
    static minus: (a: Float32Array | number[] | IVector2, b: Float32Array | number[] | IVector2, out?: IVector2) => IVector2;
    static minusScalar: (a: Float32Array | number[] | IVector2, num: number, out?: IVector2) => IVector2;
    static multiply: (a: Float32Array | number[] | IVector2, b: Float32Array | number[] | IVector2, out?: IVector2) => IVector2;
    static multiplyScalar: (a: Float32Array | number[] | IVector2, scalar: number, out?: IVector2) => IVector2;
    static negate: (a: Float32Array | number[] | IVector2, out?: IVector2) => IVector2;
    static normalize: (a: Float32Array | number[] | IVector2, out?: IVector2) => IVector2;
    static random: (norm?: number, out?: IVector2) => IVector2;
    static rotate: (a: Float32Array | number[] | IVector2, angle: number, center?: Float32Array | number[] | IVector2, out?: IVector2) => IVector2;
    static round: (a: Float32Array | number[] | IVector2, out?: IVector2) => IVector2;
    static set: (x?: number, y?: number, out?: IVector2) => IVector2;
    static setLength: (a: Float32Array | number[] | IVector2, length: number, out?: IVector2) => IVector2;
    static toArray: (a: Float32Array | number[] | IVector2, arr?: number[]) => number[];
    static toPalorJson: (a: Float32Array | number[] | IVector2, p?: {
        a: number;
        r: number;
    }) => IPolar;
    static toString: (a: Float32Array | number[] | IVector2) => string;
    static transformMatrix3: (a: Float32Array | number[] | IVector2, m: Float32Array | number[], out: Vector2) => Vector2;
    readonly length: 2;
    constructor(x?: number, y?: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
}
export {};
