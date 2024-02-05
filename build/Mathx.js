var Mathx = (function (exports) {
	'use strict';

	const ArraybufferDataType = {
	    COLOR_CMYK: "col_cmyk",
	    COLOR_GPU: "col",
	    COLOR_HSL: "col_hsl",
	    COLOR_HSLA: "col_hsla",
	    COLOR_HSV: "col_hsv",
	    COLOR_HSVA: "col_hsva",
	    COLOR_RGB: "col_rgb",
	    COLOR_RGBA: "col_rgba",
	    COLOR_RYB: "col_ryb",
	    COLOR_RYBA: "col_ryba",
	    COLOR_XYZ: "col_xyz",
	    EULER: "euler",
	    MATRIX2: "mat2",
	    MATRIX3: "mat3",
	    MATRIX4: "mat4",
	    POLAR: "polar",
	    QUATERNION: "qua",
	    SPHERICAL: "spherical",
	    VECTOR2: "vec2",
	    VECTOR3: "vec3",
	    VECTOR4: "vec4",
	};

	const DEG_TO_RAD = Math.PI / 180;
	const DEG_360_RAD = Math.PI * 2;
	const DEG_90_RAD = Math.PI * 0.5;
	const DEG_60_RAD = Math.PI / 3;
	const DEG_45_RAD = Math.PI * 0.25;
	const DEG_30_RAD = Math.PI / 6;
	const EPSILON = Math.pow(2, -52);
	const RAD_TO_DEG = 180 / Math.PI;
	const WEIGHT_GRAY_RED = 0.299;
	const WEIGHT_GRAY_GREEN = 0.587;
	const WEIGHT_GRAY_BLUE = 0.114;

	var constants = /*#__PURE__*/Object.freeze({
		__proto__: null,
		DEG_30_RAD: DEG_30_RAD,
		DEG_360_RAD: DEG_360_RAD,
		DEG_45_RAD: DEG_45_RAD,
		DEG_60_RAD: DEG_60_RAD,
		DEG_90_RAD: DEG_90_RAD,
		DEG_TO_RAD: DEG_TO_RAD,
		EPSILON: EPSILON,
		RAD_TO_DEG: RAD_TO_DEG,
		WEIGHT_GRAY_BLUE: WEIGHT_GRAY_BLUE,
		WEIGHT_GRAY_GREEN: WEIGHT_GRAY_GREEN,
		WEIGHT_GRAY_RED: WEIGHT_GRAY_RED
	});

	const COLOR_HEX_MAP = {
	    aliceblue: 0xf0f8ff,
	    antiquewhite: 0xfaebd7,
	    aqua: 0x00ffff,
	    aquamarine: 0x7fffd4,
	    azure: 0xf0ffff,
	    beige: 0xf5f5dc,
	    bisque: 0xffe4c4,
	    black: 0x000000,
	    blanchedalmond: 0xffebcd,
	    blue: 0x0000ff,
	    blueviolet: 0x8a2be2,
	    brown: 0xa52a2a,
	    burlywood: 0xdeb887,
	    cadetblue: 0x5f9ea0,
	    chartreuse: 0x7fff00,
	    chocolate: 0xd2691e,
	    coral: 0xff7f50,
	    cornflowerblue: 0x6495ed,
	    cornsilk: 0xfff8dc,
	    crimson: 0xdc143c,
	    cyan: 0x00ffff,
	    darkblue: 0x00008b,
	    darkcyan: 0x008b8b,
	    darkgoldenrod: 0xb8860b,
	    darkgray: 0xa9a9a9,
	    darkgreen: 0x006400,
	    darkgrey: 0xa9a9a9,
	    darkkhaki: 0xbdb76b,
	    darkmagenta: 0x8b008b,
	    darkolivegreen: 0x556b2f,
	    darkorange: 0xff8c00,
	    darkorchid: 0x9932cc,
	    darkred: 0x8b0000,
	    darksalmon: 0xe9967a,
	    darkseagreen: 0x8fbc8f,
	    darkslateblue: 0x483d8b,
	    darkslategray: 0x2f4f4f,
	    darkslategrey: 0x2f4f4f,
	    darkturquoise: 0x00ced1,
	    darkviolet: 0x9400d3,
	    deeppink: 0xff1493,
	    deepskyblue: 0x00bfff,
	    dimgray: 0x696969,
	    dimgrey: 0x696969,
	    dodgerblue: 0x1e90ff,
	    firebrick: 0xb22222,
	    floralwhite: 0xfffaf0,
	    forestgreen: 0x228b22,
	    fuchsia: 0xff00ff,
	    gainsboro: 0xdcdcdc,
	    ghostwhite: 0xf8f8ff,
	    gold: 0xffd700,
	    goldenrod: 0xdaa520,
	    gray: 0x808080,
	    green: 0x008000,
	    greenyellow: 0xadff2f,
	    grey: 0x808080,
	    honeydew: 0xf0fff0,
	    hotpink: 0xff69b4,
	    indianred: 0xcd5c5c,
	    indigo: 0x4b0082,
	    ivory: 0xfffff0,
	    khaki: 0xf0e68c,
	    lavender: 0xe6e6fa,
	    lavenderblush: 0xfff0f5,
	    lawngreen: 0x7cfc00,
	    lemonchiffon: 0xfffacd,
	    lightblue: 0xadd8e6,
	    lightcoral: 0xf08080,
	    lightcyan: 0xe0ffff,
	    lightgoldenrodyellow: 0xfafad2,
	    lightgray: 0xd3d3d3,
	    lightgreen: 0x90ee90,
	    lightgrey: 0xd3d3d3,
	    lightpink: 0xffb6c1,
	    lightsalmon: 0xffa07a,
	    lightseagreen: 0x20b2aa,
	    lightskyblue: 0x87cefa,
	    lightslategray: 0x778899,
	    lightslategrey: 0x778899,
	    lightsteelblue: 0xb0c4de,
	    lightyellow: 0xffffe0,
	    lime: 0x00ff00,
	    limegreen: 0x32cd32,
	    linen: 0xfaf0e6,
	    magenta: 0xff00ff,
	    maroon: 0x800000,
	    mediumaquamarine: 0x66cdaa,
	    mediumblue: 0x0000cd,
	    mediumorchid: 0xba55d3,
	    mediumpurple: 0x9370db,
	    mediumseagreen: 0x3cb371,
	    mediumslateblue: 0x7b68ee,
	    mediumspringgreen: 0x00fa9a,
	    mediumturquoise: 0x48d1cc,
	    mediumvioletred: 0xc71585,
	    midnightblue: 0x191970,
	    mintcream: 0xf5fffa,
	    mistyrose: 0xffe4e1,
	    moccasin: 0xffe4b5,
	    navajowhite: 0xffdead,
	    navy: 0x000080,
	    oldlace: 0xfdf5e6,
	    olive: 0x808000,
	    olivedrab: 0x6b8e23,
	    orange: 0xffa500,
	    orangered: 0xff4500,
	    orchid: 0xda70d6,
	    palegoldenrod: 0xeee8aa,
	    palegreen: 0x98fb98,
	    paleturquoise: 0xafeeee,
	    palevioletred: 0xdb7093,
	    papayawhip: 0xffefd5,
	    peachpuff: 0xffdab9,
	    peru: 0xcd853f,
	    pink: 0xffc0cb,
	    plum: 0xdda0dd,
	    powderblue: 0xb0e0e6,
	    purple: 0x800080,
	    rebeccapurple: 0x663399,
	    red: 0xff0000,
	    rosybrown: 0xbc8f8f,
	    royalblue: 0x4169e1,
	    saddlebrown: 0x8b4513,
	    salmon: 0xfa8072,
	    sandybrown: 0xf4a460,
	    seagreen: 0x2e8b57,
	    seashell: 0xfff5ee,
	    sienna: 0xa0522d,
	    silver: 0xc0c0c0,
	    skyblue: 0x87ceeb,
	    slateblue: 0x6a5acd,
	    slategray: 0x708090,
	    slategrey: 0x708090,
	    snow: 0xfffafa,
	    springgreen: 0x00ff7f,
	    steelblue: 0x4682b4,
	    tan: 0xd2b48c,
	    teal: 0x008080,
	    thistle: 0xd8bfd8,
	    tomato: 0xff6347,
	    turquoise: 0x40e0d0,
	    violet: 0xee82ee,
	    wheat: 0xf5deb3,
	    white: 0xffffff,
	    whitesmoke: 0xf5f5f5,
	    yellow: 0xffff00,
	    yellowgreen: 0x9acd32,
	};

	let max$2 = 0;
	class ColorCMYK extends Float32Array {
	    dataType = ArraybufferDataType.COLOR_CMYK;
	    static fromRGBUnsignedNormal(r, g, b, out = new ColorCMYK()) {
	        max$2 = Math.max(r, g, b);
	        out[0] = 1 - r / max$2;
	        out[1] = 1 - g / max$2;
	        out[2] = 1 - b / max$2;
	        out[3] = 1 - max$2;
	        return out;
	    }
	    constructor(c = 0, m = 0, y = 0, k = 0) {
	        super(4);
	        this[0] = c;
	        this[1] = m;
	        this[2] = y;
	        this[3] = k;
	    }
	    get c() {
	        return this[0];
	    }
	    set c(val) {
	        this[0] = val;
	    }
	    get m() {
	        return this[1];
	    }
	    set m(val) {
	        this[1] = val;
	    }
	    get y() {
	        return this[2];
	    }
	    set y(val) {
	        this[2] = val;
	    }
	    get k() {
	        return this[3];
	    }
	    set k(val) {
	        this[3] = val;
	    }
	}

	const hue2rgb = (p, q, t) => {
	    if (t < 0)
	        t += 1;
	    if (t > 1)
	        t -= 1;
	    if (t < 1 / 6)
	        return p + (q - p) * 6 * t;
	    if (t < 1 / 2)
	        return q;
	    if (t < 2 / 3)
	        return p + (q - p) * (2 / 3 - t) * 6;
	    return p;
	};
	const linearToSrgb = (c) => {
	    if (c <= 0) {
	        return 0;
	    }
	    else if (c >= 1) {
	        return 1;
	    }
	    else if (c < 0.0031308) {
	        return c * 12.92;
	    }
	    else {
	        return Math.pow(c, 1 / 2.4) * 1.055 - 0.055;
	    }
	};
	const srgbToLinear = (x) => {
	    if (x <= 0) {
	        return 0;
	    }
	    else if (x >= 1) {
	        return 1;
	    }
	    else if (x < 0.04045) {
	        return x / 12.92;
	    }
	    else {
	        return Math.pow((x + 0.055) / 1.055, 2.4);
	    }
	};

	/**
	 * @function clamp
	 * @desc 将目标值限定在指定区间内。假定min小于等于max才能得到正确的结果。
	 * @see clampSafe
	 * @param {number} val 目标值
	 * @param {number} min 最小值，必须小于等于max
	 * @param {number} max 最大值，必须大于等于min
	 * @returns {number} 限制之后的值
	 * @example Mathx.clamp(1, 0, 2); // 1;
	 * Mathx.clamp(-1, 0, 2); // 0;
	 * Mathx.clamp(3, 0, 2); // 2;
	 */
	const clamp = (val, min, max) => {
	    return Math.max(min, Math.min(max, val));
	};

	/**
	 * @function clampSafe
	 * @desc 与clamp函数功能一样，将目标值限定在指定区间内。但此函数是安全的，不要求第二个参数必须小于第三个参数
	 * @see clamp
	 * @param {number} val 目标值
	 * @param {number} a 区间中一个最值
	 * @param {number} b 区间中另一个最值
	 * @returns {number} 限制之后的值
	 * @example Mathx.clamp(1, 0, 2); // 1;
	 * Mathx.clamp(1, 2, 0); // 1;
	 * Mathx.clamp(-1, 0, 2); // 0;
	 * Mathx.clamp(-1, 2, 0); // 0;
	 * Mathx.clamp(3, 0, 2); // 2;
	 * Mathx.clamp(3, 2, 0); // 2;
	 */
	const clampSafe = (val, a, b) => {
	    if (a > b) {
	        return Math.max(b, Math.min(a, val));
	    }
	    else if (b > a) {
	        return Math.max(a, Math.min(b, val));
	    }
	    return a;
	};

	/**
	 * @function closeTo
	 * @desc 判断一个数是否在另一个数的邻域内，通常用于检验浮点计算是否精度在EPSILON以内
	 * @param {number} val 需要判断的数值
	 * @param {number} target 目标数值
	 * @param {number} [epsilon = Number.EPSILON] 邻域半径
	 * @example Mathx.closeTo(0.1 + 0.2, 0.3); // true;
	 * Mathx.clamp(2, 3, 1); // true;
	 * Mathx.clamp(2, 3, 0.5); // false;
	 */
	const closeTo = (val, target, epsilon = EPSILON) => {
	    return Math.abs(val - target) <= epsilon;
	};

	/**
	 * @function floorToZero
	 * @desc 以0为中心取整
	 * @param {number} num 数值
	 * @return {number} 取整之后的结果
	 * @example Mathx.roundToZero(0.8 ); // 0;
	 * Mathx.roundToZero(-0.8); // 0;
	 * Mathx.roundToZero(-1.1); // -1;
	 */
	const floorToZero = (num) => {
	    return num < 0 ? Math.ceil(num) : Math.floor(num);
	};

	let x$4 = 0;
	let y$4 = 0;
	let c$1 = 0;
	let s$4 = 0;
	class Vector2 extends Float32Array {
	    static VECTOR2_ZERO = new Vector2(0, 0);
	    static VECTOR2_TOP = new Vector2(0, 1);
	    static VECTOR2_BOTTOM = new Vector2(0, -1);
	    static VECTOR2_LEFT = new Vector2(-1, 0);
	    static VECTOR2_RIGHT = new Vector2(1, 0);
	    static VECTOR2_ONE = new Vector2(1, 1);
	    static add = (a, b, out = new Vector2()) => {
	        out[0] = a[0] + b[0];
	        out[1] = a[1] + b[1];
	        return out;
	    };
	    static addScalar = (a, b, out = new Vector2()) => {
	        out[0] = a[0] + b;
	        out[1] = a[1] + b;
	        return out;
	    };
	    static angle = (a) => {
	        return Math.atan2(a[1], a[0]);
	    };
	    static area = (a) => {
	        return a[0] * a[1];
	    };
	    static ceil = (a, out = new Vector2()) => {
	        out[0] = Math.ceil(a[0]);
	        out[1] = Math.ceil(a[1]);
	        return out;
	    };
	    static clamp = (a, min, max, out = new Vector2()) => {
	        out[0] = clamp(a[0], min[0], max[0]);
	        out[1] = clamp(a[1], min[1], max[1]);
	        return out;
	    };
	    static clampSafe = (a, min, max, out = new Vector2()) => {
	        out[0] = clampSafe(a[0], min[0], max[0]);
	        out[1] = clampSafe(a[1], min[1], max[1]);
	        return out;
	    };
	    static clampLength = (a, min, max, out = new Vector2()) => {
	        out[0] = clampSafe(a[0], min[0], max[0]);
	        out[1] = clampSafe(a[1], min[1], max[1]);
	        return out;
	    };
	    static clampScalar = (a, min, max, out = new Vector2()) => {
	        out[0] = clamp(a[0], min, max);
	        out[1] = clamp(a[1], min, max);
	        return out;
	    };
	    static closeTo = (a, b, epsilon = EPSILON) => {
	        return Vector2.distanceTo(a, b) <= epsilon;
	    };
	    static closeToRect = (a, b, epsilon = EPSILON) => {
	        return closeTo(a[0], b[0], epsilon) && closeTo(a[1], b[1], epsilon);
	    };
	    static closeToManhattan = (a, b, epsilon = EPSILON) => {
	        return Vector2.distanceToManhattan(a, b) <= epsilon;
	    };
	    static clone = (a, out = new Vector2()) => {
	        out[0] = a[0];
	        out[1] = a[1];
	        return out;
	    };
	    static cross = (a, b) => {
	        return a[0] * b[1] - a[1] * b[0];
	    };
	    static create = (x = 0, y = 0) => {
	        const out = new Vector2();
	        out[0] = x;
	        out[1] = y;
	        return out;
	    };
	    static distanceTo = (a, b) => {
	        x$4 = b[0] - a[0];
	        y$4 = b[1] - a[1];
	        return Math.hypot(x$4, y$4);
	    };
	    static distanceToManhattan = (a, b) => {
	        return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
	    };
	    static distanceToSquared = (a, b) => {
	        x$4 = a[0] - b[0];
	        y$4 = a[1] - b[1];
	        return x$4 * x$4 + y$4 * y$4;
	    };
	    static divide = (a, b, out = new Vector2()) => {
	        out[0] = a[0] / b[0];
	        out[1] = a[1] / b[1];
	        return out;
	    };
	    static divideScalar = (a, scalar, out = new Vector2()) => {
	        return Vector2.multiplyScalar(a, 1 / scalar, out);
	    };
	    static dot = (a, b) => {
	        return a[0] * b[0] + a[1] * b[1];
	    };
	    static equals = (a, b) => {
	        return a[0] === b[0] && a[1] === b[1];
	    };
	    static floor = (a, out = new Vector2()) => {
	        out[0] = Math.floor(a[0]);
	        out[1] = Math.floor(a[1]);
	        return out;
	    };
	    static floorToZero = (a, out = new Vector2()) => {
	        out[0] = floorToZero(a[0]);
	        out[1] = floorToZero(a[1]);
	        return out;
	    };
	    static fromArray = (arr, index = 0, out = new Vector2()) => {
	        out[0] = arr[index];
	        out[1] = arr[index + 1];
	        return out;
	    };
	    static fromJson = (j, out = new Vector2()) => {
	        out[0] = j.x;
	        out[1] = j.y;
	        return out;
	    };
	    static fromPolar = (p, out = new Vector2()) => {
	        out[0] = Math.cos(p.a) * p.r;
	        out[1] = Math.sin(p.a) * p.r;
	        return out;
	    };
	    static fromPointerEvent = (e, out = new Vector2()) => {
	        if (e.target) {
	            out[0] = (e.clientX / e.target.offsetWidth) * 2 - 1;
	            out[1] = 1 - (e.clientY / e.target.offsetHeight) * 2;
	        }
	        return out;
	    };
	    static fromScalar = (value = 0, out = new Vector2()) => {
	        out[0] = out[1] = value;
	        return out;
	    };
	    static fromXY = (x, y, out = new Vector2()) => {
	        out[0] = x;
	        out[1] = y;
	        return out;
	    };
	    static inverse = (a, out = new Vector2()) => {
	        out[0] = 1 / a[0] || 0;
	        out[1] = 1 / a[1] || 0;
	        return out;
	    };
	    static norm = (a) => {
	        return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
	    };
	    static lengthManhattan = (a) => {
	        return Math.abs(a[0]) + Math.abs(a[1]);
	    };
	    static lengthSquared = (a) => {
	        return a[0] * a[0] + a[1] * a[1];
	    };
	    static lerp = (a, b, alpha, out = new Vector2()) => {
	        out[0] = (b[0] - a[0]) * alpha + a[0];
	        out[1] = (b[1] - a[1]) * alpha + a[1];
	        return out;
	    };
	    static max = (a, b, out = new Vector2()) => {
	        out[0] = Math.max(a[0], b[0]);
	        out[1] = Math.max(a[1], b[1]);
	        return out;
	    };
	    static min = (a, b, out = new Vector2()) => {
	        out[0] = Math.min(a[0], b[0]);
	        out[1] = Math.min(a[1], b[1]);
	        return out;
	    };
	    static minus = (a, b, out = new Vector2()) => {
	        out[0] = a[0] - b[0];
	        out[1] = a[1] - b[1];
	        return out;
	    };
	    static minusScalar = (a, num, out = new Vector2()) => {
	        out[0] = a[0] - num;
	        out[1] = a[1] - num;
	        return out;
	    };
	    static multiply = (a, b, out = new Vector2()) => {
	        out[0] = a[0] * b[0];
	        out[1] = a[1] * b[1];
	        return out;
	    };
	    static multiplyScalar = (a, scalar, out = new Vector2()) => {
	        out[0] = a[0] * scalar;
	        out[1] = a[1] * scalar;
	        return out;
	    };
	    static negate = (a, out = new Vector2()) => {
	        out[0] = -a[0];
	        out[1] = -a[1];
	        return out;
	    };
	    static normalize = (a, out = new Vector2()) => {
	        return Vector2.divideScalar(a, Vector2.norm(a) || 1, out);
	    };
	    static opposite = (a, center, out = new Vector2()) => {
	        x$4 = center[0];
	        y$4 = center[1];
	        out[0] = x$4 + x$4 - a[0];
	        out[1] = y$4 + y$4 - a[1];
	        return out;
	    };
	    static random = (norm = 1, out = new Vector2()) => {
	        x$4 = Math.random() * DEG_360_RAD;
	        out[0] = Math.cos(x$4) * norm;
	        out[1] = Math.sin(x$4) * norm;
	        return out;
	    };
	    static reflect = (origin, normal, out = new Vector2()) => {
	        Vector2.multiplyScalar(normal, 2 * Vector2.dot(origin, normal), out);
	        return Vector2.minus(origin, out, out);
	    };
	    static rotate = (a, angle, center = Vector2.VECTOR2_ZERO, out = new Vector2()) => {
	        c$1 = Math.cos(angle);
	        s$4 = Math.sin(angle);
	        x$4 = a[0] - center[0];
	        y$4 = a[1] - center[1];
	        out[0] = x$4 * c$1 - y$4 * s$4 + center[0];
	        out[1] = x$4 * s$4 + y$4 * c$1 + center[1];
	        return out;
	    };
	    static round = (a, out = new Vector2()) => {
	        out[0] = Math.round(a[0]);
	        out[1] = Math.round(a[1]);
	        return out;
	    };
	    static setNorm = (a, norm, out = new Vector2(2)) => {
	        Vector2.normalize(a, out);
	        return Vector2.multiplyScalar(out, norm, out);
	    };
	    static toArray = (a, arr = []) => {
	        arr[0] = a[0];
	        arr[1] = a[1];
	        return arr;
	    };
	    static toPalorJson = (a, p = { a: 0, r: 0 }) => {
	        p.r = Vector2.norm(a);
	        p.a = Vector2.angle(a);
	        return p;
	    };
	    static toString = (a) => {
	        return `(${a[0]}, ${a[1]})`;
	    };
	    static transformDirection = (a, m, out = new Vector2()) => {
	        x$4 = a[0];
	        y$4 = a[1];
	        out[0] = m[0] * x$4 + m[3] * y$4;
	        out[1] = m[1] * x$4 + m[4] * y$4;
	        return Vector2.normalize(out, out);
	    };
	    static transformMatrix3 = (a, m, out = new Vector2()) => {
	        x$4 = a[0];
	        y$4 = a[1];
	        out[0] = m[0] * x$4 + m[3] * y$4 + m[6];
	        out[1] = m[1] * x$4 + m[4] * y$4 + m[7];
	        return out;
	    };
	    dataType = ArraybufferDataType.VECTOR2;
	    constructor(x = 0, y = 0) {
	        super(2);
	        this[0] = x;
	        this[1] = y;
	    }
	    get x() {
	        return this[0];
	    }
	    set x(value) {
	        this[0] = value;
	    }
	    get y() {
	        return this[1];
	    }
	    set y(value) {
	        this[1] = value;
	    }
	}

	let ax$1;
	let ay$1;
	let az$1;
	let bx$1;
	let by$1;
	let bz$1;
	let ag;
	let s$3;
	class Vector3 extends Float32Array {
	    static VECTOR3_ZERO = new Vector3(0, 0, 0);
	    static VECTOR3_ONE = new Vector3(1, 1, 1);
	    static VECTOR3_TOP = new Vector3(0, 1, 0);
	    static VECTOR3_BOTTOM = new Vector3(0, -1, 0);
	    static VECTOR3_LEFT = new Vector3(-1, 0, 0);
	    static VECTOR3_RIGHT = new Vector3(1, 0, 0);
	    static VECTOR3_FRONT = new Vector3(0, 0, -1);
	    static VECTOR3_BACK = new Vector3(0, 0, 1);
	    static add = (a, b, out = new Vector3()) => {
	        out[0] = a[0] + b[0];
	        out[1] = a[1] + b[1];
	        out[2] = a[2] + b[2];
	        return out;
	    };
	    static addScalar = (a, b, out = new Vector3()) => {
	        out[0] = a[0] + b;
	        out[1] = a[1] + b;
	        out[2] = a[2] + b;
	        return out;
	    };
	    static angle = (a, b) => {
	        ax$1 = a[0];
	        ay$1 = a[1];
	        az$1 = a[2];
	        bx$1 = b[0];
	        by$1 = b[1];
	        bz$1 = b[2];
	        const mag1 = Math.sqrt(ax$1 * ax$1 + ay$1 * ay$1 + az$1 * az$1);
	        const mag2 = Math.sqrt(bx$1 * bx$1 + by$1 * by$1 + bz$1 * bz$1);
	        const mag = mag1 * mag2;
	        const cosine = mag && Vector3.dot(a, b) / mag;
	        return Math.acos(clamp(cosine, -1, 1));
	    };
	    static clamp = (a, min, max, out = new Vector3()) => {
	        out[0] = clamp(a[0], min[0], max[0]);
	        out[1] = clamp(a[1], min[1], max[1]);
	        out[2] = clamp(a[2], min[2], max[2]);
	        return out;
	    };
	    static clampSafe = (a, min, max, out = new Vector3()) => {
	        out[0] = clampSafe(a[0], min[0], max[0]);
	        out[1] = clampSafe(a[1], min[1], max[1]);
	        out[1] = clampSafe(a[2], min[2], max[2]);
	        return out;
	    };
	    static clampScalar = (a, min, max, out = new Vector3()) => {
	        out[0] = clamp(a[0], min, max);
	        out[1] = clamp(a[1], min, max);
	        out[2] = clamp(a[2], min, max);
	        return out;
	    };
	    static clone = (a, out = new Vector3()) => {
	        out[0] = a[0];
	        out[1] = a[1];
	        out[2] = a[2];
	        return out;
	    };
	    static closeTo = (a, b, epsilon = EPSILON) => {
	        return Vector3.distanceTo(a, b) <= epsilon;
	    };
	    static closeToRect = (a, b, epsilon = EPSILON) => {
	        return closeTo(a[0], b[0], epsilon) && closeTo(a[1], b[1], epsilon) && closeTo(a[2], b[2], epsilon);
	    };
	    static create = (x = 0, y = 0, z = 0) => {
	        const out = new Vector3();
	        out[0] = x;
	        out[1] = y;
	        out[2] = z;
	        return out;
	    };
	    static cross = (a, b, out = new Vector3()) => {
	        ax$1 = a[0];
	        ay$1 = a[1];
	        az$1 = a[2];
	        bx$1 = b[0];
	        by$1 = b[1];
	        bz$1 = b[2];
	        out[0] = ay$1 * bz$1 - az$1 * by$1;
	        out[1] = az$1 * bx$1 - ax$1 * bz$1;
	        out[2] = ax$1 * by$1 - ay$1 * bx$1;
	        return out;
	    };
	    static distanceTo = (a, b) => {
	        ax$1 = b[0] - a[0];
	        ay$1 = b[1] - a[1];
	        az$1 = b[2] - a[2];
	        return Math.hypot(ax$1, ay$1, az$1);
	    };
	    static distanceToManhattan = (a, b) => {
	        return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
	    };
	    static distanceToSquared = (a, b) => {
	        ax$1 = a[0] - b[0];
	        ay$1 = a[1] - b[1];
	        az$1 = a[2] - b[2];
	        return ax$1 * ax$1 + ay$1 * ay$1 + az$1 * az$1;
	    };
	    static divide = (a, b, out = new Vector3()) => {
	        out[0] = a[0] / b[0];
	        out[1] = a[1] / b[1];
	        out[2] = a[2] / b[2];
	        return out;
	    };
	    static divideScalar = (a, b, out = new Vector3()) => {
	        out[0] = a[0] / b;
	        out[1] = a[1] / b;
	        out[2] = a[2] / b;
	        return out;
	    };
	    static dot = (a, b) => {
	        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	    };
	    static equals = (a, b) => {
	        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
	    };
	    static floor = (a, out = new Vector3()) => {
	        out[0] = Math.floor(a[0]);
	        out[1] = Math.floor(a[1]);
	        out[2] = Math.floor(a[2]);
	        return out;
	    };
	    static fromArray = (a, offset = 0, out = new Vector3()) => {
	        out[0] = a[offset];
	        out[1] = a[offset + 1];
	        out[2] = a[offset + 2];
	        return out;
	    };
	    static fromScalar = (num, out = new Vector3()) => {
	        out[0] = out[1] = out[2] = num;
	        return out;
	    };
	    static fromXYZ = (x, y, z, out = new Vector3()) => {
	        out[0] = x;
	        out[1] = y;
	        out[2] = z;
	        return out;
	    };
	    static fromMatrix4Scale = (mat, out = new Vector3()) => {
	        out[0] = mat[0];
	        out[1] = mat[5];
	        out[2] = mat[10];
	        return out;
	    };
	    static fromMatrix4Translate = (mat, out = new Vector3()) => {
	        out[0] = mat[12];
	        out[1] = mat[13];
	        out[2] = mat[14];
	        return out;
	    };
	    static hermite = (a, b, c, d, t, out = new Vector3()) => {
	        ag = t * t;
	        const factor1 = ag * (2 * t - 3) + 1;
	        const factor2 = ag * (t - 2) + t;
	        const factor3 = ag * (t - 1);
	        const factor4 = ag * (3 - 2 * t);
	        out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
	        out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
	        out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
	        return out;
	    };
	    static inverse = (a, out = new Vector3()) => {
	        out[0] = 1.0 / a[0];
	        out[1] = 1.0 / a[1];
	        out[2] = 1.0 / a[2];
	        return out;
	    };
	    static norm = (a) => {
	        return Math.sqrt(Vector3.lengthSquared(a));
	    };
	    static lengthManhattan = (a) => {
	        return Math.abs(a[0]) + Math.abs(a[1]) + Math.abs(a[2]);
	    };
	    static lengthSquared = (a) => {
	        return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
	    };
	    static lerp = (a, b, alpha, out = new Vector3()) => {
	        out[0] = (b[0] - a[0]) * alpha + a[0];
	        out[1] = (b[1] - a[1]) * alpha + a[1];
	        out[2] = (b[2] - a[2]) * alpha + a[2];
	        return out;
	    };
	    static max = (a, b, out = new Vector3()) => {
	        out[0] = Math.max(a[0], b[0]);
	        out[1] = Math.max(a[1], b[1]);
	        out[2] = Math.max(a[2], b[2]);
	        return out;
	    };
	    static min = (a, b, out = new Vector3()) => {
	        out[0] = Math.min(a[0], b[0]);
	        out[1] = Math.min(a[1], b[1]);
	        out[2] = Math.min(a[2], b[2]);
	        return out;
	    };
	    static minus = (a, b, out = new Vector3()) => {
	        out[0] = a[0] - b[0];
	        out[1] = a[1] - b[1];
	        out[2] = a[2] - b[2];
	        return out;
	    };
	    static minusScalar = (a, b, out = new Vector3()) => {
	        out[0] = a[0] - b;
	        out[1] = a[1] - b;
	        out[2] = a[2] - b;
	        return out;
	    };
	    static multiply = (a, b, out = new Vector3()) => {
	        out[0] = a[0] * b[0];
	        out[1] = a[1] * b[1];
	        out[2] = a[2] * b[2];
	        return out;
	    };
	    static multiplyScalar = (a, scalar, out = new Vector3()) => {
	        out[0] = a[0] * scalar;
	        out[1] = a[1] * scalar;
	        out[2] = a[2] * scalar;
	        return out;
	    };
	    static negate = (a, out = new Vector3()) => {
	        out[0] = -a[0];
	        out[1] = -a[1];
	        out[2] = -a[2];
	        return out;
	    };
	    static normalize = (a, out = new Vector3()) => {
	        return Vector3.divideScalar(a, Vector3.norm(a) || 1, out);
	    };
	    static opposite = (a, center, out = new Vector3()) => {
	        ax$1 = center[0];
	        ay$1 = center[1];
	        az$1 = center[2];
	        out[0] = ax$1 + ax$1 - a[0];
	        out[1] = ay$1 + ay$1 - a[1];
	        out[2] = az$1 + az$1 - a[2];
	        return out;
	    };
	    static reflect = (origin, normal, out = new Vector3()) => {
	        Vector3.multiplyScalar(normal, 2 * Vector3.dot(origin, normal), out);
	        return Vector3.minus(origin, out, out);
	    };
	    static rotateX = (a, b, rad, out = new Vector3()) => {
	        ax$1 = a[0] - b[0];
	        ay$1 = a[1] - b[1];
	        az$1 = a[2] - b[2];
	        bx$1 = ax$1;
	        by$1 = ay$1 * Math.cos(rad) - az$1 * Math.sin(rad);
	        bz$1 = ay$1 * Math.sin(rad) + az$1 * Math.cos(rad);
	        out[0] = bx$1 + b[0];
	        out[1] = by$1 + b[1];
	        out[2] = bz$1 + b[2];
	        return out;
	    };
	    static rotateY = (a, b, rad, out = new Vector3()) => {
	        ax$1 = a[0] - b[0];
	        ay$1 = a[1] - b[1];
	        az$1 = a[2] - b[2];
	        bx$1 = az$1 * Math.sin(rad) + ax$1 * Math.cos(rad);
	        by$1 = ay$1;
	        bz$1 = az$1 * Math.cos(rad) - ax$1 * Math.sin(rad);
	        out[0] = bx$1 + b[0];
	        out[1] = by$1 + b[1];
	        out[2] = bz$1 + b[2];
	        return out;
	    };
	    static rotateZ = (a, b, rad, out = new Vector3()) => {
	        ax$1 = a[0] - b[0];
	        ay$1 = a[1] - b[1];
	        az$1 = a[2] - b[2];
	        bx$1 = ax$1 * Math.cos(rad) - ay$1 * Math.sin(rad);
	        by$1 = ax$1 * Math.sin(rad) + ay$1 * Math.cos(rad);
	        bz$1 = az$1;
	        out[0] = bx$1 + b[0];
	        out[1] = by$1 + b[1];
	        out[2] = bz$1 + b[2];
	        return out;
	    };
	    static round = (a, out = new Vector3()) => {
	        out[0] = Math.round(a[0]);
	        out[1] = Math.round(a[1]);
	        out[2] = Math.round(a[2]);
	        return out;
	    };
	    static setNorm = (a, norm, out = new Vector3()) => {
	        return Vector3.multiplyScalar(Vector3.normalize(a, out), norm, out);
	    };
	    static slerp = (a, b, t, out = new Vector3()) => {
	        ag = Math.acos(Math.min(Math.max(Vector3.dot(a, b), -1), 1));
	        s$3 = Math.sin(ag);
	        ax$1 = Math.sin((1 - t) * ag) / s$3;
	        bx$1 = Math.sin(t * ag) / s$3;
	        out[0] = ax$1 * a[0] + bx$1 * b[0];
	        out[1] = ax$1 * a[1] + bx$1 * b[1];
	        out[2] = ax$1 * a[2] + bx$1 * b[2];
	        return out;
	    };
	    static toString = (a) => {
	        return `(${a[0]}, ${a[1]}, ${a[2]})`;
	    };
	    static transformMatrix3 = (a, m, out = new Vector3()) => {
	        ax$1 = a[0];
	        ay$1 = a[1];
	        az$1 = a[2];
	        out[0] = ax$1 * m[0] + ay$1 * m[3] + az$1 * m[6];
	        out[1] = ax$1 * m[1] + ay$1 * m[4] + az$1 * m[7];
	        out[2] = ax$1 * m[2] + ay$1 * m[5] + az$1 * m[8];
	        return out;
	    };
	    static transformDirection = (a, m, out = new Vector3()) => {
	        ax$1 = a[0];
	        ay$1 = a[1];
	        az$1 = a[2];
	        out[0] = m[0] * ax$1 + m[4] * ay$1 + m[8] * az$1;
	        out[1] = m[1] * ax$1 + m[5] * ay$1 + m[9] * az$1;
	        out[2] = m[2] * ax$1 + m[6] * ay$1 + m[10] * az$1;
	        return Vector3.normalize(out, out);
	    };
	    static transformMatrix4 = (a, m, out = new Vector3()) => {
	        ax$1 = a[0];
	        ay$1 = a[1];
	        az$1 = a[2];
	        ag = m[3] * ax$1 + m[7] * ay$1 + m[11] * az$1 + m[15];
	        ag = ag ? 1 / ag : 1.0;
	        out[0] = (m[0] * ax$1 + m[4] * ay$1 + m[8] * az$1 + m[12]) * ag;
	        out[1] = (m[1] * ax$1 + m[5] * ay$1 + m[9] * az$1 + m[13]) * ag;
	        out[2] = (m[2] * ax$1 + m[6] * ay$1 + m[10] * az$1 + m[14]) * ag;
	        return out;
	    };
	    static transformQuat = (a, q, out = new Vector3()) => {
	        const qx = q[0];
	        const qy = q[1];
	        const qz = q[2];
	        const qw = q[3];
	        const x = a[0];
	        const y = a[1];
	        const z = a[2];
	        // var qvec = [qx, qy, qz];
	        // var uv = vec3.cross([], qvec, a);
	        let uvx = qy * z - qz * y;
	        let uvy = qz * x - qx * z;
	        let uvz = qx * y - qy * x;
	        // var uuv = vec3.cross([], qvec, uv);
	        let uuvx = qy * uvz - qz * uvy;
	        let uuvy = qz * uvx - qx * uvz;
	        let uuvz = qx * uvy - qy * uvx;
	        // vec3.scale(uv, uv, 2 * w);
	        const w2 = qw * 2;
	        uvx *= w2;
	        uvy *= w2;
	        uvz *= w2;
	        // vec3.scale(uuv, uuv, 2);
	        uuvx *= 2;
	        uuvy *= 2;
	        uuvz *= 2;
	        // return vec3.add(out, a, vec3.add(out, uv, uuv));
	        out[0] = x + uvx + uuvx;
	        out[1] = y + uvy + uuvy;
	        out[2] = z + uvz + uuvz;
	        return out;
	    };
	    static volume = (a) => {
	        return a[0] * a[1] * a[2];
	    };
	    dataType = ArraybufferDataType.VECTOR3;
	    constructor(x = 0, y = 0, z = 0) {
	        super(3);
	        this[0] = x;
	        this[1] = y;
	        this[2] = z;
	    }
	    get x() {
	        return this[0];
	    }
	    set x(value) {
	        this[0] = value;
	    }
	    get y() {
	        return this[1];
	    }
	    set y(value) {
	        this[1] = value;
	    }
	    get z() {
	        return this[2];
	    }
	    set z(value) {
	        this[2] = value;
	    }
	}

	let ax;
	let ay;
	let az;
	let aw;
	let bx;
	let by;
	let bz;
	let len$2;
	let ix;
	let iy;
	let iz;
	let iw;
	let A;
	let B;
	let C;
	let D;
	let E;
	let F;
	let G;
	let H;
	let I;
	let J;
	class Vector4 extends Float32Array {
	    static VECTOR4_ZERO = new Vector4(0, 0, 0, 0);
	    static VECTOR4_ONE = new Vector4(1, 1, 1, 1);
	    static add = (a, b, out = new Vector4()) => {
	        out[0] = a[0] + b[0];
	        out[1] = a[1] + b[1];
	        out[2] = a[2] + b[2];
	        out[3] = a[3] + b[3];
	        return out;
	    };
	    static ceil = (a, out = new Vector4()) => {
	        out[0] = Math.ceil(a[0]);
	        out[1] = Math.ceil(a[1]);
	        out[2] = Math.ceil(a[2]);
	        out[3] = Math.ceil(a[3]);
	        return out;
	    };
	    static closeTo = (a, b, epsilon = EPSILON) => {
	        return Vector4.distanceTo(a, b) <= epsilon;
	    };
	    static closeToRect = (a, b, epsilon = EPSILON) => {
	        return closeTo(a[0], b[0], epsilon) && closeTo(a[1], b[1], epsilon) && closeTo(a[2], b[2], epsilon) && closeTo(a[3], b[3], epsilon);
	    };
	    static create = (x = 0, y = 0, z = 0, w = 0) => {
	        const out = new Vector4();
	        out[0] = x;
	        out[1] = y;
	        out[2] = z;
	        out[3] = w;
	        return out;
	    };
	    static cross = (u, v, w, out = new Vector4(4)) => {
	        A = v[0] * w[1] - v[1] * w[0];
	        B = v[0] * w[2] - v[2] * w[0];
	        C = v[0] * w[3] - v[3] * w[0];
	        D = v[1] * w[2] - v[2] * w[1];
	        E = v[1] * w[3] - v[3] * w[1];
	        F = v[2] * w[3] - v[3] * w[2];
	        G = u[0];
	        H = u[1];
	        I = u[2];
	        J = u[3];
	        out[0] = H * F - I * E + J * D;
	        out[1] = -(G * F) + I * C - J * B;
	        out[2] = G * E - H * C + J * A;
	        out[3] = -(G * D) + H * B - I * A;
	        return out;
	    };
	    static distanceTo = (a, b) => {
	        ax = b[0] - a[0];
	        ay = b[1] - a[1];
	        az = b[2] - a[2];
	        aw = b[3] - a[3];
	        return Math.hypot(ax, ay, az, aw);
	    };
	    static distanceToSquared = (a, b) => {
	        ax = b[0] - a[0];
	        ay = b[1] - a[1];
	        az = b[2] - a[2];
	        aw = b[3] - a[3];
	        return ax * ax + ay * ay + az * az + aw * aw;
	    };
	    static divide = (a, b, out = new Vector4()) => {
	        out[0] = a[0] / b[0];
	        out[1] = a[1] / b[1];
	        out[2] = a[2] / b[2];
	        out[3] = a[3] / b[3];
	        return out;
	    };
	    static dot = (a, b) => {
	        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
	    };
	    static equals = (a, b) => {
	        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
	    };
	    static floor = (a, out = new Vector4()) => {
	        out[0] = Math.floor(a[0]);
	        out[1] = Math.floor(a[1]);
	        out[2] = Math.floor(a[2]);
	        out[3] = Math.floor(a[3]);
	        return out;
	    };
	    static fromArray = (a, offset = 0, out = new Vector4()) => {
	        out[0] = a[offset];
	        out[1] = a[offset + 1];
	        out[2] = a[offset + 2];
	        out[3] = a[offset + 3];
	        return out;
	    };
	    static fromScalar = (num, out = new Vector4()) => {
	        out[0] = out[1] = out[2] = out[3] = num;
	        return out;
	    };
	    static fromXYZW = (x, y, z, w, out = new Vector4()) => {
	        out[0] = x;
	        out[1] = y;
	        out[2] = z;
	        out[3] = w;
	        return out;
	    };
	    static inverse = (a, out = new Vector4()) => {
	        out[0] = 1.0 / a[0];
	        out[1] = 1.0 / a[1];
	        out[2] = 1.0 / a[2];
	        out[3] = 1.0 / a[3];
	        return out;
	    };
	    static norm = (a) => {
	        return Math.hypot(a[0], a[1], a[2], a[3]);
	    };
	    static lengthSquared = (a) => {
	        ax = a[0];
	        ay = a[1];
	        az = a[2];
	        aw = a[3];
	        return ax * ax + ay * ay + az * az + aw * aw;
	    };
	    static lerp = (a, b, t, out = new Vector4()) => {
	        ax = a[0];
	        ay = a[1];
	        az = a[2];
	        aw = a[3];
	        out[0] = ax + t * (b[0] - ax);
	        out[1] = ay + t * (b[1] - ay);
	        out[2] = az + t * (b[2] - az);
	        out[3] = aw + t * (b[3] - aw);
	        return out;
	    };
	    static max = (a, b, out = new Vector4()) => {
	        out[0] = Math.max(a[0], b[0]);
	        out[1] = Math.max(a[1], b[1]);
	        out[2] = Math.max(a[2], b[2]);
	        out[3] = Math.max(a[3], b[3]);
	        return out;
	    };
	    static min = (a, b, out = new Vector4()) => {
	        out[0] = Math.min(a[0], b[0]);
	        out[1] = Math.min(a[1], b[1]);
	        out[2] = Math.min(a[2], b[2]);
	        out[3] = Math.min(a[3], b[3]);
	        return out;
	    };
	    static minus = (a, b, out = new Vector4()) => {
	        out[0] = a[0] - b[0];
	        out[1] = a[1] - b[1];
	        out[2] = a[2] - b[2];
	        out[3] = a[3] - b[3];
	        return out;
	    };
	    static multiply = (a, b, out = new Vector4()) => {
	        out[0] = a[0] * b[0];
	        out[1] = a[1] * b[1];
	        out[2] = a[2] * b[2];
	        out[3] = a[3] * b[3];
	        return out;
	    };
	    static multiplyScalar = (a, b, out = new Vector4()) => {
	        out[0] = a[0] * b;
	        out[1] = a[1] * b;
	        out[2] = a[2] * b;
	        out[3] = a[3] * b;
	        return out;
	    };
	    static negate = (a, out = new Vector4()) => {
	        out[0] = -a[0];
	        out[1] = -a[1];
	        out[2] = -a[2];
	        out[3] = -a[3];
	        return out;
	    };
	    static normalize = (a, out = new Vector4()) => {
	        ax = a[0];
	        ay = a[1];
	        az = a[2];
	        aw = a[3];
	        len$2 = ax * ax + ay * ay + az * az + aw * aw;
	        if (len$2 > 0) {
	            len$2 = 1 / Math.sqrt(len$2);
	        }
	        out[0] = ax * len$2;
	        out[1] = ay * len$2;
	        out[2] = az * len$2;
	        out[3] = aw * len$2;
	        return out;
	    };
	    static round = (a, out = new Vector4()) => {
	        out[0] = Math.round(a[0]);
	        out[1] = Math.round(a[1]);
	        out[2] = Math.round(a[2]);
	        out[3] = Math.round(a[3]);
	        return out;
	    };
	    static setNorm = (a, length, out = new Vector4(2)) => {
	        Vector4.normalize(a, out);
	        Vector4.multiplyScalar(out, length, out);
	        return out;
	    };
	    static toString = (a) => {
	        return `(${a[0]}, ${a[1]}, ${a[2]}, ${a[3]})`;
	    };
	    static transformMatrix4 = (a, m, out = new Vector4()) => {
	        ax = a[0];
	        ay = a[1];
	        az = a[2];
	        aw = a[3];
	        out[0] = m[0] * ax + m[4] * ay + m[8] * az + m[12] * aw;
	        out[1] = m[1] * ax + m[5] * ay + m[9] * az + m[13] * aw;
	        out[2] = m[2] * ax + m[6] * ay + m[10] * az + m[14] * aw;
	        out[3] = m[3] * ax + m[7] * ay + m[11] * az + m[15] * aw;
	        return out;
	    };
	    static transformQuat = (a, q, out = new Vector4()) => {
	        bx = a[0];
	        by = a[1];
	        bz = a[2];
	        ax = q[0];
	        ay = q[1];
	        az = q[2];
	        aw = q[3];
	        ix = aw * bx + ay * bz - az * by;
	        iy = aw * by + az * bx - ax * bz;
	        iz = aw * bz + ax * by - ay * bx;
	        iw = -ax * bx - ay * by - az * bz;
	        out[0] = ix * aw + iw * -ax + iy * -az - iz * -ay;
	        out[1] = iy * aw + iw * -ay + iz * -ax - ix * -az;
	        out[2] = iz * aw + iw * -az + ix * -ay - iy * -ax;
	        out[3] = a[3];
	        return out;
	    };
	    dataType = ArraybufferDataType.VECTOR4;
	    constructor(x = 0, y = 0, z = 0, w = 0) {
	        super(4);
	        this[0] = x;
	        this[1] = y;
	        this[2] = z;
	        this[3] = w;
	    }
	    get x() {
	        return this[0];
	    }
	    set x(value) {
	        this[0] = value;
	    }
	    get y() {
	        return this[1];
	    }
	    set y(value) {
	        this[1] = value;
	    }
	    get z() {
	        return this[2];
	    }
	    set z(value) {
	        this[2] = value;
	    }
	    get w() {
	        return this[3];
	    }
	    set w(value) {
	        this[3] = value;
	    }
	}

	const MATRIX_XYZ2RGB = new Float32Array([
	    3.2404542, -0.969266, 0.0556434, -1.5371385, 1.8760108, -0.2040259, -0.4985314, 0.041556, 1.0572252,
	]);
	const MATRIX_RGB2XYZ = new Float32Array([
	    0.4124564, 0.2126729, 0.0193339, 0.3575761, 0.7151522, 0.119192, 0.1804375, 0.072175, 0.9503041,
	]);
	const tmpVec3 = new Float32Array(3);
	class ColorXYZ extends Float32Array {
	    static clone = (color) => {
	        return new ColorXYZ(color[0], color[1], color[2]);
	    };
	    static create = (r = 0, g = 0, b = 0) => {
	        return new ColorXYZ(r, g, b);
	    };
	    static equals = (a, b) => {
	        return (a.x ?? a[0]) === (b.x ?? b[0]) && (a.y ?? a[1]) === (b.y ?? b[1]) && (a.z ?? a[2]) === (b.z ?? b[2]);
	    };
	    static fromArray = (arr, out = new ColorXYZ()) => {
	        out[0] = arr[0];
	        out[1] = arr[1];
	        out[2] = arr[2];
	        return out;
	    };
	    static fromColorGPU = (color, out = new ColorXYZ()) => {
	        return Vector3.transformMatrix3(color, MATRIX_RGB2XYZ, out);
	    };
	    static fromJson = (json, out = new ColorXYZ()) => {
	        out[0] = json.x;
	        out[1] = json.y;
	        out[2] = json.z;
	        return out;
	    };
	    static fromRGBUnsignedNormal = (r, g, b, out = new ColorXYZ()) => {
	        tmpVec3[0] = r;
	        tmpVec3[1] = g;
	        tmpVec3[2] = b;
	        return ColorXYZ.fromColorGPU(tmpVec3, out);
	    };
	    static fromScalar = (scalar, out = new ColorXYZ()) => {
	        out[0] = scalar;
	        out[1] = scalar;
	        out[2] = scalar;
	        return out;
	    };
	    dataType = ArraybufferDataType.COLOR_RGB;
	    constructor(r = 0, y = 0, b = 0) {
	        super(3);
	        this[0] = r;
	        this[1] = y;
	        this[2] = b;
	    }
	    get x() {
	        return this[0];
	    }
	    set x(val) {
	        this[0] = val;
	    }
	    get y() {
	        return this[1];
	    }
	    set y(val) {
	        this[1] = val;
	    }
	    get z() {
	        return this[2];
	    }
	    set z(val) {
	        this[2] = val;
	    }
	}

	let max$1 = 0;
	let min$1 = 0;
	let h$1 = 0;
	let s$2 = 0;
	let l = 0;
	class ColorHSL extends Float32Array {
	    dataType = ArraybufferDataType.COLOR_HSL;
	    static fromRGBUnsignedNormal(r, g, b, out = new ColorHSL()) {
	        max$1 = Math.max(r, g, b);
	        min$1 = Math.min(r, g, b);
	        l = (max$1 + min$1) / 2;
	        if (max$1 === min$1) {
	            h$1 = s$2 = 0;
	        }
	        else {
	            let d = max$1 - min$1;
	            s$2 = l > 0.5 ? d / (2 - max$1 - min$1) : d / (max$1 + min$1);
	            switch (max$1) {
	                case r:
	                    h$1 = (g - b) / d + (g < b ? 6 : 0);
	                    break;
	                case g:
	                    h$1 = (b - r) / d + 2;
	                    break;
	                case b:
	                    h$1 = (r - g) / d + 4;
	                    break;
	            }
	            h$1 /= 6;
	        }
	        out[0] = h$1;
	        out[1] = s$2;
	        out[2] = l;
	        return out;
	    }
	    constructor(h = 0, s = 0, l = 0) {
	        super(3);
	        this[0] = h;
	        this[1] = s;
	        this[2] = l;
	    }
	    get h() {
	        return this[0];
	    }
	    set h(val) {
	        this[0] = val;
	    }
	    get s() {
	        return this[1];
	    }
	    set s(val) {
	        this[1] = val;
	    }
	    get l() {
	        return this[2];
	    }
	    set l(val) {
	        this[2] = val;
	    }
	}

	let max = 0;
	let min = 0;
	let h = 0;
	let s$1 = 0;
	let v$2 = 0;
	class ColorHSV extends Float32Array {
	    dataType = ArraybufferDataType.COLOR_HSV;
	    static fromRGBUnsignedNormal(r, g, b, out = new ColorHSV()) {
	        max = Math.max(r, g, b);
	        min = Math.min(r, g, b);
	        v$2 = max;
	        if (max === min) {
	            h = 0;
	        }
	        else {
	            let d = max - min;
	            s$1 = v$2 > 0.5 ? d / (2 - max - min) : d / (max + min);
	            switch (max) {
	                case r:
	                    h = (g - b) / d + (g < b ? 6 : 0);
	                    break;
	                case g:
	                    h = (b - r) / d + 2;
	                    break;
	                case b:
	                    h = (r - g) / d + 4;
	                    break;
	            }
	            h /= 6;
	        }
	        if (max) {
	            s$1 = 1 - min / max;
	        }
	        else {
	            s$1 = 0;
	        }
	        out[0] = h;
	        out[1] = s$1;
	        out[2] = v$2;
	        return out;
	    }
	    constructor(h = 0, s = 0, v = 0) {
	        super(3);
	        this[0] = h;
	        this[1] = s;
	        this[2] = v;
	    }
	    get h() {
	        return this[0];
	    }
	    set h(val) {
	        this[0] = val;
	    }
	    get s() {
	        return this[1];
	    }
	    set s(val) {
	        this[1] = val;
	    }
	    get v() {
	        return this[2];
	    }
	    set v(val) {
	        this[2] = val;
	    }
	}

	class ColorRGB extends Uint8Array {
	    static average = (color) => {
	        return (color[0] + color[1] + color[2]) / 3;
	    };
	    static averageWeighted = (color, wr = WEIGHT_GRAY_RED, wg = WEIGHT_GRAY_GREEN, wb = WEIGHT_GRAY_BLUE) => {
	        return color[0] * wr + color[1] * wg + color[2] * wb;
	    };
	    static clone = (color) => {
	        return new ColorRGB(color[0], color[1], color[2]);
	    };
	    static create = (r = 0, g = 0, b = 0) => {
	        return new ColorRGB(r, g, b);
	    };
	    static equals = (a, b) => {
	        return (a.r ?? a[0]) === (b.r ?? b[0]) && (a.g ?? a[1]) === (b.g ?? b[1]) && (a.b ?? a[2]) === (b.b ?? b[2]);
	    };
	    static fromArray = (arr, out = new ColorRGB()) => {
	        out[0] = arr[0];
	        out[1] = arr[1];
	        out[2] = arr[2];
	        return out;
	    };
	    static fromColorRYB(color, out = new ColorRGB()) {
	        let r = color[0];
	        let y = color[1];
	        let b = color[2];
	        // Remove the whiteness from the color.
	        let w = Math.min(r, y, b);
	        r -= w;
	        y -= w;
	        b -= w;
	        let my = Math.max(r, y, b);
	        // Get the green out of the yellow and blue
	        let g = Math.min(y, b);
	        y -= g;
	        b -= g;
	        if (b && g) {
	            b *= 2.0;
	            g *= 2.0;
	        }
	        // Redistribute the remaining yellow.
	        r += y;
	        g += y;
	        // Normalize to values.
	        let mg = Math.max(r, g, b);
	        if (mg) {
	            let n = my / mg;
	            r *= n;
	            g *= n;
	            b *= n;
	        }
	        // Add the white back in.
	        r += w;
	        g += w;
	        b += w;
	        out[0] = r;
	        out[1] = g;
	        out[2] = b;
	        return out;
	    }
	    static fromHex = (hex, out = new ColorRGB()) => {
	        out[0] = hex >> 16;
	        out[1] = (hex >> 8) & 255;
	        out[2] = hex & 255;
	        return out;
	    };
	    static fromHSL = (h, s, l, out = new ColorRGB()) => {
	        let r;
	        let g;
	        let b;
	        if (s === 0) {
	            r = g = b = l; // achromatic
	        }
	        else {
	            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	            let p = 2 * l - q;
	            r = hue2rgb(p, q, h + 1 / 3);
	            g = hue2rgb(p, q, h);
	            b = hue2rgb(p, q, h - 1 / 3);
	        }
	        out[0] = Math.round(r * 255);
	        out[1] = Math.round(g * 255);
	        out[2] = Math.round(b * 255);
	        return out;
	    };
	    static fromJson = (json, out = new ColorRGB()) => {
	        out[0] = json.r;
	        out[1] = json.g;
	        out[2] = json.b;
	        return out;
	    };
	    static fromScalar = (scalar, out = new ColorRGB()) => {
	        out[0] = scalar;
	        out[1] = scalar;
	        out[2] = scalar;
	        return out;
	    };
	    static fromString = (str, out = new ColorRGB()) => {
	        if (str in COLOR_HEX_MAP) {
	            return ColorRGB.fromHex(COLOR_HEX_MAP[str], out);
	        }
	        else if (str.startsWith("#")) {
	            str = str.substring(1);
	            return ColorRGB.fromScalar(parseInt(str, 16), out);
	        }
	        else if (str.startsWith("rgb(")) {
	            str = str.substring(4, str.length - 1);
	            const arr = str.split(",");
	            out[0] = parseInt(arr[0], 10);
	            out[1] = parseInt(arr[1], 10);
	            out[2] = parseInt(arr[2], 10);
	        }
	        return out;
	    };
	    static grayscale = (color, wr = WEIGHT_GRAY_RED, wg = WEIGHT_GRAY_GREEN, wb = WEIGHT_GRAY_BLUE, out = new ColorRGB()) => {
	        const gray = ColorRGB.averageWeighted(color, wr, wg, wb);
	        ColorRGB.fromScalar(gray, out);
	        return out;
	    };
	    dataType = ArraybufferDataType.COLOR_RGB;
	    constructor(r = 0, g = 0, b = 0) {
	        super(3);
	        this[0] = r;
	        this[1] = g;
	        this[2] = b;
	    }
	    get r() {
	        return this[0];
	    }
	    set r(val) {
	        this[0] = val;
	    }
	    get g() {
	        return this[1];
	    }
	    set g(val) {
	        this[1] = val;
	    }
	    get b() {
	        return this[2];
	    }
	    set b(val) {
	        this[2] = val;
	    }
	}

	class ColorRGBA extends Uint8Array {
	    static average = (color) => {
	        return (color[0] + color[1] + color[2]) / 3;
	    };
	    static averageWeighted = (color, wr = WEIGHT_GRAY_RED, wg = WEIGHT_GRAY_GREEN, wb = WEIGHT_GRAY_BLUE) => {
	        return color[0] * wr + color[1] * wg + color[2] * wb;
	    };
	    static clone = (color) => {
	        return new ColorRGBA(color[0], color[1], color[2], color[3]);
	    };
	    static create = (r = 0, g = 0, b = 0, a = 1) => {
	        return new ColorRGBA(r, g, b, a);
	    };
	    static equals = (a, b) => {
	        return ((a.r ?? a[0]) === (b.r ?? b[0]) &&
	            (a.g ?? a[1]) === (b.g ?? b[1]) &&
	            (a.b ?? a[2]) === (b.b ?? b[2]) &&
	            (a.a ?? a[3]) === (b.a ?? b[3]));
	    };
	    static fromArray = (arr, out = new ColorRGBA()) => {
	        out[0] = arr[0];
	        out[1] = arr[1];
	        out[2] = arr[2];
	        out[3] = arr[3];
	        return out;
	    };
	    static fromColorRYB = (color, out = new ColorRGBA()) => {
	        let r = color[0];
	        let y = color[1];
	        let b = color[2];
	        // Remove the whiteness from the color.
	        let w = Math.min(r, y, b);
	        r -= w;
	        y -= w;
	        b -= w;
	        let my = Math.max(r, y, b);
	        // Get the green out of the yellow and blue
	        let g = Math.min(y, b);
	        y -= g;
	        b -= g;
	        if (b && g) {
	            b *= 2.0;
	            g *= 2.0;
	        }
	        // Redistribute the remaining yellow.
	        r += y;
	        g += y;
	        // Normalize to values.
	        let mg = Math.max(r, g, b);
	        if (mg) {
	            let n = my / mg;
	            r *= n;
	            g *= n;
	            b *= n;
	        }
	        // Add the white back in.
	        r += w;
	        g += w;
	        b += w;
	        out[0] = r;
	        out[1] = g;
	        out[2] = b;
	        out[3] = 1;
	        return out;
	    };
	    static fromHex = (hex, alpha = 255, out = new ColorRGBA()) => {
	        out[0] = hex >> 16;
	        out[1] = (hex >> 8) & 255;
	        out[2] = hex & 255;
	        out[3] = alpha;
	        return out;
	    };
	    static fromHSL = (h, s, l, out = new ColorRGBA()) => {
	        let r;
	        let g;
	        let b;
	        if (s === 0) {
	            r = g = b = l; // achromatic
	        }
	        else {
	            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	            let p = 2 * l - q;
	            r = hue2rgb(p, q, h + 1 / 3);
	            g = hue2rgb(p, q, h);
	            b = hue2rgb(p, q, h - 1 / 3);
	        }
	        out[0] = Math.round(r * 255);
	        out[1] = Math.round(g * 255);
	        out[2] = Math.round(b * 255);
	        out[3] = 255;
	        return out;
	    };
	    static fromJson = (json, out = new ColorRGBA()) => {
	        out[0] = json.r;
	        out[1] = json.g;
	        out[2] = json.b;
	        out[3] = json.a;
	        return out;
	    };
	    static fromScalar = (scalar, alpha = 255, out = new ColorRGBA()) => {
	        out[0] = scalar;
	        out[1] = scalar;
	        out[2] = scalar;
	        out[3] = alpha;
	        return out;
	    };
	    static fromString = (str, out = new ColorRGBA()) => {
	        if (str in COLOR_HEX_MAP) {
	            return ColorRGBA.fromHex(COLOR_HEX_MAP[str], 255, out);
	        }
	        else if (str.startsWith("#")) {
	            str = str.substring(1);
	            return ColorRGBA.fromScalar(parseInt(str, 16), 255, out);
	        }
	        else if (str.startsWith("rgba(")) {
	            str = str.substring(4, str.length - 1);
	            const arr = str.split(",");
	            out[0] = parseInt(arr[0], 10);
	            out[1] = parseInt(arr[1], 10);
	            out[2] = parseInt(arr[2], 10);
	            out[3] = parseInt(arr[3], 10);
	        }
	        return out;
	    };
	    static grayscale = (color, wr = WEIGHT_GRAY_RED, wg = WEIGHT_GRAY_GREEN, wb = WEIGHT_GRAY_BLUE, out = new ColorRGBA()) => {
	        const gray = ColorRGBA.averageWeighted(color, wr, wg, wb);
	        ColorRGBA.fromScalar(gray, color[3], out);
	        return out;
	    };
	    dataType = ArraybufferDataType.COLOR_RGBA;
	    constructor(r = 0, g = 0, b = 0, a = 255) {
	        super(4);
	        this[0] = r;
	        this[1] = g;
	        this[2] = b;
	        this[3] = a;
	    }
	    get r() {
	        return this[0];
	    }
	    set r(val) {
	        this[0] = val;
	    }
	    get g() {
	        return this[1];
	    }
	    set g(val) {
	        this[1] = val;
	    }
	    get b() {
	        return this[2];
	    }
	    set b(val) {
	        this[2] = val;
	    }
	    get a() {
	        return this[3];
	    }
	    set a(val) {
	        this[3] = val;
	    }
	}

	class ColorRYB extends Uint8Array {
	    static average = (color) => {
	        return (color[0] + color[1] + color[2]) / 3;
	    };
	    static averageWeighted = (color, wr = 0.333333, wy = 0.333334, wb = 0.333333) => {
	        return color[0] * wr + color[1] * wy + color[2] * wb;
	    };
	    static clone = (color) => {
	        return new ColorRYB(color[0], color[1], color[2]);
	    };
	    static create = (r = 0, g = 0, b = 0) => {
	        return new ColorRYB(r, g, b);
	    };
	    static equals = (a, b) => {
	        return (a.r ?? a[0]) === (b.r ?? b[0]) && (a.y ?? a[1]) === (b.y ?? b[1]) && (a.b ?? a[2]) === (b.b ?? b[2]);
	    };
	    static fromArray = (arr, out = new ColorRYB()) => {
	        out[0] = arr[0];
	        out[1] = arr[1];
	        out[2] = arr[2];
	        return out;
	    };
	    static fromJson = (json, out = new ColorRYB()) => {
	        out[0] = json.r;
	        out[1] = json.y;
	        out[2] = json.b;
	        return out;
	    };
	    static fromRGB = (rgb, out = new ColorRYB()) => {
	        rgb[0];
	        rgb[1];
	        rgb[2];
	        return out;
	    };
	    static fromScalar = (scalar, out = new ColorRYB()) => {
	        out[0] = scalar;
	        out[1] = scalar;
	        out[2] = scalar;
	        return out;
	    };
	    static fromString = (str, out = new ColorRYB()) => {
	        if (str.startsWith("ryb(")) {
	            str = str.substring(4, str.length - 1);
	            const arr = str.split(",");
	            out[0] = parseInt(arr[0], 10);
	            out[1] = parseInt(arr[1], 10);
	            out[2] = parseInt(arr[2], 10);
	        }
	        return out;
	    };
	    dataType = ArraybufferDataType.COLOR_RGB;
	    constructor(r = 0, y = 0, b = 0) {
	        super(3);
	        this[0] = r;
	        this[1] = y;
	        this[2] = b;
	    }
	    get r() {
	        return this[0];
	    }
	    set r(val) {
	        this[0] = val;
	    }
	    get y() {
	        return this[1];
	    }
	    set y(val) {
	        this[1] = val;
	    }
	    get b() {
	        return this[2];
	    }
	    set b(val) {
	        this[2] = val;
	    }
	}

	let r$2;
	let g;
	let b$1;
	const getColorGPU = (color, result = new ColorGPU()) => {
	    if (color instanceof ColorGPU) {
	        result.set(color);
	    }
	    else if (typeof color === "string") {
	        ColorGPU.fromString(color, result);
	    }
	    else if (typeof color === "number") {
	        ColorGPU.fromHex(color, 1, result);
	    }
	    else if (color instanceof ColorRGB) {
	        ColorGPU.fromColorRGB(color, result);
	    }
	    else if (color instanceof ColorRYB) {
	        ColorGPU.fromColorRYB(color, result);
	    }
	    else if (color instanceof ColorRGBA) {
	        ColorGPU.fromColorRGBA(color, result);
	    }
	    else if (color instanceof ColorHSL) {
	        ColorGPU.fromColorHSL(color, result);
	    }
	    else if (color instanceof ColorHSV) {
	        ColorGPU.fromColorHSV(color, result);
	    }
	    else if (color instanceof ColorCMYK) {
	        ColorGPU.fromColorCMYK(color, result);
	    }
	    else if (color instanceof Float32Array || color instanceof Array) {
	        ColorGPU.fromArray(color, result);
	    }
	    else {
	        if ("a" in color) {
	            ColorGPU.fromJson(color, result);
	        }
	        else {
	            ColorGPU.fromJson({
	                ...color,
	                a: 1,
	            }, result);
	        }
	    }
	    return result;
	};
	class ColorGPU extends Float32Array {
	    static average = (color) => {
	        return (color[0] + color[1] + color[2]) / 3;
	    };
	    static averageWeighted = (color, wr = WEIGHT_GRAY_RED, wg = WEIGHT_GRAY_GREEN, wb = WEIGHT_GRAY_BLUE) => {
	        return color[0] * wr + color[1] * wg + color[2] * wb;
	    };
	    static clone = (color) => {
	        return new ColorGPU(color[0], color[1], color[2], color[3]);
	    };
	    static create = (r = 0, g = 0, b = 0, a = 0) => {
	        return new ColorGPU(r, g, b, a);
	    };
	    static equals = (a, b) => {
	        return ((a.r ?? a[0]) === (b.r ?? b[0]) &&
	            (a.g ?? a[1]) === (b.g ?? b[1]) &&
	            (a.b ?? a[2]) === (b.b ?? b[2]) &&
	            (a.a ?? a[3]) === (b.a ?? b[3]));
	    };
	    static fromArray = (arr, out = new ColorGPU()) => {
	        out[0] = arr[0];
	        out[1] = arr[1];
	        out[2] = arr[2];
	        out[3] = arr[3];
	        return out;
	    };
	    static fromColorCMYK = (arr, out = new ColorGPU()) => {
	        const k = 1 - arr[3];
	        out[0] = (1 - arr[0]) * k;
	        out[1] = (1 - arr[1]) * k;
	        out[2] = (1 - arr[2]) * k;
	        out[3] = 1;
	        return out;
	    };
	    static fromColorHSL = (color, out = new ColorGPU()) => {
	        let h = color[0];
	        let s = color[1];
	        let l = color[2];
	        if (s === 0) {
	            r$2 = g = b$1 = l; // achromatic
	        }
	        else {
	            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	            let p = 2 * l - q;
	            r$2 = hue2rgb(p, q, h + 1 / 3);
	            g = hue2rgb(p, q, h);
	            b$1 = hue2rgb(p, q, h - 1 / 3);
	        }
	        out[0] = r$2;
	        out[1] = g;
	        out[2] = b$1;
	        out[3] = 1;
	        return out;
	    };
	    static fromColorHSV = (color, out = new ColorGPU()) => {
	        const s = color[1];
	        const v = color[2];
	        const h6 = color[0] * 6;
	        const hi = Math.floor(h6);
	        const f = h6 - hi;
	        const p = v * (1 - s);
	        const q = v * (1 - f * s);
	        const t = v * (1 - (1 - f) * s);
	        if (hi === 0 || hi === 6) {
	            out[0] = v;
	            out[1] = t;
	            out[2] = p;
	        }
	        else if (hi === 1) {
	            out[0] = q;
	            out[1] = v;
	            out[2] = p;
	        }
	        else if (hi === 2) {
	            out[0] = p;
	            out[1] = v;
	            out[2] = t;
	        }
	        else if (hi === 3) {
	            out[0] = p;
	            out[1] = q;
	            out[2] = v;
	        }
	        else if (hi === 4) {
	            out[0] = t;
	            out[1] = p;
	            out[2] = v;
	        }
	        else if (hi === 5) {
	            out[0] = v;
	            out[1] = p;
	            out[2] = q;
	        }
	        out[3] = 1;
	        return out;
	    };
	    static fromColorRGB(color, out = new ColorGPU()) {
	        out[0] = color[0] / 255;
	        out[1] = color[1] / 255;
	        out[2] = color[2] / 255;
	        out[3] = 1;
	        return out;
	    }
	    static fromColorRGBA(color, out = new ColorGPU()) {
	        out[0] = color[0] / 255;
	        out[1] = color[1] / 255;
	        out[2] = color[2] / 255;
	        out[3] = color[3] / 255;
	        return out;
	    }
	    static fromColorRYB(color, out = new ColorGPU()) {
	        let r = color[0];
	        let y = color[1];
	        let b = color[2];
	        // Remove the whiteness from the color.
	        let w = Math.min(r, y, b);
	        r -= w;
	        y -= w;
	        b -= w;
	        let my = Math.max(r, y, b);
	        // Get the green out of the yellow and blue
	        let g = Math.min(y, b);
	        y -= g;
	        b -= g;
	        if (b && g) {
	            b *= 2.0;
	            g *= 2.0;
	        }
	        // Redistribute the remaining yellow.
	        r += y;
	        g += y;
	        // Normalize to values.
	        let mg = Math.max(r, g, b);
	        if (mg) {
	            let n = my / mg;
	            r *= n;
	            g *= n;
	            b *= n;
	        }
	        // Add the white back in.
	        r += w;
	        g += w;
	        b += w;
	        out[0] = r / 255;
	        out[1] = g / 255;
	        out[2] = b / 255;
	        out[3] = 1;
	        return out;
	    }
	    static fromColorXYZ = (color, out = new ColorGPU()) => {
	        Vector3.transformMatrix3(color, MATRIX_XYZ2RGB, out);
	        return out;
	    };
	    static fromHex = (hex, alpha = 1, out = new ColorGPU()) => {
	        out[0] = (hex >> 16) / 255;
	        out[1] = ((hex >> 8) & 255) / 255;
	        out[2] = (hex & 255) / 255;
	        out[3] = alpha;
	        return out;
	    };
	    static fromJson = (json, out = new ColorGPU()) => {
	        out[0] = json.r;
	        out[1] = json.g;
	        out[2] = json.b;
	        out[3] = json.a;
	        return out;
	    };
	    static fromScalar = (scalar, out = new ColorGPU()) => {
	        out[0] = scalar;
	        out[1] = scalar;
	        out[2] = scalar;
	        return out;
	    };
	    static fromString = (str, out = new ColorGPU()) => {
	        if (str in COLOR_HEX_MAP) {
	            return ColorGPU.fromHex(COLOR_HEX_MAP[str], 1, out);
	        }
	        else if (str.startsWith("#")) {
	            str = str.substring(1);
	            return ColorGPU.fromHex(parseInt(str, 16), 1, out);
	        }
	        else if (str.startsWith("rgb(")) {
	            str = str.substring(4, str.length - 1);
	            const arr = str.split(",");
	            out[0] = parseInt(arr[0], 10) / 255;
	            out[1] = parseInt(arr[1], 10) / 255;
	            out[2] = parseInt(arr[2], 10) / 255;
	        }
	        return out;
	    };
	    static grayscale = (color, wr = WEIGHT_GRAY_RED, wg = WEIGHT_GRAY_GREEN, wb = WEIGHT_GRAY_BLUE, out = new ColorGPU()) => {
	        const gray = ColorGPU.averageWeighted(color, wr, wg, wb);
	        ColorGPU.fromScalar(gray, out);
	        return out;
	    };
	    static lerp = (a, b, alpha, out = new ColorGPU()) => {
	        out[0] = (b[0] - a[0]) * alpha + a[0];
	        out[1] = (b[1] - a[1]) * alpha + a[1];
	        out[2] = (b[2] - a[2]) * alpha + a[2];
	        out[3] = (b[3] - a[3]) * alpha + a[3];
	        return out;
	    };
	    dataType = ArraybufferDataType.COLOR_GPU;
	    constructor(r = 0, g = 0, b = 0, a = 0) {
	        super(4);
	        this[0] = r;
	        this[1] = g;
	        this[2] = b;
	        this[3] = a;
	    }
	    get r() {
	        return this[0];
	    }
	    set r(val) {
	        this[0] = val;
	    }
	    get g() {
	        return this[1];
	    }
	    set g(val) {
	        this[1] = val;
	    }
	    get b() {
	        return this[2];
	    }
	    set b(val) {
	        this[2] = val;
	    }
	    get a() {
	        return this[3];
	    }
	    set a(val) {
	        this[3] = val;
	    }
	}

	const tmpResult = [];
	const factorialNaturalNumber = (n) => {
	    if (n === 0 || n === 1) {
	        return 1;
	    }
	    if (tmpResult[n] > 0) {
	        return tmpResult[n];
	    }
	    return tmpResult[n] = factorialNaturalNumber(n - 1) * n;
	};

	const arrangement = (a, b) => {
	    return factorialNaturalNumber(a) / factorialNaturalNumber(a - b);
	};

	const ceilPowerOfTwo = (value) => {
	    return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
	};

	let circle;
	let v$1;
	/**
	 * @function clampCircle
	 * @desc 将目标值限定在指定周期区间内。假定min小于等于max才能得到正确的结果。
	 * @param {number} val 目标值
	 * @param {number} min 最小值，必须小于等于max
	 * @param {number} max 最大值，必须大于等于min
	 * @returns {number} 限制之后的值
	 * @example Mathx.clampCircle(3 * Math.PI, 0, 2 * Math.PI); // Math.PI;
	 * Mathx.clampCircle(2 * Math.PI, -Math.PI, Math.PI); // 0;
	 */
	const clampCircle = (val, min, max) => {
	    circle = max - min;
	    v$1 = floorToZero(min / circle) * circle + (val % circle);
	    if (v$1 < min) {
	        return v$1 + circle;
	    }
	    else if (v$1 > max) {
	        return v$1 - circle;
	    }
	    return v$1;
	};

	const combination = (a, b) => {
	    return factorialNaturalNumber(a) / factorialNaturalNumber(b) / factorialNaturalNumber(a - b);
	};

	const floorPowerOfTwo = (value) => {
	    return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
	};

	const isPowerOf2 = (value) => {
	    return (value & (value - 1)) === 0 && value !== 0;
	};

	const lerp = (a, b, p) => {
	    return (b - a) * p + a;
	};

	let d1 = 0;
	let d2$1 = 0;
	/**
	 * @function mapRange
	 * @desc 将目标值按照区间线性映射到另一个区间里面的值。
	 * @param {number} value 目标值
	 * @param {number} range1 值所在的线性区间
	 * @param {number} range2 值需要映射到的目标区间
	 * @returns {number} 映射之后的值
	 * @example Mathx.mapRange(50, [0, 100], [0, 1]); // 0.5;
	 * Mathx.clamp(150, [100, 200], [0, -100]); // -50;
	 * Mathx.clamp(10, [0, 1], [0, -2]); // -20;
	 */
	const mapRange = (value, range1, range2) => {
	    d1 = range1[1] - range1[0];
	    d2$1 = range2[1] - range2[0];
	    return (value - d1 * 0.5) / d2$1 / d1;
	};

	const swap = (arr, a, b) => {
	    const tmp = arr[a];
	    arr[a] = arr[b];
	    arr[b] = tmp;
	    return arr;
	};

	function findPartition(arr, low, high, compare) {
	    let pivot = arr[high];
	    let pivotloc = low;
	    for (let i = low; i <= high; i++) {
	        if (compare(pivot, arr[i])) {
	            swap(arr, i, pivotloc);
	            pivotloc++;
	        }
	    }
	    swap(arr, high, pivotloc);
	    return pivotloc;
	}
	function kthSmallest(arr, low, high, k, compare) {
	    let partition = findPartition(arr, low, high, compare);
	    if (partition == k - 1) {
	        return arr[partition];
	    }
	    else if (partition < k - 1) {
	        return kthSmallest(arr, partition + 1, high, k, compare);
	    }
	    return kthSmallest(arr, low, partition - 1, k, compare);
	}
	const defaultCompare = (a, b) => {
	    return a > b;
	};
	const minKth = (arr, k = 0, compare = defaultCompare) => {
	    return kthSmallest(arr, 0, arr.length - 1, k, compare);
	};

	const opposite = (v, center = 0) => {
	    return center + center - v;
	};

	let len$1 = 0;
	let sum$1 = 0;
	/**
	 * @function sumArray
	 * @desc 求数组的和
	 * @see sum
	 * @param {number[]} arr
	 * @returns {number} 和
	 * @example Mathx.sumArray([1, 2, 3]); // 6;
	 */
	const sumArray = (arr) => {
	    sum$1 = 0;
	    len$1 = arr.length;
	    for (let i = 0; i < len$1; i++) {
	        sum$1 += arr[i];
	    }
	    return sum$1;
	};

	/**
	 * @function sum
	 * @desc 求参数之和
	 * @see sumArray
	 * @param {number[]} arr
	 * @returns {number} 和
	 * @example Mathx.sumArray(1, 2, 3); // 6;
	 * Mathx.sumArray(1, 2, 3, 4, 5); // 15;
	 */
	const sum = (...arr) => {
	    return sumArray(arr);
	};

	var BackIn = (p) => {
	    const s = 1.70158;
	    return p === 1 ? 1 : p * p * ((s + 1) * p - s);
	};

	var BackInOut = (p) => {
	    const s = 1.70158 * 1.525;
	    if ((p *= 2) < 1) {
	        return 0.5 * (p * p * ((s + 1) * p - s));
	    }
	    p -= 2;
	    return 0.5 * (p * p * ((s + 1) * p + s) + 2);
	};

	var BackOut = (p) => {
	    const s = 1.70158;
	    return p === 0 ? 0 : --p * p * ((s + 1) * p + s) + 1;
	};

	/* eslint-disable no-return-assign */
	var BounceOut = (p) => {
	    if (p < 1 / 2.75) {
	        return 7.5625 * p * p;
	    }
	    else if (p < 2 / 2.75) {
	        return 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
	    }
	    else if (p < 2.5 / 2.75) {
	        return 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
	    }
	    else {
	        return 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
	    }
	};

	var BounceIn = (p) => {
	    return 1 - BounceOut(1 - p);
	};

	var BounceInOut = (p) => {
	    if (p < 0.5) {
	        return BounceIn(p * 2) * 0.5;
	    }
	    return BounceOut(p * 2 - 1) * 0.5 + 0.5;
	};

	var CircularIn = (p) => {
	    return 1 - Math.sqrt(1 - p * p);
	};

	var CircularInOut = (p) => {
	    if ((p *= 2) < 1) {
	        return -0.5 * (Math.sqrt(1 - p * p) - 1);
	    }
	    p -= 2;
	    return 0.5 * (Math.sqrt(1 - p * p) + 1);
	};

	var CircularOut = (p) => {
	    return Math.sqrt(1 - --p * p);
	};

	var CubicIn = (p) => {
	    return p * p * p;
	};

	var CubicInOut = (p) => {
	    if ((p *= 2) < 1) {
	        return 0.5 * p * p * p;
	    }
	    p -= 2;
	    return 0.5 * (p * p * p + 2);
	};

	var CubicOut = (p) => {
	    return --p * p * p + 1;
	};

	var ElasticIn = (p) => {
	    if (p === 0 || p === 1) {
	        return p;
	    }
	    return -Math.pow(2, 10 * (p - 1)) * Math.sin((p - 1.1) * 5 * Math.PI);
	};

	var ElasticInOut = (p) => {
	    if (p === 0 || p === 1) {
	        return p;
	    }
	    p *= 2;
	    if (p < 1) {
	        return -0.5 * Math.pow(2, 10 * (p - 1)) * Math.sin((p - 1.1) * 5 * Math.PI);
	    }
	    return 0.5 * Math.pow(2, -10 * (p - 1)) * Math.sin((p - 1.1) * 5 * Math.PI) + 1;
	};

	var ElasticOut = (p) => {
	    if (p === 0 || p === 1) {
	        return p;
	    }
	    return Math.pow(2, -10 * p) * Math.sin((p - 0.1) * 5 * Math.PI) + 1;
	};

	var ExponentialIn = (p) => {
	    return p === 0 ? 0 : Math.pow(1024, p - 1);
	};

	var ExponentialInOut = (p) => {
	    if (p === 0 || p === 1) {
	        return p;
	    }
	    if ((p *= 2) < 1) {
	        return 0.5 * Math.pow(1024, p - 1);
	    }
	    return 0.5 * (-Math.pow(2, -10 * (p - 1)) + 2);
	};

	var ExponentialOut = (p) => {
	    return p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
	};

	var Linear = (p) => {
	    return p;
	};

	var QuadraticIn = (p) => {
	    return p * p;
	};

	var QuadraticInOut = (p) => {
	    if ((p *= 2) < 1) {
	        return 0.5 * p * p;
	    }
	    return -0.5 * (--p * (p - 2) - 1);
	};

	var QuadraticOut = (p) => {
	    return p * (2 - p);
	};

	var QuarticIn = (p) => {
	    return p * p * p * p;
	};

	var QuarticInOut = (p) => {
	    if ((p *= 2) < 1) {
	        return 0.5 * p * p * p * p;
	    }
	    p -= 2;
	    return -0.5 * (p * p * p * p - 2);
	};

	var QuarticOut = (p) => {
	    return 1 - --p * p * p * p;
	};

	var QuinticIn = (p) => {
	    return p * p * p * p * p;
	};

	var QuinticInOut = (p) => {
	    if ((p *= 2) < 1) {
	        return 0.5 * p * p * p * p * p;
	    }
	    p -= 2;
	    return 0.5 * (p * p * p * p * p + 2);
	};

	var QuinticOut = (p) => {
	    return --p * p * p * p * p + 1;
	};

	var SinusoidalIn = (p) => {
	    return 1 - Math.sin(((1.0 - p) * Math.PI) / 2);
	};

	var SinusoidalInOut = (p) => {
	    return 0.5 * (1 - Math.sin(Math.PI * (0.5 - p)));
	};

	var SinusoidalOut = (p) => {
	    return Math.sin((p * Math.PI) / 2);
	};

	var index = /*#__PURE__*/Object.freeze({
		__proto__: null,
		BackIn: BackIn,
		BackInOut: BackInOut,
		BackOut: BackOut,
		BounceIn: BounceIn,
		BounceInOut: BounceInOut,
		BounceOut: BounceOut,
		CircularIn: CircularIn,
		CircularInOut: CircularInOut,
		CircularOut: CircularOut,
		CubicIn: CubicIn,
		CubicInOut: CubicInOut,
		CubicOut: CubicOut,
		ElasticIn: ElasticIn,
		ElasticInOut: ElasticInOut,
		ElasticOut: ElasticOut,
		ExponentialIn: ExponentialIn,
		ExponentialInOut: ExponentialInOut,
		ExponentialOut: ExponentialOut,
		Linear: Linear,
		QuadraticIn: QuadraticIn,
		QuadraticInOut: QuadraticInOut,
		QuadraticOut: QuadraticOut,
		QuarticIn: QuarticIn,
		QuarticInOut: QuarticInOut,
		QuarticOut: QuarticOut,
		QuinticIn: QuinticIn,
		QuinticInOut: QuinticInOut,
		QuinticOut: QuinticOut,
		SinusoidalIn: SinusoidalIn,
		SinusoidalInOut: SinusoidalInOut,
		SinusoidalOut: SinusoidalOut
	});

	exports.EulerRotationOrders = void 0;
	(function (EulerRotationOrders) {
	    EulerRotationOrders["XYZ"] = "xyz";
	    EulerRotationOrders["ZXY"] = "zxy";
	    EulerRotationOrders["YZX"] = "yzx";
	    EulerRotationOrders["XZY"] = "xzy";
	    EulerRotationOrders["ZYX"] = "zyx";
	    EulerRotationOrders["YXZ"] = "yxz";
	})(exports.EulerRotationOrders || (exports.EulerRotationOrders = {}));

	class EulerAngle extends Float32Array {
	    static ORDERS = exports.EulerRotationOrders;
	    static clone(euler) {
	        return new EulerAngle(euler.x, euler.y, euler.z, euler.order);
	    }
	    static create(x = 0, y = 0, z = 0, order = exports.EulerRotationOrders.XYZ) {
	        return new EulerAngle(x, y, z, order);
	    }
	    static fromMatrix4(matrix4, out = new EulerAngle()) {
	        const m11 = matrix4[0];
	        const m12 = matrix4[4];
	        const m13 = matrix4[8];
	        const m21 = matrix4[1];
	        const m22 = matrix4[5];
	        const m23 = matrix4[9];
	        const m31 = matrix4[2];
	        const m32 = matrix4[6];
	        const m33 = matrix4[10];
	        switch (out.order) {
	            case exports.EulerRotationOrders.XYZ:
	                out.y = Math.asin(clamp(m13, -1, 1));
	                if (Math.abs(m13) < 0.9999999) {
	                    out.x = Math.atan2(-m23, m33);
	                    out.z = Math.atan2(-m12, m11);
	                }
	                else {
	                    out.x = Math.atan2(m32, m22);
	                    out.z = 0;
	                }
	                break;
	            case exports.EulerRotationOrders.YXZ:
	                out.x = Math.asin(-clamp(m23, -1, 1));
	                if (Math.abs(m23) < 0.9999999) {
	                    out.y = Math.atan2(m13, m33);
	                    out.z = Math.atan2(m21, m22);
	                }
	                else {
	                    out.y = Math.atan2(-m31, m11);
	                    out.z = 0;
	                }
	                break;
	            case exports.EulerRotationOrders.ZXY:
	                out.x = Math.asin(clamp(m32, -1, 1));
	                if (Math.abs(m32) < 0.9999999) {
	                    out.y = Math.atan2(-m31, m33);
	                    out.z = Math.atan2(-m12, m22);
	                }
	                else {
	                    out.y = 0;
	                    out.z = Math.atan2(m21, m11);
	                }
	                break;
	            case exports.EulerRotationOrders.ZYX:
	                out.y = Math.asin(-clamp(m31, -1, 1));
	                if (Math.abs(m31) < 0.9999999) {
	                    out.x = Math.atan2(m32, m33);
	                    out.z = Math.atan2(m21, m11);
	                }
	                else {
	                    out.x = 0;
	                    out.z = Math.atan2(-m12, m22);
	                }
	                break;
	            case exports.EulerRotationOrders.YZX:
	                out.z = Math.asin(clamp(m21, -1, 1));
	                if (Math.abs(m21) < 0.9999999) {
	                    out.x = Math.atan2(-m23, m22);
	                    out.y = Math.atan2(-m31, m11);
	                }
	                else {
	                    out.x = 0;
	                    out.y = Math.atan2(m13, m33);
	                }
	                break;
	            case exports.EulerRotationOrders.XZY:
	                out.z = Math.asin(-clamp(m12, -1, 1));
	                if (Math.abs(m12) < 0.9999999) {
	                    out.x = Math.atan2(m32, m22);
	                    out.y = Math.atan2(m13, m11);
	                }
	                else {
	                    out.x = Math.atan2(-m23, m33);
	                    out.y = 0;
	                }
	                break;
	        }
	        return out;
	    }
	    order;
	    dataType = ArraybufferDataType.EULER;
	    constructor(x = 0, y = 0, z = 0, order = exports.EulerRotationOrders.XYZ) {
	        super(3);
	        this[0] = x;
	        this[1] = y;
	        this[2] = z;
	        this.order = order;
	    }
	    get x() {
	        return this[0];
	    }
	    set x(value) {
	        this[0] = value;
	    }
	    get y() {
	        return this[1];
	    }
	    set y(value) {
	        this[1] = value;
	    }
	    get z() {
	        return this[2];
	    }
	    set z(value) {
	        this[2] = value;
	    }
	}

	const quadraticBezier = (t, p0, p1, p2) => {
	    return p1 + (1 - t) * (1 - t) * (p0 - p1) + t * t * (p2 - p1);
	};
	const cubicBezier = (t, p0, p1, p2, p3) => {
	    const t2 = t * t;
	    const t3 = t2 * t;
	    return p0 * (1 - 3 * (t - t2) - t3) + 3 * (t2 - t - t + 1) * p1 + 3 * (t2 - t3) * p2 + t3 * p3;
	};

	// https://www.mvps.org/directx/articles/catmull/
	const catmullRom = (t, p0, p1, p2, p3, alpha = 0.5) => {
	    const t2 = t * t;
	    const t3 = t * t2;
	    return alpha * (p1 + p1 + (p2 - p0) * t + (p0 + p0 - 5 * p1 + 4 * p2 - p3) * t2 + (3 * (p1 - p2) + p3 - p0) * t3);
	};

	const generateLagrange = (points) => {
	    let n = points.length - 1;
	    function p(i, j, x) {
	        if (i === j) {
	            return points[i][1];
	        }
	        return (((points[j][0] - x) * p(i, j - 1, x) + (x - points[i][0]) * p(i + 1, j, x)) / (points[j][0] - points[i][0]));
	    }
	    return function (x) {
	        if (points.length === 0) {
	            return 0;
	        }
	        return p(0, n, x);
	    };
	};

	const vec1 = new Float32Array(3);
	const vec2$1 = new Float32Array(3);
	class Line3 {
	    a = new Vector3();
	    b = new Vector3();
	    static distancePointToLineSegment(p, line) {
	        return Math.sqrt(Line3.distancePointToLineSegmentSquared(p, line));
	    }
	    static distancePointToLineSegmentSquared(p, line) {
	        const a = line.a;
	        const b = line.b;
	        let l2 = Vector3.distanceToSquared(a, b);
	        if (l2 === 0) {
	            return Vector3.distanceToSquared(p, b);
	        }
	        Vector3.minus(p, a, vec1);
	        Vector3.minus(b, a, vec2$1);
	        let t = Vector3.dot(vec1, vec2$1) / l2;
	        t = clamp(t, 0, 1);
	        Vector3.multiplyScalar(vec2$1, t, vec2$1);
	        Vector3.add(a, vec2$1, vec1);
	        return Vector3.distanceToSquared(a, vec1);
	    }
	    static segmentLength(line) {
	        return Vector3.distanceTo(line.a, line.b);
	    }
	    static segmentLengthSquared(line) {
	        return Vector3.distanceToSquared(line.a, line.b);
	    }
	    static fromPointAndDirection(p, direction, out = new Line3()) {
	        out.a.set(p);
	        Vector3.add(out.a, direction, out.b);
	        return out;
	    }
	    constructor(a = Vector3.VECTOR3_ZERO, b = Vector3.VECTOR3_RIGHT) {
	        this.a.set(a);
	        this.b.set(b);
	    }
	    fromPointAndDirection(p, direction) {
	        return Line3.fromPointAndDirection(p, direction, this);
	    }
	}

	let a00$2 = 0;
	let a01$2 = 0;
	let a10$2 = 0;
	let a11$2 = 0;
	let b00$2 = 0;
	let b01$2 = 0;
	let b10$2 = 0;
	let b11$2 = 0;
	let det$1 = 0;
	let x$3 = 0;
	let y$3 = 0;
	const UNIT_MATRIX2_DATA = [1, 0, 0, 1];
	class Matrix2 extends Float32Array {
	    static UNIT_MATRIX2 = new Matrix2([1, 0, 0, 1]);
	    static add = (a, b, out = new Matrix2()) => {
	        out[0] = a[0] + b[0];
	        out[1] = a[1] + b[1];
	        out[2] = a[2] + b[2];
	        out[3] = a[3] + b[3];
	        return out;
	    };
	    static adjoint = (a, out = new Matrix2()) => {
	        a00$2 = a[0];
	        out[0] = a[3];
	        out[1] = -a[1];
	        out[2] = -a[2];
	        out[3] = a00$2;
	        return out;
	    };
	    static clone = (source, out = new Matrix2()) => {
	        out[0] = source[0];
	        out[1] = source[1];
	        out[2] = source[2];
	        out[3] = source[3];
	        return out;
	    };
	    static closeTo = (a, b) => {
	        a00$2 = a[0];
	        a10$2 = a[1];
	        a01$2 = a[2];
	        a11$2 = a[3];
	        b00$2 = b[0];
	        b10$2 = b[1];
	        b01$2 = b[2];
	        b11$2 = b[3];
	        return closeTo(a00$2, b00$2) && closeTo(a01$2, b01$2) && closeTo(a10$2, b10$2) && closeTo(a11$2, b11$2);
	    };
	    static create = (a = UNIT_MATRIX2_DATA) => {
	        return new Matrix2(a);
	    };
	    static determinant = (a) => {
	        return a[0] * a[3] - a[1] * a[2];
	    };
	    static equals = (a, b) => {
	        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
	    };
	    static frobNorm = (a) => {
	        return Math.hypot(a[0], a[1], a[2], a[3]);
	    };
	    static fromArray = (source, out = new Matrix2()) => {
	        out[0] = source[0];
	        out[1] = source[1];
	        out[2] = source[2];
	        out[3] = source[3];
	        return out;
	    };
	    static fromRotation = (rad, out = new Matrix2()) => {
	        y$3 = Math.sin(rad);
	        x$3 = Math.cos(rad);
	        out[0] = x$3;
	        out[1] = y$3;
	        out[2] = -y$3;
	        out[3] = x$3;
	        return out;
	    };
	    static fromScaling = (v, out = new Matrix2()) => {
	        out[0] = v[0];
	        out[1] = 0;
	        out[2] = 0;
	        out[3] = v[1];
	        return out;
	    };
	    static identity = (out = new Matrix2()) => {
	        out[0] = 1;
	        out[1] = 0;
	        out[2] = 0;
	        out[3] = 1;
	        return out;
	    };
	    static invert = (a, out = new Matrix2()) => {
	        a00$2 = a[0];
	        a10$2 = a[1];
	        a01$2 = a[2];
	        a11$2 = a[3];
	        det$1 = Matrix2.determinant(a);
	        if (!det$1) {
	            return null;
	        }
	        det$1 = 1.0 / det$1;
	        out[0] = a11$2 * det$1;
	        out[1] = -a10$2 * det$1;
	        out[2] = -a01$2 * det$1;
	        out[3] = a00$2 * det$1;
	        return out;
	    };
	    static lerp = (a, b, alpha, out = new Matrix2()) => {
	        out[0] = (b[0] - a[0]) * alpha + a[0];
	        out[1] = (b[1] - a[1]) * alpha + a[1];
	        out[2] = (b[2] - a[2]) * alpha + a[2];
	        out[3] = (b[3] - a[3]) * alpha + a[3];
	        return out;
	    };
	    static minus = (a, b, out = new Matrix2()) => {
	        out[0] = a[0] - b[0];
	        out[1] = a[1] - b[1];
	        out[2] = a[2] - b[2];
	        out[3] = a[3] - b[3];
	        return out;
	    };
	    static multiply = (a, b, out = new Matrix2()) => {
	        a00$2 = a[0];
	        a10$2 = a[1];
	        a01$2 = a[2];
	        a11$2 = a[3];
	        b00$2 = b[0];
	        b10$2 = b[1];
	        b01$2 = b[2];
	        b11$2 = b[3];
	        out[0] = a00$2 * b00$2 + a01$2 * b10$2;
	        out[1] = a10$2 * b00$2 + a11$2 * b10$2;
	        out[2] = a00$2 * b01$2 + a01$2 * b11$2;
	        out[3] = a10$2 * b01$2 + a11$2 * b11$2;
	        return out;
	    };
	    static multiplyScalar = (a, b, out = new Matrix2()) => {
	        out[0] = a[0] * b;
	        out[1] = a[1] * b;
	        out[2] = a[2] * b;
	        out[3] = a[3] * b;
	        return out;
	    };
	    static rotate = (a, rad, out = new Matrix2()) => {
	        a00$2 = a[0];
	        a10$2 = a[1];
	        a01$2 = a[2];
	        a11$2 = a[3];
	        y$3 = Math.sin(rad);
	        x$3 = Math.cos(rad);
	        out[0] = a00$2 * x$3 + a01$2 * y$3;
	        out[1] = a10$2 * x$3 + a11$2 * y$3;
	        out[2] = a00$2 * -y$3 + a01$2 * x$3;
	        out[3] = a10$2 * -y$3 + a11$2 * x$3;
	        return out;
	    };
	    static scale = (a, v, out = new Matrix2()) => {
	        a00$2 = a[0];
	        a10$2 = a[1];
	        a01$2 = a[2];
	        a11$2 = a[3];
	        x$3 = v[0];
	        y$3 = v[1];
	        out[0] = a00$2 * x$3;
	        out[1] = a10$2 * x$3;
	        out[2] = a01$2 * y$3;
	        out[3] = a11$2 * y$3;
	        return out;
	    };
	    static toString = (a) => {
	        return `mat2(${a[0]}, ${a[1]}, ${a[2]}, ${a[3]})`;
	    };
	    static transpose = (a, out = new Matrix2()) => {
	        if (out === a) {
	            a01$2 = a[1];
	            out[1] = a[2];
	            out[2] = a01$2;
	        }
	        else {
	            out[0] = a[0];
	            out[1] = a[2];
	            out[2] = a[1];
	            out[3] = a[3];
	        }
	        return out;
	    };
	    constructor(data = UNIT_MATRIX2_DATA) {
	        super(data);
	    }
	}

	let a00$1 = 0;
	let a01$1 = 0;
	let a02$1 = 0;
	let a11$1 = 0;
	let a10$1 = 0;
	let a12$1 = 0;
	let a20$1 = 0;
	let a21$1 = 0;
	let a22$1 = 0;
	let b00$1 = 0;
	let b01$1 = 0;
	let b02$1 = 0;
	let b11$1 = 0;
	let b10$1 = 0;
	let b12$1 = 0;
	let b20$1 = 0;
	let b21$1 = 0;
	let b22$1 = 0;
	let x$2 = 0;
	let y$2 = 0;
	const UNIT_MATRIX3_DATA = [1, 0, 0, 0, 1, 0, 0, 0, 1];
	class Matrix3 extends Float32Array {
	    static UNIT_MATRIX3 = new Matrix3(UNIT_MATRIX3_DATA);
	    static clone = (source) => {
	        return new Matrix3(source);
	    };
	    static cofactor00 = (a) => {
	        return a[4] * a[8] - a[5] * a[7];
	    };
	    static cofactor01 = (a) => {
	        return a[1] * a[8] - a[7] * a[2];
	    };
	    static cofactor02 = (a) => {
	        return a[1] * a[5] - a[4] * a[2];
	    };
	    static cofactor10 = (a) => {
	        return a[3] * a[8] - a[6] * a[5];
	    };
	    static cofactor11 = (a) => {
	        return a[0] * a[8] - a[6] * a[2];
	    };
	    static cofactor12 = (a) => {
	        return a[0] * a[5] - a[3] * a[2];
	    };
	    static cofactor20 = (a) => {
	        return a[3] * a[7] - a[6] * a[4];
	    };
	    static cofactor21 = (a) => {
	        return a[0] * a[7] - a[6] * a[1];
	    };
	    static cofactor22 = (a) => {
	        return a[0] * a[4] - a[3] * a[1];
	    };
	    static create = () => {
	        return new Matrix3(UNIT_MATRIX3_DATA);
	    };
	    static determinant = (a) => {
	        a00$1 = a[0];
	        a01$1 = a[1];
	        a02$1 = a[2];
	        a10$1 = a[3];
	        a11$1 = a[4];
	        a12$1 = a[5];
	        a20$1 = a[6];
	        a21$1 = a[7];
	        a22$1 = a[8];
	        return a00$1 * (a22$1 * a11$1 - a12$1 * a21$1) + a01$1 * (-a22$1 * a10$1 + a12$1 * a20$1) + a02$1 * (a21$1 * a10$1 - a11$1 * a20$1);
	    };
	    static fromArray = (source, out = new Matrix3()) => {
	        out[0] = source[0];
	        out[1] = source[1];
	        out[2] = source[2];
	        out[3] = source[3];
	        out[4] = source[4];
	        out[5] = source[5];
	        out[6] = source[6];
	        out[7] = source[7];
	        out[8] = source[8];
	        return out;
	    };
	    static fromMatrix2 = (mat4, out = new Matrix3()) => {
	        out[0] = mat4[0];
	        out[1] = mat4[1];
	        out[2] = 0;
	        out[3] = mat4[2];
	        out[4] = mat4[3];
	        out[5] = 0;
	        out[6] = 0;
	        out[7] = 0;
	        out[8] = 1;
	        return out;
	    };
	    static fromMatrix4 = (mat4, out = new Matrix3()) => {
	        out[0] = mat4[0];
	        out[1] = mat4[1];
	        out[2] = mat4[2];
	        out[3] = mat4[4];
	        out[4] = mat4[5];
	        out[5] = mat4[6];
	        out[6] = mat4[8];
	        out[7] = mat4[9];
	        out[8] = mat4[10];
	        return out;
	    };
	    static fromRotation = (rad, out = new Matrix3()) => {
	        y$2 = Math.sin(rad);
	        x$2 = Math.cos(rad);
	        out[0] = x$2;
	        out[1] = y$2;
	        out[2] = 0;
	        out[3] = -y$2;
	        out[4] = x$2;
	        out[5] = 0;
	        out[6] = 0;
	        out[7] = 0;
	        out[8] = 1;
	        return out;
	    };
	    static fromScaling = (v, out = new Matrix3()) => {
	        out[0] = v[0];
	        out[1] = 0;
	        out[2] = 0;
	        out[3] = 0;
	        out[4] = v[1];
	        out[5] = 0;
	        out[6] = 0;
	        out[7] = 0;
	        out[8] = 1;
	        return out;
	    };
	    static fromSkew = (v, out = new Matrix3()) => {
	        out[0] = 1;
	        out[1] = v[1];
	        out[2] = 0;
	        out[3] = v[0];
	        out[4] = 1;
	        out[5] = 0;
	        out[6] = 0;
	        out[7] = 0;
	        out[8] = 1;
	        return out;
	    };
	    static fromTranslation = (v, out = new Matrix3()) => {
	        out[0] = 1;
	        out[1] = 0;
	        out[2] = 0;
	        out[3] = 0;
	        out[4] = 1;
	        out[5] = 0;
	        out[6] = v[0];
	        out[7] = v[1];
	        out[8] = 1;
	        return out;
	    };
	    static identity = (out = new Matrix3()) => {
	        out[0] = 1;
	        out[1] = 0;
	        out[2] = 0;
	        out[3] = 0;
	        out[4] = 1;
	        out[5] = 0;
	        out[6] = 0;
	        out[7] = 0;
	        out[8] = 1;
	        return out;
	    };
	    static invert = (a, out = new Matrix3()) => {
	        a00$1 = a[0];
	        a01$1 = a[1];
	        a02$1 = a[2];
	        a10$1 = a[3];
	        a11$1 = a[4];
	        a12$1 = a[5];
	        a20$1 = a[6];
	        a21$1 = a[7];
	        a22$1 = a[8];
	        b01$1 = a22$1 * a11$1 - a12$1 * a21$1;
	        b11$1 = -a22$1 * a10$1 + a12$1 * a20$1;
	        b21$1 = a21$1 * a10$1 - a11$1 * a20$1;
	        let det = a00$1 * b01$1 + a01$1 * b11$1 + a02$1 * b21$1;
	        if (!det) {
	            return null;
	        }
	        det = 1.0 / det;
	        out[0] = b01$1 * det;
	        out[1] = (-a22$1 * a01$1 + a02$1 * a21$1) * det;
	        out[2] = (a12$1 * a01$1 - a02$1 * a11$1) * det;
	        out[3] = b11$1 * det;
	        out[4] = (a22$1 * a00$1 - a02$1 * a20$1) * det;
	        out[5] = (-a12$1 * a00$1 + a02$1 * a10$1) * det;
	        out[6] = b21$1 * det;
	        out[7] = (-a21$1 * a00$1 + a01$1 * a20$1) * det;
	        out[8] = (a11$1 * a00$1 - a01$1 * a10$1) * det;
	        return out;
	    };
	    static multiply = (a, b, out = new Matrix3()) => {
	        a00$1 = a[0];
	        a01$1 = a[1];
	        a02$1 = a[2];
	        a10$1 = a[3];
	        a11$1 = a[4];
	        a12$1 = a[5];
	        a20$1 = a[6];
	        a21$1 = a[7];
	        a22$1 = a[8];
	        b00$1 = b[0];
	        b01$1 = b[1];
	        b02$1 = b[2];
	        b10$1 = b[3];
	        b11$1 = b[4];
	        b12$1 = b[5];
	        b20$1 = b[6];
	        b21$1 = b[7];
	        b22$1 = b[8];
	        out[0] = b00$1 * a00$1 + b01$1 * a10$1 + b02$1 * a20$1;
	        out[1] = b00$1 * a01$1 + b01$1 * a11$1 + b02$1 * a21$1;
	        out[2] = b00$1 * a02$1 + b01$1 * a12$1 + b02$1 * a22$1;
	        out[3] = b10$1 * a00$1 + b11$1 * a10$1 + b12$1 * a20$1;
	        out[4] = b10$1 * a01$1 + b11$1 * a11$1 + b12$1 * a21$1;
	        out[5] = b10$1 * a02$1 + b11$1 * a12$1 + b12$1 * a22$1;
	        out[6] = b20$1 * a00$1 + b21$1 * a10$1 + b22$1 * a20$1;
	        out[7] = b20$1 * a01$1 + b21$1 * a11$1 + b22$1 * a21$1;
	        out[8] = b20$1 * a02$1 + b21$1 * a12$1 + b22$1 * a22$1;
	        return out;
	    };
	    static multiplyRotationMatrix = (a, b, out = new Matrix3()) => {
	        a00$1 = a[0];
	        a01$1 = a[1];
	        a02$1 = a[2];
	        a10$1 = a[3];
	        a11$1 = a[4];
	        a12$1 = a[5];
	        a20$1 = a[6];
	        a21$1 = a[7];
	        a22$1 = a[8];
	        b00$1 = b[0];
	        b01$1 = b[1];
	        b10$1 = b[3];
	        b11$1 = b[4];
	        out[0] = b00$1 * a00$1 + b01$1 * a10$1;
	        out[1] = b00$1 * a01$1 + b01$1 * a11$1;
	        out[2] = b00$1 * a02$1 + b01$1 * a12$1;
	        out[3] = b10$1 * a00$1 + b11$1 * a10$1;
	        out[4] = b10$1 * a01$1 + b11$1 * a11$1;
	        out[5] = b10$1 * a02$1 + b11$1 * a12$1;
	        out[6] = a20$1;
	        out[7] = a21$1;
	        out[8] = a22$1;
	        return out;
	    };
	    static multiplyScaleMatrix = (a, b, out = new Matrix3()) => {
	        a00$1 = a[0];
	        a01$1 = a[1];
	        a02$1 = a[2];
	        a10$1 = a[3];
	        a11$1 = a[4];
	        a12$1 = a[5];
	        a20$1 = a[6];
	        a21$1 = a[7];
	        a22$1 = a[8];
	        b00$1 = b[0];
	        b11$1 = b[4];
	        out[0] = b00$1 * a00$1;
	        out[1] = b00$1 * a01$1;
	        out[2] = b00$1 * a02$1;
	        out[3] = b11$1 * a10$1;
	        out[4] = b11$1 * a11$1;
	        out[5] = b11$1 * a12$1;
	        out[6] = a20$1;
	        out[7] = a21$1;
	        out[8] = a22$1;
	        return out;
	    };
	    static multiplyTranslateMatrix = (a, b, out = new Matrix3()) => {
	        a00$1 = a[0];
	        a01$1 = a[1];
	        a02$1 = a[2];
	        a10$1 = a[3];
	        a11$1 = a[4];
	        a12$1 = a[5];
	        a20$1 = a[6];
	        a21$1 = a[7];
	        a22$1 = a[8];
	        b20$1 = b[6];
	        b21$1 = b[7];
	        out[0] = a00$1;
	        out[1] = a01$1;
	        out[2] = a02$1;
	        out[3] = a10$1;
	        out[4] = a11$1;
	        out[5] = a12$1;
	        out[6] = b20$1 * a00$1 + b21$1 * a10$1 + a20$1;
	        out[7] = b20$1 * a01$1 + b21$1 * a11$1 + a21$1;
	        out[8] = b20$1 * a02$1 + b21$1 * a12$1 + a22$1;
	        return out;
	    };
	    static rotate = (a, rad, out = new Matrix3()) => {
	        a00$1 = a[0];
	        a01$1 = a[1];
	        a02$1 = a[2];
	        a10$1 = a[3];
	        a11$1 = a[4];
	        a12$1 = a[5];
	        a20$1 = a[6];
	        a21$1 = a[7];
	        a22$1 = a[8];
	        y$2 = Math.sin(rad);
	        x$2 = Math.cos(rad);
	        out[0] = x$2 * a00$1 + y$2 * a10$1;
	        out[1] = x$2 * a01$1 + y$2 * a11$1;
	        out[2] = x$2 * a02$1 + y$2 * a12$1;
	        out[3] = y$2 * a10$1 - x$2 * a00$1;
	        out[4] = y$2 * a11$1 - x$2 * a01$1;
	        out[5] = y$2 * a12$1 - x$2 * a02$1;
	        out[6] = a20$1;
	        out[7] = a21$1;
	        out[8] = a22$1;
	        return out;
	    };
	    static scale = (a, v, out = new Matrix3()) => {
	        x$2 = v[0];
	        y$2 = v[1];
	        out[0] = x$2 * a[0];
	        out[1] = x$2 * a[1];
	        out[2] = x$2 * a[2];
	        out[3] = y$2 * a[3];
	        out[4] = y$2 * a[4];
	        out[5] = y$2 * a[5];
	        out[6] = a[6];
	        out[7] = a[7];
	        out[8] = a[8];
	        return out;
	    };
	    static translate = (a, v, out = new Matrix3()) => {
	        a00$1 = a[0];
	        a01$1 = a[1];
	        a02$1 = a[2];
	        a10$1 = a[3];
	        a11$1 = a[4];
	        a12$1 = a[5];
	        a20$1 = a[6];
	        a21$1 = a[7];
	        a22$1 = a[8];
	        x$2 = v[0];
	        y$2 = v[1];
	        out[0] = a00$1;
	        out[1] = a01$1;
	        out[2] = a02$1;
	        out[3] = a10$1;
	        out[4] = a11$1;
	        out[5] = a12$1;
	        out[6] = x$2 * a00$1 + y$2 * a10$1 + a20$1;
	        out[7] = x$2 * a01$1 + y$2 * a11$1 + a21$1;
	        out[8] = x$2 * a02$1 + y$2 * a12$1 + a22$1;
	        return out;
	    };
	    static transpose = (a, out = new Matrix3()) => {
	        if (out === a) {
	            a01$1 = a[1];
	            a02$1 = a[2];
	            a12$1 = a[5];
	            out[1] = a[3];
	            out[2] = a[6];
	            out[3] = a01$1;
	            out[5] = a[7];
	            out[6] = a02$1;
	            out[7] = a12$1;
	        }
	        else {
	            out[0] = a[0];
	            out[1] = a[3];
	            out[2] = a[6];
	            out[3] = a[1];
	            out[4] = a[4];
	            out[5] = a[7];
	            out[6] = a[2];
	            out[7] = a[5];
	            out[8] = a[8];
	        }
	        return out;
	    };
	    constructor(data = UNIT_MATRIX3_DATA) {
	        super(data);
	    }
	}

	/* eslint-disable max-lines */
	let a00 = 0;
	let a01 = 0;
	let a02 = 0;
	let a03 = 0;
	let a11 = 0;
	let a10 = 0;
	let a12 = 0;
	let a13 = 0;
	let a20 = 0;
	let a21 = 0;
	let a22 = 0;
	let a23 = 0;
	let a31 = 0;
	let a30 = 0;
	let a32 = 0;
	let a33 = 0;
	let b00 = 0;
	let b01 = 0;
	let b02 = 0;
	let b03 = 0;
	let b11 = 0;
	let b10 = 0;
	let b12 = 0;
	let b13 = 0;
	let b20 = 0;
	let b21 = 0;
	let b22 = 0;
	let b23 = 0;
	let b31 = 0;
	let b30 = 0;
	let b32 = 0;
	let b33 = 0;
	let x$1 = 0;
	let y$1 = 0;
	let z = 0;
	let det = 0;
	let len = 0;
	let s = 0;
	let t = 0;
	let a = 0;
	let b = 0;
	let c = 0;
	let d = 0;
	let e = 0;
	let f = 0;
	const UNIT_MATRIX4_DATA = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	class Matrix4 extends Float32Array {
	    static UNIT_MATRIX4 = new Matrix4(UNIT_MATRIX4_DATA);
	    static clone = (source, out = new Matrix4()) => {
	        out[0] = source[0];
	        out[1] = source[1];
	        out[2] = source[2];
	        out[3] = source[3];
	        out[4] = source[4];
	        out[5] = source[5];
	        out[6] = source[6];
	        out[7] = source[7];
	        out[8] = source[8];
	        out[9] = source[9];
	        out[10] = source[10];
	        out[11] = source[11];
	        out[12] = source[12];
	        out[13] = source[13];
	        out[14] = source[14];
	        out[15] = source[15];
	        return out;
	    };
	    static create = () => {
	        return new Matrix4(UNIT_MATRIX4_DATA);
	    };
	    static determinant = (a) => {
	        a00 = a[0];
	        a01 = a[1];
	        a02 = a[2];
	        a03 = a[3];
	        a10 = a[4];
	        a11 = a[5];
	        a12 = a[6];
	        a13 = a[7];
	        a20 = a[8];
	        a21 = a[9];
	        a22 = a[10];
	        a23 = a[11];
	        a30 = a[12];
	        a31 = a[13];
	        a32 = a[14];
	        a33 = a[15];
	        b00 = a00 * a11 - a01 * a10;
	        b01 = a00 * a12 - a02 * a10;
	        b02 = a01 * a12 - a02 * a11;
	        b03 = a20 * a31 - a21 * a30;
	        b10 = a20 * a32 - a22 * a30;
	        b11 = a21 * a32 - a22 * a31;
	        b12 = a00 * b11 - a01 * b10 + a02 * b03;
	        b13 = a10 * b11 - a11 * b10 + a12 * b03;
	        b20 = a20 * b02 - a21 * b01 + a22 * b00;
	        b21 = a30 * b02 - a31 * b01 + a32 * b00;
	        return a13 * b12 - a03 * b13 + a33 * b20 - a23 * b21;
	    };
	    static fromArray = (source, out = new Matrix4()) => {
	        out[0] = source[0];
	        out[1] = source[1];
	        out[2] = source[2];
	        out[3] = source[3];
	        out[4] = source[4];
	        out[5] = source[5];
	        out[6] = source[6];
	        out[7] = source[7];
	        out[8] = source[8];
	        out[9] = source[9];
	        out[10] = source[10];
	        out[11] = source[11];
	        out[12] = source[12];
	        out[13] = source[13];
	        out[14] = source[14];
	        out[15] = source[15];
	        return out;
	    };
	    static fromEuler = (euler, out = new Matrix4()) => {
	        x$1 = euler.x;
	        y$1 = euler.y;
	        z = euler.z;
	        a = Math.cos(x$1);
	        b = Math.sin(x$1);
	        c = Math.cos(y$1);
	        d = Math.sin(y$1);
	        e = Math.cos(z);
	        f = Math.sin(z);
	        if (euler.order === exports.EulerRotationOrders.XYZ) {
	            const ae = a * e;
	            const af = a * f;
	            const be = b * e;
	            const bf = b * f;
	            out[0] = c * e;
	            out[4] = -c * f;
	            out[8] = d;
	            out[1] = af + be * d;
	            out[5] = ae - bf * d;
	            out[9] = -b * c;
	            out[2] = bf - ae * d;
	            out[6] = be + af * d;
	            out[10] = a * c;
	        }
	        else if (euler.order === exports.EulerRotationOrders.YXZ) {
	            const ce = c * e;
	            const cf = c * f;
	            const de = d * e;
	            const df = d * f;
	            out[0] = ce + df * b;
	            out[4] = de * b - cf;
	            out[8] = a * d;
	            out[1] = a * f;
	            out[5] = a * e;
	            out[9] = -b;
	            out[2] = cf * b - de;
	            out[6] = df + ce * b;
	            out[10] = a * c;
	        }
	        else if (euler.order === exports.EulerRotationOrders.ZXY) {
	            const ce = c * e;
	            const cf = c * f;
	            const de = d * e;
	            const df = d * f;
	            out[0] = ce - df * b;
	            out[4] = -a * f;
	            out[8] = de + cf * b;
	            out[1] = cf + de * b;
	            out[5] = a * e;
	            out[9] = df - ce * b;
	            out[2] = -a * d;
	            out[6] = b;
	            out[10] = a * c;
	        }
	        else if (euler.order === exports.EulerRotationOrders.ZYX) {
	            const ae = a * e;
	            const af = a * f;
	            const be = b * e;
	            const bf = b * f;
	            out[0] = c * e;
	            out[4] = be * d - af;
	            out[8] = ae * d + bf;
	            out[1] = c * f;
	            out[5] = bf * d + ae;
	            out[9] = af * d - be;
	            out[2] = -d;
	            out[6] = b * c;
	            out[10] = a * c;
	        }
	        else if (euler.order === exports.EulerRotationOrders.YZX) {
	            const ac = a * c;
	            const ad = a * d;
	            const bc = b * c;
	            const bd = b * d;
	            out[0] = c * e;
	            out[4] = bd - ac * f;
	            out[8] = bc * f + ad;
	            out[1] = f;
	            out[5] = a * e;
	            out[9] = -b * e;
	            out[2] = -d * e;
	            out[6] = ad * f + bc;
	            out[10] = ac - bd * f;
	        }
	        else if (euler.order === exports.EulerRotationOrders.XZY) {
	            const ac = a * c;
	            const ad = a * d;
	            const bc = b * c;
	            const bd = b * d;
	            out[0] = c * e;
	            out[4] = -f;
	            out[8] = d * e;
	            out[1] = ac * f + bd;
	            out[5] = a * e;
	            out[9] = ad * f - bc;
	            out[2] = bc * f - ad;
	            out[6] = b * e;
	            out[10] = bd * f + ac;
	        }
	        // bottom row
	        out[3] = 0;
	        out[7] = 0;
	        out[11] = 0;
	        // last column
	        out[12] = 0;
	        out[13] = 0;
	        out[14] = 0;
	        out[15] = 1;
	        return out;
	    };
	    static fromMatrix3 = (data, out = new Matrix4()) => {
	        out[0] = data[0];
	        out[1] = data[1];
	        out[2] = data[2];
	        out[3] = 0;
	        out[4] = data[3];
	        out[5] = data[4];
	        out[6] = data[5];
	        out[7] = 0;
	        out[8] = data[6];
	        out[9] = data[7];
	        out[10] = data[8];
	        out[11] = 0;
	        out[12] = 0;
	        out[13] = 0;
	        out[14] = 0;
	        out[15] = 1;
	        return out;
	    };
	    static fromMatrix3MVP = (data, out = new Matrix4()) => {
	        out[0] = data[0];
	        out[1] = data[1];
	        out[2] = 0;
	        out[3] = 0;
	        out[4] = data[3];
	        out[5] = data[4];
	        out[6] = 0;
	        out[7] = 0;
	        out[8] = 0;
	        out[9] = 0;
	        out[10] = 1;
	        out[11] = 0;
	        out[12] = data[6];
	        out[13] = data[7];
	        out[14] = 0;
	        out[15] = 1;
	        return out;
	    };
	    static fromQuaternion = (q, out = new Matrix4()) => {
	        const x = q[0];
	        const y = q[1];
	        const z = q[2];
	        const w = q[3];
	        const x2 = x + x;
	        const y2 = y + y;
	        const z2 = z + z;
	        const xx = x * x2;
	        const yx = y * x2;
	        const yy = y * y2;
	        const zx = z * x2;
	        const zy = z * y2;
	        const zz = z * z2;
	        const wx = w * x2;
	        const wy = w * y2;
	        const wz = w * z2;
	        out[0] = 1 - yy - zz;
	        out[1] = yx + wz;
	        out[2] = zx - wy;
	        out[3] = 0;
	        out[4] = yx - wz;
	        out[5] = 1 - xx - zz;
	        out[6] = zy + wx;
	        out[7] = 0;
	        out[8] = zx + wy;
	        out[9] = zy - wx;
	        out[10] = 1 - xx - yy;
	        out[11] = 0;
	        out[12] = 0;
	        out[13] = 0;
	        out[14] = 0;
	        out[15] = 1;
	        return out;
	    };
	    static fromReflectPlane = (plane, out = new Matrix4()) => {
	        x$1 = plane.normal.x;
	        y$1 = plane.normal.y;
	        z = plane.normal.z;
	        d = plane.distance;
	        a = x$1 * 2;
	        b = y$1 * 2;
	        c = z * 2;
	        out[0] = 1 - a * x$1;
	        out[1] = -a * y$1;
	        out[2] = -a * z;
	        out[3] = 0;
	        out[4] = out[1];
	        out[5] = 1 - b * y$1;
	        out[6] = -b * z;
	        out[7] = 0;
	        out[8] = out[2];
	        out[9] = out[6];
	        out[10] = 1 - c * z;
	        out[11] = 0;
	        out[8] = -d * a;
	        out[9] = -d * b;
	        out[10] = -d * c;
	        out[11] = 1;
	        return out;
	    };
	    static fromRotation = (rad, axis, out = new Matrix4()) => {
	        x$1 = axis[0];
	        y$1 = axis[1];
	        z = axis[2];
	        len = Math.hypot(x$1, y$1, z);
	        if (len < EPSILON) {
	            return null;
	        }
	        len = 1 / len;
	        x$1 *= len;
	        y$1 *= len;
	        z *= len;
	        s = Math.sin(rad);
	        c = Math.cos(rad);
	        t = 1 - c;
	        out[0] = x$1 * x$1 * t + c;
	        out[1] = y$1 * x$1 * t + z * s;
	        out[2] = z * x$1 * t - y$1 * s;
	        out[3] = 0;
	        out[4] = x$1 * y$1 * t - z * s;
	        out[5] = y$1 * y$1 * t + c;
	        out[6] = z * y$1 * t + x$1 * s;
	        out[7] = 0;
	        out[8] = x$1 * z * t + y$1 * s;
	        out[9] = y$1 * z * t - x$1 * s;
	        out[10] = z * z * t + c;
	        out[11] = 0;
	        out[12] = 0;
	        out[13] = 0;
	        out[14] = 0;
	        out[15] = 1;
	        return out;
	    };
	    static fromRotationX = (rad, out = new Matrix4()) => {
	        s = Math.sin(rad);
	        c = Math.cos(rad);
	        out[0] = 1;
	        out[1] = 0;
	        out[2] = 0;
	        out[3] = 0;
	        out[4] = 0;
	        out[5] = c;
	        out[6] = s;
	        out[7] = 0;
	        out[8] = 0;
	        out[9] = -s;
	        out[10] = c;
	        out[11] = 0;
	        out[12] = 0;
	        out[13] = 0;
	        out[14] = 0;
	        out[15] = 1;
	        return out;
	    };
	    static fromRotationY = (rad, out = new Matrix4()) => {
	        s = Math.sin(rad);
	        c = Math.cos(rad);
	        out[0] = c;
	        out[1] = 0;
	        out[2] = -s;
	        out[3] = 0;
	        out[4] = 0;
	        out[5] = 1;
	        out[6] = 0;
	        out[7] = 0;
	        out[8] = s;
	        out[9] = 0;
	        out[10] = c;
	        out[11] = 0;
	        out[12] = 0;
	        out[13] = 0;
	        out[14] = 0;
	        out[15] = 1;
	        return out;
	    };
	    static fromRotationZ = (rad, out = new Matrix4()) => {
	        s = Math.sin(rad);
	        c = Math.cos(rad);
	        out[0] = c;
	        out[1] = s;
	        out[2] = 0;
	        out[3] = 0;
	        out[4] = -s;
	        out[5] = c;
	        out[6] = 0;
	        out[7] = 0;
	        out[8] = 0;
	        out[9] = 0;
	        out[10] = 1;
	        out[11] = 0;
	        out[12] = 0;
	        out[13] = 0;
	        out[14] = 0;
	        out[15] = 1;
	        return out;
	    };
	    static fromScaling = (v, out = new Matrix4()) => {
	        out[0] = v[0];
	        out[1] = 0;
	        out[2] = 0;
	        out[3] = 0;
	        out[4] = 0;
	        out[5] = v[1];
	        out[6] = 0;
	        out[7] = 0;
	        out[8] = 0;
	        out[9] = 0;
	        out[10] = v[2];
	        out[11] = 0;
	        out[12] = 0;
	        out[13] = 0;
	        out[14] = 0;
	        out[15] = 1;
	        return out;
	    };
	    static fromTranslation = (v, out = new Matrix4()) => {
	        out[0] = 1;
	        out[1] = 0;
	        out[2] = 0;
	        out[3] = 0;
	        out[4] = 0;
	        out[5] = 1;
	        out[6] = 0;
	        out[7] = 0;
	        out[8] = 0;
	        out[9] = 0;
	        out[10] = 1;
	        out[11] = 0;
	        out[12] = v[0];
	        out[13] = v[1];
	        out[14] = v[2];
	        out[15] = 1;
	        return out;
	    };
	    static identity = (out = new Matrix4()) => {
	        out[0] = 1;
	        out[1] = 0;
	        out[2] = 0;
	        out[3] = 0;
	        out[4] = 0;
	        out[5] = 1;
	        out[6] = 0;
	        out[7] = 0;
	        out[8] = 0;
	        out[9] = 0;
	        out[10] = 1;
	        out[11] = 0;
	        out[12] = 0;
	        out[13] = 0;
	        out[14] = 0;
	        out[15] = 1;
	        return out;
	    };
	    static invert = (a, out = new Matrix4()) => {
	        a00 = a[0];
	        a01 = a[1];
	        a02 = a[2];
	        a03 = a[3];
	        a10 = a[4];
	        a11 = a[5];
	        a12 = a[6];
	        a13 = a[7];
	        a20 = a[8];
	        a21 = a[9];
	        a22 = a[10];
	        a23 = a[11];
	        a30 = a[12];
	        a31 = a[13];
	        a32 = a[14];
	        a33 = a[15];
	        b00 = a00 * a11 - a01 * a10;
	        b01 = a00 * a12 - a02 * a10;
	        b02 = a00 * a13 - a03 * a10;
	        b03 = a01 * a12 - a02 * a11;
	        b20 = a01 * a13 - a03 * a11;
	        b21 = a02 * a13 - a03 * a12;
	        b22 = a20 * a31 - a21 * a30;
	        b23 = a20 * a32 - a22 * a30;
	        b30 = a20 * a33 - a23 * a30;
	        b31 = a21 * a32 - a22 * a31;
	        b32 = a21 * a33 - a23 * a31;
	        b33 = a22 * a33 - a23 * a32;
	        det = b00 * b33 - b01 * b32 + b02 * b31 + b03 * b30 - b20 * b23 + b21 * b22;
	        if (!det) {
	            return null;
	        }
	        det = 1.0 / det;
	        out[0] = (a11 * b33 - a12 * b32 + a13 * b31) * det;
	        out[1] = (a02 * b32 - a01 * b33 - a03 * b31) * det;
	        out[2] = (a31 * b21 - a32 * b20 + a33 * b03) * det;
	        out[3] = (a22 * b20 - a21 * b21 - a23 * b03) * det;
	        out[4] = (a12 * b30 - a10 * b33 - a13 * b23) * det;
	        out[5] = (a00 * b33 - a02 * b30 + a03 * b23) * det;
	        out[6] = (a32 * b02 - a30 * b21 - a33 * b01) * det;
	        out[7] = (a20 * b21 - a22 * b02 + a23 * b01) * det;
	        out[8] = (a10 * b32 - a11 * b30 + a13 * b22) * det;
	        out[9] = (a01 * b30 - a00 * b32 - a03 * b22) * det;
	        out[10] = (a30 * b20 - a31 * b02 + a33 * b00) * det;
	        out[11] = (a21 * b02 - a20 * b20 - a23 * b00) * det;
	        out[12] = (a11 * b23 - a10 * b31 - a12 * b22) * det;
	        out[13] = (a00 * b31 - a01 * b23 + a02 * b22) * det;
	        out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
	        out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
	        return out;
	    };
	    static lookAt = (eye, center, up = Vector3.VECTOR3_TOP, out = new Matrix4()) => {
	        let x0;
	        let x1;
	        let x2;
	        let y0;
	        let y1;
	        let y2;
	        let z0;
	        let z1;
	        let z2;
	        let len;
	        const eyex = eye[0];
	        const eyey = eye[1];
	        const eyez = eye[2];
	        const upx = up[0];
	        const upy = up[1];
	        const upz = up[2];
	        const centerx = center[0];
	        const centery = center[1];
	        const centerz = center[2];
	        if (closeTo(eyex, centerx) && closeTo(eyey, centery) && closeTo(eyez, centerz)) {
	            return Matrix4.identity(out);
	        }
	        z0 = eyex - centerx;
	        z1 = eyey - centery;
	        z2 = eyez - centerz;
	        len = 1 / Math.hypot(z0, z1, z2);
	        z0 *= len;
	        z1 *= len;
	        z2 *= len;
	        x0 = upy * z2 - upz * z1;
	        x1 = upz * z0 - upx * z2;
	        x2 = upx * z1 - upy * z0;
	        len = Math.hypot(x0, x1, x2);
	        if (!len) {
	            x0 = 0;
	            x1 = 0;
	            x2 = 0;
	        }
	        else {
	            len = 1 / len;
	            x0 *= len;
	            x1 *= len;
	            x2 *= len;
	        }
	        y0 = z1 * x2 - z2 * x1;
	        y1 = z2 * x0 - z0 * x2;
	        y2 = z0 * x1 - z1 * x0;
	        len = Math.hypot(y0, y1, y2);
	        if (!len) {
	            y0 = 0;
	            y1 = 0;
	            y2 = 0;
	        }
	        else {
	            len = 1 / len;
	            y0 *= len;
	            y1 *= len;
	            y2 *= len;
	        }
	        out[0] = x0;
	        out[1] = y0;
	        out[2] = z0;
	        out[3] = 0;
	        out[4] = x1;
	        out[5] = y1;
	        out[6] = z1;
	        out[7] = 0;
	        out[8] = x2;
	        out[9] = y2;
	        out[10] = z2;
	        out[11] = 0;
	        out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
	        out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
	        out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
	        out[15] = 1;
	        return out;
	    };
	    static multiply = (a, b, out = new Matrix4()) => {
	        a00 = a[0];
	        a01 = a[1];
	        a02 = a[2];
	        a03 = a[3];
	        a10 = a[4];
	        a11 = a[5];
	        a12 = a[6];
	        a13 = a[7];
	        a20 = a[8];
	        a21 = a[9];
	        a22 = a[10];
	        a23 = a[11];
	        a30 = a[12];
	        a31 = a[13];
	        a32 = a[14];
	        a33 = a[15];
	        b00 = b[0];
	        b01 = b[1];
	        b02 = b[2];
	        b03 = b[3];
	        out[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
	        out[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
	        out[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
	        out[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
	        b00 = b[4];
	        b01 = b[5];
	        b02 = b[6];
	        b03 = b[7];
	        out[4] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
	        out[5] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
	        out[6] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
	        out[7] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
	        b00 = b[8];
	        b01 = b[9];
	        b02 = b[10];
	        b03 = b[11];
	        out[8] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
	        out[9] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
	        out[10] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
	        out[11] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
	        b00 = b[12];
	        b01 = b[13];
	        b02 = b[14];
	        b03 = b[15];
	        out[12] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
	        out[13] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
	        out[14] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
	        out[15] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
	        return out;
	    };
	    // 乘以缩放矩阵
	    static multiplyScaleMatrix = (a, b, out = new Matrix4()) => {
	        a00 = a[0];
	        a01 = a[1];
	        a02 = a[2];
	        a03 = a[3];
	        a10 = a[4];
	        a11 = a[5];
	        a12 = a[6];
	        a13 = a[7];
	        a20 = a[8];
	        a21 = a[9];
	        a22 = a[10];
	        a23 = a[11];
	        a30 = a[12];
	        a31 = a[13];
	        a32 = a[14];
	        a33 = a[15];
	        b00 = b[0];
	        out[0] = b00 * a00;
	        out[1] = b00 * a01;
	        out[2] = b00 * a02;
	        out[3] = b00 * a03;
	        b01 = b[5];
	        out[4] = b01 * a10;
	        out[5] = b01 * a11;
	        out[6] = b01 * a12;
	        out[7] = b01 * a13;
	        b02 = b[10];
	        out[8] = b02 * a20;
	        out[9] = b02 * a21;
	        out[10] = b02 * a22;
	        out[11] = b02 * a23;
	        out[12] = a30;
	        out[13] = a31;
	        out[14] = a32;
	        out[15] = a33;
	        return out;
	    };
	    // 乘以平移矩阵
	    static multiplyTranslateMatrix = (a, b, out = new Matrix4()) => {
	        a00 = a[0];
	        a01 = a[1];
	        a02 = a[2];
	        a03 = a[3];
	        a10 = a[4];
	        a11 = a[5];
	        a12 = a[6];
	        a13 = a[7];
	        a20 = a[8];
	        a21 = a[9];
	        a22 = a[10];
	        a23 = a[11];
	        a30 = a[12];
	        a31 = a[13];
	        a32 = a[14];
	        a33 = a[15];
	        out[0] = a00;
	        out[1] = a01;
	        out[2] = a02;
	        out[3] = a03;
	        out[4] = a10;
	        out[5] = a11;
	        out[6] = a12;
	        out[7] = a13;
	        out[8] = a20;
	        out[9] = a21;
	        out[10] = a22;
	        out[11] = a23;
	        b00 = b[12];
	        b01 = b[13];
	        b02 = b[14];
	        out[12] = b00 * a00 + b01 * a10 + b02 * a20 + a30;
	        out[13] = b00 * a01 + b01 * a11 + b02 * a21 + a31;
	        out[14] = b00 * a02 + b01 * a12 + b02 * a22 + a32;
	        out[15] = b00 * a03 + b01 * a13 + b02 * a23 + a33;
	        return out;
	    };
	    static orthogonal = (left, right, bottom, top, near, far, out = new Matrix4()) => {
	        c = 1 / (left - right);
	        b = 1 / (bottom - top);
	        a = 1 / (near - far);
	        out[0] = -2 * c;
	        out[1] = 0;
	        out[2] = 0;
	        out[3] = 0;
	        out[4] = 0;
	        out[5] = -2 * b;
	        out[6] = 0;
	        out[7] = 0;
	        out[8] = 0;
	        out[9] = 0;
	        out[10] = 2 * a;
	        out[11] = 0;
	        out[12] = (left + right) * c;
	        out[13] = (top + bottom) * b;
	        out[14] = (far + near) * a;
	        out[15] = 1;
	        return out;
	    };
	    static orthogonalZ0 = (left, right, bottom, top, near, far, out = new Matrix4()) => {
	        c = 1 / (left - right);
	        b = 1 / (bottom - top);
	        a = 1 / (near - far);
	        out[0] = -2 * c;
	        out[1] = 0;
	        out[2] = 0;
	        out[3] = 0;
	        out[4] = 0;
	        out[5] = -2 * b;
	        out[6] = 0;
	        out[7] = 0;
	        out[8] = 0;
	        out[9] = 0;
	        out[10] = a;
	        out[11] = 0;
	        out[12] = (left + right) * c;
	        out[13] = (top + bottom) * b;
	        out[14] = near * a;
	        out[15] = 1;
	        return out;
	    };
	    static perspective = (fovy, aspect, near, far, out = new Matrix4()) => {
	        f = 1.0 / Math.tan(fovy / 2);
	        out[0] = f / aspect;
	        out[1] = 0;
	        out[2] = 0;
	        out[3] = 0;
	        out[4] = 0;
	        out[5] = f;
	        out[6] = 0;
	        out[7] = 0;
	        out[8] = 0;
	        out[9] = 0;
	        out[11] = -1;
	        out[12] = 0;
	        out[13] = 0;
	        out[15] = 0;
	        if (far !== null && far !== Infinity) {
	            a = 1 / (near - far);
	            out[10] = (far + near) * a;
	            out[14] = 2 * far * near * a;
	        }
	        else {
	            out[10] = -1;
	            out[14] = -2 * near;
	        }
	        return out;
	    };
	    static perspectiveZ0 = (fovy, aspect, near, far, out = new Matrix4()) => {
	        f = 1.0 / Math.tan(fovy / 2);
	        out[0] = f / aspect;
	        out[1] = 0;
	        out[2] = 0;
	        out[3] = 0;
	        out[4] = 0;
	        out[5] = f;
	        out[6] = 0;
	        out[7] = 0;
	        out[8] = 0;
	        out[9] = 0;
	        out[11] = -1;
	        out[12] = 0;
	        out[13] = 0;
	        out[15] = 0;
	        if (far !== null && far !== Infinity) {
	            a = 1 / (near - far);
	            out[10] = far * a;
	            out[14] = far * near * a;
	        }
	        else {
	            out[10] = -1;
	            out[14] = -near;
	        }
	        return out;
	    };
	    static rotate = (a, rad, axis, out = new Matrix4()) => {
	        x$1 = axis[0];
	        y$1 = axis[1];
	        z = axis[2];
	        len = Math.hypot(x$1, y$1, z);
	        if (len < EPSILON) {
	            return null;
	        }
	        len = 1 / len;
	        x$1 *= len;
	        y$1 *= len;
	        z *= len;
	        s = Math.sin(rad);
	        c = Math.cos(rad);
	        t = 1 - c;
	        a00 = a[0];
	        a01 = a[1];
	        a02 = a[2];
	        a03 = a[3];
	        a10 = a[4];
	        a11 = a[5];
	        a12 = a[6];
	        a13 = a[7];
	        a20 = a[8];
	        a21 = a[9];
	        a22 = a[10];
	        a23 = a[11];
	        b00 = x$1 * x$1 * t + c;
	        b01 = y$1 * x$1 * t + z * s;
	        b02 = z * x$1 * t - y$1 * s;
	        b10 = x$1 * y$1 * t - z * s;
	        b11 = y$1 * y$1 * t + c;
	        b12 = z * y$1 * t + x$1 * s;
	        b20 = x$1 * z * t + y$1 * s;
	        b21 = y$1 * z * t - x$1 * s;
	        b22 = z * z * t + c;
	        out[0] = a00 * b00 + a10 * b01 + a20 * b02;
	        out[1] = a01 * b00 + a11 * b01 + a21 * b02;
	        out[2] = a02 * b00 + a12 * b01 + a22 * b02;
	        out[3] = a03 * b00 + a13 * b01 + a23 * b02;
	        out[4] = a00 * b10 + a10 * b11 + a20 * b12;
	        out[5] = a01 * b10 + a11 * b11 + a21 * b12;
	        out[6] = a02 * b10 + a12 * b11 + a22 * b12;
	        out[7] = a03 * b10 + a13 * b11 + a23 * b12;
	        out[8] = a00 * b20 + a10 * b21 + a20 * b22;
	        out[9] = a01 * b20 + a11 * b21 + a21 * b22;
	        out[10] = a02 * b20 + a12 * b21 + a22 * b22;
	        out[11] = a03 * b20 + a13 * b21 + a23 * b22;
	        if (a !== out) {
	            out[12] = a[12];
	            out[13] = a[13];
	            out[14] = a[14];
	            out[15] = a[15];
	        }
	        return out;
	    };
	    static rotateX = (a, rad, out = new Matrix4()) => {
	        s = Math.sin(rad);
	        c = Math.cos(rad);
	        a10 = a[4];
	        a11 = a[5];
	        a12 = a[6];
	        a13 = a[7];
	        a20 = a[8];
	        a21 = a[9];
	        a22 = a[10];
	        a23 = a[11];
	        if (a !== out) {
	            out[0] = a[0];
	            out[1] = a[1];
	            out[2] = a[2];
	            out[3] = a[3];
	            out[12] = a[12];
	            out[13] = a[13];
	            out[14] = a[14];
	            out[15] = a[15];
	        }
	        out[4] = a10 * c + a20 * s;
	        out[5] = a11 * c + a21 * s;
	        out[6] = a12 * c + a22 * s;
	        out[7] = a13 * c + a23 * s;
	        out[8] = a20 * c - a10 * s;
	        out[9] = a21 * c - a11 * s;
	        out[10] = a22 * c - a12 * s;
	        out[11] = a23 * c - a13 * s;
	        return out;
	    };
	    static rotateY = (a, rad, out = new Matrix4()) => {
	        s = Math.sin(rad);
	        c = Math.cos(rad);
	        a00 = a[0];
	        a01 = a[1];
	        a02 = a[2];
	        a03 = a[3];
	        a20 = a[8];
	        a21 = a[9];
	        a22 = a[10];
	        a23 = a[11];
	        if (a !== out) {
	            out[4] = a[4];
	            out[5] = a[5];
	            out[6] = a[6];
	            out[7] = a[7];
	            out[12] = a[12];
	            out[13] = a[13];
	            out[14] = a[14];
	            out[15] = a[15];
	        }
	        out[0] = a00 * c - a20 * s;
	        out[1] = a01 * c - a21 * s;
	        out[2] = a02 * c - a22 * s;
	        out[3] = a03 * c - a23 * s;
	        out[8] = a00 * s + a20 * c;
	        out[9] = a01 * s + a21 * c;
	        out[10] = a02 * s + a22 * c;
	        out[11] = a03 * s + a23 * c;
	        return out;
	    };
	    static rotateZ = (a, rad, out = new Matrix4()) => {
	        s = Math.sin(rad);
	        c = Math.cos(rad);
	        a00 = a[0];
	        a01 = a[1];
	        a02 = a[2];
	        a03 = a[3];
	        a10 = a[4];
	        a11 = a[5];
	        a12 = a[6];
	        a13 = a[7];
	        if (a !== out) {
	            out[8] = a[8];
	            out[9] = a[9];
	            out[10] = a[10];
	            out[11] = a[11];
	            out[12] = a[12];
	            out[13] = a[13];
	            out[14] = a[14];
	            out[15] = a[15];
	        }
	        out[0] = a00 * c + a10 * s;
	        out[1] = a01 * c + a11 * s;
	        out[2] = a02 * c + a12 * s;
	        out[3] = a03 * c + a13 * s;
	        out[4] = a10 * c - a00 * s;
	        out[5] = a11 * c - a01 * s;
	        out[6] = a12 * c - a02 * s;
	        out[7] = a13 * c - a03 * s;
	        return out;
	    };
	    static scale = (a, v, out = new Matrix4()) => {
	        x$1 = v[0];
	        y$1 = v[1];
	        z = v[2];
	        out[0] = a[0] * x$1;
	        out[1] = a[1] * x$1;
	        out[2] = a[2] * x$1;
	        out[3] = a[3] * x$1;
	        out[4] = a[4] * y$1;
	        out[5] = a[5] * y$1;
	        out[6] = a[6] * y$1;
	        out[7] = a[7] * y$1;
	        out[8] = a[8] * z;
	        out[9] = a[9] * z;
	        out[10] = a[10] * z;
	        out[11] = a[11] * z;
	        if (out !== a) {
	            out[12] = a[12];
	            out[13] = a[13];
	            out[14] = a[14];
	            out[15] = a[15];
	        }
	        return out;
	    };
	    static targetTo = (eye, target, up = Vector3.VECTOR3_TOP, out = new Matrix4()) => {
	        const eyex = eye[0];
	        const eyey = eye[1];
	        const eyez = eye[2];
	        const upx = up[0];
	        const upy = up[1];
	        const upz = up[2];
	        let z0 = eyex - target[0];
	        let z1 = eyey - target[1];
	        let z2 = eyez - target[2];
	        let len = z0 * z0 + z1 * z1 + z2 * z2;
	        if (len > 0) {
	            len = 1 / Math.sqrt(len);
	            z0 *= len;
	            z1 *= len;
	            z2 *= len;
	        }
	        let x0 = upy * z2 - upz * z1;
	        let x1 = upz * z0 - upx * z2;
	        let x2 = upx * z1 - upy * z0;
	        len = x0 * x0 + x1 * x1 + x2 * x2;
	        if (len > 0) {
	            len = 1 / Math.sqrt(len);
	            x0 *= len;
	            x1 *= len;
	            x2 *= len;
	        }
	        out[0] = x0;
	        out[1] = x1;
	        out[2] = x2;
	        out[3] = 0;
	        out[4] = z1 * x2 - z2 * x1;
	        out[5] = z2 * x0 - z0 * x2;
	        out[6] = z0 * x1 - z1 * x0;
	        out[7] = 0;
	        out[8] = z0;
	        out[9] = z1;
	        out[10] = z2;
	        out[11] = 0;
	        out[12] = eyex;
	        out[13] = eyey;
	        out[14] = eyez;
	        out[15] = 1;
	        return out;
	    };
	    static translate = (a, v, out = new Matrix4()) => {
	        x$1 = v[0];
	        y$1 = v[1];
	        z = v[2];
	        if (a === out) {
	            out[12] = a[0] * x$1 + a[4] * y$1 + a[8] * z + a[12];
	            out[13] = a[1] * x$1 + a[5] * y$1 + a[9] * z + a[13];
	            out[14] = a[2] * x$1 + a[6] * y$1 + a[10] * z + a[14];
	            out[15] = a[3] * x$1 + a[7] * y$1 + a[11] * z + a[15];
	        }
	        else {
	            a00 = a[0];
	            a01 = a[1];
	            a02 = a[2];
	            a03 = a[3];
	            a10 = a[4];
	            a11 = a[5];
	            a12 = a[6];
	            a13 = a[7];
	            a20 = a[8];
	            a21 = a[9];
	            a22 = a[10];
	            a23 = a[11];
	            out[0] = a00;
	            out[1] = a01;
	            out[2] = a02;
	            out[3] = a03;
	            out[4] = a10;
	            out[5] = a11;
	            out[6] = a12;
	            out[7] = a13;
	            out[8] = a20;
	            out[9] = a21;
	            out[10] = a22;
	            out[11] = a23;
	            out[12] = a00 * x$1 + a10 * y$1 + a20 * z + a[12];
	            out[13] = a01 * x$1 + a11 * y$1 + a21 * z + a[13];
	            out[14] = a02 * x$1 + a12 * y$1 + a22 * z + a[14];
	            out[15] = a03 * x$1 + a13 * y$1 + a23 * z + a[15];
	        }
	        return out;
	    };
	    static transpose = (a, out = new Matrix4()) => {
	        if (out === a) {
	            a01 = a[1];
	            a02 = a[2];
	            a03 = a[3];
	            a12 = a[6];
	            a13 = a[7];
	            a23 = a[11];
	            out[1] = a[4];
	            out[2] = a[8];
	            out[3] = a[12];
	            out[4] = a01;
	            out[6] = a[9];
	            out[7] = a[13];
	            out[8] = a02;
	            out[9] = a12;
	            out[11] = a[14];
	            out[12] = a03;
	            out[13] = a13;
	            out[14] = a23;
	        }
	        else {
	            out[0] = a[0];
	            out[1] = a[4];
	            out[2] = a[8];
	            out[3] = a[12];
	            out[4] = a[1];
	            out[5] = a[5];
	            out[6] = a[9];
	            out[7] = a[13];
	            out[8] = a[2];
	            out[9] = a[6];
	            out[10] = a[10];
	            out[11] = a[14];
	            out[12] = a[3];
	            out[13] = a[7];
	            out[14] = a[11];
	            out[15] = a[15];
	        }
	        return out;
	    };
	    static unproject = (vec3, projectionMatrix, worldMatrix, out = new Vector3()) => {
	        tmpMatrix4Data.set(projectionMatrix);
	        Matrix4.invert(tmpMatrix4Data, tmpMatrix4Data);
	        Vector3.transformMatrix4(vec3, tmpMatrix4Data, out);
	        return Vector3.transformMatrix4(out, worldMatrix, out);
	    };
	    constructor(data = UNIT_MATRIX4_DATA) {
	        super(data);
	    }
	}
	const tmpMatrix4Data = new Float32Array(16);

	let x;
	let y;
	/**
	 * @class
	 * @classdesc 极坐标
	 * @implements {Mathx.IPolar}
	 * @name Mathx.Polar
	 * @desc 极坐标，遵守数学右手定则。规定逆时针方向为正方向。
	 * @param {number} [r=0] | 距离极点距离
	 * @param {number} [a=0] | 旋转弧度，规定0弧度为笛卡尔坐标系x轴方向
	 */
	class Polar extends Float32Array {
	    /**
	     * @public
	     * @method create
	     * @memberof Mathx.Polar
	     * @desc 创建一个极坐标
	     * @param {number} [r=0] 距离
	     * @param {number} [a=0] 弧度
	     * @returns {Mathx.Polar} 新的极坐标实例
	     */
	    static create(r = 0, a = 0) {
	        return new Polar(r, a);
	    }
	    static fromRA(r = 0, a = 0, out = new Polar()) {
	        out[0] = r;
	        out[1] = a;
	        return out;
	    }
	    get a() {
	        return this[1];
	    }
	    set a(v) {
	        this[1] = v;
	    }
	    get r() {
	        return this[0];
	    }
	    set r(v) {
	        this[0] = v;
	    }
	    dataType = ArraybufferDataType.POLAR;
	    /**
	     * @public
	     * @member {number} Mathx.Polar.prototype.a
	     * @desc 旋转弧度
	     * @default 0
	     */
	    /**
	     * @public
	     * @member {number} Mathx.Polar.prototype.r
	     * @desc 距离
	     * @default 0
	     */
	    constructor(r = 0, a = 0) {
	        super(2);
	        this.r = r;
	        this.a = a;
	    }
	    /**
	     * @public
	     * @method Mathx.Polar.prototype.distanceTo
	     * @desc 求该坐标到另一个极坐标的欧几里得距离
	     * @param {Mathx.IPolar} p | 目标极坐标
	     * @returns {number} 欧几里得距离
	     */
	    distanceTo(p) {
	        return Math.sqrt(this.distanceToSquared(p));
	    }
	    /**
	     * @public
	     * @method Mathx.Polar.prototype.distanceToManhattan
	     * @desc 求该坐标到另一个极坐标的曼哈顿距离
	     * @param {Mathx.IPolar} p | 目标极坐标
	     * @returns {number} 曼哈顿距离
	     */
	    distanceToManhattan({ r, a }) {
	        return Math.cos(a) * r - this.x() + Math.sin(a) * r - this.y();
	    }
	    /**
	     * @public
	     * @method Mathx.Polar.prototype.distanceToSquared
	     * @desc 求该坐标到另一个极坐标的欧几里得距离平方
	     * @param {Mathx.IPolar} p | 目标极坐标
	     * @returns {number} 欧几里得距离平方
	     */
	    distanceToSquared({ r, a }) {
	        return this.r * this.r + r * r - 2 * r * this.r * Math.cos(a - this.a);
	    }
	    /**
	     * @public
	     * @method Mathx.Polar.prototype.fromVector2
	     * @desc 将一个二维向量数据转化为自身的极坐标值
	     * @param {Mathx.IVector2} vector2 | 二维向量
	     * @returns {number} this
	     */
	    fromVector2(v) {
	        x = v[0];
	        y = v[1];
	        this.r = Math.sqrt(x * x + y * y);
	        this.a = Math.atan2(y, x);
	        return this;
	    }
	    /**
	     * @public
	     * @method Mathx.Polar.prototype.lengthManhattan
	     * @desc 求自身离原点的曼哈顿距离
	     * @returns {number} 曼哈顿距离
	     */
	    lengthManhattan() {
	        return (Math.cos(this.a) + Math.sin(this.a)) * this.r;
	    }
	    /**
	     * @public
	     * @method Mathx.Polar.prototype.setA
	     * @desc 设置极坐标的弧度
	     * @param {number} [a=0] 角度
	     * @returns {number} this
	     */
	    setA(a = 0) {
	        this.a = a;
	        return this;
	    }
	    /**
	     * @public
	     * @method Mathx.Polar.prototype.setR
	     * @desc 设置极坐标的弧度
	     * @param {number} [r=0] 距离
	     * @returns {number} this
	     */
	    setR(r = 0) {
	        this.r = r;
	        return this;
	    }
	    /**
	     * @public
	     * @method Mathx.Polar.prototype.toJson
	     * @desc 将极坐标转化为纯json对象，纯数据
	     * @param {IPolar} [json] 被修改的json对象，如果不传则会新创建json对象。
	     * @returns {Mathx.IPolar} json
	     */
	    toJson(json = { a: 0, r: 0 }) {
	        json.r = this.r;
	        json.a = this.a;
	        return json;
	    }
	    /**
	     * @public
	     * @method Mathx.Polar.prototype.toString
	     * @desc 将极坐标转化为字符串
	     * @returns {string} 形式为"(r, a)"的字符串
	     */
	    toString() {
	        return `(${this.r}, ${this.a})`;
	    }
	    /**
	     * @public
	     * @method Mathx.Polar.prototype.x
	     * @desc 获取极坐标对应二维向量的x的值
	     * @returns {number} x
	     */
	    x() {
	        return Math.cos(this.a) * this.r;
	    }
	    /**
	     * @public
	     * @method Mathx.Polar.prototype.y
	     * @desc 获取极坐标对应二维向量的y的值
	     * @returns {number} y
	     */
	    y() {
	        return Math.sin(this.a) * this.r;
	    }
	}

	new Vector3();

	const rndFloat = (min = 0, max = 1) => {
	    return min + Math.random() * (max - min);
	};

	const rndFloatRange = (range) => {
	    return range * (0.5 - Math.random());
	};

	const rndInt = (min = 0, max = 1) => {
	    return min + Math.floor(Math.random() * (max - min + 1));
	};

	const v1$1 = new Vector3();
	const v2$1 = new Vector3();
	const v3 = new Vector3();
	class Plane3 {
	    static normalize(p, out = new Plane3()) {
	        const normal = p.normal;
	        const factor = 1.0 / Vector3.norm(normal);
	        Vector3.multiplyScalar(normal, factor, out.normal);
	        out.distance = p.distance * factor;
	        return out;
	    }
	    normal = new Vector3();
	    distance;
	    constructor(normal = Vector3.VECTOR3_TOP, distance = 0) {
	        this.normal.set(normal);
	        this.distance = distance;
	    }
	    distanceToPoint(point) {
	        return Vector3.dot(this.normal, point) + this.distance;
	    }
	    distanceToSphere(sphere) {
	        return this.distanceToPoint(sphere.position) - sphere.radius;
	    }
	    from(p) {
	        this.distance = p.distance;
	        this.normal.set(p.normal);
	    }
	    fromCoplanarPoints(a, b, c) {
	        Vector3.minus(b, a, v1$1);
	        Vector3.minus(c, a, v2$1);
	        Vector3.cross(v1$1, v2$1, v3);
	        Vector3.normalize(v3, v3);
	        // TODO check zero vec
	        return this.formCoplanarPointAndNormal(a, v3);
	    }
	    formCoplanarPointAndNormal(point, normal) {
	        this.normal.set(normal);
	        this.distance = -Vector3.dot(point, normal);
	        return this;
	    }
	    fromTriangle3(triangle) {
	        return this.fromCoplanarPoints(triangle.a, triangle.b, triangle.c);
	    }
	    negate() {
	        this.distance *= -1;
	        Vector3.negate(this.normal, this.normal);
	        return this;
	    }
	    normalize() {
	        Plane3.normalize(this, this);
	        return this;
	    }
	    projectPoint(point, out = new Vector3()) {
	        Vector3.fromArray(this.normal, 0, out);
	        Vector3.multiplyScalar(out, -this.distanceToPoint(point), out);
	        return Vector3.add(out, point, out);
	    }
	    set(normal, distance = this.distance) {
	        this.normal.set(normal);
	        this.distance = distance;
	        return this;
	    }
	}

	// import Matrix3 from "../matrix/Matrix3";
	const v1 = new Vector3();
	const v2 = new Vector3();
	const v0 = new Vector3();
	const f1 = new Vector3();
	const f2 = new Vector3();
	const f0 = new Vector3();
	const ta = new Vector3();
	// const ma: Matrix3 = new Matrix3();
	const tb = new Vector3();
	const vA = new Vector3();
	class Cube {
	    static center = (a, out = new Vector3()) => {
	        Vector3.add(a.min, a.max, out);
	        return Vector3.multiplyScalar(out, 0.5, out);
	    };
	    static clampPoint = (a, point, out = new Vector3()) => {
	        return Vector3.clamp(point, a.min, a.max, out);
	    };
	    static containsPoint = (a, b) => {
	        return (b[0] >= a.min[0] &&
	            b[0] <= a.max[0] &&
	            b[1] >= a.min[1] &&
	            b[1] <= a.max[1] &&
	            b[2] >= a.min[2] &&
	            b[2] <= a.max[2]);
	    };
	    static containsCube = (a, b) => {
	        return (a.min[0] <= b.min[0] &&
	            b.max[0] <= a.max[0] &&
	            a.min[1] <= b.min[1] &&
	            b.max[1] <= a.max[1] &&
	            a.min[2] <= b.min[2] &&
	            b.max[2] <= a.max[2]);
	    };
	    static depth = (a) => {
	        return a.max[2] - a.min[2];
	    };
	    static equals = (a, b) => {
	        return Vector3.equals(a.min, b.min) && Vector3.equals(a.max, b.max);
	    };
	    static getSize = (a, out = new Vector3()) => {
	        return Vector3.minus(a.max, a.min, out);
	    };
	    static height = (a) => {
	        return a.max[1] - a.min[1];
	    };
	    static intersect = (a, b, out = new Cube()) => {
	        Vector3.max(a.min, b.min, out.min);
	        Vector3.min(a.max, b.max, out.max);
	        return out;
	    };
	    static intersectsBox = (a, b) => {
	        return !(b.max[0] < a.min[0] ||
	            b.min[0] > a.max[0] ||
	            b.max[1] < a.min[1] ||
	            b.min[1] > a.max[1] ||
	            b.max[2] < a.min[2] ||
	            b.min[2] > a.max[2]);
	    };
	    static intersectsSphere = (a, b) => {
	        Cube.clampPoint(a, b.position, ta);
	        return Vector3.distanceToSquared(ta, b.position) <= b.radius * b.radius;
	    };
	    static intersectsTriangle = (a, b) => {
	        if (Cube.isEmpty(a)) {
	            return false;
	        }
	        Cube.center(a, ta);
	        Vector3.minus(a.max, ta, tb);
	        // translate triangle to aabb origin
	        Vector3.minus(b.a, ta, v0);
	        Vector3.minus(b.b, ta, v1);
	        Vector3.minus(b.c, ta, v2);
	        // compute edge vectors for triangle
	        Vector3.minus(v1, v0, f0);
	        Vector3.minus(v2, v1, f1);
	        Vector3.minus(v0, v2, f2);
	        // test against axes that are given by cross product combinations of the edges of the triangle and the edges of the aabb
	        // make an axis testing of each of the 3 sides of the aabb against each of the 3 sides of the triangle = 9 axis of separation
	        // axis_ij = u_i x f_j (u0, u1, u2 = face normals of aabb = x,y,z axes vectors since aabb is axis aligned)
	        const axes = [
	            0,
	            -f0[2],
	            f0[1],
	            0,
	            -f1[2],
	            f1[1],
	            0,
	            -f2[2],
	            f2[1],
	            f0[2],
	            0,
	            -f0[0],
	            f1[2],
	            0,
	            -f1[0],
	            f2[2],
	            0,
	            -f2[0],
	            -f0[1],
	            f0[0],
	            0,
	            -f1[1],
	            f1[0],
	            0,
	            -f2[1],
	            f2[0],
	            0,
	        ];
	        if (!satForAxes(axes, v0, v1, v2, tb)) {
	            return false;
	        }
	        // test 3 face normals from the aabb
	        // ta = Matrix3.identity(); ???
	        if (!satForAxes(axes, v0, v1, v2, tb)) {
	            return false;
	        }
	        // finally testing the face normal of the triangle
	        // use already existing triangle edge vectors here
	        Vector3.cross(f0, f1, ta);
	        // axes = [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z];
	        return satForAxes(ta, v0, v1, v2, tb);
	    };
	    static isEmpty = (a) => {
	        return a.max[0] < a.min[0] || a.max[0] < a.min[0] || a.max[0] < a.min[0];
	    };
	    static round = (a, out = new Cube()) => {
	        Vector3.round(a.min, out.min);
	        Vector3.round(a.max, out.max);
	        return out;
	    };
	    static size = (a, out = new Vector3()) => {
	        return Vector3.minus(a.max, a.min, out);
	    };
	    static stretch = (a, b, c, out = new Cube()) => {
	        Vector3.add(a.min, b, out.min);
	        Vector3.add(a.max, c, out.max);
	        return out;
	    };
	    static surfaceArea = (a) => {
	        Cube.getSize(a, ta);
	        return (ta.x * ta.y + ta.x * ta.z + ta.y * ta.z) * 2;
	    };
	    static translate = (a, b, out = new Cube()) => {
	        Vector3.add(a.min, b, out.min);
	        Vector3.add(a.max, b, out.max);
	        return out;
	    };
	    static union = (a, b, out = new Cube()) => {
	        Vector3.min(a.min, b.min, out.min);
	        Vector3.max(a.max, b.max, out.max);
	        return out;
	    };
	    static volume = (a) => {
	        return (a.max[0] - a.min[0]) * (a.max[1] - a.min[1]) * (a.max[2] - a.min[2]);
	    };
	    static width = (a) => {
	        return a.max[0] - a.min[0];
	    };
	    min = new Vector3();
	    max = new Vector3();
	    constructor(a = new Vector3(), b = Vector3.VECTOR3_ONE) {
	        Vector3.min(a, b, this.min);
	        Vector3.max(a, b, this.max);
	    }
	}
	let i;
	let j;
	let p0;
	let p1;
	let p2;
	let r$1;
	function satForAxes(axes, v0, v1, v2, extents) {
	    for (i = 0, j = axes.length - 3; i <= j; i += 3) {
	        Vector3.fromArray(axes, i, vA);
	        // project the aabb onto the seperating axis
	        r$1 = extents[0] * Math.abs(vA[0]) + extents[1] * Math.abs(vA[1]) + extents[2] * Math.abs(vA[2]);
	        // project all 3 vertices of the triangle onto the seperating axis
	        p0 = Vector3.dot(v0, vA);
	        p1 = Vector3.dot(v1, vA);
	        p2 = Vector3.dot(v2, vA);
	        // actual test, basically see if either of the most extreme of the triangle points intersects r
	        if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r$1) {
	            // points of the projected triangle are outside the projected half-length of the aabb
	            // the axis is seperating and we can exit
	            return false;
	        }
	    }
	    return true;
	}

	const _vector = new Vector3();
	class Frustum {
	    near;
	    far;
	    left;
	    right;
	    bottom;
	    top;
	    constructor(matrix) {
	        this.near = new Plane3();
	        this.far = new Plane3();
	        this.left = new Plane3();
	        this.right = new Plane3();
	        this.top = new Plane3();
	        this.bottom = new Plane3();
	        matrix && this.applyProjectionMatrix(matrix);
	    }
	    applyProjectionMatrix(matrix) {
	        const m11 = matrix[0];
	        const m12 = matrix[1];
	        const m13 = matrix[2];
	        const m14 = matrix[3];
	        const m21 = matrix[4];
	        const m22 = matrix[5];
	        const m23 = matrix[6];
	        const m24 = matrix[7];
	        const m31 = matrix[8];
	        const m32 = matrix[9];
	        const m33 = matrix[10];
	        const m34 = matrix[11];
	        const m41 = matrix[12];
	        const m42 = matrix[13];
	        const m43 = matrix[14];
	        const m44 = matrix[15];
	        Vector3.fromXYZ(m14 + m13, m24 + m23, m34 + m33, this.near.normal);
	        this.near.distance = m44 + m43;
	        this.near.normalize();
	        Vector3.fromXYZ(m14 - m13, m24 - m23, m34 - m33, this.far.normal);
	        this.far.distance = m44 - m43;
	        this.far.normalize();
	        Vector3.fromXYZ(m14 + m11, m24 + m21, m34 + m31, this.left.normal);
	        this.left.distance = m44 + m41;
	        this.left.normalize();
	        Vector3.fromXYZ(m14 - m11, m24 - m21, m34 - m31, this.right.normal);
	        this.right.distance = m44 - m41;
	        this.right.normalize();
	        Vector3.fromXYZ(m14 + m12, m24 + m22, m34 + m32, this.bottom.normal);
	        this.bottom.distance = m44 + m42;
	        this.bottom.normalize();
	        Vector3.fromXYZ(m14 - m12, m24 - m22, m34 - m32, this.top.normal);
	        this.top.distance = m44 - m42;
	        this.top.normalize();
	        return this;
	    }
	    clone() {
	        return new Frustum().from(this);
	    }
	    from(frustum) {
	        this.near.from(frustum.near);
	        this.far.from(frustum.far);
	        this.left.from(frustum.left);
	        this.right.from(frustum.right);
	        this.bottom.from(frustum.bottom);
	        this.top.from(frustum.top);
	        return this;
	    }
	    intersectsSphere(sphere) {
	        const p = sphere.position;
	        const r = -sphere.radius;
	        let distance = this.near.distanceToPoint(p);
	        if (distance < r) {
	            return false;
	        }
	        distance = this.far.distanceToPoint(p);
	        if (distance < r) {
	            return false;
	        }
	        distance = this.right.distanceToPoint(p);
	        if (distance < r) {
	            return false;
	        }
	        distance = this.left.distanceToPoint(p);
	        if (distance < r) {
	            return false;
	        }
	        distance = this.top.distanceToPoint(p);
	        if (distance < r) {
	            return false;
	        }
	        distance = this.bottom.distanceToPoint(p);
	        if (distance < r) {
	            return false;
	        }
	        return true;
	    }
	    intersectsBox(box) {
	        let plane = this.right;
	        _vector.x = plane.normal.x > 0 ? box.max.x : box.min.x;
	        _vector.y = plane.normal.y > 0 ? box.max.y : box.min.y;
	        _vector.z = plane.normal.z > 0 ? box.max.z : box.min.z;
	        if (plane.distanceToPoint(_vector) < 0) {
	            return false;
	        }
	        plane = this.left;
	        _vector.x = plane.normal.x > 0 ? box.max.x : box.min.x;
	        _vector.y = plane.normal.y > 0 ? box.max.y : box.min.y;
	        _vector.z = plane.normal.z > 0 ? box.max.z : box.min.z;
	        if (plane.distanceToPoint(_vector) < 0) {
	            return false;
	        }
	        plane = this.top;
	        _vector.x = plane.normal.x > 0 ? box.max.x : box.min.x;
	        _vector.y = plane.normal.y > 0 ? box.max.y : box.min.y;
	        _vector.z = plane.normal.z > 0 ? box.max.z : box.min.z;
	        if (plane.distanceToPoint(_vector) < 0) {
	            return false;
	        }
	        plane = this.bottom;
	        _vector.x = plane.normal.x > 0 ? box.max.x : box.min.x;
	        _vector.y = plane.normal.y > 0 ? box.max.y : box.min.y;
	        _vector.z = plane.normal.z > 0 ? box.max.z : box.min.z;
	        if (plane.distanceToPoint(_vector) < 0) {
	            return false;
	        }
	        plane = this.near;
	        _vector.x = plane.normal.x > 0 ? box.max.x : box.min.x;
	        _vector.y = plane.normal.y > 0 ? box.max.y : box.min.y;
	        _vector.z = plane.normal.z > 0 ? box.max.z : box.min.z;
	        if (plane.distanceToPoint(_vector) < 0) {
	            return false;
	        }
	        plane = this.far;
	        _vector.x = plane.normal.x > 0 ? box.max.x : box.min.x;
	        _vector.y = plane.normal.y > 0 ? box.max.y : box.min.y;
	        _vector.z = plane.normal.z > 0 ? box.max.z : box.min.z;
	        if (plane.distanceToPoint(_vector) < 0) {
	            return false;
	        }
	        return true;
	    }
	    containsPoint(point) {
	        if (this.right.distanceToPoint(point) < 0) {
	            return false;
	        }
	        if (this.left.distanceToPoint(point) < 0) {
	            return false;
	        }
	        if (this.top.distanceToPoint(point) < 0) {
	            return false;
	        }
	        if (this.bottom.distanceToPoint(point) < 0) {
	            return false;
	        }
	        if (this.near.distanceToPoint(point) < 0) {
	            return false;
	        }
	        if (this.far.distanceToPoint(point) < 0) {
	            return false;
	        }
	        return true;
	    }
	    set(right, left, top, bottom, near, far) {
	        this.right.from(right);
	        this.left.from(left);
	        this.top.from(top);
	        this.bottom.from(bottom);
	        this.near.from(near);
	        this.far.from(far);
	        return this;
	    }
	}

	const DIRTY_TAG_SIZE = 1;
	const DIRTY_TAG_CENTER = 2;
	const DIRTY_TAG_AREA = 4;
	const DIRTY_TAG_ALL = 7;
	const vec2 = new Vector2();
	const halpVec = [0.5, 0.5];
	class Rectangle2 {
	    static area = (a) => {
	        return (a.max[0] - a.min[0]) * (a.max[1] - a.min[1]);
	    };
	    static center = (a, out = new Vector2()) => {
	        return Vector2.add(a.min, Vector2.multiplyScalar(Rectangle2.size(a, out), 0.5, out), out);
	    };
	    static containsPoint = (rect, a) => {
	        return a[0] >= rect.min[0] && a[0] <= rect.max[0] && a[1] >= rect.min[1] && a[1] <= rect.max[1];
	    };
	    static containsRectangle = (rect, box) => {
	        return (rect.min[0] <= box.min[0] &&
	            box.max[0] <= rect.max[0] &&
	            rect.min[1] <= box.min[1] &&
	            box.max[1] <= rect.max[1]);
	    };
	    static create = (a = Vector2.VECTOR2_ZERO, b = Vector2.VECTOR2_ONE) => {
	        return new Rectangle2(a, b);
	    };
	    static equals = (a, b) => {
	        return Vector2.equals(a.min, b.min) && Vector2.equals(a.max, b.max);
	    };
	    static getCenter = (a, out = Vector2.create()) => {
	        Vector2.add(a.min, a.max, out);
	        return Vector2.multiplyScalar(out, 0.5, out);
	    };
	    static getSize = (a, out = Vector2.create()) => {
	        return Vector2.minus(a.max, a.min, out);
	    };
	    static height = (a) => {
	        return a.max[1] - a.min[1];
	    };
	    static intersect = (a, b, out = new Rectangle2()) => {
	        Vector2.max(a.min, b.min, out.min);
	        Vector2.min(a.max, b.max, out.max);
	        return out;
	    };
	    static size = (a, out = new Vector2()) => {
	        return Vector2.minus(a.max, a.min, out);
	    };
	    static split = (a, rateBottomLeft = halpVec, bottomLeft = new Rectangle2(), bottomRight = new Rectangle2(), topLeft = new Rectangle2(), topRight = new Rectangle2()) => {
	        Rectangle2.size(a, vec2);
	        Vector2.multiply(vec2, rateBottomLeft, vec2);
	        bottomLeft.min.set(a.min);
	        Vector2.add(a.min, vec2, bottomLeft.max);
	        topRight.min.set(bottomLeft.max);
	        topRight.max.set(a.max);
	        bottomRight.min.x = bottomLeft.max.x;
	        bottomRight.max.x = a.max[0];
	        bottomRight.min.y = a.min[1];
	        bottomRight.max.y = bottomLeft.max[1];
	        topLeft.min.x = a.min[0];
	        topLeft.min.y = bottomLeft.max[1];
	        topLeft.max.x = bottomLeft.max[0];
	        topLeft.max.y = a.max[1];
	        topLeft.dirty = topRight.dirty = bottomRight.dirty = bottomLeft.dirty = DIRTY_TAG_ALL;
	        return [bottomLeft, bottomRight, topLeft, topRight];
	    };
	    static splitHerizontal = (a, rateLeft = 0.5, left = new Rectangle2(), right = new Rectangle2()) => {
	        Rectangle2.size(a, vec2);
	        left.min.set(a.min);
	        vec2.x *= rateLeft;
	        Vector2.add(left.min, vec2, left.max);
	        right.min.x = left.max.x;
	        right.min.y = left.min.y;
	        right.max.set(a.max);
	        left.dirty = right.dirty = DIRTY_TAG_ALL;
	        return [left, right];
	    };
	    static splitVertical = (a, rateBottom = 0.5, bottom = new Rectangle2(), top = new Rectangle2()) => {
	        Rectangle2.size(a, vec2);
	        bottom.min.set(a.min);
	        vec2.y *= rateBottom;
	        Vector2.add(bottom.min, vec2, bottom.max);
	        top.min.x = bottom.min.x;
	        top.min.y = bottom.max.y;
	        top.max.set(a.max);
	        bottom.dirty = top.dirty = DIRTY_TAG_ALL;
	        return [bottom, top];
	    };
	    static stretch = (a, b, c, out = new Rectangle2()) => {
	        Vector2.add(a.min, b, out.min);
	        Vector2.add(a.max, c, out.max);
	        return out;
	    };
	    static translate = (a, b, out = new Rectangle2()) => {
	        Vector2.add(a.min, b, out.min);
	        Vector2.add(a.max, b, out.max);
	        return out;
	    };
	    static union = (a, b, out = new Rectangle2()) => {
	        Vector2.min(a.min, b.min, out.min);
	        Vector2.max(a.max, b.max, out.max);
	        return out;
	    };
	    static width = (a) => {
	        return a.max[0] - a.min[0];
	    };
	    #min = new Vector2();
	    #max = new Vector2();
	    #size = new Vector2();
	    #center = new Vector2();
	    dirty;
	    #area = 0;
	    constructor(a = Vector2.VECTOR2_ZERO, b = Vector2.VECTOR2_ONE) {
	        Vector2.min(a, b, this.#min);
	        Vector2.max(a, b, this.#max);
	        this.dirty = DIRTY_TAG_ALL;
	    }
	    get area() {
	        if (this.dirty & DIRTY_TAG_AREA) {
	            this.#area = Vector2.area(this.size);
	            this.dirty -= DIRTY_TAG_AREA;
	        }
	        return this.#area;
	    }
	    get center() {
	        if (this.dirty & DIRTY_TAG_CENTER) {
	            Vector2.add(this.#min, Vector2.multiplyScalar(this.size, 0.5), this.#center);
	            this.dirty -= DIRTY_TAG_CENTER;
	        }
	        return this.#center;
	    }
	    get size() {
	        if (this.dirty & DIRTY_TAG_SIZE) {
	            Vector2.minus(this.#max, this.#min, this.#size);
	            this.dirty -= DIRTY_TAG_SIZE;
	        }
	        return this.#size;
	    }
	    set max(vec2) {
	        this.#max.set(vec2);
	        this.dirty = DIRTY_TAG_ALL;
	    }
	    get max() {
	        return this.#max;
	    }
	    set min(vec2) {
	        this.#min.set(vec2);
	        this.dirty = DIRTY_TAG_ALL;
	    }
	    get min() {
	        return this.#min;
	    }
	}

	let r = 0;
	class Sphere {
	    static boundingBox = (a, out = new Cube()) => {
	        Vector3.minusScalar(a.position, a.radius, out.min);
	        Vector3.addScalar(a.position, a.radius, out.max);
	        return out;
	    };
	    static containsPoint = (a, b) => {
	        return Vector3.distanceToSquared(a.position, b) <= a.radius * a.radius;
	    };
	    static distanceToPoint = (a, b) => {
	        return Vector3.distanceTo(a.position, b) - a.radius;
	    };
	    static equals = (a, b) => {
	        return Vector3.equals(a.position, b.position) && a.radius === b.radius;
	    };
	    static intersectsSphere = (a, b) => {
	        r = a.radius + b.radius;
	        return Vector3.distanceToSquared(a.position, b.position) <= r * r;
	    };
	    position = new Vector3();
	    radius;
	    constructor(position = Vector3.VECTOR3_ZERO, radius = 1) {
	        this.position.set(position);
	        this.radius = radius;
	    }
	}

	const ab$1 = new Vector2();
	const bc$1 = new Vector2();
	class Triangle2 {
	    static area = (t) => {
	        const c = Triangle2.getABLength(t);
	        const a = Triangle2.getBCLength(t);
	        const b = Triangle2.getCALength(t);
	        const p = (c + a + b) / 2;
	        return Math.sqrt(p * (p - a) * (p - b) * (p - c));
	    };
	    static create = (a = new Vector2(-1, -1), b = new Vector2(1, -1), c = new Vector2(0, 1)) => {
	        return new Triangle2(a, b, c);
	    };
	    static getABLength = (t) => {
	        return Vector2.distanceTo(t.a, t.b);
	    };
	    static getBCLength = (t) => {
	        return Vector2.distanceTo(t.b, t.c);
	    };
	    static getCALength = (t) => {
	        return Vector2.distanceTo(t.c, t.a);
	    };
	    static normal = (t) => {
	        Vector2.minus(t.c, t.b, bc$1);
	        Vector2.minus(t.b, t.a, ab$1);
	        const v = Vector2.cross(ab$1, bc$1);
	        if (v > 0) {
	            return 1;
	        }
	        if (v < 0) {
	            return -1;
	        }
	        return 0;
	    };
	    static toFloat32Array = (t, out = new Float32Array(2)) => {
	        out.set(t.a, 0);
	        out.set(t.b, 2);
	        out.set(t.c, 4);
	        return out;
	    };
	    a;
	    b;
	    c;
	    constructor(a = new Vector2(-1, -1), b = new Vector2(1, -1), c = new Vector2(0, 1)) {
	        this.a = a;
	        this.b = b;
	        this.c = c;
	    }
	}

	const ab = new Vector3();
	const bc = new Vector3();
	const ca = new Vector3();
	class Triangle3 {
	    static area = (t) => {
	        const c = Triangle3.getABLength(t);
	        const a = Triangle3.getBCLength(t);
	        const b = Triangle3.getCALength(t);
	        const p = (c + a + b) / 2;
	        return Math.sqrt(p * (p - a) * (p - b) * (p - c));
	    };
	    static centerOfGravity = (t, out = new Vector3()) => {
	        out[0] = t.a[0] + t.b[0] + t.c[0];
	        out[1] = t.a[1] + t.b[1] + t.c[1];
	        out[2] = t.a[2] + t.b[2] + t.c[2];
	        return Vector3.multiplyScalar(out, 1 / 3, out);
	    };
	    static containsPoint = (t, epsilon = EPSILON, point) => {
	        Vector3.minus(t.b, t.a, ab);
	        Vector3.minus(t.c, t.b, bc);
	        Vector3.minus(t.a, t.c, ca);
	        const v1 = Vector3.minus(t.a, point);
	        const v2 = Vector3.minus(t.b, point);
	        const v3 = Vector3.minus(t.c, point);
	        Vector3.normalize(Vector3.cross(v1, v2, ab), ab);
	        Vector3.normalize(Vector3.cross(v2, v3, bc), bc);
	        Vector3.normalize(Vector3.cross(v3, v1, ca), ca);
	        if (Vector3.closeToRect(ab, bc, epsilon) && Vector3.closeToRect(ab, ca, epsilon)) {
	            return true;
	        }
	        return false;
	    };
	    static cosAngle = (t, point) => {
	        let a, other = [];
	        const a2 = Vector3.lengthSquared(t.a);
	        const b2 = Vector3.lengthSquared(t.b);
	        const c2 = Vector3.lengthSquared(t.c);
	        if (typeof point === 'string') {
	            if (point === "a") {
	                a = a2;
	                other.push(b2, c2);
	            }
	            else if (point === "b") {
	                a = b2;
	                other.push(a2, c2);
	            }
	            else {
	                a = c2;
	                other.push(a2, b2);
	            }
	        }
	        else {
	            if (point === t.a) {
	                a = a2;
	                other.push(b2, c2);
	            }
	            else if (point === t.b) {
	                a = b2;
	                other.push(a2, c2);
	            }
	            else if (point === t.c) {
	                a = c2;
	                other.push(a2, b2);
	            }
	            else {
	                throw new Error("The point is not in triangle.");
	            }
	        }
	        return (other[0] + other[1] - a) * 0.5 / Math.sqrt(other[0] * other[1]);
	    };
	    static create = (a = new Vector3(-1, -1, 0), b = new Vector3(1, -1, 0), c = new Vector3(0, 1, 0)) => {
	        return new Triangle3(a, b, c);
	    };
	    static getABLength = (t) => {
	        return Vector3.distanceTo(t.a, t.b);
	    };
	    static getBCLength = (t) => {
	        return Vector3.distanceTo(t.b, t.c);
	    };
	    static getCALength = (t) => {
	        return Vector3.distanceTo(t.c, t.a);
	    };
	    static normal = (t, out = new Vector3()) => {
	        Vector3.minus(t.c, t.b, bc);
	        Vector3.minus(t.b, t.a, ab);
	        Vector3.cross(ab, bc, out);
	        return Vector3.normalize(out);
	    };
	    static toFloat32Array = (t, out = new Float32Array(9)) => {
	        out.set(t.a, 0);
	        out.set(t.b, 3);
	        out.set(t.c, 6);
	        return out;
	    };
	    a;
	    b;
	    c;
	    constructor(a = new Vector3(-1, -1, 0), b = new Vector3(1, -1, 0), c = new Vector3(0, 1, 0)) {
	        this.a = a;
	        this.b = b;
	        this.c = c;
	    }
	}

	let dis;
	let r2;
	let d2;
	const v = new Vector3();
	class Ray3 {
	    static at = (a, b, out = new Vector3()) => {
	        Vector3.multiplyScalar(a.direction, b, out);
	        return Vector3.add(a.position, out, out);
	    };
	    static distanceToPlane = (ray, plane) => {
	        const denominator = Vector3.dot(plane.normal, ray.direction);
	        if (denominator === 0) {
	            // line is coplanar, return origin
	            if (plane.distanceToPoint(ray.position) === 0) {
	                return 0;
	            }
	            return null;
	        }
	        const t = -(Vector3.dot(ray.position, plane.normal) + plane.distance) / denominator;
	        return t >= 0 ? t : null;
	    };
	    static distanceToPoint = (a, point) => {
	        return Math.sqrt(Ray3.distanceSqToPoint(a, point));
	    };
	    static distanceSqToPoint = (a, point) => {
	        Vector3.minus(point, a.position, v);
	        dis = Vector3.dot(v, a.direction);
	        if (dis < 0) {
	            return Vector3.distanceToSquared(a.position, point);
	        }
	        Vector3.multiplyScalar(a.direction, dis, v);
	        Vector3.add(v, a.position, v);
	        return Vector3.distanceToSquared(v, point);
	    };
	    static fromCameraMatrixAndScreenCoord(projectionMatrix, worldMatrix, screenCoord, out = new Ray3) {
	        Vector3.fromMatrix4Translate(worldMatrix, out.position);
	        Vector3.fromXYZ(screenCoord[0], screenCoord[1], 0.5, out.direction);
	        Matrix4.unproject(out.direction, projectionMatrix, worldMatrix, out.direction);
	        Vector3.minus(out.direction, out.position, out.direction);
	        Vector3.normalize(out.direction, out.direction);
	        return out;
	    }
	    static lookAt = (a, b, out = new Ray3()) => {
	        if (a !== out) {
	            Vector3.fromArray(a.position, 0, out.position);
	        }
	        Vector3.normalize(Vector3.minus(b, a.position, out.direction));
	        return out;
	    };
	    static intersectPlane3Point = (ray, plane, out = new Vector3()) => {
	        const t = Ray3.distanceToPlane(ray, plane);
	        if (t === null) {
	            return null;
	        }
	        return Ray3.at(ray, t, out);
	    };
	    static intersectSpherePoint = (ray, sphere, out = new Vector3()) => {
	        Vector3.minus(sphere.position, ray.position, v);
	        dis = Vector3.dot(v, ray.direction);
	        d2 = Vector3.dot(v, v) - dis * dis;
	        r2 = sphere.radius * sphere.radius;
	        if (d2 > r2)
	            return null;
	        const thc = Math.sqrt(r2 - d2);
	        const t0 = dis - thc;
	        const t1 = dis + thc;
	        if (t0 < 0 && t1 < 0)
	            return null;
	        if (t0 < 0)
	            return Ray3.at(ray, t1, out);
	        return Ray3.at(ray, t0, out);
	    };
	    static intersectsTriangle3Point = (ray, triangle, epsilon = EPSILON, out) => {
	        const plane = new Plane3();
	        plane.fromTriangle3(triangle);
	        const result = Ray3.intersectPlane3Point(ray, plane, out);
	        if (!result) {
	            return null;
	        }
	        const isInTriangle = Triangle3.containsPoint(triangle, epsilon, out);
	        if (!isInTriangle) {
	            return null;
	        }
	        return out;
	    };
	    static intersectsPlane3 = (ray, plane) => {
	        const distToPoint = plane.distanceToPoint(ray.position);
	        if (distToPoint === 0) {
	            return true;
	        }
	        const denominator = Vector3.dot(plane.normal, ray.direction);
	        if (denominator * distToPoint < 0) {
	            return true;
	        }
	        return false;
	    };
	    static intersectsSphere = (ray, sphere) => {
	        return Ray3.distanceSqToPoint(ray, sphere.position) <= sphere.radius * sphere.radius;
	    };
	    static recast = (ray, distance, out = new Ray3()) => {
	        v.set(Ray3.at(ray, distance));
	        out.direction.set(v);
	        return out;
	    };
	    position = new Vector3();
	    direction = new Vector3();
	    constructor(position = Vector3.VECTOR3_ZERO, direction = Vector3.VECTOR3_BACK) {
	        this.position.set(position);
	        Vector3.normalize(direction, this.direction);
	    }
	}

	class Spherical extends Float32Array {
	    static fromArray(arr, out = new Spherical()) {
	        out.set(arr);
	        return out;
	    }
	    static fromVector3(v, out = new Spherical()) {
	        const x = v[0];
	        const y = v[1];
	        const z = v[2];
	        out[0] = Math.sqrt(x * x + y * y + z * z);
	        if (out[0] === 0) {
	            out[1] = 0;
	            out[2] = 0;
	        }
	        else {
	            out[1] = Math.acos(clamp(y / out[0], -1, 1));
	            out[2] = Math.atan2(x, z);
	        }
	        return out;
	    }
	    dataType = ArraybufferDataType.SPHERICAL;
	    constructor(radius = 1, phi = 0, theta = 0) {
	        super(3);
	        this[0] = radius;
	        this[1] = phi;
	        this[2] = theta;
	        return this;
	    }
	    get radius() {
	        return this[0];
	    }
	    set radius(value) {
	        this[0] = value;
	    }
	    get phi() {
	        return this[1];
	    }
	    set phi(value) {
	        this[1] = value;
	    }
	    get theta() {
	        return this[2];
	    }
	    set theta(value) {
	        this[2] = value;
	    }
	    fromArray(arr) {
	        return Spherical.fromArray(arr, this);
	    }
	    toVector3(out = new Vector3()) {
	        const rst = this[0] * Math.sin(this[2]);
	        out[2] = rst * Math.cos(this[1]);
	        out[0] = rst * Math.sin(this[1]);
	        out[1] = this[0] * Math.cos(this[2]);
	        return out;
	    }
	}

	exports.ArraybufferDataType = ArraybufferDataType;
	exports.COLOR_HEX_MAP = COLOR_HEX_MAP;
	exports.ColorCMYK = ColorCMYK;
	exports.ColorGPU = ColorGPU;
	exports.ColorHSL = ColorHSL;
	exports.ColorHSV = ColorHSV;
	exports.ColorRGB = ColorRGB;
	exports.ColorRGBA = ColorRGBA;
	exports.ColorRYB = ColorRYB;
	exports.ColorXYZ = ColorXYZ;
	exports.Constants = constants;
	exports.Cube = Cube;
	exports.Easing = index;
	exports.EulerAngle = EulerAngle;
	exports.Frustum = Frustum;
	exports.Line3 = Line3;
	exports.MATRIX_RGB2XYZ = MATRIX_RGB2XYZ;
	exports.MATRIX_XYZ2RGB = MATRIX_XYZ2RGB;
	exports.Matrix2 = Matrix2;
	exports.Matrix3 = Matrix3;
	exports.Matrix4 = Matrix4;
	exports.Plane3 = Plane3;
	exports.Polar = Polar;
	exports.Ray3 = Ray3;
	exports.Rectangle2 = Rectangle2;
	exports.Sphere = Sphere;
	exports.Spherical = Spherical;
	exports.Triangle2 = Triangle2;
	exports.Triangle3 = Triangle3;
	exports.UNIT_MATRIX3_DATA = UNIT_MATRIX3_DATA;
	exports.Vector2 = Vector2;
	exports.Vector3 = Vector3;
	exports.Vector4 = Vector4;
	exports.arrangement = arrangement;
	exports.catmullRom = catmullRom;
	exports.ceilPowerOfTwo = ceilPowerOfTwo;
	exports.clamp = clamp;
	exports.clampCircle = clampCircle;
	exports.clampSafe = clampSafe;
	exports.closeTo = closeTo;
	exports.combination = combination;
	exports.cubicBezier = cubicBezier;
	exports.factorialNaturalNumber = factorialNaturalNumber;
	exports.floorPowerOfTwo = floorPowerOfTwo;
	exports.floorToZero = floorToZero;
	exports.generateLagrange = generateLagrange;
	exports.getColorGPU = getColorGPU;
	exports.hue2rgb = hue2rgb;
	exports.isPowerOf2 = isPowerOf2;
	exports.lerp = lerp;
	exports.linearToSrgb = linearToSrgb;
	exports.mapRange = mapRange;
	exports.minKth = minKth;
	exports.opposite = opposite;
	exports.quadraticBezier = quadraticBezier;
	exports.rndFloat = rndFloat;
	exports.rndFloatRange = rndFloatRange;
	exports.rndInt = rndInt;
	exports.srgbToLinear = srgbToLinear;
	exports.sum = sum;
	exports.sumArray = sumArray;
	exports.swap = swap;

	return exports;

})({});
