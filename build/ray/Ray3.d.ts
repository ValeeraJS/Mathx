import { IVector3 } from "../vector/Vector3";
import IRay3 from "./interfaces/IRay3";
import ISphere from "../shape/interfaces/ISphere";
export default class Ray3 implements IRay3 {
    static at: (a: IRay3, b: number, out?: IVector3) => IVector3;
    static distanceToPoint: (a: IRay3, point: IVector3) => number;
    static distanceSqToPoint: (a: IRay3, point: IVector3) => number;
    static lookAt: (a: IRay3, b: IVector3, out?: IRay3) => IRay3;
    static intersectSphere: (ray: IRay3, sphere: ISphere, target: IVector3) => null | IVector3;
    static intersectsSphere: (ray: IRay3, sphere: ISphere) => boolean;
    position: IVector3;
    direction: IVector3;
    constructor(position?: IVector3, direction?: IVector3);
}
