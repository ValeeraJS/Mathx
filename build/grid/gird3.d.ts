import { Vector3, Vector3Like } from "../vector/Vector3";
import { ICube } from "../shape/interfaces/ICube";
import { ISphere } from "../shape/interfaces/ISphere";
export declare class Grid3 {
    data: Vector3[];
    gridSize: Vector3;
    min: Vector3;
    size: Vector3;
    max: Vector3;
    constructor(size?: Vector3Like, gridSize?: Vector3Like, min?: Vector3Like);
}
export declare const dataFromSolidCube: (a: ICube, out?: Grid3) => Grid3;
export declare const dataFromSolidSphere: (a: ISphere, out?: Grid3) => Grid3;
