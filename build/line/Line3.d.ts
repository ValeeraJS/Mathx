import { Vector3, Vector3Like } from "../vector";
export declare class Line3 {
    a: Vector3;
    b: Vector3;
    static fromPointAndDirection(p: Vector3, direction: Vector3, out?: Line3): Line3;
    constructor(a?: Vector3Like, b?: Vector3Like);
    fromPointAndDirection(p: Vector3, direction: Vector3): this;
}
