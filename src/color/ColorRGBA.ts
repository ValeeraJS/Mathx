import IColorRGBA, { IColorRGBAJson } from "./interfaces/IColorRGBA";
import COLOR_HEX_MAP from "./COLOR_HEX_MAP";
import IColorRGB from "./interfaces/IColorRGB";
import ArraybufferDataType from "../ArraybufferDataType";
import { WEIGHT_GRAY_RED, WEIGHT_GRAY_GREEN, WEIGHT_GRAY_BLUE } from "../constants";

export default class ColorRGBA extends Uint8Array implements IColorRGBA {
	public static average = (color: IColorRGB | IColorRGBA): number => {
		return (color[0] + color[1] + color[2]) / 3;
	};

	public static averageWeighted = (
		color: IColorRGB | IColorRGBA | ArrayLike<number>,
		wr = WEIGHT_GRAY_RED,
		wg = WEIGHT_GRAY_GREEN,
		wb = WEIGHT_GRAY_BLUE
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

	public static fromArray = (
		arr: ArrayLike<number>,
		out: IColorRGBA = new ColorRGBA()
	): IColorRGBA => {
		out[0] = arr[0];
		out[1] = arr[1];
		out[2] = arr[2];
		out[3] = arr[3];

		return out;
	};

	public static fromHex = (
		hex: number,
		alpha = 255,
		out: IColorRGBA = new ColorRGBA()
	): IColorRGBA => {
		out[0] = hex >> 16;
		out[1] = (hex >> 8) & 255;
		out[2] = hex & 255;
		out[3] = alpha;

		return out;
	};

	public static fromJson = (
		json: IColorRGBAJson,
		out: IColorRGBA = new ColorRGBA()
	): IColorRGBA => {
		out[0] = json.r;
		out[1] = json.g;
		out[2] = json.b;
		out[3] = json.a;

		return out;
	};

	public static fromScalar = (
		scalar: number,
		alpha = 255,
		out: IColorRGBA = new ColorRGBA()
	): IColorRGBA => {
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
			str = str.substr(1);

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
		out: IColorRGBA = new ColorRGBA()
	): IColorRGBA => {
		const gray = ColorRGBA.averageWeighted(color, wr, wg, wb);

		ColorRGBA.fromScalar(gray, color[3], out);

		return out;
	};

	public length: 4;
	public readonly dataType = ArraybufferDataType.COLOR_RGBA;

	public constructor(r = 0, g = 0, b = 0, a = 1) {
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
		return this[4];
	}

	public set a(val: number) {
		this[4] = val;
	}
}
