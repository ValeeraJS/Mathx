import { IColorRYB, IColorRYBJson } from "./interfaces/IColorRYB";
import { ArraybufferDataType } from "../ArraybufferDataType";
import { IColorRYBAJson } from "./interfaces/IColorRYBA";
import { IColorRGBA } from "./interfaces/IColorRGBA";
import { IColorRGB } from "./interfaces/IColorRGB";

export class ColorRYB extends Uint8Array implements IColorRYB {
	public static average = (color: IColorRYB): number => {
		return (color[0] + color[1] + color[2]) / 3;
	};

	public static averageWeighted = (
		color: IColorRYB | ArrayLike<number>,
		wr = 0.333333,
		wy = 0.333334,
		wb = 0.333333,
	): number => {
		return color[0] * wr + color[1] * wy + color[2] * wb;
	};

	public static clone = (color: IColorRYB | ArrayLike<number>): IColorRYB => {
		return new ColorRYB(color[0], color[1], color[2]);
	};

	public static create = (r = 0, g = 0, b = 0): IColorRYB => {
		return new ColorRYB(r, g, b);
	};

	public static equals = (a: IColorRYB, b: IColorRYB): boolean => {
		return (a.r ?? a[0]) === (b.r ?? b[0]) && (a.y ?? a[1]) === (b.y ?? b[1]) && (a.b ?? a[2]) === (b.b ?? b[2]);
	};

	public static fromArray = (arr: ArrayLike<number>, out: IColorRYB = new ColorRYB()): IColorRYB => {
		out[0] = arr[0];
		out[1] = arr[1];
		out[2] = arr[2];

		return out;
	};

	public static fromJson = (json: IColorRYBJson | IColorRYBAJson, out: IColorRYB = new ColorRYB()): IColorRYB => {
		out[0] = json.r;
		out[1] = json.y;
		out[2] = json.b;

		return out;
	};

	public static fromRGB = (rgb: IColorRGB | IColorRGBA, out: IColorRYB = new ColorRYB()): IColorRYB => {
		let r = rgb[0];
		let g = rgb[1];
		let b = rgb[2];
		// Remove the whiteness from the color.
		let w = Math.min(r, g, b);
		r -= w;
		g -= w;
		b -= w;

		let mg = Math.max(r, g, b);

		// Get the yellow out of the red+green.
		let y = Math.min(r, g);
		r -= y;
		g -= y;

		// If this unfortunate conversion combines blue and green, then cut each in
		// half to preserve the value's maximum range.
		if (b && g) {
			b *= 0.5;
			g *= 0.5;
		}

		// Redistribute the remaining green.
		y += g;
		b += g;

		// Normalize to values.
		let my = Math.max(r, y, b);
		if (my) {
			let n = mg / my;
			r *= n;
			y *= n;
			b *= n;
		}

		// Add the white back in.
		r += w;
		y += w;
		b += w;
		return out;
	};

	public static fromScalar = (scalar: number, out: IColorRYB = new ColorRYB()): IColorRYB => {
		out[0] = scalar;
		out[1] = scalar;
		out[2] = scalar;

		return out;
	};

	public static fromString = (str: string, out: IColorRYB = new ColorRYB()): IColorRYB => {
		if (str.startsWith("ryb(")) {
			str = str.substring(4, str.length - 1);
			const arr = str.split(",");

			out[0] = parseInt(arr[0], 10);
			out[1] = parseInt(arr[1], 10);
			out[2] = parseInt(arr[2], 10);
		}

		return out;
	};

	public readonly dataType = ArraybufferDataType.COLOR_RGB;

	public constructor(r = 0, y = 0, b = 0) {
		super(3);
		this[0] = r;
		this[1] = y;
		this[2] = b;
	}

	public get r(): number {
		return this[0];
	}

	public set r(val: number) {
		this[0] = val;
	}

	public get y(): number {
		return this[1];
	}

	public set y(val: number) {
		this[1] = val;
	}

	public get b(): number {
		return this[2];
	}

	public set b(val: number) {
		this[2] = val;
	}
}
