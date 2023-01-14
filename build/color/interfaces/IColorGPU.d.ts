import { IPairs4Float32 } from "../../common/interfaces/IPairs4";
export type IColorGPUData = IPairs4Float32;
export interface IColorGPUJson {
    a: number;
    b: number;
    g: number;
    r: number;
}
export default interface IColorGPU extends IColorGPUData, IColorGPUJson {
}
