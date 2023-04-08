import { ArraybufferDataType } from "../ArraybufferDataType";
import { IColorHSL } from "./interfaces/IColorHSL";

let max = 0;
let min = 0;
let h = 0;
let s = 0;
let l = 0;

export class ColorHSL extends Float32Array implements IColorHSL {
	public readonly dataType = ArraybufferDataType.COLOR_HSL;

	public static fromRGBUnsignedNormal(r: number, g: number, b: number, out: ColorHSL = new ColorHSL()): ColorHSL {
		max = Math.max(r, g, b);
		min = Math.min(r, g, b);
		l = (max + min) / 2;

		if (max === min) {
			h = s = 0;
		} else {
			let d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
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

		out[0] = h;
		out[1] = s;
		out[2] = l;

		return out;
	}

	public constructor(h = 0, s = 0, l = 0) {
		super(3);
		this[0] = h;
		this[1] = s;
		this[2] = l;
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

	public get l(): number {
		return this[2];
	}

	public set l(val: number) {
		this[2] = val;
	}
}
