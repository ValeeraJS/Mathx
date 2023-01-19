export interface IColorHSLJson {
    h: number;
    s: number;
    l: number;
}
export default interface IColorHSL extends Float32Array, IColorHSLJson {
}
