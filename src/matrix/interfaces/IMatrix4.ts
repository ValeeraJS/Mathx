export interface IMatrix4Data {
    readonly length: 16;
    [n: number]: number;
};

export default interface IMatrix4 extends Float32Array, IMatrix4Data {
    readonly isMatrix4: true;
    readonly length: 16;
}
