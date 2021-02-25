import ICube from "../shape/interfaces/ICube";
import Vector3 from "../vector/Vector3";
import { IVector3Data } from "../vector/interfaces/IVector3";
import ISphere from "../shape/interfaces/ISphere";
export default class Grid3 {
    data: IVector3Data[];
    gridSize: IVector3Data;
    min: IVector3Data;
    size: IVector3Data;
    max: IVector3Data;
    constructor(size?: Vector3, gridSize?: Vector3, position?: Vector3);
}
export declare const dataFromSolidCube: (a: ICube, out?: Grid3) => Grid3;
export declare const dataFromSolidSphere: (a: ISphere, out?: Grid3) => Grid3;
