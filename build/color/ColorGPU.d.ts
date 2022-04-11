import IColorGPU, { IColorGPUJson } from "./interfaces/IColorGPU";
import IColorRGB from "./interfaces/IColorRGB";
import IColorRGBA from "./interfaces/IColorRGBA";
export default class ColorGPU extends Float32Array implements IColorGPU {
    static average: (color: IColorGPU | ArrayLike<number>) => number;
    static averageWeighted: (color: IColorGPU | ArrayLike<number>, wr?: number, wg?: number, wb?: number) => number;
    static clone: (color: IColorGPU | ArrayLike<number>) => IColorGPU;
    static create: (r?: number, g?: number, b?: number, a?: number) => IColorGPU;
    static equals: (a: IColorGPU, b: IColorGPU) => boolean;
    static fromArray: (arr: Float32Array | IColorGPU | number[], out?: IColorGPU) => IColorGPU;
    static fromColorRGB(color: IColorRGB | number[] | Uint8Array, out?: IColorGPU): IColorGPU;
    static fromColorRGBA(color: IColorRGBA | number[] | Uint8Array, out?: IColorGPU): IColorGPU;
    static fromHex: (hex: number, alpha?: number, out?: IColorGPU) => IColorGPU;
    static fromJson: (json: IColorGPUJson, out?: IColorGPU) => IColorGPU;
    static fromScalar: (scalar: number, out?: IColorGPU) => IColorGPU;
    static fromString: (str: string, out?: IColorGPU) => IColorGPU;
    static grayscale: (color: IColorGPU | ArrayLike<number>, wr?: number, wg?: number, wb?: number, out?: IColorGPU) => IColorGPU;
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
