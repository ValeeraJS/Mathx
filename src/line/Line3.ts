import { Vector3, Vector3Like } from "../vector";

export class Line3 {
    a: Vector3 = new Vector3();
    b: Vector3 = new Vector3();

    static fromPointAndDirection(p: Vector3, direction: Vector3, out: Line3 = new Line3()): Line3 {
        out.a.set(p);
        Vector3.add(out.a, direction, out.b);
        return out;
    }

    constructor (
        a: Vector3Like = Vector3.VECTOR3_ZERO,
        b: Vector3Like = Vector3.VECTOR3_RIGHT,
    ) {
        this.a.set(a);
        this.b.set(b);
    }

    fromPointAndDirection(p: Vector3, direction: Vector3): this {
        return Line3.fromPointAndDirection(p, direction, this) as this;
    }
}
