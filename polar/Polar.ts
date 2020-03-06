import IPolar from './interfaces/IPolar';
import IVector2 from '../vector/interfaces/IVector2';
import Vector2 from '../vector/Vector2';

export default class Polar implements IPolar {
    r: number;
    a: number;

    constructor(r = 1, a = 0) {
        this.r = r;
        this.a = a;
    }

    distanceTo(p: IPolar) {
        return Math.sqrt(this.distanceToSquared(p));
    }

    distanceToSquared({ r, a }: IPolar) {
        return this.r * this.r + r * r - 2 * r * this.r * Math.cos(a - this.a);
    }

    fromVector2({ x, y }: IVector2) {
        this.r = Math.sqrt(x * x + y * y);
        this.a = Math.atan2(y, x);
    }

    lengthManhattan() {
        return (Math.cos(this.a) + Math.sin(this.a)) * this.r;
    }

    set(r = 1, a = 0) {
        this.r = r;
        this.a = a;
    }

    setA(a = 0) {
        this.a = a;

        return this;
    }

    setR(r = 0) {
        this.r = r;

        return this;
    }

    toJson(json: IPolar = { r: 0, a: 0 }): IPolar {
        json.r = this.r;
        json.a = this.a;

        return json;
    }

    toString() {
        return `(${this.r}, ${this.a})`;
    }

    toVector2(vec2: IVector2 = new Vector2()) {
        vec2.x = Math.cos(this.a) * this.r;
        vec2.y = Math.sin(this.a) * this.r;

        return vec2;
    }
}
