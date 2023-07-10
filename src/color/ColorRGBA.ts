import { IColorRGBA, IColorRGBAJson } from "./interfaces/IColorRGBA";
import { COLOR_HEX_MAP } from "./COLOR_HEX_MAP";
import { IColorRGB } from "./interfaces/IColorRGB";
import { ArraybufferDataType } from "../ArraybufferDataType";
import { WEIGHT_GRAY_RED, WEIGHT_GRAY_GREEN, WEIGHT_GRAY_BLUE } from "../constants";
import { IColorRYB } from "./interfaces/IColorRYB";
import { hue2rgb } from "./utils";

export class ColorRGBA extends Uint8Array implements IColorRGBA {
	public static average = (color: IColorRGB | IColorRGBA): number => {
		return (color[0] + color[1] + color[2]) / 3;
	};

	public static averageWeighted = (
		color: IColorRGB | IColorRGBA | ArrayLike<number>,
		wr = WEIGHT_GRAY_RED,
		wg = WEIGHT_GRAY_GREEN,
		wb = WEIGHT_GRAY_BLUE,
	): number => {
		return color[0] * wr + color[1] * wg + color[2] * wb;
	};

	public static clone = (color: IColorRGBA | ArrayLike<number>): IColorRGBA => {
		return new ColorRGBA(color[0], color[1], color[2], color[3]);
	};

	public static create = (r = 0, g = 0, b = 0, a = 1): IColorRGBA => {
		return new ColorRGBA(r, g, b, a);
	};

	public static equals = (a: IColorRGBA, b: IColorRGBA): boolean => {
		return (
			(a.r ?? a[0]) === (b.r ?? b[0]) &&
			(a.g ?? a[1]) === (b.g ?? b[1]) &&
			(a.b ?? a[2]) === (b.b ?? b[2]) &&
			(a.a ?? a[3]) === (b.a ?? b[3])
		);
	};

	public static fromArray = (arr: ArrayLike<number>, out: IColorRGBA = new ColorRGBA()): IColorRGBA => {
		out[0] = arr[0];
		out[1] = arr[1];
		out[2] = arr[2];
		out[3] = arr[3];

		return out;
	};

	public static fromColorRYB = (
		color: IColorRYB | number[] | Uint8Array,
		out: IColorRGBA = new ColorRGBA(),
	): IColorRGBA => {
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

		out[0] = r;
		out[1] = g;
		out[2] = b;
		out[3] = 1;

		return out;
	};

	public static fromHex = (hex: number, alpha = 255, out: IColorRGBA = new ColorRGBA()): IColorRGBA => {
		out[0] = hex >> 16;
		out[1] = (hex >> 8) & 255;
		out[2] = hex & 255;
		out[3] = alpha;

		return out;
	};

	public static fromHSL = (h: number, s: number, l: number, out = new ColorRGBA()) => {
		let r;
		let g;
		let b;

		if (s === 0) {
			r = g = b = l; // achromatic
		} else {
			let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			let p = 2 * l - q;
			r = hue2rgb(p, q, h + 1 / 3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1 / 3);
		}

		out[0] = Math.round(r * 255);
		out[1] = Math.round(g * 255);
		out[2] = Math.round(b * 255);
		out[3] = 255;

		return out;
	};

	public static fromJson = (json: IColorRGBAJson, out: IColorRGBA = new ColorRGBA()): IColorRGBA => {
		out[0] = json.r;
		out[1] = json.g;
		out[2] = json.b;
		out[3] = json.a;

		return out;
	};

	public static fromScalar = (scalar: number, alpha = 255, out: IColorRGBA = new ColorRGBA()): IColorRGBA => {
		out[0] = scalar;
		out[1] = scalar;
		out[2] = scalar;
		out[3] = alpha;

		return out;
	};

	public static fromString = (str: string, out: IColorRGBA = new ColorRGBA()): IColorRGBA => {
		if (str in COLOR_HEX_MAP) {
			return ColorRGBA.fromHex(COLOR_HEX_MAP[str], 255, out);
		} else if (str.startsWith("#")) {
			str = str.substring(1);

			return ColorRGBA.fromScalar(parseInt(str, 16), 255, out);
		} else if (str.startsWith("rgba(")) {
			str = str.substring(4, str.length - 1);
			const arr = str.split(",");

			out[0] = parseInt(arr[0], 10);
			out[1] = parseInt(arr[1], 10);
			out[2] = parseInt(arr[2], 10);
			out[3] = parseInt(arr[3], 10);
		}

		return out;
	};

	public static grayscale = (
		color: IColorRGBA | ArrayLike<number>,
		wr = WEIGHT_GRAY_RED,
		wg = WEIGHT_GRAY_GREEN,
		wb = WEIGHT_GRAY_BLUE,
		out: IColorRGBA = new ColorRGBA(),
	): IColorRGBA => {
		const gray = ColorRGBA.averageWeighted(color, wr, wg, wb);

		ColorRGBA.fromScalar(gray, color[3], out);

		return out;
	};
	public readonly dataType = ArraybufferDataType.COLOR_RGBA;

	public constructor(r = 0, g = 0, b = 0, a = 255) {
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
