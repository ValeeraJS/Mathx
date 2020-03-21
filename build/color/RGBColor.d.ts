import IRGBColor from "./interfaces/IRGBColor";
export default class RGBColor implements IRGBColor {
    static create(r?: number, g?: number, b?: number): RGBColor;
    r: number;
    g: number;
    b: number;
    constructor(r?: number, g?: number, b?: number);
    clone(): RGBColor;
    equals(color: IRGBColor): boolean;
    from(color: IRGBColor): this;
    fromArray(array: ArrayLike<number>, offset?: number): this;
    fromHex(hex: number): this;
    fromScalar(scalar: number): this;
    fromString(str: string): this;
    toJson(): IRGBColor;
}
