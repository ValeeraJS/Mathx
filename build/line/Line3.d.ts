import { Vector3, Vector3Like } from "../vector";
export declare class Line3 {
    a: Vector3;
    b: Vector3;
    static distancePointToLineSegment(p: Vector3Like, line: Line3): number;
    static distancePointToLineSegmentSquared(p: Vector3Like, line: Line3): number;
    static segmentLength(line: Line3): number;
    static segmentLengthSquared(line: Line3): number;
    static fromPointAndDirection(p: Vector3, direction: Vector3, out?: Line3): Line3;
    constructor(a?: Vector3Like, b?: Vector3Like);
    fromPointAndDirection(p: Vector3, direction: Vector3): this;
}
