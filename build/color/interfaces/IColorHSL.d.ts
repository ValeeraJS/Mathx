export interface IColorHSLJson {
    h: number;
    s: number;
    l: number;
}
export default interface IColorHSL extends Uint8Array, IColorHSLJson {
}
