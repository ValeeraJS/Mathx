import clamp from "../common/clamp";
import clampSafe from "../common/clampSafe";
import closeTo from "../common/closeTo";
import { EPSILON } from "../constants";
import floorToZero from "../common/floorToZero";
import IPolar from "../polar/interfaces/IPolar";
import IVector2 from "./interfaces/IVector2";

let len: number, x: number, y: number, c: number, s: number;

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
	public static create(x = 0, y = 0): Vector2 {
		return new Vector2(x, y);
	}

	public x: number;
	public y: number;

	public constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	public add(vec2: IVector2): this {
		this.x += vec2.x;
		this.y += vec2.y;

		return this;
	}

	public addScalar(num: number): this {
		this.x += num;
		this.y += num;

		return this;
	}

	public addVectors(...vecArr: IVector2[]): this {
		len = vecArr.length;
		for (let i = 0; i < len; i++) {
			this.add(vecArr[i]);
		}

		return this;
	}

	public angle(): number {
		return Math.atan2(this.y, this.x);
	}

	public ceil(): this {
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);

		return this;
	}

	public clamp(min: IVector2, max: IVector2): this {
		this.x = clamp(this.x, min.x, max.x);
		this.y = clamp(this.y, min.y, max.y);

		return this;
	}

	public clampSafe(min: IVector2, max: IVector2): this {
		this.x = clampSafe(this.x, min.x, max.x);
		this.y = clampSafe(this.y, min.y, max.y);

		return this;
	}

	public clampLength(min: number, max: number): this {
		len = this.length();

		return this.divideScalar(len || 1).multiplyScalar(clamp(len, min, max));
	}

	public clampScalar(min: number, max: number): this {
		this.x = clamp(this.x, min, max);
		this.y = clamp(this.y, min, max);

		return this;
	}

	public closeTo(vec2: IVector2, epsilon = EPSILON): boolean {
		return this.distanceTo(vec2) <= epsilon;
	}

	public closeToRect(vec2: IVector2, epsilon = EPSILON): boolean {
		return closeTo(this.x, vec2.x, epsilon) && closeTo(this.y, vec2.y, epsilon);
	}

	public closeToManhattan(vec2: IVector2, epsilon = EPSILON): boolean {
		return this.distanceToManhattan(vec2) <= epsilon;
	}

	public clone(): Vector2 {
		return new Vector2(this.x, this.y);
	}

	public cross(vec2: IVector2): number {
		return this.x * vec2.y - this.y * vec2.x;
	}

	public distanceTo(vec2: IVector2): number {
		return Math.sqrt(this.distanceToSquared(vec2));
	}

	public distanceToManhattan(vec2: IVector2): number {
		return Math.abs(this.x - vec2.x) + Math.abs(this.y - vec2.y);
	}

	public distanceToSquared(vec2: IVector2): number {
		x = this.x - vec2.x;
		y = this.y - vec2.y;

		return x * x + y * y;
	}

	public divide(v: IVector2): this {
		this.x /= v.x;
		this.y /= v.y;

		return this;
	}

	public divideScalar(scalar: number): this {
		return this.multiplyScalar(1 / scalar);
	}

	public dot(vec2: IVector2): number {
		return this.x * vec2.x + this.y * vec2.y;
	}

	public equals(vec2: IVector2): boolean {
		return vec2.x === this.x && vec2.y === this.y;
	}

	public floor(): this {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);

		return this;
	}

	public from(vec2: IVector2): this {
		this.x = vec2.x;
		this.y = vec2.y;

		return this;
	}

	public fromArray(arr: number[], index = 0): this {
		this.x = arr[index];
		this.y = arr[index + 1];

		return this;
	}

	public fromPolar(p: IPolar): this {
		this.x = Math.cos(p.a) * p.r;
		this.y = Math.sin(p.a) * p.r;

		return this;
	}

	public fromScalar(value = 0): this {
		this.x = this.y = value;

		return this;
	}

	public length(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	public lengthManhattan(): number {
		return Math.abs(this.x) + Math.abs(this.y);
	}

	public lengthSquared(): number {
		return this.x * this.x + this.y * this.y;
	}

	public lerp(vec2: IVector2, alpha: number): this {
		this.x += (vec2.x - this.x) * alpha;
		this.y += (vec2.y - this.y) * alpha;

		return this;
	}

	public max(vec2: IVector2): this {
		this.x = Math.max(this.x, vec2.x);
		this.y = Math.max(this.y, vec2.y);

		return this;
	}

	public min(vec2: IVector2): this {
		this.x = Math.min(this.x, vec2.x);
		this.y = Math.min(this.y, vec2.y);

		return this;
	}

	public minus(vec2: IVector2): this {
		this.x -= vec2.x;
		this.y -= vec2.y;

		return this;
	}

	public minusScalar(num: number): this {
		this.x -= num;
		this.y -= num;

		return this;
	}

	public minusVectors(...vecArr: IVector2[]): this {
		len = vecArr.length;
		for (let i = 0; i < len; i++) {
			this.minus(vecArr[i]);
		}

		return this;
	}

	public multiplyScalar(scalar: number): this {
		this.x *= scalar;
		this.y *= scalar;

		return this;
	}

	public negate(): this {
		this.x = -this.x;
		this.y = -this.y;

		return this;
	}

	public normalize(): this {
		return this.divideScalar(this.length() || 1);
	}

	public rotate(angle: number, center: IVector2 = { x: 0, y: 0 }): this {
		c = Math.cos(angle);
		s = Math.sin(angle);

		x = this.x - center.x;
		y = this.y - center.y;

		this.x = x * c - y * s + center.x;
		this.y = x * s + y * c + center.y;

		return this;
	}

	public round(): this {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);

		return this;
	}

	public floorToZero(): this {
		this.x = floorToZero(this.x);
		this.y = floorToZero(this.y);

		return this;
	}

	public set(x = 0, y = 0): this {
		this.x = x;
		this.y = y;

		return this;
	}

	public setLength(length: number): this {
		return this.normalize().multiplyScalar(length);
	}

	public setX(x = 0): this {
		this.x = x;

		return this;
	}

	public setY(y = 0): this {
		this.y = y;

		return this;
	}

	public toArray(arr: number[] = []): number[] {
		arr[0] = this.x;
		arr[1] = this.y;

		return arr;
	}

	public toJson(json: IVector2 = { x: 0, y: 0 }): IVector2 {
		json.x = this.x;
		json.y = this.y;

		return json;
	}

	public toPalorJson(p = {r: 0, a: 0}): IPolar {
		p.r = this.length();
		p.a = this.angle();

		return p;
	}

	public toString(): string {
		return `(${this.x}, ${this.y})`;
	}
}
