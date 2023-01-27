import { IColorRGB, IColorRGBJson } from "./interfaces/IColorRGB";
import { COLOR_HEX_MAP } from "./COLOR_HEX_MAP";
import { IColorRGBAJson } from ".";
import { ArraybufferDataType } from "../ArraybufferDataType";
import { WEIGHT_GRAY_RED, WEIGHT_GRAY_GREEN, WEIGHT_GRAY_BLUE } from "../constants";
import { hue2rgb } from "./hue2color";

export class ColorRGB extends Uint8Array implements IColorRGB {
	public static average = (color: IColorRGB): number => {
		return (color[0] + color[1] + color[2]) / 3;
	};

	public static averageWeighted = (
		color: IColorRGB | ArrayLike<number>,
		wr = WEIGHT_GRAY_RED,
		wg = WEIGHT_GRAY_GREEN,
		wb = WEIGHT_GRAY_BLUE
	): number => {
		return color[0] * wr + color[1] * wg + color[2] * wb;
	};

	public static clone = (color: IColorRGB | ArrayLike<number>): IColorRGB => {
		return new ColorRGB(color[0], color[1], color[2]);
	};

	public static create = (r = 0, g = 0, b = 0): IColorRGB => {
		return new ColorRGB(r, g, b);
	};

	public static equals = (a: IColorRGB, b: IColorRGB): boolean => {
		return (
			(a.r ?? a[0]) === (b.r ?? b[0]) &&
			(a.g ?? a[1]) === (b.g ?? b[1]) &&
			(a.b ?? a[2]) === (b.b ?? b[2])
		);
	};

	public static fromArray = (
		arr: ArrayLike<number>,
		out: IColorRGB = new ColorRGB()
	): IColorRGB => {
		out[0] = arr[0];
		out[1] = arr[1];
		out[2] = arr[2];

		return out;
	};

	public static fromHex = (hex: number, out: IColorRGB = new ColorRGB()): IColorRGB => {
		out[0] = hex >> 16;
		out[1] = (hex >> 8) & 255;
		out[2] = hex & 255;

		return out;
	};

	public static fromHSL = (h: number, s: number, l: number, out = new ColorRGB) => {
		var r, g, b;

		if (s === 0) {
			r = g = b = l; // achromatic
		} else {
			var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			var p = 2 * l - q;
			r = hue2rgb(p, q, h + 1 / 3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1 / 3);
		}

		out[0] = Math.round(r * 255);
		out[1] = Math.round(g * 255);
		out[2] = Math.round(b * 255);

		return out;
	}

	public static fromJson = (
		json: IColorRGBJson | IColorRGBAJson,
		out: IColorRGB = new ColorRGB()
	): IColorRGB => {
		out[0] = json.r;
		out[1] = json.g;
		out[2] = json.b;

		return out;
	};

	public static fromScalar = (scalar: number, out: IColorRGB = new ColorRGB()): IColorRGB => {
		out[0] = scalar;
		out[1] = scalar;
		out[2] = scalar;

		return out;
	};

	public static fromString = (str: string, out: IColorRGB = new ColorRGB()): IColorRGB => {
		if (str in COLOR_HEX_MAP) {
			return ColorRGB.fromHex(COLOR_HEX_MAP[str], out);
		} else if (str.startsWith("#")) {
			str = str.substr(1);

			return ColorRGB.fromScalar(parseInt(str, 16), out);
		} else if (str.startsWith("rgb(")) {
			str = str.substring(4, str.length - 1);
			const arr = str.split(",");

			out[0] = parseInt(arr[0], 10);
			out[1] = parseInt(arr[1], 10);
			out[2] = parseInt(arr[2], 10);
		}

		return out;
	};

	public static grayscale = (
		color: IColorRGB | ArrayLike<number>,
		wr = WEIGHT_GRAY_RED,
		wg = WEIGHT_GRAY_GREEN,
		wb = WEIGHT_GRAY_BLUE,
		out: IColorRGB = new ColorRGB()
	): IColorRGB => {
		const gray = ColorRGB.averageWeighted(color, wr, wg, wb);

		ColorRGB.fromScalar(gray, out);

		return out;
	};

	public readonly dataType = ArraybufferDataType.COLOR_RGB;

	public constructor(r = 0, g = 0, b = 0) {
		super(3);
		this[0] = r;
		this[1] = g;
		this[2] = b;
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
}
