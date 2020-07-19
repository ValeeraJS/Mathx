import { IPairs4Float32 } from "../../common/interfaces/IPairs4";

export interface IQuaternionData extends IPairs4Float32 {}

export interface IQuaternionJson {
    x: number;
    y: number;
    z: number;
    w: number;
}

export default interface IQuaternion extends IQuaternionData, IQuaternionJson {
    readonly isQuaternion: true;
}
