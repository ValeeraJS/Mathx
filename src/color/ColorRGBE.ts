import { ArraybufferDataType } from "../ArraybufferDataType";
import { IColorRGB } from "./interfaces/IColorRGB";
import { IColorRGBA } from "./interfaces/IColorRGBA";
import { IColorRGBE, IColorRGBEJson } from "./interfaces/IColorRGBE";

export class ColorRGBE extends Uint8Array implements IColorRGBE {

	public static clone = (color: IColorRGBE | ArrayLike<number>): IColorRGBE => {
		return new ColorRGBE(color[0], color[1], color[2], color[3]);
	};

	public static create = (r = 0, g = 0, b = 0, e = 128): IColorRGBE => {
		return new ColorRGBE(r, g, b, e);
	};

	public static equals = (a: IColorRGBE, b: IColorRGBE): boolean => {
		return (
			(a.r ?? a[0]) === (b.r ?? b[0]) &&
			(a.g ?? a[1]) === (b.g ?? b[1]) &&
			(a.b ?? a[2]) === (b.b ?? b[2]) &&
			(a.e ?? a[3]) === (b.e ?? b[3])
		);
	};

	public static fromArray = (arr: ArrayLike<number>, out: IColorRGBE = new ColorRGBE()): IColorRGBE => {
		out[0] = arr[0];
		out[1] = arr[1];
		out[2] = arr[2];
		out[3] = arr[3];

		return out;
	};

	public static fromJson = (json: IColorRGBEJson, out: IColorRGBE = new ColorRGBE()): IColorRGBE => {
		out[0] = json.r;
		out[1] = json.g;
		out[2] = json.b;
		out[3] = json.e;

		return out;
	};

	public static fromColorRGB = (col: IColorRGB | IColorRGBA, out: IColorRGBE = new ColorRGBE()): IColorRGBE => {
		out[0] = col[0];
		out[1] = col[1];
		out[2] = col[2];
		out[3] = 128;

		return out;
	};

	public static fromScalar = (scalar: number, e = 128, out: IColorRGBE = new ColorRGBE()): IColorRGBE => {
		out[0] = scalar;
		out[1] = scalar;
		out[2] = scalar;
		out[3] = e;

		return out;
	};

	public readonly dataType = ArraybufferDataType.COLOR_RGBE;

	public constructor(r = 0, g = 0, b = 0, e = 128) {
		super(4);
		this[0] = r;
		this[1] = g;
		this[2] = b;
		this[3] = e;
	}

	public get r(): number {
		return this[0];
	}

	public set r(val: number) {
		this[0] = val;
	}

	public get g(): number {
		return this[1];
	}

	public set g(val: number) {
		this[1] = val;
	}

	public get b(): number {
		return this[2];
	}

	public set b(val: number) {
		this[2] = val;
	}

	public get e(): number {
		return this[3];
	}

	public set e(val: number) {
		this[3] = val;
	}
}
