import IColorRGB, { IColorRGBData } from "./interfaces/IColorRGB";
export default class ColorRGB extends Uint8Array implements IColorRGB {
    readonly length = 3;
    constructor(r?: number, g?: number, b?: number);
    get r(): number;
    set r(val: number);
    get g(): number;
    set g(val: number);
    get b(): number;
    set b(val: number);
}
export declare const create: (r?: number, g?: number, b?: number) => ColorRGB;
export declare const equals: (a: IColorRGBData, b: IColorRGBData) => boolean;
export declare const fromHex: (hex: number, out: IColorRGBData) => IColorRGBData;
export declare const fromScalar: (scalar: number, out: IColorRGBData) => IColorRGBData;
export declare const fromString: (str: string, out: IColorRGBData) => IColorRGBData;
