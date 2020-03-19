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
var clamp = (function (val, min, max) {
    return Math.max(min, Math.min(max, val));
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
var clampSafe = (function (val, a, b) {
    if (a > b) {
        return Math.max(b, Math.min(a, val));
    }
    else if (b > a) {
        return Math.max(a, Math.min(b, val));
    }
    return a;
});

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
var closeTo = (function (val, target, epsilon) {
    if (epsilon === void 0) { epsilon = EPSILON; }
    return Math.abs(val - target) <= epsilon;
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
var floorToZero = (function (num) {
    return num < 0 ? Math.ceil(num) : Math.floor(num);
});

var len, x, y, c, s;
/**
 * @class
 * @classdesc 二维向量
 * @implements {Mathx.IVector2}
 * @name Mathx.Vector2
 * @desc 极坐标，遵守数学右手定则。规定逆时针方向为正方向。
 * @param {number} [x=0] | 距离极点距离
 * @param {number} [y=0] | 旋转弧度，规定0弧度为笛卡尔坐标系x轴方向
 */
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vector2.create = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        return new Vector2(x, y);
    };
    Vector2.prototype.add = function (vec2) {
        this.x += vec2.x;
        this.y += vec2.y;
        return this;
    };
    Vector2.prototype.addScalar = function (num) {
        this.x += num;
        this.y += num;
        return this;
    };
    Vector2.prototype.addVectors = function () {
        var vecArr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vecArr[_i] = arguments[_i];
        }
        len = vecArr.length;
        for (var i = 0; i < len; i++) {
            this.add(vecArr[i]);
        }
        return this;
    };
    Vector2.prototype.angle = function () {
        return Math.atan2(this.y, this.x);
    };
    Vector2.prototype.ceil = function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    };
    Vector2.prototype.clamp = function (min, max) {
        this.x = clamp(this.x, min.x, max.x);
        this.y = clamp(this.y, min.y, max.y);
        return this;
    };
    Vector2.prototype.clampSafe = function (min, max) {
        this.x = clampSafe(this.x, min.x, max.x);
        this.y = clampSafe(this.y, min.y, max.y);
        return this;
    };
    Vector2.prototype.clampLength = function (min, max) {
        len = this.length();
        return this.divideScalar(len || 1).multiplyScalar(clamp(len, min, max));
    };
    Vector2.prototype.clampScalar = function (min, max) {
        this.x = clamp(this.x, min, max);
        this.y = clamp(this.y, min, max);
        return this;
    };
    Vector2.prototype.closeTo = function (vec2, epsilon) {
        if (epsilon === void 0) { epsilon = EPSILON; }
        return this.distanceTo(vec2) <= epsilon;
    };
    Vector2.prototype.closeToRect = function (vec2, epsilon) {
        if (epsilon === void 0) { epsilon = EPSILON; }
        return closeTo(this.x, vec2.x, epsilon) && closeTo(this.y, vec2.y, epsilon);
    };
    Vector2.prototype.closeToManhattan = function (vec2, epsilon) {
        if (epsilon === void 0) { epsilon = EPSILON; }
        return this.distanceToManhattan(vec2) <= epsilon;
    };
    Vector2.prototype.clone = function () {
        return new Vector2(this.x, this.y);
    };
    Vector2.prototype.cross = function (vec2) {
        return this.x * vec2.y - this.y * vec2.x;
    };
    Vector2.prototype.distanceTo = function (vec2) {
        return Math.sqrt(this.distanceToSquared(vec2));
    };
    Vector2.prototype.distanceToManhattan = function (vec2) {
        return Math.abs(this.x - vec2.x) + Math.abs(this.y - vec2.y);
    };
    Vector2.prototype.distanceToSquared = function (vec2) {
        x = this.x - vec2.x;
        y = this.y - vec2.y;
        return x * x + y * y;
    };
    Vector2.prototype.divide = function (v) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    };
    Vector2.prototype.divideScalar = function (scalar) {
        return this.multiplyScalar(1 / scalar);
    };
    Vector2.prototype.dot = function (vec2) {
        return this.x * vec2.x + this.y * vec2.y;
    };
    Vector2.prototype.equals = function (vec2) {
        return vec2.x === this.x && vec2.y === this.y;
    };
    Vector2.prototype.floor = function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    };
    Vector2.prototype.from = function (vec2) {
        this.x = vec2.x;
        this.y = vec2.y;
        return this;
    };
    Vector2.prototype.fromArray = function (arr, index) {
        if (index === void 0) { index = 0; }
        this.x = arr[index];
        this.y = arr[index + 1];
        return this;
    };
    Vector2.prototype.fromPolar = function (p) {
        this.x = Math.cos(p.a) * p.r;
        this.y = Math.sin(p.a) * p.r;
        return this;
    };
    Vector2.prototype.fromScalar = function (value) {
        if (value === void 0) { value = 0; }
        this.x = this.y = value;
        return this;
    };
    Vector2.prototype.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vector2.prototype.lengthManhattan = function () {
        return Math.abs(this.x) + Math.abs(this.y);
    };
    Vector2.prototype.lengthSquared = function () {
        return this.x * this.x + this.y * this.y;
    };
    Vector2.prototype.lerp = function (vec2, alpha) {
        this.x += (vec2.x - this.x) * alpha;
        this.y += (vec2.y - this.y) * alpha;
        return this;
    };
    Vector2.prototype.max = function (vec2) {
        this.x = Math.max(this.x, vec2.x);
        this.y = Math.max(this.y, vec2.y);
        return this;
    };
    Vector2.prototype.min = function (vec2) {
        this.x = Math.min(this.x, vec2.x);
        this.y = Math.min(this.y, vec2.y);
        return this;
    };
    Vector2.prototype.minus = function (vec2) {
        this.x -= vec2.x;
        this.y -= vec2.y;
        return this;
    };
    Vector2.prototype.minusScalar = function (num) {
        this.x -= num;
        this.y -= num;
        return this;
    };
    Vector2.prototype.minusVectors = function () {
        var vecArr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vecArr[_i] = arguments[_i];
        }
        len = vecArr.length;
        for (var i = 0; i < len; i++) {
            this.minus(vecArr[i]);
        }
        return this;
    };
    Vector2.prototype.multiplyScalar = function (scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    };
    Vector2.prototype.negate = function () {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    };
    Vector2.prototype.normalize = function () {
        return this.divideScalar(this.length() || 1);
    };
    Vector2.prototype.rotate = function (angle, center) {
        if (center === void 0) { center = { x: 0, y: 0 }; }
        c = Math.cos(angle);
        s = Math.sin(angle);
        x = this.x - center.x;
        y = this.y - center.y;
        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;
        return this;
    };
    Vector2.prototype.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    };
    Vector2.prototype.floorToZero = function () {
        this.x = floorToZero(this.x);
        this.y = floorToZero(this.y);
        return this;
    };
    Vector2.prototype.set = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
        return this;
    };
    Vector2.prototype.setLength = function (length) {
        return this.normalize().multiplyScalar(length);
    };
    Vector2.prototype.setX = function (x) {
        if (x === void 0) { x = 0; }
        this.x = x;
        return this;
    };
    Vector2.prototype.setY = function (y) {
        if (y === void 0) { y = 0; }
        this.y = y;
        return this;
    };
    Vector2.prototype.toArray = function (arr) {
        if (arr === void 0) { arr = []; }
        arr[0] = this.x;
        arr[1] = this.y;
        return arr;
    };
    Vector2.prototype.toJson = function (json) {
        if (json === void 0) { json = { x: 0, y: 0 }; }
        json.x = this.x;
        json.y = this.y;
        return json;
    };
    Vector2.prototype.toPalor = function (p) {
        if (p === void 0) { p = new Polar(); }
        p.r = this.length();
        p.a = this.angle();
        return p;
    };
    Vector2.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ")";
    };
    return Vector2;
}());

/**
 * @class
 * @classdesc 极坐标
 * @implements {Mathx.IPolar}
 * @name Mathx.Polar
 * @desc 极坐标，遵守数学右手定则。规定逆时针方向为正方向。
 * @param {number} [r=0] | 距离极点距离
 * @param {number} [a=0] | 旋转弧度，规定0弧度为笛卡尔坐标系x轴方向
 */
var Polar = /** @class */ (function () {
    /**
     * @public
     * @inner
     * @member {number} a
     * @desc 旋转弧度
     * @default 0
     * @memberof Mathx.Polar
     */
    /**
     * @public
     * @inner
     * @member {number} r
     * @desc 距离
     * @default 0
     * @memberof Mathx.Polar
     */
    function Polar(r, a) {
        if (r === void 0) { r = 0; }
        if (a === void 0) { a = 0; }
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
    Polar.create = function (r, a) {
        if (r === void 0) { r = 0; }
        if (a === void 0) { a = 0; }
        return new Polar(r, a);
    };
    /**
     * @public
     * @method distanceTo
     * @memberof Mathx.Polar
     * @desc 求该坐标到另一个极坐标的欧几里得距离
     * @param {Mathx.IPolar} p | 目标极坐标
     * @returns {number} 欧几里得距离
     */
    Polar.prototype.distanceTo = function (p) {
        return Math.sqrt(this.distanceToSquared(p));
    };
    /**
     * @public
     * @method distanceToManhattan
     * @memberof Mathx.Polar
     * @desc 求该坐标到另一个极坐标的曼哈顿距离
     * @param {Mathx.IPolar} p | 目标极坐标
     * @returns {number} 曼哈顿距离
     */
    Polar.prototype.distanceToManhattan = function (_a) {
        var r = _a.r, a = _a.a;
        return Math.cos(a) * r - this.x() + Math.sin(a) * r - this.y();
    };
    Polar.prototype.distanceToSquared = function (_a) {
        var r = _a.r, a = _a.a;
        return this.r * this.r + r * r - 2 * r * this.r * Math.cos(a - this.a);
    };
    Polar.prototype.fromVector2 = function (_a) {
        var x = _a.x, y = _a.y;
        this.r = Math.sqrt(x * x + y * y);
        this.a = Math.atan2(y, x);
        return this;
    };
    Polar.prototype.lengthManhattan = function () {
        return (Math.cos(this.a) + Math.sin(this.a)) * this.r;
    };
    Polar.prototype.set = function (r, a) {
        if (r === void 0) { r = 1; }
        if (a === void 0) { a = 0; }
        this.r = r;
        this.a = a;
        return this;
    };
    Polar.prototype.setA = function (a) {
        if (a === void 0) { a = 0; }
        this.a = a;
        return this;
    };
    Polar.prototype.setR = function (r) {
        if (r === void 0) { r = 0; }
        this.r = r;
        return this;
    };
    Polar.prototype.toJson = function (json) {
        if (json === void 0) { json = { a: 0, r: 0 }; }
        json.r = this.r;
        json.a = this.a;
        return json;
    };
    Polar.prototype.toString = function () {
        return "(" + this.r + ", " + this.a + ")";
    };
    Polar.prototype.toVector2 = function (vec2) {
        if (vec2 === void 0) { vec2 = new Vector2(); }
        vec2.x = this.x();
        vec2.y = this.y();
        return vec2;
    };
    Polar.prototype.x = function () {
        return Math.cos(this.a) * this.r;
    };
    Polar.prototype.y = function () {
        return Math.sin(this.a) * this.r;
    };
    return Polar;
}());

var len$1, x$1, y$1, c$1, s$1;
/**
 * @class
 * @classdesc 二维向量
 * @implements {Mathx.IVector2}
 * @name Mathx.Vector2
 * @desc 极坐标，遵守数学右手定则。规定逆时针方向为正方向。
 * @param {number} [x=0] | 距离极点距离
 * @param {number} [y=0] | 旋转弧度，规定0弧度为笛卡尔坐标系x轴方向
 */
var Vector2$1 = /** @class */ (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vector2.create = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        return new Vector2(x, y);
    };
    Vector2.prototype.add = function (vec2) {
        this.x += vec2.x;
        this.y += vec2.y;
        return this;
    };
    Vector2.prototype.addScalar = function (num) {
        this.x += num;
        this.y += num;
        return this;
    };
    Vector2.prototype.addVectors = function () {
        var vecArr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vecArr[_i] = arguments[_i];
        }
        len$1 = vecArr.length;
        for (var i = 0; i < len$1; i++) {
            this.add(vecArr[i]);
        }
        return this;
    };
    Vector2.prototype.angle = function () {
        return Math.atan2(this.y, this.x);
    };
    Vector2.prototype.ceil = function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    };
    Vector2.prototype.clamp = function (min, max) {
        this.x = clamp(this.x, min.x, max.x);
        this.y = clamp(this.y, min.y, max.y);
        return this;
    };
    Vector2.prototype.clampSafe = function (min, max) {
        this.x = clampSafe(this.x, min.x, max.x);
        this.y = clampSafe(this.y, min.y, max.y);
        return this;
    };
    Vector2.prototype.clampLength = function (min, max) {
        len$1 = this.length();
        return this.divideScalar(len$1 || 1).multiplyScalar(clamp(len$1, min, max));
    };
    Vector2.prototype.clampScalar = function (min, max) {
        this.x = clamp(this.x, min, max);
        this.y = clamp(this.y, min, max);
        return this;
    };
    Vector2.prototype.closeTo = function (vec2, epsilon) {
        if (epsilon === void 0) { epsilon = EPSILON; }
        return this.distanceTo(vec2) <= epsilon;
    };
    Vector2.prototype.closeToRect = function (vec2, epsilon) {
        if (epsilon === void 0) { epsilon = EPSILON; }
        return closeTo(this.x, vec2.x, epsilon) && closeTo(this.y, vec2.y, epsilon);
    };
    Vector2.prototype.closeToManhattan = function (vec2, epsilon) {
        if (epsilon === void 0) { epsilon = EPSILON; }
        return this.distanceToManhattan(vec2) <= epsilon;
    };
    Vector2.prototype.clone = function () {
        return new Vector2(this.x, this.y);
    };
    Vector2.prototype.cross = function (vec2) {
        return this.x * vec2.y - this.y * vec2.x;
    };
    Vector2.prototype.distanceTo = function (vec2) {
        return Math.sqrt(this.distanceToSquared(vec2));
    };
    Vector2.prototype.distanceToManhattan = function (vec2) {
        return Math.abs(this.x - vec2.x) + Math.abs(this.y - vec2.y);
    };
    Vector2.prototype.distanceToSquared = function (vec2) {
        x$1 = this.x - vec2.x;
        y$1 = this.y - vec2.y;
        return x$1 * x$1 + y$1 * y$1;
    };
    Vector2.prototype.divide = function (v) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    };
    Vector2.prototype.divideScalar = function (scalar) {
        return this.multiplyScalar(1 / scalar);
    };
    Vector2.prototype.dot = function (vec2) {
        return this.x * vec2.x + this.y * vec2.y;
    };
    Vector2.prototype.equals = function (vec2) {
        return vec2.x === this.x && vec2.y === this.y;
    };
    Vector2.prototype.floor = function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    };
    Vector2.prototype.from = function (vec2) {
        this.x = vec2.x;
        this.y = vec2.y;
        return this;
    };
    Vector2.prototype.fromArray = function (arr, index) {
        if (index === void 0) { index = 0; }
        this.x = arr[index];
        this.y = arr[index + 1];
        return this;
    };
    Vector2.prototype.fromPolar = function (p) {
        this.x = Math.cos(p.a) * p.r;
        this.y = Math.sin(p.a) * p.r;
        return this;
    };
    Vector2.prototype.fromScalar = function (value) {
        if (value === void 0) { value = 0; }
        this.x = this.y = value;
        return this;
    };
    Vector2.prototype.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vector2.prototype.lengthManhattan = function () {
        return Math.abs(this.x) + Math.abs(this.y);
    };
    Vector2.prototype.lengthSquared = function () {
        return this.x * this.x + this.y * this.y;
    };
    Vector2.prototype.lerp = function (vec2, alpha) {
        this.x += (vec2.x - this.x) * alpha;
        this.y += (vec2.y - this.y) * alpha;
        return this;
    };
    Vector2.prototype.max = function (vec2) {
        this.x = Math.max(this.x, vec2.x);
        this.y = Math.max(this.y, vec2.y);
        return this;
    };
    Vector2.prototype.min = function (vec2) {
        this.x = Math.min(this.x, vec2.x);
        this.y = Math.min(this.y, vec2.y);
        return this;
    };
    Vector2.prototype.minus = function (vec2) {
        this.x -= vec2.x;
        this.y -= vec2.y;
        return this;
    };
    Vector2.prototype.minusScalar = function (num) {
        this.x -= num;
        this.y -= num;
        return this;
    };
    Vector2.prototype.minusVectors = function () {
        var vecArr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vecArr[_i] = arguments[_i];
        }
        len$1 = vecArr.length;
        for (var i = 0; i < len$1; i++) {
            this.minus(vecArr[i]);
        }
        return this;
    };
    Vector2.prototype.multiplyScalar = function (scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    };
    Vector2.prototype.negate = function () {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    };
    Vector2.prototype.normalize = function () {
        return this.divideScalar(this.length() || 1);
    };
    Vector2.prototype.rotate = function (angle, center) {
        if (center === void 0) { center = { x: 0, y: 0 }; }
        c$1 = Math.cos(angle);
        s$1 = Math.sin(angle);
        x$1 = this.x - center.x;
        y$1 = this.y - center.y;
        this.x = x$1 * c$1 - y$1 * s$1 + center.x;
        this.y = x$1 * s$1 + y$1 * c$1 + center.y;
        return this;
    };
    Vector2.prototype.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    };
    Vector2.prototype.floorToZero = function () {
        this.x = floorToZero(this.x);
        this.y = floorToZero(this.y);
        return this;
    };
    Vector2.prototype.set = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
        return this;
    };
    Vector2.prototype.setLength = function (length) {
        return this.normalize().multiplyScalar(length);
    };
    Vector2.prototype.setX = function (x) {
        if (x === void 0) { x = 0; }
        this.x = x;
        return this;
    };
    Vector2.prototype.setY = function (y) {
        if (y === void 0) { y = 0; }
        this.y = y;
        return this;
    };
    Vector2.prototype.toArray = function (arr) {
        if (arr === void 0) { arr = []; }
        arr[0] = this.x;
        arr[1] = this.y;
        return arr;
    };
    Vector2.prototype.toJson = function (json) {
        if (json === void 0) { json = { x: 0, y: 0 }; }
        json.x = this.x;
        json.y = this.y;
        return json;
    };
    Vector2.prototype.toPalor = function (p) {
        if (p === void 0) { p = new Polar(); }
        p.r = this.length();
        p.a = this.angle();
        return p;
    };
    Vector2.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ")";
    };
    return Vector2;
}());

/**
 * @classdesc 三维向量
 * @class
 * @name Mathx.Vector3
 */
var Vector3 = /** @class */ (function () {
    function Vector3() {
    }
    return Vector3;
}());

export { Polar, Vector2$1 as Vector2, Vector3 };
//# sourceMappingURL=Mathx.legacy.module.js.map
