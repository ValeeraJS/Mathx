(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.Mathx = {}));
}(this, (function (exports) { 'use strict';

	const COLOR_HEX_MAP = {
	    aliceblue: 0xF0F8FF,
	    antiquewhite: 0xFAEBD7,
	    aqua: 0x00FFFF,
	    aquamarine: 0x7FFFD4,
	    azure: 0xF0FFFF,
	    beige: 0xF5F5DC,
	    bisque: 0xFFE4C4,
	    black: 0x000000,
	    blanchedalmond: 0xFFEBCD,
	    blue: 0x0000FF,
	    blueviolet: 0x8A2BE2,
	    brown: 0xA52A2A,
	    burlywood: 0xDEB887,
	    cadetblue: 0x5F9EA0,
	    chartreuse: 0x7FFF00,
	    chocolate: 0xD2691E,
	    coral: 0xFF7F50,
	    cornflowerblue: 0x6495ED,
	    cornsilk: 0xFFF8DC,
	    crimson: 0xDC143C,
	    cyan: 0x00FFFF,
	    darkblue: 0x00008B,
	    darkcyan: 0x008B8B,
	    darkgoldenrod: 0xB8860B,
	    darkgray: 0xA9A9A9,
	    darkgreen: 0x006400,
	    darkgrey: 0xA9A9A9,
	    darkkhaki: 0xBDB76B,
	    darkmagenta: 0x8B008B,
	    darkolivegreen: 0x556B2F,
	    darkorange: 0xFF8C00,
	    darkorchid: 0x9932CC,
	    darkred: 0x8B0000,
	    darksalmon: 0xE9967A,
	    darkseagreen: 0x8FBC8F,
	    darkslateblue: 0x483D8B,
	    darkslategray: 0x2F4F4F,
	    darkslategrey: 0x2F4F4F,
	    darkturquoise: 0x00CED1,
	    darkviolet: 0x9400D3,
	    deeppink: 0xFF1493,
	    deepskyblue: 0x00BFFF,
	    dimgray: 0x696969,
	    dimgrey: 0x696969,
	    dodgerblue: 0x1E90FF,
	    firebrick: 0xB22222,
	    floralwhite: 0xFFFAF0,
	    forestgreen: 0x228B22,
	    fuchsia: 0xFF00FF,
	    gainsboro: 0xDCDCDC,
	    ghostwhite: 0xF8F8FF,
	    gold: 0xFFD700,
	    goldenrod: 0xDAA520,
	    gray: 0x808080,
	    green: 0x008000,
	    greenyellow: 0xADFF2F,
	    grey: 0x808080,
	    honeydew: 0xF0FFF0,
	    hotpink: 0xFF69B4,
	    indianred: 0xCD5C5C,
	    indigo: 0x4B0082,
	    ivory: 0xFFFFF0,
	    khaki: 0xF0E68C,
	    lavender: 0xE6E6FA,
	    lavenderblush: 0xFFF0F5,
	    lawngreen: 0x7CFC00,
	    lemonchiffon: 0xFFFACD,
	    lightblue: 0xADD8E6,
	    lightcoral: 0xF08080,
	    lightcyan: 0xE0FFFF,
	    lightgoldenrodyellow: 0xFAFAD2,
	    lightgray: 0xD3D3D3,
	    lightgreen: 0x90EE90,
	    lightgrey: 0xD3D3D3,
	    lightpink: 0xFFB6C1,
	    lightsalmon: 0xFFA07A,
	    lightseagreen: 0x20B2AA,
	    lightskyblue: 0x87CEFA,
	    lightslategray: 0x778899,
	    lightslategrey: 0x778899,
	    lightsteelblue: 0xB0C4DE,
	    lightyellow: 0xFFFFE0,
	    lime: 0x00FF00,
	    limegreen: 0x32CD32,
	    linen: 0xFAF0E6,
	    magenta: 0xFF00FF,
	    maroon: 0x800000,
	    mediumaquamarine: 0x66CDAA,
	    mediumblue: 0x0000CD,
	    mediumorchid: 0xBA55D3,
	    mediumpurple: 0x9370DB,
	    mediumseagreen: 0x3CB371,
	    mediumslateblue: 0x7B68EE,
	    mediumspringgreen: 0x00FA9A,
	    mediumturquoise: 0x48D1CC,
	    mediumvioletred: 0xC71585,
	    midnightblue: 0x191970,
	    mintcream: 0xF5FFFA,
	    mistyrose: 0xFFE4E1,
	    moccasin: 0xFFE4B5,
	    navajowhite: 0xFFDEAD,
	    navy: 0x000080,
	    oldlace: 0xFDF5E6,
	    olive: 0x808000,
	    olivedrab: 0x6B8E23,
	    orange: 0xFFA500,
	    orangered: 0xFF4500,
	    orchid: 0xDA70D6,
	    palegoldenrod: 0xEEE8AA,
	    palegreen: 0x98FB98,
	    paleturquoise: 0xAFEEEE,
	    palevioletred: 0xDB7093,
	    papayawhip: 0xFFEFD5,
	    peachpuff: 0xFFDAB9,
	    peru: 0xCD853F,
	    pink: 0xFFC0CB,
	    plum: 0xDDA0DD,
	    powderblue: 0xB0E0E6,
	    purple: 0x800080,
	    rebeccapurple: 0x663399,
	    red: 0xFF0000,
	    rosybrown: 0xBC8F8F,
	    royalblue: 0x4169E1,
	    saddlebrown: 0x8B4513,
	    salmon: 0xFA8072,
	    sandybrown: 0xF4A460,
	    seagreen: 0x2E8B57,
	    seashell: 0xFFF5EE,
	    sienna: 0xA0522D,
	    silver: 0xC0C0C0,
	    skyblue: 0x87CEEB,
	    slateblue: 0x6A5ACD,
	    slategray: 0x708090,
	    slategrey: 0x708090,
	    snow: 0xFFFAFA,
	    springgreen: 0x00FF7F,
	    steelblue: 0x4682B4,
	    tan: 0xD2B48C,
	    teal: 0x008080,
	    thistle: 0xD8BFD8,
	    tomato: 0xFF6347,
	    turquoise: 0x40E0D0,
	    violet: 0xEE82EE,
	    wheat: 0xF5DEB3,
	    white: 0xFFFFFF,
	    whitesmoke: 0xF5F5F5,
	    yellow: 0xFFFF00,
	    yellowgreen: 0x9ACD32
	};

	class ColorRGBA extends Uint8Array {
	    constructor(r = 0, g = 0, b = 0, a = 255) {
	        super(4);
	        this.length = 4;
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

	class ColorRGB extends Uint8Array {
	    constructor(r = 0, g = 0, b = 0) {
	        super(3);
	        this.length = 3;
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

	var ceilPowerOfTwo = (value) => {
	    return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
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
	var clampCommon = (val, min, max) => {
	    return Math.max(min, Math.min(max, val));
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
	var floorToZeroCommon = (num) => {
	    return num < 0 ? Math.ceil(num) : Math.floor(num);
	};

	let circle, v;
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
	var clampCircle = (val, min, max) => {
	    circle = max - min;
	    v = floorToZeroCommon(min / circle) * circle + (val % circle);
	    if (v < min) {
	        return v + circle;
	    }
	    else if (v > max) {
	        return v - circle;
	    }
	    return v;
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
	var clampSafeCommon = (val, a, b) => {
	    if (a > b) {
	        return Math.max(b, Math.min(a, val));
	    }
	    else if (b > a) {
	        return Math.max(a, Math.min(b, val));
	    }
	    return a;
	};

	const EPSILON = Math.pow(2, -52);

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
	var closeToCommon = (val, target, epsilon = EPSILON) => {
	    return Math.abs(val - target) <= epsilon;
	};

	var floorPowerOfTwo = (value) => {
	    return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
	};

	var isPowerOfTwo = (value) => {
	    return (value & (value - 1)) === 0 && value !== 0;
	};

	var randFloat = (min = 0, max = 1) => {
	    return min + Math.random() * (max - min);
	};

	var randInt = (min = 0, max = 1) => {
	    return min + Math.floor(Math.random() * (max - min + 1));
	};

	let len = 0, sum = 0;
	/**
	 * @function sumArray
	 * @desc 求数组的和
	 * @see sum
	 * @param {number[]} arr
	 * @returns {number} 和
	 * @example Mathx.sumArray([1, 2, 3]); // 6;
	 */
	var sumArray = (arr) => {
	    sum = 0;
	    len = arr.length;
	    for (let i = 0; i < len; i++) {
	        sum += arr[i];
	    }
	    return sum;
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
	var sum$1 = (...arr) => {
	    return sumArray(arr);
	};

	const UNIT_MATRIX2_DATA = [
	    1, 0,
	    0, 1,
	];
	class Matrix2 extends Float32Array {
	    constructor(data = UNIT_MATRIX2_DATA) {
	        super(data);
	        this.isMatrix2 = true;
	        this.length = 4;
	    }
	}
	Matrix2.UNIT_MATRIX = new Matrix2();

	const UNIT_MATRIX3_DATA = [
	    1, 0, 0,
	    0, 1, 0,
	    0, 0, 1
	];
	class Matrix3 extends Float32Array {
	    constructor(data = UNIT_MATRIX3_DATA) {
	        super(data);
	        this.isMatrix3 = true;
	        this.length = 9;
	    }
	}
	Matrix3.UNIT_MATRIX = new Matrix3();

	class Vector3 extends Float32Array {
	    constructor(x = 0, y = 0, z = 0) {
	        super(3);
	        this.isVector3 = true;
	        this.length = 3;
	        this[0] = x;
	        this[1] = y;
	        this[2] = z;
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
	const VECTOR3_ZERO = new Vector3(0, 0, 0);
	const VECTOR3_Top = new Vector3(0, 1, 0);
	const VECTOR3_Bottom = new Vector3(0, -1, 0);
	const VECTOR3_Left = new Vector3(-1, 0, 0);
	const VECTOR3_RIGHT = new Vector3(1, 0, 0);
	const VECTOR3_FRONT = new Vector3(0, 0, -1);
	const VECTOR3_BACK = new Vector3(0, 0, 1);

	let tmpVec3 = new Vector3();
	class Quaternion extends Float32Array {
	    constructor(x = 0, y = 0, z = 0, w = 1) {
	        super(4);
	        this.isQuaternion = true;
	        this.length = 4;
	        this[0] = x;
	        this[1] = y;
	        this[2] = z;
	        this[3] = w;
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
	    get w() {
	        return this[3];
	    }
	    set w(val) {
	        this[3] = val;
	    }
	}

	var rndFloat = (low, high) => {
	    return low + Math.random() * (high - low);
	};

	var rndFloatRange = (range) => {
	    return range * (0.5 - Math.random());
	};

	var rndInt = (low, high) => {
	    return low + Math.floor(Math.random() * (high - low + 1));
	};

	class Vector2 extends Float32Array {
	    constructor(x = 0, y = 0) {
	        super(2);
	        this.isVector2 = true;
	        this.length = 2;
	        this[0] = x;
	        this[1] = y;
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
	}
	const VECTOR2_ZERO = new Vector2(0, 0);
	const VECTOR2_TOP = new Vector2(0, 1);
	const VECTOR2_BOTTOM = new Vector2(0, -1);
	const VECTOR2_LEFT = new Vector2(-1, 0);
	const VECTOR2_RIGHT = new Vector2(1, 0);

	exports.COLOR_HEX_MAP = COLOR_HEX_MAP;
	exports.ColorRGB = ColorRGB;
	exports.ColorRGBA = ColorRGBA;
	exports.Matrix2 = Matrix2;
	exports.Matrix3 = Matrix3;
	exports.Quaternion = Quaternion;
	exports.Vector2 = Vector2;
	exports.Vector3 = Vector3;
	exports.ceilPowerOfTwo = ceilPowerOfTwo;
	exports.clamp = clampCommon;
	exports.clampCircle = clampCircle;
	exports.clampSafe = clampSafeCommon;
	exports.closeTo = closeToCommon;
	exports.floorPowerOfTwo = floorPowerOfTwo;
	exports.floorToZero = floorToZeroCommon;
	exports.isPowerOfTwo = isPowerOfTwo;
	exports.randFloat = randFloat;
	exports.randInt = randInt;
	exports.rndFloat = rndFloat;
	exports.rndFloatRange = rndFloatRange;
	exports.rndInt = rndInt;
	exports.sum = sum$1;
	exports.sumArray = sumArray;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=Mathx.js.map
