import IEuler, { EulerRotationOrders } from "./IEuler";
export declare const create: (x?: number, y?: number, z?: number, order?: EulerRotationOrders, out?: IEuler) => IEuler;
export declare const from: (euler: IEuler, out?: IEuler) => IEuler;
export declare const fromMatrix4: (matrix: Float32Array, out?: IEuler) => IEuler;
