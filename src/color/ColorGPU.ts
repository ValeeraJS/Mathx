import IColorGPU, { IColorGPUJson } from "./interfaces/IColorGPU";
import COLOR_HEX_MAP from "./COLOR_HEX_MAP";

export default class ColorGPU extends Float32Array implements IColorGPU {
	public static average = (color: IColorGPU): number => {
		return (color[0] + color[1] + color[2]) / 3;
	};

	public static averageWeighted = (
		color: IColorGPU,
		wr = 0.299,
		wg = 0.587,
		wb = 0.114
	): number => {
		return color[0] * wr + color[1] * wg + color[2] * wb;
	};

	public static clone = (color: IColorGPU): IColorGPU => {
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
		arr: ArrayLike<number>,
		out: IColorGPU = new ColorGPU()
	): IColorGPU => {
		out[0] = arr[0];
		out[1] = arr[1];
		out[2] = arr[2];
		out[3] = arr[3];

		return out;
	};

	public static fromHex = (
		hex: number,
		alpha = 1,
		out: IColorGPU = new ColorGPU()
	): IColorGPU => {
		out[0] = hex >> 16;
		out[1] = (hex >> 8) & 255;
		out[2] = hex & 255;
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

			return ColorGPU.fromScalar(parseInt(str, 16), out);
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
		color: IColorGPU,
		wr = 0.299,
		wg = 0.587,
		wb = 0.114,
		out: IColorGPU = new ColorGPU()
	): IColorGPU => {
		const gray = ColorGPU.averageWeighted(color, wr, wg, wb);

		ColorGPU.fromScalar(gray, out);

		return out;
	};

	public length: 4;

	public constructor(r = 0, g = 0, b = 0, a = 0) {
		super(3);
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
