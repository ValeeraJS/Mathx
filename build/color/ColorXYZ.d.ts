import { ColorGPULike } from "./ColorGPU";
import { IColorXYZ, IColorXYZJson } from "./interfaces/IColorXYZ";
export declare const MATRIX_XYZ2RGB: Float32Array;
export declare const MATRIX_RGB2XYZ: Float32Array;
export declare class ColorXYZ extends Float32Array implements IColorXYZ {
    static clone: (color: IColorXYZ | ArrayLike<number>) => ColorXYZ;
    static create: (r?: number, g?: number, b?: number) => ColorXYZ;
    static equals: (a: IColorXYZ, b: IColorXYZ) => boolean;
    static fromArray: (arr: ArrayLike<number>, out?: IColorXYZ) => IColorXYZ;
    static fromColorGPU: (color: ColorGPULike, out?: IColorXYZ) => IColorXYZ;
    static fromJson: (json: IColorXYZJson, out?: IColorXYZ) => IColorXYZ;
    static fromRGBUnsignedNormal: (r: number, g: number, b: number, out?: IColorXYZ) => IColorXYZ;
    static fromScalar: (scalar: number, out?: IColorXYZ) => IColorXYZ;
    readonly dataType: string;
    constructor(r?: number, y?: number, b?: number);
    get x(): number;
    set x(val: number);
    get y(): number;
    set y(val: number);
    get z(): number;
    set z(val: number);
}
