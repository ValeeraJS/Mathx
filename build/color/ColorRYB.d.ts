import { IColorRYB, IColorRYBJson } from "./interfaces/IColorRYB";
import { IColorRYBAJson } from "./interfaces/IColorRYBA";
import { IColorRGBA } from "./interfaces/IColorRGBA";
import { IColorRGB } from "./interfaces/IColorRGB";
export declare class ColorRYB extends Uint8Array implements IColorRYB {
    static average: (color: IColorRYB) => number;
    static averageWeighted: (color: IColorRYB | ArrayLike<number>, wr?: number, wy?: number, wb?: number) => number;
    static clone: (color: IColorRYB | ArrayLike<number>) => IColorRYB;
    static create: (r?: number, g?: number, b?: number) => IColorRYB;
    static equals: (a: IColorRYB, b: IColorRYB) => boolean;
    static fromArray: (arr: ArrayLike<number>, out?: IColorRYB) => IColorRYB;
    static fromJson: (json: IColorRYBJson | IColorRYBAJson, out?: IColorRYB) => IColorRYB;
    static fromRGB: (rgb: IColorRGB | IColorRGBA, out?: IColorRYB) => IColorRYB;
    static fromScalar: (scalar: number, out?: IColorRYB) => IColorRYB;
    static fromString: (str: string, out?: IColorRYB) => IColorRYB;
    readonly dataType: string;
    constructor(r?: number, y?: number, b?: number);
    get r(): number;
    set r(val: number);
    get y(): number;
    set y(val: number);
    get b(): number;
    set b(val: number);
}
