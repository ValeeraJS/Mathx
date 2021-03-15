import IEuler, { EulerRotationOrders } from "./IEuler";

const createDefault = () => {
    return {
        x: 0,
        y: 0,
        z: 0,
        order: EulerRotationOrders.XYZ
    }
}

export const create = (x = 0, y = 0, z = 0, order = EulerRotationOrders.XYZ, out: IEuler = createDefault()): IEuler => {
    out.x = x;
    out.y = y;
    out.z = z;
    out.order = order;

    return out;
}

export const from = (euler: IEuler, out: IEuler = createDefault()): IEuler => {
    out.x = euler.x;
    out.y = euler.y;
    out.z = euler.z;
    out.order = euler.order;

    return out;
}
