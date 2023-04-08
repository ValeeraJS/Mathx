import { IColorRYBJson } from "./IColorRYB";
export interface IColorRYBAJson extends IColorRYBJson {
    a: number;
}
export interface IColorRYBA extends Uint8Array, IColorRYBAJson {
}
