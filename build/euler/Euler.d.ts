import IEuler, { EulerRotationOrders } from "./IEuler";
export declare class Euler implements IEuler {
    static RotationOrders: typeof EulerRotationOrders;
    x: number;
    y: number;
    z: number;
    order: EulerRotationOrders;
    constructor(x?: number, y?: number, z?: number, order?: EulerRotationOrders);
}
export declare const create: (x?: number, y?: number, z?: number, order?: EulerRotationOrders, out?: IEuler) => IEuler;
export declare const from: (euler: IEuler, out?: IEuler) => IEuler;
