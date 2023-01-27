import { Vector2Like } from "../vector/Vector2";
export declare class Grid2 {
    data: Vector2Like[];
    gridSize: Vector2Like;
    min: Vector2Like;
    size: Vector2Like;
    max: Vector2Like;
    constructor(size?: Vector2Like, gridSize?: Vector2Like, min?: Vector2Like);
}
