import { ArraybufferDataType } from "../ArraybufferDataType";
import { IColorHSV } from "./interfaces/IColorHSV";

let max = 0;
let min = 0;
let h = 0;
let s = 0;
let v = 0;

export class ColorHSV extends Float32Array implements IColorHSV {
	public readonly dataType = ArraybufferDataType.COLOR_HSV;

	public static fromRGBUnsignedNormal(r: number, g: number, b: number, out: ColorHSV = new ColorHSV()): ColorHSV {
		max = Math.max(r, g, b);
		min = Math.min(r, g, b);
		v = max;

		if (max === min) {
			h = 0;
		} else {
			let d = max - min;
			s = v > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}

		if (max) {
			s = 1 - min / max;
		} else {
			s = 0;
		}

		out[0] = h;
		out[1] = s;
		out[2] = v;

		return out;
	}

	public constructor(h = 0, s = 0, v = 0) {
		super(3);
		this[0] = h;
		this[1] = s;
		this[2] = v;
	}

	public get h(): number {
		return this[0];
	}

	public set h(val: number) {
		this[0] = val;
	}

	public get s(): number {
		return this[1];
	}

	public set s(val: number) {
		this[1] = val;
	}

	public get v(): number {
		return this[2];
	}

	public set v(val: number) {
		this[2] = val;
	}
}
