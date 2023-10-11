import { ColorCMYK } from "./ColorCMYK";
import { ColorGPU } from "./ColorGPU";
import { ColorHSL } from "./ColorHSL";
import { ColorHSV } from "./ColorHSV";
import { ColorRGB } from "./ColorRGB";
import { ColorRGBA } from "./ColorRGBA";
import { ColorRYB } from "./ColorRYB";
import { IColorCMYK } from "./interfaces/IColorCMYK";
import { IColorGPU } from "./interfaces/IColorGPU";
import { IColorHSV } from "./interfaces/IColorHSV";
import { IColorRGB, IColorRGBJson } from "./interfaces/IColorRGB";
import { IColorRGBA, IColorRGBAJson } from "./interfaces/IColorRGBA";
import { IColorRYB } from "./interfaces/IColorRYB";
import { IColorRYBA } from "./interfaces/IColorRYBA";

export const hue2rgb = (p: number, q: number, t: number): number => {
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1 / 6) return p + (q - p) * 6 * t;
	if (t < 1 / 2) return q;
	if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
	return p;
};

export const linearToSrgb = (c: number) => {
	if (c <= 0) {
		return 0;
	} else if (c >= 1) {
		return 1;
	} else if (c < 0.0031308) {
		return c * 12.92;
	} else {
		return Math.pow(c, 1 / 2.4) * 1.055 - 0.055;
	}
};

export const srgbToLinear = (x: number) => {
	if (x <= 0) {
		return 0;
	} else if (x >= 1) {
		return 1;
	} else if (x < 0.04045) {
		return x / 12.92;
	} else {
		return Math.pow((x + 0.055) / 1.055, 2.4);
	}
};

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
