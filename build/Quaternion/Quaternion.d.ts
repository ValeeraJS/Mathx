import { IVector3 } from "../vector/Vector3";
import { IPairs4Float32 } from "../common/interfaces/IPairs4";
import Matrix3 from "../matrix/Matrix3";
export interface IQuaternionJson {
    x: number;
    y: number;
    z: number;
    w: number;
}
export interface IQuaternion extends IPairs4Float32, IQuaternionJson {
}
export default class Quaternion extends Float32Array implements IQuaternion {
    static angleTo: (a: Float32Array | number[] | IQuaternion, b: Float32Array | number[] | IQuaternion) => number;
    static conjugate: (a: Float32Array | number[] | IQuaternion, out?: IQuaternion) => IQuaternion;
    static create: (x?: number, y?: number, z?: number, w?: number, out?: Quaternion) => IQuaternion;
    static dot: (a: Float32Array | IQuaternion | number[], b: Float32Array | IQuaternion | number[]) => number;
    static fromAxisAngle: (axis: Float32Array | IVector3 | number[], rad: number, out?: IQuaternion) => IQuaternion;
    static fromMatrix3: (m: Float32Array | Matrix3 | number[], out?: IQuaternion) => IQuaternion;
    static identity: (out?: IQuaternion) => IQuaternion;
    static invert: (a: Float32Array | IQuaternion | number[], out?: IQuaternion) => IQuaternion;
    static lerp: (a: Float32Array | IQuaternion | number[], b: Float32Array | IQuaternion | number[], t: number, out?: IQuaternion) => IQuaternion;
    static multiply: (a: Float32Array | IQuaternion | number[], b: Float32Array | IQuaternion | number[], out?: IQuaternion) => IQuaternion;
    static normalize: (a: Float32Array | IQuaternion | number[], out?: IQuaternion) => IQuaternion;
    static random: (out?: IQuaternion) => IQuaternion;
    static rotationTo: (a: Float32Array | IVector3 | number[], b: Float32Array | IVector3 | number[], out?: IQuaternion) => IQuaternion;
    static rotateX: (a: Float32Array | IQuaternion | number[], rad: number, out?: IQuaternion) => IQuaternion;
    static rotateY: (a: Float32Array | IQuaternion | number[], rad: number, out?: IQuaternion) => IQuaternion;
    static rotateZ: (a: Float32Array | IQuaternion | number[], rad: number, out?: IQuaternion) => IQuaternion;
    static slerp: (a: Float32Array | IQuaternion | number[], b: Float32Array | IQuaternion | number[], t: number, out?: IQuaternion) => IQuaternion;
    static toAxisAngle: (q: Float32Array | IQuaternion | number[], outAxis: IVector3) => number;
    static toString: (a: Float32Array | IQuaternion | number[]) => string;
    readonly length: 4;
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
