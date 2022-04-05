import IColorGPU, { IColorGPUJson } from "./interfaces/IColorGPU";
export default class ColorGPU extends Float32Array implements IColorGPU {
    static average: (color: IColorGPU) => number;
    static averageWeighted: (color: IColorGPU, wr?: number, wg?: number, wb?: number) => number;
    static clone: (color: IColorGPU) => IColorGPU;
    static create: (r?: number, g?: number, b?: number, a?: number) => IColorGPU;
    static equals: (a: IColorGPU, b: IColorGPU) => boolean;
    static fromArray: (arr: ArrayLike<number>, out?: IColorGPU) => IColorGPU;
    static fromHex: (hex: number, alpha?: number, out?: IColorGPU) => IColorGPU;
    static fromJson: (json: IColorGPUJson, out?: IColorGPU) => IColorGPU;
    static fromScalar: (scalar: number, out?: IColorGPU) => IColorGPU;
    static fromString: (str: string, out?: IColorGPU) => IColorGPU;
    static grayscale: (color: IColorGPU, wr?: number, wg?: number, wb?: number, out?: IColorGPU) => IColorGPU;
    length: 4;
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
