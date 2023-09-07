import { ArraybufferDataType } from "../ArraybufferDataType";
import { Vector3 } from "../vector";
import { ColorGPULike } from "./ColorGPU";
import { IColorXYZ, IColorXYZJson } from "./interfaces/IColorXYZ";

export const MATRIX_XYZ2RGB = new Float32Array([
	3.2404542, -0.969266, 0.0556434, -1.5371385, 1.8760108, -0.2040259, -0.4985314, 0.041556, 1.0572252,
]);
export const MATRIX_RGB2XYZ = new Float32Array([
	0.4124564, 0.2126729, 0.0193339, 0.3575761, 0.7151522, 0.119192, 0.1804375, 0.072175, 0.9503041,
]);

const tmpVec3 = new Float32Array(3);

export class ColorXYZ extends Float32Array implements IColorXYZ {
	public static clone = (color: IColorXYZ | ArrayLike<number>): ColorXYZ => {
		return new ColorXYZ(color[0], color[1], color[2]);
	};

	public static create = (r = 0, g = 0, b = 0): ColorXYZ => {
		return new ColorXYZ(r, g, b);
	};

	public static equals = (a: IColorXYZ, b: IColorXYZ): boolean => {
		return (a.x ?? a[0]) === (b.x ?? b[0]) && (a.y ?? a[1]) === (b.y ?? b[1]) && (a.z ?? a[2]) === (b.z ?? b[2]);
	};

	public static fromArray = (arr: ArrayLike<number>, out: IColorXYZ = new ColorXYZ()): IColorXYZ => {
		out[0] = arr[0];
		out[1] = arr[1];
		out[2] = arr[2];

		return out;
	};

	public static fromColorGPU = (color: ColorGPULike, out: IColorXYZ = new ColorXYZ()): IColorXYZ => {
		return Vector3.transformMatrix3(color, MATRIX_RGB2XYZ, out) as IColorXYZ;
	};

	public static fromJson = (json: IColorXYZJson, out: IColorXYZ = new ColorXYZ()): IColorXYZ => {
		out[0] = json.x;
		out[1] = json.y;
		out[2] = json.z;

		return out;
	};

	public static fromRGBUnsignedNormal = (
		r: number,
		g: number,
		b: number,
		out: IColorXYZ = new ColorXYZ(),
	): IColorXYZ => {
		tmpVec3[0] = r;
		tmpVec3[1] = g;
		tmpVec3[2] = b;

		return ColorXYZ.fromColorGPU(tmpVec3, out);
	};

	public static fromScalar = (scalar: number, out: IColorXYZ = new ColorXYZ()): IColorXYZ => {
		out[0] = scalar;
		out[1] = scalar;
		out[2] = scalar;

		return out;
	};

	public readonly dataType = ArraybufferDataType.COLOR_RGB;

	public constructor(r = 0, y = 0, b = 0) {
		super(3);
		this[0] = r;
		this[1] = y;
		this[2] = b;
	}

	public get x(): number {
		return this[0];
	}

	public set x(val: number) {
		this[0] = val;
	}

	public get y(): number {
		return this[1];
	}

	public set y(val: number) {
		this[1] = val;
	}

	public get z(): number {
		return this[2];
	}

	public set z(val: number) {
		this[2] = val;
	}
}
