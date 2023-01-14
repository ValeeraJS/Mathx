import IColorRGB, { IColorRGBJson } from "./interfaces/IColorRGB";
import { IColorRGBAJson } from ".";
export default class ColorRGB extends Uint8Array implements IColorRGB {
    static average: (color: IColorRGB) => number;
    static averageWeighted: (color: IColorRGB | ArrayLike<number>, wr?: number, wg?: number, wb?: number) => number;
    static clone: (color: IColorRGB | ArrayLike<number>) => IColorRGB;
    static create: (r?: number, g?: number, b?: number) => IColorRGB;
    static equals: (a: IColorRGB, b: IColorRGB) => boolean;
    static fromArray: (arr: ArrayLike<number>, out?: IColorRGB) => IColorRGB;
    static fromHex: (hex: number, out?: IColorRGB) => IColorRGB;
    static fromJson: (json: IColorRGBJson | IColorRGBAJson, out?: IColorRGB) => IColorRGB;
    static fromScalar: (scalar: number, out?: IColorRGB) => IColorRGB;
    static fromString: (str: string, out?: IColorRGB) => IColorRGB;
    static grayscale: (color: IColorRGB | ArrayLike<number>, wr?: number, wg?: number, wb?: number, out?: IColorRGB) => IColorRGB;
    length: 3;
    readonly dataType: string;
    constructor(r?: number, g?: number, b?: number);
    get r(): number;
    set r(val: number);
    get g(): number;
    set g(val: number);
    get b(): number;
    set b(val: number);
}
