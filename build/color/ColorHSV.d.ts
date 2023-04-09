import { IColorHSV } from "./interfaces/IColorHSV";
export declare class ColorHSV extends Float32Array implements IColorHSV {
    readonly dataType: string;
    static fromRGBUnsignedNormal(r: number, g: number, b: number, out?: ColorHSV): ColorHSV;
    constructor(h?: number, s?: number, v?: number);
    get h(): number;
    set h(val: number);
    get s(): number;
    set s(val: number);
    get v(): number;
    set v(val: number);
}
