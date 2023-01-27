import { IColorRGBJson } from "./IColorRGB";

export interface IColorRGBAJson extends IColorRGBJson {
	a: number;
}

export interface IColorRGBA extends Uint8Array, IColorRGBAJson {}
