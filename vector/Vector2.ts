import IVector2 from "./interfaces/IVector2";
import clamp from "../common/clamp";
import clampSafe from "../common/clampSafe";
import roundToZero from "../common/roundToZero";
import IPolar from "../polar/interfaces/IPolar";
import Polar from "../polar/Polar";

let len: number, x: number, y: number, c: number, s: number;

export default class Vector2 implements IVector2 {
    x: number;
    y: number;

    static create(x = 0, y = 0) {
        return new Vector2(x, y);
    }

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(vec2: IVector2) {
        this.x += vec2.x;
        this.y += vec2.y;

        return this;
    }

    addScalar(num: number) {
        this.x += num;
        this.y += num;

        return this;
    }

    addVectors(...vecArr: IVector2[]) {
        len = vecArr.length;
        for (let i = 0; i < len; i++) {
            this.add(vecArr[i]);
        }

        return this;
    }

    angle() {
        return Math.atan2(this.y, this.x);
    }

    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);

        return this;
    }

    clamp(min: IVector2, max: IVector2) {
        this.x = clamp(this.x, min.x, max.x);
        this.y = clamp(this.y, min.y, max.y);

        return this;
    }

    clampSafe(min: IVector2, max: IVector2) {
        this.x = clampSafe(this.x, min.x, max.x);
        this.y = clampSafe(this.y, min.y, max.y);

        return this;
    }

    clampLength(min: number, max: number) {
        len = this.length();

        return this.divideScalar(len || 1).multiplyScalar(clamp(len, min, max));
    }

    clampScalar(min: number, max: number) {
        this.x = clamp(this.x, min, max);
        this.y = clamp(this.y, min, max);

        return this;
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    cross(vec2: IVector2) {
        return this.x * vec2.y - this.y * vec2.x;
    }

    distanceTo(vec2: IVector2) {
        return Math.sqrt(this.distanceToSquared(vec2));
    }

    distanceToManhattan(vec2: IVector2) {
        return Math.abs(this.x - vec2.x) + Math.abs(this.y - vec2.y);
    }

    distanceToSquared(vec2: IVector2) {
        x = this.x - vec2.x;
        y = this.y - vec2.y;

        return x * x + y * y;
    }

    divide(v: IVector2) {
        this.x /= v.x;
        this.y /= v.y;

        return this;
    }

    divideScalar(scalar: number) {
        return this.multiplyScalar(1 / scalar);
    }

    dot(vec2: IVector2) {
        return this.x * vec2.x + this.y * vec2.y;
    }

    equals(vec2: IVector2) {
        return ((vec2.x === this.x) && (vec2.y === this.y));
    }

    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);

        return this;
    }

    from(vec2: IVector2) {
        this.x = vec2.x;
        this.y = vec2.y;

        return this;
    }

    fromArray(arr: number[], index = 0) {
        this.x = arr[index];
        this.y = arr[index + 1];

        return this;
    }

    fromPolar(p: IPolar) {
        this.x = Math.cos(p.a) * p.r;
        this.y = Math.sin(p.a) * p.r;

        return this;
    }

    fromScalar(value: number = 0) {
        this.x = this.y = value;

        return this;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    lengthManhattan() {
        return Math.abs(this.x) + Math.abs(this.y);
    }

    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }

    lerp(vec2: IVector2, alpha: number) {
        this.x += (vec2.x - this.x) * alpha;
        this.y += (vec2.y - this.y) * alpha;

        return this;
    }

    max(vec2: IVector2) {
        this.x = Math.max(this.x, vec2.x);
        this.y = Math.max(this.y, vec2.y);

        return this;
    }

    min(vec2: IVector2) {
        this.x = Math.min(this.x, vec2.x);
        this.y = Math.min(this.y, vec2.y);

        return this;
    }

    minus(vec2: IVector2) {
        this.x -= vec2.x;
        this.y -= vec2.y;

        return this;
    }

    minusScalar(num: number) {
        this.x -= num;
        this.y -= num;

        return this;
    }

    minusVectors(...vecArr: IVector2[]) {
        len = vecArr.length;
        for (let i = 0; i < len; i++) {
            this.minus(vecArr[i]);
        }

        return this;
    }

    multiplyScalar(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;

        return this;
    }

    negate() {
        this.x = - this.x;
        this.y = - this.y;

        return this;
    }

    normalize() {
        return this.divideScalar(this.length() || 1);
    }

    rotate(angle: number, center: IVector2 = { x: 0, y: 0 }) {
        c = Math.cos(angle);
        s = Math.sin(angle);

        x = this.x - center.x;
        y = this.y - center.y;

        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;

        return this;
    }

    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        return this;
    }

    roundToZero() {
        this.x = roundToZero(this.x);
        this.y = roundToZero(this.y);

        return this;
    }

    set(x = 0, y = 0) {
        this.x = x;
        this.y = y;

        return this;
    }

    setLength(length: number) {
        return this.normalize().multiplyScalar(length);
    }

    setX(x: number = 0) {
        this.x = x;

        return this;
    }

    setY(y: number = 0) {
        this.y = y;

        return this;
    }

    toArray(arr: number[] = []) {
        arr[0] = this.x;
        arr[1] = this.y;

        return arr;
    }

    toJson(json: IVector2 = { x: 0, y: 0 }): IVector2 {
        json.x = this.x;
        json.y = this.y;

        return json;
    }

    toPalor(p = new Polar()) {
        p.r = this.length();
        p.a = this.angle();

        return p;
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}