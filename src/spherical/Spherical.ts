import { ArraybufferDataType } from "../ArraybufferDataType";
import { clamp } from "../common/clamp";
import { Vector3, Vector3Like } from "../vector";

export interface ISphericalJson {
	radius: number;
	phi: number;
	theta: number;
}

export interface ISpherical extends Float32Array, ISphericalJson {}
export type SphericalLike = ISpherical | Spherical | Float32Array | number[];

export class Spherical extends Float32Array implements ISpherical {
	static fromArray(arr: SphericalLike, out: Spherical = new Spherical()): Spherical {
		out.set(arr);
		return out;
	}

	static fromVector3(v: Vector3Like, out = new Spherical()): Spherical {
		const x = v[0];
		const y = v[1];
		const z = v[2];
		out[0] = Math.sqrt(x * x + y * y + z * z);

		if (out[0] === 0) {
			out[1] = 0;
			out[2] = 0;
		} else {
			out[1] = Math.acos(clamp(y / out[0], -1, 1));
			out[2] = Math.atan2(x, z);
		}

		return out;
	}

	public readonly dataType = ArraybufferDataType.SPHERICAL;
	constructor(radius = 1, phi = 0, theta = 0) {
		super(3);
		this[0] = radius;
		this[1] = phi;
		this[2] = theta;

		return this;
	}

	get radius() {
		return this[0];
	}

	set radius(value: number) {
		this[0] = value;
	}

	get phi() {
		return this[1];
	}

	set phi(value: number) {
		this[1] = value;
	}

	get theta() {
		return this[2];
	}

	set theta(value: number) {
		this[2] = value;
	}

	fromArray(arr: SphericalLike): this {
		return Spherical.fromArray(arr, this) as this;
	}

	toVector3(out: Vector3Like = new Vector3()): Vector3Like {
		const rst = this[0] * Math.sin(this[2]);
		out[2] = rst * Math.cos(this[1]);
		out[0] = rst * Math.sin(this[1]);
		out[1] = this[0] * Math.cos(this[2]);
		return out;
	}
}
