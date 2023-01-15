export interface IColorRGBJson {
    r: number;
    g: number;
    b: number;
}
export default interface IColorRGB extends Uint8Array, IColorRGBJson {
}
