import { IPolar } from "./interfaces/IPolar";
export type PolarLike = Float32Array | Polar | number[];
/**
 * @class
 * @classdesc 极坐标
 * @implements {Mathx.IPolar}
 * @name Mathx.Polar
 * @desc 极坐标，遵守数学右手定则。规定逆时针方向为正方向。
 * @param {number} [r=0] | 距离极点距离
 * @param {number} [a=0] | 旋转弧度，规定0弧度为笛卡尔坐标系x轴方向
 */
export declare class Polar extends Float32Array implements IPolar {
    /**
     * @public
     * @method create
     * @memberof Mathx.Polar
     * @desc 创建一个极坐标
     * @param {number} [r=0] 距离
     * @param {number} [a=0] 弧度
     * @returns {Mathx.Polar} 新的极坐标实例
     */
    static create(r?: number, a?: number): Polar;
    static fromRA<T extends PolarLike>(r?: number, a?: number, out?: T): T;
    get a(): number;
    set a(v: number);
    get r(): number;
    set r(v: number);
    readonly dataType: string;
    /**
     * @public
     * @member {number} Mathx.Polar.prototype.a
     * @desc 旋转弧度
     * @default 0
     */
    /**
     * @public
     * @member {number} Mathx.Polar.prototype.r
     * @desc 距离
     * @default 0
     */
    constructor(r?: number, a?: number);
    /**
     * @public
     * @method Mathx.Polar.prototype.distanceTo
     * @desc 求该坐标到另一个极坐标的欧几里得距离
     * @param {Mathx.IPolar} p | 目标极坐标
     * @returns {number} 欧几里得距离
     */
    distanceTo(p: IPolar): number;
    /**
     * @public
     * @method Mathx.Polar.prototype.distanceToManhattan
     * @desc 求该坐标到另一个极坐标的曼哈顿距离
     * @param {Mathx.IPolar} p | 目标极坐标
     * @returns {number} 曼哈顿距离
     */
    distanceToManhattan({ r, a }: IPolar): number;
    /**
     * @public
     * @method Mathx.Polar.prototype.distanceToSquared
     * @desc 求该坐标到另一个极坐标的欧几里得距离平方
     * @param {Mathx.IPolar} p | 目标极坐标
     * @returns {number} 欧几里得距离平方
     */
    distanceToSquared({ r, a }: IPolar): number;
    /**
     * @public
     * @method Mathx.Polar.prototype.fromVector2
     * @desc 将一个二维向量数据转化为自身的极坐标值
     * @param {Mathx.IVector2} vector2 | 二维向量
     * @returns {number} this
     */
    fromVector2(v: Float32Array): this;
    /**
     * @public
     * @method Mathx.Polar.prototype.lengthManhattan
     * @desc 求自身离原点的曼哈顿距离
     * @returns {number} 曼哈顿距离
     */
    lengthManhattan(): number;
    /**
     * @public
     * @method Mathx.Polar.prototype.setA
     * @desc 设置极坐标的弧度
     * @param {number} [a=0] 角度
     * @returns {number} this
     */
    setA(a?: number): this;
    /**
     * @public
     * @method Mathx.Polar.prototype.setR
     * @desc 设置极坐标的弧度
     * @param {number} [r=0] 距离
     * @returns {number} this
     */
    setR(r?: number): this;
    /**
     * @public
     * @method Mathx.Polar.prototype.toJson
     * @desc 将极坐标转化为纯json对象，纯数据
     * @param {IPolar} [json] 被修改的json对象，如果不传则会新创建json对象。
     * @returns {Mathx.IPolar} json
     */
    toJson(json?: IPolar): IPolar;
    /**
     * @public
     * @method Mathx.Polar.prototype.toString
     * @desc 将极坐标转化为字符串
     * @returns {string} 形式为"(r, a)"的字符串
     */
    toString(): string;
    /**
     * @public
     * @method Mathx.Polar.prototype.x
     * @desc 获取极坐标对应二维向量的x的值
     * @returns {number} x
     */
    x(): number;
    /**
     * @public
     * @method Mathx.Polar.prototype.y
     * @desc 获取极坐标对应二维向量的y的值
     * @returns {number} y
     */
    y(): number;
}
