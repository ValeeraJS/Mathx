import { Sphere } from "./Sphere";
import { Vector3 } from "../vector/Vector3";
import { Plane3 } from "./Plane3";
import { Matrix4 } from "../matrix/Matrix4";
import { Cube } from "./Cube";

const _vector = new Vector3();

export class Frustum {
	public near: Plane3;
	public far: Plane3;
	public left: Plane3;
	public right: Plane3;
	public bottom: Plane3;
	public top: Plane3;

	constructor(matrix?: Matrix4) {
		this.near = new Plane3();
		this.far = new Plane3();
		this.left = new Plane3();
		this.right = new Plane3();
		this.top = new Plane3();
		this.bottom = new Plane3();

		matrix && this.applyProjectionMatrix(matrix);
	}

	applyProjectionMatrix(matrix: Matrix4): this {
		const m11 = matrix[0];
		const m12 = matrix[1];
		const m13 = matrix[2];
		const m14 = matrix[3];
		const m21 = matrix[4];
		const m22 = matrix[5];
		const m23 = matrix[6];
		const m24 = matrix[7];
		const m31 = matrix[8];
		const m32 = matrix[9];
		const m33 = matrix[10];
		const m34 = matrix[11];
		const m41 = matrix[12];
		const m42 = matrix[13];
		const m43 = matrix[14];
		const m44 = matrix[15];

		Vector3.fromXYZ(m14 + m13, m24 + m23, m34 + m33, this.near.normal);
		this.near.distance = m44 + m43;
		this.near.normalize();

		Vector3.fromXYZ(m14 - m13, m24 - m23, m34 - m33, this.far.normal);
		this.far.distance = m44 - m43;
		this.far.normalize();

		Vector3.fromXYZ(m14 + m11, m24 + m21, m34 + m31, this.left.normal);
		this.left.distance = m44 + m41;
		this.left.normalize();

		Vector3.fromXYZ(m14 - m11, m24 - m21, m34 - m31, this.right.normal);
		this.right.distance = m44 - m41;
		this.right.normalize();

		Vector3.fromXYZ(m14 + m12, m24 + m22, m34 + m32, this.bottom.normal);
		this.bottom.distance = m44 + m42;
		this.bottom.normalize();

		Vector3.fromXYZ(m14 - m12, m24 - m22, m34 - m32, this.top.normal);
		this.top.distance = m44 - m42;
		this.top.normalize();

		return this;
	}

	clone(): Frustum {
		return new Frustum().from(this);
	}

	from(frustum: Frustum): this {
		this.near.from(frustum.near);
		this.far.from(frustum.far);
		this.left.from(frustum.left);
		this.right.from(frustum.right);
		this.bottom.from(frustum.bottom);
		this.top.from(frustum.top);

		return this;
	}

	intersectsSphere(sphere: Sphere): boolean {
		const p = sphere.position;
		const r = -sphere.radius;

		let distance = this.near.distanceToPoint(p);
		if (distance < r) {
			return false;
		}

		distance = this.far.distanceToPoint(p);
		if (distance < r) {
			return false;
		}

		distance = this.right.distanceToPoint(p);
		if (distance < r) {
			return false;
		}

		distance = this.left.distanceToPoint(p);
		if (distance < r) {
			return false;
		}

		distance = this.top.distanceToPoint(p);
		if (distance < r) {
			return false;
		}

		distance = this.bottom.distanceToPoint(p);
		if (distance < r) {
			return false;
		}

		return true;
	}

	intersectsBox(box: Cube): boolean {
		let plane = this.right;
		_vector.x = plane.normal.x > 0 ? box.max.x : box.min.x;
		_vector.y = plane.normal.y > 0 ? box.max.y : box.min.y;
		_vector.z = plane.normal.z > 0 ? box.max.z : box.min.z;

		if (plane.distanceToPoint(_vector) < 0) {
			return false;
		}

		plane = this.left;
		_vector.x = plane.normal.x > 0 ? box.max.x : box.min.x;
		_vector.y = plane.normal.y > 0 ? box.max.y : box.min.y;
		_vector.z = plane.normal.z > 0 ? box.max.z : box.min.z;

		if (plane.distanceToPoint(_vector) < 0) {
			return false;
		}

		plane = this.top;
		_vector.x = plane.normal.x > 0 ? box.max.x : box.min.x;
		_vector.y = plane.normal.y > 0 ? box.max.y : box.min.y;
		_vector.z = plane.normal.z > 0 ? box.max.z : box.min.z;

		if (plane.distanceToPoint(_vector) < 0) {
			return false;
		}

		plane = this.bottom;
		_vector.x = plane.normal.x > 0 ? box.max.x : box.min.x;
		_vector.y = plane.normal.y > 0 ? box.max.y : box.min.y;
		_vector.z = plane.normal.z > 0 ? box.max.z : box.min.z;

		if (plane.distanceToPoint(_vector) < 0) {
			return false;
		}

		plane = this.near;
		_vector.x = plane.normal.x > 0 ? box.max.x : box.min.x;
		_vector.y = plane.normal.y > 0 ? box.max.y : box.min.y;
		_vector.z = plane.normal.z > 0 ? box.max.z : box.min.z;

		if (plane.distanceToPoint(_vector) < 0) {
			return false;
		}

		plane = this.far;
		_vector.x = plane.normal.x > 0 ? box.max.x : box.min.x;
		_vector.y = plane.normal.y > 0 ? box.max.y : box.min.y;
		_vector.z = plane.normal.z > 0 ? box.max.z : box.min.z;

		if (plane.distanceToPoint(_vector) < 0) {
			return false;
		}

		return true;
	}

	containsPoint(point: Vector3): boolean {
		if (this.right.distanceToPoint(point) < 0) {
			return false;
		}
		if (this.left.distanceToPoint(point) < 0) {
			return false;
		}
		if (this.top.distanceToPoint(point) < 0) {
			return false;
		}
		if (this.bottom.distanceToPoint(point) < 0) {
			return false;
		}
		if (this.near.distanceToPoint(point) < 0) {
			return false;
		}
		if (this.far.distanceToPoint(point) < 0) {
			return false;
		}
		return true;
	}

	set(right: Plane3, left: Plane3, top: Plane3, bottom: Plane3, near: Plane3, far: Plane3): this {
		this.right.from(right);
		this.left.from(left);
		this.top.from(top);
		this.bottom.from(bottom);
		this.near.from(near);
		this.far.from(far);

		return this;
	}
}
