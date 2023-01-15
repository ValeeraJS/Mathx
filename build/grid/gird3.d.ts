import { Vector3Like } from "../vector/Vector3";
import ICube from "../shape/interfaces/ICube";
import ISphere from "../shape/interfaces/ISphere";
export default class Grid3 {
    data: Vector3Like[];
    gridSize: Vector3Like;
    min: Vector3Like;
    size: Vector3Like;
    max: Vector3Like;
    constructor(size?: Vector3Like, gridSize?: Vector3Like, min?: Vector3Like);
}
export declare const dataFromSolidCube: (a: ICube, out?: Grid3) => Grid3;
export declare const dataFromSolidSphere: (a: ISphere, out?: Grid3) => Grid3;
