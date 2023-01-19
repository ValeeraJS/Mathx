import IColorGPU, { IColorGPUJson } from "./interfaces/IColorGPU";
import COLOR_HEX_MAP from "./COLOR_HEX_MAP";
import IColorRGB from "./interfaces/IColorRGB";
import IColorRGBA from "./interfaces/IColorRGBA";
import ArraybufferDataType from "../ArraybufferDataType";
import { WEIGHT_GRAY_BLUE, WEIGHT_GRAY_GREEN, WEIGHT_GRAY_RED } from "../constants";
import { hue2rgb } from "./hue2color";

export default class ColorGPU extends Float32Array implements IColorGPU {
	public static average = (color: IColorGPU | ArrayLike<number>): number => {
		return (color[0] + color[1] + color[2]) / 3;
	};

	public static averageWeighted = (
		color: IColorGPU | ArrayLike<number>,
		wr = WEIGHT_GRAY_RED,
		wg = WEIGHT_GRAY_GREEN,
		wb = WEIGHT_GRAY_BLUE
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
		out: IColorGPU = new ColorGPU()
	): IColorGPU => {
		out[0] = arr[0];
		out[1] = arr[1];
		out[2] = arr[2];
		out[3] = arr[3];

		return out;
	};

	public static fromColorHSL = (h: number, s: number, l: number, out = new ColorGPU) => {
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

		out[0] = r;
		out[1] = g;
		out[2] = b;

		return out;
	}

	public static fromColorRGB(
		color: IColorRGB | number[] | Uint8Array,
		out: IColorGPU = new ColorGPU()
	): IColorGPU {
		out[0] = color[0] / 255;
		out[1] = color[1] / 255;
		out[2] = color[2] / 255;
		out[3] = 1;

		return out;
	}

	public static fromColorRGBA(
		color: IColorRGBA | number[] | Uint8Array,
		out: IColorGPU = new ColorGPU()
	): IColorGPU {
		out[0] = color[0] / 255;
		out[1] = color[1] / 255;
		out[2] = color[2] / 255;
		out[3] = color[3] / 255;

		return out;
	}

	public static fromHex = (
		hex: number,
		alpha = 1,
		out: IColorGPU = new ColorGPU()
	): IColorGPU => {
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
			str = str.substr(1);

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
		out: IColorGPU = new ColorGPU()
	): IColorGPU => {
		const gray = ColorGPU.averageWeighted(color, wr, wg, wb);

		ColorGPU.fromScalar(gray, out);

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
