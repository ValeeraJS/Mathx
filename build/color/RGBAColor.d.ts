import IRGBColor from "./interfaces/IRGBColor";
import IRGBAColor from "./interfaces/IRGBAColor";
import RGBColor from "./RGBColor";
export default class RGBAColor implements IRGBAColor {
    static create(r?: number, g?: number, b?: number, a?: number): RGBColor;
    r: number;
    g: number;
    b: number;
    a: number;
    constructor(r?: number, g?: number, b?: number, a?: number);
    clone(): RGBColor;
    equals(color: IRGBAColor): boolean;
    from(color: IRGBAColor): this;
    fromRGB(color: IRGBColor): this;
    fromArray(array: ArrayLike<number>, offset?: number): this;
    fromHex(hex: number, a?: number): this;
    fromScalar(scalar: number, a?: number): this;
    fromString(str: string, a?: number): this;
    toJson(): IRGBAColor;
}
