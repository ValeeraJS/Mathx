import { Vector2, Vector2Like } from "../vector/Vector2";
import { IRectangle2 } from "./interfaces/IRectangle2";

const DIRTY_TAG_SIZE = 1;
const DIRTY_TAG_CENTER = 2;
const DIRTY_TAG_AREA = 4;
const DIRTY_TAG_ALL = 7;

const vec2 = new Vector2();
const halpVec = [0.5, 0.5];

export class Rectangle2 implements IRectangle2 {
	public static area = (a: IRectangle2): number => {
		return (a.max[0] - a.min[0]) * (a.max[1] - a.min[1]);
	};

	public static center = (a: IRectangle2, out: Vector2 = new Vector2()): Vector2 => {
		return Vector2.add(a.min, Vector2.multiplyScalar(Rectangle2.size(a, out), 0.5, out), out);
	};

	public static containsPoint = (rect: IRectangle2, a: Float32Array): boolean => {
		return a[0] >= rect.min[0] && a[0] <= rect.max[0] && a[1] >= rect.min[1] && a[1] <= rect.max[1];
	};

	public static containsRectangle = (rect: IRectangle2, box: IRectangle2): boolean => {
		return (
			rect.min[0] <= box.min[0] &&
			box.max[0] <= rect.max[0] &&
			rect.min[1] <= box.min[1] &&
			box.max[1] <= rect.max[1]
		);
	};

	public static create = (
		a: Vector2Like = Vector2.VECTOR2_ZERO,
		b: Vector2Like = Vector2.VECTOR2_ONE,
	): Rectangle2 => {
		return new Rectangle2(a, b);
	};

	public static equals = (a: IRectangle2, b: IRectangle2): boolean => {
		return Vector2.equals(a.min, b.min) && Vector2.equals(a.max, b.max);
	};

	public static getCenter = (a: IRectangle2, out: Vector2 = Vector2.create()): Vector2 => {
		Vector2.add(a.min, a.max, out);

		return Vector2.multiplyScalar(out, 0.5, out);
	};

	public static getSize = (a: IRectangle2, out: Vector2 = Vector2.create()): Vector2 => {
		return Vector2.minus(a.max, a.min, out);
	};

	public static height = (a: IRectangle2): number => {
		return a.max[1] - a.min[1];
	};

	public static intersect = (a: IRectangle2, b: IRectangle2, out: Rectangle2 = new Rectangle2()): Rectangle2 => {
		Vector2.max(a.min, b.min, out.min);
		Vector2.min(a.max, b.max, out.max);

		return out;
	};

	public static size = (a: IRectangle2, out: Vector2 = new Vector2()): Vector2 => {
		return Vector2.minus(a.max, a.min, out);
	};

	public static split = (
		a: IRectangle2,
		rateBottomLeft: Vector2Like = halpVec,
		bottomLeft = new Rectangle2(),
		bottomRight = new Rectangle2(),
		topLeft = new Rectangle2(),
		topRight = new Rectangle2(),
	): Rectangle2[] => {
		Rectangle2.size(a, vec2);
		Vector2.multiply(vec2, rateBottomLeft, vec2);

		bottomLeft.min.set(a.min);
		Vector2.add(a.min, vec2, bottomLeft.max);

		topRight.min.set(bottomLeft.max);
		topRight.max.set(a.max);

		bottomRight.min.x = bottomLeft.max.x;
		bottomRight.max.x = a.max[0];
		bottomRight.min.y = a.min[1];
		bottomRight.max.y = bottomLeft.max[1];

		topLeft.min.x = a.min[0];
		topLeft.min.y = bottomLeft.max[1];
		topLeft.max.x = bottomLeft.max[0];
		topLeft.max.y = a.max[1];

		topLeft.dirty = topRight.dirty = bottomRight.dirty = bottomLeft.dirty = DIRTY_TAG_ALL;

		return [bottomLeft, bottomRight, topLeft, topRight];
	};

	public static splitHerizontal = (
		a: IRectangle2,
		rateLeft: number = 0.5,
		left: Rectangle2 = new Rectangle2(),
		right: Rectangle2 = new Rectangle2(),
	) => {
		Rectangle2.size(a, vec2);
		left.min.set(a.min);
		vec2.x *= rateLeft;
		Vector2.add(left.min, vec2, left.max);

		right.min.x = left.max.x;
		right.min.y = left.min.y;
		right.max.set(a.max);
		left.dirty = right.dirty = DIRTY_TAG_ALL;

		return [left, right];
	};

	public static splitVertical = (
		a: IRectangle2,
		rateBottom: number = 0.5,
		bottom: Rectangle2 = new Rectangle2(),
		top: Rectangle2 = new Rectangle2(),
	) => {
		Rectangle2.size(a, vec2);
		bottom.min.set(a.min);
		vec2.y *= rateBottom;
		Vector2.add(bottom.min, vec2, bottom.max);

		top.min.x = bottom.min.x;
		top.min.y = bottom.max.y;
		top.max.set(a.max);
		bottom.dirty = top.dirty = DIRTY_TAG_ALL;

		return [bottom, top];
	};

	public static stretch = (
		a: IRectangle2,
		b: Vector2Like,
		c: Vector2Like,
		out: Rectangle2 = new Rectangle2(),
	): Rectangle2 => {
		Vector2.add(a.min, b, out.min);
		Vector2.add(a.max, c, out.max);

		return out;
	};

	public static translate = (a: IRectangle2, b: Vector2Like, out: Rectangle2 = new Rectangle2()): Rectangle2 => {
		Vector2.add(a.min, b, out.min);
		Vector2.add(a.max, b, out.max);

		return out;
	};

	public static union = (a: IRectangle2, b: IRectangle2, out: Rectangle2 = new Rectangle2()): Rectangle2 => {
		Vector2.min(a.min, b.min, out.min);
		Vector2.max(a.max, b.max, out.max);

		return out;
	};

	public static width = (a: IRectangle2): number => {
		return a.max[0] - a.min[0];
	};

	#min: Vector2 = new Vector2();
	#max: Vector2 = new Vector2();
	#size: Vector2 = new Vector2();
	#center: Vector2 = new Vector2();
	dirty: number;
	#area: number = 0;
	public constructor(a: Vector2Like = Vector2.VECTOR2_ZERO, b: Vector2Like = Vector2.VECTOR2_ONE) {
		Vector2.min(a, b, this.#min);
		Vector2.max(a, b, this.#max);
		this.dirty = DIRTY_TAG_ALL;
	}

	get area(): number {
		if (this.dirty & DIRTY_TAG_AREA) {
			this.#area = Vector2.area(this.size);
			this.dirty -= DIRTY_TAG_AREA;
		}
		return this.#area;
	}

	get center(): Vector2 {
		if (this.dirty & DIRTY_TAG_CENTER) {
			Vector2.add(this.#min, Vector2.multiplyScalar(this.size, 0.5), this.#center);
			this.dirty -= DIRTY_TAG_CENTER;
		}
		return this.#center;
	}

	get size() {
		if (this.dirty & DIRTY_TAG_SIZE) {
			Vector2.minus(this.#max, this.#min, this.#size);
			this.dirty -= DIRTY_TAG_SIZE;
		}
		return this.#size;
	}

	set max(vec2: Vector2Like) {
		this.#max.set(vec2);
		this.dirty = DIRTY_TAG_ALL;
	}

	get max(): Vector2 {
		return this.#max;
	}

	set min(vec2: Vector2Like) {
		this.#min.set(vec2);
		this.dirty = DIRTY_TAG_ALL;
	}

	get min(): Vector2 {
		return this.#min;
	}
}
