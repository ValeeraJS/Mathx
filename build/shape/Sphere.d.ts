import { IVector3 } from "../vector/interfaces/IVector3";
import ICube from "./interfaces/ICube";
import ISphere from "./interfaces/ISphere";
export default class Sphere implements ISphere {
    static boundingBox: (a: ISphere, out?: ICube) => ICube;
    static containsPoint: (a: ISphere, b: IVector3Data) => boolean;
    static distanceToPoint: (a: ISphere, b: IVector3Data) => number;
    static equals: (a: ISphere, b: ISphere) => boolean;
    static intersectsSphere: (a: ISphere, b: ISphere) => boolean;
    position: IVector3;
    radius: number;
    constructor(position?: IVector3, radius?: number);
}
