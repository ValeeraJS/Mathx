export interface IMatrix2Data {
    readonly length: 4;
    [n: number]: number;
};

export default interface IMatrix2 extends Float32Array, IMatrix2Data{
    readonly isMatrix2: true;
    readonly length: 4;
}
