import IColorHSL from "./interfaces/IColorHSL";
export default class ColorHSL extends Uint8Array implements IColorHSL {
    readonly dataType: string;
    static fromRGBUnsignedNormal(r: number, g: number, b: number, out?: ColorHSL): ColorHSL;
    constructor(h?: number, s?: number, l?: number);
    get h(): number;
    set h(val: number);
    get s(): number;
    set s(val: number);
    get l(): number;
    set l(val: number);
}
