import { IColorCMYK } from "./interfaces/IColorCMYK";
export declare class ColorCMYK extends Float32Array implements IColorCMYK {
    readonly dataType: string;
    static fromRGBUnsignedNormal(r: number, g: number, b: number, out?: IColorCMYK): IColorCMYK;
    constructor(c?: number, m?: number, y?: number, k?: number);
    get c(): number;
    set c(val: number);
    get m(): number;
    set m(val: number);
    get y(): number;
    set y(val: number);
    get k(): number;
    set k(val: number);
}
