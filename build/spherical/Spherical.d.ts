import { Vector3Like } from "../vector";
export interface ISphericalJson {
    radius: number;
    phi: number;
    theta: number;
}
export interface ISpherical extends Float32Array, ISphericalJson {
}
export type SphericalLike = ISpherical | Spherical | Float32Array | number[];
export declare class Spherical extends Float32Array implements ISpherical {
    static fromArray(arr: SphericalLike, out?: Spherical): Spherical;
    static fromVector3(v: Vector3Like, out?: Spherical): Spherical;
    readonly dataType: string;
    constructor(radius?: number, phi?: number, theta?: number);
    get radius(): number;
    set radius(value: number);
    get phi(): number;
    set phi(value: number);
    get theta(): number;
    set theta(value: number);
    fromArray(arr: SphericalLike): this;
    toVector3(out?: Vector3Like): Vector3Like;
}
