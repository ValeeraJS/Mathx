export interface IMatrix3Data {
    readonly length: 9;
    [n: number]: number;
};

export default interface IMatrix3 extends Float32Array, IMatrix3Data {
    readonly isMatrix3: true;
    readonly length: 9;
}
