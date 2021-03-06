import ICube from "../shape/interfaces/ICube";
import ISphere from "../shape/interfaces/ISphere";
export default class Grid3 {
    data: Float32Array[];
    gridSize: Float32Array;
    min: Float32Array;
    size: Float32Array;
    max: Float32Array;
    constructor(size?: Float32Array, gridSize?: Float32Array, min?: Float32Array);
}
export declare const dataFromSolidCube: (a: ICube, out?: Grid3) => Grid3;
export declare const dataFromSolidSphere: (a: ISphere, out?: Grid3) => Grid3;
