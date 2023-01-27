import { IPolar } from "../polar";
export interface IVector2Json {
    x: number;
    y: number;
}
export interface IVector2 extends Float32Array, IVector2Json {
}
export type Vector2Like = IVector2 | Vector2 | number[] | Float32Array;
export declare class Vector2 extends Float32Array implements IVector2 {
    static readonly VECTOR2_ZERO: Vector2;
    static readonly VECTOR2_TOP: Vector2;
    static readonly VECTOR2_BOTTOM: Vector2;
    static readonly VECTOR2_LEFT: Vector2;
    static readonly VECTOR2_RIGHT: Vector2;
    static readonly VECTOR2_ONE: Vector2;
    static add: (a: Vector2Like, b: Vector2Like, out?: Vector2) => Vector2;
    static addScalar: (a: Vector2Like, b: number, out?: Vector2) => Vector2;
    static angle: (a: Vector2Like) => number;
    static ceil: (a: Vector2Like, out?: Vector2) => Vector2;
    static clamp: (a: Vector2Like, min: Vector2Like, max: Vector2Like, out?: Vector2) => Vector2;
    static clampSafe: (a: Vector2Like, min: Vector2Like, max: Vector2Like, out?: Vector2) => Vector2;
    static clampLength: (a: Vector2Like, min: Vector2Like, max: Vector2Like, out?: Vector2) => Vector2;
    static clampScalar: (a: Vector2Like, min: number, max: number, out?: Vector2) => Vector2;
    static closeTo: (a: Vector2Like, b: Vector2Like, epsilon?: number) => boolean;
    static closeToRect: (a: Vector2Like, b: Vector2Like, epsilon?: number) => boolean;
    static closeToManhattan: (a: Vector2Like, b: Vector2Like, epsilon?: number) => boolean;
    static clone: (a: Vector2Like, out?: Vector2) => Vector2;
    static cross: (a: Vector2Like, b: Vector2Like) => number;
    static create: (x?: number, y?: number, out?: Vector2) => Vector2;
    static distanceTo: (a: Vector2Like, b: Vector2Like) => number;
    static distanceToManhattan: (a: Vector2Like, b: Vector2Like) => number;
    static distanceToSquared: (a: Vector2Like, b: Vector2Like) => number;
    static divide: (a: Vector2Like, b: Vector2Like, out?: Vector2) => Vector2;
    static divideScalar: (a: Vector2Like, scalar: number, out?: Vector2) => Vector2;
    static dot: (a: Vector2Like, b: Vector2Like) => number;
    static equals: (a: Vector2Like, b: Vector2Like) => boolean;
    static floor: (a: Vector2Like, out?: Vector2) => Vector2;
    static floorToZero: (a: Vector2Like, out?: Vector2) => Vector2;
    static fromArray: (arr: Vector2Like | ArrayLike<number>, index?: number, out?: Vector2) => Vector2;
    static fromJson: (j: IVector2Json, out?: Vector2) => Vector2;
    static fromPolar: (p: IPolar, out?: Vector2) => Vector2;
    static fromScalar: (value?: number, out?: Vector2) => Vector2;
    static inverse: (a: Vector2Like, out?: Vector2) => Vector2;
    static norm: (a: Vector2Like) => number;
    static lengthManhattan: (a: Vector2Like) => number;
    static lengthSquared: (a: Vector2Like) => number;
    static lerp: (a: Vector2Like, b: Vector2Like, alpha: number, out?: Vector2) => Vector2;
    static max: (a: Vector2Like, b: Vector2Like, out?: Vector2) => Vector2;
    static min: (a: Vector2Like, b: Vector2Like, out?: Vector2) => Vector2;
    static minus: (a: Vector2Like, b: Vector2Like, out?: Vector2) => Vector2;
    static minusScalar: (a: Vector2Like, num: number, out?: Vector2) => Vector2;
    static multiply: (a: Vector2Like, b: Vector2Like, out?: Vector2) => Vector2;
    static multiplyScalar: (a: Vector2Like, scalar: number, out?: Vector2) => Vector2;
    static negate: (a: Vector2Like, out?: Vector2) => Vector2;
    static normalize: (a: Vector2Like, out?: Vector2) => Vector2;
    static random: (norm?: number, out?: Vector2) => Vector2;
    static rotate: (a: Vector2Like, angle: number, center?: Vector2Like, out?: Vector2) => Vector2;
    static round: (a: Vector2Like, out?: Vector2) => Vector2;
    static set: (x?: number, y?: number, out?: Vector2) => Vector2;
    static setNorm: (a: Vector2Like, length: number, out?: Vector2) => Vector2;
    static toArray: (a: Vector2Like, arr?: number[]) => number[];
    static toPalorJson: (a: Vector2Like, p?: {
        a: number;
        r: number;
    }) => IPolar;
    static toString: (a: Vector2Like) => string;
    static transformMatrix3: (a: Vector2Like, m: Float32Array | number[], out?: Vector2) => Vector2;
    readonly length: 2;
    readonly dataType: string;
    constructor(x?: number, y?: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
}
