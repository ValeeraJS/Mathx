import { IColorRGBJson } from "./IColorRGB";

export interface IColorRGBEJson extends IColorRGBJson {
	e: number;
}

export interface IColorRGBE extends Uint8Array, IColorRGBEJson {}
