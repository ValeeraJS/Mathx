import clampCommon from "../common/clamp";
import clampSafeCommon from "../common/clampSafe";
import closeToCommon from "../common/closeTo";
import floorToZeroCommon from "../common/floorToZero";
import { EPSILON, DEG_360_TO_RAD } from "../constants";
import { IPolar } from "../polar";
import IVector2, { IVector2Data, IVector2Json } from "./interfaces/IVector2";
import IMatrix3 from "../matrix/interfaces/IMatrix3";

let x = 0, y = 0, c = 0, s = 0;

export default class Vector2 extends Float32Array implements IVector2 {
    public readonly isVector2 = true;
    public readonly length = 2;

    constructor(x: number = 0, y: number = 0) {
        super(2);
        this[0] = x;
        this[1] = y;
    }

    get x() {
        return this[0];
    }
    
    set x(val: number) {
        this[0] = val;
    }
    
    get y() {
        return this[1];
    }
    
    set y(val: number) {
        this[1] = val;
    }
}

export const add = (a: IVector2Data, b: IVector2Data, out: IVector2Data = new Vector2()) => {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];

    return out;
};

export const addScalar = (a: IVector2Data, b: number, out: IVector2Data = new Vector2()) => {
    out[0] = a[0] + b;
    out[1] = a[1] + b;

    return out;
};

export const angle = (a: IVector2Data): number => {
    return Math.atan2(a[1], a[0]);
};

export const ceil = (a: IVector2Data, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);

    return out;
};

export const clamp = (a: IVector2Data, min: IVector2Data, max: IVector2Data, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = clampCommon(a[0], min[0], max[0]);
    out[1] = clampCommon(a[1], min[1], max[1]);

    return out;
};

export const clampSafe = (a: IVector2Data, min: IVector2, max: IVector2, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = clampSafeCommon(a[0], min[0], max[0]);
    out[1] = clampSafeCommon(a[1], min[1], max[1]);

    return out;
};

export const clampLength = (a: IVector2Data, min: IVector2, max: IVector2, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = clampSafeCommon(a[0], min[0], max[0]);
    out[1] = clampSafeCommon(a[1], min[1], max[1]);

    return out;
};

export const clampScalar = (a: IVector2Data, min: number, max: number, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = clampCommon(a[0], min, max);
    out[1] = clampCommon(a[1], min, max);

    return out;
};

export const closeTo = (a: IVector2Data, b: IVector2Data, epsilon = EPSILON): boolean => {
    return distanceTo(a, b) <= epsilon;
};

export const closeToRect = (a: IVector2Data, b: IVector2Data, epsilon = EPSILON): boolean => {
    return closeToCommon(a[0], b[0], epsilon) && closeToCommon(a[1], b[1], epsilon);
};

export const closeToManhattan = (a: IVector2Data, b: IVector2Data, epsilon = EPSILON): boolean => {
    return distanceToManhattan(a, b) <= epsilon;
};

export const clone = (a: IVector2Data, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = a[0];
    out[1] = a[1];

    return out;
};

export const cross = (a: IVector2Data, b: IVector2Data): number => {
    return a[0] * b[1] - a[1] * b[0];
};

export const distanceTo = (a: IVector2Data, b: IVector2Data): number => {
    return Math.sqrt(distanceToSquared(a, b));
};

export const distanceToManhattan = (a: IVector2Data, b: IVector2Data): number => {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

export const distanceToSquared = (a: IVector2Data, b: IVector2Data): number => {
    x = a[0] - b[0];
    y = a[1] - b[1];

    return x * x + y * y;
};

export const divide = (a: IVector2Data, b: IVector2Data, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];

    return out;
};

export const divideScalar = (a: IVector2Data, scalar: number, out: IVector2Data = new Vector2()): IVector2Data => {
    return multiplyScalar(a, 1 / scalar, out);
};

export const dot = (a: IVector2Data, b: IVector2Data): number => {
    return a[0] * b[0] + a[1] * b[1];
}

export const equals = (a: IVector2Data, b: IVector2Data): boolean => {
    return a[0] === b[0] && a[1] === b[1];
}

export const floor = (a: IVector2Data, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);

    return out;
}

export const floorToZero = (a: IVector2Data, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = floorToZeroCommon(a[0]);
    out[1] = floorToZeroCommon(a[1]);

    return out;
}

export const from = (a: IVector2Data, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = a[0];
    out[1] = a[1];

    return out;
};

export const fromArray = (arr: number[], index = 0, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = arr[index];
    out[1] = arr[index + 1];

    return out;
};

export const fromPolar = (p: IPolar, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = Math.cos(p.a) * p.r;
    out[1] = Math.sin(p.a) * p.r;

    return out;
};

export const fromScalar = (value = 0, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = out[1] = value;

    return out;
};

export const inverse = (a: IVector2Data, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = 1 / a[0] || 0;
    out[1] = 1 / a[1] || 0;

    return out;
};

export const length = (a: IVector2Data): number => {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
};

export const lengthManhattan = (a: IVector2Data): number => {
    return Math.abs(a[0]) + Math.abs(a[1]);
};

export const lengthSquared = (a: IVector2Data): number => {
    return a[0] * a[0] + a[1] * a[1];
};

export const lerp = (a: IVector2Data, b: IVector2Data, alpha: number, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = (b[0] - a[0]) * alpha + a[0];
    out[1] = (b[1] - a[1]) * alpha + a[1];

    return out;
};

export const max = (a: IVector2Data, b: IVector2Data, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);

    return out;
}

export const min = (a: IVector2Data, b: IVector2Data, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);

    return out;
}

export const minus = (a: IVector2Data, b: IVector2Data, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[0];

    return out;
}

export const minusScalar = (a: IVector2Data, num: number, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = a[0] - num;
    out[1] = a[1] - num;

    return out;
}

export const multiplyScalar = (a: IVector2Data, scalar: number, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = a[0] * scalar;
    out[1] = a[1] * scalar;

    return out;
}

export const negate = (a: IVector2Data, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = -a[0];
    out[1] = -a[1];

    return out;
}

export const normalize = (a: IVector2Data, out: IVector2Data = new Vector2()): IVector2Data => {
    return divideScalar(a, length(a) || 1, out);
}

export const random = (length: number = 1, out: IVector2Data = new Vector2()) => {
    x = Math.random() * DEG_360_TO_RAD;
    out[0] = Math.cos(x) * length;
    out[1] = Math.sin(x) * length;

    return out;
}

export const rotate = (a: IVector2Data, angle: number, center: IVector2Data = VECTOR2_ZERO, out: IVector2Data = new Vector2()): IVector2Data => {
    c = Math.cos(angle);
    s = Math.sin(angle);

    x = a[0] - center[0];
    y = a[1] - center[1];

    out[0] = x * c - y * s + center[0];
    out[1] = x * s + y * c + center[1];

    return out;
}

export const round = (a: IVector2Data, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);

    return out;
}

export const set = (x = 0, y = 0, out: IVector2Data = new Vector2()): IVector2Data => {
    out[0] = x;
    out[1] = y;

    return out;
}

export const setLength = (a: IVector2Data, length: number, out: IVector2Data = new Vector2()): IVector2Data => {
    normalize(a, out);
    multiplyScalar(out, length, out);
    return out;
}

export const toArray = (a: IVector2Data, arr: number[] = []): number[] => {
    arr[0] = a[0];
    arr[1] = a[1];

    return arr;
}

export const toJson = (a: IVector2Data, json: IVector2Json = { x: 0, y: 0 }): IVector2Json => {
    json.x = a[0];
    json.y = a[1];

    return json;
}

export const toPalorJson = (a: IVector2Data, p = { a: 0, r: 0 }): IPolar => {
    p.r = length(a);
    p.a = angle(a);

    return p;
}

export const toString = (a: IVector2Data): string => {
    return `vec2(${a[0]}, ${a[1]})`;
}

export const transformMatrix3 = (a:IVector2Data, m: IMatrix3, out: IVector2Data): IVector2Data => {
    x = a[0];
    y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];

    return out
}

export const VECTOR2_ZERO = new Vector2(0, 0);
export const VECTOR2_TOP = new Vector2(0, 1);
export const VECTOR2_BOTTOM = new Vector2(0, -1);
export const VECTOR2_LEFT = new Vector2(-1, 0);
export const VECTOR2_RIGHT = new Vector2(1, 0);
