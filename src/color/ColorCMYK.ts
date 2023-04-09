import { ArraybufferDataType } from "../ArraybufferDataType";
import { IColorCMYK } from "./interfaces/IColorCMYK";

let max = 0;

export class ColorCMYK extends Float32Array implements IColorCMYK {
	public readonly dataType = ArraybufferDataType.COLOR_CMYK;

	public static fromRGBUnsignedNormal(
		r: number,
		g: number,
		b: number,
		out: IColorCMYK = new ColorCMYK(),
	): IColorCMYK {
		max = Math.max(r, g, b);

		out[0] = 1 - r / max;
		out[1] = 1 - g / max;
		out[2] = 1 - b / max;
		out[3] = 1 - max;

		return out;
	}

	public constructor(c = 0, m = 0, y = 0, k = 0) {
		super(4);
		this[0] = c;
		this[1] = m;
		this[2] = y;
		this[3] = k;
	}

	public get c(): number {
		return this[0];
	}

	public set c(val: number) {
		this[0] = val;
	}

	public get m(): number {
		return this[1];
	}

	public set m(val: number) {
		this[1] = val;
	}

	public get y(): number {
		return this[2];
	}

	public set y(val: number) {
		this[2] = val;
	}

	public get k(): number {
		return this[3];
	}

	public set k(val: number) {
		this[3] = val;
	}
}
