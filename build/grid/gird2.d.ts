import { Vector2 } from "../vector";
import { IVector2Data } from "../vector/interfaces/IVector2";
export default class Grid2 {
    data: IVector2Data[];
    gridSize: IVector2Data;
    min: IVector2Data;
    size: IVector2Data;
    max: IVector2Data;
    constructor(size?: Vector2, gridSize?: Vector2, position?: Vector2);
}
