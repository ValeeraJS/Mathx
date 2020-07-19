export interface IVector4Data extends Float32Array {
    readonly length: 4;
}
export interface IVector4Json {
    x: number;
    y: number;
    z: number;
    w: number;
}
export default interface IVector4 extends IVector4Data, IVector4Json {
    readonly isVector4: true;
}
