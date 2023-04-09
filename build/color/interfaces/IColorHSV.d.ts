export interface IColorHSVJson {
    h: number;
    s: number;
    v: number;
}
export interface IColorHSV extends Float32Array, IColorHSVJson {
}
