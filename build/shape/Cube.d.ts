import { IVector3 } from "../vector/Vector3";
import ICube from "./interfaces/ICube";
import ISphere from "./interfaces/ISphere";
import ITriangle3 from "./interfaces/ITriangle";
export default class Cube implements ICube {
    static clampPoint: (a: ICube, point: Float32Array | number[] | IVector3, out?: IVector3) => IVector3;
    static containsPoint: (a: ICube, b: Float32Array | number[] | IVector3) => boolean;
    static containsCube: (a: ICube, b: ICube) => boolean;
    static depth: (a: ICube) => number;
    static equals: (a: ICube, b: ICube) => boolean;
    static getCenter: (a: ICube, out?: IVector3) => IVector3;
    static getSize: (a: ICube, out?: IVector3) => Float32Array;
    static height: (a: ICube) => number;
    static intersect: (a: ICube, b: ICube, out?: ICube) => ICube;
    static intersectsBox: (a: ICube, b: ICube) => boolean;
    static intersectsSphere: (a: ICube, b: ISphere) => boolean;
    static intersectsTriangle: (a: ICube, b: ITriangle3) => boolean;
    static isEmpty: (a: ICube) => boolean;
    static round: (a: ICube, out?: ICube) => ICube;
    static size: (a: ICube, out?: IVector3) => Float32Array;
    static stretch: (a: ICube, b: Float32Array | number[] | IVector3, c: Float32Array | number[] | IVector3, out?: ICube) => ICube;
    static translate: (a: ICube, b: Float32Array | number[] | IVector3, out?: ICube) => ICube;
    static union: (a: ICube, b: ICube, out?: ICube) => ICube;
    static volume: (a: ICube) => number;
    static width: (a: ICube) => number;
    min: IVector3;
    max: IVector3;
    constructor(a?: IVector3, b?: IVector3);
}
