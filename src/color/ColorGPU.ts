import { IColorGPU, IColorGPUJson } from "./interfaces/IColorGPU";
import { COLOR_HEX_MAP } from "./COLOR_HEX_MAP";
import { IColorRGB, IColorRGBJson } from "./interfaces/IColorRGB";
import { IColorRGBA, IColorRGBAJson } from "./interfaces/IColorRGBA";
import { ArraybufferDataType } from "../ArraybufferDataType";
import { WEIGHT_GRAY_BLUE, WEIGHT_GRAY_GREEN, WEIGHT_GRAY_RED } from "../constants";
import { hue2rgb } from "./utils";
import { IColorRYB } from "./interfaces/IColorRYB";
import { IColorHSV } from "./interfaces/IColorHSV";
import { IColorCMYK } from "./interfaces/IColorCMYK";
import { IColorXYZ } from "./interfaces/IColorXYZ";
import { MATRIX_XYZ2RGB } from "./ColorXYZ";
import { ColorCMYK } from "./ColorCMYK";
import { ColorHSL } from "./ColorHSL";
import { ColorHSV } from "./ColorHSV";
import { ColorRGB } from "./ColorRGB";
import { ColorRGBA } from "./ColorRGBA";
import { ColorRYB } from "./ColorRYB";
import { IColorRYBA } from "./interfaces/IColorRYBA";
import { Vector3 } from "../vector/Vector3";

let r: number;
let g: number;
let b: number;

export type ColorGPULike = number[] | Float32Array | ColorGPU;

export type ColorFormatType =
	| IColorGPU
	| string
	| Float32Array
	| number[]
	| number
	| IColorRGB
	| IColorRGBA
	| IColorRGBAJson
	| IColorRGBJson
	| IColorRYB
	| IColorRYBA
	| ColorHSV
	| IColorHSV
	| IColorCMYK
	| ColorCMYK;

export const getColorGPU = (color: ColorFormatType, result = new ColorGPU()) => {
	if (color instanceof ColorGPU) {
		result.set(color);
	} else if (typeof color === "string") {
		ColorGPU.fromString(color, result);
	} else if (typeof color === "number") {
		ColorGPU.fromHex(color, 1, result);
	} else if (color instanceof ColorRGB) {
		ColorGPU.fromColorRGB(color, result);
	} else if (color instanceof ColorRYB) {
		ColorGPU.fromColorRYB(color, result);
	} else if (color instanceof ColorRGBA) {
		ColorGPU.fromColorRGBA(color, result);
	} else if (color instanceof ColorHSL) {
		ColorGPU.fromColorHSL(color, result);
	} else if (color instanceof ColorHSV) {
		ColorGPU.fromColorHSV(color, result);
	} else if (color instanceof ColorCMYK) {
		ColorGPU.fromColorCMYK(color, result);
	} else if (color instanceof Float32Array || color instanceof Array) {
		ColorGPU.fromArray(color, result);
	} else {
		if ("a" in color) {
			ColorGPU.fromJson(color as IColorRGBAJson, result);
		} else {
			ColorGPU.fromJson(
				{
					...(color as IColorRGBJson),
					a: 1,
				},
				result,
			);
		}
	}
	return result;
};

export class ColorGPU extends Float32Array implements IColorGPU {
	public static average = (color: IColorGPU | ArrayLike<number>): number => {
		return (color[0] + color[1] + color[2]) / 3;
	};

	public static averageWeighted = (
		color: IColorGPU | ArrayLike<number>,
		wr = WEIGHT_GRAY_RED,
		wg = WEIGHT_GRAY_GREEN,
		wb = WEIGHT_GRAY_BLUE,
	): number => {
		return color[0] * wr + color[1] * wg + color[2] * wb;
	};

	public static clone = (color: IColorGPU | ArrayLike<number>): IColorGPU => {
		return new ColorGPU(color[0], color[1], color[2], color[3]);
	};

	public static create = (r = 0, g = 0, b = 0, a = 0): IColorGPU => {
		return new ColorGPU(r, g, b, a);
	};

	public static equals = (a: IColorGPU, b: IColorGPU): boolean => {
		return (
			(a.r ?? a[0]) === (b.r ?? b[0]) &&
			(a.g ?? a[1]) === (b.g ?? b[1]) &&
			(a.b ?? a[2]) === (b.b ?? b[2]) &&
			(a.a ?? a[3]) === (b.a ?? b[3])
		);
	};

	public static fromArray = (
		arr: Float32Array | IColorGPU | number[],
		out: IColorGPU = new ColorGPU(),
	): IColorGPU => {
		out[0] = arr[0];
		out[1] = arr[1];
		out[2] = arr[2];
		out[3] = arr[3];

		return out;
	};

	public static fromColorCMYK = (
		arr: Float32Array | IColorCMYK | number[],
		out: IColorGPU = new ColorGPU(),
	): IColorGPU => {
		const k = 1 - arr[3];
		out[0] = (1 - arr[0]) * k;
		out[1] = (1 - arr[1]) * k;
		out[2] = (1 - arr[2]) * k;
		out[3] = 1;

		return out;
	};

	public static fromColorHSL = (color: IColorHSV | number[] | Float32Array, out = new ColorGPU()) => {
		let h = color[0];
		let s = color[1];
		let l = color[2];
		if (s === 0) {
			r = g = b = l; // achromatic
		} else {
			let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			let p = 2 * l - q;
			r = hue2rgb(p, q, h + 1 / 3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1 / 3);
		}

		out[0] = r;
		out[1] = g;
		out[2] = b;
		out[3] = 1;

		return out;
	};

	public static fromColorHSV = (color: IColorHSV | number[] | Float32Array, out = new ColorGPU()) => {
		const s = color[1];
		const v = color[2];
		const h6 = color[0] * 6;
		const hi = Math.floor(h6);
		const f = h6 - hi;
		const p = v * (1 - s);
		const q = v * (1 - f * s);
		const t = v * (1 - (1 - f) * s);

		if (hi === 0 || hi === 6) {
			out[0] = v;
			out[1] = t;
			out[2] = p;
		} else if (hi === 1) {
			out[0] = q;
			out[1] = v;
			out[2] = p;
		} else if (hi === 2) {
			out[0] = p;
			out[1] = v;
			out[2] = t;
		} else if (hi === 3) {
			out[0] = p;
			out[1] = q;
			out[2] = v;
		} else if (hi === 4) {
			out[0] = t;
			out[1] = p;
			out[2] = v;
		} else if (hi === 5) {
			out[0] = v;
			out[1] = p;
			out[2] = q;
		}
		out[3] = 1;

		return out;
	};

	public static fromColorRGB(color: IColorRGB | number[] | Uint8Array, out: IColorGPU = new ColorGPU()): IColorGPU {
		out[0] = color[0] / 255;
		out[1] = color[1] / 255;
		out[2] = color[2] / 255;
		out[3] = 1;

		return out;
	}

	public static fromColorRGBA(color: IColorRGBA | number[] | Uint8Array, out: IColorGPU = new ColorGPU()): IColorGPU {
		out[0] = color[0] / 255;
		out[1] = color[1] / 255;
		out[2] = color[2] / 255;
		out[3] = color[3] / 255;

		return out;
	}

	public static fromColorRYB(color: IColorRYB | number[] | Uint8Array, out: IColorGPU = new ColorGPU()): IColorGPU {
		let r = color[0];
		let y = color[1];
		let b = color[2];
		// Remove the whiteness from the color.
		let w = Math.min(r, y, b);
		r -= w;
		y -= w;
		b -= w;

		let my = Math.max(r, y, b);

		// Get the green out of the yellow and blue
		let g = Math.min(y, b);
		y -= g;
		b -= g;

		if (b && g) {
			b *= 2.0;
			g *= 2.0;
		}

		// Redistribute the remaining yellow.
		r += y;
		g += y;

		// Normalize to values.
		let mg = Math.max(r, g, b);
		if (mg) {
			let n = my / mg;
			r *= n;
			g *= n;
			b *= n;
		}

		// Add the white back in.
		r += w;
		g += w;
		b += w;

		out[0] = r / 255;
		out[1] = g / 255;
		out[2] = b / 255;
		out[3] = 1;

		return out;
	}

	public static fromColorXYZ = (
		color: IColorXYZ | number[] | Float32Array,
		out: IColorGPU = new ColorGPU(),
	): IColorGPU => {
		Vector3.transformMatrix3(color, MATRIX_XYZ2RGB, out);

		return out;
	};

	public static fromHex = (hex: number, alpha = 1, out: IColorGPU = new ColorGPU()): IColorGPU => {
		out[0] = (hex >> 16) / 255;
		out[1] = ((hex >> 8) & 255) / 255;
		out[2] = (hex & 255) / 255;
		out[3] = alpha;

		return out;
	};

	public static fromJson = (json: IColorGPUJson, out: IColorGPU = new ColorGPU()): IColorGPU => {
		out[0] = json.r;
		out[1] = json.g;
		out[2] = json.b;
		out[3] = json.a;

		return out;
	};

	public static fromScalar = (scalar: number, out: IColorGPU = new ColorGPU()): IColorGPU => {
		out[0] = scalar;
		out[1] = scalar;
		out[2] = scalar;

		return out;
	};

	public static fromString = (str: string, out: IColorGPU = new ColorGPU()): IColorGPU => {
		if (str in COLOR_HEX_MAP) {
			return ColorGPU.fromHex(COLOR_HEX_MAP[str], 1, out);
		} else if (str.startsWith("#")) {
			str = str.substring(1);

			return ColorGPU.fromHex(parseInt(str, 16), 1, out);
		} else if (str.startsWith("rgb(")) {
			str = str.substring(4, str.length - 1);
			const arr = str.split(",");

			out[0] = parseInt(arr[0], 10) / 255;
			out[1] = parseInt(arr[1], 10) / 255;
			out[2] = parseInt(arr[2], 10) / 255;
		}

		return out;
	};

	public static grayscale = (
		color: IColorGPU | ArrayLike<number>,
		wr = WEIGHT_GRAY_RED,
		wg = WEIGHT_GRAY_GREEN,
		wb = WEIGHT_GRAY_BLUE,
		out: IColorGPU = new ColorGPU(),
	): IColorGPU => {
		const gray = ColorGPU.averageWeighted(color, wr, wg, wb);

		ColorGPU.fromScalar(gray, out);

		return out;
	};

	public static lerp = <T extends ColorGPULike>(
		a: ColorGPULike,
		b: ColorGPULike,
		alpha: number,
		out: T = new ColorGPU() as T,
	): T => {
		out[0] = (b[0] - a[0]) * alpha + a[0];
		out[1] = (b[1] - a[1]) * alpha + a[1];
		out[2] = (b[2] - a[2]) * alpha + a[2];
		out[3] = (b[3] - a[3]) * alpha + a[3];

		return out;
	};

	public readonly dataType = ArraybufferDataType.COLOR_GPU;

	public constructor(r = 0, g = 0, b = 0, a = 0) {
		super(4);
		this[0] = r;
		this[1] = g;
		this[2] = b;
		this[3] = a;
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

	public get a(): number {
		return this[3];
	}

	public set a(val: number) {
		this[3] = val;
	}
}
