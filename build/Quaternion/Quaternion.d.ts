import { IVector3, Vector3Like } from "../vector/Vector3";
import { IPairs4Float32 } from "../common/interfaces/IPairs4";
import { Matrix3 } from "../matrix/Matrix3";
export interface IQuaternionJson {
    x: number;
    y: number;
    z: number;
    w: number;
}
export interface IQuaternion extends IPairs4Float32, IQuaternionJson {
}
export type QuaternionLike = Quaternion | Float32Array | number[];
export default class Quaternion extends Float32Array implements IQuaternion {
    static angleTo: (a: Float32Array | number[] | IQuaternion, b: Float32Array | number[] | IQuaternion) => number;
    static conjugate: (a: Float32Array | number[] | IQuaternion, out?: Quaternion) => Quaternion;
    static create: (x?: number, y?: number, z?: number, w?: number, out?: Quaternion) => Quaternion;
    static dot: (a: Float32Array | IQuaternion | number[], b: Float32Array | IQuaternion | number[]) => number;
    static fromAxisAngle: (axis: Float32Array | IVector3 | number[], rad: number, out?: Quaternion) => Quaternion;
    static fromMatrix3: (m: Float32Array | Matrix3 | number[], out?: Quaternion) => Quaternion;
    static identity: (out?: IQuaternion) => IQuaternion;
    static invert: (a: Float32Array | IQuaternion | number[], out?: Quaternion) => Quaternion;
    static lerp: (a: Float32Array | IQuaternion | number[], b: Float32Array | IQuaternion | number[], t: number, out?: Quaternion) => Quaternion;
    static multiply: (a: Float32Array | IQuaternion | number[], b: Float32Array | IQuaternion | number[], out?: Quaternion) => Quaternion;
    static normalize: (a: Float32Array | IQuaternion | number[], out?: Quaternion) => Quaternion;
    static random: (out?: IQuaternion) => IQuaternion;
    static rotationTo: (a: Vector3Like, b: Vector3Like, out?: Quaternion) => Quaternion;
    static rotateX: (a: Float32Array | IQuaternion | number[], rad: number, out?: Quaternion) => Quaternion;
    static rotateY: (a: Float32Array | IQuaternion | number[], rad: number, out?: Quaternion) => Quaternion;
    static rotateZ: (a: Float32Array | IQuaternion | number[], rad: number, out?: Quaternion) => Quaternion;
    static slerp: (a: Float32Array | IQuaternion | number[], b: Float32Array | IQuaternion | number[], t: number, out?: Quaternion) => Quaternion;
    static toAxisAngle: (q: Float32Array | IQuaternion | number[], outAxis: IVector3) => number;
    static toString: (a: Float32Array | IQuaternion | number[]) => string;
    readonly length: 4;
    readonly dataType: string;
    constructor(x?: number, y?: number, z?: number, w?: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get z(): number;
    set z(value: number);
    get w(): number;
    set w(value: number);
}
