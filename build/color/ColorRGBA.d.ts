import IColorRGBA, { IColorRGBAData } from "./interfaces/IColorRGBA";
export default class ColorRGBA extends Uint8Array implements IColorRGBA {
    readonly length: 4;
    constructor(r?: number, g?: number, b?: number, a?: number);
    get r(): number;
    set r(val: number);
    get g(): number;
    set g(val: number);
    get b(): number;
    set b(val: number);
    get a(): number;
    set a(val: number);
}
export declare const create: (r?: number, g?: number, b?: number, a?: number) => ColorRGBA;
export declare const equals: (a: IColorRGBAData, b: IColorRGBAData) => boolean;
export declare const fromHex: (hex: number, a: number | undefined, out: IColorRGBAData) => IColorRGBAData;
export declare const fromScalar: (scalar: number, a: number | undefined, out: IColorRGBAData) => IColorRGBAData;
export declare const fromString: (str: string, a: number | undefined, out: IColorRGBAData) => IColorRGBAData;
