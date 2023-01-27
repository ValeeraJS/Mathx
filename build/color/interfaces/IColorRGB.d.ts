export interface IColorRGBJson {
    r: number;
    g: number;
    b: number;
}
export interface IColorRGB extends Uint8Array, IColorRGBJson {
}
