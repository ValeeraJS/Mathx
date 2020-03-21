(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.Mathx = {}));
}(this, (function (exports) { 'use strict';

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
	var clamp = (val, min, max) => {
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
	var floorToZero = (num) => {
	    return num < 0 ? Math.ceil(num) : Math.floor(num);
	};

	let circle;
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
	    return floorToZero(min / circle) * circle + (val % circle);
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
	var clampSafe = (val, a, b) => {
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
	var closeTo = (val, target, epsilon = EPSILON) => {
	    return Math.abs(val - target) <= epsilon;
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

	/**
	 * @class
	 * @classdesc 极坐标
	 * @implements {Mathx.IPolar}
	 * @name Mathx.Polar
	 * @desc 极坐标，遵守数学右手定则。规定逆时针方向为正方向。
	 * @param {number} [r=0] | 距离极点距离
	 * @param {number} [a=0] | 旋转弧度，规定0弧度为笛卡尔坐标系x轴方向
	 */
	class Polar {
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
	        this.r = r;
	        this.a = a;
	    }
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
	    fromVector2({ x, y }) {
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
	     * @method Mathx.Polar.prototype.set
	     * @desc 设置极坐标值
	     * @param {number} [r=0] 距离
	     * @param {number} [a=0] 弧度
	     * @returns {number} this
	     */
	    set(r = 0, a = 0) {
	        this.r = r;
	        this.a = a;
	        return this;
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
	     * @method Mathx.Polar.prototype.toVector2Json
	     * @desc 将极坐标转化为二维向量的json形式，纯数据
	     * @param {IVector2} [json] 被修改的json对象，如果不传则会新创建json对象。
	     * @returns {IVector2} json
	     */
	    toVector2Json(vec2 = { x: 0, y: 0 }) {
	        vec2.x = this.x();
	        vec2.y = this.y();
	        return vec2;
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

	let len$1, x, y, c, s;
	/**
	 * @class
	 * @classdesc 二维向量
	 * @implements {Mathx.IVector2}
	 * @name Mathx.Vector2
	 * @desc 极坐标，遵守数学右手定则。规定逆时针方向为正方向。
	 * @param {number} [x=0] | 距离极点距离
	 * @param {number} [y=0] | 旋转弧度，规定0弧度为笛卡尔坐标系x轴方向
	 */
	class Vector2 {
	    constructor(x = 0, y = 0) {
	        this.x = x;
	        this.y = y;
	    }
	    static create(x = 0, y = 0) {
	        return new Vector2(x, y);
	    }
	    add(vec2) {
	        this.x += vec2.x;
	        this.y += vec2.y;
	        return this;
	    }
	    addScalar(num) {
	        this.x += num;
	        this.y += num;
	        return this;
	    }
	    addVectors(...vecArr) {
	        len$1 = vecArr.length;
	        for (let i = 0; i < len$1; i++) {
	            this.add(vecArr[i]);
	        }
	        return this;
	    }
	    angle() {
	        return Math.atan2(this.y, this.x);
	    }
	    ceil() {
	        this.x = Math.ceil(this.x);
	        this.y = Math.ceil(this.y);
	        return this;
	    }
	    clamp(min, max) {
	        this.x = clamp(this.x, min.x, max.x);
	        this.y = clamp(this.y, min.y, max.y);
	        return this;
	    }
	    clampSafe(min, max) {
	        this.x = clampSafe(this.x, min.x, max.x);
	        this.y = clampSafe(this.y, min.y, max.y);
	        return this;
	    }
	    clampLength(min, max) {
	        len$1 = this.length();
	        return this.divideScalar(len$1 || 1).multiplyScalar(clamp(len$1, min, max));
	    }
	    clampScalar(min, max) {
	        this.x = clamp(this.x, min, max);
	        this.y = clamp(this.y, min, max);
	        return this;
	    }
	    closeTo(vec2, epsilon = EPSILON) {
	        return this.distanceTo(vec2) <= epsilon;
	    }
	    closeToRect(vec2, epsilon = EPSILON) {
	        return closeTo(this.x, vec2.x, epsilon) && closeTo(this.y, vec2.y, epsilon);
	    }
	    closeToManhattan(vec2, epsilon = EPSILON) {
	        return this.distanceToManhattan(vec2) <= epsilon;
	    }
	    clone() {
	        return new Vector2(this.x, this.y);
	    }
	    cross(vec2) {
	        return this.x * vec2.y - this.y * vec2.x;
	    }
	    distanceTo(vec2) {
	        return Math.sqrt(this.distanceToSquared(vec2));
	    }
	    distanceToManhattan(vec2) {
	        return Math.abs(this.x - vec2.x) + Math.abs(this.y - vec2.y);
	    }
	    distanceToSquared(vec2) {
	        x = this.x - vec2.x;
	        y = this.y - vec2.y;
	        return x * x + y * y;
	    }
	    divide(v) {
	        this.x /= v.x;
	        this.y /= v.y;
	        return this;
	    }
	    divideScalar(scalar) {
	        return this.multiplyScalar(1 / scalar);
	    }
	    dot(vec2) {
	        return this.x * vec2.x + this.y * vec2.y;
	    }
	    equals(vec2) {
	        return vec2.x === this.x && vec2.y === this.y;
	    }
	    floor() {
	        this.x = Math.floor(this.x);
	        this.y = Math.floor(this.y);
	        return this;
	    }
	    from(vec2) {
	        this.x = vec2.x;
	        this.y = vec2.y;
	        return this;
	    }
	    fromArray(arr, index = 0) {
	        this.x = arr[index];
	        this.y = arr[index + 1];
	        return this;
	    }
	    fromPolar(p) {
	        this.x = Math.cos(p.a) * p.r;
	        this.y = Math.sin(p.a) * p.r;
	        return this;
	    }
	    fromScalar(value = 0) {
	        this.x = this.y = value;
	        return this;
	    }
	    length() {
	        return Math.sqrt(this.x * this.x + this.y * this.y);
	    }
	    lengthManhattan() {
	        return Math.abs(this.x) + Math.abs(this.y);
	    }
	    lengthSquared() {
	        return this.x * this.x + this.y * this.y;
	    }
	    lerp(vec2, alpha) {
	        this.x += (vec2.x - this.x) * alpha;
	        this.y += (vec2.y - this.y) * alpha;
	        return this;
	    }
	    max(vec2) {
	        this.x = Math.max(this.x, vec2.x);
	        this.y = Math.max(this.y, vec2.y);
	        return this;
	    }
	    min(vec2) {
	        this.x = Math.min(this.x, vec2.x);
	        this.y = Math.min(this.y, vec2.y);
	        return this;
	    }
	    minus(vec2) {
	        this.x -= vec2.x;
	        this.y -= vec2.y;
	        return this;
	    }
	    minusScalar(num) {
	        this.x -= num;
	        this.y -= num;
	        return this;
	    }
	    minusVectors(...vecArr) {
	        len$1 = vecArr.length;
	        for (let i = 0; i < len$1; i++) {
	            this.minus(vecArr[i]);
	        }
	        return this;
	    }
	    multiplyScalar(scalar) {
	        this.x *= scalar;
	        this.y *= scalar;
	        return this;
	    }
	    negate() {
	        this.x = -this.x;
	        this.y = -this.y;
	        return this;
	    }
	    normalize() {
	        return this.divideScalar(this.length() || 1);
	    }
	    rotate(angle, center = { x: 0, y: 0 }) {
	        c = Math.cos(angle);
	        s = Math.sin(angle);
	        x = this.x - center.x;
	        y = this.y - center.y;
	        this.x = x * c - y * s + center.x;
	        this.y = x * s + y * c + center.y;
	        return this;
	    }
	    round() {
	        this.x = Math.round(this.x);
	        this.y = Math.round(this.y);
	        return this;
	    }
	    floorToZero() {
	        this.x = floorToZero(this.x);
	        this.y = floorToZero(this.y);
	        return this;
	    }
	    set(x = 0, y = 0) {
	        this.x = x;
	        this.y = y;
	        return this;
	    }
	    setLength(length) {
	        return this.normalize().multiplyScalar(length);
	    }
	    setX(x = 0) {
	        this.x = x;
	        return this;
	    }
	    setY(y = 0) {
	        this.y = y;
	        return this;
	    }
	    toArray(arr = []) {
	        arr[0] = this.x;
	        arr[1] = this.y;
	        return arr;
	    }
	    toJson(json = { x: 0, y: 0 }) {
	        json.x = this.x;
	        json.y = this.y;
	        return json;
	    }
	    toPalorJson(p = { a: 0, r: 0 }) {
	        p.r = this.length();
	        p.a = this.angle();
	        return p;
	    }
	    toString() {
	        return `(${this.x}, ${this.y})`;
	    }
	}

	/**
	 * @classdesc 三维向量
	 * @class
	 * @name Mathx.Vector3
	 */
	class Vector3 {
	}

	exports.Polar = Polar;
	exports.Vector2 = Vector2;
	exports.Vector3 = Vector3;
	exports.clamp = clamp;
	exports.clampCircle = clampCircle;
	exports.clampSafe = clampSafe;
	exports.closeTo = closeTo;
	exports.floorToZero = floorToZero;
	exports.sum = sum$1;
	exports.sumArray = sumArray;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=Mathx.js.map
