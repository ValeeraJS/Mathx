(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Mathx = {}));
}(this, (function (exports) { 'use strict';

	var COLOR_HEX_MAP = {
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

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
	/* global Reflect, Promise */

	var extendStatics = function(d, b) {
	    extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	    return extendStatics(d, b);
	};

	function __extends(d, b) {
	    if (typeof b !== "function" && b !== null)
	        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	    extendStatics(d, b);
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	var ColorRGBA = /** @class */ (function (_super) {
	    __extends(ColorRGBA, _super);
	    function ColorRGBA(r, g, b, a) {
	        if (r === void 0) { r = 0; }
	        if (g === void 0) { g = 0; }
	        if (b === void 0) { b = 0; }
	        if (a === void 0) { a = 255; }
	        var _this = _super.call(this, 4) || this;
	        _this[0] = r;
	        _this[1] = g;
	        _this[2] = b;
	        _this[3] = a;
	        return _this;
	    }
	    Object.defineProperty(ColorRGBA.prototype, "r", {
	        get: function () {
	            return this[0];
	        },
	        set: function (val) {
	            this[0] = val;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(ColorRGBA.prototype, "g", {
	        get: function () {
	            return this[1];
	        },
	        set: function (val) {
	            this[1] = val;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(ColorRGBA.prototype, "b", {
	        get: function () {
	            return this[2];
	        },
	        set: function (val) {
	            this[2] = val;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(ColorRGBA.prototype, "a", {
	        get: function () {
	            return this[3];
	        },
	        set: function (val) {
	            this[3] = val;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return ColorRGBA;
	}(Uint8Array));

	var ColorRGB = /** @class */ (function (_super) {
	    __extends(ColorRGB, _super);
	    function ColorRGB(r, g, b) {
	        if (r === void 0) { r = 0; }
	        if (g === void 0) { g = 0; }
	        if (b === void 0) { b = 0; }
	        var _this = _super.call(this, 3) || this;
	        _this[0] = r;
	        _this[1] = g;
	        _this[2] = b;
	        return _this;
	    }
	    Object.defineProperty(ColorRGB.prototype, "r", {
	        get: function () {
	            return this[0];
	        },
	        set: function (val) {
	            this[0] = val;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(ColorRGB.prototype, "g", {
	        get: function () {
	            return this[1];
	        },
	        set: function (val) {
	            this[1] = val;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(ColorRGB.prototype, "b", {
	        get: function () {
	            return this[2];
	        },
	        set: function (val) {
	            this[2] = val;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return ColorRGB;
	}(Uint8Array));

	var create$a = function (r, g, b, a, out) {
	    if (r === void 0) { r = 0; }
	    if (g === void 0) { g = 0; }
	    if (b === void 0) { b = 0; }
	    if (a === void 0) { a = 1; }
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = r;
	    out[1] = g;
	    out[2] = b;
	    out[3] = a;
	    return out;
	};
	var createJson = function (r, g, b, a) {
	    if (r === void 0) { r = 0; }
	    if (g === void 0) { g = 0; }
	    if (b === void 0) { b = 0; }
	    if (a === void 0) { a = 1; }
	    return {
	        r: r,
	        g: g,
	        b: b,
	        a: a
	    };
	};
	var fromScalar$2 = function (scalar, a, out) {
	    if (a === void 0) { a = 1; }
	    out[0] = scalar;
	    out[1] = scalar;
	    out[2] = scalar;
	    out[3] = a;
	    return out;
	};

	var ColorGPU = /*#__PURE__*/Object.freeze({
		__proto__: null,
		create: create$a,
		createJson: createJson,
		fromScalar: fromScalar$2
	});

	var ceilPowerOfTwo = (function (value) {
	    return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
	});

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
	var clampCommon = (function (val, min, max) {
	    return Math.max(min, Math.min(max, val));
	});

	/**
	 * @function floorToZero
	 * @desc 以0为中心取整
	 * @param {number} num 数值
	 * @return {number} 取整之后的结果
	 * @example Mathx.roundToZero(0.8 ); // 0;
	 * Mathx.roundToZero(-0.8); // 0;
	 * Mathx.roundToZero(-1.1); // -1;
	 */
	var floorToZeroCommon = (function (num) {
	    return num < 0 ? Math.ceil(num) : Math.floor(num);
	});

	var circle, v;
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
	var clampCircle = (function (val, min, max) {
	    circle = max - min;
	    v = floorToZeroCommon(min / circle) * circle + (val % circle);
	    if (v < min) {
	        return v + circle;
	    }
	    else if (v > max) {
	        return v - circle;
	    }
	    return v;
	});

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
	var clampSafeCommon = (function (val, a, b) {
	    if (a > b) {
	        return Math.max(b, Math.min(a, val));
	    }
	    else if (b > a) {
	        return Math.max(a, Math.min(b, val));
	    }
	    return a;
	});

	var DEG_360_RAD = Math.PI * 2;
	var EPSILON = Math.pow(2, -52);

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
	var closeToCommon = (function (val, target, epsilon) {
	    if (epsilon === void 0) { epsilon = EPSILON; }
	    return Math.abs(val - target) <= epsilon;
	});

	var floorPowerOfTwo = (function (value) {
	    return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
	});

	var isPowerOfTwo = (function (value) {
	    return (value & (value - 1)) === 0 && value !== 0;
	});

	var randFloat = (function (min, max) {
	    if (min === void 0) { min = 0; }
	    if (max === void 0) { max = 1; }
	    return min + Math.random() * (max - min);
	});

	var randInt = (function (min, max) {
	    if (min === void 0) { min = 0; }
	    if (max === void 0) { max = 1; }
	    return min + Math.floor(Math.random() * (max - min + 1));
	});

	var len$2 = 0, sum$1 = 0;
	/**
	 * @function sumArray
	 * @desc 求数组的和
	 * @see sum
	 * @param {number[]} arr
	 * @returns {number} 和
	 * @example Mathx.sumArray([1, 2, 3]); // 6;
	 */
	var sumArray = (function (arr) {
	    sum$1 = 0;
	    len$2 = arr.length;
	    for (var i = 0; i < len$2; i++) {
	        sum$1 += arr[i];
	    }
	    return sum$1;
	});

	/**
	 * @function sum
	 * @desc 求参数之和
	 * @see sumArray
	 * @param {number[]} arr
	 * @returns {number} 和
	 * @example Mathx.sumArray(1, 2, 3); // 6;
	 * Mathx.sumArray(1, 2, 3, 4, 5); // 15;
	 */
	var sum = (function () {
	    var arr = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        arr[_i] = arguments[_i];
	    }
	    return sumArray(arr);
	});

	var EulerRotationOrders;
	(function (EulerRotationOrders) {
	    EulerRotationOrders["XYZ"] = "xyz";
	    EulerRotationOrders["ZXY"] = "zxy";
	    EulerRotationOrders["YZX"] = "yzx";
	    EulerRotationOrders["XZY"] = "xzy";
	    EulerRotationOrders["ZYX"] = "zyx";
	    EulerRotationOrders["YXZ"] = "yxz";
	})(EulerRotationOrders || (EulerRotationOrders = {}));

	var createDefault = function () {
	    return {
	        order: EulerRotationOrders.XYZ,
	        x: 0,
	        y: 0,
	        z: 0
	    };
	};
	var create$9 = function (x, y, z, order, out) {
	    if (x === void 0) { x = 0; }
	    if (y === void 0) { y = 0; }
	    if (z === void 0) { z = 0; }
	    if (order === void 0) { order = EulerRotationOrders.XYZ; }
	    if (out === void 0) { out = createDefault(); }
	    out.x = x;
	    out.y = y;
	    out.z = z;
	    out.order = order;
	    return out;
	};
	var from$6 = function (euler, out) {
	    if (out === void 0) { out = createDefault(); }
	    out.x = euler.x;
	    out.y = euler.y;
	    out.z = euler.z;
	    out.order = euler.order;
	    return out;
	};
	var fromMatrix4$1 = function (matrix, out) {
	    if (out === void 0) { out = createDefault(); }
	    var m11 = matrix[0], m12 = matrix[4], m13 = matrix[8];
	    var m21 = matrix[1], m22 = matrix[5], m23 = matrix[9];
	    var m31 = matrix[2], m32 = matrix[6], m33 = matrix[10];
	    switch (out.order) {
	        case EulerRotationOrders.XYZ:
	            out.y = Math.asin(clampCommon(m13, -1, 1));
	            if (Math.abs(m13) < 0.9999999) {
	                out.x = Math.atan2(-m23, m33);
	                out.z = Math.atan2(-m12, m11);
	            }
	            else {
	                out.x = Math.atan2(m32, m22);
	                out.z = 0;
	            }
	            break;
	        case EulerRotationOrders.YXZ:
	            out.x = Math.asin(-clampCommon(m23, -1, 1));
	            if (Math.abs(m23) < 0.9999999) {
	                out.y = Math.atan2(m13, m33);
	                out.z = Math.atan2(m21, m22);
	            }
	            else {
	                out.y = Math.atan2(-m31, m11);
	                out.z = 0;
	            }
	            break;
	        case EulerRotationOrders.ZXY:
	            out.x = Math.asin(clampCommon(m32, -1, 1));
	            if (Math.abs(m32) < 0.9999999) {
	                out.y = Math.atan2(-m31, m33);
	                out.z = Math.atan2(-m12, m22);
	            }
	            else {
	                out.y = 0;
	                out.z = Math.atan2(m21, m11);
	            }
	            break;
	        case EulerRotationOrders.ZYX:
	            out.y = Math.asin(-clampCommon(m31, -1, 1));
	            if (Math.abs(m31) < 0.9999999) {
	                out.x = Math.atan2(m32, m33);
	                out.z = Math.atan2(m21, m11);
	            }
	            else {
	                out.x = 0;
	                out.z = Math.atan2(-m12, m22);
	            }
	            break;
	        case EulerRotationOrders.YZX:
	            out.z = Math.asin(clampCommon(m21, -1, 1));
	            if (Math.abs(m21) < 0.9999999) {
	                out.x = Math.atan2(-m23, m22);
	                out.y = Math.atan2(-m31, m11);
	            }
	            else {
	                out.x = 0;
	                out.y = Math.atan2(m13, m33);
	            }
	            break;
	        case EulerRotationOrders.XZY:
	            out.z = Math.asin(-clampCommon(m12, -1, 1));
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
	};

	var Euler = /*#__PURE__*/Object.freeze({
		__proto__: null,
		create: create$9,
		from: from$6,
		fromMatrix4: fromMatrix4$1
	});

	var a00$2 = 0, a01$2 = 0, a10$2 = 0, a11$2 = 0;
	var b00$2 = 0, b01$2 = 0, b10$2 = 0, b11$2 = 0, det$1 = 0;
	var x$3 = 0, y$3 = 0;
	var UNIT_MATRIX2_DATA = [1, 0, 0, 1];
	var UNIT_MATRIX2 = new Float32Array(UNIT_MATRIX2_DATA);
	var add$3 = function (a, b, out) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    out[3] = a[3] + b[3];
	    return out;
	};
	var adjoint = function (a, out) {
	    a00$2 = a[0];
	    out[0] = a[3];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    out[3] = a00$2;
	    return out;
	};
	var closeTo$3 = function (a, b) {
	    a00$2 = a[0];
	    a10$2 = a[1];
	    a01$2 = a[2];
	    a11$2 = a[3];
	    b00$2 = b[0];
	    b10$2 = b[1];
	    b01$2 = b[2];
	    b11$2 = b[3];
	    return (closeToCommon(a00$2, b00$2) &&
	        closeToCommon(a01$2, b01$2) &&
	        closeToCommon(a10$2, b10$2) &&
	        closeToCommon(a11$2, b11$2));
	};
	var create$8 = function (a) {
	    if (a === void 0) { a = UNIT_MATRIX2_DATA; }
	    return new Float32Array(a);
	};
	var determinant$2 = function (a) {
	    return a[0] * a[3] - a[1] * a[2];
	};
	var equals$4 = function (a, b) {
	    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
	};
	var frobNorm = function (a) {
	    return Math.hypot(a[0], a[1], a[2], a[3]);
	};
	var from$5 = function (a, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};
	var fromRotation$2 = function (rad, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    y$3 = Math.sin(rad);
	    x$3 = Math.cos(rad);
	    out[0] = x$3;
	    out[1] = y$3;
	    out[2] = -y$3;
	    out[3] = x$3;
	    return out;
	};
	var fromScaling$2 = function (v, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = v[1];
	    return out;
	};
	var identity$3 = function (out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};
	function invert$3(a, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    a00$2 = a[0];
	    a10$2 = a[1];
	    a01$2 = a[2];
	    a11$2 = a[3];
	    det$1 = determinant$2(a);
	    if (!det$1) {
	        return null;
	    }
	    det$1 = 1.0 / det$1;
	    out[0] = a11$2 * det$1;
	    out[1] = -a10$2 * det$1;
	    out[2] = -a01$2 * det$1;
	    out[3] = a00$2 * det$1;
	    return out;
	}
	function minus$3(a, b, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    out[3] = a[3] - b[3];
	    return out;
	}
	var multiply$6 = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(4); }
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
	var multiplyScalar$3 = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    out[3] = a[3] * b;
	    return out;
	};
	var rotate$3 = function (a, rad, out) {
	    if (out === void 0) { out = new Float32Array(4); }
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
	var scale$2 = function (a, v, out) {
	    if (out === void 0) { out = new Float32Array(4); }
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
	var toString$4 = function (a) {
	    return "mat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
	};
	var transpose$2 = function (a, out) {
	    if (out === void 0) { out = new Float32Array(4); }
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

	var Matrix2 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		UNIT_MATRIX2: UNIT_MATRIX2,
		add: add$3,
		adjoint: adjoint,
		closeTo: closeTo$3,
		create: create$8,
		determinant: determinant$2,
		equals: equals$4,
		frobNorm: frobNorm,
		from: from$5,
		fromRotation: fromRotation$2,
		fromScaling: fromScaling$2,
		identity: identity$3,
		invert: invert$3,
		minus: minus$3,
		multiply: multiply$6,
		multiplyScalar: multiplyScalar$3,
		rotate: rotate$3,
		scale: scale$2,
		toString: toString$4,
		transpose: transpose$2
	});

	var a00$1 = 0, a01$1 = 0, a02$1 = 0, a11$1 = 0, a10$1 = 0, a12$1 = 0, a20$1 = 0, a21$1 = 0, a22$1 = 0;
	var b00$1 = 0, b01$1 = 0, b02$1 = 0, b11$1 = 0, b10$1 = 0, b12$1 = 0, b20$1 = 0, b21$1 = 0, b22$1 = 0;
	var x$2 = 0, y$2 = 0;
	var UNIT_MATRIX3_DATA = [1, 0, 0, 0, 1, 0, 0, 0, 1];
	var UNIT_MATRIX3 = new Float32Array(UNIT_MATRIX3_DATA);
	var cofactor00 = function (a) {
	    return a[4] * a[8] - a[5] * a[7];
	};
	var cofactor01 = function (a) {
	    return a[1] * a[8] - a[7] * a[2];
	};
	var cofactor02 = function (a) {
	    return a[1] * a[5] - a[4] * a[2];
	};
	var cofactor10 = function (a) {
	    return a[3] * a[8] - a[6] * a[5];
	};
	var cofactor11 = function (a) {
	    return a[0] * a[8] - a[6] * a[2];
	};
	var cofactor12 = function (a) {
	    return a[0] * a[5] - a[3] * a[2];
	};
	var cofactor20 = function (a) {
	    return a[3] * a[7] - a[6] * a[4];
	};
	var cofactor21 = function (a) {
	    return a[0] * a[7] - a[6] * a[1];
	};
	var cofactor22 = function (a) {
	    return a[0] * a[4] - a[3] * a[1];
	};
	var create$7 = function () {
	    return new Float32Array(UNIT_MATRIX3_DATA);
	};
	var determinant$1 = function (a) {
	    a00$1 = a[0];
	    a01$1 = a[1];
	    a02$1 = a[2];
	    a10$1 = a[3];
	    a11$1 = a[4];
	    a12$1 = a[5];
	    a20$1 = a[6];
	    a21$1 = a[7];
	    a22$1 = a[8];
	    return (a00$1 * (a22$1 * a11$1 - a12$1 * a21$1) +
	        a01$1 * (-a22$1 * a10$1 + a12$1 * a20$1) +
	        a02$1 * (a21$1 * a10$1 - a11$1 * a20$1));
	};
	var from$4 = function (arr, out) {
	    if (out === void 0) { out = new Float32Array(9); }
	    out[0] = arr[0];
	    out[1] = arr[1];
	    out[2] = arr[2];
	    out[3] = arr[3];
	    out[4] = arr[4];
	    out[5] = arr[5];
	    out[6] = arr[6];
	    out[7] = arr[7];
	    out[8] = arr[8];
	    return out;
	};
	var fromMatrix4 = function (mat4, out) {
	    if (out === void 0) { out = new Float32Array(9); }
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
	var fromRotation$1 = function (rad, out) {
	    if (out === void 0) { out = new Float32Array(9); }
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
	var fromScaling$1 = function (v, out) {
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
	function fromTranslation$1(v, out) {
	    if (out === void 0) { out = new Float32Array(9); }
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
	}
	var identity$2 = function (out) {
	    if (out === void 0) { out = new Float32Array(9); }
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
	var invert$2 = function (a, out) {
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
	    var det = a00$1 * b01$1 + a01$1 * b11$1 + a02$1 * b21$1;
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
	var multiply$5 = function () { return function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(9); }
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
	}; };
	var rotate$2 = function (a, rad, out) {
	    if (out === void 0) { out = new Float32Array(9); }
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
	var scale$1 = function (a, v, out) {
	    if (out === void 0) { out = new Float32Array(9); }
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
	var translate$2 = function (a, v, out) {
	    if (out === void 0) { out = new Float32Array(9); }
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
	var transpose$1 = function (a, out) {
	    if (out === void 0) { out = new Float32Array(9); }
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

	var Matrix3 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		UNIT_MATRIX3: UNIT_MATRIX3,
		cofactor00: cofactor00,
		cofactor01: cofactor01,
		cofactor02: cofactor02,
		cofactor10: cofactor10,
		cofactor11: cofactor11,
		cofactor12: cofactor12,
		cofactor20: cofactor20,
		cofactor21: cofactor21,
		cofactor22: cofactor22,
		create: create$7,
		determinant: determinant$1,
		from: from$4,
		fromMatrix4: fromMatrix4,
		fromRotation: fromRotation$1,
		fromScaling: fromScaling$1,
		fromTranslation: fromTranslation$1,
		identity: identity$2,
		invert: invert$2,
		multiply: multiply$5,
		rotate: rotate$2,
		scale: scale$1,
		translate: translate$2,
		transpose: transpose$1
	});

	/* eslint-disable max-lines */
	var a00 = 0, a01 = 0, a02 = 0, a03 = 0, a11 = 0, a10 = 0, a12 = 0, a13 = 0, a20 = 0, a21 = 0, a22 = 0, a23 = 0, a31 = 0, a30 = 0, a32 = 0, a33 = 0;
	var b00 = 0, b01 = 0, b02 = 0, b03 = 0, b11 = 0, b10 = 0, b12 = 0, b13 = 0, b20 = 0, b21 = 0, b22 = 0, b23 = 0, b31 = 0, b30 = 0, b32 = 0, b33 = 0;
	var x$1 = 0, y$1 = 0, z = 0, det = 0, len$1 = 0, s$3 = 0, t = 0, a = 0, b = 0, c$2 = 0, d = 0, e = 0, f = 0;
	var UNIT_MATRIX4_DATA = Object.freeze([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
	var UNIT_MATRIX4 = new Float32Array(UNIT_MATRIX4_DATA);
	var create$6 = function () {
	    return new Float32Array(UNIT_MATRIX4_DATA);
	};
	var determinant = function (a) {
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
	var from$3 = function (a, out) {
	    if (out === void 0) { out = new Float32Array(16); }
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    out[9] = a[9];
	    out[10] = a[10];
	    out[11] = a[11];
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};
	var fromEuler = function (euler, out) {
	    if (out === void 0) { out = new Float32Array(16); }
	    x$1 = euler.x;
	    y$1 = euler.y;
	    z = euler.z;
	    a = Math.cos(x$1);
	    b = Math.sin(x$1);
	    c$2 = Math.cos(y$1);
	    d = Math.sin(y$1);
	    e = Math.cos(z);
	    f = Math.sin(z);
	    if (euler.order === EulerRotationOrders.XYZ) {
	        var ae = a * e, af = a * f, be = b * e, bf = b * f;
	        out[0] = c$2 * e;
	        out[4] = -c$2 * f;
	        out[8] = d;
	        out[1] = af + be * d;
	        out[5] = ae - bf * d;
	        out[9] = -b * c$2;
	        out[2] = bf - ae * d;
	        out[6] = be + af * d;
	        out[10] = a * c$2;
	    }
	    else if (euler.order === EulerRotationOrders.YXZ) {
	        var ce = c$2 * e, cf = c$2 * f, de = d * e, df = d * f;
	        out[0] = ce + df * b;
	        out[4] = de * b - cf;
	        out[8] = a * d;
	        out[1] = a * f;
	        out[5] = a * e;
	        out[9] = -b;
	        out[2] = cf * b - de;
	        out[6] = df + ce * b;
	        out[10] = a * c$2;
	    }
	    else if (euler.order === EulerRotationOrders.ZXY) {
	        var ce = c$2 * e, cf = c$2 * f, de = d * e, df = d * f;
	        out[0] = ce - df * b;
	        out[4] = -a * f;
	        out[8] = de + cf * b;
	        out[1] = cf + de * b;
	        out[5] = a * e;
	        out[9] = df - ce * b;
	        out[2] = -a * d;
	        out[6] = b;
	        out[10] = a * c$2;
	    }
	    else if (euler.order === EulerRotationOrders.ZYX) {
	        var ae = a * e, af = a * f, be = b * e, bf = b * f;
	        out[0] = c$2 * e;
	        out[4] = be * d - af;
	        out[8] = ae * d + bf;
	        out[1] = c$2 * f;
	        out[5] = bf * d + ae;
	        out[9] = af * d - be;
	        out[2] = -d;
	        out[6] = b * c$2;
	        out[10] = a * c$2;
	    }
	    else if (euler.order === EulerRotationOrders.YZX) {
	        var ac = a * c$2, ad = a * d, bc = b * c$2, bd = b * d;
	        out[0] = c$2 * e;
	        out[4] = bd - ac * f;
	        out[8] = bc * f + ad;
	        out[1] = f;
	        out[5] = a * e;
	        out[9] = -b * e;
	        out[2] = -d * e;
	        out[6] = ad * f + bc;
	        out[10] = ac - bd * f;
	    }
	    else if (euler.order === EulerRotationOrders.XZY) {
	        var ac = a * c$2, ad = a * d, bc = b * c$2, bd = b * d;
	        out[0] = c$2 * e;
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
	var fromQuaternion = function (q, out) {
	    var x = q[0], y = q[1], z = q[2], w = q[3];
	    var x2 = x + x;
	    var y2 = y + y;
	    var z2 = z + z;
	    var xx = x * x2;
	    var yx = y * x2;
	    var yy = y * y2;
	    var zx = z * x2;
	    var zy = z * y2;
	    var zz = z * z2;
	    var wx = w * x2;
	    var wy = w * y2;
	    var wz = w * z2;
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
	var fromRotation = function (rad, axis, out) {
	    x$1 = axis[0];
	    y$1 = axis[1];
	    z = axis[2];
	    len$1 = Math.hypot(x$1, y$1, z);
	    if (len$1 < EPSILON) {
	        return null;
	    }
	    len$1 = 1 / len$1;
	    x$1 *= len$1;
	    y$1 *= len$1;
	    z *= len$1;
	    s$3 = Math.sin(rad);
	    c$2 = Math.cos(rad);
	    t = 1 - c$2;
	    out[0] = x$1 * x$1 * t + c$2;
	    out[1] = y$1 * x$1 * t + z * s$3;
	    out[2] = z * x$1 * t - y$1 * s$3;
	    out[3] = 0;
	    out[4] = x$1 * y$1 * t - z * s$3;
	    out[5] = y$1 * y$1 * t + c$2;
	    out[6] = z * y$1 * t + x$1 * s$3;
	    out[7] = 0;
	    out[8] = x$1 * z * t + y$1 * s$3;
	    out[9] = y$1 * z * t - x$1 * s$3;
	    out[10] = z * z * t + c$2;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	};
	var fromRotationX = function (rad, out) {
	    s$3 = Math.sin(rad);
	    c$2 = Math.cos(rad);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = c$2;
	    out[6] = s$3;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = -s$3;
	    out[10] = c$2;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	};
	var fromRotationY = function (rad, out) {
	    s$3 = Math.sin(rad);
	    c$2 = Math.cos(rad);
	    out[0] = c$2;
	    out[1] = 0;
	    out[2] = -s$3;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = s$3;
	    out[9] = 0;
	    out[10] = c$2;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	};
	var fromRotationZ = function (rad, out) {
	    s$3 = Math.sin(rad);
	    c$2 = Math.cos(rad);
	    out[0] = c$2;
	    out[1] = s$3;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = -s$3;
	    out[5] = c$2;
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
	var fromScaling = function (v, out) {
	    if (out === void 0) { out = new Float32Array(16); }
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
	var fromTranslation = function (v, out) {
	    if (out === void 0) { out = new Float32Array(16); }
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
	var identity$1 = function (out) {
	    if (out === void 0) { out = new Float32Array(16); }
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
	function invert$1(a, out) {
	    if (out === void 0) { out = new Float32Array(16); }
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
	}
	var lookAt = function (eye, center, up, out) {
	    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
	    var eyex = eye[0];
	    var eyey = eye[1];
	    var eyez = eye[2];
	    var upx = up[0];
	    var upy = up[1];
	    var upz = up[2];
	    var centerx = center[0];
	    var centery = center[1];
	    var centerz = center[2];
	    if (Math.abs(eyex - centerx) < EPSILON &&
	        Math.abs(eyey - centery) < EPSILON &&
	        Math.abs(eyez - centerz) < EPSILON) {
	        return identity$1(out);
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
	var multiply$4 = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(16); }
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
	var orthogonal = function (left, right, bottom, top, near, far, out) {
	    var lr = 1 / (left - right);
	    var bt = 1 / (bottom - top);
	    var nf = 1 / (near - far);
	    out[0] = -2 * lr;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = -2 * bt;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 2 * nf;
	    out[11] = 0;
	    out[12] = (left + right) * lr;
	    out[13] = (top + bottom) * bt;
	    out[14] = (far + near) * nf;
	    out[15] = 1;
	    return out;
	};
	var perspective = function (fovy, aspect, near, far, out) {
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
	var rotate$1 = function (a, rad, axis, out) {
	    x$1 = axis[0];
	    y$1 = axis[1];
	    z = axis[2];
	    len$1 = Math.hypot(x$1, y$1, z);
	    if (len$1 < EPSILON) {
	        return null;
	    }
	    len$1 = 1 / len$1;
	    x$1 *= len$1;
	    y$1 *= len$1;
	    z *= len$1;
	    s$3 = Math.sin(rad);
	    c$2 = Math.cos(rad);
	    t = 1 - c$2;
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
	    b00 = x$1 * x$1 * t + c$2;
	    b01 = y$1 * x$1 * t + z * s$3;
	    b02 = z * x$1 * t - y$1 * s$3;
	    b10 = x$1 * y$1 * t - z * s$3;
	    b11 = y$1 * y$1 * t + c$2;
	    b12 = z * y$1 * t + x$1 * s$3;
	    b20 = x$1 * z * t + y$1 * s$3;
	    b21 = y$1 * z * t - x$1 * s$3;
	    b22 = z * z * t + c$2;
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
	var rotateX$2 = function (a, rad, out) {
	    s$3 = Math.sin(rad);
	    c$2 = Math.cos(rad);
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
	    out[4] = a10 * c$2 + a20 * s$3;
	    out[5] = a11 * c$2 + a21 * s$3;
	    out[6] = a12 * c$2 + a22 * s$3;
	    out[7] = a13 * c$2 + a23 * s$3;
	    out[8] = a20 * c$2 - a10 * s$3;
	    out[9] = a21 * c$2 - a11 * s$3;
	    out[10] = a22 * c$2 - a12 * s$3;
	    out[11] = a23 * c$2 - a13 * s$3;
	    return out;
	};
	var rotateY$2 = function (a, rad, out) {
	    s$3 = Math.sin(rad);
	    c$2 = Math.cos(rad);
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
	    out[0] = a00 * c$2 - a20 * s$3;
	    out[1] = a01 * c$2 - a21 * s$3;
	    out[2] = a02 * c$2 - a22 * s$3;
	    out[3] = a03 * c$2 - a23 * s$3;
	    out[8] = a00 * s$3 + a20 * c$2;
	    out[9] = a01 * s$3 + a21 * c$2;
	    out[10] = a02 * s$3 + a22 * c$2;
	    out[11] = a03 * s$3 + a23 * c$2;
	    return out;
	};
	var rotateZ$2 = function (a, rad, out) {
	    s$3 = Math.sin(rad);
	    c$2 = Math.cos(rad);
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
	    out[0] = a00 * c$2 + a10 * s$3;
	    out[1] = a01 * c$2 + a11 * s$3;
	    out[2] = a02 * c$2 + a12 * s$3;
	    out[3] = a03 * c$2 + a13 * s$3;
	    out[4] = a10 * c$2 - a00 * s$3;
	    out[5] = a11 * c$2 - a01 * s$3;
	    out[6] = a12 * c$2 - a02 * s$3;
	    out[7] = a13 * c$2 - a03 * s$3;
	    return out;
	};
	var scale = function (a, v, out) {
	    if (out === void 0) { out = new Float32Array(16); }
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
	var targetTo = function (eye, target, up, out) {
	    if (out === void 0) { out = new Float32Array(16); }
	    var eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
	    var z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
	    var len = z0 * z0 + z1 * z1 + z2 * z2;
	    if (len > 0) {
	        len = 1 / Math.sqrt(len);
	        z0 *= len;
	        z1 *= len;
	        z2 *= len;
	    }
	    var x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
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
	var translate$1 = function (a, v, out) {
	    if (out === void 0) { out = new Float32Array(16); }
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
	var transpose = function (a, out) {
	    if (out === void 0) { out = new Float32Array(16); }
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

	var Matrix4 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		UNIT_MATRIX4: UNIT_MATRIX4,
		create: create$6,
		determinant: determinant,
		from: from$3,
		fromEuler: fromEuler,
		fromQuaternion: fromQuaternion,
		fromRotation: fromRotation,
		fromRotationX: fromRotationX,
		fromRotationY: fromRotationY,
		fromRotationZ: fromRotationZ,
		fromScaling: fromScaling,
		fromTranslation: fromTranslation,
		identity: identity$1,
		invert: invert$1,
		lookAt: lookAt,
		multiply: multiply$4,
		orthogonal: orthogonal,
		perspective: perspective,
		rotate: rotate$1,
		rotateX: rotateX$2,
		rotateY: rotateY$2,
		rotateZ: rotateZ$2,
		scale: scale,
		targetTo: targetTo,
		translate: translate$1,
		transpose: transpose
	});

	var ax$2, ay$2, az$2, bx$2, by$2, bz$2;
	var ag, s$2;
	var add$2 = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    return out;
	};
	var addScalar$1 = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = a[0] + b;
	    out[1] = a[1] + b;
	    out[2] = a[2] + b;
	    return out;
	};
	var angle$1 = function (a, b) {
	    ax$2 = a[0];
	    ay$2 = a[1];
	    az$2 = a[2];
	    bx$2 = b[0];
	    by$2 = b[1];
	    bz$2 = b[2];
	    var mag1 = Math.sqrt(ax$2 * ax$2 + ay$2 * ay$2 + az$2 * az$2), mag2 = Math.sqrt(bx$2 * bx$2 + by$2 * by$2 + bz$2 * bz$2), mag = mag1 * mag2, cosine = mag && dot$3(a, b) / mag;
	    return Math.acos(clampCommon(cosine, -1, 1));
	};
	var clamp$1 = function (a, min, max, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = clampCommon(a[0], min[0], max[0]);
	    out[1] = clampCommon(a[1], min[1], max[1]);
	    out[2] = clampCommon(a[2], min[2], max[2]);
	    return out;
	};
	var clampSafe$1 = function (a, min, max, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = clampSafeCommon(a[0], min[0], max[0]);
	    out[1] = clampSafeCommon(a[1], min[1], max[1]);
	    out[1] = clampSafeCommon(a[2], min[2], max[2]);
	    return out;
	};
	var clampScalar$1 = function (a, min, max, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = clampCommon(a[0], min, max);
	    out[1] = clampCommon(a[1], min, max);
	    out[2] = clampCommon(a[2], min, max);
	    return out;
	};
	var clone$1 = function (a, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    return out;
	};
	var closeTo$2 = function (a, b) {
	    return closeToCommon(a[0], b[0]) && closeToCommon(a[1], b[1]) && closeToCommon(a[2], b[2]);
	};
	var create$5 = function (x, y, z, out) {
	    if (x === void 0) { x = 0; }
	    if (y === void 0) { y = 0; }
	    if (z === void 0) { z = 0; }
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    return out;
	};
	var cross$2 = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    ax$2 = a[0];
	    ay$2 = a[1];
	    az$2 = a[2];
	    bx$2 = b[0];
	    by$2 = b[1];
	    bz$2 = b[2];
	    out[0] = ay$2 * bz$2 - az$2 * by$2;
	    out[1] = az$2 * bx$2 - ax$2 * bz$2;
	    out[2] = ax$2 * by$2 - ay$2 * bx$2;
	    return out;
	};
	var distanceTo$2 = function (a, b) {
	    ax$2 = b[0] - a[0];
	    ay$2 = b[1] - a[1];
	    az$2 = b[2] - a[2];
	    return Math.hypot(ax$2, ay$2, az$2);
	};
	var distanceToManhattan$1 = function (a, b) {
	    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
	};
	var distanceToSquared$2 = function (a, b) {
	    ax$2 = a[0] - b[0];
	    ay$2 = a[1] - b[1];
	    az$2 = a[2] - b[2];
	    return ax$2 * ax$2 + ay$2 * ay$2 + az$2 * az$2;
	};
	var divide$2 = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = a[0] / b[0];
	    out[1] = a[1] / b[1];
	    out[2] = a[2] / b[2];
	    return out;
	};
	var divideScalar$1 = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = a[0] / b;
	    out[1] = a[1] / b;
	    out[2] = a[2] / b;
	    return out;
	};
	var dot$3 = function (a, b) {
	    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	};
	var equals$3 = function (a, b) {
	    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
	};
	var from$2 = function (a, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    return out;
	};
	var fromArray$1 = function (a, offset, out) {
	    if (offset === void 0) { offset = 0; }
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = a[offset];
	    out[1] = a[offset + 1];
	    out[2] = a[offset + 2];
	    return out;
	};
	var fromScalar$1 = function (num, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = out[1] = out[2] = num;
	    return out;
	};
	var fromValues$1 = function (x, y, z, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    return out;
	};
	var hermite = function (a, b, c, d, t, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    ag = t * t;
	    var factor1 = ag * (2 * t - 3) + 1;
	    var factor2 = ag * (t - 2) + t;
	    var factor3 = ag * (t - 1);
	    var factor4 = ag * (3 - 2 * t);
	    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
	    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
	    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
	    return out;
	};
	var inverse$2 = function (a, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = 1.0 / a[0];
	    out[1] = 1.0 / a[1];
	    out[2] = 1.0 / a[2];
	    return out;
	};
	var length$2 = function (a) {
	    return Math.sqrt(lengthSquared$2(a));
	};
	var lengthManhattan$1 = function (a) {
	    return Math.abs(a[0]) + Math.abs(a[1]) + Math.abs(a[2]);
	};
	var lengthSquared$2 = function (a) {
	    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
	};
	var lerp$3 = function (a, b, alpha, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] += (b[0] - a[0]) * alpha;
	    out[1] += (b[1] - a[1]) * alpha;
	    out[2] += (b[2] - a[2]) * alpha;
	    return out;
	};
	var max$2 = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = Math.max(a[0], b[0]);
	    out[1] = Math.max(a[1], b[1]);
	    out[2] = Math.max(a[2], b[2]);
	    return out;
	};
	var min$2 = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = Math.min(a[0], b[0]);
	    out[1] = Math.min(a[1], b[1]);
	    out[2] = Math.min(a[2], b[2]);
	    return out;
	};
	var minus$2 = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    return out;
	};
	var minusScalar$1 = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = a[0] - b;
	    out[1] = a[1] - b;
	    out[2] = a[2] - b;
	    return out;
	};
	var multiply$3 = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = a[0] * b[0];
	    out[1] = a[1] * b[1];
	    out[2] = a[2] * b[2];
	    return out;
	};
	var multiplyScalar$2 = function (a, scalar, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = a[0] * scalar;
	    out[1] = a[1] * scalar;
	    out[2] = a[2] * scalar;
	    return out;
	};
	var negate$2 = function (a, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = -a[0];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    return out;
	};
	var normalize$2 = function (a, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    return divideScalar$1(a, length$2(a) || 1, out);
	};
	var rotateX$1 = function (a, b, rad, out) {
	    ax$2 = a[0] - b[0];
	    ay$2 = a[1] - b[1];
	    az$2 = a[2] - b[2];
	    bx$2 = ax$2;
	    by$2 = ay$2 * Math.cos(rad) - az$2 * Math.sin(rad);
	    bz$2 = ay$2 * Math.sin(rad) + az$2 * Math.cos(rad);
	    out[0] = bx$2 + b[0];
	    out[1] = by$2 + b[1];
	    out[2] = bz$2 + b[2];
	    return out;
	};
	var rotateY$1 = function (a, b, rad, out) {
	    ax$2 = a[0] - b[0];
	    ay$2 = a[1] - b[1];
	    az$2 = a[2] - b[2];
	    bx$2 = az$2 * Math.sin(rad) + ax$2 * Math.cos(rad);
	    by$2 = ay$2;
	    bz$2 = az$2 * Math.cos(rad) - ax$2 * Math.sin(rad);
	    out[0] = bx$2 + b[0];
	    out[1] = by$2 + b[1];
	    out[2] = bz$2 + b[2];
	    return out;
	};
	var rotateZ$1 = function (a, b, rad, out) {
	    ax$2 = a[0] - b[0];
	    ay$2 = a[1] - b[1];
	    az$2 = a[2] - b[2];
	    bx$2 = ax$2 * Math.cos(rad) - ay$2 * Math.sin(rad);
	    by$2 = ax$2 * Math.sin(rad) + ay$2 * Math.cos(rad);
	    bz$2 = az$2;
	    out[0] = bx$2 + b[0];
	    out[1] = by$2 + b[1];
	    out[2] = bz$2 + b[2];
	    return out;
	};
	var round$2 = function (a, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = Math.round(a[0]);
	    out[1] = Math.round(a[1]);
	    out[2] = Math.round(a[2]);
	    return out;
	};
	var set$1 = function (x, y, z, out) {
	    if (x === void 0) { x = 0; }
	    if (y === void 0) { y = 0; }
	    if (z === void 0) { z = 0; }
	    if (out === void 0) { out = new Float32Array(3); }
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    return out;
	};
	var setLength$1 = function (a, len, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    return multiplyScalar$2(normalize$2(a, out), len, out);
	};
	var slerp$1 = function (a, b, t, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    ag = Math.acos(Math.min(Math.max(dot$3(a, b), -1), 1));
	    s$2 = Math.sin(ag);
	    ax$2 = Math.sin((1 - t) * ag) / s$2;
	    bx$2 = Math.sin(t * ag) / s$2;
	    out[0] = ax$2 * a[0] + bx$2 * b[0];
	    out[1] = ax$2 * a[1] + bx$2 * b[1];
	    out[2] = ax$2 * a[2] + bx$2 * b[2];
	    return out;
	};
	var toString$3 = function (a) {
	    return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
	};
	var transformMatrix3$1 = function (a, m, out) {
	    ax$2 = a[0];
	    ay$2 = a[1];
	    az$2 = a[2];
	    out[0] = ax$2 * m[0] + ay$2 * m[3] + az$2 * m[6];
	    out[1] = ax$2 * m[1] + ay$2 * m[4] + az$2 * m[7];
	    out[2] = ax$2 * m[2] + ay$2 * m[5] + az$2 * m[8];
	    return out;
	};
	var transformMatrix4$1 = function (a, m, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    ax$2 = a[0];
	    ay$2 = a[1];
	    az$2 = a[2];
	    ag = m[3] * ax$2 + m[7] * ay$2 + m[11] * az$2 + m[15];
	    ag = ag || 1.0;
	    out[0] = (m[0] * ax$2 + m[4] * ay$2 + m[8] * az$2 + m[12]) / ag;
	    out[1] = (m[1] * ax$2 + m[5] * ay$2 + m[9] * az$2 + m[13]) / ag;
	    out[2] = (m[2] * ax$2 + m[6] * ay$2 + m[10] * az$2 + m[14]) / ag;
	    return out;
	};
	var transformQuat$1 = function (a, q, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
	    var x = a[0], y = a[1], z = a[2];
	    // var qvec = [qx, qy, qz];
	    // var uv = vec3.cross([], qvec, a);
	    var uvx = qy * z - qz * y, uvy = qz * x - qx * z, uvz = qx * y - qy * x;
	    // var uuv = vec3.cross([], qvec, uv);
	    var uuvx = qy * uvz - qz * uvy, uuvy = qz * uvx - qx * uvz, uuvz = qx * uvy - qy * uvx;
	    // vec3.scale(uv, uv, 2 * w);
	    var w2 = qw * 2;
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
	var VECTOR3_ZERO = new Float32Array([0, 0, 0]);
	var VECTOR3_ONE = new Float32Array([1, 1, 1]);
	var VECTOR3_TOP = new Float32Array([0, 1, 0]);
	var VECTOR3_BOTTOM = new Float32Array([0, -1, 0]);
	var VECTOR3_LEFT = new Float32Array([-1, 0, 0]);
	var VECTOR3_RIGHT = new Float32Array([1, 0, 0]);
	var VECTOR3_FRONT = new Float32Array([0, 0, -1]);
	var VECTOR3_BACK = new Float32Array([0, 0, 1]);

	var Vector3 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		add: add$2,
		addScalar: addScalar$1,
		angle: angle$1,
		clamp: clamp$1,
		clampSafe: clampSafe$1,
		clampScalar: clampScalar$1,
		clone: clone$1,
		closeTo: closeTo$2,
		create: create$5,
		cross: cross$2,
		distanceTo: distanceTo$2,
		distanceToManhattan: distanceToManhattan$1,
		distanceToSquared: distanceToSquared$2,
		divide: divide$2,
		divideScalar: divideScalar$1,
		dot: dot$3,
		equals: equals$3,
		from: from$2,
		fromArray: fromArray$1,
		fromScalar: fromScalar$1,
		fromValues: fromValues$1,
		hermite: hermite,
		inverse: inverse$2,
		length: length$2,
		lengthManhattan: lengthManhattan$1,
		lengthSquared: lengthSquared$2,
		lerp: lerp$3,
		max: max$2,
		min: min$2,
		minus: minus$2,
		minusScalar: minusScalar$1,
		multiply: multiply$3,
		multiplyScalar: multiplyScalar$2,
		negate: negate$2,
		normalize: normalize$2,
		rotateX: rotateX$1,
		rotateY: rotateY$1,
		rotateZ: rotateZ$1,
		round: round$2,
		set: set$1,
		setLength: setLength$1,
		slerp: slerp$1,
		toString: toString$3,
		transformMatrix3: transformMatrix3$1,
		transformMatrix4: transformMatrix4$1,
		transformQuat: transformQuat$1,
		VECTOR3_ZERO: VECTOR3_ZERO,
		VECTOR3_ONE: VECTOR3_ONE,
		VECTOR3_TOP: VECTOR3_TOP,
		VECTOR3_BOTTOM: VECTOR3_BOTTOM,
		VECTOR3_LEFT: VECTOR3_LEFT,
		VECTOR3_RIGHT: VECTOR3_RIGHT,
		VECTOR3_FRONT: VECTOR3_FRONT,
		VECTOR3_BACK: VECTOR3_BACK
	});

	// import clampCommon from "../common/clamp";
	var ax$1, ay$1, az$1, aw$1, bx$1, by$1, bz$1, len;
	var ix, iy, iz, iw;
	var A, B, C, D, E, F, G, H, I, J;
	var add$1 = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    out[3] = a[3] + b[3];
	    return out;
	};
	function ceil$1(a, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = Math.ceil(a[0]);
	    out[1] = Math.ceil(a[1]);
	    out[2] = Math.ceil(a[2]);
	    out[3] = Math.ceil(a[3]);
	    return out;
	}
	var closeTo$1 = function (a, b) {
	    return closeToCommon(a[0], b[0]) && closeToCommon(a[1], b[1]) && closeToCommon(a[2], b[2]) && closeToCommon(a[3], b[3]);
	};
	var create$4 = function (x, y, z, w, out) {
	    if (x === void 0) { x = 0; }
	    if (y === void 0) { y = 0; }
	    if (z === void 0) { z = 0; }
	    if (w === void 0) { w = 0; }
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    out[3] = w;
	    return out;
	};
	var cross$1 = function (u, v, w, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    A = v[0] * w[1] - v[1] * w[0],
	        B = v[0] * w[2] - v[2] * w[0],
	        C = v[0] * w[3] - v[3] * w[0],
	        D = v[1] * w[2] - v[2] * w[1],
	        E = v[1] * w[3] - v[3] * w[1],
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
	var distanceTo$1 = function (a, b) {
	    ax$1 = b[0] - a[0];
	    ay$1 = b[1] - a[1];
	    az$1 = b[2] - a[2];
	    aw$1 = b[3] - a[3];
	    return Math.hypot(ax$1, ay$1, az$1, aw$1);
	};
	var distanceToSquared$1 = function (a, b) {
	    ax$1 = b[0] - a[0];
	    ay$1 = b[1] - a[1];
	    az$1 = b[2] - a[2];
	    aw$1 = b[3] - a[3];
	    return ax$1 * ax$1 + ay$1 * ay$1 + az$1 * az$1 + aw$1 * aw$1;
	};
	var divide$1 = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = a[0] / b[0];
	    out[1] = a[1] / b[1];
	    out[2] = a[2] / b[2];
	    out[3] = a[3] / b[3];
	    return out;
	};
	var dot$2 = function (a, b) {
	    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
	};
	var equals$2 = function (a, b) {
	    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
	};
	function floor$1(a, out) {
	    out[0] = Math.floor(a[0]);
	    out[1] = Math.floor(a[1]);
	    out[2] = Math.floor(a[2]);
	    out[3] = Math.floor(a[3]);
	    return out;
	}
	var from$1 = function (a, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};
	var fromValues = function (x, y, z, w, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    out[3] = w;
	    return out;
	};
	var inverse$1 = function (a, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = 1.0 / a[0];
	    out[1] = 1.0 / a[1];
	    out[2] = 1.0 / a[2];
	    out[3] = 1.0 / a[3];
	    return out;
	};
	var length$1 = function (a) {
	    return Math.hypot(a[0], a[1], a[2], a[3]);
	};
	var lengthSquared$1 = function (a) {
	    ax$1 = a[0];
	    ay$1 = a[1];
	    az$1 = a[2];
	    aw$1 = a[3];
	    return ax$1 * ax$1 + ay$1 * ay$1 + az$1 * az$1 + aw$1 * aw$1;
	};
	var lerp$2 = function (a, b, t, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    ax$1 = a[0];
	    ay$1 = a[1];
	    az$1 = a[2];
	    aw$1 = a[3];
	    out[0] = ax$1 + t * (b[0] - ax$1);
	    out[1] = ay$1 + t * (b[1] - ay$1);
	    out[2] = az$1 + t * (b[2] - az$1);
	    out[3] = aw$1 + t * (b[3] - aw$1);
	    return out;
	};
	var max$1 = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = Math.max(a[0], b[0]);
	    out[1] = Math.max(a[1], b[1]);
	    out[2] = Math.max(a[2], b[2]);
	    out[3] = Math.max(a[3], b[3]);
	    return out;
	};
	var min$1 = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = Math.min(a[0], b[0]);
	    out[1] = Math.min(a[1], b[1]);
	    out[2] = Math.min(a[2], b[2]);
	    out[3] = Math.min(a[3], b[3]);
	    return out;
	};
	var minus$1 = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    out[3] = a[3] - b[3];
	    return out;
	};
	var multiply$2 = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = a[0] * b[0];
	    out[1] = a[1] * b[1];
	    out[2] = a[2] * b[2];
	    out[3] = a[3] * b[3];
	    return out;
	};
	var multiplyScalar$1 = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    out[3] = a[3] * b;
	    return out;
	};
	var negate$1 = function (a, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = -a[0];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    out[3] = -a[3];
	    return out;
	};
	var normalize$1 = function (a, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    ax$1 = a[0];
	    ay$1 = a[1];
	    az$1 = a[2];
	    aw$1 = a[3];
	    len = ax$1 * ax$1 + ay$1 * ay$1 + az$1 * az$1 + aw$1 * aw$1;
	    if (len > 0) {
	        len = 1 / Math.sqrt(len);
	    }
	    out[0] = ax$1 * len;
	    out[1] = ay$1 * len;
	    out[2] = az$1 * len;
	    out[3] = aw$1 * len;
	    return out;
	};
	var round$1 = function (a, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = Math.round(a[0]);
	    out[1] = Math.round(a[1]);
	    out[2] = Math.round(a[2]);
	    out[3] = Math.round(a[3]);
	    return out;
	};
	function toString$2(a) {
	    return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
	}
	function transformMatrix4(a, m, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    ax$1 = a[0],
	        ay$1 = a[1],
	        az$1 = a[2],
	        aw$1 = a[3];
	    out[0] = m[0] * ax$1 + m[4] * ay$1 + m[8] * az$1 + m[12] * aw$1;
	    out[1] = m[1] * ax$1 + m[5] * ay$1 + m[9] * az$1 + m[13] * aw$1;
	    out[2] = m[2] * ax$1 + m[6] * ay$1 + m[10] * az$1 + m[14] * aw$1;
	    out[3] = m[3] * ax$1 + m[7] * ay$1 + m[11] * az$1 + m[15] * aw$1;
	    return out;
	}
	var transformQuat = function (a, q, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    bx$1 = a[0],
	        by$1 = a[1],
	        bz$1 = a[2];
	    ax$1 = q[0],
	        ay$1 = q[1],
	        az$1 = q[2],
	        aw$1 = q[3];
	    ix = aw$1 * bx$1 + ay$1 * bz$1 - az$1 * by$1;
	    iy = aw$1 * by$1 + az$1 * bx$1 - ax$1 * bz$1;
	    iz = aw$1 * bz$1 + ax$1 * by$1 - ay$1 * bx$1;
	    iw = -ax$1 * bx$1 - ay$1 * by$1 - az$1 * bz$1;
	    out[0] = ix * aw$1 + iw * -ax$1 + iy * -az$1 - iz * -ay$1;
	    out[1] = iy * aw$1 + iw * -ay$1 + iz * -ax$1 - ix * -az$1;
	    out[2] = iz * aw$1 + iw * -az$1 + ix * -ay$1 - iy * -ax$1;
	    out[3] = a[3];
	    return out;
	};

	var Vector4 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		add: add$1,
		ceil: ceil$1,
		closeTo: closeTo$1,
		create: create$4,
		cross: cross$1,
		distanceTo: distanceTo$1,
		distanceToSquared: distanceToSquared$1,
		divide: divide$1,
		dot: dot$2,
		equals: equals$2,
		floor: floor$1,
		from: from$1,
		fromValues: fromValues,
		inverse: inverse$1,
		length: length$1,
		lengthSquared: lengthSquared$1,
		lerp: lerp$2,
		max: max$1,
		min: min$1,
		minus: minus$1,
		multiply: multiply$2,
		multiplyScalar: multiplyScalar$1,
		negate: negate$1,
		normalize: normalize$1,
		round: round$1,
		toString: toString$2,
		transformMatrix4: transformMatrix4,
		transformQuat: transformQuat
	});

	var ax, ay, az, aw, bx, by, bz, bw;
	var s$1 = 0, c$1 = 0, rad = 0, dotTmp = 0, omega = 0, scale0 = 0, scale1 = 0;
	var tmpVec3 = new Float32Array(3);
	var angleTo = function (a, b) {
	    dotTmp = dot$1(a, b);
	    return Math.acos(2 * dotTmp * dotTmp - 1);
	};
	var conjugate = function (a, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = -a[0];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    out[3] = a[3];
	    return out;
	};
	var create$3 = function (x, y, z, w, out) {
	    if (x === void 0) { x = 0; }
	    if (y === void 0) { y = 0; }
	    if (z === void 0) { z = 0; }
	    if (w === void 0) { w = 1; }
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    out[3] = w;
	    return out;
	};
	var dot$1 = dot$2;
	var fromAxisAngle = function (axis, rad, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    rad = rad * 0.5;
	    s$1 = Math.sin(rad);
	    out[0] = s$1 * axis[0];
	    out[1] = s$1 * axis[1];
	    out[2] = s$1 * axis[2];
	    out[3] = Math.cos(rad);
	    return out;
	};
	function fromMatrix3(m, out) {
	    var fTrace = m[0] + m[4] + m[8];
	    var fRoot;
	    if (fTrace > 0.0) {
	        fRoot = Math.sqrt(fTrace + 1.0); // 2w
	        out[3] = 0.5 * fRoot;
	        fRoot = 0.5 / fRoot; // 1/(4w)
	        out[0] = (m[5] - m[7]) * fRoot;
	        out[1] = (m[6] - m[2]) * fRoot;
	        out[2] = (m[1] - m[3]) * fRoot;
	    }
	    else {
	        var i = 0;
	        if (m[4] > m[0])
	            i = 1;
	        if (m[8] > m[i * 3 + i])
	            i = 2;
	        var j = (i + 1) % 3;
	        var k = (i + 2) % 3;
	        fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
	        out[i] = 0.5 * fRoot;
	        fRoot = 0.5 / fRoot;
	        out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
	        out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
	        out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
	    }
	    return out;
	}
	var identity = function (out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};
	var invert = function (a, out) {
	    if (out === void 0) { out = new Float32Array(4); }
	    ax = a[0],
	        ay = a[1],
	        az = a[2],
	        aw = a[3];
	    dotTmp = ax * ax + ay * ay + az * az + aw * aw;
	    if (dotTmp) {
	        c$1 = 1.0 / dotTmp;
	        out[0] = -ax * c$1;
	        out[1] = -ay * c$1;
	        out[2] = -az * c$1;
	        out[3] = aw * c$1;
	    }
	    else {
	        out[0] = 0;
	        out[1] = 0;
	        out[2] = 0;
	        out[3] = 0;
	    }
	    return out;
	};
	var lerp$1 = lerp$2;
	var multiply$1 = function (a, b, out) {
	    ax = a[0],
	        ay = a[1],
	        az = a[2],
	        aw = a[3];
	    bx = b[0],
	        by = b[1],
	        bz = b[2],
	        bw = b[3];
	    out[0] = ax * bw + aw * bx + ay * bz - az * by;
	    out[1] = ay * bw + aw * by + az * bx - ax * bz;
	    out[2] = az * bw + aw * bz + ax * by - ay * bx;
	    out[3] = aw * bw - ax * bx - ay * by - az * bz;
	    return out;
	};
	var random$1 = function (out) {
	    ax = Math.random();
	    ay = Math.random();
	    az = Math.random();
	    c$1 = Math.sqrt(1 - ax);
	    s$1 = Math.sqrt(ax);
	    out[0] = c$1 * Math.sin(2.0 * Math.PI * ay);
	    out[1] = c$1 * Math.cos(2.0 * Math.PI * ay);
	    out[2] = s$1 * Math.sin(2.0 * Math.PI * az);
	    out[3] = s$1 * Math.cos(2.0 * Math.PI * az);
	    return out;
	};
	var rotationTo = function (a, b, out) {
	    dotTmp = dot$3(a, b);
	    if (dotTmp < -0.999999) {
	        cross$2(VECTOR3_LEFT, a, tmpVec3);
	        if (length$2(tmpVec3) < 0.000001) {
	            cross$2(VECTOR3_TOP, a, tmpVec3);
	        }
	        normalize$2(tmpVec3, tmpVec3);
	        fromAxisAngle(tmpVec3, Math.PI, out);
	        return out;
	    }
	    else if (dotTmp > 0.999999) {
	        out[0] = 0;
	        out[1] = 0;
	        out[2] = 0;
	        out[3] = 1;
	        return out;
	    }
	    else {
	        cross$2(tmpVec3, a, b);
	        out[0] = tmpVec3[0];
	        out[1] = tmpVec3[1];
	        out[2] = tmpVec3[2];
	        out[3] = 1 + dotTmp;
	        return normalize$1(out, out);
	    }
	};
	var rotateX = function (a, rad, out) {
	    rad *= 0.5;
	    ax = a[0],
	        ay = a[1],
	        az = a[2],
	        aw = a[3];
	    bx = Math.sin(rad),
	        bw = Math.cos(rad);
	    out[0] = ax * bw + aw * bx;
	    out[1] = ay * bw + az * bx;
	    out[2] = az * bw - ay * bx;
	    out[3] = aw * bw - ax * bx;
	    return out;
	};
	var rotateY = function (a, rad, out) {
	    rad *= 0.5;
	    ax = a[0],
	        ay = a[1],
	        az = a[2],
	        aw = a[3];
	    by = Math.sin(rad),
	        bw = Math.cos(rad);
	    out[0] = ax * bw - az * by;
	    out[1] = ay * bw + aw * by;
	    out[2] = az * bw + ax * by;
	    out[3] = aw * bw - ay * by;
	    return out;
	};
	var rotateZ = function (a, rad, out) {
	    rad *= 0.5;
	    ax = a[0],
	        ay = a[1],
	        az = a[2],
	        aw = a[3];
	    bz = Math.sin(rad),
	        bw = Math.cos(rad);
	    out[0] = ax * bw + ay * bz;
	    out[1] = ay * bw - ax * bz;
	    out[2] = az * bw + aw * bz;
	    out[3] = aw * bw - az * bz;
	    return out;
	};
	var slerp = function (a, b, t, out) {
	    ax = a[0],
	        ay = a[1],
	        az = a[2],
	        aw = a[3];
	    bx = b[0],
	        by = b[1],
	        bz = b[2],
	        bw = b[3];
	    c$1 = ax * bx + ay * by + az * bz + aw * bw;
	    if (c$1 < 0.0) {
	        c$1 = -c$1;
	        bx = -bx;
	        by = -by;
	        bz = -bz;
	        bw = -bw;
	    }
	    if (1.0 - c$1 > EPSILON) {
	        omega = Math.acos(c$1);
	        s$1 = Math.sin(omega);
	        scale0 = Math.sin((1.0 - t) * omega) / s$1;
	        scale1 = Math.sin(t * omega) / s$1;
	    }
	    else {
	        scale0 = 1.0 - t;
	        scale1 = t;
	    }
	    out[0] = scale0 * ax + scale1 * bx;
	    out[1] = scale0 * ay + scale1 * by;
	    out[2] = scale0 * az + scale1 * bz;
	    out[3] = scale0 * aw + scale1 * bw;
	    return out;
	};
	var toAxisAngle = function (q, outAxis) {
	    if (outAxis === void 0) { outAxis = new Float32Array(3); }
	    rad = Math.acos(q[3]) * 2.0;
	    s$1 = Math.sin(rad / 2.0);
	    if (s$1 > EPSILON) {
	        outAxis[0] = q[0] / s$1;
	        outAxis[1] = q[1] / s$1;
	        outAxis[2] = q[2] / s$1;
	    }
	    else {
	        outAxis[0] = 1;
	        outAxis[1] = 0;
	        outAxis[2] = 0;
	    }
	    return rad;
	};
	var toString$1 = function (a) {
	    return "quat(\"" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
	};

	var Quaternion = /*#__PURE__*/Object.freeze({
		__proto__: null,
		angleTo: angleTo,
		conjugate: conjugate,
		create: create$3,
		dot: dot$1,
		fromAxisAngle: fromAxisAngle,
		fromMatrix3: fromMatrix3,
		identity: identity,
		invert: invert,
		lerp: lerp$1,
		multiply: multiply$1,
		random: random$1,
		rotationTo: rotationTo,
		rotateX: rotateX,
		rotateY: rotateY,
		rotateZ: rotateZ,
		slerp: slerp,
		toAxisAngle: toAxisAngle,
		toString: toString$1
	});

	var rndFloat = (function (low, high) {
	    return low + Math.random() * (high - low);
	});

	var rndFloatRange = (function (range) {
	    return range * (0.5 - Math.random());
	});

	var rndInt = (function (low, high) {
	    return low + Math.floor(Math.random() * (high - low + 1));
	});

	var x = 0, y = 0, c = 0, s = 0;
	var add = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    return out;
	};
	var addScalar = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = a[0] + b;
	    out[1] = a[1] + b;
	    return out;
	};
	var angle = function (a) {
	    return Math.atan2(a[1], a[0]);
	};
	var ceil = function (a, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = Math.ceil(a[0]);
	    out[1] = Math.ceil(a[1]);
	    return out;
	};
	var clamp = function (a, min, max, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = clampCommon(a[0], min[0], max[0]);
	    out[1] = clampCommon(a[1], min[1], max[1]);
	    return out;
	};
	var clampSafe = function (a, min, max, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = clampSafeCommon(a[0], min[0], max[0]);
	    out[1] = clampSafeCommon(a[1], min[1], max[1]);
	    return out;
	};
	var clampLength = function (a, min, max, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = clampSafeCommon(a[0], min[0], max[0]);
	    out[1] = clampSafeCommon(a[1], min[1], max[1]);
	    return out;
	};
	var clampScalar = function (a, min, max, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = clampCommon(a[0], min, max);
	    out[1] = clampCommon(a[1], min, max);
	    return out;
	};
	var closeTo = function (a, b, epsilon) {
	    if (epsilon === void 0) { epsilon = EPSILON; }
	    return distanceTo(a, b) <= epsilon;
	};
	var closeToRect = function (a, b, epsilon) {
	    if (epsilon === void 0) { epsilon = EPSILON; }
	    return closeToCommon(a[0], b[0], epsilon) && closeToCommon(a[1], b[1], epsilon);
	};
	var closeToManhattan = function (a, b, epsilon) {
	    if (epsilon === void 0) { epsilon = EPSILON; }
	    return distanceToManhattan(a, b) <= epsilon;
	};
	var clone = function (a, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = a[0];
	    out[1] = a[1];
	    return out;
	};
	var cross = function (a, b) {
	    return a[0] * b[1] - a[1] * b[0];
	};
	var create$2 = function (x, y, out) {
	    if (x === void 0) { x = 0; }
	    if (y === void 0) { y = 0; }
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = x;
	    out[1] = y;
	    return out;
	};
	var distanceTo = function (a, b) {
	    x = b[0] - a[0];
	    y = b[1] - a[1];
	    return Math.hypot(x, y);
	};
	var distanceToManhattan = function (a, b) {
	    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
	};
	var distanceToSquared = function (a, b) {
	    x = a[0] - b[0];
	    y = a[1] - b[1];
	    return x * x + y * y;
	};
	var divide = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = a[0] / b[0];
	    out[1] = a[1] / b[1];
	    return out;
	};
	var divideScalar = function (a, scalar, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    return multiplyScalar(a, 1 / scalar, out);
	};
	var dot = function (a, b) {
	    return a[0] * b[0] + a[1] * b[1];
	};
	var equals$1 = function (a, b) {
	    return a[0] === b[0] && a[1] === b[1];
	};
	var floor = function (a, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = Math.floor(a[0]);
	    out[1] = Math.floor(a[1]);
	    return out;
	};
	var floorToZero = function (a, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = floorToZeroCommon(a[0]);
	    out[1] = floorToZeroCommon(a[1]);
	    return out;
	};
	var from = function (a, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = a[0];
	    out[1] = a[1];
	    return out;
	};
	var fromArray = function (arr, index, out) {
	    if (index === void 0) { index = 0; }
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = arr[index];
	    out[1] = arr[index + 1];
	    return out;
	};
	var fromJson = function (j, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = j.x;
	    out[1] = j.y;
	    return out;
	};
	var fromPolar = function (p, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = Math.cos(p.a) * p.r;
	    out[1] = Math.sin(p.a) * p.r;
	    return out;
	};
	var fromScalar = function (value, out) {
	    if (value === void 0) { value = 0; }
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = out[1] = value;
	    return out;
	};
	var inverse = function (a, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = 1 / a[0] || 0;
	    out[1] = 1 / a[1] || 0;
	    return out;
	};
	var length = function (a) {
	    return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
	};
	var lengthManhattan = function (a) {
	    return Math.abs(a[0]) + Math.abs(a[1]);
	};
	var lengthSquared = function (a) {
	    return a[0] * a[0] + a[1] * a[1];
	};
	var lerp = function (a, b, alpha, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = (b[0] - a[0]) * alpha + a[0];
	    out[1] = (b[1] - a[1]) * alpha + a[1];
	    return out;
	};
	var max = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = Math.max(a[0], b[0]);
	    out[1] = Math.max(a[1], b[1]);
	    return out;
	};
	var min = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = Math.min(a[0], b[0]);
	    out[1] = Math.min(a[1], b[1]);
	    return out;
	};
	var minus = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[0];
	    return out;
	};
	var minusScalar = function (a, num, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = a[0] - num;
	    out[1] = a[1] - num;
	    return out;
	};
	var multiply = function (a, b, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = a[0] * b[0];
	    out[1] = a[1] * b[1];
	    return out;
	};
	var multiplyScalar = function (a, scalar, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = a[0] * scalar;
	    out[1] = a[1] * scalar;
	    return out;
	};
	var negate = function (a, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = -a[0];
	    out[1] = -a[1];
	    return out;
	};
	var normalize = function (a, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    return divideScalar(a, length(a) || 1, out);
	};
	var random = function (length, out) {
	    if (length === void 0) { length = 1; }
	    if (out === void 0) { out = new Float32Array(2); }
	    x = Math.random() * DEG_360_RAD;
	    out[0] = Math.cos(x) * length;
	    out[1] = Math.sin(x) * length;
	    return out;
	};
	var rotate = function (a, angle, center, out) {
	    if (center === void 0) { center = VECTOR2_ZERO; }
	    if (out === void 0) { out = new Float32Array(2); }
	    c = Math.cos(angle);
	    s = Math.sin(angle);
	    x = a[0] - center[0];
	    y = a[1] - center[1];
	    out[0] = x * c - y * s + center[0];
	    out[1] = x * s + y * c + center[1];
	    return out;
	};
	var round = function (a, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = Math.round(a[0]);
	    out[1] = Math.round(a[1]);
	    return out;
	};
	var set = function (x, y, out) {
	    if (x === void 0) { x = 0; }
	    if (y === void 0) { y = 0; }
	    if (out === void 0) { out = new Float32Array(2); }
	    out[0] = x;
	    out[1] = y;
	    return out;
	};
	var setLength = function (a, length, out) {
	    if (out === void 0) { out = new Float32Array(2); }
	    normalize(a, out);
	    multiplyScalar(out, length, out);
	    return out;
	};
	var toArray = function (a, arr) {
	    if (arr === void 0) { arr = []; }
	    arr[0] = a[0];
	    arr[1] = a[1];
	    return arr;
	};
	var toPalorJson = function (a, p) {
	    if (p === void 0) { p = { a: 0, r: 0 }; }
	    p.r = length(a);
	    p.a = angle(a);
	    return p;
	};
	var toString = function (a) {
	    return "vec2(" + a[0] + ", " + a[1] + ")";
	};
	var transformMatrix3 = function (a, m, out) {
	    x = a[0];
	    y = a[1];
	    out[0] = m[0] * x + m[3] * y + m[6];
	    out[1] = m[1] * x + m[4] * y + m[7];
	    return out;
	};
	var VECTOR2_ZERO = new Float32Array([0, 0]);
	var VECTOR2_TOP = new Float32Array([0, 1]);
	var VECTOR2_BOTTOM = new Float32Array([0, -1]);
	var VECTOR2_LEFT = new Float32Array([-1, 0]);
	var VECTOR2_RIGHT = new Float32Array([1, 0]);

	var Vector2 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		add: add,
		addScalar: addScalar,
		angle: angle,
		ceil: ceil,
		clamp: clamp,
		clampSafe: clampSafe,
		clampLength: clampLength,
		clampScalar: clampScalar,
		closeTo: closeTo,
		closeToRect: closeToRect,
		closeToManhattan: closeToManhattan,
		clone: clone,
		cross: cross,
		create: create$2,
		distanceTo: distanceTo,
		distanceToManhattan: distanceToManhattan,
		distanceToSquared: distanceToSquared,
		divide: divide,
		divideScalar: divideScalar,
		dot: dot,
		equals: equals$1,
		floor: floor,
		floorToZero: floorToZero,
		from: from,
		fromArray: fromArray,
		fromJson: fromJson,
		fromPolar: fromPolar,
		fromScalar: fromScalar,
		inverse: inverse,
		length: length,
		lengthManhattan: lengthManhattan,
		lengthSquared: lengthSquared,
		lerp: lerp,
		max: max,
		min: min,
		minus: minus,
		minusScalar: minusScalar,
		multiply: multiply,
		multiplyScalar: multiplyScalar,
		negate: negate,
		normalize: normalize,
		random: random,
		rotate: rotate,
		round: round,
		set: set,
		setLength: setLength,
		toArray: toArray,
		toPalorJson: toPalorJson,
		toString: toString,
		transformMatrix3: transformMatrix3,
		VECTOR2_ZERO: VECTOR2_ZERO,
		VECTOR2_TOP: VECTOR2_TOP,
		VECTOR2_BOTTOM: VECTOR2_BOTTOM,
		VECTOR2_LEFT: VECTOR2_LEFT,
		VECTOR2_RIGHT: VECTOR2_RIGHT
	});

	var Rectangle2 = /** @class */ (function () {
	    function Rectangle2(a, b) {
	        if (a === void 0) { a = create$2(); }
	        if (b === void 0) { b = create$2(1, 1); }
	        this.min = create$2();
	        this.max = create$2();
	        min(a, b, this.min);
	        max(a, b, this.max);
	    }
	    return Rectangle2;
	}());
	var area$1 = function (a) {
	    return (a.max[0] - a.min[0]) * (a.max[1] - a.min[1]);
	};
	var containsPoint = function (rect, a) {
	    return a[0] >= rect.min[0] && a[0] <= rect.max[0] && a[1] >= rect.min[1] && a[1] <= rect.max[1];
	};
	var containsRectangle = function (rect, box) {
	    return (rect.min[0] <= box.min[0] &&
	        box.max[0] <= rect.max[0] &&
	        rect.min[1] <= box.min[1] &&
	        box.max[1] <= rect.max[1]);
	};
	var create$1 = function (a, b) {
	    if (a === void 0) { a = create$2(); }
	    if (b === void 0) { b = create$2(1, 1); }
	    return {
	        max: max(a, b),
	        min: min(a, b)
	    };
	};
	var equals = function (a, b) {
	    return equals$1(a.min, b.min) && equals$1(a.max, b.max);
	};
	var getCenter = function (a, out) {
	    if (out === void 0) { out = create$2(); }
	    add(a.min, a.max, out);
	    return multiplyScalar(out, 0.5, out);
	};
	var getSize = function (a, out) {
	    if (out === void 0) { out = create$2(); }
	    return minus(a.max, a.min, out);
	};
	var height = function (a) {
	    return a.max[1] - a.min[1];
	};
	var intersect = function (a, b, out) {
	    if (out === void 0) { out = new Rectangle2(); }
	    max(a.min, b.min, out.min);
	    min(a.max, b.max, out.max);
	    return out;
	};
	var stretch = function (a, b, c, out) {
	    if (out === void 0) { out = new Rectangle2(); }
	    add(a.min, b, out.min);
	    add(a.max, c, out.max);
	    return out;
	};
	var translate = function (a, b, out) {
	    if (out === void 0) { out = new Rectangle2(); }
	    add(a.min, b, out.min);
	    add(a.max, b, out.max);
	    return out;
	};
	var union = function (a, b, out) {
	    if (out === void 0) { out = new Rectangle2(); }
	    min(a.min, b.min, out.min);
	    max(a.max, b.max, out.max);
	    return out;
	};
	var width = function (a) {
	    return a.max[0] - a.min[0];
	};

	var Rectangle2$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		'default': Rectangle2,
		area: area$1,
		containsPoint: containsPoint,
		containsRectangle: containsRectangle,
		create: create$1,
		equals: equals,
		getCenter: getCenter,
		getSize: getSize,
		height: height,
		intersect: intersect,
		stretch: stretch,
		translate: translate,
		union: union,
		width: width
	});

	var defaultA = [-1, -1, 0];
	var defaultB = [1, -1, 0];
	var defaultC = [0, 1, 0];
	var ab = new Float32Array(3);
	var bc = new Float32Array(3);
	var Triangle3 = /** @class */ (function () {
	    function Triangle3(a, b, c) {
	        if (a === void 0) { a = new Float32Array(defaultA); }
	        if (b === void 0) { b = new Float32Array(defaultB); }
	        if (c === void 0) { c = new Float32Array(defaultC); }
	        this.a = a;
	        this.b = b;
	        this.c = c;
	    }
	    return Triangle3;
	}());
	var area = function (t) {
	    var c = getABLength(t);
	    var a = getBCLength(t);
	    var b = getCALength(t);
	    var p = (c + a + b) / 2;
	    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
	};
	var create = function (a, b, c) {
	    if (a === void 0) { a = new Float32Array(defaultA); }
	    if (b === void 0) { b = new Float32Array(defaultB); }
	    if (c === void 0) { c = new Float32Array(defaultC); }
	    return { a: a, b: b, c: c };
	};
	var getABLength = function (t) {
	    return distanceTo$2(t.a, t.b);
	};
	var getBCLength = function (t) {
	    return distanceTo$2(t.b, t.c);
	};
	var getCALength = function (t) {
	    return distanceTo$2(t.c, t.a);
	};
	var normal = function (t, out) {
	    if (out === void 0) { out = create$5(); }
	    minus$2(t.c, t.b, bc);
	    minus$2(t.b, t.a, ab);
	    cross$2(ab, bc, out);
	    return normalize$2(out);
	};
	var toFloat32Array = function (t, out) {
	    if (out === void 0) { out = new Float32Array(3); }
	    out.set(t.a, 0);
	    out.set(t.b, 3);
	    out.set(t.c, 6);
	    return normalize$2(out);
	};

	var Triangle3$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		'default': Triangle3,
		area: area,
		create: create,
		getABLength: getABLength,
		getBCLength: getBCLength,
		getCALength: getCALength,
		normal: normal,
		toFloat32Array: toFloat32Array
	});

	exports.COLOR_HEX_MAP = COLOR_HEX_MAP;
	exports.ColorGPU = ColorGPU;
	exports.ColorRGB = ColorRGB;
	exports.ColorRGBA = ColorRGBA;
	exports.Euler = Euler;
	exports.Matrix2 = Matrix2;
	exports.Matrix3 = Matrix3;
	exports.Matrix4 = Matrix4;
	exports.Quaternion = Quaternion;
	exports.Rectangle2 = Rectangle2$1;
	exports.Triangle3 = Triangle3$1;
	exports.Vector2 = Vector2;
	exports.Vector3 = Vector3;
	exports.Vector4 = Vector4;
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
	exports.sum = sum;
	exports.sumArray = sumArray;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=Mathx.legacy.js.map
