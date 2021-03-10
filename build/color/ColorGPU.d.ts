export interface IColorGPUData extends Float32Array {
}
export interface IColorGPUJson {
    r: number;
    g: number;
    b: number;
    a: number;
}
export declare const create: (r?: number, g?: number, b?: number, a?: number, out?: IColorGPUData) => IColorGPUData;
export declare const createJson: (r?: number, g?: number, b?: number, a?: number) => IColorGPUJson;
export declare const fromScalar: (scalar: number, a: number | undefined, out: IColorGPUData) => IColorGPUData;
