import IPolar from "../polar/interfaces/IPolar";
import IVector2 from "./interfaces/IVector2";
/**
 * @class
 * @classdesc 二维向量
 * @implements {Mathx.IVector2}
 * @name Mathx.Vector2
 * @desc 极坐标，遵守数学右手定则。规定逆时针方向为正方向。
 * @param {number} [x=0] | 距离极点距离
 * @param {number} [y=0] | 旋转弧度，规定0弧度为笛卡尔坐标系x轴方向
 */
export default class Vector2 implements IVector2 {
    static create(x?: number, y?: number): Vector2;
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    add(vec2: IVector2): this;
    addScalar(num: number): this;
    addVectors(...vecArr: IVector2[]): this;
    angle(): number;
    ceil(): this;
    clamp(min: IVector2, max: IVector2): this;
    clampSafe(min: IVector2, max: IVector2): this;
    clampLength(min: number, max: number): this;
    clampScalar(min: number, max: number): this;
    closeTo(vec2: IVector2, epsilon?: number): boolean;
    closeToRect(vec2: IVector2, epsilon?: number): boolean;
    closeToManhattan(vec2: IVector2, epsilon?: number): boolean;
    clone(): Vector2;
    cross(vec2: IVector2): number;
    distanceTo(vec2: IVector2): number;
    distanceToManhattan(vec2: IVector2): number;
    distanceToSquared(vec2: IVector2): number;
    divide(v: IVector2): this;
    divideScalar(scalar: number): this;
    dot(vec2: IVector2): number;
    equals(vec2: IVector2): boolean;
    floor(): this;
    from(vec2: IVector2): this;
    fromArray(arr: number[], index?: number): this;
    fromPolar(p: IPolar): this;
    fromScalar(value?: number): this;
    length(): number;
    lengthManhattan(): number;
    lengthSquared(): number;
    lerp(vec2: IVector2, alpha: number): this;
    max(vec2: IVector2): this;
    min(vec2: IVector2): this;
    minus(vec2: IVector2): this;
    minusScalar(num: number): this;
    minusVectors(...vecArr: IVector2[]): this;
    multiplyScalar(scalar: number): this;
    negate(): this;
    normalize(): this;
    rotate(angle: number, center?: IVector2): this;
    round(): this;
    floorToZero(): this;
    set(x?: number, y?: number): this;
    setLength(length: number): this;
    setX(x?: number): this;
    setY(y?: number): this;
    toArray(arr?: number[]): number[];
    toJson(json?: IVector2): IVector2;
    toPalorJson(p?: {
        a: number;
        r: number;
    }): IPolar;
    toString(): string;
}
