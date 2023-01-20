import Sphere from "./Sphere";
import Vector3, { Vector3Like } from "../vector/Vector3";

const v1 = new Vector3();
const v2 = new Vector3();
const v3 = new Vector3();

export class Plane3 {
    normal: Vector3 = new Vector3();
    distance: number;
    constructor(normal: Vector3 = Vector3.VECTOR3_TOP, distance: number = 0) {
        this.normal.set(normal);
        this.distance = distance;
    }

    distanceToPoint(point: Vector3Like) {
        return Vector3.dot(this.normal, point) + this.distance;
    }

    distanceToSphere(sphere: Sphere) {
        return this.distanceToPoint(sphere.position) - sphere.radius;
    }

    fromCoplanarPoints(a: Vector3Like, b: Vector3Like, c: Vector3Like): this {
        Vector3.minus(b, a, v1);
        Vector3.minus(c, a, v2);
        Vector3.cross(v1, v2, v3);
        Vector3.normalize(v3, v3);

        // TODO check zero vec

        return this.formCoplanarPointAndNormal(a, v3);
    }

    formCoplanarPointAndNormal(point: Vector3Like, normal: Vector3Like): this {
        this.normal.set(normal);
        this.distance = - Vector3.dot(point, normal);

        return this;
    }

    negate(): this {

        this.distance *= - 1;
        Vector3.negate(this.normal, this.normal);

        return this;

    }

    projectPoint(point: Vector3Like, out: Vector3 = new Vector3()): Vector3 {
        out.set(this.normal);
        Vector3.multiplyScalar(out, - this.distanceToPoint(point), out);

        return Vector3.add(out, point, out);
    }

    set(normal: Vector3Like, distance = this.distance): this {
        this.normal.set(normal);
        this.distance = distance;

        return this;
    }
}
