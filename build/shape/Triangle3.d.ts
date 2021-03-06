import ITriangle3 from "./interfaces/ITriangle";
import { IVector3Data } from "../vector/interfaces/IVector3";
export default class Triangle3 implements ITriangle3 {
    a: IVector3Data;
    b: IVector3Data;
    c: IVector3Data;
    constructor(a: IVector3Data, b: IVector3Data, c: IVector3Data);
}
export declare const normal: (t: ITriangle3, out?: any) => Float32Array;
