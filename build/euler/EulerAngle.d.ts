import IEulerAngle, { EulerRotationOrders } from "./IEulerAngle";
export default class EulerAngle extends Float32Array implements IEulerAngle {
    static readonly ORDERS: typeof EulerRotationOrders;
    static clone(euler: IEulerAngle): EulerAngle;
    static create(x?: number, y?: number, z?: number, order?: EulerRotationOrders): EulerAngle;
    static fromMatrix4(matrix4: Float32Array, out?: IEulerAngle): IEulerAngle;
    order: EulerRotationOrders;
    constructor(x?: number, y?: number, z?: number, order?: EulerRotationOrders);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get z(): number;
    set z(value: number);
}
