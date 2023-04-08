import { IColorRGBA, IColorRGBAJson } from "./interfaces/IColorRGBA";
import { IColorRGB } from "./interfaces/IColorRGB";
import { IColorRYB } from "./interfaces/IColorRYB";
export declare class ColorRGBA extends Uint8Array implements IColorRGBA {
    static average: (color: IColorRGB | IColorRGBA) => number;
    static averageWeighted: (color: IColorRGB | IColorRGBA | ArrayLike<number>, wr?: number, wg?: number, wb?: number) => number;
    static clone: (color: IColorRGBA | ArrayLike<number>) => IColorRGBA;
    static create: (r?: number, g?: number, b?: number, a?: number) => IColorRGBA;
    static equals: (a: IColorRGBA, b: IColorRGBA) => boolean;
    static fromArray: (arr: ArrayLike<number>, out?: IColorRGBA) => IColorRGBA;
    static fromColorRYB: (color: IColorRYB | number[] | Uint8Array, out?: IColorRGBA) => IColorRGBA;
    static fromHex: (hex: number, alpha?: number, out?: IColorRGBA) => IColorRGBA;
    static fromHSL: (h: number, s: number, l: number, out?: ColorRGBA) => ColorRGBA;
    static fromJson: (json: IColorRGBAJson, out?: IColorRGBA) => IColorRGBA;
    static fromScalar: (scalar: number, alpha?: number, out?: IColorRGBA) => IColorRGBA;
    static fromString: (str: string, out?: IColorRGBA) => IColorRGBA;
    static grayscale: (color: IColorRGBA | ArrayLike<number>, wr?: number, wg?: number, wb?: number, out?: IColorRGBA) => IColorRGBA;
    readonly dataType: string;
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
