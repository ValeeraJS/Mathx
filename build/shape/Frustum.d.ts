import { Sphere } from "./Sphere";
import { Vector3 } from "../vector/Vector3";
import { Plane3 } from "./Plane3";
import { Matrix4 } from "../matrix/Matrix4";
import { Cube } from "./Cube";
export declare class Frustum {
    near: Plane3;
    far: Plane3;
    left: Plane3;
    right: Plane3;
    bottom: Plane3;
    top: Plane3;
    constructor(matrix?: Matrix4);
    applyProjectionMatrix(matrix: Matrix4): this;
    clone(): Frustum;
    from(frustum: Frustum): this;
    intersectsSphere(sphere: Sphere): boolean;
    intersectsBox(box: Cube): boolean;
    containsPoint(point: Vector3): boolean;
    set(right: Plane3, left: Plane3, top: Plane3, bottom: Plane3, near: Plane3, far: Plane3): this;
}
