import { clamp } from "../common";
import { Vector3, Vector3Like } from "../vector";

const vec1 = new Float32Array(3);
const vec2 = new Float32Array(3);

export class Line3 {
	a: Vector3 = new Vector3();
	b: Vector3 = new Vector3();

	static distancePointToLineSegment(p: Vector3Like, line: Line3): number {
		return Math.sqrt(Line3.distancePointToLineSegmentSquared(p, line));
	}

	static distancePointToLineSegmentSquared(p: Vector3Like, line: Line3): number {
		const a = line.a;
		const b = line.b;
		let l2 = Vector3.distanceToSquared(a, b);
		if (l2 === 0) {
			return Vector3.distanceToSquared(p, b);
		}

		Vector3.minus(p, a, vec1);
		Vector3.minus(b, a, vec2);
		let t = Vector3.dot(vec1, vec2) / l2;
		t = clamp(t, 0, 1);
		Vector3.multiplyScalar(vec2, t, vec2);
		Vector3.add(a, vec2, vec1);

		return Vector3.distanceToSquared(a, vec1);
	}

	static segmentLength(line: Line3): number {
		return Vector3.distanceTo(line.a, line.b);
	}

	static segmentLengthSquared(line: Line3): number {
		return Vector3.distanceToSquared(line.a, line.b);
	}

	static fromPointAndDirection(p: Vector3, direction: Vector3, out: Line3 = new Line3()): Line3 {
		out.a.set(p);
		Vector3.add(out.a, direction, out.b);
		return out;
	}

	constructor(a: Vector3Like = Vector3.VECTOR3_ZERO, b: Vector3Like = Vector3.VECTOR3_RIGHT) {
		this.a.set(a);
		this.b.set(b);
	}

	fromPointAndDirection(p: Vector3, direction: Vector3): this {
		return Line3.fromPointAndDirection(p, direction, this) as this;
	}
}
