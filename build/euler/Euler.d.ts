import IEuler, { EulerRotationOrders } from "./IEuler";
export declare const create: (x?: number, y?: number, z?: number, order?: EulerRotationOrders, out?: IEuler) => IEuler;
export declare const from: (euler: IEuler, out?: IEuler) => IEuler;
