// three.js - http://github.com/mrdoob/three.js
'use strict';
var THREE = THREE || {
  REVISION: "59"
};
self.console = self.console || {
  info: function () {},
  log: function () {},
  debug: function () {},
  warn: function () {},
  error: function () {}
};
String.prototype.trim = String.prototype.trim || function () {
  return this.replace(/^\s+|\s+$/g, "")
};
THREE.extend = function (a, b) {
  if (Object.keys)
    for (var c = Object.keys(b), d = 0, e = c.length; d < e; d++) {
      var f = c[d];
      Object.defineProperty(a, f, Object.getOwnPropertyDescriptor(b, f))
    } else
      for (f in c = {}.hasOwnProperty, b) c.call(b, f) && (a[f] = b[f]);
  return a
};
(function () {
  for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !self.requestAnimationFrame; ++c) self.requestAnimationFrame = self[b[c] + "RequestAnimationFrame"], self.cancelAnimationFrame = self[b[c] + "CancelAnimationFrame"] || self[b[c] + "CancelRequestAnimationFrame"];
  void 0 === self.requestAnimationFrame && void 0 !== self.setTimeout && (self.requestAnimationFrame = function (b) {
    var c = Date.now(),
      f = Math.max(0, 16 - (c - a)),
      h = self.setTimeout(function () {
        b(c + f)
      }, f);
    a = c + f;
    return h
  });
  void 0 === self.cancelAnimationFrame && void 0 !==
    self.clearTimeout && (self.cancelAnimationFrame = function (a) {
      self.clearTimeout(a)
    })
})();
THREE.CullFaceNone = 0;
THREE.CullFaceBack = 1;
THREE.CullFaceFront = 2;
THREE.CullFaceFrontBack = 3;
THREE.FrontFaceDirectionCW = 0;
THREE.FrontFaceDirectionCCW = 1;
THREE.BasicShadowMap = 0;
THREE.PCFShadowMap = 1;
THREE.PCFSoftShadowMap = 2;
THREE.FrontSide = 0;
THREE.BackSide = 1;
THREE.DoubleSide = 2;
THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;
THREE.NoBlending = 0;
THREE.NormalBlending = 1;
THREE.AdditiveBlending = 2;
THREE.SubtractiveBlending = 3;
THREE.MultiplyBlending = 4;
THREE.CustomBlending = 5;
THREE.AddEquation = 100;
THREE.SubtractEquation = 101;
THREE.ReverseSubtractEquation = 102;
THREE.ZeroFactor = 200;
THREE.OneFactor = 201;
THREE.SrcColorFactor = 202;
THREE.OneMinusSrcColorFactor = 203;
THREE.SrcAlphaFactor = 204;
THREE.OneMinusSrcAlphaFactor = 205;
THREE.DstAlphaFactor = 206;
THREE.OneMinusDstAlphaFactor = 207;
THREE.DstColorFactor = 208;
THREE.OneMinusDstColorFactor = 209;
THREE.SrcAlphaSaturateFactor = 210;
THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.AddOperation = 2;
THREE.UVMapping = function () {};
THREE.CubeReflectionMapping = function () {};
THREE.CubeRefractionMapping = function () {};
THREE.SphericalReflectionMapping = function () {};
THREE.SphericalRefractionMapping = function () {};
THREE.RepeatWrapping = 1E3;
THREE.ClampToEdgeWrapping = 1001;
THREE.MirroredRepeatWrapping = 1002;
THREE.NearestFilter = 1003;
THREE.NearestMipMapNearestFilter = 1004;
THREE.NearestMipMapLinearFilter = 1005;
THREE.LinearFilter = 1006;
THREE.LinearMipMapNearestFilter = 1007;
THREE.LinearMipMapLinearFilter = 1008;
THREE.UnsignedByteType = 1009;
THREE.ByteType = 1010;
THREE.ShortType = 1011;
THREE.UnsignedShortType = 1012;
THREE.IntType = 1013;
THREE.UnsignedIntType = 1014;
THREE.FloatType = 1015;
THREE.UnsignedShort4444Type = 1016;
THREE.UnsignedShort5551Type = 1017;
THREE.UnsignedShort565Type = 1018;
THREE.AlphaFormat = 1019;
THREE.RGBFormat = 1020;
THREE.RGBAFormat = 1021;
THREE.LuminanceFormat = 1022;
THREE.LuminanceAlphaFormat = 1023;
THREE.RGB_S3TC_DXT1_Format = 2001;
THREE.RGBA_S3TC_DXT1_Format = 2002;
THREE.RGBA_S3TC_DXT3_Format = 2003;
THREE.RGBA_S3TC_DXT5_Format = 2004;
THREE.Color = function (a) {
  void 0 !== a && this.set(a);
  return this
};
THREE.Color.prototype = {
  constructor: THREE.Color,
  r: 1,
  g: 1,
  b: 1,
  set: function (a) {
    a instanceof THREE.Color ? this.copy(a) : "number" === typeof a ? this.setHex(a) : "string" === typeof a && this.setStyle(a);
    return this
  },
  setHex: function (a) {
    a = Math.floor(a);
    this.r = (a >> 16 & 255) / 255;
    this.g = (a >> 8 & 255) / 255;
    this.b = (a & 255) / 255;
    return this
  },
  setRGB: function (a, b, c) {
    this.r = a;
    this.g = b;
    this.b = c;
    return this
  },
  setHSL: function (a, b, c) {
    if (0 === b) this.r = this.g = this.b = c;
    else {
      var d = function (a, b, c) {
          0 > c && (c += 1);
          1 < c && (c -= 1);
          return c < 1 / 6 ? a + 6 * (b - a) *
            c : 0.5 > c ? b : c < 2 / 3 ? a + 6 * (b - a) * (2 / 3 - c) : a
        },
        b = 0.5 >= c ? c * (1 + b) : c + b - c * b,
        c = 2 * c - b;
      this.r = d(c, b, a + 1 / 3);
      this.g = d(c, b, a);
      this.b = d(c, b, a - 1 / 3)
    }
    return this
  },
  setStyle: function (a) {
    if (/^rgb\((\d+),(\d+),(\d+)\)$/i.test(a)) return a = /^rgb\((\d+),(\d+),(\d+)\)$/i.exec(a), this.r = Math.min(255, parseInt(a[1], 10)) / 255, this.g = Math.min(255, parseInt(a[2], 10)) / 255, this.b = Math.min(255, parseInt(a[3], 10)) / 255, this;
    if (/^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.test(a)) return a = /^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.exec(a), this.r = Math.min(100,
      parseInt(a[1], 10)) / 100, this.g = Math.min(100, parseInt(a[2], 10)) / 100, this.b = Math.min(100, parseInt(a[3], 10)) / 100, this;
    if (/^\#([0-9a-f]{6})$/i.test(a)) return a = /^\#([0-9a-f]{6})$/i.exec(a), this.setHex(parseInt(a[1], 16)), this;
    if (/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(a)) return a = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(a), this.setHex(parseInt(a[1] + a[1] + a[2] + a[2] + a[3] + a[3], 16)), this;
    if (/^(\w+)$/i.test(a)) return this.setHex(THREE.ColorKeywords[a]), this
  },
  copy: function (a) {
    this.r = a.r;
    this.g = a.g;
    this.b =
      a.b;
    return this
  },
  copyGammaToLinear: function (a) {
    this.r = a.r * a.r;
    this.g = a.g * a.g;
    this.b = a.b * a.b;
    return this
  },
  copyLinearToGamma: function (a) {
    this.r = Math.sqrt(a.r);
    this.g = Math.sqrt(a.g);
    this.b = Math.sqrt(a.b);
    return this
  },
  convertGammaToLinear: function () {
    var a = this.r,
      b = this.g,
      c = this.b;
    this.r = a * a;
    this.g = b * b;
    this.b = c * c;
    return this
  },
  convertLinearToGamma: function () {
    this.r = Math.sqrt(this.r);
    this.g = Math.sqrt(this.g);
    this.b = Math.sqrt(this.b);
    return this
  },
  getHex: function () {
    return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 *
      this.b << 0
  },
  getHexString: function () {
    return ("000000" + this.getHex().toString(16)).slice(-6)
  },
  getHSL: function () {
    var a = {
      h: 0,
      s: 0,
      l: 0
    };
    return function () {
      var b = this.r,
        c = this.g,
        d = this.b,
        e = Math.max(b, c, d),
        f = Math.min(b, c, d),
        h, g = (f + e) / 2;
      if (f === e) f = h = 0;
      else {
        var i = e - f,
          f = 0.5 >= g ? i / (e + f) : i / (2 - e - f);
        switch (e) {
          case b:
            h = (c - d) / i + (c < d ? 6 : 0);
            break;
          case c:
            h = (d - b) / i + 2;
            break;
          case d:
            h = (b - c) / i + 4
        }
        h /= 6
      }
      a.h = h;
      a.s = f;
      a.l = g;
      return a
    }
  }(),
  getStyle: function () {
    return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
  },
  offsetHSL: function (a,
    b, c) {
    var d = this.getHSL();
    d.h += a;
    d.s += b;
    d.l += c;
    this.setHSL(d.h, d.s, d.l);
    return this
  },
  add: function (a) {
    this.r += a.r;
    this.g += a.g;
    this.b += a.b;
    return this
  },
  addColors: function (a, b) {
    this.r = a.r + b.r;
    this.g = a.g + b.g;
    this.b = a.b + b.b;
    return this
  },
  addScalar: function (a) {
    this.r += a;
    this.g += a;
    this.b += a;
    return this
  },
  multiply: function (a) {
    this.r *= a.r;
    this.g *= a.g;
    this.b *= a.b;
    return this
  },
  multiplyScalar: function (a) {
    this.r *= a;
    this.g *= a;
    this.b *= a;
    return this
  },
  lerp: function (a, b) {
    this.r += (a.r - this.r) * b;
    this.g += (a.g - this.g) * b;
    this.b += (a.b - this.b) * b;
    return this
  },
  equals: function (a) {
    return a.r === this.r && a.g === this.g && a.b === this.b
  },
  clone: function () {
    return (new THREE.Color).setRGB(this.r, this.g, this.b)
  }
};
THREE.ColorKeywords = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
THREE.Quaternion = function (a, b, c, d) {
  this._x = a || 0;
  this._y = b || 0;
  this._z = c || 0;
  this._w = void 0 !== d ? d : 1
};
THREE.Quaternion.prototype = {
  constructor: THREE.Quaternion,
  _x: 0,
  _y: 0,
  _z: 0,
  _w: 0,
  _euler: void 0,
  _updateEuler: function () {
    void 0 !== this._euler && this._euler.setFromQuaternion(this, void 0, !1)
  },
  get x() {
    return this._x
  },
  set x(a) {
    this._x = a;
    this._updateEuler()
  },
  get y() {
    return this._y
  },
  set y(a) {
    this._y = a;
    this._updateEuler()
  },
  get z() {
    return this._z
  },
  set z(a) {
    this._z = a;
    this._updateEuler()
  },
  get w() {
    return this._w
  },
  set w(a) {
    this._w = a;
    this._updateEuler()
  },
  set: function (a, b, c, d) {
    this._x = a;
    this._y = b;
    this._z = c;
    this._w = d;
    this._updateEuler();
    return this
  },
  copy: function (a) {
    this._x = a._x;
    this._y = a._y;
    this._z = a._z;
    this._w = a._w;
    this._updateEuler();
    return this
  },
  setFromEuler: function (a, b) {
    void 0 === typeof a.order && console.error("ERROR: Quaternion's .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.  Please update your code.");
    var c = Math.cos(a._x / 2),
      d = Math.cos(a._y / 2),
      e = Math.cos(a._z / 2),
      f = Math.sin(a._x / 2),
      h = Math.sin(a._y / 2),
      g = Math.sin(a._z / 2);
    void 0 === a.order || "XYZ" === a.order ? (this._x = f * d * e + c * h * g,
      this._y = c * h * e - f * d * g, this._z = c * d * g + f * h * e, this._w = c * d * e - f * h * g) : "YXZ" === a.order ? (this._x = f * d * e + c * h * g, this._y = c * h * e - f * d * g, this._z = c * d * g - f * h * e, this._w = c * d * e + f * h * g) : "ZXY" === a.order ? (this._x = f * d * e - c * h * g, this._y = c * h * e + f * d * g, this._z = c * d * g + f * h * e, this._w = c * d * e - f * h * g) : "ZYX" === a.order ? (this._x = f * d * e - c * h * g, this._y = c * h * e + f * d * g, this._z = c * d * g - f * h * e, this._w = c * d * e + f * h * g) : "YZX" === a.order ? (this._x = f * d * e + c * h * g, this._y = c * h * e + f * d * g, this._z = c * d * g - f * h * e, this._w = c * d * e - f * h * g) : "XZY" === a.order && (this._x = f * d * e - c * h * g, this._y = c *
      h * e - f * d * g, this._z = c * d * g + f * h * e, this._w = c * d * e + f * h * g);
    !1 !== b && this._updateEuler();
    return this
  },
  setFromAxisAngle: function (a, b) {
    var c = b / 2,
      d = Math.sin(c);
    this._x = a.x * d;
    this._y = a.y * d;
    this._z = a.z * d;
    this._w = Math.cos(c);
    this._updateEuler();
    return this
  },
  setFromRotationMatrix: function (a) {
    var b = a.elements,
      c = b[0],
      a = b[4],
      d = b[8],
      e = b[1],
      f = b[5],
      h = b[9],
      g = b[2],
      i = b[6],
      b = b[10],
      j = c + f + b;
    0 < j ? (c = 0.5 / Math.sqrt(j + 1), this._w = 0.25 / c, this._x = (i - h) * c, this._y = (d - g) * c, this._z = (e - a) * c) : c > f && c > b ? (c = 2 * Math.sqrt(1 + c - f - b), this._w = (i - h) /
      c, this._x = 0.25 * c, this._y = (a + e) / c, this._z = (d + g) / c) : f > b ? (c = 2 * Math.sqrt(1 + f - c - b), this._w = (d - g) / c, this._x = (a + e) / c, this._y = 0.25 * c, this._z = (h + i) / c) : (c = 2 * Math.sqrt(1 + b - c - f), this._w = (e - a) / c, this._x = (d + g) / c, this._y = (h + i) / c, this._z = 0.25 * c);
    this._updateEuler();
    return this
  },
  inverse: function () {
    this.conjugate().normalize();
    return this
  },
  conjugate: function () {
    this._x *= -1;
    this._y *= -1;
    this._z *= -1;
    this._updateEuler();
    return this
  },
  lengthSq: function () {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
  },
  length: function () {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
  },
  normalize: function () {
    var a = this.length();
    0 === a ? (this._z = this._y = this._x = 0, this._w = 1) : (a = 1 / a, this._x *= a, this._y *= a, this._z *= a, this._w *= a);
    return this
  },
  multiply: function (a, b) {
    return void 0 !== b ? (console.warn("DEPRECATED: Quaternion's .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(a, b)) : this.multiplyQuaternions(this, a)
  },
  multiplyQuaternions: function (a,
    b) {
    var c = a._x,
      d = a._y,
      e = a._z,
      f = a._w,
      h = b._x,
      g = b._y,
      i = b._z,
      j = b._w;
    this._x = c * j + f * h + d * i - e * g;
    this._y = d * j + f * g + e * h - c * i;
    this._z = e * j + f * i + c * g - d * h;
    this._w = f * j - c * h - d * g - e * i;
    this._updateEuler();
    return this
  },
  multiplyVector3: function (a) {
    console.warn("DEPRECATED: Quaternion's .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.");
    return a.applyQuaternion(this)
  },
  slerp: function (a, b) {
    var c = this._x,
      d = this._y,
      e = this._z,
      f = this._w,
      h = f * a._w + c * a._x + d * a._y + e * a._z;
    0 > h ? (this._w = -a._w, this._x = -a._x, this._y = -a._y, this._z = -a._z, h = -h) : this.copy(a);
    if (1 <= h) return this._w = f, this._x = c, this._y = d, this._z = e, this;
    var g = Math.acos(h),
      i = Math.sqrt(1 - h * h);
    if (0.001 > Math.abs(i)) return this._w = 0.5 * (f + this._w), this._x = 0.5 * (c + this._x), this._y = 0.5 * (d + this._y), this._z = 0.5 * (e + this._z), this;
    h = Math.sin((1 - b) * g) / i;
    g = Math.sin(b * g) / i;
    this._w = f * h + this._w * g;
    this._x = c * h + this._x * g;
    this._y = d * h + this._y * g;
    this._z = e * h + this._z * g;
    this._updateEuler();
    return this
  },
  equals: function (a) {
    return a._x === this._x && a._y === this._y && a._z ===
      this._z && a._w === this._w
  },
  fromArray: function (a) {
    this._x = a[0];
    this._y = a[1];
    this._z = a[2];
    this._w = a[3];
    this._updateEuler();
    return this
  },
  toArray: function () {
    return [this._x, this._y, this._z, this._w]
  },
  clone: function () {
    return new THREE.Quaternion(this._x, this._y, this._z, this._w)
  }
};
THREE.Quaternion.slerp = function (a, b, c, d) {
  return c.copy(a).slerp(b, d)
};
THREE.Vector2 = function (a, b) {
  this.x = a || 0;
  this.y = b || 0
};
THREE.Vector2.prototype = {
  constructor: THREE.Vector2,
  set: function (a, b) {
    this.x = a;
    this.y = b;
    return this
  },
  setX: function (a) {
    this.x = a;
    return this
  },
  setY: function (a) {
    this.y = a;
    return this
  },
  setComponent: function (a, b) {
    switch (a) {
      case 0:
        this.x = b;
        break;
      case 1:
        this.y = b;
        break;
      default:
        throw Error("index is out of range: " + a);
    }
  },
  getComponent: function (a) {
    switch (a) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw Error("index is out of range: " + a);
    }
  },
  copy: function (a) {
    this.x = a.x;
    this.y = a.y;
    return this
  },
  add: function (a,
    b) {
    if (void 0 !== b) return console.warn("DEPRECATED: Vector2's .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(a, b);
    this.x += a.x;
    this.y += a.y;
    return this
  },
  addVectors: function (a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    return this
  },
  addScalar: function (a) {
    this.x += a;
    this.y += a;
    return this
  },
  sub: function (a, b) {
    if (void 0 !== b) return console.warn("DEPRECATED: Vector2's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(a, b);
    this.x -= a.x;
    this.y -=
      a.y;
    return this
  },
  subVectors: function (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    return this
  },
  multiplyScalar: function (a) {
    this.x *= a;
    this.y *= a;
    return this
  },
  divideScalar: function (a) {
    0 !== a ? (a = 1 / a, this.x *= a, this.y *= a) : this.y = this.x = 0;
    return this
  },
  min: function (a) {
    this.x > a.x && (this.x = a.x);
    this.y > a.y && (this.y = a.y);
    return this
  },
  max: function (a) {
    this.x < a.x && (this.x = a.x);
    this.y < a.y && (this.y = a.y);
    return this
  },
  clamp: function (a, b) {
    this.x < a.x ? this.x = a.x : this.x > b.x && (this.x = b.x);
    this.y < a.y ? this.y = a.y : this.y > b.y && (this.y = b.y);
    return this
  },
  negate: function () {
    return this.multiplyScalar(-1)
  },
  dot: function (a) {
    return this.x * a.x + this.y * a.y
  },
  lengthSq: function () {
    return this.x * this.x + this.y * this.y
  },
  length: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  },
  normalize: function () {
    return this.divideScalar(this.length())
  },
  distanceTo: function (a) {
    return Math.sqrt(this.distanceToSquared(a))
  },
  distanceToSquared: function (a) {
    var b = this.x - a.x,
      a = this.y - a.y;
    return b * b + a * a
  },
  setLength: function (a) {
    var b = this.length();
    0 !== b && a !== b && this.multiplyScalar(a /
      b);
    return this
  },
  lerp: function (a, b) {
    this.x += (a.x - this.x) * b;
    this.y += (a.y - this.y) * b;
    return this
  },
  equals: function (a) {
    return a.x === this.x && a.y === this.y
  },
  fromArray: function (a) {
    this.x = a[0];
    this.y = a[1];
    return this
  },
  toArray: function () {
    return [this.x, this.y]
  },
  clone: function () {
    return new THREE.Vector2(this.x, this.y)
  }
};
THREE.Vector3 = function (a, b, c) {
  this.x = a || 0;
  this.y = b || 0;
  this.z = c || 0
};
THREE.Vector3.prototype = {
  constructor: THREE.Vector3,
  set: function (a, b, c) {
    this.x = a;
    this.y = b;
    this.z = c;
    return this
  },
  setX: function (a) {
    this.x = a;
    return this
  },
  setY: function (a) {
    this.y = a;
    return this
  },
  setZ: function (a) {
    this.z = a;
    return this
  },
  setComponent: function (a, b) {
    switch (a) {
      case 0:
        this.x = b;
        break;
      case 1:
        this.y = b;
        break;
      case 2:
        this.z = b;
        break;
      default:
        throw Error("index is out of range: " + a);
    }
  },
  getComponent: function (a) {
    switch (a) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw Error("index is out of range: " +
          a);
    }
  },
  copy: function (a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    return this
  },
  add: function (a, b) {
    if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(a, b);
    this.x += a.x;
    this.y += a.y;
    this.z += a.z;
    return this
  },
  addScalar: function (a) {
    this.x += a;
    this.y += a;
    this.z += a;
    return this
  },
  addVectors: function (a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    return this
  },
  sub: function (a, b) {
    if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
      this.subVectors(a, b);
    this.x -= a.x;
    this.y -= a.y;
    this.z -= a.z;
    return this
  },
  subVectors: function (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    return this
  },
  multiply: function (a, b) {
    if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(a, b);
    this.x *= a.x;
    this.y *= a.y;
    this.z *= a.z;
    return this
  },
  multiplyScalar: function (a) {
    this.x *= a;
    this.y *= a;
    this.z *= a;
    return this
  },
  multiplyVectors: function (a, b) {
    this.x = a.x *
      b.x;
    this.y = a.y * b.y;
    this.z = a.z * b.z;
    return this
  },
  applyMatrix3: function (a) {
    var b = this.x,
      c = this.y,
      d = this.z,
      a = a.elements;
    this.x = a[0] * b + a[3] * c + a[6] * d;
    this.y = a[1] * b + a[4] * c + a[7] * d;
    this.z = a[2] * b + a[5] * c + a[8] * d;
    return this
  },
  applyMatrix4: function (a) {
    var b = this.x,
      c = this.y,
      d = this.z,
      a = a.elements;
    this.x = a[0] * b + a[4] * c + a[8] * d + a[12];
    this.y = a[1] * b + a[5] * c + a[9] * d + a[13];
    this.z = a[2] * b + a[6] * c + a[10] * d + a[14];
    return this
  },
  applyProjection: function (a) {
    var b = this.x,
      c = this.y,
      d = this.z,
      a = a.elements,
      e = 1 / (a[3] * b + a[7] * c + a[11] * d + a[15]);
    this.x = (a[0] * b + a[4] * c + a[8] * d + a[12]) * e;
    this.y = (a[1] * b + a[5] * c + a[9] * d + a[13]) * e;
    this.z = (a[2] * b + a[6] * c + a[10] * d + a[14]) * e;
    return this
  },
  applyQuaternion: function (a) {
    var b = this.x,
      c = this.y,
      d = this.z,
      e = a.x,
      f = a.y,
      h = a.z,
      a = a.w,
      g = a * b + f * d - h * c,
      i = a * c + h * b - e * d,
      j = a * d + e * c - f * b,
      b = -e * b - f * c - h * d;
    this.x = g * a + b * -e + i * -h - j * -f;
    this.y = i * a + b * -f + j * -e - g * -h;
    this.z = j * a + b * -h + g * -f - i * -e;
    return this
  },
  transformDirection: function (a) {
    var b = this.x,
      c = this.y,
      d = this.z,
      a = a.elements;
    this.x = a[0] * b + a[4] * c + a[8] * d;
    this.y = a[1] * b + a[5] * c + a[9] * d;
    this.z = a[2] *
      b + a[6] * c + a[10] * d;
    this.normalize();
    return this
  },
  divide: function (a) {
    this.x /= a.x;
    this.y /= a.y;
    this.z /= a.z;
    return this
  },
  divideScalar: function (a) {
    0 !== a ? (a = 1 / a, this.x *= a, this.y *= a, this.z *= a) : this.z = this.y = this.x = 0;
    return this
  },
  min: function (a) {
    this.x > a.x && (this.x = a.x);
    this.y > a.y && (this.y = a.y);
    this.z > a.z && (this.z = a.z);
    return this
  },
  max: function (a) {
    this.x < a.x && (this.x = a.x);
    this.y < a.y && (this.y = a.y);
    this.z < a.z && (this.z = a.z);
    return this
  },
  clamp: function (a, b) {
    this.x < a.x ? this.x = a.x : this.x > b.x && (this.x = b.x);
    this.y <
      a.y ? this.y = a.y : this.y > b.y && (this.y = b.y);
    this.z < a.z ? this.z = a.z : this.z > b.z && (this.z = b.z);
    return this
  },
  negate: function () {
    return this.multiplyScalar(-1)
  },
  dot: function (a) {
    return this.x * a.x + this.y * a.y + this.z * a.z
  },
  lengthSq: function () {
    return this.x * this.x + this.y * this.y + this.z * this.z
  },
  length: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  },
  lengthManhattan: function () {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
  },
  normalize: function () {
    return this.divideScalar(this.length())
  },
  setLength: function (a) {
    var b = this.length();
    0 !== b && a !== b && this.multiplyScalar(a / b);
    return this
  },
  lerp: function (a, b) {
    this.x += (a.x - this.x) * b;
    this.y += (a.y - this.y) * b;
    this.z += (a.z - this.z) * b;
    return this
  },
  cross: function (a, b) {
    if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(a, b);
    var c = this.x,
      d = this.y,
      e = this.z;
    this.x = d * a.z - e * a.y;
    this.y = e * a.x - c * a.z;
    this.z = c * a.y - d * a.x;
    return this
  },
  crossVectors: function (a, b) {
    this.x =
      a.y * b.z - a.z * b.y;
    this.y = a.z * b.x - a.x * b.z;
    this.z = a.x * b.y - a.y * b.x;
    return this
  },
  angleTo: function (a) {
    a = this.dot(a) / (this.length() * a.length());
    return Math.acos(THREE.Math.clamp(a, -1, 1))
  },
  distanceTo: function (a) {
    return Math.sqrt(this.distanceToSquared(a))
  },
  distanceToSquared: function (a) {
    var b = this.x - a.x,
      c = this.y - a.y,
      a = this.z - a.z;
    return b * b + c * c + a * a
  },
  setEulerFromRotationMatrix: function () {
    console.error("REMOVED: Vector3's setEulerFromRotationMatrix has been removed in favor of Euler.setFromRotationMatrix(), please update your code.")
  },
  setEulerFromQuaternion: function () {
    console.error("REMOVED: Vector3's setEulerFromQuaternion: has been removed in favor of Euler.setFromQuaternion(), please update your code.")
  },
  getPositionFromMatrix: function (a) {
    this.x = a.elements[12];
    this.y = a.elements[13];
    this.z = a.elements[14];
    return this
  },
  getScaleFromMatrix: function (a) {
    var b = this.set(a.elements[0], a.elements[1], a.elements[2]).length(),
      c = this.set(a.elements[4], a.elements[5], a.elements[6]).length(),
      a = this.set(a.elements[8], a.elements[9], a.elements[10]).length();
    this.x = b;
    this.y = c;
    this.z = a;
    return this
  },
  getColumnFromMatrix: function (a, b) {
    var c = 4 * a,
      d = b.elements;
    this.x = d[c];
    this.y = d[c + 1];
    this.z = d[c + 2];
    return this
  },
  equals: function (a) {
    return a.x === this.x && a.y === this.y && a.z === this.z
  },
  fromArray: function (a) {
    this.x = a[0];
    this.y = a[1];
    this.z = a[2];
    return this
  },
  toArray: function () {
    return [this.x, this.y, this.z]
  },
  clone: function () {
    return new THREE.Vector3(this.x, this.y, this.z)
  }
};
THREE.extend(THREE.Vector3.prototype, {
  applyEuler: function () {
    var a = new THREE.Quaternion;
    return function (b) {
      void 0 === typeof b.order && console.error("ERROR: Vector3's .applyEuler() now expects a Euler rotation rather than a Vector3 and order.  Please update your code.");
      b = a.setFromEuler(b);
      this.applyQuaternion(b);
      return this
    }
  }(),
  applyAxisAngle: function () {
    var a = new THREE.Quaternion;
    return function (b, c) {
      var d = a.setFromAxisAngle(b, c);
      this.applyQuaternion(d);
      return this
    }
  }(),
  projectOnVector: function () {
    var a =
      new THREE.Vector3;
    return function (b) {
      a.copy(b).normalize();
      b = this.dot(a);
      return this.copy(a).multiplyScalar(b)
    }
  }(),
  projectOnPlane: function () {
    var a = new THREE.Vector3;
    return function (b) {
      a.copy(this).projectOnVector(b);
      return this.sub(a)
    }
  }(),
  reflect: function () {
    var a = new THREE.Vector3;
    return function (b) {
      a.copy(this).projectOnVector(b).multiplyScalar(2);
      return this.subVectors(a, this)
    }
  }()
});
THREE.Vector4 = function (a, b, c, d) {
  this.x = a || 0;
  this.y = b || 0;
  this.z = c || 0;
  this.w = void 0 !== d ? d : 1
};
THREE.Vector4.prototype = {
  constructor: THREE.Vector4,
  set: function (a, b, c, d) {
    this.x = a;
    this.y = b;
    this.z = c;
    this.w = d;
    return this
  },
  setX: function (a) {
    this.x = a;
    return this
  },
  setY: function (a) {
    this.y = a;
    return this
  },
  setZ: function (a) {
    this.z = a;
    return this
  },
  setW: function (a) {
    this.w = a;
    return this
  },
  setComponent: function (a, b) {
    switch (a) {
      case 0:
        this.x = b;
        break;
      case 1:
        this.y = b;
        break;
      case 2:
        this.z = b;
        break;
      case 3:
        this.w = b;
        break;
      default:
        throw Error("index is out of range: " + a);
    }
  },
  getComponent: function (a) {
    switch (a) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw Error("index is out of range: " + a);
    }
  },
  copy: function (a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    this.w = void 0 !== a.w ? a.w : 1;
    return this
  },
  add: function (a, b) {
    if (void 0 !== b) return console.warn("DEPRECATED: Vector4's .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(a, b);
    this.x += a.x;
    this.y += a.y;
    this.z += a.z;
    this.w += a.w;
    return this
  },
  addScalar: function (a) {
    this.x += a;
    this.y += a;
    this.z += a;
    this.w += a;
    return this
  },
  addVectors: function (a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    this.w = a.w + b.w;
    return this
  },
  sub: function (a, b) {
    if (void 0 !== b) return console.warn("DEPRECATED: Vector4's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(a, b);
    this.x -= a.x;
    this.y -= a.y;
    this.z -= a.z;
    this.w -= a.w;
    return this
  },
  subVectors: function (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    this.w = a.w - b.w;
    return this
  },
  multiplyScalar: function (a) {
    this.x *= a;
    this.y *= a;
    this.z *= a;
    this.w *= a;
    return this
  },
  applyMatrix4: function (a) {
    var b = this.x,
      c = this.y,
      d = this.z,
      e = this.w,
      a = a.elements;
    this.x = a[0] * b + a[4] * c + a[8] * d + a[12] * e;
    this.y = a[1] * b + a[5] * c + a[9] * d + a[13] * e;
    this.z = a[2] * b + a[6] * c + a[10] * d + a[14] * e;
    this.w = a[3] * b + a[7] * c + a[11] * d + a[15] * e;
    return this
  },
  divideScalar: function (a) {
    0 !== a ? (a = 1 / a, this.x *= a, this.y *= a, this.z *= a, this.w *= a) : (this.z = this.y = this.x = 0, this.w = 1);
    return this
  },
  setAxisAngleFromQuaternion: function (a) {
    this.w = 2 * Math.acos(a.w);
    var b = Math.sqrt(1 - a.w * a.w);
    1E-4 > b ? (this.x = 1, this.z = this.y = 0) : (this.x = a.x / b,
      this.y = a.y / b, this.z = a.z / b);
    return this
  },
  setAxisAngleFromRotationMatrix: function (a) {
    var b, c, d, a = a.elements,
      e = a[0];
    d = a[4];
    var f = a[8],
      h = a[1],
      g = a[5],
      i = a[9];
    c = a[2];
    b = a[6];
    var j = a[10];
    if (0.01 > Math.abs(d - h) && 0.01 > Math.abs(f - c) && 0.01 > Math.abs(i - b)) {
      if (0.1 > Math.abs(d + h) && 0.1 > Math.abs(f + c) && 0.1 > Math.abs(i + b) && 0.1 > Math.abs(e + g + j - 3)) return this.set(1, 0, 0, 0), this;
      a = Math.PI;
      e = (e + 1) / 2;
      g = (g + 1) / 2;
      j = (j + 1) / 2;
      d = (d + h) / 4;
      f = (f + c) / 4;
      i = (i + b) / 4;
      e > g && e > j ? 0.01 > e ? (b = 0, d = c = 0.707106781) : (b = Math.sqrt(e), c = d / b, d = f / b) : g > j ? 0.01 > g ?
        (b = 0.707106781, c = 0, d = 0.707106781) : (c = Math.sqrt(g), b = d / c, d = i / c) : 0.01 > j ? (c = b = 0.707106781, d = 0) : (d = Math.sqrt(j), b = f / d, c = i / d);
      this.set(b, c, d, a);
      return this
    }
    a = Math.sqrt((b - i) * (b - i) + (f - c) * (f - c) + (h - d) * (h - d));
    0.001 > Math.abs(a) && (a = 1);
    this.x = (b - i) / a;
    this.y = (f - c) / a;
    this.z = (h - d) / a;
    this.w = Math.acos((e + g + j - 1) / 2);
    return this
  },
  min: function (a) {
    this.x > a.x && (this.x = a.x);
    this.y > a.y && (this.y = a.y);
    this.z > a.z && (this.z = a.z);
    this.w > a.w && (this.w = a.w);
    return this
  },
  max: function (a) {
    this.x < a.x && (this.x = a.x);
    this.y < a.y && (this.y =
      a.y);
    this.z < a.z && (this.z = a.z);
    this.w < a.w && (this.w = a.w);
    return this
  },
  clamp: function (a, b) {
    this.x < a.x ? this.x = a.x : this.x > b.x && (this.x = b.x);
    this.y < a.y ? this.y = a.y : this.y > b.y && (this.y = b.y);
    this.z < a.z ? this.z = a.z : this.z > b.z && (this.z = b.z);
    this.w < a.w ? this.w = a.w : this.w > b.w && (this.w = b.w);
    return this
  },
  negate: function () {
    return this.multiplyScalar(-1)
  },
  dot: function (a) {
    return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w
  },
  lengthSq: function () {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
  },
  length: function () {
    return Math.sqrt(this.x *
      this.x + this.y * this.y + this.z * this.z + this.w * this.w)
  },
  lengthManhattan: function () {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
  },
  normalize: function () {
    return this.divideScalar(this.length())
  },
  setLength: function (a) {
    var b = this.length();
    0 !== b && a !== b && this.multiplyScalar(a / b);
    return this
  },
  lerp: function (a, b) {
    this.x += (a.x - this.x) * b;
    this.y += (a.y - this.y) * b;
    this.z += (a.z - this.z) * b;
    this.w += (a.w - this.w) * b;
    return this
  },
  equals: function (a) {
    return a.x === this.x && a.y === this.y && a.z === this.z &&
      a.w === this.w
  },
  fromArray: function (a) {
    this.x = a[0];
    this.y = a[1];
    this.z = a[2];
    this.w = a[3];
    return this
  },
  toArray: function () {
    return [this.x, this.y, this.z, this.w]
  },
  clone: function () {
    return new THREE.Vector4(this.x, this.y, this.z, this.w)
  }
};
THREE.Euler = function (a, b, c, d) {
  this._x = a || 0;
  this._y = b || 0;
  this._z = c || 0;
  this._order = d || THREE.Euler.DefaultOrder
};
THREE.Euler.RotationOrders = "XYZ YZX ZXY XZY YXZ ZYX".split(" ");
THREE.Euler.DefaultOrder = "XYZ";
THREE.Euler.prototype = {
  constructor: THREE.Euler,
  _x: 0,
  _y: 0,
  _z: 0,
  _order: THREE.Euler.DefaultOrder,
  _quaternion: void 0,
  _updateQuaternion: function () {
    void 0 !== this._quaternion && this._quaternion.setFromEuler(this, !1)
  },
  get x() {
    return this._x
  },
  set x(a) {
    this._x = a;
    this._updateQuaternion()
  },
  get y() {
    return this._y
  },
  set y(a) {
    this._y = a;
    this._updateQuaternion()
  },
  get z() {
    return this._z
  },
  set z(a) {
    this._z = a;
    this._updateQuaternion()
  },
  get order() {
    return this._order
  },
  set order(a) {
    this._order = a;
    this._updateQuaternion()
  },
  set: function (a, b, c, d) {
    this._x = a;
    this._y = b;
    this._z = c;
    this._order = d || this._order;
    this._updateQuaternion();
    return this
  },
  copy: function (a) {
    this._x = a._x;
    this._y = a._y;
    this._z = a._z;
    this._order = a._order;
    this._updateQuaternion();
    return this
  },
  setFromRotationMatrix: function (a, b) {
    function c(a) {
      return Math.min(Math.max(a, -1), 1)
    }
    var d = a.elements,
      e = d[0],
      f = d[4],
      h = d[8],
      g = d[1],
      i = d[5],
      j = d[9],
      l = d[2],
      m = d[6],
      d = d[10],
      b = b || this._order;
    "XYZ" === b ? (this._y = Math.asin(c(h)), 0.99999 > Math.abs(h) ? (this._x = Math.atan2(-j, d), this._z =
      Math.atan2(-f, e)) : (this._x = Math.atan2(m, i), this._z = 0)) : "YXZ" === b ? (this._x = Math.asin(-c(j)), 0.99999 > Math.abs(j) ? (this._y = Math.atan2(h, d), this._z = Math.atan2(g, i)) : (this._y = Math.atan2(-l, e), this._z = 0)) : "ZXY" === b ? (this._x = Math.asin(c(m)), 0.99999 > Math.abs(m) ? (this._y = Math.atan2(-l, d), this._z = Math.atan2(-f, i)) : (this._y = 0, this._z = Math.atan2(g, e))) : "ZYX" === b ? (this._y = Math.asin(-c(l)), 0.99999 > Math.abs(l) ? (this._x = Math.atan2(m, d), this._z = Math.atan2(g, e)) : (this._x = 0, this._z = Math.atan2(-f, i))) : "YZX" === b ? (this._z =
      Math.asin(c(g)), 0.99999 > Math.abs(g) ? (this._x = Math.atan2(-j, i), this._y = Math.atan2(-l, e)) : (this._x = 0, this._y = Math.atan2(h, d))) : "XZY" === b ? (this._z = Math.asin(-c(f)), 0.99999 > Math.abs(f) ? (this._x = Math.atan2(m, i), this._y = Math.atan2(h, e)) : (this._x = Math.atan2(-j, d), this._y = 0)) : console.warn("WARNING: Euler.setFromRotationMatrix() given unsupported order: " + b);
    this._order = b;
    this._updateQuaternion();
    return this
  },
  setFromQuaternion: function (a, b, c) {
    function d(a) {
      return Math.min(Math.max(a, -1), 1)
    }
    var e = a.x * a.x,
      f =
      a.y * a.y,
      h = a.z * a.z,
      g = a.w * a.w,
      b = b || this._order;
    "XYZ" === b ? (this._x = Math.atan2(2 * (a.x * a.w - a.y * a.z), g - e - f + h), this._y = Math.asin(d(2 * (a.x * a.z + a.y * a.w))), this._z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g + e - f - h)) : "YXZ" === b ? (this._x = Math.asin(d(2 * (a.x * a.w - a.y * a.z))), this._y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g - e - f + h), this._z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g - e + f - h)) : "ZXY" === b ? (this._x = Math.asin(d(2 * (a.x * a.w + a.y * a.z))), this._y = Math.atan2(2 * (a.y * a.w - a.z * a.x), g - e - f + h), this._z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g - e + f - h)) : "ZYX" ===
      b ? (this._x = Math.atan2(2 * (a.x * a.w + a.z * a.y), g - e - f + h), this._y = Math.asin(d(2 * (a.y * a.w - a.x * a.z))), this._z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g + e - f - h)) : "YZX" === b ? (this._x = Math.atan2(2 * (a.x * a.w - a.z * a.y), g - e + f - h), this._y = Math.atan2(2 * (a.y * a.w - a.x * a.z), g + e - f - h), this._z = Math.asin(d(2 * (a.x * a.y + a.z * a.w)))) : "XZY" === b ? (this._x = Math.atan2(2 * (a.x * a.w + a.y * a.z), g - e + f - h), this._y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g + e - f - h), this._z = Math.asin(d(2 * (a.z * a.w - a.x * a.y)))) : console.warn("WARNING: Euler.setFromQuaternion() given unsupported order: " +
        b);
    this._order = b;
    !1 !== c && this._updateQuaternion();
    return this
  },
  reorder: function () {
    var a = new THREE.Quaternion;
    return function (b) {
      a.setFromEuler(this);
      this.setFromQuaternion(a, b)
    }
  }(),
  fromArray: function (a) {
    this._x = a[0];
    this._y = a[1];
    this._z = a[2];
    void 0 !== a[3] && (this._order = a[3]);
    this._updateQuaternion();
    return this
  },
  toArray: function () {
    return [this._x, this._y, this._z, this._order]
  },
  equals: function (a) {
    return a._x === this._x && a._y === this._y && a._z === this._z && a._order === this._order
  },
  clone: function () {
    return new THREE.Euler(this._x,
      this._y, this._z, this._order)
  }
};
THREE.Line3 = function (a, b) {
  this.start = void 0 !== a ? a : new THREE.Vector3;
  this.end = void 0 !== b ? b : new THREE.Vector3
};
THREE.Line3.prototype = {
  constructor: THREE.Line3,
  set: function (a, b) {
    this.start.copy(a);
    this.end.copy(b);
    return this
  },
  copy: function (a) {
    this.start.copy(a.start);
    this.end.copy(a.end);
    return this
  },
  center: function (a) {
    return (a || new THREE.Vector3).addVectors(this.start, this.end).multiplyScalar(0.5)
  },
  delta: function (a) {
    return (a || new THREE.Vector3).subVectors(this.end, this.start)
  },
  distanceSq: function () {
    return this.start.distanceToSquared(this.end)
  },
  distance: function () {
    return this.start.distanceTo(this.end)
  },
  at: function (a,
    b) {
    var c = b || new THREE.Vector3;
    return this.delta(c).multiplyScalar(a).add(this.start)
  },
  closestPointToPointParameter: function () {
    var a = new THREE.Vector3,
      b = new THREE.Vector3;
    return function (c, d) {
      a.subVectors(c, this.start);
      b.subVectors(this.end, this.start);
      var e = b.dot(b),
        e = b.dot(a) / e;
      d && (e = THREE.Math.clamp(e, 0, 1));
      return e
    }
  }(),
  closestPointToPoint: function (a, b, c) {
    a = this.closestPointToPointParameter(a, b);
    c = c || new THREE.Vector3;
    return this.delta(c).multiplyScalar(a).add(this.start)
  },
  applyMatrix4: function (a) {
    this.start.applyMatrix4(a);
    this.end.applyMatrix4(a);
    return this
  },
  equals: function (a) {
    return a.start.equals(this.start) && a.end.equals(this.end)
  },
  clone: function () {
    return (new THREE.Line3).copy(this)
  }
};
THREE.Box2 = function (a, b) {
  this.min = void 0 !== a ? a : new THREE.Vector2(Infinity, Infinity);
  this.max = void 0 !== b ? b : new THREE.Vector2(-Infinity, -Infinity)
};
THREE.Box2.prototype = {
  constructor: THREE.Box2,
  set: function (a, b) {
    this.min.copy(a);
    this.max.copy(b);
    return this
  },
  setFromPoints: function (a) {
    if (0 < a.length) {
      var b = a[0];
      this.min.copy(b);
      this.max.copy(b);
      for (var c = 1, d = a.length; c < d; c++) b = a[c], b.x < this.min.x ? this.min.x = b.x : b.x > this.max.x && (this.max.x = b.x), b.y < this.min.y ? this.min.y = b.y : b.y > this.max.y && (this.max.y = b.y)
    } else this.makeEmpty();
    return this
  },
  setFromCenterAndSize: function () {
    var a = new THREE.Vector2;
    return function (b, c) {
      var d = a.copy(c).multiplyScalar(0.5);
      this.min.copy(b).sub(d);
      this.max.copy(b).add(d);
      return this
    }
  }(),
  copy: function (a) {
    this.min.copy(a.min);
    this.max.copy(a.max);
    return this
  },
  makeEmpty: function () {
    this.min.x = this.min.y = Infinity;
    this.max.x = this.max.y = -Infinity;
    return this
  },
  empty: function () {
    return this.max.x < this.min.x || this.max.y < this.min.y
  },
  center: function (a) {
    return (a || new THREE.Vector2).addVectors(this.min, this.max).multiplyScalar(0.5)
  },
  size: function (a) {
    return (a || new THREE.Vector2).subVectors(this.max, this.min)
  },
  expandByPoint: function (a) {
    this.min.min(a);
    this.max.max(a);
    return this
  },
  expandByVector: function (a) {
    this.min.sub(a);
    this.max.add(a);
    return this
  },
  expandByScalar: function (a) {
    this.min.addScalar(-a);
    this.max.addScalar(a);
    return this
  },
  containsPoint: function (a) {
    return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y ? !1 : !0
  },
  containsBox: function (a) {
    return this.min.x <= a.min.x && a.max.x <= this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y ? !0 : !1
  },
  getParameter: function (a) {
    return new THREE.Vector2((a.x - this.min.x) / (this.max.x - this.min.x),
      (a.y - this.min.y) / (this.max.y - this.min.y))
  },
  isIntersectionBox: function (a) {
    return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y ? !1 : !0
  },
  clampPoint: function (a, b) {
    return (b || new THREE.Vector2).copy(a).clamp(this.min, this.max)
  },
  distanceToPoint: function () {
    var a = new THREE.Vector2;
    return function (b) {
      return a.copy(b).clamp(this.min, this.max).sub(b).length()
    }
  }(),
  intersect: function (a) {
    this.min.max(a.min);
    this.max.min(a.max);
    return this
  },
  union: function (a) {
    this.min.min(a.min);
    this.max.max(a.max);
    return this
  },
  translate: function (a) {
    this.min.add(a);
    this.max.add(a);
    return this
  },
  equals: function (a) {
    return a.min.equals(this.min) && a.max.equals(this.max)
  },
  clone: function () {
    return (new THREE.Box2).copy(this)
  }
};
THREE.Box3 = function (a, b) {
  this.min = void 0 !== a ? a : new THREE.Vector3(Infinity, Infinity, Infinity);
  this.max = void 0 !== b ? b : new THREE.Vector3(-Infinity, -Infinity, -Infinity)
};
THREE.Box3.prototype = {
  constructor: THREE.Box3,
  set: function (a, b) {
    this.min.copy(a);
    this.max.copy(b);
    return this
  },
  setFromPoints: function (a) {
    if (0 < a.length) {
      var b = a[0];
      this.min.copy(b);
      this.max.copy(b);
      for (var c = 1, d = a.length; c < d; c++) b = a[c], b.x < this.min.x ? this.min.x = b.x : b.x > this.max.x && (this.max.x = b.x), b.y < this.min.y ? this.min.y = b.y : b.y > this.max.y && (this.max.y = b.y), b.z < this.min.z ? this.min.z = b.z : b.z > this.max.z && (this.max.z = b.z)
    } else this.makeEmpty();
    return this
  },
  setFromCenterAndSize: function () {
    var a = new THREE.Vector3;
    return function (b, c) {
      var d = a.copy(c).multiplyScalar(0.5);
      this.min.copy(b).sub(d);
      this.max.copy(b).add(d);
      return this
    }
  }(),
  setFromObject: function () {
    var a = new THREE.Vector3;
    return function (b) {
      var c = this;
      b.updateMatrixWorld(!0);
      this.makeEmpty();
      b.traverse(function (b) {
        if (void 0 !== b.geometry && void 0 !== b.geometry.vertices)
          for (var e = b.geometry.vertices, f = 0, h = e.length; f < h; f++) a.copy(e[f]), a.applyMatrix4(b.matrixWorld), c.expandByPoint(a)
      });
      return this
    }
  }(),
  copy: function (a) {
    this.min.copy(a.min);
    this.max.copy(a.max);
    return this
  },
  makeEmpty: function () {
    this.min.x = this.min.y = this.min.z = Infinity;
    this.max.x = this.max.y = this.max.z = -Infinity;
    return this
  },
  empty: function () {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
  },
  center: function (a) {
    return (a || new THREE.Vector3).addVectors(this.min, this.max).multiplyScalar(0.5)
  },
  size: function (a) {
    return (a || new THREE.Vector3).subVectors(this.max, this.min)
  },
  expandByPoint: function (a) {
    this.min.min(a);
    this.max.max(a);
    return this
  },
  expandByVector: function (a) {
    this.min.sub(a);
    this.max.add(a);
    return this
  },
  expandByScalar: function (a) {
    this.min.addScalar(-a);
    this.max.addScalar(a);
    return this
  },
  containsPoint: function (a) {
    return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y || a.z < this.min.z || a.z > this.max.z ? !1 : !0
  },
  containsBox: function (a) {
    return this.min.x <= a.min.x && a.max.x <= this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y && this.min.z <= a.min.z && a.max.z <= this.max.z ? !0 : !1
  },
  getParameter: function (a) {
    return new THREE.Vector3((a.x - this.min.x) / (this.max.x - this.min.x),
      (a.y - this.min.y) / (this.max.y - this.min.y), (a.z - this.min.z) / (this.max.z - this.min.z))
  },
  isIntersectionBox: function (a) {
    return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y || a.max.z < this.min.z || a.min.z > this.max.z ? !1 : !0
  },
  clampPoint: function (a, b) {
    return (b || new THREE.Vector3).copy(a).clamp(this.min, this.max)
  },
  distanceToPoint: function () {
    var a = new THREE.Vector3;
    return function (b) {
      return a.copy(b).clamp(this.min, this.max).sub(b).length()
    }
  }(),
  getBoundingSphere: function () {
    var a =
      new THREE.Vector3;
    return function (b) {
      b = b || new THREE.Sphere;
      b.center = this.center();
      b.radius = 0.5 * this.size(a).length();
      return b
    }
  }(),
  intersect: function (a) {
    this.min.max(a.min);
    this.max.min(a.max);
    return this
  },
  union: function (a) {
    this.min.min(a.min);
    this.max.max(a.max);
    return this
  },
  applyMatrix4: function () {
    var a = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
    return function (b) {
      a[0].set(this.min.x, this.min.y,
        this.min.z).applyMatrix4(b);
      a[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(b);
      a[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(b);
      a[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(b);
      a[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(b);
      a[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(b);
      a[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(b);
      a[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(b);
      this.makeEmpty();
      this.setFromPoints(a);
      return this
    }
  }(),
  translate: function (a) {
    this.min.add(a);
    this.max.add(a);
    return this
  },
  equals: function (a) {
    return a.min.equals(this.min) && a.max.equals(this.max)
  },
  clone: function () {
    return (new THREE.Box3).copy(this)
  }
};
THREE.Matrix3 = function (a, b, c, d, e, f, h, g, i) {
  this.elements = new Float32Array(9);
  this.set(void 0 !== a ? a : 1, b || 0, c || 0, d || 0, void 0 !== e ? e : 1, f || 0, h || 0, g || 0, void 0 !== i ? i : 1)
};
THREE.Matrix3.prototype = {
  constructor: THREE.Matrix3,
  set: function (a, b, c, d, e, f, h, g, i) {
    var j = this.elements;
    j[0] = a;
    j[3] = b;
    j[6] = c;
    j[1] = d;
    j[4] = e;
    j[7] = f;
    j[2] = h;
    j[5] = g;
    j[8] = i;
    return this
  },
  identity: function () {
    this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
    return this
  },
  copy: function (a) {
    a = a.elements;
    this.set(a[0], a[3], a[6], a[1], a[4], a[7], a[2], a[5], a[8]);
    return this
  },
  multiplyVector3: function (a) {
    console.warn("DEPRECATED: Matrix3's .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.");
    return a.applyMatrix3(this)
  },
  multiplyVector3Array: function () {
    var a = new THREE.Vector3;
    return function (b) {
      for (var c = 0, d = b.length; c < d; c += 3) a.x = b[c], a.y = b[c + 1], a.z = b[c + 2], a.applyMatrix3(this), b[c] = a.x, b[c + 1] = a.y, b[c + 2] = a.z;
      return b
    }
  }(),
  multiplyScalar: function (a) {
    var b = this.elements;
    b[0] *= a;
    b[3] *= a;
    b[6] *= a;
    b[1] *= a;
    b[4] *= a;
    b[7] *= a;
    b[2] *= a;
    b[5] *= a;
    b[8] *= a;
    return this
  },
  determinant: function () {
    var a = this.elements,
      b = a[0],
      c = a[1],
      d = a[2],
      e = a[3],
      f = a[4],
      h = a[5],
      g = a[6],
      i = a[7],
      a = a[8];
    return b * f * a - b * h * i - c * e * a + c * h * g + d * e * i - d * f * g
  },
  getInverse: function (a,
    b) {
    var c = a.elements,
      d = this.elements;
    d[0] = c[10] * c[5] - c[6] * c[9];
    d[1] = -c[10] * c[1] + c[2] * c[9];
    d[2] = c[6] * c[1] - c[2] * c[5];
    d[3] = -c[10] * c[4] + c[6] * c[8];
    d[4] = c[10] * c[0] - c[2] * c[8];
    d[5] = -c[6] * c[0] + c[2] * c[4];
    d[6] = c[9] * c[4] - c[5] * c[8];
    d[7] = -c[9] * c[0] + c[1] * c[8];
    d[8] = c[5] * c[0] - c[1] * c[4];
    c = c[0] * d[0] + c[1] * d[3] + c[2] * d[6];
    if (0 === c) {
      if (b) throw Error("Matrix3.getInverse(): can't invert matrix, determinant is 0");
      console.warn("Matrix3.getInverse(): can't invert matrix, determinant is 0");
      this.identity();
      return this
    }
    this.multiplyScalar(1 /
      c);
    return this
  },
  transpose: function () {
    var a, b = this.elements;
    a = b[1];
    b[1] = b[3];
    b[3] = a;
    a = b[2];
    b[2] = b[6];
    b[6] = a;
    a = b[5];
    b[5] = b[7];
    b[7] = a;
    return this
  },
  getNormalMatrix: function (a) {
    this.getInverse(a).transpose();
    return this
  },
  transposeIntoArray: function (a) {
    var b = this.elements;
    a[0] = b[0];
    a[1] = b[3];
    a[2] = b[6];
    a[3] = b[1];
    a[4] = b[4];
    a[5] = b[7];
    a[6] = b[2];
    a[7] = b[5];
    a[8] = b[8];
    return this
  },
  clone: function () {
    var a = this.elements;
    return new THREE.Matrix3(a[0], a[3], a[6], a[1], a[4], a[7], a[2], a[5], a[8])
  }
};
THREE.Matrix4 = function (a, b, c, d, e, f, h, g, i, j, l, m, n, p, t, q) {
  var r = this.elements = new Float32Array(16);
  r[0] = void 0 !== a ? a : 1;
  r[4] = b || 0;
  r[8] = c || 0;
  r[12] = d || 0;
  r[1] = e || 0;
  r[5] = void 0 !== f ? f : 1;
  r[9] = h || 0;
  r[13] = g || 0;
  r[2] = i || 0;
  r[6] = j || 0;
  r[10] = void 0 !== l ? l : 1;
  r[14] = m || 0;
  r[3] = n || 0;
  r[7] = p || 0;
  r[11] = t || 0;
  r[15] = void 0 !== q ? q : 1
};
THREE.Matrix4.prototype = {
  constructor: THREE.Matrix4,
  set: function (a, b, c, d, e, f, h, g, i, j, l, m, n, p, t, q) {
    var r = this.elements;
    r[0] = a;
    r[4] = b;
    r[8] = c;
    r[12] = d;
    r[1] = e;
    r[5] = f;
    r[9] = h;
    r[13] = g;
    r[2] = i;
    r[6] = j;
    r[10] = l;
    r[14] = m;
    r[3] = n;
    r[7] = p;
    r[11] = t;
    r[15] = q;
    return this
  },
  identity: function () {
    this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this
  },
  copy: function (a) {
    this.elements.set(a.elements);
    return this
  },
  extractPosition: function (a) {
    console.warn("DEPRECATED: Matrix4's .extractPosition() has been renamed to .copyPosition().");
    return this.copyPosition(a)
  },
  copyPosition: function (a) {
    var b = this.elements,
      a = a.elements;
    b[12] = a[12];
    b[13] = a[13];
    b[14] = a[14];
    return this
  },
  extractRotation: function () {
    var a = new THREE.Vector3;
    return function (b) {
      var c = this.elements,
        b = b.elements,
        d = 1 / a.set(b[0], b[1], b[2]).length(),
        e = 1 / a.set(b[4], b[5], b[6]).length(),
        f = 1 / a.set(b[8], b[9], b[10]).length();
      c[0] = b[0] * d;
      c[1] = b[1] * d;
      c[2] = b[2] * d;
      c[4] = b[4] * e;
      c[5] = b[5] * e;
      c[6] = b[6] * e;
      c[8] = b[8] * f;
      c[9] = b[9] * f;
      c[10] = b[10] * f;
      return this
    }
  }(),
  makeRotationFromEuler: function (a) {
    void 0 ===
      typeof a.order && console.error("ERROR: Matrix's .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.  Please update your code.");
    var b = this.elements,
      c = a.x,
      d = a.y,
      e = a.z,
      f = Math.cos(c),
      c = Math.sin(c),
      h = Math.cos(d),
      d = Math.sin(d),
      g = Math.cos(e),
      e = Math.sin(e);
    if (void 0 === a.order || "XYZ" === a.order) {
      var a = f * g,
        i = f * e,
        j = c * g,
        l = c * e;
      b[0] = h * g;
      b[4] = -h * e;
      b[8] = d;
      b[1] = i + j * d;
      b[5] = a - l * d;
      b[9] = -c * h;
      b[2] = l - a * d;
      b[6] = j + i * d;
      b[10] = f * h
    } else "YXZ" === a.order ? (a = h * g, i = h * e, j = d * g, l = d * e, b[0] = a + l * c, b[4] =
      j * c - i, b[8] = f * d, b[1] = f * e, b[5] = f * g, b[9] = -c, b[2] = i * c - j, b[6] = l + a * c, b[10] = f * h) : "ZXY" === a.order ? (a = h * g, i = h * e, j = d * g, l = d * e, b[0] = a - l * c, b[4] = -f * e, b[8] = j + i * c, b[1] = i + j * c, b[5] = f * g, b[9] = l - a * c, b[2] = -f * d, b[6] = c, b[10] = f * h) : "ZYX" === a.order ? (a = f * g, i = f * e, j = c * g, l = c * e, b[0] = h * g, b[4] = j * d - i, b[8] = a * d + l, b[1] = h * e, b[5] = l * d + a, b[9] = i * d - j, b[2] = -d, b[6] = c * h, b[10] = f * h) : "YZX" === a.order ? (a = f * h, i = f * d, j = c * h, l = c * d, b[0] = h * g, b[4] = l - a * e, b[8] = j * e + i, b[1] = e, b[5] = f * g, b[9] = -c * g, b[2] = -d * g, b[6] = i * e + j, b[10] = a - l * e) : "XZY" === a.order && (a = f * h, i = f * d, j =
      c * h, l = c * d, b[0] = h * g, b[4] = -e, b[8] = d * g, b[1] = a * e + l, b[5] = f * g, b[9] = i * e - j, b[2] = j * e - i, b[6] = c * g, b[10] = l * e + a);
    b[3] = 0;
    b[7] = 0;
    b[11] = 0;
    b[12] = 0;
    b[13] = 0;
    b[14] = 0;
    b[15] = 1;
    return this
  },
  setRotationFromQuaternion: function (a) {
    console.warn("DEPRECATED: Matrix4's .setRotationFromQuaternion() has been deprecated in favor of makeRotationFromQuaternion.  Please update your code.");
    return this.makeRotationFromQuaternion(a)
  },
  makeRotationFromQuaternion: function (a) {
    var b = this.elements,
      c = a.x,
      d = a.y,
      e = a.z,
      f = a.w,
      h = c + c,
      g = d + d,
      i = e + e,
      a = c * h,
      j = c * g,
      c = c * i,
      l = d * g,
      d = d * i,
      e = e * i,
      h = f * h,
      g = f * g,
      f = f * i;
    b[0] = 1 - (l + e);
    b[4] = j - f;
    b[8] = c + g;
    b[1] = j + f;
    b[5] = 1 - (a + e);
    b[9] = d - h;
    b[2] = c - g;
    b[6] = d + h;
    b[10] = 1 - (a + l);
    b[3] = 0;
    b[7] = 0;
    b[11] = 0;
    b[12] = 0;
    b[13] = 0;
    b[14] = 0;
    b[15] = 1;
    return this
  },
  lookAt: function () {
    var a = new THREE.Vector3,
      b = new THREE.Vector3,
      c = new THREE.Vector3;
    return function (d, e, f) {
      var h = this.elements;
      c.subVectors(d, e).normalize();
      0 === c.length() && (c.z = 1);
      a.crossVectors(f, c).normalize();
      0 === a.length() && (c.x += 1E-4, a.crossVectors(f, c).normalize());
      b.crossVectors(c,
        a);
      h[0] = a.x;
      h[4] = b.x;
      h[8] = c.x;
      h[1] = a.y;
      h[5] = b.y;
      h[9] = c.y;
      h[2] = a.z;
      h[6] = b.z;
      h[10] = c.z;
      return this
    }
  }(),
  multiply: function (a, b) {
    return void 0 !== b ? (console.warn("DEPRECATED: Matrix4's .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(a, b)) : this.multiplyMatrices(this, a)
  },
  multiplyMatrices: function (a, b) {
    var c = a.elements,
      d = b.elements,
      e = this.elements,
      f = c[0],
      h = c[4],
      g = c[8],
      i = c[12],
      j = c[1],
      l = c[5],
      m = c[9],
      n = c[13],
      p = c[2],
      t = c[6],
      q = c[10],
      r = c[14],
      s = c[3],
      v = c[7],
      z = c[11],
      c = c[15],
      C = d[0],
      F = d[4],
      H = d[8],
      I = d[12],
      G = d[1],
      A = d[5],
      K = d[9],
      B = d[13],
      J = d[2],
      N = d[6],
      y = d[10],
      M = d[14],
      w = d[3],
      Z = d[7],
      L = d[11],
      d = d[15];
    e[0] = f * C + h * G + g * J + i * w;
    e[4] = f * F + h * A + g * N + i * Z;
    e[8] = f * H + h * K + g * y + i * L;
    e[12] = f * I + h * B + g * M + i * d;
    e[1] = j * C + l * G + m * J + n * w;
    e[5] = j * F + l * A + m * N + n * Z;
    e[9] = j * H + l * K + m * y + n * L;
    e[13] = j * I + l * B + m * M + n * d;
    e[2] = p * C + t * G + q * J + r * w;
    e[6] = p * F + t * A + q * N + r * Z;
    e[10] = p * H + t * K + q * y + r * L;
    e[14] = p * I + t * B + q * M + r * d;
    e[3] = s * C + v * G + z * J + c * w;
    e[7] = s * F + v * A + z * N + c * Z;
    e[11] = s * H + v * K + z * y + c * L;
    e[15] = s * I + v * B + z * M + c * d;
    return this
  },
  multiplyToArray: function (a,
    b, c) {
    var d = this.elements;
    this.multiplyMatrices(a, b);
    c[0] = d[0];
    c[1] = d[1];
    c[2] = d[2];
    c[3] = d[3];
    c[4] = d[4];
    c[5] = d[5];
    c[6] = d[6];
    c[7] = d[7];
    c[8] = d[8];
    c[9] = d[9];
    c[10] = d[10];
    c[11] = d[11];
    c[12] = d[12];
    c[13] = d[13];
    c[14] = d[14];
    c[15] = d[15];
    return this
  },
  multiplyScalar: function (a) {
    var b = this.elements;
    b[0] *= a;
    b[4] *= a;
    b[8] *= a;
    b[12] *= a;
    b[1] *= a;
    b[5] *= a;
    b[9] *= a;
    b[13] *= a;
    b[2] *= a;
    b[6] *= a;
    b[10] *= a;
    b[14] *= a;
    b[3] *= a;
    b[7] *= a;
    b[11] *= a;
    b[15] *= a;
    return this
  },
  multiplyVector3: function (a) {
    console.warn("DEPRECATED: Matrix4's .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead.");
    return a.applyProjection(this)
  },
  multiplyVector4: function (a) {
    console.warn("DEPRECATED: Matrix4's .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.");
    return a.applyMatrix4(this)
  },
  multiplyVector3Array: function () {
    var a = new THREE.Vector3;
    return function (b) {
      for (var c = 0, d = b.length; c < d; c += 3) a.x = b[c], a.y = b[c + 1], a.z = b[c + 2], a.applyProjection(this), b[c] = a.x, b[c + 1] = a.y, b[c + 2] = a.z;
      return b
    }
  }(),
  rotateAxis: function (a) {
    console.warn("DEPRECATED: Matrix4's .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.");
    a.transformDirection(this)
  },
  crossVector: function (a) {
    console.warn("DEPRECATED: Matrix4's .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead.");
    return a.applyMatrix4(this)
  },
  determinant: function () {
    var a = this.elements,
      b = a[0],
      c = a[4],
      d = a[8],
      e = a[12],
      f = a[1],
      h = a[5],
      g = a[9],
      i = a[13],
      j = a[2],
      l = a[6],
      m = a[10],
      n = a[14];
    return a[3] * (+e * g * l - d * i * l - e * h * m + c * i * m + d * h * n - c * g * n) + a[7] * (+b * g * n - b * i * m + e * f * m - d * f * n + d * i * j - e * g * j) + a[11] * (+b * i * l - b * h * n - e * f * l + c * f * n + e * h * j - c * i * j) + a[15] * (-d * h * j - b * g * l + b * h * m + d * f * l - c * f *
      m + c * g * j)
  },
  transpose: function () {
    var a = this.elements,
      b;
    b = a[1];
    a[1] = a[4];
    a[4] = b;
    b = a[2];
    a[2] = a[8];
    a[8] = b;
    b = a[6];
    a[6] = a[9];
    a[9] = b;
    b = a[3];
    a[3] = a[12];
    a[12] = b;
    b = a[7];
    a[7] = a[13];
    a[13] = b;
    b = a[11];
    a[11] = a[14];
    a[14] = b;
    return this
  },
  flattenToArray: function (a) {
    var b = this.elements;
    a[0] = b[0];
    a[1] = b[1];
    a[2] = b[2];
    a[3] = b[3];
    a[4] = b[4];
    a[5] = b[5];
    a[6] = b[6];
    a[7] = b[7];
    a[8] = b[8];
    a[9] = b[9];
    a[10] = b[10];
    a[11] = b[11];
    a[12] = b[12];
    a[13] = b[13];
    a[14] = b[14];
    a[15] = b[15];
    return a
  },
  flattenToArrayOffset: function (a, b) {
    var c = this.elements;
    a[b] = c[0];
    a[b + 1] = c[1];
    a[b + 2] = c[2];
    a[b + 3] = c[3];
    a[b + 4] = c[4];
    a[b + 5] = c[5];
    a[b + 6] = c[6];
    a[b + 7] = c[7];
    a[b + 8] = c[8];
    a[b + 9] = c[9];
    a[b + 10] = c[10];
    a[b + 11] = c[11];
    a[b + 12] = c[12];
    a[b + 13] = c[13];
    a[b + 14] = c[14];
    a[b + 15] = c[15];
    return a
  },
  getPosition: function () {
    var a = new THREE.Vector3;
    return function () {
      console.warn("DEPRECATED: Matrix4's .getPosition() has been removed. Use Vector3.getPositionFromMatrix( matrix ) instead.");
      var b = this.elements;
      return a.set(b[12], b[13], b[14])
    }
  }(),
  setPosition: function (a) {
    var b = this.elements;
    b[12] = a.x;
    b[13] = a.y;
    b[14] = a.z;
    return this
  },
  getInverse: function (a, b) {
    var c = this.elements,
      d = a.elements,
      e = d[0],
      f = d[4],
      h = d[8],
      g = d[12],
      i = d[1],
      j = d[5],
      l = d[9],
      m = d[13],
      n = d[2],
      p = d[6],
      t = d[10],
      q = d[14],
      r = d[3],
      s = d[7],
      v = d[11],
      d = d[15];
    c[0] = l * q * s - m * t * s + m * p * v - j * q * v - l * p * d + j * t * d;
    c[4] = g * t * s - h * q * s - g * p * v + f * q * v + h * p * d - f * t * d;
    c[8] = h * m * s - g * l * s + g * j * v - f * m * v - h * j * d + f * l * d;
    c[12] = g * l * p - h * m * p - g * j * t + f * m * t + h * j * q - f * l * q;
    c[1] = m * t * r - l * q * r - m * n * v + i * q * v + l * n * d - i * t * d;
    c[5] = h * q * r - g * t * r + g * n * v - e * q * v - h * n * d + e * t * d;
    c[9] = g * l * r - h * m * r - g * i * v + e * m * v + h * i * d -
      e * l * d;
    c[13] = h * m * n - g * l * n + g * i * t - e * m * t - h * i * q + e * l * q;
    c[2] = j * q * r - m * p * r + m * n * s - i * q * s - j * n * d + i * p * d;
    c[6] = g * p * r - f * q * r - g * n * s + e * q * s + f * n * d - e * p * d;
    c[10] = f * m * r - g * j * r + g * i * s - e * m * s - f * i * d + e * j * d;
    c[14] = g * j * n - f * m * n - g * i * p + e * m * p + f * i * q - e * j * q;
    c[3] = l * p * r - j * t * r - l * n * s + i * t * s + j * n * v - i * p * v;
    c[7] = f * t * r - h * p * r + h * n * s - e * t * s - f * n * v + e * p * v;
    c[11] = h * j * r - f * l * r - h * i * s + e * l * s + f * i * v - e * j * v;
    c[15] = f * l * n - h * j * n + h * i * p - e * l * p - f * i * t + e * j * t;
    c = e * c[0] + i * c[4] + n * c[8] + r * c[12];
    if (0 == c) {
      if (b) throw Error("Matrix4.getInverse(): can't invert matrix, determinant is 0");
      console.warn("Matrix4.getInverse(): can't invert matrix, determinant is 0");
      this.identity();
      return this
    }
    this.multiplyScalar(1 / c);
    return this
  },
  translate: function () {
    console.warn("DEPRECATED: Matrix4's .translate() has been removed.")
  },
  rotateX: function () {
    console.warn("DEPRECATED: Matrix4's .rotateX() has been removed.")
  },
  rotateY: function () {
    console.warn("DEPRECATED: Matrix4's .rotateY() has been removed.")
  },
  rotateZ: function () {
    console.warn("DEPRECATED: Matrix4's .rotateZ() has been removed.")
  },
  rotateByAxis: function () {
    console.warn("DEPRECATED: Matrix4's .rotateByAxis() has been removed.")
  },
  scale: function (a) {
    var b = this.elements,
      c = a.x,
      d = a.y,
      a = a.z;
    b[0] *= c;
    b[4] *= d;
    b[8] *= a;
    b[1] *= c;
    b[5] *= d;
    b[9] *= a;
    b[2] *= c;
    b[6] *= d;
    b[10] *= a;
    b[3] *= c;
    b[7] *= d;
    b[11] *= a;
    return this
  },
  getMaxScaleOnAxis: function () {
    var a = this.elements;
    return Math.sqrt(Math.max(a[0] * a[0] + a[1] * a[1] + a[2] * a[2], Math.max(a[4] * a[4] + a[5] * a[5] + a[6] * a[6], a[8] * a[8] + a[9] * a[9] + a[10] * a[10])))
  },
  makeTranslation: function (a, b, c) {
    this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1);
    return this
  },
  makeRotationX: function (a) {
    var b = Math.cos(a),
      a = Math.sin(a);
    this.set(1,
      0, 0, 0, 0, b, -a, 0, 0, a, b, 0, 0, 0, 0, 1);
    return this
  },
  makeRotationY: function (a) {
    var b = Math.cos(a),
      a = Math.sin(a);
    this.set(b, 0, a, 0, 0, 1, 0, 0, -a, 0, b, 0, 0, 0, 0, 1);
    return this
  },
  makeRotationZ: function (a) {
    var b = Math.cos(a),
      a = Math.sin(a);
    this.set(b, -a, 0, 0, a, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this
  },
  makeRotationAxis: function (a, b) {
    var c = Math.cos(b),
      d = Math.sin(b),
      e = 1 - c,
      f = a.x,
      h = a.y,
      g = a.z,
      i = e * f,
      j = e * h;
    this.set(i * f + c, i * h - d * g, i * g + d * h, 0, i * h + d * g, j * h + c, j * g - d * f, 0, i * g - d * h, j * g + d * f, e * g * g + c, 0, 0, 0, 0, 1);
    return this
  },
  makeScale: function (a, b, c) {
    this.set(a,
      0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1);
    return this
  },
  compose: function (a, b, c) {
    this.makeRotationFromQuaternion(b);
    this.scale(c);
    this.setPosition(a);
    return this
  },
  decompose: function () {
    var a = new THREE.Vector3,
      b = new THREE.Matrix4;
    return function (c, d, e) {
      var f = this.elements,
        h = a.set(f[0], f[1], f[2]).length(),
        g = a.set(f[4], f[5], f[6]).length(),
        i = a.set(f[8], f[9], f[10]).length();
      c.x = f[12];
      c.y = f[13];
      c.z = f[14];
      b.elements.set(this.elements);
      var c = 1 / h,
        f = 1 / g,
        j = 1 / i;
      b.elements[0] *= c;
      b.elements[1] *= c;
      b.elements[2] *= c;
      b.elements[4] *=
        f;
      b.elements[5] *= f;
      b.elements[6] *= f;
      b.elements[8] *= j;
      b.elements[9] *= j;
      b.elements[10] *= j;
      d.setFromRotationMatrix(b);
      e.x = h;
      e.y = g;
      e.z = i;
      return this
    }
  }(),
  makeFrustum: function (a, b, c, d, e, f) {
    var h = this.elements;
    h[0] = 2 * e / (b - a);
    h[4] = 0;
    h[8] = (b + a) / (b - a);
    h[12] = 0;
    h[1] = 0;
    h[5] = 2 * e / (d - c);
    h[9] = (d + c) / (d - c);
    h[13] = 0;
    h[2] = 0;
    h[6] = 0;
    h[10] = -(f + e) / (f - e);
    h[14] = -2 * f * e / (f - e);
    h[3] = 0;
    h[7] = 0;
    h[11] = -1;
    h[15] = 0;
    return this
  },
  makePerspective: function (a, b, c, d) {
    var a = c * Math.tan(THREE.Math.degToRad(0.5 * a)),
      e = -a;
    return this.makeFrustum(e *
      b, a * b, e, a, c, d)
  },
  makeOrthographic: function (a, b, c, d, e, f) {
    var h = this.elements,
      g = b - a,
      i = c - d,
      j = f - e;
    h[0] = 2 / g;
    h[4] = 0;
    h[8] = 0;
    h[12] = -((b + a) / g);
    h[1] = 0;
    h[5] = 2 / i;
    h[9] = 0;
    h[13] = -((c + d) / i);
    h[2] = 0;
    h[6] = 0;
    h[10] = -2 / j;
    h[14] = -((f + e) / j);
    h[3] = 0;
    h[7] = 0;
    h[11] = 0;
    h[15] = 1;
    return this
  },
  fromArray: function (a) {
    this.elements.set(a);
    return this
  },
  toArray: function () {
    var a = this.elements;
    return [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]]
  },
  clone: function () {
    var a = this.elements;
    return new THREE.Matrix4(a[0],
      a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15])
  }
};
THREE.Ray = function (a, b) {
  this.origin = void 0 !== a ? a : new THREE.Vector3;
  this.direction = void 0 !== b ? b : new THREE.Vector3
};
THREE.Ray.prototype = {
  constructor: THREE.Ray,
  set: function (a, b) {
    this.origin.copy(a);
    this.direction.copy(b);
    return this
  },
  copy: function (a) {
    this.origin.copy(a.origin);
    this.direction.copy(a.direction);
    return this
  },
  at: function (a, b) {
    return (b || new THREE.Vector3).copy(this.direction).multiplyScalar(a).add(this.origin)
  },
  recast: function () {
    var a = new THREE.Vector3;
    return function (b) {
      this.origin.copy(this.at(b, a));
      return this
    }
  }(),
  closestPointToPoint: function (a, b) {
    var c = b || new THREE.Vector3;
    c.subVectors(a, this.origin);
    var d = c.dot(this.direction);
    return 0 > d ? c.copy(this.origin) : c.copy(this.direction).multiplyScalar(d).add(this.origin)
  },
  distanceToPoint: function () {
    var a = new THREE.Vector3;
    return function (b) {
      var c = a.subVectors(b, this.origin).dot(this.direction);
      if (0 > c) return this.origin.distanceTo(b);
      a.copy(this.direction).multiplyScalar(c).add(this.origin);
      return a.distanceTo(b)
    }
  }(),
  distanceSqToSegment: function (a, b, c, d) {
    var e = a.clone().add(b).multiplyScalar(0.5),
      f = b.clone().sub(a).normalize(),
      h = 0.5 * a.distanceTo(b),
      g = this.origin.clone().sub(e),
      a = -this.direction.dot(f),
      b = g.dot(this.direction),
      i = -g.dot(f),
      j = g.lengthSq(),
      l = Math.abs(1 - a * a),
      m, n;
    0 <= l ? (g = a * i - b, m = a * b - i, n = h * l, 0 <= g ? m >= -n ? m <= n ? (h = 1 / l, g *= h, m *= h, a = g * (g + a * m + 2 * b) + m * (a * g + m + 2 * i) + j) : (m = h, g = Math.max(0, -(a * m + b)), a = -g * g + m * (m + 2 * i) + j) : (m = -h, g = Math.max(0, -(a * m + b)), a = -g * g + m * (m + 2 * i) + j) : m <= -n ? (g = Math.max(0, -(-a * h + b)), m = 0 < g ? -h : Math.min(Math.max(-h, -i), h), a = -g * g + m * (m + 2 * i) + j) : m <= n ? (g = 0, m = Math.min(Math.max(-h, -i), h), a = m * (m + 2 * i) + j) : (g = Math.max(0, -(a * h + b)), m = 0 < g ? h : Math.min(Math.max(-h,
      -i), h), a = -g * g + m * (m + 2 * i) + j)) : (m = 0 < a ? -h : h, g = Math.max(0, -(a * m + b)), a = -g * g + m * (m + 2 * i) + j);
    c && c.copy(this.direction.clone().multiplyScalar(g).add(this.origin));
    d && d.copy(f.clone().multiplyScalar(m).add(e));
    return a
  },
  isIntersectionSphere: function (a) {
    return this.distanceToPoint(a.center) <= a.radius
  },
  isIntersectionPlane: function (a) {
    var b = a.distanceToPoint(this.origin);
    return 0 === b || 0 > a.normal.dot(this.direction) * b ? !0 : !1
  },
  distanceToPlane: function (a) {
    var b = a.normal.dot(this.direction);
    if (0 == b) return 0 == a.distanceToPoint(this.origin) ?
      0 : null;
    a = -(this.origin.dot(a.normal) + a.constant) / b;
    return 0 <= a ? a : null
  },
  intersectPlane: function (a, b) {
    var c = this.distanceToPlane(a);
    return null === c ? null : this.at(c, b)
  },
  applyMatrix4: function (a) {
    this.direction.add(this.origin).applyMatrix4(a);
    this.origin.applyMatrix4(a);
    this.direction.sub(this.origin);
    return this
  },
  equals: function (a) {
    return a.origin.equals(this.origin) && a.direction.equals(this.direction)
  },
  clone: function () {
    return (new THREE.Ray).copy(this)
  }
};
THREE.Sphere = function (a, b) {
  this.center = void 0 !== a ? a : new THREE.Vector3;
  this.radius = void 0 !== b ? b : 0
};
THREE.Sphere.prototype = {
  constructor: THREE.Sphere,
  set: function (a, b) {
    this.center.copy(a);
    this.radius = b;
    return this
  },
  setFromPoints: function (a) {
    for (var b, c = 0, d = 0, e = a.length; d < e; d++) b = a[d].lengthSq(), c = Math.max(c, b);
    this.center.set(0, 0, 0);
    this.radius = Math.sqrt(c);
    return this
  },
  copy: function (a) {
    this.center.copy(a.center);
    this.radius = a.radius;
    return this
  },
  empty: function () {
    return 0 >= this.radius
  },
  containsPoint: function (a) {
    return a.distanceToSquared(this.center) <= this.radius * this.radius
  },
  distanceToPoint: function (a) {
    return a.distanceTo(this.center) -
      this.radius
  },
  intersectsSphere: function (a) {
    var b = this.radius + a.radius;
    return a.center.distanceToSquared(this.center) <= b * b
  },
  clampPoint: function (a, b) {
    var c = this.center.distanceToSquared(a),
      d = b || new THREE.Vector3;
    d.copy(a);
    c > this.radius * this.radius && (d.sub(this.center).normalize(), d.multiplyScalar(this.radius).add(this.center));
    return d
  },
  getBoundingBox: function (a) {
    a = a || new THREE.Box3;
    a.set(this.center, this.center);
    a.expandByScalar(this.radius);
    return a
  },
  applyMatrix4: function (a) {
    this.center.applyMatrix4(a);
    this.radius *= a.getMaxScaleOnAxis();
    return this
  },
  translate: function (a) {
    this.center.add(a);
    return this
  },
  equals: function (a) {
    return a.center.equals(this.center) && a.radius === this.radius
  },
  clone: function () {
    return (new THREE.Sphere).copy(this)
  }
};
THREE.Frustum = function (a, b, c, d, e, f) {
  this.planes = [void 0 !== a ? a : new THREE.Plane, void 0 !== b ? b : new THREE.Plane, void 0 !== c ? c : new THREE.Plane, void 0 !== d ? d : new THREE.Plane, void 0 !== e ? e : new THREE.Plane, void 0 !== f ? f : new THREE.Plane]
};
THREE.Frustum.prototype = {
  constructor: THREE.Frustum,
  set: function (a, b, c, d, e, f) {
    var h = this.planes;
    h[0].copy(a);
    h[1].copy(b);
    h[2].copy(c);
    h[3].copy(d);
    h[4].copy(e);
    h[5].copy(f);
    return this
  },
  copy: function (a) {
    for (var b = this.planes, c = 0; 6 > c; c++) b[c].copy(a.planes[c]);
    return this
  },
  setFromMatrix: function (a) {
    var b = this.planes,
      c = a.elements,
      a = c[0],
      d = c[1],
      e = c[2],
      f = c[3],
      h = c[4],
      g = c[5],
      i = c[6],
      j = c[7],
      l = c[8],
      m = c[9],
      n = c[10],
      p = c[11],
      t = c[12],
      q = c[13],
      r = c[14],
      c = c[15];
    b[0].setComponents(f - a, j - h, p - l, c - t).normalize();
    b[1].setComponents(f +
      a, j + h, p + l, c + t).normalize();
    b[2].setComponents(f + d, j + g, p + m, c + q).normalize();
    b[3].setComponents(f - d, j - g, p - m, c - q).normalize();
    b[4].setComponents(f - e, j - i, p - n, c - r).normalize();
    b[5].setComponents(f + e, j + i, p + n, c + r).normalize();
    return this
  },
  intersectsObject: function () {
    var a = new THREE.Vector3;
    return function (b) {
      var c = b.geometry,
        b = b.matrixWorld;
      null === c.boundingSphere && c.computeBoundingSphere();
      c = -c.boundingSphere.radius * b.getMaxScaleOnAxis();
      a.getPositionFromMatrix(b);
      for (var b = this.planes, d = 0; 6 > d; d++)
        if (b[d].distanceToPoint(a) <
          c) return !1;
      return !0
    }
  }(),
  intersectsSphere: function (a) {
    for (var b = this.planes, c = a.center, a = -a.radius, d = 0; 6 > d; d++)
      if (b[d].distanceToPoint(c) < a) return !1;
    return !0
  },
  intersectsBox: function () {
    var a = new THREE.Vector3,
      b = new THREE.Vector3;
    return function (c) {
      for (var d = this.planes, e = 0; 6 > e; e++) {
        var f = d[e];
        a.x = 0 < f.normal.x ? c.min.x : c.max.x;
        b.x = 0 < f.normal.x ? c.max.x : c.min.x;
        a.y = 0 < f.normal.y ? c.min.y : c.max.y;
        b.y = 0 < f.normal.y ? c.max.y : c.min.y;
        a.z = 0 < f.normal.z ? c.min.z : c.max.z;
        b.z = 0 < f.normal.z ? c.max.z : c.min.z;
        var h = f.distanceToPoint(a),
          f = f.distanceToPoint(b);
        if (0 > h && 0 > f) return !1
      }
      return !0
    }
  }(),
  containsPoint: function (a) {
    for (var b = this.planes, c = 0; 6 > c; c++)
      if (0 > b[c].distanceToPoint(a)) return !1;
    return !0
  },
  clone: function () {
    return (new THREE.Frustum).copy(this)
  }
};
THREE.Plane = function (a, b) {
  this.normal = void 0 !== a ? a : new THREE.Vector3(1, 0, 0);
  this.constant = void 0 !== b ? b : 0
};
THREE.Plane.prototype = {
  constructor: THREE.Plane,
  set: function (a, b) {
    this.normal.copy(a);
    this.constant = b;
    return this
  },
  setComponents: function (a, b, c, d) {
    this.normal.set(a, b, c);
    this.constant = d;
    return this
  },
  setFromNormalAndCoplanarPoint: function (a, b) {
    this.normal.copy(a);
    this.constant = -b.dot(this.normal);
    return this
  },
  setFromCoplanarPoints: function () {
    var a = new THREE.Vector3,
      b = new THREE.Vector3;
    return function (c, d, e) {
      d = a.subVectors(e, d).cross(b.subVectors(c, d)).normalize();
      this.setFromNormalAndCoplanarPoint(d,
        c);
      return this
    }
  }(),
  copy: function (a) {
    this.normal.copy(a.normal);
    this.constant = a.constant;
    return this
  },
  normalize: function () {
    var a = 1 / this.normal.length();
    this.normal.multiplyScalar(a);
    this.constant *= a;
    return this
  },
  negate: function () {
    this.constant *= -1;
    this.normal.negate();
    return this
  },
  distanceToPoint: function (a) {
    return this.normal.dot(a) + this.constant
  },
  distanceToSphere: function (a) {
    return this.distanceToPoint(a.center) - a.radius
  },
  projectPoint: function (a, b) {
    return this.orthoPoint(a, b).sub(a).negate()
  },
  orthoPoint: function (a,
    b) {
    var c = this.distanceToPoint(a);
    return (b || new THREE.Vector3).copy(this.normal).multiplyScalar(c)
  },
  isIntersectionLine: function (a) {
    var b = this.distanceToPoint(a.start),
      a = this.distanceToPoint(a.end);
    return 0 > b && 0 < a || 0 > a && 0 < b
  },
  intersectLine: function () {
    var a = new THREE.Vector3;
    return function (b, c) {
      var d = c || new THREE.Vector3,
        e = b.delta(a),
        f = this.normal.dot(e);
      if (0 == f) {
        if (0 == this.distanceToPoint(b.start)) return d.copy(b.start)
      } else return f = -(b.start.dot(this.normal) + this.constant) / f, 0 > f || 1 < f ? void 0 : d.copy(e).multiplyScalar(f).add(b.start)
    }
  }(),
  coplanarPoint: function (a) {
    return (a || new THREE.Vector3).copy(this.normal).multiplyScalar(-this.constant)
  },
  applyMatrix4: function () {
    var a = new THREE.Vector3,
      b = new THREE.Vector3;
    return function (c, d) {
      var d = d || (new THREE.Matrix3).getNormalMatrix(c),
        e = a.copy(this.normal).applyMatrix3(d),
        f = this.coplanarPoint(b);
      f.applyMatrix4(c);
      this.setFromNormalAndCoplanarPoint(e, f);
      return this
    }
  }(),
  translate: function (a) {
    this.constant -= a.dot(this.normal);
    return this
  },
  equals: function (a) {
    return a.normal.equals(this.normal) &&
      a.constant == this.constant
  },
  clone: function () {
    return (new THREE.Plane).copy(this)
  }
};
THREE.Math = {
  PI2: 2 * Math.PI,
  generateUUID: function () {
    var a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
      b = Array(36),
      c = 0,
      d;
    return function () {
      for (var e = 0; 36 > e; e++) 8 == e || 13 == e || 18 == e || 23 == e ? b[e] = "-" : 14 == e ? b[e] = "4" : (2 >= c && (c = 33554432 + 16777216 * Math.random() | 0), d = c & 15, c >>= 4, b[e] = a[19 == e ? d & 3 | 8 : d]);
      return b.join("")
    }
  }(),
  clamp: function (a, b, c) {
    return a < b ? b : a > c ? c : a
  },
  clampBottom: function (a, b) {
    return a < b ? b : a
  },
  mapLinear: function (a, b, c, d, e) {
    return d + (a - b) * (e - d) / (c - b)
  },
  smoothstep: function (a,
    b, c) {
    if (a <= b) return 0;
    if (a >= c) return 1;
    a = (a - b) / (c - b);
    return a * a * (3 - 2 * a)
  },
  smootherstep: function (a, b, c) {
    if (a <= b) return 0;
    if (a >= c) return 1;
    a = (a - b) / (c - b);
    return a * a * a * (a * (6 * a - 15) + 10)
  },
  random16: function () {
    return (65280 * Math.random() + 255 * Math.random()) / 65535
  },
  randInt: function (a, b) {
    return a + Math.floor(Math.random() * (b - a + 1))
  },
  randFloat: function (a, b) {
    return a + Math.random() * (b - a)
  },
  randFloatSpread: function (a) {
    return a * (0.5 - Math.random())
  },
  sign: function (a) {
    return 0 > a ? -1 : 0 < a ? 1 : 0
  },
  degToRad: function () {
    var a = Math.PI /
      180;
    return function (b) {
      return b * a
    }
  }(),
  radToDeg: function () {
    var a = 180 / Math.PI;
    return function (b) {
      return b * a
    }
  }()
};
THREE.Spline = function (a) {
  function b(a, b, c, d, e, f, h) {
    a = 0.5 * (c - a);
    d = 0.5 * (d - b);
    return (2 * (b - c) + a + d) * h + (-3 * (b - c) - 2 * a - d) * f + a * e + b
  }
  this.points = a;
  var c = [],
    d = {
      x: 0,
      y: 0,
      z: 0
    },
    e, f, h, g, i, j, l, m, n;
  this.initFromArray = function (a) {
    this.points = [];
    for (var b = 0; b < a.length; b++) this.points[b] = {
      x: a[b][0],
      y: a[b][1],
      z: a[b][2]
    }
  };
  this.getPoint = function (a) {
    e = (this.points.length - 1) * a;
    f = Math.floor(e);
    h = e - f;
    c[0] = 0 === f ? f : f - 1;
    c[1] = f;
    c[2] = f > this.points.length - 2 ? this.points.length - 1 : f + 1;
    c[3] = f > this.points.length - 3 ? this.points.length - 1 :
      f + 2;
    j = this.points[c[0]];
    l = this.points[c[1]];
    m = this.points[c[2]];
    n = this.points[c[3]];
    g = h * h;
    i = h * g;
    d.x = b(j.x, l.x, m.x, n.x, h, g, i);
    d.y = b(j.y, l.y, m.y, n.y, h, g, i);
    d.z = b(j.z, l.z, m.z, n.z, h, g, i);
    return d
  };
  this.getControlPointsArray = function () {
    var a, b, c = this.points.length,
      d = [];
    for (a = 0; a < c; a++) b = this.points[a], d[a] = [b.x, b.y, b.z];
    return d
  };
  this.getLength = function (a) {
    var b, c, d, e = b = b = 0,
      f = new THREE.Vector3,
      h = new THREE.Vector3,
      g = [],
      i = 0;
    g[0] = 0;
    a || (a = 100);
    c = this.points.length * a;
    f.copy(this.points[0]);
    for (a = 1; a < c; a++) b =
      a / c, d = this.getPoint(b), h.copy(d), i += h.distanceTo(f), f.copy(d), b *= this.points.length - 1, b = Math.floor(b), b != e && (g[b] = i, e = b);
    g[g.length] = i;
    return {
      chunks: g,
      total: i
    }
  };
  this.reparametrizeByArcLength = function (a) {
    var b, c, d, e, f, h, g = [],
      i = new THREE.Vector3,
      j = this.getLength();
    g.push(i.copy(this.points[0]).clone());
    for (b = 1; b < this.points.length; b++) {
      c = j.chunks[b] - j.chunks[b - 1];
      h = Math.ceil(a * c / j.total);
      e = (b - 1) / (this.points.length - 1);
      f = b / (this.points.length - 1);
      for (c = 1; c < h - 1; c++) d = e + c * (1 / h) * (f - e), d = this.getPoint(d),
        g.push(i.copy(d).clone());
      g.push(i.copy(this.points[b]).clone())
    }
    this.points = g
  }
};
THREE.Triangle = function (a, b, c) {
  this.a = void 0 !== a ? a : new THREE.Vector3;
  this.b = void 0 !== b ? b : new THREE.Vector3;
  this.c = void 0 !== c ? c : new THREE.Vector3
};
THREE.Triangle.normal = function () {
  var a = new THREE.Vector3;
  return function (b, c, d, e) {
    e = e || new THREE.Vector3;
    e.subVectors(d, c);
    a.subVectors(b, c);
    e.cross(a);
    b = e.lengthSq();
    return 0 < b ? e.multiplyScalar(1 / Math.sqrt(b)) : e.set(0, 0, 0)
  }
}();
THREE.Triangle.barycoordFromPoint = function () {
  var a = new THREE.Vector3,
    b = new THREE.Vector3,
    c = new THREE.Vector3;
  return function (d, e, f, h, g) {
    a.subVectors(h, e);
    b.subVectors(f, e);
    c.subVectors(d, e);
    var d = a.dot(a),
      e = a.dot(b),
      f = a.dot(c),
      i = b.dot(b),
      h = b.dot(c),
      j = d * i - e * e,
      g = g || new THREE.Vector3;
    if (0 == j) return g.set(-2, -1, -1);
    j = 1 / j;
    i = (i * f - e * h) * j;
    d = (d * h - e * f) * j;
    return g.set(1 - i - d, d, i)
  }
}();
THREE.Triangle.containsPoint = function () {
  var a = new THREE.Vector3;
  return function (b, c, d, e) {
    b = THREE.Triangle.barycoordFromPoint(b, c, d, e, a);
    return 0 <= b.x && 0 <= b.y && 1 >= b.x + b.y
  }
}();
THREE.Triangle.prototype = {
  constructor: THREE.Triangle,
  set: function (a, b, c) {
    this.a.copy(a);
    this.b.copy(b);
    this.c.copy(c);
    return this
  },
  setFromPointsAndIndices: function (a, b, c, d) {
    this.a.copy(a[b]);
    this.b.copy(a[c]);
    this.c.copy(a[d]);
    return this
  },
  copy: function (a) {
    this.a.copy(a.a);
    this.b.copy(a.b);
    this.c.copy(a.c);
    return this
  },
  area: function () {
    var a = new THREE.Vector3,
      b = new THREE.Vector3;
    return function () {
      a.subVectors(this.c, this.b);
      b.subVectors(this.a, this.b);
      return 0.5 * a.cross(b).length()
    }
  }(),
  midpoint: function (a) {
    return (a ||
      new THREE.Vector3).addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
  },
  normal: function (a) {
    return THREE.Triangle.normal(this.a, this.b, this.c, a)
  },
  plane: function (a) {
    return (a || new THREE.Plane).setFromCoplanarPoints(this.a, this.b, this.c)
  },
  barycoordFromPoint: function (a, b) {
    return THREE.Triangle.barycoordFromPoint(a, this.a, this.b, this.c, b)
  },
  containsPoint: function (a) {
    return THREE.Triangle.containsPoint(a, this.a, this.b, this.c)
  },
  equals: function (a) {
    return a.a.equals(this.a) && a.b.equals(this.b) && a.c.equals(this.c)
  },
  clone: function () {
    return (new THREE.Triangle).copy(this)
  }
};
THREE.Vertex = function (a) {
  console.warn("THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead.");
  return a
};
THREE.UV = function (a, b) {
  console.warn("THREE.UV has been DEPRECATED. Use THREE.Vector2 instead.");
  return new THREE.Vector2(a, b)
};
THREE.Clock = function (a) {
  this.autoStart = void 0 !== a ? a : !0;
  this.elapsedTime = this.oldTime = this.startTime = 0;
  this.running = !1
};
THREE.Clock.prototype = {
  constructor: THREE.Clock,
  start: function () {
    this.oldTime = this.startTime = void 0 !== self.performance && void 0 !== self.performance.now ? self.performance.now() : Date.now();
    this.running = !0
  },
  stop: function () {
    this.getElapsedTime();
    this.running = !1
  },
  getElapsedTime: function () {
    this.getDelta();
    return this.elapsedTime
  },
  getDelta: function () {
    var a = 0;
    this.autoStart && !this.running && this.start();
    if (this.running) {
      var b = void 0 !== self.performance && void 0 !== self.performance.now ? self.performance.now() : Date.now(),
        a = 0.001 * (b - this.oldTime);
      this.oldTime = b;
      this.elapsedTime += a
    }
    return a
  }
};
THREE.EventDispatcher = function () {};
THREE.EventDispatcher.prototype = {
  constructor: THREE.EventDispatcher,
  apply: function (a) {
    a.addEventListener = THREE.EventDispatcher.prototype.addEventListener;
    a.hasEventListener = THREE.EventDispatcher.prototype.hasEventListener;
    a.removeEventListener = THREE.EventDispatcher.prototype.removeEventListener;
    a.dispatchEvent = THREE.EventDispatcher.prototype.dispatchEvent
  },
  addEventListener: function (a, b) {
    void 0 === this._listeners && (this._listeners = {});
    var c = this._listeners;
    void 0 === c[a] && (c[a] = []); - 1 === c[a].indexOf(b) &&
      c[a].push(b)
  },
  hasEventListener: function (a, b) {
    if (void 0 === this._listeners) return !1;
    var c = this._listeners;
    return void 0 !== c[a] && -1 !== c[a].indexOf(b) ? !0 : !1
  },
  removeEventListener: function (a, b) {
    if (void 0 !== this._listeners) {
      var c = this._listeners,
        d = c[a].indexOf(b); - 1 !== d && c[a].splice(d, 1)
    }
  },
  dispatchEvent: function (a) {
    if (void 0 !== this._listeners) {
      var b = this._listeners[a.type];
      if (void 0 !== b) {
        a.target = this;
        for (var c = 0, d = b.length; c < d; c++) b[c].call(this, a)
      }
    }
  }
};
(function (a) {
  a.Raycaster = function (b, c, d, e) {
    this.ray = new a.Ray(b, c);
    0 < this.ray.direction.lengthSq() && this.ray.direction.normalize();
    this.near = d || 0;
    this.far = e || Infinity
  };
  var b = new a.Sphere,
    c = new a.Ray,
    d = new a.Plane,
    e = new a.Vector3,
    f = new a.Vector3,
    h = new a.Matrix4,
    g = function (a, b) {
      return a.distance - b.distance
    },
    i = function (g, j, n) {
      if (g instanceof a.Particle) {
        f.getPositionFromMatrix(g.matrixWorld);
        var p = j.ray.distanceToPoint(f);
        if (p > g.scale.x) return n;
        n.push({
          distance: p,
          point: g.position,
          face: null,
          object: g
        })
      } else if (g instanceof a.LOD) f.getPositionFromMatrix(g.matrixWorld), p = j.ray.origin.distanceTo(f), i(g.getObjectForDistance(p), j, n);
      else if (g instanceof a.Mesh) {
        p = g.geometry;
        f.getPositionFromMatrix(g.matrixWorld);
        null === p.boundingSphere && p.computeBoundingSphere();
        b.set(f, p.boundingSphere.radius * g.matrixWorld.getMaxScaleOnAxis());
        if (!1 === j.ray.isIntersectionSphere(b)) return n;
        var t = p.vertices;
        if (p instanceof a.BufferGeometry) {
          var q = g.material;
          if (void 0 === q || !1 === p.dynamic) return n;
          var r = g.material instanceof a.MeshFaceMaterial,
            s = !0 === r ? g.material.materials : null,
            v = g.material.side,
            z, C, F = j.precision;
          h.getInverse(g.matrixWorld);
          c.copy(j.ray).applyMatrix4(h);
          var H, t = !1;
          p.attributes.index && (t = !0);
          s = new a.Vector3;
          H = new a.Vector3;
          var I = new a.Vector3;
          new a.Vector3;
          new a.Vector3;
          for (var G = 0; G < p.offsets.length; ++G)
            for (var A = p.offsets[G].start, K = p.offsets[G].index, r = A, B = A + p.offsets[G].count; r < B; r += 3)
              if (t ? (v = K + p.attributes.index.array[r], z = K + p.attributes.index.array[r + 1], C = K + p.attributes.index.array[r + 2]) : (v = K, z = K + 1, C = K + 2), s.set(p.attributes.position.array[3 *
                  v], p.attributes.position.array[3 * v + 1], p.attributes.position.array[3 * v + 2]), H.set(p.attributes.position.array[3 * z], p.attributes.position.array[3 * z + 1], p.attributes.position.array[3 * z + 2]), I.set(p.attributes.position.array[3 * C], p.attributes.position.array[3 * C + 1], p.attributes.position.array[3 * C + 2]), d.setFromCoplanarPoints(s, H, I), A = c.distanceToPlane(d), !(A < F) && null !== A) {
                v = q.side;
                if (v !== a.DoubleSide && (z = c.direction.dot(d.normal), !(v === a.FrontSide ? 0 > z : 0 < z))) continue;
                A < j.near || A > j.far || (e = c.at(A, e), !1 !== a.Triangle.containsPoint(e,
                  s, H, I) && n.push({
                  distance: A,
                  point: j.ray.at(A),
                  face: null,
                  faceIndex: null,
                  object: g
                }))
              }
        } else if (p instanceof a.Geometry) {
          r = g.material instanceof a.MeshFaceMaterial;
          s = !0 === r ? g.material.materials : null;
          F = j.precision;
          h.getInverse(g.matrixWorld);
          c.copy(j.ray).applyMatrix4(h);
          I = 0;
          for (H = p.faces.length; I < H; I++)
            if (G = p.faces[I], q = !0 === r ? s[G.materialIndex] : g.material, void 0 !== q && (d.setFromNormalAndCoplanarPoint(G.normal, t[G.a]), A = c.distanceToPlane(d), !(A < F) && null !== A)) {
              v = q.side;
              if (v !== a.DoubleSide && (z = c.direction.dot(d.normal),
                  !(v === a.FrontSide ? 0 > z : 0 < z))) continue;
              if (!(A < j.near || A > j.far)) {
                e = c.at(A, e);
                if (G instanceof a.Face3) {
                  if (v = t[G.a], z = t[G.b], C = t[G.c], !1 === a.Triangle.containsPoint(e, v, z, C)) continue
                } else if (G instanceof a.Face4) {
                  if (v = t[G.a], z = t[G.b], C = t[G.c], q = t[G.d], !1 === a.Triangle.containsPoint(e, v, z, q) && !1 === a.Triangle.containsPoint(e, z, C, q)) continue
                } else throw Error("face type not supported");
                n.push({
                  distance: A,
                  point: j.ray.at(A),
                  face: G,
                  faceIndex: I,
                  object: g
                })
              }
            }
        }
      } else if (g instanceof a.Line) {
        F = j.linePrecision;
        F *= F;
        p =
          g.geometry;
        null === p.boundingSphere && p.computeBoundingSphere();
        f.getPositionFromMatrix(g.matrixWorld);
        b.set(f, p.boundingSphere.radius * g.matrixWorld.getMaxScaleOnAxis());
        if (!1 === j.ray.isIntersectionSphere(b)) return n;
        h.getInverse(g.matrixWorld);
        c.copy(j.ray).applyMatrix4(h);
        c.direction.normalize();
        t = p.vertices;
        q = t.length;
        A = new a.Vector3;
        v = new a.Vector3;
        z = g.type === a.LineStrip ? 1 : 2;
        for (r = 0; r < q - 1; r += z) c.distanceSqToSegment(t[r], t[r + 1], v, A) <= F && (p = c.origin.distanceTo(v), j.near <= p && p <= j.far && n.push({
          distance: p,
          point: A.clone().applyMatrix4(g.matrixWorld),
          face: null,
          faceIndex: null,
          object: g
        }))
      }
    },
    j = function (a, b, c) {
      for (var a = a.getDescendants(), d = 0, e = a.length; d < e; d++) i(a[d], b, c)
    };
  a.Raycaster.prototype.precision = 1E-4;
  a.Raycaster.prototype.linePrecision = 1;
  a.Raycaster.prototype.set = function (a, b) {
    this.ray.set(a, b);
    0 < this.ray.direction.length() && this.ray.direction.normalize()
  };
  a.Raycaster.prototype.intersectObject = function (a, b) {
    var c = [];
    !0 === b && j(a, this, c);
    i(a, this, c);
    c.sort(g);
    return c
  };
  a.Raycaster.prototype.intersectObjects =
    function (a, b) {
      for (var c = [], d = 0, e = a.length; d < e; d++) i(a[d], this, c), !0 === b && j(a[d], this, c);
      c.sort(g);
      return c
    }
})(THREE);
THREE.Object3D = function () {
  this.id = THREE.Object3DIdCount++;
  this.uuid = THREE.Math.generateUUID();
  this.name = "";
  this.parent = void 0;
  this.children = [];
  this.up = new THREE.Vector3(0, 1, 0);
  this.position = new THREE.Vector3;
  this.rotation = new THREE.Euler;
  this.quaternion = new THREE.Quaternion;
  this.scale = new THREE.Vector3(1, 1, 1);
  this.rotation._quaternion = this.quaternion;
  this.quaternion._euler = this.rotation;
  this.renderDepth = null;
  this.rotationAutoUpdate = !0;
  this.matrix = new THREE.Matrix4;
  this.matrixWorld = new THREE.Matrix4;
  this.visible = this.matrixWorldNeedsUpdate = this.matrixAutoUpdate = !0;
  this.receiveShadow = this.castShadow = !1;
  this.frustumCulled = !0;
  this.userData = {}
};
THREE.Object3D.prototype = {
  constructor: THREE.Object3D,
  get eulerOrder() {
    console.warn("DEPRECATED: Object3D's .eulerOrder has been moved to Object3D's .rotation.order.");
    return this.rotation.order
  },
  set eulerOrder(a) {
    console.warn("DEPRECATED: Object3D's .eulerOrder has been moved to Object3D's .rotation.order.");
    this.rotation.order = a
  },
  get useQuaternion() {
    console.warn("DEPRECATED: Object3D's .useQuaternion has been removed. The library now uses quaternions by default.")
  },
  set useQuaternion(a) {
    console.warn("DEPRECATED: Object3D's .useQuaternion has been removed. The library now uses quaternions by default.")
  },
  applyMatrix: function () {
    var a = new THREE.Matrix4;
    return function (b) {
      this.matrix.multiplyMatrices(b, this.matrix);
      this.position.getPositionFromMatrix(this.matrix);
      this.scale.getScaleFromMatrix(this.matrix);
      a.extractRotation(this.matrix);
      this.quaternion.setFromRotationMatrix(a)
    }
  }(),
  setRotationFromAxisAngle: function (a, b) {
    this.quaternion.setFromAxisAngle(a, b)
  },
  setRotationFromEuler: function (a) {
    this.quaternion.setFromEuler(a, !0)
  },
  setRotationFromMatrix: function (a) {
    this.quaternion.setFromRotationMatrix(a)
  },
  setRotationFromQuaternion: function (a) {
    this.quaternion.copy(a)
  },
  rotateOnAxis: function () {
    var a = new THREE.Quaternion;
    return function (b, c) {
      a.setFromAxisAngle(b, c);
      this.quaternion.multiply(a);
      return this
    }
  }(),
  rotateX: function () {
    var a = new THREE.Vector3(1, 0, 0);
    return function (b) {
      return this.rotateOnAxis(a, b)
    }
  }(),
  rotateY: function () {
    var a = new THREE.Vector3(0, 1, 0);
    return function (b) {
      return this.rotateOnAxis(a, b)
    }
  }(),
  rotateZ: function () {
    var a = new THREE.Vector3(0, 0, 1);
    return function (b) {
      return this.rotateOnAxis(a,
        b)
    }
  }(),
  translateOnAxis: function () {
    var a = new THREE.Vector3;
    return function (b, c) {
      a.copy(b);
      a.applyQuaternion(this.quaternion);
      this.position.add(a.multiplyScalar(c));
      return this
    }
  }(),
  translate: function (a, b) {
    console.warn("DEPRECATED: Object3D's .translate() has been removed. Use .translateOnAxis( axis, distance ) instead. Note args have been changed.");
    return this.translateOnAxis(b, a)
  },
  translateX: function () {
    var a = new THREE.Vector3(1, 0, 0);
    return function (b) {
      return this.translateOnAxis(a, b)
    }
  }(),
  translateY: function () {
    var a =
      new THREE.Vector3(0, 1, 0);
    return function (b) {
      return this.translateOnAxis(a, b)
    }
  }(),
  translateZ: function () {
    var a = new THREE.Vector3(0, 0, 1);
    return function (b) {
      return this.translateOnAxis(a, b)
    }
  }(),
  localToWorld: function (a) {
    return a.applyMatrix4(this.matrixWorld)
  },
  worldToLocal: function () {
    var a = new THREE.Matrix4;
    return function (b) {
      return b.applyMatrix4(a.getInverse(this.matrixWorld))
    }
  }(),
  lookAt: function () {
    var a = new THREE.Matrix4;
    return function (b) {
      a.lookAt(b, this.position, this.up);
      this.quaternion.setFromRotationMatrix(a)
    }
  }(),
  add: function (a) {
    if (a === this) console.warn("THREE.Object3D.add: An object can't be added as a child of itself.");
    else if (a instanceof THREE.Object3D) {
      void 0 !== a.parent && a.parent.remove(a);
      a.parent = this;
      a.dispatchEvent({
        type: "added"
      });
      this.children.push(a);
      for (var b = this; void 0 !== b.parent;) b = b.parent;
      void 0 !== b && b instanceof THREE.Scene && b.__addObject(a)
    }
  },
  remove: function (a) {
    var b = this.children.indexOf(a);
    if (-1 !== b) {
      a.parent = void 0;
      a.dispatchEvent({
        type: "removed"
      });
      this.children.splice(b, 1);
      for (b = this; void 0 !==
        b.parent;) b = b.parent;
      void 0 !== b && b instanceof THREE.Scene && b.__removeObject(a)
    }
  },
  traverse: function (a) {
    a(this);
    for (var b = 0, c = this.children.length; b < c; b++) this.children[b].traverse(a)
  },
  getObjectById: function (a, b) {
    for (var c = 0, d = this.children.length; c < d; c++) {
      var e = this.children[c];
      if (e.id === a || !0 === b && (e = e.getObjectById(a, b), void 0 !== e)) return e
    }
  },
  getObjectByName: function (a, b) {
    for (var c = 0, d = this.children.length; c < d; c++) {
      var e = this.children[c];
      if (e.name === a || !0 === b && (e = e.getObjectByName(a, b), void 0 !==
          e)) return e
    }
  },
  getChildByName: function (a, b) {
    console.warn("DEPRECATED: Object3D's .getChildByName() has been renamed to .getObjectByName().");
    return this.getObjectByName(a, b)
  },
  getDescendants: function (a) {
    console.log(a);
    void 0 === a && (a = []);
    Array.prototype.push.apply(a, this.children);
    for (var b = 0, c = this.children.length; b < c; b++) this.children[b].getDescendants(a);
    return a
  },
  updateMatrix: function () {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    this.matrixWorldNeedsUpdate = !0
  },
  updateMatrixWorld: function (a) {
    !0 ===
      this.matrixAutoUpdate && this.updateMatrix();
    if (!0 === this.matrixWorldNeedsUpdate || !0 === a) void 0 === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, a = !0;
    for (var b = 0, c = this.children.length; b < c; b++) this.children[b].updateMatrixWorld(a)
  },
  clone: function (a, b) {
    void 0 === a && (a = new THREE.Object3D);
    void 0 === b && (b = !0);
    a.name = this.name;
    a.up.copy(this.up);
    a.position.copy(this.position);
    a.quaternion.copy(this.quaternion);
    a.scale.copy(this.scale);
    a.renderDepth = this.renderDepth;
    a.rotationAutoUpdate = this.rotationAutoUpdate;
    a.matrix.copy(this.matrix);
    a.matrixWorld.copy(this.matrixWorld);
    a.matrixAutoUpdate = this.matrixAutoUpdate;
    a.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate;
    a.visible = this.visible;
    a.castShadow = this.castShadow;
    a.receiveShadow = this.receiveShadow;
    a.frustumCulled = this.frustumCulled;
    a.userData = JSON.parse(JSON.stringify(this.userData));
    if (!0 === b)
      for (var c = 0; c < this.children.length; c++) a.add(this.children[c].clone());
    return a
  }
};
THREE.EventDispatcher.prototype.apply(THREE.Object3D.prototype);
THREE.Object3DIdCount = 0;
THREE.Projector = function () {
  function a() {
    if (i === l) {
      var a = new THREE.RenderableVertex;
      j.push(a);
      l++;
      i++;
      return a
    }
    return j[i++]
  }

  function b(a, b) {
    return a.z !== b.z ? b.z - a.z : a.id !== b.id ? a.id - b.id : 0
  }

  function c(a, b) {
    var c = 0,
      d = 1,
      e = a.z + a.w,
      f = b.z + b.w,
      h = -a.z + a.w,
      g = -b.z + b.w;
    if (0 <= e && 0 <= f && 0 <= h && 0 <= g) return !0;
    if (0 > e && 0 > f || 0 > h && 0 > g) return !1;
    0 > e ? c = Math.max(c, e / (e - f)) : 0 > f && (d = Math.min(d, e / (e - f)));
    0 > h ? c = Math.max(c, h / (h - g)) : 0 > g && (d = Math.min(d, h / (h - g)));
    if (d < c) return !1;
    a.lerp(b, c);
    b.lerp(a, 1 - d);
    return !0
  }
  var d, e, f = [],
    h =
    0,
    g, i, j = [],
    l = 0,
    m, n, p = [],
    t = 0,
    q, r = [],
    s = 0,
    v, z, C = [],
    F = 0,
    H, I, G = [],
    A = 0,
    K = {
      objects: [],
      sprites: [],
      lights: [],
      elements: []
    },
    B = new THREE.Vector3,
    J = new THREE.Vector4,
    N = new THREE.Box3(new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, 1, 1)),
    y = new THREE.Box3,
    M = Array(3),
    w = Array(4),
    Z = new THREE.Matrix4,
    L = new THREE.Matrix4,
    pa, Pa = new THREE.Matrix4,
    Ua = new THREE.Matrix3,
    O = new THREE.Matrix3,
    ka = new THREE.Vector3,
    Fa = new THREE.Frustum,
    wa = new THREE.Vector4,
    D = new THREE.Vector4;
  this.projectVector = function (a, b) {
    b.matrixWorldInverse.getInverse(b.matrixWorld);
    L.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse);
    return a.applyProjection(L)
  };
  this.unprojectVector = function (a, b) {
    b.projectionMatrixInverse.getInverse(b.projectionMatrix);
    L.multiplyMatrices(b.matrixWorld, b.projectionMatrixInverse);
    return a.applyProjection(L)
  };
  this.pickingRay = function (a, b) {
    a.z = -1;
    var c = new THREE.Vector3(a.x, a.y, 1);
    this.unprojectVector(a, b);
    this.unprojectVector(c, b);
    c.sub(a).normalize();
    return new THREE.Raycaster(a, c)
  };
  var V = function (a) {
      if (e === h) {
        var b = new THREE.RenderableObject;
        f.push(b);
        h++;
        e++;
        d = b
      } else d = f[e++];
      d.id = a.id;
      d.object = a;
      null !== a.renderDepth ? d.z = a.renderDepth : (B.getPositionFromMatrix(a.matrixWorld), B.applyProjection(L), d.z = B.z);
      return d
    },
    ea = function (a) {
      if (!1 !== a.visible) {
        a instanceof THREE.Light ? K.lights.push(a) : a instanceof THREE.Mesh || a instanceof THREE.Line ? (!1 === a.frustumCulled || !0 === Fa.intersectsObject(a)) && K.objects.push(V(a)) : (a instanceof THREE.Sprite || a instanceof THREE.Particle) && K.sprites.push(V(a));
        for (var b = 0, c = a.children.length; b < c; b++) ea(a.children[b])
      }
    };
  this.projectScene = function (d, f, h, l) {
    var V = !1,
      B, fa, da, T, aa, na, ha, X, xa, ab, la, ia, ra;
    I = z = q = n = 0;
    K.elements.length = 0;
    !0 === d.autoUpdate && d.updateMatrixWorld();
    void 0 === f.parent && f.updateMatrixWorld();
    Z.copy(f.matrixWorldInverse.getInverse(f.matrixWorld));
    L.multiplyMatrices(f.projectionMatrix, Z);
    O.getNormalMatrix(Z);
    Fa.setFromMatrix(L);
    e = 0;
    K.objects.length = 0;
    K.sprites.length = 0;
    K.lights.length = 0;
    ea(d);
    !0 === h && K.objects.sort(b);
    d = 0;
    for (h = K.objects.length; d < h; d++)
      if (X = K.objects[d].object, pa = X.matrixWorld, i =
        0, X instanceof THREE.Mesh) {
        xa = X.geometry;
        da = xa.vertices;
        ab = xa.faces;
        xa = xa.faceVertexUvs;
        Ua.getNormalMatrix(pa);
        ia = X.material instanceof THREE.MeshFaceMaterial;
        ra = !0 === ia ? X.material : null;
        B = 0;
        for (fa = da.length; B < fa; B++) {
          g = a();
          g.positionWorld.copy(da[B]).applyMatrix4(pa);
          g.positionScreen.copy(g.positionWorld).applyMatrix4(L);
          var ja = 1 / g.positionScreen.w;
          g.positionScreen.x *= ja;
          g.positionScreen.y *= ja;
          g.positionScreen.z *= ja;
          g.visible = !(-1 > g.positionScreen.x || 1 < g.positionScreen.x || -1 > g.positionScreen.y || 1 <
            g.positionScreen.y || -1 > g.positionScreen.z || 1 < g.positionScreen.z)
        }
        da = 0;
        for (B = ab.length; da < B; da++)
          if (fa = ab[da], ja = !0 === ia ? ra.materials[fa.materialIndex] : X.material, void 0 !== ja) {
            na = ja.side;
            if (fa instanceof THREE.Face3)
              if (T = j[fa.a], aa = j[fa.b], ha = j[fa.c], M[0] = T.positionScreen, M[1] = aa.positionScreen, M[2] = ha.positionScreen, !0 === T.visible || !0 === aa.visible || !0 === ha.visible || N.isIntersectionBox(y.setFromPoints(M)))
                if (V = 0 > (ha.positionScreen.x - T.positionScreen.x) * (aa.positionScreen.y - T.positionScreen.y) - (ha.positionScreen.y -
                    T.positionScreen.y) * (aa.positionScreen.x - T.positionScreen.x), na === THREE.DoubleSide || V === (na === THREE.FrontSide)) n === t ? (la = new THREE.RenderableFace3, p.push(la), t++, n++, m = la) : m = p[n++], m.id = X.id, m.v1.copy(T), m.v2.copy(aa), m.v3.copy(ha);
                else continue;
            else continue;
            else if (fa instanceof THREE.Face4)
              if (T = j[fa.a], aa = j[fa.b], ha = j[fa.c], la = j[fa.d], w[0] = T.positionScreen, w[1] = aa.positionScreen, w[2] = ha.positionScreen, w[3] = la.positionScreen, !0 === T.visible || !0 === aa.visible || !0 === ha.visible || !0 === la.visible || N.isIntersectionBox(y.setFromPoints(w)))
                if (V =
                  0 > (la.positionScreen.x - T.positionScreen.x) * (aa.positionScreen.y - T.positionScreen.y) - (la.positionScreen.y - T.positionScreen.y) * (aa.positionScreen.x - T.positionScreen.x) || 0 > (aa.positionScreen.x - ha.positionScreen.x) * (la.positionScreen.y - ha.positionScreen.y) - (aa.positionScreen.y - ha.positionScreen.y) * (la.positionScreen.x - ha.positionScreen.x), na === THREE.DoubleSide || V === (na === THREE.FrontSide)) {
                  if (q === s) {
                    var ua = new THREE.RenderableFace4;
                    r.push(ua);
                    s++;
                    q++;
                    m = ua
                  } else m = r[q++];
                  m.id = X.id;
                  m.v1.copy(T);
                  m.v2.copy(aa);
                  m.v3.copy(ha);
                  m.v4.copy(la)
                } else continue;
            else continue;
            m.normalModel.copy(fa.normal);
            !1 === V && (na === THREE.BackSide || na === THREE.DoubleSide) && m.normalModel.negate();
            m.normalModel.applyMatrix3(Ua).normalize();
            m.normalModelView.copy(m.normalModel).applyMatrix3(O);
            m.centroidModel.copy(fa.centroid).applyMatrix4(pa);
            ha = fa.vertexNormals;
            T = 0;
            for (aa = ha.length; T < aa; T++) la = m.vertexNormalsModel[T], la.copy(ha[T]), !1 === V && (na === THREE.BackSide || na === THREE.DoubleSide) && la.negate(), la.applyMatrix3(Ua).normalize(),
              m.vertexNormalsModelView[T].copy(la).applyMatrix3(O);
            m.vertexNormalsLength = ha.length;
            T = 0;
            for (aa = xa.length; T < aa; T++)
              if (la = xa[T][da], void 0 !== la) {
                na = 0;
                for (ha = la.length; na < ha; na++) m.uvs[T][na] = la[na]
              } m.color = fa.color;
            m.material = ja;
            ka.copy(m.centroidModel).applyProjection(L);
            m.z = ka.z;
            K.elements.push(m)
          }
      } else if (X instanceof THREE.Line) {
      Pa.multiplyMatrices(L, pa);
      da = X.geometry.vertices;
      T = a();
      T.positionScreen.copy(da[0]).applyMatrix4(Pa);
      ab = X.type === THREE.LinePieces ? 2 : 1;
      B = 1;
      for (fa = da.length; B < fa; B++) T = a(),
        T.positionScreen.copy(da[B]).applyMatrix4(Pa), 0 < (B + 1) % ab || (aa = j[i - 2], wa.copy(T.positionScreen), D.copy(aa.positionScreen), !0 === c(wa, D) && (wa.multiplyScalar(1 / wa.w), D.multiplyScalar(1 / D.w), z === F ? (xa = new THREE.RenderableLine, C.push(xa), F++, z++, v = xa) : v = C[z++], v.id = X.id, v.v1.positionScreen.copy(wa), v.v2.positionScreen.copy(D), v.z = Math.max(wa.z, D.z), v.material = X.material, X.material.vertexColors === THREE.VertexColors && (v.vertexColors[0].copy(X.geometry.colors[B]), v.vertexColors[1].copy(X.geometry.colors[B -
          1])), K.elements.push(v)))
    }
    d = 0;
    for (h = K.sprites.length; d < h; d++) X = K.sprites[d].object, pa = X.matrixWorld, X instanceof THREE.Particle && (J.set(pa.elements[12], pa.elements[13], pa.elements[14], 1), J.applyMatrix4(L), ja = 1 / J.w, J.z *= ja, 0 < J.z && 1 > J.z && (I === A ? (V = new THREE.RenderableParticle, G.push(V), A++, I++, H = V) : H = G[I++], H.id = X.id, H.x = J.x * ja, H.y = J.y * ja, H.z = J.z, H.object = X, H.rotation = X.rotation.z, H.scale.x = X.scale.x * Math.abs(H.x - (J.x + f.projectionMatrix.elements[0]) / (J.w + f.projectionMatrix.elements[12])), H.scale.y =
      X.scale.y * Math.abs(H.y - (J.y + f.projectionMatrix.elements[5]) / (J.w + f.projectionMatrix.elements[13])), H.material = X.material, K.elements.push(H)));
    !0 === l && K.elements.sort(b);
    return K
  }
};
THREE.Face3 = function (a, b, c, d, e, f) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.normal = d instanceof THREE.Vector3 ? d : new THREE.Vector3;
  this.vertexNormals = d instanceof Array ? d : [];
  this.color = e instanceof THREE.Color ? e : new THREE.Color;
  this.vertexColors = e instanceof Array ? e : [];
  this.vertexTangents = [];
  this.materialIndex = void 0 !== f ? f : 0;
  this.centroid = new THREE.Vector3
};
THREE.Face3.prototype = {
  constructor: THREE.Face3,
  clone: function () {
    var a = new THREE.Face3(this.a, this.b, this.c);
    a.normal.copy(this.normal);
    a.color.copy(this.color);
    a.centroid.copy(this.centroid);
    a.materialIndex = this.materialIndex;
    var b, c;
    b = 0;
    for (c = this.vertexNormals.length; b < c; b++) a.vertexNormals[b] = this.vertexNormals[b].clone();
    b = 0;
    for (c = this.vertexColors.length; b < c; b++) a.vertexColors[b] = this.vertexColors[b].clone();
    b = 0;
    for (c = this.vertexTangents.length; b < c; b++) a.vertexTangents[b] = this.vertexTangents[b].clone();
    return a
  }
};
THREE.Face4 = function (a, b, c, d, e, f, h) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.normal = e instanceof THREE.Vector3 ? e : new THREE.Vector3;
  this.vertexNormals = e instanceof Array ? e : [];
  this.color = f instanceof THREE.Color ? f : new THREE.Color;
  this.vertexColors = f instanceof Array ? f : [];
  this.vertexTangents = [];
  this.materialIndex = void 0 !== h ? h : 0;
  this.centroid = new THREE.Vector3
};
THREE.Face4.prototype = {
  constructor: THREE.Face4,
  clone: function () {
    var a = new THREE.Face4(this.a, this.b, this.c, this.d);
    a.normal.copy(this.normal);
    a.color.copy(this.color);
    a.centroid.copy(this.centroid);
    a.materialIndex = this.materialIndex;
    var b, c;
    b = 0;
    for (c = this.vertexNormals.length; b < c; b++) a.vertexNormals[b] = this.vertexNormals[b].clone();
    b = 0;
    for (c = this.vertexColors.length; b < c; b++) a.vertexColors[b] = this.vertexColors[b].clone();
    b = 0;
    for (c = this.vertexTangents.length; b < c; b++) a.vertexTangents[b] = this.vertexTangents[b].clone();
    return a
  }
};
THREE.Geometry = function () {
  this.id = THREE.GeometryIdCount++;
  this.uuid = THREE.Math.generateUUID();
  this.name = "";
  this.vertices = [];
  this.colors = [];
  this.normals = [];
  this.faces = [];
  this.faceUvs = [
    []
  ];
  this.faceVertexUvs = [
    []
  ];
  this.morphTargets = [];
  this.morphColors = [];
  this.morphNormals = [];
  this.skinWeights = [];
  this.skinIndices = [];
  this.lineDistances = [];
  this.boundingSphere = this.boundingBox = null;
  this.hasTangents = !1;
  this.dynamic = !0;
  this.buffersNeedUpdate = this.lineDistancesNeedUpdate = this.colorsNeedUpdate = this.tangentsNeedUpdate =
    this.normalsNeedUpdate = this.uvsNeedUpdate = this.elementsNeedUpdate = this.verticesNeedUpdate = !1
};
THREE.Geometry.prototype = {
  constructor: THREE.Geometry,
  applyMatrix: function (a) {
    for (var b = (new THREE.Matrix3).getNormalMatrix(a), c = 0, d = this.vertices.length; c < d; c++) this.vertices[c].applyMatrix4(a);
    c = 0;
    for (d = this.faces.length; c < d; c++) {
      var e = this.faces[c];
      e.normal.applyMatrix3(b).normalize();
      for (var f = 0, h = e.vertexNormals.length; f < h; f++) e.vertexNormals[f].applyMatrix3(b).normalize();
      e.centroid.applyMatrix4(a)
    }
    this.boundingBox instanceof THREE.Box3 && this.computeBoundingBox();
    this.boundingSphere instanceof
    THREE.Sphere && this.computeBoundingSphere()
  },
  computeCentroids: function () {
    var a, b, c;
    a = 0;
    for (b = this.faces.length; a < b; a++) c = this.faces[a], c.centroid.set(0, 0, 0), c instanceof THREE.Face3 ? (c.centroid.add(this.vertices[c.a]), c.centroid.add(this.vertices[c.b]), c.centroid.add(this.vertices[c.c]), c.centroid.divideScalar(3)) : c instanceof THREE.Face4 && (c.centroid.add(this.vertices[c.a]), c.centroid.add(this.vertices[c.b]), c.centroid.add(this.vertices[c.c]), c.centroid.add(this.vertices[c.d]), c.centroid.divideScalar(4))
  },
  computeFaceNormals: function () {
    for (var a = new THREE.Vector3, b = new THREE.Vector3, c = 0, d = this.faces.length; c < d; c++) {
      var e = this.faces[c],
        f = this.vertices[e.a],
        h = this.vertices[e.b];
      a.subVectors(this.vertices[e.c], h);
      b.subVectors(f, h);
      a.cross(b);
      a.normalize();
      e.normal.copy(a)
    }
  },
  computeVertexNormals: function (a) {
    var b, c, d, e;
    if (void 0 === this.__tmpVertices) {
      e = this.__tmpVertices = Array(this.vertices.length);
      b = 0;
      for (c = this.vertices.length; b < c; b++) e[b] = new THREE.Vector3;
      b = 0;
      for (c = this.faces.length; b < c; b++) d = this.faces[b],
        d instanceof THREE.Face3 ? d.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3] : d instanceof THREE.Face4 && (d.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3])
    } else {
      e = this.__tmpVertices;
      b = 0;
      for (c = this.vertices.length; b < c; b++) e[b].set(0, 0, 0)
    }
    if (a) {
      var f, h, g, i = new THREE.Vector3,
        j = new THREE.Vector3,
        l = new THREE.Vector3,
        m = new THREE.Vector3,
        n = new THREE.Vector3;
      b = 0;
      for (c = this.faces.length; b < c; b++) d = this.faces[b], d instanceof THREE.Face3 ? (a = this.vertices[d.a],
        f = this.vertices[d.b], h = this.vertices[d.c], i.subVectors(h, f), j.subVectors(a, f), i.cross(j), e[d.a].add(i), e[d.b].add(i), e[d.c].add(i)) : d instanceof THREE.Face4 && (a = this.vertices[d.a], f = this.vertices[d.b], h = this.vertices[d.c], g = this.vertices[d.d], l.subVectors(g, f), j.subVectors(a, f), l.cross(j), e[d.a].add(l), e[d.b].add(l), e[d.d].add(l), m.subVectors(g, h), n.subVectors(f, h), m.cross(n), e[d.b].add(m), e[d.c].add(m), e[d.d].add(m))
    } else {
      b = 0;
      for (c = this.faces.length; b < c; b++) d = this.faces[b], d instanceof THREE.Face3 ?
        (e[d.a].add(d.normal), e[d.b].add(d.normal), e[d.c].add(d.normal)) : d instanceof THREE.Face4 && (e[d.a].add(d.normal), e[d.b].add(d.normal), e[d.c].add(d.normal), e[d.d].add(d.normal))
    }
    b = 0;
    for (c = this.vertices.length; b < c; b++) e[b].normalize();
    b = 0;
    for (c = this.faces.length; b < c; b++) d = this.faces[b], d instanceof THREE.Face3 ? (d.vertexNormals[0].copy(e[d.a]), d.vertexNormals[1].copy(e[d.b]), d.vertexNormals[2].copy(e[d.c])) : d instanceof THREE.Face4 && (d.vertexNormals[0].copy(e[d.a]), d.vertexNormals[1].copy(e[d.b]), d.vertexNormals[2].copy(e[d.c]),
      d.vertexNormals[3].copy(e[d.d]))
  },
  computeMorphNormals: function () {
    var a, b, c, d, e;
    c = 0;
    for (d = this.faces.length; c < d; c++) {
      e = this.faces[c];
      e.__originalFaceNormal ? e.__originalFaceNormal.copy(e.normal) : e.__originalFaceNormal = e.normal.clone();
      e.__originalVertexNormals || (e.__originalVertexNormals = []);
      a = 0;
      for (b = e.vertexNormals.length; a < b; a++) e.__originalVertexNormals[a] ? e.__originalVertexNormals[a].copy(e.vertexNormals[a]) : e.__originalVertexNormals[a] = e.vertexNormals[a].clone()
    }
    var f = new THREE.Geometry;
    f.faces =
      this.faces;
    a = 0;
    for (b = this.morphTargets.length; a < b; a++) {
      if (!this.morphNormals[a]) {
        this.morphNormals[a] = {};
        this.morphNormals[a].faceNormals = [];
        this.morphNormals[a].vertexNormals = [];
        var h = this.morphNormals[a].faceNormals,
          g = this.morphNormals[a].vertexNormals,
          i, j;
        c = 0;
        for (d = this.faces.length; c < d; c++) e = this.faces[c], i = new THREE.Vector3, j = e instanceof THREE.Face3 ? {
            a: new THREE.Vector3,
            b: new THREE.Vector3,
            c: new THREE.Vector3
          } : {
            a: new THREE.Vector3,
            b: new THREE.Vector3,
            c: new THREE.Vector3,
            d: new THREE.Vector3
          },
          h.push(i), g.push(j)
      }
      h = this.morphNormals[a];
      f.vertices = this.morphTargets[a].vertices;
      f.computeFaceNormals();
      f.computeVertexNormals();
      c = 0;
      for (d = this.faces.length; c < d; c++) e = this.faces[c], i = h.faceNormals[c], j = h.vertexNormals[c], i.copy(e.normal), e instanceof THREE.Face3 ? (j.a.copy(e.vertexNormals[0]), j.b.copy(e.vertexNormals[1]), j.c.copy(e.vertexNormals[2])) : (j.a.copy(e.vertexNormals[0]), j.b.copy(e.vertexNormals[1]), j.c.copy(e.vertexNormals[2]), j.d.copy(e.vertexNormals[3]))
    }
    c = 0;
    for (d = this.faces.length; c <
      d; c++) e = this.faces[c], e.normal = e.__originalFaceNormal, e.vertexNormals = e.__originalVertexNormals
  },
  computeTangents: function () {
    function a(a, b, c, d, e, f, y) {
      g = a.vertices[b];
      i = a.vertices[c];
      j = a.vertices[d];
      l = h[e];
      m = h[f];
      n = h[y];
      p = i.x - g.x;
      t = j.x - g.x;
      q = i.y - g.y;
      r = j.y - g.y;
      s = i.z - g.z;
      v = j.z - g.z;
      z = m.x - l.x;
      C = n.x - l.x;
      F = m.y - l.y;
      H = n.y - l.y;
      I = 1 / (z * H - C * F);
      B.set((H * p - F * t) * I, (H * q - F * r) * I, (H * s - F * v) * I);
      J.set((z * t - C * p) * I, (z * r - C * q) * I, (z * v - C * s) * I);
      A[b].add(B);
      A[c].add(B);
      A[d].add(B);
      K[b].add(J);
      K[c].add(J);
      K[d].add(J)
    }
    var b, c, d,
      e, f, h, g, i, j, l, m, n, p, t, q, r, s, v, z, C, F, H, I, G, A = [],
      K = [],
      B = new THREE.Vector3,
      J = new THREE.Vector3,
      N = new THREE.Vector3,
      y = new THREE.Vector3,
      M = new THREE.Vector3;
    b = 0;
    for (c = this.vertices.length; b < c; b++) A[b] = new THREE.Vector3, K[b] = new THREE.Vector3;
    b = 0;
    for (c = this.faces.length; b < c; b++) f = this.faces[b], h = this.faceVertexUvs[0][b], f instanceof THREE.Face3 ? a(this, f.a, f.b, f.c, 0, 1, 2) : f instanceof THREE.Face4 && (a(this, f.a, f.b, f.d, 0, 1, 3), a(this, f.b, f.c, f.d, 1, 2, 3));
    var w = ["a", "b", "c", "d"];
    b = 0;
    for (c = this.faces.length; b <
      c; b++) {
      f = this.faces[b];
      for (d = 0; d < f.vertexNormals.length; d++) M.copy(f.vertexNormals[d]), e = f[w[d]], G = A[e], N.copy(G), N.sub(M.multiplyScalar(M.dot(G))).normalize(), y.crossVectors(f.vertexNormals[d], G), e = y.dot(K[e]), e = 0 > e ? -1 : 1, f.vertexTangents[d] = new THREE.Vector4(N.x, N.y, N.z, e)
    }
    this.hasTangents = !0
  },
  computeLineDistances: function () {
    for (var a = 0, b = this.vertices, c = 0, d = b.length; c < d; c++) 0 < c && (a += b[c].distanceTo(b[c - 1])), this.lineDistances[c] = a
  },
  computeBoundingBox: function () {
    null === this.boundingBox && (this.boundingBox =
      new THREE.Box3);
    this.boundingBox.setFromPoints(this.vertices)
  },
  computeBoundingSphere: function () {
    null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere);
    this.boundingSphere.setFromPoints(this.vertices)
  },
  mergeVertices: function () {
    var a = {},
      b = [],
      c = [],
      d, e = Math.pow(10, 4),
      f, h, g, i, j;
    this.__tmpVertices = void 0;
    f = 0;
    for (h = this.vertices.length; f < h; f++) d = this.vertices[f], d = Math.round(d.x * e) + "_" + Math.round(d.y * e) + "_" + Math.round(d.z * e), void 0 === a[d] ? (a[d] = f, b.push(this.vertices[f]), c[f] = b.length - 1) : c[f] =
      c[a[d]];
    e = [];
    f = 0;
    for (h = this.faces.length; f < h; f++)
      if (a = this.faces[f], a instanceof THREE.Face3) {
        a.a = c[a.a];
        a.b = c[a.b];
        a.c = c[a.c];
        g = [a.a, a.b, a.c];
        d = -1;
        for (i = 0; 3 > i; i++)
          if (g[i] == g[(i + 1) % 3]) {
            e.push(f);
            break
          }
      } else if (a instanceof THREE.Face4) {
      a.a = c[a.a];
      a.b = c[a.b];
      a.c = c[a.c];
      a.d = c[a.d];
      g = [a.a, a.b, a.c, a.d];
      d = -1;
      for (i = 0; 4 > i; i++) g[i] == g[(i + 1) % 4] && (0 <= d && e.push(f), d = i);
      if (0 <= d) {
        g.splice(d, 1);
        var l = new THREE.Face3(g[0], g[1], g[2], a.normal, a.color, a.materialIndex);
        g = 0;
        for (i = this.faceVertexUvs.length; g < i; g++)(j =
          this.faceVertexUvs[g][f]) && j.splice(d, 1);
        a.vertexNormals && 0 < a.vertexNormals.length && (l.vertexNormals = a.vertexNormals, l.vertexNormals.splice(d, 1));
        a.vertexColors && 0 < a.vertexColors.length && (l.vertexColors = a.vertexColors, l.vertexColors.splice(d, 1));
        this.faces[f] = l
      }
    }
    for (f = e.length - 1; 0 <= f; f--) {
      this.faces.splice(f, 1);
      g = 0;
      for (i = this.faceVertexUvs.length; g < i; g++) this.faceVertexUvs[g].splice(f, 1)
    }
    c = this.vertices.length - b.length;
    this.vertices = b;
    return c
  },
  clone: function () {
    for (var a = new THREE.Geometry, b = this.vertices,
        c = 0, d = b.length; c < d; c++) a.vertices.push(b[c].clone());
    b = this.faces;
    c = 0;
    for (d = b.length; c < d; c++) a.faces.push(b[c].clone());
    b = this.faceVertexUvs[0];
    c = 0;
    for (d = b.length; c < d; c++) {
      for (var e = b[c], f = [], h = 0, g = e.length; h < g; h++) f.push(new THREE.Vector2(e[h].x, e[h].y));
      a.faceVertexUvs[0].push(f)
    }
    return a
  },
  dispose: function () {
    this.dispatchEvent({
      type: "dispose"
    })
  }
};
THREE.EventDispatcher.prototype.apply(THREE.Geometry.prototype);
THREE.GeometryIdCount = 0;
THREE.BufferGeometry = function () {
  this.id = THREE.GeometryIdCount++;
  this.uuid = THREE.Math.generateUUID();
  this.attributes = {};
  this.dynamic = !1;
  this.offsets = [];
  this.boundingSphere = this.boundingBox = null;
  this.hasTangents = !1;
  this.morphTargets = []
};
THREE.BufferGeometry.prototype = {
  constructor: THREE.BufferGeometry,
  applyMatrix: function (a) {
    var b, c;
    this.attributes.position && (b = this.attributes.position.array);
    this.attributes.normal && (c = this.attributes.normal.array);
    void 0 !== b && (a.multiplyVector3Array(b), this.verticesNeedUpdate = !0);
    void 0 !== c && ((new THREE.Matrix3).getNormalMatrix(a).multiplyVector3Array(c), this.normalizeNormals(), this.normalsNeedUpdate = !0)
  },
  computeBoundingBox: function () {
    null === this.boundingBox && (this.boundingBox = new THREE.Box3);
    var a =
      this.attributes.position.array;
    if (a) {
      var b = this.boundingBox,
        c, d, e;
      3 <= a.length && (b.min.x = b.max.x = a[0], b.min.y = b.max.y = a[1], b.min.z = b.max.z = a[2]);
      for (var f = 3, h = a.length; f < h; f += 3) c = a[f], d = a[f + 1], e = a[f + 2], c < b.min.x ? b.min.x = c : c > b.max.x && (b.max.x = c), d < b.min.y ? b.min.y = d : d > b.max.y && (b.max.y = d), e < b.min.z ? b.min.z = e : e > b.max.z && (b.max.z = e)
    }
    if (void 0 === a || 0 === a.length) this.boundingBox.min.set(0, 0, 0), this.boundingBox.max.set(0, 0, 0)
  },
  computeBoundingSphere: function () {
    null === this.boundingSphere && (this.boundingSphere =
      new THREE.Sphere);
    var a = this.attributes.position.array;
    if (a) {
      for (var b, c = 0, d, e, f = 0, h = a.length; f < h; f += 3) b = a[f], d = a[f + 1], e = a[f + 2], b = b * b + d * d + e * e, b > c && (c = b);
      this.boundingSphere.radius = Math.sqrt(c)
    }
  },
  computeVertexNormals: function () {
    if (this.attributes.position) {
      var a, b, c, d;
      a = this.attributes.position.array.length;
      if (void 0 === this.attributes.normal) this.attributes.normal = {
        itemSize: 3,
        array: new Float32Array(a)
      };
      else {
        a = 0;
        for (b = this.attributes.normal.array.length; a < b; a++) this.attributes.normal.array[a] = 0
      }
      var e =
        this.attributes.position.array,
        f = this.attributes.normal.array,
        h, g, i, j, l, m, n = new THREE.Vector3,
        p = new THREE.Vector3,
        t = new THREE.Vector3,
        q = new THREE.Vector3,
        r = new THREE.Vector3;
      if (this.attributes.index) {
        var s = this.attributes.index.array,
          v = this.offsets;
        c = 0;
        for (d = v.length; c < d; ++c) {
          b = v[c].start;
          h = v[c].count;
          var z = v[c].index;
          a = b;
          for (b += h; a < b; a += 3) h = z + s[a], g = z + s[a + 1], i = z + s[a + 2], j = e[3 * h], l = e[3 * h + 1], m = e[3 * h + 2], n.set(j, l, m), j = e[3 * g], l = e[3 * g + 1], m = e[3 * g + 2], p.set(j, l, m), j = e[3 * i], l = e[3 * i + 1], m = e[3 * i + 2], t.set(j, l,
            m), q.subVectors(t, p), r.subVectors(n, p), q.cross(r), f[3 * h] += q.x, f[3 * h + 1] += q.y, f[3 * h + 2] += q.z, f[3 * g] += q.x, f[3 * g + 1] += q.y, f[3 * g + 2] += q.z, f[3 * i] += q.x, f[3 * i + 1] += q.y, f[3 * i + 2] += q.z
        }
      } else {
        a = 0;
        for (b = e.length; a < b; a += 9) j = e[a], l = e[a + 1], m = e[a + 2], n.set(j, l, m), j = e[a + 3], l = e[a + 4], m = e[a + 5], p.set(j, l, m), j = e[a + 6], l = e[a + 7], m = e[a + 8], t.set(j, l, m), q.subVectors(t, p), r.subVectors(n, p), q.cross(r), f[a] = q.x, f[a + 1] = q.y, f[a + 2] = q.z, f[a + 3] = q.x, f[a + 4] = q.y, f[a + 5] = q.z, f[a + 6] = q.x, f[a + 7] = q.y, f[a + 8] = q.z
      }
      this.normalizeNormals();
      this.normalsNeedUpdate = !0
    }
  },
  normalizeNormals: function () {
    for (var a = this.attributes.normal.array, b, c, d, e = 0, f = a.length; e < f; e += 3) b = a[e], c = a[e + 1], d = a[e + 2], b = 1 / Math.sqrt(b * b + c * c + d * d), a[e] *= b, a[e + 1] *= b, a[e + 2] *= b
  },
  computeTangents: function () {
    function a(a) {
      Pa.x = d[3 * a];
      Pa.y = d[3 * a + 1];
      Pa.z = d[3 * a + 2];
      Ua.copy(Pa);
      ka = g[a];
      L.copy(ka);
      L.sub(Pa.multiplyScalar(Pa.dot(ka))).normalize();
      pa.crossVectors(Ua, ka);
      Fa = pa.dot(i[a]);
      O = 0 > Fa ? -1 : 1;
      h[4 * a] = L.x;
      h[4 * a + 1] = L.y;
      h[4 * a + 2] = L.z;
      h[4 * a + 3] = O
    }
    if (void 0 === this.attributes.index || void 0 === this.attributes.position ||
      void 0 === this.attributes.normal || void 0 === this.attributes.uv) console.warn("Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()");
    else {
      var b = this.attributes.index.array,
        c = this.attributes.position.array,
        d = this.attributes.normal.array,
        e = this.attributes.uv.array,
        f = c.length / 3;
      void 0 === this.attributes.tangent && (this.attributes.tangent = {
        itemSize: 4,
        array: new Float32Array(4 * f)
      });
      for (var h = this.attributes.tangent.array, g = [], i = [], j = 0; j < f; j++) g[j] = new THREE.Vector3,
        i[j] = new THREE.Vector3;
      var l, m, n, p, t, q, r, s, v, z, C, F, H, I, G, f = new THREE.Vector3,
        j = new THREE.Vector3,
        A, K, B, J, N, y, M, w = this.offsets;
      B = 0;
      for (J = w.length; B < J; ++B) {
        K = w[B].start;
        N = w[B].count;
        var Z = w[B].index;
        A = K;
        for (K += N; A < K; A += 3) N = Z + b[A], y = Z + b[A + 1], M = Z + b[A + 2], l = c[3 * N], m = c[3 * N + 1], n = c[3 * N + 2], p = c[3 * y], t = c[3 * y + 1], q = c[3 * y + 2], r = c[3 * M], s = c[3 * M + 1], v = c[3 * M + 2], z = e[2 * N], C = e[2 * N + 1], F = e[2 * y], H = e[2 * y + 1], I = e[2 * M], G = e[2 * M + 1], p -= l, l = r - l, t -= m, m = s - m, q -= n, n = v - n, F -= z, z = I - z, H -= C, C = G - C, G = 1 / (F * C - z * H), f.set((C * p - H * l) * G, (C * t - H * m) * G,
          (C * q - H * n) * G), j.set((F * l - z * p) * G, (F * m - z * t) * G, (F * n - z * q) * G), g[N].add(f), g[y].add(f), g[M].add(f), i[N].add(j), i[y].add(j), i[M].add(j)
      }
      var L = new THREE.Vector3,
        pa = new THREE.Vector3,
        Pa = new THREE.Vector3,
        Ua = new THREE.Vector3,
        O, ka, Fa;
      B = 0;
      for (J = w.length; B < J; ++B) {
        K = w[B].start;
        N = w[B].count;
        Z = w[B].index;
        A = K;
        for (K += N; A < K; A += 3) N = Z + b[A], y = Z + b[A + 1], M = Z + b[A + 2], a(N), a(y), a(M)
      }
      this.tangentsNeedUpdate = this.hasTangents = !0
    }
  },
  dispose: function () {
    this.dispatchEvent({
      type: "dispose"
    })
  }
};
THREE.EventDispatcher.prototype.apply(THREE.BufferGeometry.prototype);
THREE.Camera = function () {
  THREE.Object3D.call(this);
  this.matrixWorldInverse = new THREE.Matrix4;
  this.projectionMatrix = new THREE.Matrix4;
  this.projectionMatrixInverse = new THREE.Matrix4
};
THREE.Camera.prototype = Object.create(THREE.Object3D.prototype);
THREE.Camera.prototype.lookAt = function () {
  var a = new THREE.Matrix4;
  return function (b) {
    a.lookAt(this.position, b, this.up);
    this.quaternion.setFromRotationMatrix(a)
  }
}();
THREE.OrthographicCamera = function (a, b, c, d, e, f) {
  THREE.Camera.call(this);
  this.left = a;
  this.right = b;
  this.top = c;
  this.bottom = d;
  this.near = void 0 !== e ? e : 0.1;
  this.far = void 0 !== f ? f : 2E3;
  this.updateProjectionMatrix()
};
THREE.OrthographicCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.OrthographicCamera.prototype.updateProjectionMatrix = function () {
  this.projectionMatrix.makeOrthographic(this.left, this.right, this.top, this.bottom, this.near, this.far)
};
THREE.PerspectiveCamera = function (a, b, c, d) {
  THREE.Camera.call(this);
  this.fov = void 0 !== a ? a : 50;
  this.aspect = void 0 !== b ? b : 1;
  this.near = void 0 !== c ? c : 0.1;
  this.far = void 0 !== d ? d : 2E3;
  this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.PerspectiveCamera.prototype.setLens = function (a, b) {
  void 0 === b && (b = 24);
  this.fov = 2 * THREE.Math.radToDeg(Math.atan(b / (2 * a)));
  this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.setViewOffset = function (a, b, c, d, e, f) {
  this.fullWidth = a;
  this.fullHeight = b;
  this.x = c;
  this.y = d;
  this.width = e;
  this.height = f;
  this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function () {
  if (this.fullWidth) {
    var a = this.fullWidth / this.fullHeight,
      b = Math.tan(THREE.Math.degToRad(0.5 * this.fov)) * this.near,
      c = -b,
      d = a * c,
      a = Math.abs(a * b - d),
      c = Math.abs(b - c);
    this.projectionMatrix.makeFrustum(d + this.x * a / this.fullWidth, d + (this.x + this.width) * a / this.fullWidth, b - (this.y + this.height) * c / this.fullHeight, b - this.y * c / this.fullHeight, this.near, this.far)
  } else this.projectionMatrix.makePerspective(this.fov, this.aspect, this.near, this.far)
};
THREE.Light = function (a) {
  THREE.Object3D.call(this);
  this.color = new THREE.Color(a)
};
THREE.Light.prototype = Object.create(THREE.Object3D.prototype);
THREE.Light.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.Light);
  THREE.Object3D.prototype.clone.call(this, a);
  a.color.copy(this.color);
  return a
};
THREE.AmbientLight = function (a) {
  THREE.Light.call(this, a)
};
THREE.AmbientLight.prototype = Object.create(THREE.Light.prototype);
THREE.AmbientLight.prototype.clone = function () {
  var a = new THREE.AmbientLight;
  THREE.Light.prototype.clone.call(this, a);
  return a
};
THREE.AreaLight = function (a, b) {
  THREE.Light.call(this, a);
  this.normal = new THREE.Vector3(0, -1, 0);
  this.right = new THREE.Vector3(1, 0, 0);
  this.intensity = void 0 !== b ? b : 1;
  this.height = this.width = 1;
  this.constantAttenuation = 1.5;
  this.linearAttenuation = 0.5;
  this.quadraticAttenuation = 0.1
};
THREE.AreaLight.prototype = Object.create(THREE.Light.prototype);
THREE.DirectionalLight = function (a, b) {
  THREE.Light.call(this, a);
  this.position.set(0, 1, 0);
  this.target = new THREE.Object3D;
  this.intensity = void 0 !== b ? b : 1;
  this.onlyShadow = this.castShadow = !1;
  this.shadowCameraNear = 50;
  this.shadowCameraFar = 5E3;
  this.shadowCameraLeft = -500;
  this.shadowCameraTop = this.shadowCameraRight = 500;
  this.shadowCameraBottom = -500;
  this.shadowCameraVisible = !1;
  this.shadowBias = 0;
  this.shadowDarkness = 0.5;
  this.shadowMapHeight = this.shadowMapWidth = 512;
  this.shadowCascade = !1;
  this.shadowCascadeOffset = new THREE.Vector3(0,
    0, -1E3);
  this.shadowCascadeCount = 2;
  this.shadowCascadeBias = [0, 0, 0];
  this.shadowCascadeWidth = [512, 512, 512];
  this.shadowCascadeHeight = [512, 512, 512];
  this.shadowCascadeNearZ = [-1, 0.99, 0.998];
  this.shadowCascadeFarZ = [0.99, 0.998, 1];
  this.shadowCascadeArray = [];
  this.shadowMatrix = this.shadowCamera = this.shadowMapSize = this.shadowMap = null
};
THREE.DirectionalLight.prototype = Object.create(THREE.Light.prototype);
THREE.DirectionalLight.prototype.clone = function () {
  var a = new THREE.DirectionalLight;
  THREE.Light.prototype.clone.call(this, a);
  a.target = this.target.clone();
  a.intensity = this.intensity;
  a.castShadow = this.castShadow;
  a.onlyShadow = this.onlyShadow;
  return a
};
THREE.HemisphereLight = function (a, b, c) {
  THREE.Light.call(this, a);
  this.position.set(0, 100, 0);
  this.groundColor = new THREE.Color(b);
  this.intensity = void 0 !== c ? c : 1
};
THREE.HemisphereLight.prototype = Object.create(THREE.Light.prototype);
THREE.HemisphereLight.prototype.clone = function () {
  var a = new THREE.PointLight;
  THREE.Light.prototype.clone.call(this, a);
  a.groundColor.copy(this.groundColor);
  a.intensity = this.intensity;
  return a
};
THREE.PointLight = function (a, b, c) {
  THREE.Light.call(this, a);
  this.intensity = void 0 !== b ? b : 1;
  this.distance = void 0 !== c ? c : 0
};
THREE.PointLight.prototype = Object.create(THREE.Light.prototype);
THREE.PointLight.prototype.clone = function () {
  var a = new THREE.PointLight;
  THREE.Light.prototype.clone.call(this, a);
  a.intensity = this.intensity;
  a.distance = this.distance;
  return a
};
THREE.SpotLight = function (a, b, c, d, e) {
  THREE.Light.call(this, a);
  this.position.set(0, 1, 0);
  this.target = new THREE.Object3D;
  this.intensity = void 0 !== b ? b : 1;
  this.distance = void 0 !== c ? c : 0;
  this.angle = void 0 !== d ? d : Math.PI / 3;
  this.exponent = void 0 !== e ? e : 10;
  this.onlyShadow = this.castShadow = !1;
  this.shadowCameraNear = 50;
  this.shadowCameraFar = 5E3;
  this.shadowCameraFov = 50;
  this.shadowCameraVisible = !1;
  this.shadowBias = 0;
  this.shadowDarkness = 0.5;
  this.shadowMapHeight = this.shadowMapWidth = 512;
  this.shadowMatrix = this.shadowCamera = this.shadowMapSize =
    this.shadowMap = null
};
THREE.SpotLight.prototype = Object.create(THREE.Light.prototype);
THREE.SpotLight.prototype.clone = function () {
  var a = new THREE.SpotLight;
  THREE.Light.prototype.clone.call(this, a);
  a.target = this.target.clone();
  a.intensity = this.intensity;
  a.distance = this.distance;
  a.angle = this.angle;
  a.exponent = this.exponent;
  a.castShadow = this.castShadow;
  a.onlyShadow = this.onlyShadow;
  return a
};
THREE.Loader = function (a) {
  this.statusDomElement = (this.showStatus = a) ? THREE.Loader.prototype.addStatusElement() : null;
  this.onLoadStart = function () {};
  this.onLoadProgress = function () {};
  this.onLoadComplete = function () {}
};
THREE.Loader.prototype = {
  constructor: THREE.Loader,
  crossOrigin: "anonymous",
  addStatusElement: function () {
    var a = document.createElement("div");
    a.style.position = "absolute";
    a.style.right = "0px";
    a.style.top = "0px";
    a.style.fontSize = "0.8em";
    a.style.textAlign = "left";
    a.style.background = "rgba(0,0,0,0.25)";
    a.style.color = "#fff";
    a.style.width = "120px";
    a.style.padding = "0.5em 0.5em 0.5em 0.5em";
    a.style.zIndex = 1E3;
    a.innerHTML = "Loading ...";
    return a
  },
  updateProgress: function (a) {
    var b = "Loaded ",
      b = a.total ? b + ((100 * a.loaded /
        a.total).toFixed(0) + "%") : b + ((a.loaded / 1E3).toFixed(2) + " KB");
    this.statusDomElement.innerHTML = b
  },
  extractUrlBase: function (a) {
    a = a.split("/");
    a.pop();
    return (1 > a.length ? "." : a.join("/")) + "/"
  },
  initMaterials: function (a, b) {
    for (var c = [], d = 0; d < a.length; ++d) c[d] = THREE.Loader.prototype.createMaterial(a[d], b);
    return c
  },
  needsTangents: function (a) {
    for (var b = 0, c = a.length; b < c; b++)
      if (a[b] instanceof THREE.ShaderMaterial) return !0;
    return !1
  },
  createMaterial: function (a, b) {
    function c(a) {
      a = Math.log(a) / Math.LN2;
      return Math.floor(a) ==
        a
    }

    function d(a) {
      a = Math.log(a) / Math.LN2;
      return Math.pow(2, Math.round(a))
    }

    function e(a, e, f, g, i, j, r) {
      var s = /\.dds$/i.test(f),
        v = b + "/" + f;
      if (s) {
        var z = THREE.ImageUtils.loadCompressedTexture(v);
        a[e] = z
      } else z = document.createElement("canvas"), a[e] = new THREE.Texture(z);
      a[e].sourceFile = f;
      g && (a[e].repeat.set(g[0], g[1]), 1 !== g[0] && (a[e].wrapS = THREE.RepeatWrapping), 1 !== g[1] && (a[e].wrapT = THREE.RepeatWrapping));
      i && a[e].offset.set(i[0], i[1]);
      j && (f = {
          repeat: THREE.RepeatWrapping,
          mirror: THREE.MirroredRepeatWrapping
        }, void 0 !==
        f[j[0]] && (a[e].wrapS = f[j[0]]), void 0 !== f[j[1]] && (a[e].wrapT = f[j[1]]));
      r && (a[e].anisotropy = r);
      if (!s) {
        var C = a[e],
          a = new Image;
        a.onload = function () {
          if (!c(this.width) || !c(this.height)) {
            var a = d(this.width),
              b = d(this.height);
            C.image.width = a;
            C.image.height = b;
            C.image.getContext("2d").drawImage(this, 0, 0, a, b)
          } else C.image = this;
          C.needsUpdate = !0
        };
        a.crossOrigin = h.crossOrigin;
        a.src = v
      }
    }

    function f(a) {
      return (255 * a[0] << 16) + (255 * a[1] << 8) + 255 * a[2]
    }
    var h = this,
      g = "MeshLambertMaterial",
      i = {
        color: 15658734,
        opacity: 1,
        map: null,
        lightMap: null,
        normalMap: null,
        bumpMap: null,
        wireframe: !1
      };
    if (a.shading) {
      var j = a.shading.toLowerCase();
      "phong" === j ? g = "MeshPhongMaterial" : "basic" === j && (g = "MeshBasicMaterial")
    }
    void 0 !== a.blending && void 0 !== THREE[a.blending] && (i.blending = THREE[a.blending]);
    if (void 0 !== a.transparent || 1 > a.opacity) i.transparent = a.transparent;
    void 0 !== a.depthTest && (i.depthTest = a.depthTest);
    void 0 !== a.depthWrite && (i.depthWrite = a.depthWrite);
    void 0 !== a.visible && (i.visible = a.visible);
    void 0 !== a.flipSided && (i.side = THREE.BackSide);
    void 0 !== a.doubleSided && (i.side = THREE.DoubleSide);
    void 0 !== a.wireframe && (i.wireframe = a.wireframe);
    void 0 !== a.vertexColors && ("face" === a.vertexColors ? i.vertexColors = THREE.FaceColors : a.vertexColors && (i.vertexColors = THREE.VertexColors));
    a.colorDiffuse ? i.color = f(a.colorDiffuse) : a.DbgColor && (i.color = a.DbgColor);
    a.colorSpecular && (i.specular = f(a.colorSpecular));
    a.colorAmbient && (i.ambient = f(a.colorAmbient));
    a.transparency && (i.opacity = a.transparency);
    a.specularCoef && (i.shininess = a.specularCoef);
    a.mapDiffuse &&
      b && e(i, "map", a.mapDiffuse, a.mapDiffuseRepeat, a.mapDiffuseOffset, a.mapDiffuseWrap, a.mapDiffuseAnisotropy);
    a.mapLight && b && e(i, "lightMap", a.mapLight, a.mapLightRepeat, a.mapLightOffset, a.mapLightWrap, a.mapLightAnisotropy);
    a.mapBump && b && e(i, "bumpMap", a.mapBump, a.mapBumpRepeat, a.mapBumpOffset, a.mapBumpWrap, a.mapBumpAnisotropy);
    a.mapNormal && b && e(i, "normalMap", a.mapNormal, a.mapNormalRepeat, a.mapNormalOffset, a.mapNormalWrap, a.mapNormalAnisotropy);
    a.mapSpecular && b && e(i, "specularMap", a.mapSpecular, a.mapSpecularRepeat,
      a.mapSpecularOffset, a.mapSpecularWrap, a.mapSpecularAnisotropy);
    a.mapBumpScale && (i.bumpScale = a.mapBumpScale);
    a.mapNormal ? (g = THREE.ShaderLib.normalmap, j = THREE.UniformsUtils.clone(g.uniforms), j.tNormal.value = i.normalMap, a.mapNormalFactor && j.uNormalScale.value.set(a.mapNormalFactor, a.mapNormalFactor), i.map && (j.tDiffuse.value = i.map, j.enableDiffuse.value = !0), i.specularMap && (j.tSpecular.value = i.specularMap, j.enableSpecular.value = !0), i.lightMap && (j.tAO.value = i.lightMap, j.enableAO.value = !0), j.uDiffuseColor.value.setHex(i.color),
      j.uSpecularColor.value.setHex(i.specular), j.uAmbientColor.value.setHex(i.ambient), j.uShininess.value = i.shininess, void 0 !== i.opacity && (j.uOpacity.value = i.opacity), g = new THREE.ShaderMaterial({
        fragmentShader: g.fragmentShader,
        vertexShader: g.vertexShader,
        uniforms: j,
        lights: !0,
        fog: !0
      }), i.transparent && (g.transparent = !0)) : g = new THREE[g](i);
    void 0 !== a.DbgName && (g.name = a.DbgName);
    return g
  }
};
THREE.XHRLoader = function (a) {
  this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager
};
THREE.XHRLoader.prototype = {
  constructor: THREE.XHRLoader,
  load: function (a, b, c, d) {
    var e = this,
      f = new XMLHttpRequest;
    void 0 !== b && f.addEventListener("load", function (c) {
      e.manager.itemEnd(a);
      b(c.target.responseText)
    }, !1);
    void 0 !== c && f.addEventListener("progress", function (a) {
      c(a)
    }, !1);
    void 0 !== d && f.addEventListener("error", function (a) {
      d(a)
    }, !1);
    void 0 !== this.crossOrigin && (f.crossOrigin = this.crossOrigin);
    f.open("GET", a, !0);
    f.send(null);
    e.manager.itemStart(a)
  },
  setCrossOrigin: function (a) {
    this.crossOrigin = a
  }
};
THREE.ImageLoader = function (a) {
  this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager
};
THREE.ImageLoader.prototype = {
  constructor: THREE.ImageLoader,
  load: function (a, b, c, d) {
    var e = this,
      f = document.createElement("img");
    void 0 !== b && f.addEventListener("load", function () {
      e.manager.itemEnd(a);
      b(this)
    }, !1);
    void 0 !== c && f.addEventListener("progress", function (a) {
      c(a)
    }, !1);
    void 0 !== d && f.addEventListener("error", function (a) {
      d(a)
    }, !1);
    void 0 !== this.crossOrigin && (f.crossOrigin = this.crossOrigin);
    f.src = a;
    e.manager.itemStart(a)
  },
  setCrossOrigin: function (a) {
    this.crossOrigin = a
  }
};
THREE.JSONLoader = function (a) {
  THREE.Loader.call(this, a);
  this.withCredentials = !1
};
THREE.JSONLoader.prototype = Object.create(THREE.Loader.prototype);
THREE.JSONLoader.prototype.load = function (a, b, c) {
  c = c && "string" === typeof c ? c : this.extractUrlBase(a);
  this.onLoadStart();
  this.loadAjaxJSON(this, a, b, c)
};
THREE.JSONLoader.prototype.loadAjaxJSON = function (a, b, c, d, e) {
  var f = new XMLHttpRequest,
    h = 0;
  f.onreadystatechange = function () {
    if (f.readyState === f.DONE)
      if (200 === f.status || 0 === f.status) {
        if (f.responseText) {
          var g = JSON.parse(f.responseText),
            g = a.parse(g, d);
          c(g.geometry, g.materials)
        } else console.warn("THREE.JSONLoader: [" + b + "] seems to be unreachable or file there is empty");
        a.onLoadComplete()
      } else console.error("THREE.JSONLoader: Couldn't load [" + b + "] [" + f.status + "]");
    else f.readyState === f.LOADING ? e && (0 === h &&
      (h = f.getResponseHeader("Content-Length")), e({
        total: h,
        loaded: f.responseText.length
      })) : f.readyState === f.HEADERS_RECEIVED && void 0 !== e && (h = f.getResponseHeader("Content-Length"))
  };
  f.open("GET", b, !0);
  f.withCredentials = this.withCredentials;
  f.send(null)
};
THREE.JSONLoader.prototype.parse = function (a, b) {
  var c = new THREE.Geometry,
    d = void 0 !== a.scale ? 1 / a.scale : 1,
    e, f, h, g, i, j, l, m, n, p, t, q, r, s, v, z = a.faces;
  p = a.vertices;
  var C = a.normals,
    F = a.colors,
    H = 0;
  if (void 0 !== a.uvs) {
    for (e = 0; e < a.uvs.length; e++) a.uvs[e].length && H++;
    for (e = 0; e < H; e++) c.faceUvs[e] = [], c.faceVertexUvs[e] = []
  }
  g = 0;
  for (i = p.length; g < i;) j = new THREE.Vector3, j.x = p[g++] * d, j.y = p[g++] * d, j.z = p[g++] * d, c.vertices.push(j);
  g = 0;
  for (i = z.length; g < i;) {
    p = z[g++];
    j = p & 1;
    h = p & 2;
    e = p & 4;
    f = p & 8;
    m = p & 16;
    l = p & 32;
    t = p & 64;
    p &= 128;
    j ? (q =
      new THREE.Face4, q.a = z[g++], q.b = z[g++], q.c = z[g++], q.d = z[g++], j = 4) : (q = new THREE.Face3, q.a = z[g++], q.b = z[g++], q.c = z[g++], j = 3);
    h && (h = z[g++], q.materialIndex = h);
    h = c.faces.length;
    if (e)
      for (e = 0; e < H; e++) r = a.uvs[e], n = z[g++], v = r[2 * n], n = r[2 * n + 1], c.faceUvs[e][h] = new THREE.Vector2(v, n);
    if (f)
      for (e = 0; e < H; e++) {
        r = a.uvs[e];
        s = [];
        for (f = 0; f < j; f++) n = z[g++], v = r[2 * n], n = r[2 * n + 1], s[f] = new THREE.Vector2(v, n);
        c.faceVertexUvs[e][h] = s
      }
    m && (m = 3 * z[g++], f = new THREE.Vector3, f.x = C[m++], f.y = C[m++], f.z = C[m], q.normal = f);
    if (l)
      for (e = 0; e < j; e++) m =
        3 * z[g++], f = new THREE.Vector3, f.x = C[m++], f.y = C[m++], f.z = C[m], q.vertexNormals.push(f);
    t && (l = z[g++], l = new THREE.Color(F[l]), q.color = l);
    if (p)
      for (e = 0; e < j; e++) l = z[g++], l = new THREE.Color(F[l]), q.vertexColors.push(l);
    c.faces.push(q)
  }
  if (a.skinWeights) {
    g = 0;
    for (i = a.skinWeights.length; g < i; g += 2) z = a.skinWeights[g], C = a.skinWeights[g + 1], c.skinWeights.push(new THREE.Vector4(z, C, 0, 0))
  }
  if (a.skinIndices) {
    g = 0;
    for (i = a.skinIndices.length; g < i; g += 2) z = a.skinIndices[g], C = a.skinIndices[g + 1], c.skinIndices.push(new THREE.Vector4(z,
      C, 0, 0))
  }
  c.bones = a.bones;
  c.animation = a.animation;
  if (void 0 !== a.morphTargets) {
    g = 0;
    for (i = a.morphTargets.length; g < i; g++) {
      c.morphTargets[g] = {};
      c.morphTargets[g].name = a.morphTargets[g].name;
      c.morphTargets[g].vertices = [];
      F = c.morphTargets[g].vertices;
      H = a.morphTargets[g].vertices;
      z = 0;
      for (C = H.length; z < C; z += 3) p = new THREE.Vector3, p.x = H[z] * d, p.y = H[z + 1] * d, p.z = H[z + 2] * d, F.push(p)
    }
  }
  if (void 0 !== a.morphColors) {
    g = 0;
    for (i = a.morphColors.length; g < i; g++) {
      c.morphColors[g] = {};
      c.morphColors[g].name = a.morphColors[g].name;
      c.morphColors[g].colors = [];
      C = c.morphColors[g].colors;
      F = a.morphColors[g].colors;
      d = 0;
      for (z = F.length; d < z; d += 3) H = new THREE.Color(16755200), H.setRGB(F[d], F[d + 1], F[d + 2]), C.push(H)
    }
  }
  c.computeCentroids();
  c.computeFaceNormals();
  c.computeBoundingSphere();
  if (void 0 === a.materials) return {
    geometry: c
  };
  d = this.initMaterials(a.materials, b);
  this.needsTangents(d) && c.computeTangents();
  return {
    geometry: c,
    materials: d
  }
};
THREE.LoadingManager = function (a, b, c) {
  var d = this,
    e = 0,
    f = 0;
  this.onLoad = a;
  this.onProgress = b;
  this.onError = c;
  this.itemStart = function () {
    f++
  };
  this.itemEnd = function (a) {
    e++;
    if (void 0 !== d.onProgress) d.onProgress(a, e, f);
    if (e === f && void 0 !== d.onLoad) d.onLoad()
  }
};
THREE.DefaultLoadingManager = new THREE.LoadingManager;
THREE.GeometryLoader = function (a) {
  this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager
};
THREE.GeometryLoader.prototype = {
  constructor: THREE.GeometryLoader,
  load: function (a, b) {
    var c = this,
      d = new THREE.XHRLoader;
    d.setCrossOrigin(this.crossOrigin);
    d.load(a, function (a) {
      b(c.parse(JSON.parse(a)))
    })
  },
  setCrossOrigin: function (a) {
    this.crossOrigin = a
  },
  parse: function () {}
};
THREE.MaterialLoader = function (a) {
  this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager
};
THREE.MaterialLoader.prototype = {
  constructor: THREE.MaterialLoader,
  load: function (a, b) {
    var c = this,
      d = new THREE.XHRLoader;
    d.setCrossOrigin(this.crossOrigin);
    d.load(a, function (a) {
      b(c.parse(JSON.parse(a)))
    })
  },
  setCrossOrigin: function (a) {
    this.crossOrigin = a
  },
  parse: function (a) {
    var b;
    switch (a.type) {
      case "MeshBasicMaterial":
        b = new THREE.MeshBasicMaterial({
          color: a.color,
          opacity: a.opacity,
          transparent: a.transparent,
          wireframe: a.wireframe
        });
        break;
      case "MeshLambertMaterial":
        b = new THREE.MeshLambertMaterial({
          color: a.color,
          ambient: a.ambient,
          emissive: a.emissive,
          opacity: a.opacity,
          transparent: a.transparent,
          wireframe: a.wireframe
        });
        break;
      case "MeshPhongMaterial":
        b = new THREE.MeshPhongMaterial({
          color: a.color,
          ambient: a.ambient,
          emissive: a.emissive,
          specular: a.specular,
          shininess: a.shininess,
          opacity: a.opacity,
          transparent: a.transparent,
          wireframe: a.wireframe
        });
        break;
      case "MeshNormalMaterial":
        b = new THREE.MeshNormalMaterial({
          opacity: a.opacity,
          transparent: a.transparent,
          wireframe: a.wireframe
        });
        break;
      case "MeshDepthMaterial":
        b = new THREE.MeshDepthMaterial({
          opacity: a.opacity,
          transparent: a.transparent,
          wireframe: a.wireframe
        })
    }
    void 0 !== a.vertexColors && (b.vertexColors = a.vertexColors);
    return b
  }
};
THREE.ObjectLoader = function (a) {
  this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager
};
THREE.ObjectLoader.prototype = {
  constructor: THREE.ObjectLoader,
  load: function (a, b) {
    var c = this,
      d = new THREE.XHRLoader(c.manager);
    d.setCrossOrigin(this.crossOrigin);
    d.load(a, function (a) {
      b(c.parse(JSON.parse(a)))
    })
  },
  setCrossOrigin: function (a) {
    this.crossOrigin = a
  },
  parse: function (a) {
    var b = this.parseGeometries(a.geometries),
      c = this.parseMaterials(a.materials);
    return this.parseObject(a.object, b, c)
  },
  parseGeometries: function (a) {
    var b = {};
    if (void 0 !== a)
      for (var c = new THREE.JSONLoader, d = 0, e = a.length; d < e; d++) {
        var f,
          h = a[d];
        switch (h.type) {
          case "PlaneGeometry":
            f = new THREE.PlaneGeometry(h.width, h.height, h.widthSegments, h.heightSegments);
            break;
          case "CubeGeometry":
            f = new THREE.CubeGeometry(h.width, h.height, h.depth, h.widthSegments, h.heightSegments, h.depthSegments);
            break;
          case "CylinderGeometry":
            f = new THREE.CylinderGeometry(h.radiusTop, h.radiusBottom, h.height, h.radiusSegments, h.heightSegments, h.openEnded);
            break;
          case "SphereGeometry":
            f = new THREE.SphereGeometry(h.radius, h.widthSegments, h.heightSegments, h.phiStart, h.phiLength,
              h.thetaStart, h.thetaLength);
            break;
          case "IcosahedronGeometry":
            f = new THREE.IcosahedronGeometry(h.radius, h.detail);
            break;
          case "TorusGeometry":
            f = new THREE.TorusGeometry(h.radius, h.tube, h.radialSegments, h.tubularSegments, h.arc);
            break;
          case "TorusKnotGeometry":
            f = new THREE.TorusKnotGeometry(h.radius, h.tube, h.radialSegments, h.tubularSegments, h.p, h.q, h.heightScale);
            break;
          case "Geometry":
            f = c.parse(h.data).geometry
        }
        f.uuid = h.uuid;
        void 0 !== h.name && (f.name = h.name);
        b[h.uuid] = f
      }
    return b
  },
  parseMaterials: function (a) {
    var b = {};
    if (void 0 !== a)
      for (var c = new THREE.MaterialLoader, d = 0, e = a.length; d < e; d++) {
        var f = a[d],
          h = c.parse(f);
        h.uuid = f.uuid;
        void 0 !== f.name && (h.name = f.name);
        b[f.uuid] = h
      }
    return b
  },
  parseObject: function () {
    var a = new THREE.Matrix4;
    return function (b, c, d) {
      var e;
      switch (b.type) {
        case "Scene":
          e = new THREE.Scene;
          break;
        case "PerspectiveCamera":
          e = new THREE.PerspectiveCamera(b.fov, b.aspect, b.near, b.far);
          break;
        case "OrthographicCamera":
          e = new THREE.OrthographicCamera(b.left, b.right, b.top, b.bottom, b.near, b.far);
          break;
        case "AmbientLight":
          e =
            new THREE.AmbientLight(b.color);
          break;
        case "DirectionalLight":
          e = new THREE.DirectionalLight(b.color, b.intensity);
          break;
        case "PointLight":
          e = new THREE.PointLight(b.color, b.intensity, b.distance);
          break;
        case "SpotLight":
          e = new THREE.SpotLight(b.color, b.intensity, b.distance, b.angle, b.exponent);
          break;
        case "HemisphereLight":
          e = new THREE.HemisphereLight(b.color, b.groundColor, b.intensity);
          break;
        case "Mesh":
          e = c[b.geometry];
          var f = d[b.material];
          void 0 === e && console.error("THREE.ObjectLoader: Undefined geometry " +
            b.geometry);
          void 0 === f && console.error("THREE.ObjectLoader: Undefined material " + b.material);
          e = new THREE.Mesh(e, f);
          break;
        default:
          e = new THREE.Object3D
      }
      e.uuid = b.uuid;
      void 0 !== b.name && (e.name = b.name);
      void 0 !== b.matrix ? (a.fromArray(b.matrix), a.decompose(e.position, e.quaternion, e.scale)) : (void 0 !== b.position && e.position.fromArray(b.position), void 0 !== b.rotation && e.rotation.fromArray(b.rotation), void 0 !== b.scale && e.scale.fromArray(b.scale));
      void 0 !== b.visible && (e.visible = b.visible);
      void 0 !== b.userData &&
        (e.userData = b.userData);
      if (void 0 !== b.children)
        for (var h in b.children) e.add(this.parseObject(b.children[h], c, d));
      return e
    }
  }()
};
THREE.SceneLoader = function () {
  this.onLoadStart = function () {};
  this.onLoadProgress = function () {};
  this.onLoadComplete = function () {};
  this.callbackSync = function () {};
  this.callbackProgress = function () {};
  this.geometryHandlers = {};
  this.hierarchyHandlers = {};
  this.addGeometryHandler("ascii", THREE.JSONLoader)
};
THREE.SceneLoader.prototype = {
  constructor: THREE.SceneLoader,
  load: function (a, b) {
    var c = this,
      d = new THREE.XHRLoader(c.manager);
    d.setCrossOrigin(this.crossOrigin);
    d.load(a, function (d) {
      c.parse(JSON.parse(d), b, a)
    })
  },
  setCrossOrigin: function (a) {
    this.crossOrigin = a
  },
  addGeometryHandler: function (a, b) {
    this.geometryHandlers[a] = {
      loaderClass: b
    }
  },
  addHierarchyHandler: function (a, b) {
    this.hierarchyHandlers[a] = {
      loaderClass: b
    }
  },
  parse: function (a, b, c) {
    function d(a, b) {
      return "relativeToHTML" == b ? a : n + "/" + a
    }

    function e() {
      f(A.scene,
        B.objects)
    }

    function f(a, b) {
      var c, e, h, i, j, l, n;
      for (n in b) {
        var r = A.objects[n],
          s = b[n];
        if (void 0 === r) {
          if (s.type && s.type in m.hierarchyHandlers) {
            if (void 0 === s.loading) {
              e = {
                type: 1,
                url: 1,
                material: 1,
                position: 1,
                rotation: 1,
                scale: 1,
                visible: 1,
                children: 1,
                userData: 1,
                skin: 1,
                morph: 1,
                mirroredLoop: 1,
                duration: 1
              };
              h = {};
              for (var y in s) y in e || (h[y] = s[y]);
              t = A.materials[s.material];
              s.loading = !0;
              e = m.hierarchyHandlers[s.type].loaderObject;
              e.options ? e.load(d(s.url, B.urlBaseType), g(n, a, t, s)) : e.load(d(s.url, B.urlBaseType), g(n,
                a, t, s), h)
            }
          } else if (void 0 !== s.geometry) {
            if (p = A.geometries[s.geometry]) {
              r = !1;
              t = A.materials[s.material];
              r = t instanceof THREE.ShaderMaterial;
              h = s.position;
              i = s.rotation;
              j = s.scale;
              c = s.matrix;
              l = s.quaternion;
              s.material || (t = new THREE.MeshFaceMaterial(A.face_materials[s.geometry]));
              t instanceof THREE.MeshFaceMaterial && 0 === t.materials.length && (t = new THREE.MeshFaceMaterial(A.face_materials[s.geometry]));
              if (t instanceof THREE.MeshFaceMaterial)
                for (e = 0; e < t.materials.length; e++) r = r || t.materials[e] instanceof THREE.ShaderMaterial;
              r && p.computeTangents();
              s.skin ? r = new THREE.SkinnedMesh(p, t) : s.morph ? (r = new THREE.MorphAnimMesh(p, t), void 0 !== s.duration && (r.duration = s.duration), void 0 !== s.time && (r.time = s.time), void 0 !== s.mirroredLoop && (r.mirroredLoop = s.mirroredLoop), t.morphNormals && p.computeMorphNormals()) : r = new THREE.Mesh(p, t);
              r.name = n;
              c ? (r.matrixAutoUpdate = !1, r.matrix.set(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15])) : (r.position.fromArray(h), l ? r.quaternion.fromArray(l) : r.rotation.fromArray(i),
                r.scale.fromArray(j));
              r.visible = s.visible;
              r.castShadow = s.castShadow;
              r.receiveShadow = s.receiveShadow;
              a.add(r);
              A.objects[n] = r
            }
          } else "DirectionalLight" === s.type || "PointLight" === s.type || "AmbientLight" === s.type ? (z = void 0 !== s.color ? s.color : 16777215, C = void 0 !== s.intensity ? s.intensity : 1, "DirectionalLight" === s.type ? (h = s.direction, v = new THREE.DirectionalLight(z, C), v.position.fromArray(h), s.target && (K.push({
            object: v,
            targetName: s.target
          }), v.target = null)) : "PointLight" === s.type ? (h = s.position, e = s.distance, v = new THREE.PointLight(z,
            C, e), v.position.fromArray(h)) : "AmbientLight" === s.type && (v = new THREE.AmbientLight(z)), a.add(v), v.name = n, A.lights[n] = v, A.objects[n] = v) : "PerspectiveCamera" === s.type || "OrthographicCamera" === s.type ? (h = s.position, i = s.rotation, l = s.quaternion, "PerspectiveCamera" === s.type ? q = new THREE.PerspectiveCamera(s.fov, s.aspect, s.near, s.far) : "OrthographicCamera" === s.type && (q = new THREE.OrthographicCamera(s.left, s.right, s.top, s.bottom, s.near, s.far)), q.name = n, q.position.fromArray(h), void 0 !== l ? q.quaternion.fromArray(l) :
            void 0 !== i && q.rotation.fromArray(i), a.add(q), A.cameras[n] = q, A.objects[n] = q) : (h = s.position, i = s.rotation, j = s.scale, l = s.quaternion, r = new THREE.Object3D, r.name = n, r.position.fromArray(h), l ? r.quaternion.fromArray(l) : r.rotation.fromArray(i), r.scale.fromArray(j), r.visible = void 0 !== s.visible ? s.visible : !1, a.add(r), A.objects[n] = r, A.empties[n] = r);
          if (r) {
            if (void 0 !== s.userData)
              for (var F in s.userData) r.userData[F] = s.userData[F];
            if (void 0 !== s.groups)
              for (e = 0; e < s.groups.length; e++) h = s.groups[e], void 0 === A.groups[h] &&
                (A.groups[h] = []), A.groups[h].push(n)
          }
        }
        void 0 !== r && void 0 !== s.children && f(r, s.children)
      }
    }

    function h(a) {
      return function (b, c) {
        b.name = a;
        A.geometries[a] = b;
        A.face_materials[a] = c;
        e();
        F -= 1;
        m.onLoadComplete();
        j()
      }
    }

    function g(a, b, c, d) {
      return function (f) {
        var f = f.content ? f.content : f.dae ? f.scene : f,
          h = d.rotation,
          g = d.quaternion,
          i = d.scale;
        f.position.fromArray(d.position);
        g ? f.quaternion.fromArray(g) : f.rotation.fromArray(h);
        f.scale.fromArray(i);
        c && f.traverse(function (a) {
          a.material = c
        });
        var l = void 0 !== d.visible ? d.visible :
          !0;
        f.traverse(function (a) {
          a.visible = l
        });
        b.add(f);
        f.name = a;
        A.objects[a] = f;
        e();
        F -= 1;
        m.onLoadComplete();
        j()
      }
    }

    function i(a) {
      return function (b, c) {
        b.name = a;
        A.geometries[a] = b;
        A.face_materials[a] = c
      }
    }

    function j() {
      m.callbackProgress({
        totalModels: I,
        totalTextures: G,
        loadedModels: I - F,
        loadedTextures: G - H
      }, A);
      m.onLoadProgress();
      if (0 === F && 0 === H) {
        for (var a = 0; a < K.length; a++) {
          var c = K[a],
            d = A.objects[c.targetName];
          d ? c.object.target = d : (c.object.target = new THREE.Object3D, A.scene.add(c.object.target));
          c.object.target.userData.targetInverse =
            c.object
        }
        b(A)
      }
    }

    function l(a, b) {
      b(a);
      if (void 0 !== a.children)
        for (var c in a.children) l(a.children[c], b)
    }
    var m = this,
      n = THREE.Loader.prototype.extractUrlBase(c),
      p, t, q, r, s, v, z, C, F, H, I, G, A, K = [],
      B = a,
      J;
    for (J in this.geometryHandlers) a = this.geometryHandlers[J].loaderClass, this.geometryHandlers[J].loaderObject = new a;
    for (J in this.hierarchyHandlers) a = this.hierarchyHandlers[J].loaderClass, this.hierarchyHandlers[J].loaderObject = new a;
    H = F = 0;
    A = {
      scene: new THREE.Scene,
      geometries: {},
      face_materials: {},
      materials: {},
      textures: {},
      objects: {},
      cameras: {},
      lights: {},
      fogs: {},
      empties: {},
      groups: {}
    };
    if (B.transform && (J = B.transform.position, a = B.transform.rotation, c = B.transform.scale, J && A.scene.position.fromArray(J), a && A.scene.rotation.fromArray(a), c && A.scene.scale.fromArray(c), J || a || c)) A.scene.updateMatrix(), A.scene.updateMatrixWorld();
    J = function (a) {
      return function () {
        H -= a;
        j();
        m.onLoadComplete()
      }
    };
    for (var N in B.fogs) a = B.fogs[N], "linear" === a.type ? r = new THREE.Fog(0, a.near, a.far) : "exp2" === a.type && (r = new THREE.FogExp2(0, a.density)), a = a.color,
      r.color.setRGB(a[0], a[1], a[2]), A.fogs[N] = r;
    for (var y in B.geometries) r = B.geometries[y], r.type in this.geometryHandlers && (F += 1, m.onLoadStart());
    for (var M in B.objects) l(B.objects[M], function (a) {
      a.type && a.type in m.hierarchyHandlers && (F += 1, m.onLoadStart())
    });
    I = F;
    for (y in B.geometries)
      if (r = B.geometries[y], "cube" === r.type) p = new THREE.CubeGeometry(r.width, r.height, r.depth, r.widthSegments, r.heightSegments, r.depthSegments), p.name = y, A.geometries[y] = p;
      else if ("plane" === r.type) p = new THREE.PlaneGeometry(r.width,
      r.height, r.widthSegments, r.heightSegments), p.name = y, A.geometries[y] = p;
    else if ("sphere" === r.type) p = new THREE.SphereGeometry(r.radius, r.widthSegments, r.heightSegments), p.name = y, A.geometries[y] = p;
    else if ("cylinder" === r.type) p = new THREE.CylinderGeometry(r.topRad, r.botRad, r.height, r.radSegs, r.heightSegs), p.name = y, A.geometries[y] = p;
    else if ("torus" === r.type) p = new THREE.TorusGeometry(r.radius, r.tube, r.segmentsR, r.segmentsT), p.name = y, A.geometries[y] = p;
    else if ("icosahedron" === r.type) p = new THREE.IcosahedronGeometry(r.radius,
      r.subdivisions), p.name = y, A.geometries[y] = p;
    else if (r.type in this.geometryHandlers) {
      M = {};
      for (s in r) "type" !== s && "url" !== s && (M[s] = r[s]);
      this.geometryHandlers[r.type].loaderObject.load(d(r.url, B.urlBaseType), h(y), M)
    } else "embedded" === r.type && (M = B.embeds[r.id], M.metadata = B.metadata, M && (M = this.geometryHandlers.ascii.loaderObject.parse(M, ""), i(y)(M.geometry, M.materials)));
    for (var w in B.textures)
      if (y = B.textures[w], y.url instanceof Array) {
        H += y.url.length;
        for (s = 0; s < y.url.length; s++) m.onLoadStart()
      } else H +=
        1, m.onLoadStart();
    G = H;
    for (w in B.textures) {
      y = B.textures[w];
      void 0 !== y.mapping && void 0 !== THREE[y.mapping] && (y.mapping = new THREE[y.mapping]);
      if (y.url instanceof Array) {
        M = y.url.length;
        r = [];
        for (s = 0; s < M; s++) r[s] = d(y.url[s], B.urlBaseType);
        s = (s = /\.dds$/i.test(r[0])) ? THREE.ImageUtils.loadCompressedTextureCube(r, y.mapping, J(M)) : THREE.ImageUtils.loadTextureCube(r, y.mapping, J(M))
      } else s = /\.dds$/i.test(y.url), M = d(y.url, B.urlBaseType), r = J(1), s = s ? THREE.ImageUtils.loadCompressedTexture(M, y.mapping, r) : THREE.ImageUtils.loadTexture(M,
        y.mapping, r), void 0 !== THREE[y.minFilter] && (s.minFilter = THREE[y.minFilter]), void 0 !== THREE[y.magFilter] && (s.magFilter = THREE[y.magFilter]), y.anisotropy && (s.anisotropy = y.anisotropy), y.repeat && (s.repeat.set(y.repeat[0], y.repeat[1]), 1 !== y.repeat[0] && (s.wrapS = THREE.RepeatWrapping), 1 !== y.repeat[1] && (s.wrapT = THREE.RepeatWrapping)), y.offset && s.offset.set(y.offset[0], y.offset[1]), y.wrap && (M = {
          repeat: THREE.RepeatWrapping,
          mirror: THREE.MirroredRepeatWrapping
        }, void 0 !== M[y.wrap[0]] && (s.wrapS = M[y.wrap[0]]), void 0 !==
        M[y.wrap[1]] && (s.wrapT = M[y.wrap[1]]));
      A.textures[w] = s
    }
    var Z, L;
    for (Z in B.materials) {
      w = B.materials[Z];
      for (L in w.parameters) "envMap" === L || "map" === L || "lightMap" === L || "bumpMap" === L ? w.parameters[L] = A.textures[w.parameters[L]] : "shading" === L ? w.parameters[L] = "flat" === w.parameters[L] ? THREE.FlatShading : THREE.SmoothShading : "side" === L ? w.parameters[L] = "double" == w.parameters[L] ? THREE.DoubleSide : "back" == w.parameters[L] ? THREE.BackSide : THREE.FrontSide : "blending" === L ? w.parameters[L] = w.parameters[L] in THREE ? THREE[w.parameters[L]] :
        THREE.NormalBlending : "combine" === L ? w.parameters[L] = w.parameters[L] in THREE ? THREE[w.parameters[L]] : THREE.MultiplyOperation : "vertexColors" === L ? "face" == w.parameters[L] ? w.parameters[L] = THREE.FaceColors : w.parameters[L] && (w.parameters[L] = THREE.VertexColors) : "wrapRGB" === L && (J = w.parameters[L], w.parameters[L] = new THREE.Vector3(J[0], J[1], J[2]));
      void 0 !== w.parameters.opacity && 1 > w.parameters.opacity && (w.parameters.transparent = !0);
      w.parameters.normalMap ? (J = THREE.ShaderLib.normalmap, y = THREE.UniformsUtils.clone(J.uniforms),
        s = w.parameters.color, M = w.parameters.specular, r = w.parameters.ambient, N = w.parameters.shininess, y.tNormal.value = A.textures[w.parameters.normalMap], w.parameters.normalScale && y.uNormalScale.value.set(w.parameters.normalScale[0], w.parameters.normalScale[1]), w.parameters.map && (y.tDiffuse.value = w.parameters.map, y.enableDiffuse.value = !0), w.parameters.envMap && (y.tCube.value = w.parameters.envMap, y.enableReflection.value = !0, y.uReflectivity.value = w.parameters.reflectivity), w.parameters.lightMap && (y.tAO.value = w.parameters.lightMap,
          y.enableAO.value = !0), w.parameters.specularMap && (y.tSpecular.value = A.textures[w.parameters.specularMap], y.enableSpecular.value = !0), w.parameters.displacementMap && (y.tDisplacement.value = A.textures[w.parameters.displacementMap], y.enableDisplacement.value = !0, y.uDisplacementBias.value = w.parameters.displacementBias, y.uDisplacementScale.value = w.parameters.displacementScale), y.uDiffuseColor.value.setHex(s), y.uSpecularColor.value.setHex(M), y.uAmbientColor.value.setHex(r), y.uShininess.value = N, w.parameters.opacity &&
        (y.uOpacity.value = w.parameters.opacity), t = new THREE.ShaderMaterial({
          fragmentShader: J.fragmentShader,
          vertexShader: J.vertexShader,
          uniforms: y,
          lights: !0,
          fog: !0
        })) : t = new THREE[w.type](w.parameters);
      t.name = Z;
      A.materials[Z] = t
    }
    for (Z in B.materials)
      if (w = B.materials[Z], w.parameters.materials) {
        L = [];
        for (s = 0; s < w.parameters.materials.length; s++) L.push(A.materials[w.parameters.materials[s]]);
        A.materials[Z].materials = L
      } e();
    A.cameras && B.defaults.camera && (A.currentCamera = A.cameras[B.defaults.camera]);
    A.fogs && B.defaults.fog &&
      (A.scene.fog = A.fogs[B.defaults.fog]);
    m.callbackSync(A);
    j()
  }
};
THREE.TextureLoader = function (a) {
  this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager
};
THREE.TextureLoader.prototype = {
  constructor: THREE.TextureLoader,
  load: function (a, b) {
    var c = new THREE.ImageLoader(this.manager);
    c.setCrossOrigin(this.crossOrigin);
    c.load(a, function (a) {
      a = new THREE.Texture(a);
      a.needsUpdate = !0;
      void 0 !== b && b(a)
    })
  },
  setCrossOrigin: function (a) {
    this.crossOrigin = a
  }
};
THREE.Material = function () {
  this.id = THREE.MaterialIdCount++;
  this.uuid = THREE.Math.generateUUID();
  this.name = "";
  this.side = THREE.FrontSide;
  this.opacity = 1;
  this.transparent = !1;
  this.blending = THREE.NormalBlending;
  this.blendSrc = THREE.SrcAlphaFactor;
  this.blendDst = THREE.OneMinusSrcAlphaFactor;
  this.blendEquation = THREE.AddEquation;
  this.depthWrite = this.depthTest = !0;
  this.polygonOffset = !1;
  this.overdraw = this.alphaTest = this.polygonOffsetUnits = this.polygonOffsetFactor = 0;
  this.needsUpdate = this.visible = !0
};
THREE.Material.prototype = {
  constructor: THREE.Material,
  setValues: function (a) {
    if (void 0 !== a)
      for (var b in a) {
        var c = a[b];
        if (void 0 === c) console.warn("THREE.Material: '" + b + "' parameter is undefined.");
        else if (b in this) {
          var d = this[b];
          d instanceof THREE.Color ? d.set(c) : d instanceof THREE.Vector3 && c instanceof THREE.Vector3 ? d.copy(c) : this[b] = "overdraw" == b ? Number(c) : c
        }
      }
  },
  clone: function (a) {
    void 0 === a && (a = new THREE.Material);
    a.name = this.name;
    a.side = this.side;
    a.opacity = this.opacity;
    a.transparent = this.transparent;
    a.blending = this.blending;
    a.blendSrc = this.blendSrc;
    a.blendDst = this.blendDst;
    a.blendEquation = this.blendEquation;
    a.depthTest = this.depthTest;
    a.depthWrite = this.depthWrite;
    a.polygonOffset = this.polygonOffset;
    a.polygonOffsetFactor = this.polygonOffsetFactor;
    a.polygonOffsetUnits = this.polygonOffsetUnits;
    a.alphaTest = this.alphaTest;
    a.overdraw = this.overdraw;
    a.visible = this.visible;
    return a
  },
  dispose: function () {
    this.dispatchEvent({
      type: "dispose"
    })
  }
};
THREE.EventDispatcher.prototype.apply(THREE.Material.prototype);
THREE.MaterialIdCount = 0;
THREE.LineBasicMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.linewidth = 1;
  this.linejoin = this.linecap = "round";
  this.vertexColors = !1;
  this.fog = !0;
  this.setValues(a)
};
THREE.LineBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.LineBasicMaterial.prototype.clone = function () {
  var a = new THREE.LineBasicMaterial;
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.linewidth = this.linewidth;
  a.linecap = this.linecap;
  a.linejoin = this.linejoin;
  a.vertexColors = this.vertexColors;
  a.fog = this.fog;
  return a
};
THREE.LineDashedMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.scale = this.linewidth = 1;
  this.dashSize = 3;
  this.gapSize = 1;
  this.vertexColors = !1;
  this.fog = !0;
  this.setValues(a)
};
THREE.LineDashedMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.LineDashedMaterial.prototype.clone = function () {
  var a = new THREE.LineDashedMaterial;
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.linewidth = this.linewidth;
  a.scale = this.scale;
  a.dashSize = this.dashSize;
  a.gapSize = this.gapSize;
  a.vertexColors = this.vertexColors;
  a.fog = this.fog;
  return a
};
THREE.MeshBasicMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.envMap = this.specularMap = this.lightMap = this.map = null;
  this.combine = THREE.MultiplyOperation;
  this.reflectivity = 1;
  this.refractionRatio = 0.98;
  this.fog = !0;
  this.shading = THREE.SmoothShading;
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.wireframeLinejoin = this.wireframeLinecap = "round";
  this.vertexColors = THREE.NoColors;
  this.morphTargets = this.skinning = !1;
  this.setValues(a)
};
THREE.MeshBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshBasicMaterial.prototype.clone = function () {
  var a = new THREE.MeshBasicMaterial;
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.map = this.map;
  a.lightMap = this.lightMap;
  a.specularMap = this.specularMap;
  a.envMap = this.envMap;
  a.combine = this.combine;
  a.reflectivity = this.reflectivity;
  a.refractionRatio = this.refractionRatio;
  a.fog = this.fog;
  a.shading = this.shading;
  a.wireframe = this.wireframe;
  a.wireframeLinewidth = this.wireframeLinewidth;
  a.wireframeLinecap = this.wireframeLinecap;
  a.wireframeLinejoin =
    this.wireframeLinejoin;
  a.vertexColors = this.vertexColors;
  a.skinning = this.skinning;
  a.morphTargets = this.morphTargets;
  return a
};
THREE.MeshLambertMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.ambient = new THREE.Color(16777215);
  this.emissive = new THREE.Color(0);
  this.wrapAround = !1;
  this.wrapRGB = new THREE.Vector3(1, 1, 1);
  this.envMap = this.specularMap = this.lightMap = this.map = null;
  this.combine = THREE.MultiplyOperation;
  this.reflectivity = 1;
  this.refractionRatio = 0.98;
  this.fog = !0;
  this.shading = THREE.SmoothShading;
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.wireframeLinejoin = this.wireframeLinecap =
    "round";
  this.vertexColors = THREE.NoColors;
  this.morphNormals = this.morphTargets = this.skinning = !1;
  this.setValues(a)
};
THREE.MeshLambertMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshLambertMaterial.prototype.clone = function () {
  var a = new THREE.MeshLambertMaterial;
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.ambient.copy(this.ambient);
  a.emissive.copy(this.emissive);
  a.wrapAround = this.wrapAround;
  a.wrapRGB.copy(this.wrapRGB);
  a.map = this.map;
  a.lightMap = this.lightMap;
  a.specularMap = this.specularMap;
  a.envMap = this.envMap;
  a.combine = this.combine;
  a.reflectivity = this.reflectivity;
  a.refractionRatio = this.refractionRatio;
  a.fog = this.fog;
  a.shading = this.shading;
  a.wireframe = this.wireframe;
  a.wireframeLinewidth = this.wireframeLinewidth;
  a.wireframeLinecap = this.wireframeLinecap;
  a.wireframeLinejoin = this.wireframeLinejoin;
  a.vertexColors = this.vertexColors;
  a.skinning = this.skinning;
  a.morphTargets = this.morphTargets;
  a.morphNormals = this.morphNormals;
  return a
};
THREE.MeshPhongMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.ambient = new THREE.Color(16777215);
  this.emissive = new THREE.Color(0);
  this.specular = new THREE.Color(1118481);
  this.shininess = 30;
  this.metal = !1;
  this.perPixel = !0;
  this.wrapAround = !1;
  this.wrapRGB = new THREE.Vector3(1, 1, 1);
  this.bumpMap = this.lightMap = this.map = null;
  this.bumpScale = 1;
  this.normalMap = null;
  this.normalScale = new THREE.Vector2(1, 1);
  this.envMap = this.specularMap = null;
  this.combine = THREE.MultiplyOperation;
  this.reflectivity = 1;
  this.refractionRatio = 0.98;
  this.fog = !0;
  this.shading = THREE.SmoothShading;
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.wireframeLinejoin = this.wireframeLinecap = "round";
  this.vertexColors = THREE.NoColors;
  this.morphNormals = this.morphTargets = this.skinning = !1;
  this.setValues(a)
};
THREE.MeshPhongMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshPhongMaterial.prototype.clone = function () {
  var a = new THREE.MeshPhongMaterial;
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.ambient.copy(this.ambient);
  a.emissive.copy(this.emissive);
  a.specular.copy(this.specular);
  a.shininess = this.shininess;
  a.metal = this.metal;
  a.perPixel = this.perPixel;
  a.wrapAround = this.wrapAround;
  a.wrapRGB.copy(this.wrapRGB);
  a.map = this.map;
  a.lightMap = this.lightMap;
  a.bumpMap = this.bumpMap;
  a.bumpScale = this.bumpScale;
  a.normalMap = this.normalMap;
  a.normalScale.copy(this.normalScale);
  a.specularMap = this.specularMap;
  a.envMap = this.envMap;
  a.combine = this.combine;
  a.reflectivity = this.reflectivity;
  a.refractionRatio = this.refractionRatio;
  a.fog = this.fog;
  a.shading = this.shading;
  a.wireframe = this.wireframe;
  a.wireframeLinewidth = this.wireframeLinewidth;
  a.wireframeLinecap = this.wireframeLinecap;
  a.wireframeLinejoin = this.wireframeLinejoin;
  a.vertexColors = this.vertexColors;
  a.skinning = this.skinning;
  a.morphTargets = this.morphTargets;
  a.morphNormals = this.morphNormals;
  return a
};
THREE.MeshDepthMaterial = function (a) {
  THREE.Material.call(this);
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.setValues(a)
};
THREE.MeshDepthMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshDepthMaterial.prototype.clone = function () {
  var a = new THREE.MeshDepthMaterial;
  THREE.Material.prototype.clone.call(this, a);
  a.wireframe = this.wireframe;
  a.wireframeLinewidth = this.wireframeLinewidth;
  return a
};
THREE.MeshNormalMaterial = function (a) {
  THREE.Material.call(this, a);
  this.shading = THREE.FlatShading;
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.morphTargets = !1;
  this.setValues(a)
};
THREE.MeshNormalMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshNormalMaterial.prototype.clone = function () {
  var a = new THREE.MeshNormalMaterial;
  THREE.Material.prototype.clone.call(this, a);
  a.shading = this.shading;
  a.wireframe = this.wireframe;
  a.wireframeLinewidth = this.wireframeLinewidth;
  return a
};
THREE.MeshFaceMaterial = function (a) {
  this.materials = a instanceof Array ? a : []
};
THREE.MeshFaceMaterial.prototype.clone = function () {
  return new THREE.MeshFaceMaterial(this.materials.slice(0))
};
THREE.ParticleBasicMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.map = null;
  this.size = 1;
  this.sizeAttenuation = !0;
  this.vertexColors = !1;
  this.fog = !0;
  this.setValues(a)
};
THREE.ParticleBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ParticleBasicMaterial.prototype.clone = function () {
  var a = new THREE.ParticleBasicMaterial;
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.map = this.map;
  a.size = this.size;
  a.sizeAttenuation = this.sizeAttenuation;
  a.vertexColors = this.vertexColors;
  a.fog = this.fog;
  return a
};
THREE.ParticleCanvasMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.program = function () {};
  this.setValues(a)
};
THREE.ParticleCanvasMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ParticleCanvasMaterial.prototype.clone = function () {
  var a = new THREE.ParticleCanvasMaterial;
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.program = this.program;
  return a
};
THREE.ShaderMaterial = function (a) {
  THREE.Material.call(this);
  this.vertexShader = this.fragmentShader = "void main() {}";
  this.uniforms = {};
  this.defines = {};
  this.attributes = null;
  this.shading = THREE.SmoothShading;
  this.linewidth = 1;
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.lights = this.fog = !1;
  this.vertexColors = THREE.NoColors;
  this.morphNormals = this.morphTargets = this.skinning = !1;
  this.setValues(a)
};
THREE.ShaderMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ShaderMaterial.prototype.clone = function () {
  var a = new THREE.ShaderMaterial;
  THREE.Material.prototype.clone.call(this, a);
  a.fragmentShader = this.fragmentShader;
  a.vertexShader = this.vertexShader;
  a.uniforms = THREE.UniformsUtils.clone(this.uniforms);
  a.attributes = this.attributes;
  a.defines = this.defines;
  a.shading = this.shading;
  a.wireframe = this.wireframe;
  a.wireframeLinewidth = this.wireframeLinewidth;
  a.fog = this.fog;
  a.lights = this.lights;
  a.vertexColors = this.vertexColors;
  a.skinning = this.skinning;
  a.morphTargets =
    this.morphTargets;
  a.morphNormals = this.morphNormals;
  return a
};
THREE.SpriteMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.map = new THREE.Texture;
  this.useScreenCoordinates = !0;
  this.depthTest = !this.useScreenCoordinates;
  this.sizeAttenuation = !this.useScreenCoordinates;
  this.scaleByViewport = !this.sizeAttenuation;
  this.alignment = THREE.SpriteAlignment.center.clone();
  this.fog = !1;
  this.uvOffset = new THREE.Vector2(0, 0);
  this.uvScale = new THREE.Vector2(1, 1);
  this.setValues(a);
  a = a || {};
  void 0 === a.depthTest && (this.depthTest = !this.useScreenCoordinates);
  void 0 === a.sizeAttenuation && (this.sizeAttenuation = !this.useScreenCoordinates);
  void 0 === a.scaleByViewport && (this.scaleByViewport = !this.sizeAttenuation)
};
THREE.SpriteMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.SpriteMaterial.prototype.clone = function () {
  var a = new THREE.SpriteMaterial;
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.map = this.map;
  a.useScreenCoordinates = this.useScreenCoordinates;
  a.sizeAttenuation = this.sizeAttenuation;
  a.scaleByViewport = this.scaleByViewport;
  a.alignment.copy(this.alignment);
  a.uvOffset.copy(this.uvOffset);
  a.uvScale.copy(this.uvScale);
  a.fog = this.fog;
  return a
};
THREE.SpriteAlignment = {};
THREE.SpriteAlignment.topLeft = new THREE.Vector2(1, -1);
THREE.SpriteAlignment.topCenter = new THREE.Vector2(0, -1);
THREE.SpriteAlignment.topRight = new THREE.Vector2(-1, -1);
THREE.SpriteAlignment.centerLeft = new THREE.Vector2(1, 0);
THREE.SpriteAlignment.center = new THREE.Vector2(0, 0);
THREE.SpriteAlignment.centerRight = new THREE.Vector2(-1, 0);
THREE.SpriteAlignment.bottomLeft = new THREE.Vector2(1, 1);
THREE.SpriteAlignment.bottomCenter = new THREE.Vector2(0, 1);
THREE.SpriteAlignment.bottomRight = new THREE.Vector2(-1, 1);
THREE.Texture = function (a, b, c, d, e, f, h, g, i) {
  this.id = THREE.TextureIdCount++;
  this.uuid = THREE.Math.generateUUID();
  this.name = "";
  this.image = a;
  this.mipmaps = [];
  this.mapping = void 0 !== b ? b : new THREE.UVMapping;
  this.wrapS = void 0 !== c ? c : THREE.ClampToEdgeWrapping;
  this.wrapT = void 0 !== d ? d : THREE.ClampToEdgeWrapping;
  this.magFilter = void 0 !== e ? e : THREE.LinearFilter;
  this.minFilter = void 0 !== f ? f : THREE.LinearMipMapLinearFilter;
  this.anisotropy = void 0 !== i ? i : 1;
  this.format = void 0 !== h ? h : THREE.RGBAFormat;
  this.type = void 0 !== g ? g : THREE.UnsignedByteType;
  this.offset = new THREE.Vector2(0, 0);
  this.repeat = new THREE.Vector2(1, 1);
  this.generateMipmaps = !0;
  this.premultiplyAlpha = !1;
  this.flipY = !0;
  this.unpackAlignment = 4;
  this.needsUpdate = !1;
  this.onUpdate = null
};
THREE.Texture.prototype = {
  constructor: THREE.Texture,
  clone: function (a) {
    void 0 === a && (a = new THREE.Texture);
    a.image = this.image;
    a.mipmaps = this.mipmaps.slice(0);
    a.mapping = this.mapping;
    a.wrapS = this.wrapS;
    a.wrapT = this.wrapT;
    a.magFilter = this.magFilter;
    a.minFilter = this.minFilter;
    a.anisotropy = this.anisotropy;
    a.format = this.format;
    a.type = this.type;
    a.offset.copy(this.offset);
    a.repeat.copy(this.repeat);
    a.generateMipmaps = this.generateMipmaps;
    a.premultiplyAlpha = this.premultiplyAlpha;
    a.flipY = this.flipY;
    a.unpackAlignment =
      this.unpackAlignment;
    return a
  },
  dispose: function () {
    this.dispatchEvent({
      type: "dispose"
    })
  }
};
THREE.EventDispatcher.prototype.apply(THREE.Texture.prototype);
THREE.TextureIdCount = 0;
THREE.CompressedTexture = function (a, b, c, d, e, f, h, g, i, j, l) {
  THREE.Texture.call(this, null, f, h, g, i, j, d, e, l);
  this.image = {
    width: b,
    height: c
  };
  this.mipmaps = a;
  this.generateMipmaps = !1
};
THREE.CompressedTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.CompressedTexture.prototype.clone = function () {
  var a = new THREE.CompressedTexture;
  THREE.Texture.prototype.clone.call(this, a);
  return a
};
THREE.DataTexture = function (a, b, c, d, e, f, h, g, i, j, l) {
  THREE.Texture.call(this, null, f, h, g, i, j, d, e, l);
  this.image = {
    data: a,
    width: b,
    height: c
  }
};
THREE.DataTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.DataTexture.prototype.clone = function () {
  var a = new THREE.DataTexture;
  THREE.Texture.prototype.clone.call(this, a);
  return a
};
THREE.Particle = function (a) {
  THREE.Object3D.call(this);
  this.material = a
};
THREE.Particle.prototype = Object.create(THREE.Object3D.prototype);
THREE.Particle.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.Particle(this.material));
  THREE.Object3D.prototype.clone.call(this, a);
  return a
};
THREE.ParticleSystem = function (a, b) {
  THREE.Object3D.call(this);
  this.geometry = void 0 !== a ? a : new THREE.Geometry;
  this.material = void 0 !== b ? b : new THREE.ParticleBasicMaterial({
    color: 16777215 * Math.random()
  });
  this.frustumCulled = this.sortParticles = !1
};
THREE.ParticleSystem.prototype = Object.create(THREE.Object3D.prototype);
THREE.ParticleSystem.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.ParticleSystem(this.geometry, this.material));
  a.sortParticles = this.sortParticles;
  THREE.Object3D.prototype.clone.call(this, a);
  return a
};
THREE.Line = function (a, b, c) {
  THREE.Object3D.call(this);
  this.geometry = void 0 !== a ? a : new THREE.Geometry;
  this.material = void 0 !== b ? b : new THREE.LineBasicMaterial({
    color: 16777215 * Math.random()
  });
  this.type = void 0 !== c ? c : THREE.LineStrip
};
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.Line.prototype = Object.create(THREE.Object3D.prototype);
THREE.Line.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.Line(this.geometry, this.material, this.type));
  THREE.Object3D.prototype.clone.call(this, a);
  return a
};
THREE.Mesh = function (a, b) {
  THREE.Object3D.call(this);
  this.geometry = void 0 !== a ? a : new THREE.Geometry;
  this.material = void 0 !== b ? b : new THREE.MeshBasicMaterial({
    color: 16777215 * Math.random()
  });
  this.updateMorphTargets()
};
THREE.Mesh.prototype = Object.create(THREE.Object3D.prototype);
THREE.Mesh.prototype.updateMorphTargets = function () {
  if (0 < this.geometry.morphTargets.length) {
    this.morphTargetBase = -1;
    this.morphTargetForcedOrder = [];
    this.morphTargetInfluences = [];
    this.morphTargetDictionary = {};
    for (var a = 0, b = this.geometry.morphTargets.length; a < b; a++) this.morphTargetInfluences.push(0), this.morphTargetDictionary[this.geometry.morphTargets[a].name] = a
  }
};
THREE.Mesh.prototype.getMorphTargetIndexByName = function (a) {
  if (void 0 !== this.morphTargetDictionary[a]) return this.morphTargetDictionary[a];
  console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + a + " does not exist. Returning 0.");
  return 0
};
THREE.Mesh.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.Mesh(this.geometry, this.material));
  THREE.Object3D.prototype.clone.call(this, a);
  return a
};
THREE.Bone = function (a) {
  THREE.Object3D.call(this);
  this.skin = a;
  this.skinMatrix = new THREE.Matrix4
};
THREE.Bone.prototype = Object.create(THREE.Object3D.prototype);
THREE.Bone.prototype.update = function (a, b) {
  this.matrixAutoUpdate && (b |= this.updateMatrix());
  if (b || this.matrixWorldNeedsUpdate) a ? this.skinMatrix.multiplyMatrices(a, this.matrix) : this.skinMatrix.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, b = !0;
  var c, d = this.children.length;
  for (c = 0; c < d; c++) this.children[c].update(this.skinMatrix, b)
};
THREE.SkinnedMesh = function (a, b, c) {
  THREE.Mesh.call(this, a, b);
  this.useVertexTexture = void 0 !== c ? c : !0;
  this.identityMatrix = new THREE.Matrix4;
  this.bones = [];
  this.boneMatrices = [];
  var d, e, f;
  if (this.geometry && void 0 !== this.geometry.bones) {
    for (a = 0; a < this.geometry.bones.length; a++) c = this.geometry.bones[a], d = c.pos, e = c.rotq, f = c.scl, b = this.addBone(), b.name = c.name, b.position.set(d[0], d[1], d[2]), b.quaternion.set(e[0], e[1], e[2], e[3]), void 0 !== f ? b.scale.set(f[0], f[1], f[2]) : b.scale.set(1, 1, 1);
    for (a = 0; a < this.bones.length; a++) c =
      this.geometry.bones[a], b = this.bones[a], -1 === c.parent ? this.add(b) : this.bones[c.parent].add(b);
    a = this.bones.length;
    this.useVertexTexture ? (this.boneTextureHeight = this.boneTextureWidth = a = 256 < a ? 64 : 64 < a ? 32 : 16 < a ? 16 : 8, this.boneMatrices = new Float32Array(4 * this.boneTextureWidth * this.boneTextureHeight), this.boneTexture = new THREE.DataTexture(this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, THREE.RGBAFormat, THREE.FloatType), this.boneTexture.minFilter = THREE.NearestFilter, this.boneTexture.magFilter =
      THREE.NearestFilter, this.boneTexture.generateMipmaps = !1, this.boneTexture.flipY = !1) : this.boneMatrices = new Float32Array(16 * a);
    this.pose()
  }
};
THREE.SkinnedMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.SkinnedMesh.prototype.addBone = function (a) {
  void 0 === a && (a = new THREE.Bone(this));
  this.bones.push(a);
  return a
};
THREE.SkinnedMesh.prototype.updateMatrixWorld = function () {
  var a = new THREE.Matrix4;
  return function (b) {
    this.matrixAutoUpdate && this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || b) this.parent ? this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1;
    for (var b = 0, c = this.children.length; b < c; b++) {
      var d = this.children[b];
      d instanceof THREE.Bone ? d.update(this.identityMatrix, !1) : d.updateMatrixWorld(!0)
    }
    if (void 0 == this.boneInverses) {
      this.boneInverses = [];
      b = 0;
      for (c = this.bones.length; b < c; b++) d = new THREE.Matrix4, d.getInverse(this.bones[b].skinMatrix), this.boneInverses.push(d)
    }
    b = 0;
    for (c = this.bones.length; b < c; b++) a.multiplyMatrices(this.bones[b].skinMatrix, this.boneInverses[b]), a.flattenToArrayOffset(this.boneMatrices, 16 * b);
    this.useVertexTexture && (this.boneTexture.needsUpdate = !0)
  }
}();
THREE.SkinnedMesh.prototype.pose = function () {
  this.updateMatrixWorld(!0);
  this.normalizeSkinWeights()
};
THREE.SkinnedMesh.prototype.normalizeSkinWeights = function () {
  if (this.geometry instanceof THREE.Geometry)
    for (var a = 0; a < this.geometry.skinIndices.length; a++) {
      var b = this.geometry.skinWeights[a],
        c = 1 / b.lengthManhattan();
      Infinity !== c ? b.multiplyScalar(c) : b.set(1)
    }
};
THREE.SkinnedMesh.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.SkinnedMesh(this.geometry, this.material, this.useVertexTexture));
  THREE.Mesh.prototype.clone.call(this, a);
  return a
};
THREE.MorphAnimMesh = function (a, b) {
  THREE.Mesh.call(this, a, b);
  this.duration = 1E3;
  this.mirroredLoop = !1;
  this.currentKeyframe = this.lastKeyframe = this.time = 0;
  this.direction = 1;
  this.directionBackwards = !1;
  this.setFrameRange(0, this.geometry.morphTargets.length - 1)
};
THREE.MorphAnimMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.MorphAnimMesh.prototype.setFrameRange = function (a, b) {
  this.startKeyframe = a;
  this.endKeyframe = b;
  this.length = this.endKeyframe - this.startKeyframe + 1
};
THREE.MorphAnimMesh.prototype.setDirectionForward = function () {
  this.direction = 1;
  this.directionBackwards = !1
};
THREE.MorphAnimMesh.prototype.setDirectionBackward = function () {
  this.direction = -1;
  this.directionBackwards = !0
};
THREE.MorphAnimMesh.prototype.parseAnimations = function () {
  var a = this.geometry;
  a.animations || (a.animations = {});
  for (var b, c = a.animations, d = /([a-z]+)(\d+)/, e = 0, f = a.morphTargets.length; e < f; e++) {
    var h = a.morphTargets[e].name.match(d);
    if (h && 1 < h.length) {
      h = h[1];
      c[h] || (c[h] = {
        start: Infinity,
        end: -Infinity
      });
      var g = c[h];
      e < g.start && (g.start = e);
      e > g.end && (g.end = e);
      b || (b = h)
    }
  }
  a.firstAnimation = b
};
THREE.MorphAnimMesh.prototype.setAnimationLabel = function (a, b, c) {
  this.geometry.animations || (this.geometry.animations = {});
  this.geometry.animations[a] = {
    start: b,
    end: c
  }
};
THREE.MorphAnimMesh.prototype.playAnimation = function (a, b) {
  var c = this.geometry.animations[a];
  c ? (this.setFrameRange(c.start, c.end), this.duration = 1E3 * ((c.end - c.start) / b), this.time = 0) : console.warn("animation[" + a + "] undefined")
};
THREE.MorphAnimMesh.prototype.updateAnimation = function (a) {
  var b = this.duration / this.length;
  this.time += this.direction * a;
  if (this.mirroredLoop) {
    if (this.time > this.duration || 0 > this.time) this.direction *= -1, this.time > this.duration && (this.time = this.duration, this.directionBackwards = !0), 0 > this.time && (this.time = 0, this.directionBackwards = !1)
  } else this.time %= this.duration, 0 > this.time && (this.time += this.duration);
  a = this.startKeyframe + THREE.Math.clamp(Math.floor(this.time / b), 0, this.length - 1);
  a !== this.currentKeyframe &&
    (this.morphTargetInfluences[this.lastKeyframe] = 0, this.morphTargetInfluences[this.currentKeyframe] = 1, this.morphTargetInfluences[a] = 0, this.lastKeyframe = this.currentKeyframe, this.currentKeyframe = a);
  b = this.time % b / b;
  this.directionBackwards && (b = 1 - b);
  this.morphTargetInfluences[this.currentKeyframe] = b;
  this.morphTargetInfluences[this.lastKeyframe] = 1 - b
};
THREE.MorphAnimMesh.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.MorphAnimMesh(this.geometry, this.material));
  a.duration = this.duration;
  a.mirroredLoop = this.mirroredLoop;
  a.time = this.time;
  a.lastKeyframe = this.lastKeyframe;
  a.currentKeyframe = this.currentKeyframe;
  a.direction = this.direction;
  a.directionBackwards = this.directionBackwards;
  THREE.Mesh.prototype.clone.call(this, a);
  return a
};
THREE.Ribbon = function (a, b) {
  THREE.Object3D.call(this);
  this.geometry = a;
  this.material = b
};
THREE.Ribbon.prototype = Object.create(THREE.Object3D.prototype);
THREE.Ribbon.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.Ribbon(this.geometry, this.material));
  THREE.Object3D.prototype.clone.call(this, a);
  return a
};
THREE.LOD = function () {
  THREE.Object3D.call(this);
  this.objects = []
};
THREE.LOD.prototype = Object.create(THREE.Object3D.prototype);
THREE.LOD.prototype.addLevel = function (a, b) {
  void 0 === b && (b = 0);
  for (var b = Math.abs(b), c = 0; c < this.objects.length && !(b < this.objects[c].distance); c++);
  this.objects.splice(c, 0, {
    distance: b,
    object: a
  });
  this.add(a)
};
THREE.LOD.prototype.getObjectForDistance = function (a) {
  for (var b = 1, c = this.objects.length; b < c && !(a < this.objects[b].distance); b++);
  return this.objects[b - 1].object
};
THREE.LOD.prototype.update = function () {
  var a = new THREE.Vector3,
    b = new THREE.Vector3;
  return function (c) {
    if (1 < this.objects.length) {
      a.getPositionFromMatrix(c.matrixWorld);
      b.getPositionFromMatrix(this.matrixWorld);
      c = a.distanceTo(b);
      this.objects[0].object.visible = !0;
      for (var d = 1, e = this.objects.length; d < e; d++)
        if (c >= this.objects[d].distance) this.objects[d - 1].object.visible = !1, this.objects[d].object.visible = !0;
        else break;
      for (; d < e; d++) this.objects[d].object.visible = !1
    }
  }
}();
THREE.LOD.prototype.clone = function () {};
THREE.Sprite = function (a) {
  THREE.Object3D.call(this);
  this.material = void 0 !== a ? a : new THREE.SpriteMaterial;
  this.rotation3d = this.rotation;
  this.rotation = 0
};
THREE.Sprite.prototype = Object.create(THREE.Object3D.prototype);
THREE.Sprite.prototype.updateMatrix = function () {
  this.rotation3d.set(0, 0, this.rotation, this.rotation3d.order);
  this.quaternion.setFromEuler(this.rotation3d);
  this.matrix.compose(this.position, this.quaternion, this.scale);
  this.matrixWorldNeedsUpdate = !0
};
THREE.Sprite.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.Sprite(this.material));
  THREE.Object3D.prototype.clone.call(this, a);
  return a
};
THREE.Scene = function () {
  THREE.Object3D.call(this);
  this.overrideMaterial = this.fog = null;
  this.autoUpdate = !0;
  this.matrixAutoUpdate = !1;
  this.__objects = [];
  this.__lights = [];
  this.__objectsAdded = [];
  this.__objectsRemoved = []
};
THREE.Scene.prototype = Object.create(THREE.Object3D.prototype);
THREE.Scene.prototype.__addObject = function (a) {
  if (a instanceof THREE.Light) - 1 === this.__lights.indexOf(a) && this.__lights.push(a), a.target && void 0 === a.target.parent && this.add(a.target);
  else if (!(a instanceof THREE.Camera || a instanceof THREE.Bone) && -1 === this.__objects.indexOf(a)) {
    this.__objects.push(a);
    this.__objectsAdded.push(a);
    var b = this.__objectsRemoved.indexOf(a); - 1 !== b && this.__objectsRemoved.splice(b, 1)
  }
  for (b = 0; b < a.children.length; b++) this.__addObject(a.children[b])
};
THREE.Scene.prototype.__removeObject = function (a) {
  if (a instanceof THREE.Light) {
    var b = this.__lights.indexOf(a); - 1 !== b && this.__lights.splice(b, 1)
  } else a instanceof THREE.Camera || (b = this.__objects.indexOf(a), -1 !== b && (this.__objects.splice(b, 1), this.__objectsRemoved.push(a), b = this.__objectsAdded.indexOf(a), -1 !== b && this.__objectsAdded.splice(b, 1)));
  for (b = 0; b < a.children.length; b++) this.__removeObject(a.children[b])
};
THREE.Scene.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.Scene);
  THREE.Object3D.prototype.clone.call(this, a);
  null !== this.fog && (a.fog = this.fog.clone());
  null !== this.overrideMaterial && (a.overrideMaterial = this.overrideMaterial.clone());
  a.autoUpdate = this.autoUpdate;
  a.matrixAutoUpdate = this.matrixAutoUpdate;
  return a
};
THREE.Fog = function (a, b, c) {
  this.name = "";
  this.color = new THREE.Color(a);
  this.near = void 0 !== b ? b : 1;
  this.far = void 0 !== c ? c : 1E3
};
THREE.Fog.prototype.clone = function () {
  return new THREE.Fog(this.color.getHex(), this.near, this.far)
};
THREE.FogExp2 = function (a, b) {
  this.name = "";
  this.color = new THREE.Color(a);
  this.density = void 0 !== b ? b : 2.5E-4
};
THREE.FogExp2.prototype.clone = function () {
  return new THREE.FogExp2(this.color.getHex(), this.density)
};
THREE.CanvasRenderer = function (a) {
  function b(a, b, c) {
    for (var d = 0, e = I.length; d < e; d++) {
      var f = I[d];
      Xb.copy(f.color);
      if (f instanceof THREE.DirectionalLight) {
        var h = Wa.getPositionFromMatrix(f.matrixWorld).normalize(),
          g = b.dot(h);
        0 >= g || (g *= f.intensity, c.add(Xb.multiplyScalar(g)))
      } else f instanceof THREE.PointLight && (h = Wa.getPositionFromMatrix(f.matrixWorld), g = b.dot(Wa.subVectors(h, a).normalize()), 0 >= g || (g *= 0 == f.distance ? 1 : 1 - Math.min(a.distanceTo(h) / f.distance, 1), 0 != g && (g *= f.intensity, c.add(Xb.multiplyScalar(g)))))
    }
  }

  function c(a, c, e, l, p, r, U, q) {
    C.info.render.vertices += 3;
    C.info.render.faces++;
    m(q.opacity);
    n(q.blending);
    ya = a.positionScreen.x;
    Ha = a.positionScreen.y;
    fa = c.positionScreen.x;
    da = c.positionScreen.y;
    T = e.positionScreen.x;
    aa = e.positionScreen.y;
    d(ya, Ha, fa, da, T, aa);
    (q instanceof THREE.MeshLambertMaterial || q instanceof THREE.MeshPhongMaterial) && null === q.map ? (Qa.copy(q.color), Xa.copy(q.emissive), q.vertexColors === THREE.FaceColors && Qa.multiply(U.color), !1 === q.wireframe && q.shading == THREE.SmoothShading && 3 == U.vertexNormalsLength ?
      (ra.copy(ib), ja.copy(ib), ua.copy(ib), b(U.v1.positionWorld, U.vertexNormalsModel[0], ra), b(U.v2.positionWorld, U.vertexNormalsModel[1], ja), b(U.v3.positionWorld, U.vertexNormalsModel[2], ua), ra.multiply(Qa).add(Xa), ja.multiply(Qa).add(Xa), ua.multiply(Qa).add(Xa), Ra.addColors(ja, ua).multiplyScalar(0.5), lb = j(ra, ja, ua, Ra), i(ya, Ha, fa, da, T, aa, 0, 0, 1, 0, 0, 1, lb)) : (ia.copy(ib), b(U.centroidModel, U.normalModel, ia), ia.multiply(Qa).add(Xa), !0 === q.wireframe ? f(ia, q.wireframeLinewidth, q.wireframeLinecap, q.wireframeLinejoin) :
        h(ia))) : q instanceof THREE.MeshBasicMaterial || q instanceof THREE.MeshLambertMaterial || q instanceof THREE.MeshPhongMaterial ? null !== q.map ? q.map.mapping instanceof THREE.UVMapping && (Ga = U.uvs[0], g(ya, Ha, fa, da, T, aa, Ga[l].x, Ga[l].y, Ga[p].x, Ga[p].y, Ga[r].x, Ga[r].y, q.map)) : null !== q.envMap ? q.envMap.mapping instanceof THREE.SphericalReflectionMapping && (Wa.copy(U.vertexNormalsModelView[l]), Ca = 0.5 * Wa.x + 0.5, yb = 0.5 * Wa.y + 0.5, Wa.copy(U.vertexNormalsModelView[p]), Ib = 0.5 * Wa.x + 0.5, k = 0.5 * Wa.y + 0.5, Wa.copy(U.vertexNormalsModelView[r]),
      Rb = 0.5 * Wa.x + 0.5, Yb = 0.5 * Wa.y + 0.5, g(ya, Ha, fa, da, T, aa, Ca, yb, Ib, k, Rb, Yb, q.envMap)) : (ia.copy(q.color), q.vertexColors === THREE.FaceColors && ia.multiply(U.color), !0 === q.wireframe ? f(ia, q.wireframeLinewidth, q.wireframeLinecap, q.wireframeLinejoin) : h(ia)) : q instanceof THREE.MeshDepthMaterial ? (Sa = D.near, xb = D.far, ra.r = ra.g = ra.b = 1 - z(a.positionScreen.z * a.positionScreen.w, Sa, xb), ja.r = ja.g = ja.b = 1 - z(c.positionScreen.z * c.positionScreen.w, Sa, xb), ua.r = ua.g = ua.b = 1 - z(e.positionScreen.z * e.positionScreen.w, Sa, xb), Ra.addColors(ja,
      ua).multiplyScalar(0.5), lb = j(ra, ja, ua, Ra), i(ya, Ha, fa, da, T, aa, 0, 0, 1, 0, 0, 1, lb)) : q instanceof THREE.MeshNormalMaterial && (q.shading == THREE.FlatShading ? (a = U.normalModelView, ia.setRGB(a.x, a.y, a.z).multiplyScalar(0.5).addScalar(0.5), !0 === q.wireframe ? f(ia, q.wireframeLinewidth, q.wireframeLinecap, q.wireframeLinejoin) : h(ia)) : q.shading == THREE.SmoothShading && (a = U.vertexNormalsModelView[l], ra.setRGB(a.x, a.y, a.z).multiplyScalar(0.5).addScalar(0.5), a = U.vertexNormalsModelView[p], ja.setRGB(a.x, a.y, a.z).multiplyScalar(0.5).addScalar(0.5),
      a = U.vertexNormalsModelView[r], ua.setRGB(a.x, a.y, a.z).multiplyScalar(0.5).addScalar(0.5), Ra.addColors(ja, ua).multiplyScalar(0.5), lb = j(ra, ja, ua, Ra), i(ya, Ha, fa, da, T, aa, 0, 0, 1, 0, 0, 1, lb)))
  }

  function d(a, b, c, d, e, f) {
    y.beginPath();
    y.moveTo(a, b);
    y.lineTo(c, d);
    y.lineTo(e, f);
    y.closePath()
  }

  function e(a, b, c, d, e, f, h, g) {
    y.beginPath();
    y.moveTo(a, b);
    y.lineTo(c, d);
    y.lineTo(e, f);
    y.lineTo(h, g);
    y.closePath()
  }

  function f(a, b, c, d) {
    p(b);
    t(c);
    q(d);
    r(a.getStyle());
    y.stroke();
    va.expandByScalar(2 * b)
  }

  function h(a) {
    s(a.getStyle());
    y.fill()
  }

  function g(a, b, c, d, e, f, g, k, i, j, m, l, n) {
    if (!(n instanceof THREE.DataTexture || void 0 === n.image || 0 == n.image.width)) {
      if (!0 === n.needsUpdate) {
        var p = n.wrapS == THREE.RepeatWrapping,
          q = n.wrapT == THREE.RepeatWrapping;
        Jb[n.id] = y.createPattern(n.image, !0 === p && !0 === q ? "repeat" : !0 === p && !1 === q ? "repeat-x" : !1 === p && !0 === q ? "repeat-y" : "no-repeat");
        n.needsUpdate = !1
      }
      void 0 === Jb[n.id] ? s("rgba(0,0,0,1)") : s(Jb[n.id]);
      var p = n.offset.x / n.repeat.x,
        q = n.offset.y / n.repeat.y,
        r = n.image.width * n.repeat.x,
        t = n.image.height * n.repeat.y,
        g = (g + p) * r,
        k = (1 - k + q) * t,
        c = c - a,
        d = d - b,
        e = e - a,
        f = f - b,
        i = (i + p) * r - g,
        j = (1 - j + q) * t - k,
        m = (m + p) * r - g,
        l = (1 - l + q) * t - k,
        p = i * l - m * j;
      0 === p ? (void 0 === Ab[n.id] && (b = document.createElement("canvas"), b.width = n.image.width, b.height = n.image.height, b = b.getContext("2d"), b.drawImage(n.image, 0, 0), Ab[n.id] = b.getImageData(0, 0, n.image.width, n.image.height).data), b = Ab[n.id], g = 4 * (Math.floor(g) + Math.floor(k) * n.image.width), ia.setRGB(b[g] / 255, b[g + 1] / 255, b[g + 2] / 255), h(ia)) : (p = 1 / p, n = (l * c - j * e) * p, j = (l * d - j * f) * p, c = (i * e - m * c) * p, d = (i * f - m * d) * p, a = a -
        n * g - c * k, g = b - j * g - d * k, y.save(), y.transform(n, j, c, d, a, g), y.fill(), y.restore())
    }
  }

  function i(a, b, c, d, e, f, h, g, k, i, j, m, l) {
    var n, p;
    n = l.width - 1;
    p = l.height - 1;
    h *= n;
    g *= p;
    c -= a;
    d -= b;
    e -= a;
    f -= b;
    k = k * n - h;
    i = i * p - g;
    j = j * n - h;
    m = m * p - g;
    p = 1 / (k * m - j * i);
    n = (m * c - i * e) * p;
    i = (m * d - i * f) * p;
    c = (k * e - j * c) * p;
    d = (k * f - j * d) * p;
    a = a - n * h - c * g;
    b = b - i * h - d * g;
    y.save();
    y.transform(n, i, c, d, a, b);
    y.clip();
    y.drawImage(l, 0, 0);
    y.restore()
  }

  function j(a, b, c, d) {
    Ka[0] = 255 * a.r | 0;
    Ka[1] = 255 * a.g | 0;
    Ka[2] = 255 * a.b | 0;
    Ka[4] = 255 * b.r | 0;
    Ka[5] = 255 * b.g | 0;
    Ka[6] = 255 * b.b | 0;
    Ka[8] = 255 *
      c.r | 0;
    Ka[9] = 255 * c.g | 0;
    Ka[10] = 255 * c.b | 0;
    Ka[12] = 255 * d.r | 0;
    Ka[13] = 255 * d.g | 0;
    Ka[14] = 255 * d.b | 0;
    Bb.putImageData(Kb, 0, 0);
    Lb.drawImage(Gb, 0, 0);
    return Sb
  }

  function l(a, b, c) {
    var d = b.x - a.x,
      e = b.y - a.y,
      f = d * d + e * e;
    0 !== f && (c /= Math.sqrt(f), d *= c, e *= c, b.x += d, b.y += e, a.x -= d, a.y -= e)
  }

  function m(a) {
    Z !== a && (Z = y.globalAlpha = a)
  }

  function n(a) {
    L !== a && (a === THREE.NormalBlending ? y.globalCompositeOperation = "source-over" : a === THREE.AdditiveBlending ? y.globalCompositeOperation = "lighter" : a === THREE.SubtractiveBlending && (y.globalCompositeOperation =
      "darker"), L = a)
  }

  function p(a) {
    Ua !== a && (Ua = y.lineWidth = a)
  }

  function t(a) {
    O !== a && (O = y.lineCap = a)
  }

  function q(a) {
    ka !== a && (ka = y.lineJoin = a)
  }

  function r(a) {
    pa !== a && (pa = y.strokeStyle = a)
  }

  function s(a) {
    Pa !== a && (Pa = y.fillStyle = a)
  }

  function v(a, b) {
    if (Fa !== a || wa !== b) y.setLineDash([a, b]), Fa = a, wa = b
  }
  console.log("THREE.CanvasRenderer", THREE.REVISION);
  var z = THREE.Math.smoothstep,
    a = a || {},
    C = this,
    F, H, I, G = new THREE.Projector,
    A = void 0 !== a.canvas ? a.canvas : document.createElement("canvas"),
    K, B, J, N, y = A.getContext("2d"),
    M = new THREE.Color(0),
    w = 0,
    Z = 1,
    L = 0,
    pa = null,
    Pa = null,
    Ua = null,
    O = null,
    ka = null,
    Fa = null,
    wa = 0,
    D, V, ea, qa, eb, pb = new THREE.RenderableVertex,
    ub = new THREE.RenderableVertex,
    ya, Ha, fa, da, T, aa, na, ha, X, xa, ab, la, ia = new THREE.Color,
    ra = new THREE.Color,
    ja = new THREE.Color,
    ua = new THREE.Color,
    Ra = new THREE.Color,
    Qa = new THREE.Color,
    Xa = new THREE.Color,
    Xb = new THREE.Color,
    Jb = {},
    Ab = {},
    Sa, xb, lb, Ga, Ca, yb, Ib, k, Rb, Yb, fb = new THREE.Box2,
    oa = new THREE.Box2,
    va = new THREE.Box2,
    ib = new THREE.Color,
    Tb = new THREE.Color,
    Ub = new THREE.Color,
    Wa = new THREE.Vector3,
    Gb, Bb,
    Kb, Ka, Sb, Lb, Hb = 16;
  Gb = document.createElement("canvas");
  Gb.width = Gb.height = 2;
  Bb = Gb.getContext("2d");
  Bb.fillStyle = "rgba(0,0,0,1)";
  Bb.fillRect(0, 0, 2, 2);
  Kb = Bb.getImageData(0, 0, 2, 2);
  Ka = Kb.data;
  Sb = document.createElement("canvas");
  Sb.width = Sb.height = Hb;
  Lb = Sb.getContext("2d");
  Lb.translate(-Hb / 2, -Hb / 2);
  Lb.scale(Hb, Hb);
  Hb--;
  void 0 === y.setLineDash && (y.setLineDash = void 0 !== y.mozDash ? function (a) {
    y.mozDash = null !== a[0] ? a : null
  } : function () {});
  this.domElement = A;
  this.devicePixelRatio = void 0 !== a.devicePixelRatio ? a.devicePixelRatio :
    void 0 !== window.devicePixelRatio ? window.devicePixelRatio : 1;
  this.sortElements = this.sortObjects = this.autoClear = !0;
  this.info = {
    render: {
      vertices: 0,
      faces: 0
    }
  };
  this.supportsVertexTextures = function () {};
  this.setFaceCulling = function () {};
  this.setSize = function (a, b, c) {
    K = a * this.devicePixelRatio;
    B = b * this.devicePixelRatio;
    J = Math.floor(K / 2);
    N = Math.floor(B / 2);
    A.width = K;
    A.height = B;
    1 !== this.devicePixelRatio && !1 !== c && (A.style.width = a + "px", A.style.height = b + "px");
    fb.set(new THREE.Vector2(-J, -N), new THREE.Vector2(J, N));
    oa.set(new THREE.Vector2(-J,
      -N), new THREE.Vector2(J, N));
    Z = 1;
    L = 0;
    ka = O = Ua = Pa = pa = null
  };
  this.setClearColor = function (a, b) {
    M.set(a);
    w = void 0 !== b ? b : 1;
    oa.set(new THREE.Vector2(-J, -N), new THREE.Vector2(J, N))
  };
  this.setClearColorHex = function (a, b) {
    console.warn("DEPRECATED: .setClearColorHex() is being removed. Use .setClearColor() instead.");
    this.setClearColor(a, b)
  };
  this.getMaxAnisotropy = function () {
    return 0
  };
  this.clear = function () {
    y.setTransform(1, 0, 0, -1, J, N);
    !1 === oa.empty() && (oa.intersect(fb), oa.expandByScalar(2), 1 > w && y.clearRect(oa.min.x |
      0, oa.min.y | 0, oa.max.x - oa.min.x | 0, oa.max.y - oa.min.y | 0), 0 < w && (n(THREE.NormalBlending), m(1), s("rgba(" + Math.floor(255 * M.r) + "," + Math.floor(255 * M.g) + "," + Math.floor(255 * M.b) + "," + w + ")"), y.fillRect(oa.min.x | 0, oa.min.y | 0, oa.max.x - oa.min.x | 0, oa.max.y - oa.min.y | 0)), oa.makeEmpty())
  };
  this.render = function (a, g) {
    if (!1 === g instanceof THREE.Camera) console.error("THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera.");
    else {
      !0 === this.autoClear && this.clear();
      y.setTransform(1, 0, 0, -1, J, N);
      C.info.render.vertices =
        0;
      C.info.render.faces = 0;
      F = G.projectScene(a, g, this.sortObjects, this.sortElements);
      H = F.elements;
      I = F.lights;
      D = g;
      ib.setRGB(0, 0, 0);
      Tb.setRGB(0, 0, 0);
      Ub.setRGB(0, 0, 0);
      for (var k = 0, A = I.length; k < A; k++) {
        var w = I[k],
          B = w.color;
        w instanceof THREE.AmbientLight ? ib.add(B) : w instanceof THREE.DirectionalLight ? Tb.add(B) : w instanceof THREE.PointLight && Ub.add(B)
      }
      k = 0;
      for (A = H.length; k < A; k++) {
        var U = H[k],
          w = U.material;
        if (!(void 0 === w || !1 === w.visible)) {
          va.makeEmpty();
          if (U instanceof THREE.RenderableParticle) {
            V = U;
            V.x *= J;
            V.y *=
              N;
            B = V;
            m(w.opacity);
            n(w.blending);
            var mb = void 0,
              nb = void 0,
              vb = void 0,
              zb = void 0,
              Zb = void 0,
              Jc = void 0,
              Kc = void 0;
            w instanceof THREE.ParticleBasicMaterial ? null === w.map ? (vb = U.object.scale.x, zb = U.object.scale.y, vb *= U.scale.x * J, zb *= U.scale.y * N, va.min.set(B.x - vb, B.y - zb), va.max.set(B.x + vb, B.y + zb), !1 === fb.isIntersectionBox(va) ? va.makeEmpty() : (s(w.color.getStyle()), y.save(), y.translate(B.x, B.y), y.rotate(-U.rotation), y.scale(vb, zb), y.fillRect(-1, -1, 2, 2), y.restore())) : (Zb = w.map.image, Jc = Zb.width >> 1, Kc = Zb.height >>
              1, vb = U.scale.x * J, zb = U.scale.y * N, mb = vb * Jc, nb = zb * Kc, va.min.set(B.x - mb, B.y - nb), va.max.set(B.x + mb, B.y + nb), !1 === fb.isIntersectionBox(va) ? va.makeEmpty() : (y.save(), y.translate(B.x, B.y), y.rotate(-U.rotation), y.scale(vb, -zb), y.translate(-Jc, -Kc), y.drawImage(Zb, 0, 0), y.restore())) : w instanceof THREE.ParticleCanvasMaterial && (mb = U.scale.x * J, nb = U.scale.y * N, va.min.set(B.x - mb, B.y - nb), va.max.set(B.x + mb, B.y + nb), !1 === fb.isIntersectionBox(va) ? va.makeEmpty() : (r(w.color.getStyle()), s(w.color.getStyle()), y.save(), y.translate(B.x,
              B.y), y.rotate(-U.rotation), y.scale(mb, nb), w.program(y), y.restore()))
          } else if (U instanceof THREE.RenderableLine) {
            if (V = U.v1, ea = U.v2, V.positionScreen.x *= J, V.positionScreen.y *= N, ea.positionScreen.x *= J, ea.positionScreen.y *= N, va.setFromPoints([V.positionScreen, ea.positionScreen]), !0 === fb.isIntersectionBox(va))
              if (B = V, mb = ea, m(w.opacity), n(w.blending), y.beginPath(), y.moveTo(B.positionScreen.x, B.positionScreen.y), y.lineTo(mb.positionScreen.x, mb.positionScreen.y), w instanceof THREE.LineBasicMaterial) {
                p(w.linewidth);
                t(w.linecap);
                q(w.linejoin);
                if (w.vertexColors !== THREE.VertexColors) r(w.color.getStyle());
                else if (nb = U.vertexColors[0].getStyle(), U = U.vertexColors[1].getStyle(), nb === U) r(nb);
                else {
                  try {
                    var wc = y.createLinearGradient(B.positionScreen.x, B.positionScreen.y, mb.positionScreen.x, mb.positionScreen.y);
                    wc.addColorStop(0, nb);
                    wc.addColorStop(1, U)
                  } catch (fd) {
                    wc = nb
                  }
                  r(wc)
                }
                y.stroke();
                va.expandByScalar(2 * w.linewidth)
              } else w instanceof THREE.LineDashedMaterial && (p(w.linewidth), t(w.linecap), q(w.linejoin), r(w.color.getStyle()),
                v(w.dashSize, w.gapSize), y.stroke(), va.expandByScalar(2 * w.linewidth), v(null, null))
          } else if (U instanceof THREE.RenderableFace3) {
            V = U.v1;
            ea = U.v2;
            qa = U.v3;
            if (-1 > V.positionScreen.z || 1 < V.positionScreen.z) continue;
            if (-1 > ea.positionScreen.z || 1 < ea.positionScreen.z) continue;
            if (-1 > qa.positionScreen.z || 1 < qa.positionScreen.z) continue;
            V.positionScreen.x *= J;
            V.positionScreen.y *= N;
            ea.positionScreen.x *= J;
            ea.positionScreen.y *= N;
            qa.positionScreen.x *= J;
            qa.positionScreen.y *= N;
            0 < w.overdraw && (l(V.positionScreen, ea.positionScreen,
              w.overdraw), l(ea.positionScreen, qa.positionScreen, w.overdraw), l(qa.positionScreen, V.positionScreen, w.overdraw));
            va.setFromPoints([V.positionScreen, ea.positionScreen, qa.positionScreen]);
            !0 === fb.isIntersectionBox(va) && c(V, ea, qa, 0, 1, 2, U, w)
          } else if (U instanceof THREE.RenderableFace4) {
            V = U.v1;
            ea = U.v2;
            qa = U.v3;
            eb = U.v4;
            if (-1 > V.positionScreen.z || 1 < V.positionScreen.z) continue;
            if (-1 > ea.positionScreen.z || 1 < ea.positionScreen.z) continue;
            if (-1 > qa.positionScreen.z || 1 < qa.positionScreen.z) continue;
            if (-1 > eb.positionScreen.z ||
              1 < eb.positionScreen.z) continue;
            V.positionScreen.x *= J;
            V.positionScreen.y *= N;
            ea.positionScreen.x *= J;
            ea.positionScreen.y *= N;
            qa.positionScreen.x *= J;
            qa.positionScreen.y *= N;
            eb.positionScreen.x *= J;
            eb.positionScreen.y *= N;
            pb.positionScreen.copy(ea.positionScreen);
            ub.positionScreen.copy(eb.positionScreen);
            0 < w.overdraw && (l(V.positionScreen, ea.positionScreen, w.overdraw), l(ea.positionScreen, eb.positionScreen, w.overdraw), l(eb.positionScreen, V.positionScreen, w.overdraw), l(qa.positionScreen, pb.positionScreen, w.overdraw),
              l(qa.positionScreen, ub.positionScreen, w.overdraw));
            va.setFromPoints([V.positionScreen, ea.positionScreen, qa.positionScreen, eb.positionScreen]);
            !0 === fb.isIntersectionBox(va) && (B = V, mb = ea, nb = qa, vb = eb, zb = pb, Zb = ub, C.info.render.vertices += 4, C.info.render.faces++, m(w.opacity), n(w.blending), void 0 !== w.map && null !== w.map || void 0 !== w.envMap && null !== w.envMap ? (c(B, mb, vb, 0, 1, 3, U, w), c(zb, nb, Zb, 1, 2, 3, U, w)) : (ya = B.positionScreen.x, Ha = B.positionScreen.y, fa = mb.positionScreen.x, da = mb.positionScreen.y, T = nb.positionScreen.x,
              aa = nb.positionScreen.y, na = vb.positionScreen.x, ha = vb.positionScreen.y, X = zb.positionScreen.x, xa = zb.positionScreen.y, ab = Zb.positionScreen.x, la = Zb.positionScreen.y, w instanceof THREE.MeshLambertMaterial || w instanceof THREE.MeshPhongMaterial ? (Qa.copy(w.color), Xa.copy(w.emissive), w.vertexColors === THREE.FaceColors && Qa.multiply(U.color), !1 === w.wireframe && w.shading == THREE.SmoothShading && 4 == U.vertexNormalsLength ? (ra.copy(ib), ja.copy(ib), ua.copy(ib), Ra.copy(ib), b(U.v1.positionWorld, U.vertexNormalsModel[0], ra),
                b(U.v2.positionWorld, U.vertexNormalsModel[1], ja), b(U.v4.positionWorld, U.vertexNormalsModel[3], ua), b(U.v3.positionWorld, U.vertexNormalsModel[2], Ra), ra.multiply(Qa).add(Xa), ja.multiply(Qa).add(Xa), ua.multiply(Qa).add(Xa), Ra.multiply(Qa).add(Xa), lb = j(ra, ja, ua, Ra), d(ya, Ha, fa, da, na, ha), i(ya, Ha, fa, da, na, ha, 0, 0, 1, 0, 0, 1, lb), d(X, xa, T, aa, ab, la), i(X, xa, T, aa, ab, la, 1, 0, 1, 1, 0, 1, lb)) : (ia.copy(ib), b(U.centroidModel, U.normalModel, ia), ia.multiply(Qa).add(Xa), e(ya, Ha, fa, da, T, aa, na, ha), !0 === w.wireframe ? f(ia, w.wireframeLinewidth,
                w.wireframeLinecap, w.wireframeLinejoin) : h(ia))) : w instanceof THREE.MeshBasicMaterial ? (ia.copy(w.color), w.vertexColors === THREE.FaceColors && ia.multiply(U.color), e(ya, Ha, fa, da, T, aa, na, ha), !0 === w.wireframe ? f(ia, w.wireframeLinewidth, w.wireframeLinecap, w.wireframeLinejoin) : h(ia)) : w instanceof THREE.MeshNormalMaterial ? (B = void 0, w.shading == THREE.FlatShading ? (B = U.normalModelView, ia.setRGB(B.x, B.y, B.z).multiplyScalar(0.5).addScalar(0.5), e(ya, Ha, fa, da, T, aa, na, ha), !0 === w.wireframe ? f(ia, w.wireframeLinewidth, w.wireframeLinecap,
                w.wireframeLinejoin) : h(ia)) : w.shading == THREE.SmoothShading && (B = U.vertexNormalsModelView[0], ra.setRGB(B.x, B.y, B.z).multiplyScalar(0.5).addScalar(0.5), B = U.vertexNormalsModelView[1], ja.setRGB(B.x, B.y, B.z).multiplyScalar(0.5).addScalar(0.5), B = U.vertexNormalsModelView[3], ua.setRGB(B.x, B.y, B.z).multiplyScalar(0.5).addScalar(0.5), B = U.vertexNormalsModelView[2], Ra.setRGB(B.x, B.y, B.z).multiplyScalar(0.5).addScalar(0.5), lb = j(ra, ja, ua, Ra), d(ya, Ha, fa, da, na, ha), i(ya, Ha, fa, da, na, ha, 0, 0, 1, 0, 0, 1, lb), d(X, xa, T, aa, ab,
                la), i(X, xa, T, aa, ab, la, 1, 0, 1, 1, 0, 1, lb))) : w instanceof THREE.MeshDepthMaterial && (Sa = D.near, xb = D.far, ra.r = ra.g = ra.b = 1 - z(B.positionScreen.z * B.positionScreen.w, Sa, xb), ja.r = ja.g = ja.b = 1 - z(mb.positionScreen.z * mb.positionScreen.w, Sa, xb), ua.r = ua.g = ua.b = 1 - z(vb.positionScreen.z * vb.positionScreen.w, Sa, xb), Ra.r = Ra.g = Ra.b = 1 - z(nb.positionScreen.z * nb.positionScreen.w, Sa, xb), lb = j(ra, ja, ua, Ra), d(ya, Ha, fa, da, na, ha), i(ya, Ha, fa, da, na, ha, 0, 0, 1, 0, 0, 1, lb), d(X, xa, T, aa, ab, la), i(X, xa, T, aa, ab, la, 1, 0, 1, 1, 0, 1, lb))))
          }
          oa.union(va)
        }
      }
      y.setTransform(1,
        0, 0, 1, 0, 0)
    }
  }
};
THREE.ShaderChunk = {
  fog_pars_fragment: "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
  fog_fragment: "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
  envmap_pars_fragment: "#ifdef USE_ENVMAP\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform float flipEnvMap;\nuniform int combine;\n#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\nuniform bool useRefract;\nuniform float refractionRatio;\n#else\nvarying vec3 vReflect;\n#endif\n#endif",
  envmap_fragment: "#ifdef USE_ENVMAP\nvec3 reflectVec;\n#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\nvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\nif ( useRefract ) {\nreflectVec = refract( cameraToVertex, normal, refractionRatio );\n} else { \nreflectVec = reflect( cameraToVertex, normal );\n}\n#else\nreflectVec = vReflect;\n#endif\n#ifdef DOUBLE_SIDED\nfloat flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\nvec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n#else\nvec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n#endif\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\nif ( combine == 1 ) {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );\n} else if ( combine == 2 ) {\ngl_FragColor.xyz += cubeColor.xyz * specularStrength * reflectivity;\n} else {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );\n}\n#endif",
  envmap_pars_vertex: "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
  worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n#ifdef USE_SKINNING\nvec4 worldPosition = modelMatrix * skinned;\n#endif\n#if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\nvec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n#endif\n#if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\nvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n#endif\n#endif",
  envmap_vertex: "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\nvec3 worldNormal = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;\nworldNormal = normalize( worldNormal );\nvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\nif ( useRefract ) {\nvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n} else {\nvReflect = reflect( cameraToVertex, worldNormal );\n}\n#endif",
  map_particle_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
  map_particle_fragment: "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );\n#endif",
  map_pars_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",
  map_pars_fragment: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
  map_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
  map_fragment: "#ifdef USE_MAP\nvec4 texelColor = texture2D( map, vUv );\n#ifdef GAMMA_INPUT\ntexelColor.xyz *= texelColor.xyz;\n#endif\ngl_FragColor = gl_FragColor * texelColor;\n#endif",
  lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
  lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
  lightmap_fragment: "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
  lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
  bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\nuniform sampler2D bumpMap;\nuniform float bumpScale;\nvec2 dHdxy_fwd() {\nvec2 dSTdx = dFdx( vUv );\nvec2 dSTdy = dFdy( vUv );\nfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\nfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\nfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\nreturn vec2( dBx, dBy );\n}\nvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\nvec3 vSigmaX = dFdx( surf_pos );\nvec3 vSigmaY = dFdy( surf_pos );\nvec3 vN = surf_norm;\nvec3 R1 = cross( vSigmaY, vN );\nvec3 R2 = cross( vN, vSigmaX );\nfloat fDet = dot( vSigmaX, R1 );\nvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\nreturn normalize( abs( fDet ) * surf_norm - vGrad );\n}\n#endif",
  normalmap_pars_fragment: "#ifdef USE_NORMALMAP\nuniform sampler2D normalMap;\nuniform vec2 normalScale;\nvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\nvec3 q0 = dFdx( eye_pos.xyz );\nvec3 q1 = dFdy( eye_pos.xyz );\nvec2 st0 = dFdx( vUv.st );\nvec2 st1 = dFdy( vUv.st );\nvec3 S = normalize(  q0 * st1.t - q1 * st0.t );\nvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\nvec3 N = normalize( surf_norm );\nvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\nmapN.xy = normalScale * mapN.xy;\nmat3 tsn = mat3( S, T, N );\nreturn normalize( tsn * mapN );\n}\n#endif",
  specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\nuniform sampler2D specularMap;\n#endif",
  specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\nvec4 texelSpecular = texture2D( specularMap, vUv );\nspecularStrength = texelSpecular.r;\n#else\nspecularStrength = 1.0;\n#endif",
  lights_lambert_pars_vertex: "uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif",
  lights_lambert_vertex: "vLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\nvLightBack = vec3( 0.0 );\n#endif\ntransformedNormal = normalize( transformedNormal );\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, dirVector );\nvec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\ndirectionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\ndirectionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n#ifdef DOUBLE_SIDED\nvLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n#endif\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\npointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\npointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef DOUBLE_SIDED\nvLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\nspotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\nspotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\n#ifdef DOUBLE_SIDED\nvLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nfloat hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\nvLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n#ifdef DOUBLE_SIDED\nvLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n#endif\n}\n#endif\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n#ifdef DOUBLE_SIDED\nvLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n#endif",
  lights_phong_pars_vertex: "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvarying vec3 vWorldPosition;\n#endif",
  lights_phong_vertex: "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nvSpotLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvWorldPosition = worldPosition.xyz;\n#endif",
  lights_phong_pars_fragment: "uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#else\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#else\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvarying vec3 vWorldPosition;\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
  lights_phong_fragment: "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#ifdef DOUBLE_SIDED\nnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n#endif\n#ifdef USE_NORMALMAP\nnormal = perturbNormal2Arb( -vViewPosition, normal );\n#elif defined( USE_BUMPMAP )\nnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse  = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vPointLight[ i ].xyz );\nfloat lDistance = vPointLight[ i ].w;\n#endif\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n#endif\npointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\nvec3 pointHalfVector = normalize( lVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n#else\npointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse  = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vSpotLight[ i ].xyz );\nfloat lDistance = vSpotLight[ i ].w;\n#endif\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dotProduct, 0.0 );\n#endif\nspotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\nvec3 spotHalfVector = normalize( lVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse  = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, dirVector );\n#ifdef WRAP_AROUND\nfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n#endif\ndirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nvec3 hemiDiffuse  = vec3( 0.0 );\nvec3 hemiSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\nhemiDiffuse += diffuse * hemiColor;\nvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\nfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\nfloat hemiSpecularWeightSky = specularStrength * max( pow( hemiDotNormalHalfSky, shininess ), 0.0 );\nvec3 lVectorGround = -lVector;\nvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\nfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\nfloat hemiSpecularWeightGround = specularStrength * max( pow( hemiDotNormalHalfGround, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat dotProductGround = dot( normal, lVectorGround );\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\nvec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\nhemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n#else\nhemiSpecular += specular * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\ntotalDiffuse += hemiDiffuse;\ntotalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n#endif",
  color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
  color_fragment: "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
  color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
  color_vertex: "#ifdef USE_COLOR\n#ifdef GAMMA_INPUT\nvColor = color * color;\n#else\nvColor = color;\n#endif\n#endif",
  skinning_pars_vertex: "#ifdef USE_SKINNING\n#ifdef BONE_TEXTURE\nuniform sampler2D boneTexture;\nmat4 getBoneMatrix( const in float i ) {\nfloat j = i * 4.0;\nfloat x = mod( j, N_BONE_PIXEL_X );\nfloat y = floor( j / N_BONE_PIXEL_X );\nconst float dx = 1.0 / N_BONE_PIXEL_X;\nconst float dy = 1.0 / N_BONE_PIXEL_Y;\ny = dy * ( y + 0.5 );\nvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\nvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\nvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\nvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\nmat4 bone = mat4( v1, v2, v3, v4 );\nreturn bone;\n}\n#else\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\nmat4 getBoneMatrix( const in float i ) {\nmat4 bone = boneGlobalMatrices[ int(i) ];\nreturn bone;\n}\n#endif\n#endif",
  skinbase_vertex: "#ifdef USE_SKINNING\nmat4 boneMatX = getBoneMatrix( skinIndex.x );\nmat4 boneMatY = getBoneMatrix( skinIndex.y );\n#endif",
  skinning_vertex: "#ifdef USE_SKINNING\n#ifdef USE_MORPHTARGETS\nvec4 skinVertex = vec4( morphed, 1.0 );\n#else\nvec4 skinVertex = vec4( position, 1.0 );\n#endif\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\n#endif",
  morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n#ifndef USE_MORPHNORMALS\nuniform float morphTargetInfluences[ 8 ];\n#else\nuniform float morphTargetInfluences[ 4 ];\n#endif\n#endif",
  morphtarget_vertex: "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n#ifndef USE_MORPHNORMALS\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n#endif\nmorphed += position;\n#endif",
  default_vertex: "vec4 mvPosition;\n#ifdef USE_SKINNING\nmvPosition = modelViewMatrix * skinned;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )\nmvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )\nmvPosition = modelViewMatrix * vec4( position, 1.0 );\n#endif\ngl_Position = projectionMatrix * mvPosition;",
  morphnormal_vertex: "#ifdef USE_MORPHNORMALS\nvec3 morphedNormal = vec3( 0.0 );\nmorphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\nmorphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\nmorphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\nmorphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\nmorphedNormal += normal;\n#endif",
  skinnormal_vertex: "#ifdef USE_SKINNING\nmat4 skinMatrix = skinWeight.x * boneMatX;\nskinMatrix \t+= skinWeight.y * boneMatY;\n#ifdef USE_MORPHNORMALS\nvec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n#else\nvec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n#endif\n#endif",
  defaultnormal_vertex: "vec3 objectNormal;\n#ifdef USE_SKINNING\nobjectNormal = skinnedNormal.xyz;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )\nobjectNormal = morphedNormal;\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )\nobjectNormal = normal;\n#endif\n#ifdef FLIP_SIDED\nobjectNormal = -objectNormal;\n#endif\nvec3 transformedNormal = normalMatrix * objectNormal;",
  shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\nuniform sampler2D shadowMap[ MAX_SHADOWS ];\nuniform vec2 shadowMapSize[ MAX_SHADOWS ];\nuniform float shadowDarkness[ MAX_SHADOWS ];\nuniform float shadowBias[ MAX_SHADOWS ];\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\n#endif",
  shadowmap_fragment: "#ifdef USE_SHADOWMAP\n#ifdef SHADOWMAP_DEBUG\nvec3 frustumColors[3];\nfrustumColors[0] = vec3( 1.0, 0.5, 0.0 );\nfrustumColors[1] = vec3( 0.0, 1.0, 0.8 );\nfrustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n#endif\n#ifdef SHADOWMAP_CASCADE\nint inFrustumCount = 0;\n#endif\nfloat fDepth;\nvec3 shadowColor = vec3( 1.0 );\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\nbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\nbool inFrustum = all( inFrustumVec );\n#ifdef SHADOWMAP_CASCADE\ninFrustumCount += int( inFrustum );\nbvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n#else\nbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n#endif\nbool frustumTest = all( frustumTestVec );\nif ( frustumTest ) {\nshadowCoord.z += shadowBias[ i ];\n#if defined( SHADOWMAP_TYPE_PCF )\nfloat shadow = 0.0;\nconst float shadowDelta = 1.0 / 9.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.25 * xPixelOffset;\nfloat dy0 = -1.25 * yPixelOffset;\nfloat dx1 = 1.25 * xPixelOffset;\nfloat dy1 = 1.25 * yPixelOffset;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\nfloat shadow = 0.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.0 * xPixelOffset;\nfloat dy0 = -1.0 * yPixelOffset;\nfloat dx1 = 1.0 * xPixelOffset;\nfloat dy1 = 1.0 * yPixelOffset;\nmat3 shadowKernel;\nmat3 depthKernel;\ndepthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\ndepthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\ndepthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\ndepthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\ndepthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\ndepthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\ndepthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\ndepthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\ndepthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nvec3 shadowZ = vec3( shadowCoord.z );\nshadowKernel[0] = vec3(lessThan(depthKernel[0], shadowZ ));\nshadowKernel[0] *= vec3(0.25);\nshadowKernel[1] = vec3(lessThan(depthKernel[1], shadowZ ));\nshadowKernel[1] *= vec3(0.25);\nshadowKernel[2] = vec3(lessThan(depthKernel[2], shadowZ ));\nshadowKernel[2] *= vec3(0.25);\nvec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\nshadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\nshadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\nvec4 shadowValues;\nshadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\nshadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\nshadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\nshadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\nshadow = dot( shadowValues, vec4( 1.0 ) );\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#else\nvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n#endif\n}\n#ifdef SHADOWMAP_DEBUG\n#ifdef SHADOWMAP_CASCADE\nif ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n#else\nif ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n#endif\n#endif\n}\n#ifdef GAMMA_OUTPUT\nshadowColor *= shadowColor;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n#endif",
  shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",
  shadowmap_vertex: "#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n}\n#endif",
  alphatest_fragment: "#ifdef ALPHATEST\nif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",
  linear_to_gamma_fragment: "#ifdef GAMMA_OUTPUT\ngl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n#endif"
};
THREE.UniformsUtils = {
  merge: function (a) {
    var b, c, d, e = {};
    for (b = 0; b < a.length; b++)
      for (c in d = this.clone(a[b]), d) e[c] = d[c];
    return e
  },
  clone: function (a) {
    var b, c, d, e = {};
    for (b in a)
      for (c in e[b] = {}, a[b]) d = a[b][c], e[b][c] = d instanceof THREE.Color || d instanceof THREE.Vector2 || d instanceof THREE.Vector3 || d instanceof THREE.Vector4 || d instanceof THREE.Matrix4 || d instanceof THREE.Texture ? d.clone() : d instanceof Array ? d.slice() : d;
    return e
  }
};
THREE.UniformsLib = {
  common: {
    diffuse: {
      type: "c",
      value: new THREE.Color(15658734)
    },
    opacity: {
      type: "f",
      value: 1
    },
    map: {
      type: "t",
      value: null
    },
    offsetRepeat: {
      type: "v4",
      value: new THREE.Vector4(0, 0, 1, 1)
    },
    lightMap: {
      type: "t",
      value: null
    },
    specularMap: {
      type: "t",
      value: null
    },
    envMap: {
      type: "t",
      value: null
    },
    flipEnvMap: {
      type: "f",
      value: -1
    },
    useRefract: {
      type: "i",
      value: 0
    },
    reflectivity: {
      type: "f",
      value: 1
    },
    refractionRatio: {
      type: "f",
      value: 0.98
    },
    combine: {
      type: "i",
      value: 0
    },
    morphTargetInfluences: {
      type: "f",
      value: 0
    }
  },
  bump: {
    bumpMap: {
      type: "t",
      value: null
    },
    bumpScale: {
      type: "f",
      value: 1
    }
  },
  normalmap: {
    normalMap: {
      type: "t",
      value: null
    },
    normalScale: {
      type: "v2",
      value: new THREE.Vector2(1, 1)
    }
  },
  fog: {
    fogDensity: {
      type: "f",
      value: 2.5E-4
    },
    fogNear: {
      type: "f",
      value: 1
    },
    fogFar: {
      type: "f",
      value: 2E3
    },
    fogColor: {
      type: "c",
      value: new THREE.Color(16777215)
    }
  },
  lights: {
    ambientLightColor: {
      type: "fv",
      value: []
    },
    directionalLightDirection: {
      type: "fv",
      value: []
    },
    directionalLightColor: {
      type: "fv",
      value: []
    },
    hemisphereLightDirection: {
      type: "fv",
      value: []
    },
    hemisphereLightSkyColor: {
      type: "fv",
      value: []
    },
    hemisphereLightGroundColor: {
      type: "fv",
      value: []
    },
    pointLightColor: {
      type: "fv",
      value: []
    },
    pointLightPosition: {
      type: "fv",
      value: []
    },
    pointLightDistance: {
      type: "fv1",
      value: []
    },
    spotLightColor: {
      type: "fv",
      value: []
    },
    spotLightPosition: {
      type: "fv",
      value: []
    },
    spotLightDirection: {
      type: "fv",
      value: []
    },
    spotLightDistance: {
      type: "fv1",
      value: []
    },
    spotLightAngleCos: {
      type: "fv1",
      value: []
    },
    spotLightExponent: {
      type: "fv1",
      value: []
    }
  },
  particle: {
    psColor: {
      type: "c",
      value: new THREE.Color(15658734)
    },
    opacity: {
      type: "f",
      value: 1
    },
    size: {
      type: "f",
      value: 1
    },
    scale: {
      type: "f",
      value: 1
    },
    map: {
      type: "t",
      value: null
    },
    fogDensity: {
      type: "f",
      value: 2.5E-4
    },
    fogNear: {
      type: "f",
      value: 1
    },
    fogFar: {
      type: "f",
      value: 2E3
    },
    fogColor: {
      type: "c",
      value: new THREE.Color(16777215)
    }
  },
  shadowmap: {
    shadowMap: {
      type: "tv",
      value: []
    },
    shadowMapSize: {
      type: "v2v",
      value: []
    },
    shadowBias: {
      type: "fv1",
      value: []
    },
    shadowDarkness: {
      type: "fv1",
      value: []
    },
    shadowMatrix: {
      type: "m4v",
      value: []
    }
  }
};
THREE.ShaderLib = {
  basic: {
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.shadowmap]),
    vertexShader: [THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex,
      THREE.ShaderChunk.skinbase_vertex, "#ifdef USE_ENVMAP", THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "#endif", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"
    ].join("\n"),
    fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment,
      THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, "void main() {\ngl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment,
      THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"
    ].join("\n")
  },
  lambert: {
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
      ambient: {
        type: "c",
        value: new THREE.Color(16777215)
      },
      emissive: {
        type: "c",
        value: new THREE.Color(0)
      },
      wrapRGB: {
        type: "v3",
        value: new THREE.Vector3(1, 1, 1)
      }
    }]),
    vertexShader: ["#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif",
      THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_lambert_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex,
      THREE.ShaderChunk.defaultnormal_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_lambert_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"
    ].join("\n"),
    fragmentShader: ["uniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment,
      THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, "#ifdef DOUBLE_SIDED\nif ( gl_FrontFacing )\ngl_FragColor.xyz *= vLightFront;\nelse\ngl_FragColor.xyz *= vLightBack;\n#else\ngl_FragColor.xyz *= vLightFront;\n#endif", THREE.ShaderChunk.lightmap_fragment,
      THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"
    ].join("\n")
  },
  phong: {
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.bump, THREE.UniformsLib.normalmap, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
      ambient: {
        type: "c",
        value: new THREE.Color(16777215)
      },
      emissive: {
        type: "c",
        value: new THREE.Color(0)
      },
      specular: {
        type: "c",
        value: new THREE.Color(1118481)
      },
      shininess: {
        type: "f",
        value: 30
      },
      wrapRGB: {
        type: "v3",
        value: new THREE.Vector3(1, 1, 1)
      }
    }]),
    vertexShader: ["#define PHONG\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_phong_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex,
      "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "vNormal = normalize( transformedNormal );", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, "vViewPosition = -mvPosition.xyz;", THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex,
      THREE.ShaderChunk.lights_phong_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"
    ].join("\n"),
    fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_phong_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment,
      THREE.ShaderChunk.bumpmap_pars_fragment, THREE.ShaderChunk.normalmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.lights_phong_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment,
      THREE.ShaderChunk.fog_fragment, "}"
    ].join("\n")
  },
  particle_basic: {
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.particle, THREE.UniformsLib.shadowmap]),
    vertexShader: ["uniform float size;\nuniform float scale;", THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;",
      THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"
    ].join("\n"),
    fragmentShader: ["uniform vec3 psColor;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_particle_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( psColor, opacity );", THREE.ShaderChunk.map_particle_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.shadowmap_fragment,
      THREE.ShaderChunk.fog_fragment, "}"
    ].join("\n")
  },
  dashed: {
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, {
      scale: {
        type: "f",
        value: 1
      },
      dashSize: {
        type: "f",
        value: 1
      },
      totalSize: {
        type: "f",
        value: 2
      }
    }]),
    vertexShader: ["uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;", THREE.ShaderChunk.color_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "vLineDistance = scale * lineDistance;\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\n}"].join("\n"),
    fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\nif ( mod( vLineDistance, totalSize ) > dashSize ) {\ndiscard;\n}\ngl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
  },
  depth: {
    uniforms: {
      mNear: {
        type: "f",
        value: 1
      },
      mFar: {
        type: "f",
        value: 2E3
      },
      opacity: {
        type: "f",
        value: 1
      }
    },
    vertexShader: "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
    fragmentShader: "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}"
  },
  normal: {
    uniforms: {
      opacity: {
        type: "f",
        value: 1
      }
    },
    vertexShader: ["varying vec3 vNormal;", THREE.ShaderChunk.morphtarget_pars_vertex, "void main() {\nvNormal = normalize( normalMatrix * normal );",
      THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, "}"
    ].join("\n"),
    fragmentShader: "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}"
  },
  normalmap: {
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
      enableAO: {
        type: "i",
        value: 0
      },
      enableDiffuse: {
        type: "i",
        value: 0
      },
      enableSpecular: {
        type: "i",
        value: 0
      },
      enableReflection: {
        type: "i",
        value: 0
      },
      enableDisplacement: {
        type: "i",
        value: 0
      },
      tDisplacement: {
        type: "t",
        value: null
      },
      tDiffuse: {
        type: "t",
        value: null
      },
      tCube: {
        type: "t",
        value: null
      },
      tNormal: {
        type: "t",
        value: null
      },
      tSpecular: {
        type: "t",
        value: null
      },
      tAO: {
        type: "t",
        value: null
      },
      uNormalScale: {
        type: "v2",
        value: new THREE.Vector2(1, 1)
      },
      uDisplacementBias: {
        type: "f",
        value: 0
      },
      uDisplacementScale: {
        type: "f",
        value: 1
      },
      uDiffuseColor: {
        type: "c",
        value: new THREE.Color(16777215)
      },
      uSpecularColor: {
        type: "c",
        value: new THREE.Color(1118481)
      },
      uAmbientColor: {
        type: "c",
        value: new THREE.Color(16777215)
      },
      uShininess: {
        type: "f",
        value: 30
      },
      uOpacity: {
        type: "f",
        value: 1
      },
      useRefract: {
        type: "i",
        value: 0
      },
      uRefractionRatio: {
        type: "f",
        value: 0.98
      },
      uReflectivity: {
        type: "f",
        value: 0.5
      },
      uOffset: {
        type: "v2",
        value: new THREE.Vector2(0, 0)
      },
      uRepeat: {
        type: "v2",
        value: new THREE.Vector2(1, 1)
      },
      wrapRGB: {
        type: "v3",
        value: new THREE.Vector3(1, 1, 1)
      }
    }]),
    fragmentShader: ["uniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform float uOpacity;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform bool enableReflection;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform samplerCube tCube;\nuniform vec2 uNormalScale;\nuniform bool useRefract;\nuniform float uRefractionRatio;\nuniform float uReflectivity;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;",
      THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3( 1.0 ), uOpacity );\nvec3 specularTex = vec3( 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse ) {\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( tDiffuse, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\n#endif\n}\nif( enableAO ) {\n#ifdef GAMMA_INPUT\nvec4 aoColor = texture2D( tAO, vUv );\naoColor.xyz *= aoColor.xyz;\ngl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;\n#endif\n}\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );\nvec3 finalNormal = tsb * normalTex;\n#ifdef FLIP_SIDED\nfinalNormal = -finalNormal;\n#endif\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 pointVector = lPosition.xyz + vViewPosition.xyz;\nfloat pointDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\npointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );\npointVector = normalize( pointVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\n#endif\npointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;\nvec3 pointHalfVector = normalize( pointVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;\n#else\npointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 spotVector = lPosition.xyz + vViewPosition.xyz;\nfloat spotDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nspotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );\nspotVector = normalize( spotVector );\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );\n#endif\nspotDiffuse += spotDistance * spotLightColor[ i ] * uDiffuseColor * spotDiffuseWeight * spotEffect;\nvec3 spotHalfVector = normalize( spotVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( spotVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += spotDistance * spotLightColor[ i ] * uSpecularColor * spotSpecularWeight * spotDiffuseWeight * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\n#ifdef WRAP_AROUND\nfloat directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );\nfloat directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\n#endif\ndirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nvec3 hemiDiffuse  = vec3( 0.0 );\nvec3 hemiSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\nhemiDiffuse += uDiffuseColor * hemiColor;\nvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\nfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\nfloat hemiSpecularWeightSky = specularTex.r * max( pow( hemiDotNormalHalfSky, uShininess ), 0.0 );\nvec3 lVectorGround = -lVector;\nvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\nfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\nfloat hemiSpecularWeightGround = specularTex.r * max( pow( hemiDotNormalHalfGround, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat dotProductGround = dot( normal, lVectorGround );\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlickSky = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\nvec3 schlickGround = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\nhemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n#else\nhemiSpecular += uSpecularColor * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\ntotalDiffuse += hemiDiffuse;\ntotalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor ) + totalSpecular;\n#endif\nif ( enableReflection ) {\nvec3 vReflect;\nvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\nif ( useRefract ) {\nvReflect = refract( cameraToVertex, normal, uRefractionRatio );\n} else {\nvReflect = reflect( cameraToVertex, normal );\n}\nvec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * uReflectivity );\n}",
      THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"
    ].join("\n"),
    vertexShader: ["attribute vec4 tangent;\nuniform vec2 uOffset;\nuniform vec2 uRepeat;\nuniform bool enableDisplacement;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;",
      THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, "#ifdef USE_SKINNING\nvNormal = normalize( normalMatrix * skinnedNormal.xyz );\nvec4 skinnedTangent = skinMatrix * vec4( tangent.xyz, 0.0 );\nvTangent = normalize( normalMatrix * skinnedTangent.xyz );\n#else\nvNormal = normalize( normalMatrix * normal );\nvTangent = normalize( normalMatrix * tangent.xyz );\n#endif\nvBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );\nvUv = uv * uRepeat + uOffset;\nvec3 displacedPosition;\n#ifdef VERTEX_TEXTURES\nif ( enableDisplacement ) {\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\ndisplacedPosition = position + normalize( normal ) * df;\n} else {\n#ifdef USE_SKINNING\nvec4 skinVertex = vec4( position, 1.0 );\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\ndisplacedPosition  = skinned.xyz;\n#else\ndisplacedPosition = position;\n#endif\n}\n#else\n#ifdef USE_SKINNING\nvec4 skinVertex = vec4( position, 1.0 );\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\ndisplacedPosition  = skinned.xyz;\n#else\ndisplacedPosition = position;\n#endif\n#endif\nvec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );\nvec4 worldPosition = modelMatrix * vec4( displacedPosition, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\nvWorldPosition = worldPosition.xyz;\nvViewPosition = -mvPosition.xyz;\n#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n}\n#endif\n}"
    ].join("\n")
  },
  cube: {
    uniforms: {
      tCube: {
        type: "t",
        value: null
      },
      tFlip: {
        type: "f",
        value: -1
      }
    },
    vertexShader: "varying vec3 vWorldPosition;\nvoid main() {\nvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\nvWorldPosition = worldPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
    fragmentShader: "uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vWorldPosition;\nvoid main() {\ngl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n}"
  },
  depthRGBA: {
    uniforms: {},
    vertexShader: [THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, "void main() {", THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, "}"].join("\n"),
    fragmentShader: "vec4 pack_depth( const in float depth ) {\nconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\nconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\nvec4 res = fract( depth * bit_shift );\nres -= res.xxyz * bit_mask;\nreturn res;\n}\nvoid main() {\ngl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n}"
  }
};
THREE.WebGLRenderer = function (a) {
  function b(a) {
    if (a.__webglCustomAttributesList)
      for (var b in a.__webglCustomAttributesList) k.deleteBuffer(a.__webglCustomAttributesList[b].buffer)
  }

  function c(a, b) {
    var c = a.vertices.length,
      d = b.material;
    if (d.attributes) {
      void 0 === a.__webglCustomAttributesList && (a.__webglCustomAttributesList = []);
      for (var e in d.attributes) {
        var f = d.attributes[e];
        if (!f.__webglInitialized || f.createUniqueBuffers) {
          f.__webglInitialized = !0;
          var h = 1;
          "v2" === f.type ? h = 2 : "v3" === f.type ? h = 3 : "v4" === f.type ?
            h = 4 : "c" === f.type && (h = 3);
          f.size = h;
          f.array = new Float32Array(c * h);
          f.buffer = k.createBuffer();
          f.buffer.belongsToAttribute = e;
          f.needsUpdate = !0
        }
        a.__webglCustomAttributesList.push(f)
      }
    }
  }

  function d(a, b) {
    var c = b.geometry,
      d = a.faces3,
      g = a.faces4,
      i = 3 * d.length + 4 * g.length,
      j = 1 * d.length + 2 * g.length,
      g = 3 * d.length + 4 * g.length,
      d = e(b, a),
      m = h(d),
      l = f(d),
      n = d.vertexColors ? d.vertexColors : !1;
    a.__vertexArray = new Float32Array(3 * i);
    l && (a.__normalArray = new Float32Array(3 * i));
    c.hasTangents && (a.__tangentArray = new Float32Array(4 * i));
    n &&
      (a.__colorArray = new Float32Array(3 * i));
    if (m) {
      if (0 < c.faceUvs.length || 0 < c.faceVertexUvs.length) a.__uvArray = new Float32Array(2 * i);
      if (1 < c.faceUvs.length || 1 < c.faceVertexUvs.length) a.__uv2Array = new Float32Array(2 * i)
    }
    b.geometry.skinWeights.length && b.geometry.skinIndices.length && (a.__skinIndexArray = new Float32Array(4 * i), a.__skinWeightArray = new Float32Array(4 * i));
    a.__faceArray = new Uint16Array(3 * j);
    a.__lineArray = new Uint16Array(2 * g);
    if (a.numMorphTargets) {
      a.__morphTargetsArrays = [];
      c = 0;
      for (m = a.numMorphTargets; c <
        m; c++) a.__morphTargetsArrays.push(new Float32Array(3 * i))
    }
    if (a.numMorphNormals) {
      a.__morphNormalsArrays = [];
      c = 0;
      for (m = a.numMorphNormals; c < m; c++) a.__morphNormalsArrays.push(new Float32Array(3 * i))
    }
    a.__webglFaceCount = 3 * j;
    a.__webglLineCount = 2 * g;
    if (d.attributes) {
      void 0 === a.__webglCustomAttributesList && (a.__webglCustomAttributesList = []);
      for (var p in d.attributes) {
        var j = d.attributes[p],
          c = {},
          q;
        for (q in j) c[q] = j[q];
        if (!c.__webglInitialized || c.createUniqueBuffers) c.__webglInitialized = !0, g = 1, "v2" === c.type ? g = 2 :
          "v3" === c.type ? g = 3 : "v4" === c.type ? g = 4 : "c" === c.type && (g = 3), c.size = g, c.array = new Float32Array(i * g), c.buffer = k.createBuffer(), c.buffer.belongsToAttribute = p, j.needsUpdate = !0, c.__original = j;
        a.__webglCustomAttributesList.push(c)
      }
    }
    a.__inittedArrays = !0
  }

  function e(a, b) {
    return a.material instanceof THREE.MeshFaceMaterial ? a.material.materials[b.materialIndex] : a.material
  }

  function f(a) {
    return a instanceof THREE.MeshBasicMaterial && !a.envMap || a instanceof THREE.MeshDepthMaterial ? !1 : a && void 0 !== a.shading && a.shading ===
      THREE.SmoothShading ? THREE.SmoothShading : THREE.FlatShading
  }

  function h(a) {
    return a.map || a.lightMap || a.bumpMap || a.normalMap || a.specularMap || a instanceof THREE.ShaderMaterial ? !0 : !1
  }

  function g(a) {
    Ab[a] || (k.enableVertexAttribArray(a), Ab[a] = !0)
  }

  function i() {
    for (var a in Ab) Ab[a] && (k.disableVertexAttribArray(a), Ab[a] = !1)
  }

  function j(a, b) {
    return a.z !== b.z ? b.z - a.z : a.id - b.id
  }

  function l(a, b) {
    return b[0] - a[0]
  }

  function m(a, b, c) {
    if (a.length)
      for (var d = 0, e = a.length; d < e; d++) ya = qa = null, pb = ub = T = da = ab = xa = aa = -1, yb = !0, a[d].render(b,
        c, Xb, Jb), ya = qa = null, pb = ub = T = da = ab = xa = aa = -1, yb = !0
  }

  function n(a, b, c, d, e, f, h, g) {
    var k, i, j, m;
    b ? (i = a.length - 1, m = b = -1) : (i = 0, b = a.length, m = 1);
    for (var l = i; l !== b; l += m)
      if (k = a[l], k.render) {
        i = k.object;
        j = k.buffer;
        if (g) k = g;
        else {
          k = k[c];
          if (!k) continue;
          h && D.setBlending(k.blending, k.blendEquation, k.blendSrc, k.blendDst);
          D.setDepthTest(k.depthTest);
          D.setDepthWrite(k.depthWrite);
          K(k.polygonOffset, k.polygonOffsetFactor, k.polygonOffsetUnits)
        }
        D.setMaterialFaces(k);
        j instanceof THREE.BufferGeometry ? D.renderBufferDirect(d,
          e, f, k, j, i) : D.renderBuffer(d, e, f, k, j, i)
      }
  }

  function p(a, b, c, d, e, f, h) {
    for (var g, k, i = 0, j = a.length; i < j; i++)
      if (g = a[i], k = g.object, k.visible) {
        if (h) g = h;
        else {
          g = g[b];
          if (!g) continue;
          f && D.setBlending(g.blending, g.blendEquation, g.blendSrc, g.blendDst);
          D.setDepthTest(g.depthTest);
          D.setDepthWrite(g.depthWrite);
          K(g.polygonOffset, g.polygonOffsetFactor, g.polygonOffsetUnits)
        }
        D.renderImmediateObject(c, d, e, g, k)
      }
  }

  function t(a, b) {
    var e, f, h, g;
    if (void 0 === a.__webglInit && (a.__webglInit = !0, a._modelViewMatrix = new THREE.Matrix4,
        a._normalMatrix = new THREE.Matrix3, void 0 !== a.geometry && void 0 === a.geometry.__webglInit && (a.geometry.__webglInit = !0, a.geometry.addEventListener("dispose", lc)), f = a.geometry, void 0 !== f))
      if (f instanceof THREE.BufferGeometry) {
        var i, j;
        for (i in f.attributes) j = "index" === i ? k.ELEMENT_ARRAY_BUFFER : k.ARRAY_BUFFER, g = f.attributes[i], void 0 === g.numItems && (g.numItems = g.array.length), g.buffer = k.createBuffer(), k.bindBuffer(j, g.buffer), k.bufferData(j, g.array, k.STATIC_DRAW)
      } else if (a instanceof THREE.Mesh) {
      h = a.material;
      if (void 0 === f.geometryGroups) {
        i = f;
        var m, l, n, p, r;
        j = {};
        var s = i.morphTargets.length,
          t = i.morphNormals.length,
          v = h instanceof THREE.MeshFaceMaterial;
        i.geometryGroups = {};
        h = 0;
        for (m = i.faces.length; h < m; h++) l = i.faces[h], n = v ? l.materialIndex : 0, void 0 === j[n] && (j[n] = {
            hash: n,
            counter: 0
          }), r = j[n].hash + "_" + j[n].counter, void 0 === i.geometryGroups[r] && (i.geometryGroups[r] = {
            faces3: [],
            faces4: [],
            materialIndex: n,
            vertices: 0,
            numMorphTargets: s,
            numMorphNormals: t
          }), p = l instanceof THREE.Face3 ? 3 : 4, 65535 < i.geometryGroups[r].vertices +
          p && (j[n].counter += 1, r = j[n].hash + "_" + j[n].counter, void 0 === i.geometryGroups[r] && (i.geometryGroups[r] = {
            faces3: [],
            faces4: [],
            materialIndex: n,
            vertices: 0,
            numMorphTargets: s,
            numMorphNormals: t
          })), l instanceof THREE.Face3 ? i.geometryGroups[r].faces3.push(h) : i.geometryGroups[r].faces4.push(h), i.geometryGroups[r].vertices += p;
        i.geometryGroupsList = [];
        for (g in i.geometryGroups) i.geometryGroups[g].id = Ha++, i.geometryGroupsList.push(i.geometryGroups[g])
      }
      for (e in f.geometryGroups)
        if (g = f.geometryGroups[e], !g.__webglVertexBuffer) {
          i =
            g;
          i.__webglVertexBuffer = k.createBuffer();
          i.__webglNormalBuffer = k.createBuffer();
          i.__webglTangentBuffer = k.createBuffer();
          i.__webglColorBuffer = k.createBuffer();
          i.__webglUVBuffer = k.createBuffer();
          i.__webglUV2Buffer = k.createBuffer();
          i.__webglSkinIndicesBuffer = k.createBuffer();
          i.__webglSkinWeightsBuffer = k.createBuffer();
          i.__webglFaceBuffer = k.createBuffer();
          i.__webglLineBuffer = k.createBuffer();
          s = j = void 0;
          if (i.numMorphTargets) {
            i.__webglMorphTargetsBuffers = [];
            j = 0;
            for (s = i.numMorphTargets; j < s; j++) i.__webglMorphTargetsBuffers.push(k.createBuffer())
          }
          if (i.numMorphNormals) {
            i.__webglMorphNormalsBuffers = [];
            j = 0;
            for (s = i.numMorphNormals; j < s; j++) i.__webglMorphNormalsBuffers.push(k.createBuffer())
          }
          D.info.memory.geometries++;
          d(g, a);
          f.verticesNeedUpdate = !0;
          f.morphTargetsNeedUpdate = !0;
          f.elementsNeedUpdate = !0;
          f.uvsNeedUpdate = !0;
          f.normalsNeedUpdate = !0;
          f.tangentsNeedUpdate = !0;
          f.colorsNeedUpdate = !0
        }
    } else a instanceof THREE.Ribbon ? f.__webglVertexBuffer || (g = f, g.__webglVertexBuffer = k.createBuffer(), g.__webglColorBuffer = k.createBuffer(), g.__webglNormalBuffer = k.createBuffer(), D.info.memory.geometries++, g = f, i = g.vertices.length,
      g.__vertexArray = new Float32Array(3 * i), g.__colorArray = new Float32Array(3 * i), g.__normalArray = new Float32Array(3 * i), g.__webglVertexCount = i, c(g, a), f.verticesNeedUpdate = !0, f.colorsNeedUpdate = !0, f.normalsNeedUpdate = !0) : a instanceof THREE.Line ? f.__webglVertexBuffer || (g = f, g.__webglVertexBuffer = k.createBuffer(), g.__webglColorBuffer = k.createBuffer(), g.__webglLineDistanceBuffer = k.createBuffer(), D.info.memory.geometries++, g = f, i = g.vertices.length, g.__vertexArray = new Float32Array(3 * i), g.__colorArray = new Float32Array(3 *
      i), g.__lineDistanceArray = new Float32Array(1 * i), g.__webglLineCount = i, c(g, a), f.verticesNeedUpdate = !0, f.colorsNeedUpdate = !0, f.lineDistancesNeedUpdate = !0) : a instanceof THREE.ParticleSystem && !f.__webglVertexBuffer && (g = f, g.__webglVertexBuffer = k.createBuffer(), g.__webglColorBuffer = k.createBuffer(), D.info.memory.geometries++, g = f, i = g.vertices.length, g.__vertexArray = new Float32Array(3 * i), g.__colorArray = new Float32Array(3 * i), g.__sortArray = [], g.__webglParticleCount = i, c(g, a), f.verticesNeedUpdate = !0, f.colorsNeedUpdate = !0);
    if (void 0 === a.__webglActive) {
      if (a instanceof THREE.Mesh)
        if (f = a.geometry, f instanceof THREE.BufferGeometry) q(b.__webglObjects, f, a);
        else {
          if (f instanceof THREE.Geometry)
            for (e in f.geometryGroups) g = f.geometryGroups[e], q(b.__webglObjects, g, a)
        }
      else a instanceof THREE.Ribbon || a instanceof THREE.Line || a instanceof THREE.ParticleSystem ? (f = a.geometry, q(b.__webglObjects, f, a)) : a instanceof THREE.ImmediateRenderObject || a.immediateRenderCallback ? b.__webglObjectsImmediate.push({
        id: null,
        object: a,
        opaque: null,
        transparent: null,
        z: 0
      }) : a instanceof THREE.Sprite ? b.__webglSprites.push(a) : a instanceof THREE.LensFlare && b.__webglFlares.push(a);
      a.__webglActive = !0
    }
  }

  function q(a, b, c) {
    a.push({
      id: null,
      buffer: b,
      object: c,
      opaque: null,
      transparent: null,
      z: 0
    })
  }

  function r(a) {
    for (var b in a.attributes)
      if (a.attributes[b].needsUpdate) return !0;
    return !1
  }

  function s(a) {
    for (var b in a.attributes) a.attributes[b].needsUpdate = !1
  }

  function v(a, b) {
    a instanceof THREE.Mesh || a instanceof THREE.ParticleSystem || a instanceof THREE.Ribbon || a instanceof
    THREE.Line ? z(b.__webglObjects, a) : a instanceof THREE.Sprite ? C(b.__webglSprites, a) : a instanceof THREE.LensFlare ? C(b.__webglFlares, a) : (a instanceof THREE.ImmediateRenderObject || a.immediateRenderCallback) && z(b.__webglObjectsImmediate, a);
    delete a.__webglActive
  }

  function z(a, b) {
    for (var c = a.length - 1; 0 <= c; c--) a[c].object === b && a.splice(c, 1)
  }

  function C(a, b) {
    for (var c = a.length - 1; 0 <= c; c--) a[c] === b && a.splice(c, 1)
  }

  function F(a, b, c, d, e) {
    fa = 0;
    d.needsUpdate && (d.program && vc(d), D.initMaterial(d, b, c, e), d.needsUpdate = !1);
    d.morphTargets && !e.__webglMorphTargetInfluences && (e.__webglMorphTargetInfluences = new Float32Array(D.maxMorphTargets));
    var f = !1,
      g = d.program,
      h = g.uniforms,
      i = d.uniforms;
    g !== qa && (k.useProgram(g), qa = g, f = !0);
    d.id !== pb && (pb = d.id, f = !0);
    if (f || a !== ya) k.uniformMatrix4fv(h.projectionMatrix, !1, a.projectionMatrix.elements), a !== ya && (ya = a);
    if (d.skinning)
      if (Bb && e.useVertexTexture) {
        if (null !== h.boneTexture) {
          var j = H();
          k.uniform1i(h.boneTexture, j);
          D.setTexture(e.boneTexture, j)
        }
      } else null !== h.boneGlobalMatrices && k.uniformMatrix4fv(h.boneGlobalMatrices,
        !1, e.boneMatrices);
    if (f) {
      c && d.fog && (i.fogColor.value = c.color, c instanceof THREE.Fog ? (i.fogNear.value = c.near, i.fogFar.value = c.far) : c instanceof THREE.FogExp2 && (i.fogDensity.value = c.density));
      if (d instanceof THREE.MeshPhongMaterial || d instanceof THREE.MeshLambertMaterial || d.lights) {
        if (yb) {
          for (var m, l = j = 0, n = 0, p, q, r, s = Ib, t = s.directional.colors, v = s.directional.positions, z = s.point.colors, y = s.point.positions, A = s.point.distances, B = s.spot.colors, F = s.spot.positions, C = s.spot.distances, E = s.spot.directions, J =
              s.spot.anglesCos, L = s.spot.exponents, V = s.hemi.skyColors, K = s.hemi.groundColors, M = s.hemi.positions, O = 0, ea = 0, T = 0, aa = 0, da = 0, R = 0, S = 0, P = 0, ba = m = 0, c = r = ba = 0, f = b.length; c < f; c++) m = b[c], m.onlyShadow || (p = m.color, q = m.intensity, r = m.distance, m instanceof THREE.AmbientLight ? m.visible && (D.gammaInput ? (j += p.r * p.r, l += p.g * p.g, n += p.b * p.b) : (j += p.r, l += p.g, n += p.b)) : m instanceof THREE.DirectionalLight ? (da += 1, m.visible && (Ca.getPositionFromMatrix(m.matrixWorld), Ga.getPositionFromMatrix(m.target.matrixWorld), Ca.sub(Ga), Ca.normalize(),
            0 === Ca.x && 0 === Ca.y && 0 === Ca.z || (m = 3 * O, v[m] = Ca.x, v[m + 1] = Ca.y, v[m + 2] = Ca.z, D.gammaInput ? I(t, m, p, q * q) : G(t, m, p, q), O += 1))) : m instanceof THREE.PointLight ? (R += 1, m.visible && (ba = 3 * ea, D.gammaInput ? I(z, ba, p, q * q) : G(z, ba, p, q), Ga.getPositionFromMatrix(m.matrixWorld), y[ba] = Ga.x, y[ba + 1] = Ga.y, y[ba + 2] = Ga.z, A[ea] = r, ea += 1)) : m instanceof THREE.SpotLight ? (S += 1, m.visible && (ba = 3 * T, D.gammaInput ? I(B, ba, p, q * q) : G(B, ba, p, q), Ga.getPositionFromMatrix(m.matrixWorld), F[ba] = Ga.x, F[ba + 1] = Ga.y, F[ba + 2] = Ga.z, C[T] = r, Ca.copy(Ga), Ga.getPositionFromMatrix(m.target.matrixWorld),
            Ca.sub(Ga), Ca.normalize(), E[ba] = Ca.x, E[ba + 1] = Ca.y, E[ba + 2] = Ca.z, J[T] = Math.cos(m.angle), L[T] = m.exponent, T += 1)) : m instanceof THREE.HemisphereLight && (P += 1, m.visible && (Ca.getPositionFromMatrix(m.matrixWorld), Ca.normalize(), 0 === Ca.x && 0 === Ca.y && 0 === Ca.z || (r = 3 * aa, M[r] = Ca.x, M[r + 1] = Ca.y, M[r + 2] = Ca.z, p = m.color, m = m.groundColor, D.gammaInput ? (q *= q, I(V, r, p, q), I(K, r, m, q)) : (G(V, r, p, q), G(K, r, m, q)), aa += 1))));
          c = 3 * O;
          for (f = Math.max(t.length, 3 * da); c < f; c++) t[c] = 0;
          c = 3 * ea;
          for (f = Math.max(z.length, 3 * R); c < f; c++) z[c] = 0;
          c = 3 * T;
          for (f =
            Math.max(B.length, 3 * S); c < f; c++) B[c] = 0;
          c = 3 * aa;
          for (f = Math.max(V.length, 3 * P); c < f; c++) V[c] = 0;
          c = 3 * aa;
          for (f = Math.max(K.length, 3 * P); c < f; c++) K[c] = 0;
          s.directional.length = O;
          s.point.length = ea;
          s.spot.length = T;
          s.hemi.length = aa;
          s.ambient[0] = j;
          s.ambient[1] = l;
          s.ambient[2] = n;
          yb = !1
        }
        c = Ib;
        i.ambientLightColor.value = c.ambient;
        i.directionalLightColor.value = c.directional.colors;
        i.directionalLightDirection.value = c.directional.positions;
        i.pointLightColor.value = c.point.colors;
        i.pointLightPosition.value = c.point.positions;
        i.pointLightDistance.value =
          c.point.distances;
        i.spotLightColor.value = c.spot.colors;
        i.spotLightPosition.value = c.spot.positions;
        i.spotLightDistance.value = c.spot.distances;
        i.spotLightDirection.value = c.spot.directions;
        i.spotLightAngleCos.value = c.spot.anglesCos;
        i.spotLightExponent.value = c.spot.exponents;
        i.hemisphereLightSkyColor.value = c.hemi.skyColors;
        i.hemisphereLightGroundColor.value = c.hemi.groundColors;
        i.hemisphereLightDirection.value = c.hemi.positions
      }
      if (d instanceof THREE.MeshBasicMaterial || d instanceof THREE.MeshLambertMaterial ||
        d instanceof THREE.MeshPhongMaterial) {
        i.opacity.value = d.opacity;
        D.gammaInput ? i.diffuse.value.copyGammaToLinear(d.color) : i.diffuse.value = d.color;
        i.map.value = d.map;
        i.lightMap.value = d.lightMap;
        i.specularMap.value = d.specularMap;
        d.bumpMap && (i.bumpMap.value = d.bumpMap, i.bumpScale.value = d.bumpScale);
        d.normalMap && (i.normalMap.value = d.normalMap, i.normalScale.value.copy(d.normalScale));
        var X;
        d.map ? X = d.map : d.specularMap ? X = d.specularMap : d.normalMap ? X = d.normalMap : d.bumpMap && (X = d.bumpMap);
        void 0 !== X && (c = X.offset,
          X = X.repeat, i.offsetRepeat.value.set(c.x, c.y, X.x, X.y));
        i.envMap.value = d.envMap;
        i.flipEnvMap.value = d.envMap instanceof THREE.WebGLRenderTargetCube ? 1 : -1;
        i.reflectivity.value = d.reflectivity;
        i.refractionRatio.value = d.refractionRatio;
        i.combine.value = d.combine;
        i.useRefract.value = d.envMap && d.envMap.mapping instanceof THREE.CubeRefractionMapping
      }
      d instanceof THREE.LineBasicMaterial ? (i.diffuse.value = d.color, i.opacity.value = d.opacity) : d instanceof THREE.LineDashedMaterial ? (i.diffuse.value = d.color, i.opacity.value =
        d.opacity, i.dashSize.value = d.dashSize, i.totalSize.value = d.dashSize + d.gapSize, i.scale.value = d.scale) : d instanceof THREE.ParticleBasicMaterial ? (i.psColor.value = d.color, i.opacity.value = d.opacity, i.size.value = d.size, i.scale.value = Z.height / 2, i.map.value = d.map) : d instanceof THREE.MeshPhongMaterial ? (i.shininess.value = d.shininess, D.gammaInput ? (i.ambient.value.copyGammaToLinear(d.ambient), i.emissive.value.copyGammaToLinear(d.emissive), i.specular.value.copyGammaToLinear(d.specular)) : (i.ambient.value = d.ambient,
        i.emissive.value = d.emissive, i.specular.value = d.specular), d.wrapAround && i.wrapRGB.value.copy(d.wrapRGB)) : d instanceof THREE.MeshLambertMaterial ? (D.gammaInput ? (i.ambient.value.copyGammaToLinear(d.ambient), i.emissive.value.copyGammaToLinear(d.emissive)) : (i.ambient.value = d.ambient, i.emissive.value = d.emissive), d.wrapAround && i.wrapRGB.value.copy(d.wrapRGB)) : d instanceof THREE.MeshDepthMaterial ? (i.mNear.value = a.near, i.mFar.value = a.far, i.opacity.value = d.opacity) : d instanceof THREE.MeshNormalMaterial && (i.opacity.value =
        d.opacity);
      if (e.receiveShadow && !d._shadowPass && i.shadowMatrix) {
        c = X = 0;
        for (f = b.length; c < f; c++)
          if (j = b[c], j.castShadow && (j instanceof THREE.SpotLight || j instanceof THREE.DirectionalLight && !j.shadowCascade)) i.shadowMap.value[X] = j.shadowMap, i.shadowMapSize.value[X] = j.shadowMapSize, i.shadowMatrix.value[X] = j.shadowMatrix, i.shadowDarkness.value[X] = j.shadowDarkness, i.shadowBias.value[X] = j.shadowBias, X++
      }
      b = d.uniformsList;
      i = 0;
      for (X = b.length; i < X; i++)
        if (f = g.uniforms[b[i][1]])
          if (c = b[i][0], l = c.type, j = c.value, "i" ===
            l) k.uniform1i(f, j);
          else if ("f" === l) k.uniform1f(f, j);
      else if ("v2" === l) k.uniform2f(f, j.x, j.y);
      else if ("v3" === l) k.uniform3f(f, j.x, j.y, j.z);
      else if ("v4" === l) k.uniform4f(f, j.x, j.y, j.z, j.w);
      else if ("c" === l) k.uniform3f(f, j.r, j.g, j.b);
      else if ("iv1" === l) k.uniform1iv(f, j);
      else if ("iv" === l) k.uniform3iv(f, j);
      else if ("fv1" === l) k.uniform1fv(f, j);
      else if ("fv" === l) k.uniform3fv(f, j);
      else if ("v2v" === l) {
        void 0 === c._array && (c._array = new Float32Array(2 * j.length));
        l = 0;
        for (n = j.length; l < n; l++) s = 2 * l, c._array[s] = j[l].x, c._array[s +
          1] = j[l].y;
        k.uniform2fv(f, c._array)
      } else if ("v3v" === l) {
        void 0 === c._array && (c._array = new Float32Array(3 * j.length));
        l = 0;
        for (n = j.length; l < n; l++) s = 3 * l, c._array[s] = j[l].x, c._array[s + 1] = j[l].y, c._array[s + 2] = j[l].z;
        k.uniform3fv(f, c._array)
      } else if ("v4v" === l) {
        void 0 === c._array && (c._array = new Float32Array(4 * j.length));
        l = 0;
        for (n = j.length; l < n; l++) s = 4 * l, c._array[s] = j[l].x, c._array[s + 1] = j[l].y, c._array[s + 2] = j[l].z, c._array[s + 3] = j[l].w;
        k.uniform4fv(f, c._array)
      } else if ("m4" === l) void 0 === c._array && (c._array = new Float32Array(16)),
        j.flattenToArray(c._array), k.uniformMatrix4fv(f, !1, c._array);
      else if ("m4v" === l) {
        void 0 === c._array && (c._array = new Float32Array(16 * j.length));
        l = 0;
        for (n = j.length; l < n; l++) j[l].flattenToArrayOffset(c._array, 16 * l);
        k.uniformMatrix4fv(f, !1, c._array)
      } else if ("t" === l) {
        if (s = j, j = H(), k.uniform1i(f, j), s)
          if (s.image instanceof Array && 6 === s.image.length) {
            if (c = s, f = j, 6 === c.image.length)
              if (c.needsUpdate) {
                c.image.__webglTextureCube || (c.addEventListener("dispose", gc), c.image.__webglTextureCube = k.createTexture(), D.info.memory.textures++);
                k.activeTexture(k.TEXTURE0 + f);
                k.bindTexture(k.TEXTURE_CUBE_MAP, c.image.__webglTextureCube);
                k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL, c.flipY);
                f = c instanceof THREE.CompressedTexture;
                j = [];
                for (l = 0; 6 > l; l++) D.autoScaleCubemaps && !f ? (n = j, s = l, t = c.image[l], z = Ub, t.width <= z && t.height <= z || (y = Math.max(t.width, t.height), v = Math.floor(t.width * z / y), z = Math.floor(t.height * z / y), y = document.createElement("canvas"), y.width = v, y.height = z, y.getContext("2d").drawImage(t, 0, 0, t.width, t.height, 0, 0, v, z), t = y), n[s] = t) : j[l] = c.image[l];
                l = j[0];
                n = 0 === (l.width & l.width - 1) && 0 === (l.height & l.height - 1);
                s = w(c.format);
                t = w(c.type);
                N(k.TEXTURE_CUBE_MAP, c, n);
                for (l = 0; 6 > l; l++)
                  if (f) {
                    z = j[l].mipmaps;
                    y = 0;
                    for (A = z.length; y < A; y++) v = z[y], k.compressedTexImage2D(k.TEXTURE_CUBE_MAP_POSITIVE_X + l, y, s, v.width, v.height, 0, v.data)
                  } else k.texImage2D(k.TEXTURE_CUBE_MAP_POSITIVE_X + l, 0, s, s, t, j[l]);
                c.generateMipmaps && n && k.generateMipmap(k.TEXTURE_CUBE_MAP);
                c.needsUpdate = !1;
                if (c.onUpdate) c.onUpdate()
              } else k.activeTexture(k.TEXTURE0 + f), k.bindTexture(k.TEXTURE_CUBE_MAP,
                c.image.__webglTextureCube)
          } else s instanceof THREE.WebGLRenderTargetCube ? (c = s, k.activeTexture(k.TEXTURE0 + j), k.bindTexture(k.TEXTURE_CUBE_MAP, c.__webglTexture)) : D.setTexture(s, j)
      } else if ("tv" === l) {
        void 0 === c._array && (c._array = []);
        l = 0;
        for (n = c.value.length; l < n; l++) c._array[l] = H();
        k.uniform1iv(f, c._array);
        l = 0;
        for (n = c.value.length; l < n; l++) s = c.value[l], j = c._array[l], s && D.setTexture(s, j)
      } else console.warn("THREE.WebGLRenderer: Unknown uniform type: " + l);
      if ((d instanceof THREE.ShaderMaterial || d instanceof THREE.MeshPhongMaterial || d.envMap) && null !== h.cameraPosition) Ga.getPositionFromMatrix(a.matrixWorld), k.uniform3f(h.cameraPosition, Ga.x, Ga.y, Ga.z);
      (d instanceof THREE.MeshPhongMaterial || d instanceof THREE.MeshLambertMaterial || d instanceof THREE.ShaderMaterial || d.skinning) && null !== h.viewMatrix && k.uniformMatrix4fv(h.viewMatrix, !1, a.matrixWorldInverse.elements)
    }
    k.uniformMatrix4fv(h.modelViewMatrix, !1, e._modelViewMatrix.elements);
    h.normalMatrix && k.uniformMatrix3fv(h.normalMatrix, !1, e._normalMatrix.elements);
    null !== h.modelMatrix && k.uniformMatrix4fv(h.modelMatrix, !1, e.matrixWorld.elements);
    return g
  }

  function H() {
    var a = fa;
    a >= ib && console.warn("WebGLRenderer: trying to use " + a + " texture units while this GPU supports only " + ib);
    fa += 1;
    return a
  }

  function I(a, b, c, d) {
    a[b] = c.r * c.r * d;
    a[b + 1] = c.g * c.g * d;
    a[b + 2] = c.b * c.b * d
  }

  function G(a, b, c, d) {
    a[b] = c.r * d;
    a[b + 1] = c.g * d;
    a[b + 2] = c.b * d
  }

  function A(a) {
    a !== ja && (k.lineWidth(a), ja = a)
  }

  function K(a, b, c) {
    la !== a && (a ? k.enable(k.POLYGON_OFFSET_FILL) : k.disable(k.POLYGON_OFFSET_FILL), la = a);
    if (a && (ia !== b || ra !== c)) k.polygonOffset(b, c), ia = b, ra = c
  }

  function B(a) {
    for (var a = a.split("\n"), b = 0, c = a.length; b < c; b++) a[b] = b + 1 + ": " + a[b];
    return a.join("\n")
  }

  function J(a, b) {
    var c;
    "fragment" === a ? c = k.createShader(k.FRAGMENT_SHADER) : "vertex" === a && (c = k.createShader(k.VERTEX_SHADER));
    k.shaderSource(c, b);
    k.compileShader(c);
    return !k.getShaderParameter(c, k.COMPILE_STATUS) ? (console.error(k.getShaderInfoLog(c)), console.error(B(b)), null) : c
  }

  function N(a, b, c) {
    c ? (k.texParameteri(a, k.TEXTURE_WRAP_S, w(b.wrapS)), k.texParameteri(a,
      k.TEXTURE_WRAP_T, w(b.wrapT)), k.texParameteri(a, k.TEXTURE_MAG_FILTER, w(b.magFilter)), k.texParameteri(a, k.TEXTURE_MIN_FILTER, w(b.minFilter))) : (k.texParameteri(a, k.TEXTURE_WRAP_S, k.CLAMP_TO_EDGE), k.texParameteri(a, k.TEXTURE_WRAP_T, k.CLAMP_TO_EDGE), k.texParameteri(a, k.TEXTURE_MAG_FILTER, M(b.magFilter)), k.texParameteri(a, k.TEXTURE_MIN_FILTER, M(b.minFilter)));
    if (fb && b.type !== THREE.FloatType && (1 < b.anisotropy || b.__oldAnisotropy)) k.texParameterf(a, fb.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(b.anisotropy, Wa)), b.__oldAnisotropy =
      b.anisotropy
  }

  function y(a, b) {
    k.bindRenderbuffer(k.RENDERBUFFER, a);
    b.depthBuffer && !b.stencilBuffer ? (k.renderbufferStorage(k.RENDERBUFFER, k.DEPTH_COMPONENT16, b.width, b.height), k.framebufferRenderbuffer(k.FRAMEBUFFER, k.DEPTH_ATTACHMENT, k.RENDERBUFFER, a)) : b.depthBuffer && b.stencilBuffer ? (k.renderbufferStorage(k.RENDERBUFFER, k.DEPTH_STENCIL, b.width, b.height), k.framebufferRenderbuffer(k.FRAMEBUFFER, k.DEPTH_STENCIL_ATTACHMENT, k.RENDERBUFFER, a)) : k.renderbufferStorage(k.RENDERBUFFER, k.RGBA4, b.width, b.height)
  }

  function M(a) {
    return a === THREE.NearestFilter || a === THREE.NearestMipMapNearestFilter || a === THREE.NearestMipMapLinearFilter ? k.NEAREST : k.LINEAR
  }

  function w(a) {
    if (a === THREE.RepeatWrapping) return k.REPEAT;
    if (a === THREE.ClampToEdgeWrapping) return k.CLAMP_TO_EDGE;
    if (a === THREE.MirroredRepeatWrapping) return k.MIRRORED_REPEAT;
    if (a === THREE.NearestFilter) return k.NEAREST;
    if (a === THREE.NearestMipMapNearestFilter) return k.NEAREST_MIPMAP_NEAREST;
    if (a === THREE.NearestMipMapLinearFilter) return k.NEAREST_MIPMAP_LINEAR;
    if (a ===
      THREE.LinearFilter) return k.LINEAR;
    if (a === THREE.LinearMipMapNearestFilter) return k.LINEAR_MIPMAP_NEAREST;
    if (a === THREE.LinearMipMapLinearFilter) return k.LINEAR_MIPMAP_LINEAR;
    if (a === THREE.UnsignedByteType) return k.UNSIGNED_BYTE;
    if (a === THREE.UnsignedShort4444Type) return k.UNSIGNED_SHORT_4_4_4_4;
    if (a === THREE.UnsignedShort5551Type) return k.UNSIGNED_SHORT_5_5_5_1;
    if (a === THREE.UnsignedShort565Type) return k.UNSIGNED_SHORT_5_6_5;
    if (a === THREE.ByteType) return k.BYTE;
    if (a === THREE.ShortType) return k.SHORT;
    if (a ===
      THREE.UnsignedShortType) return k.UNSIGNED_SHORT;
    if (a === THREE.IntType) return k.INT;
    if (a === THREE.UnsignedIntType) return k.UNSIGNED_INT;
    if (a === THREE.FloatType) return k.FLOAT;
    if (a === THREE.AlphaFormat) return k.ALPHA;
    if (a === THREE.RGBFormat) return k.RGB;
    if (a === THREE.RGBAFormat) return k.RGBA;
    if (a === THREE.LuminanceFormat) return k.LUMINANCE;
    if (a === THREE.LuminanceAlphaFormat) return k.LUMINANCE_ALPHA;
    if (a === THREE.AddEquation) return k.FUNC_ADD;
    if (a === THREE.SubtractEquation) return k.FUNC_SUBTRACT;
    if (a === THREE.ReverseSubtractEquation) return k.FUNC_REVERSE_SUBTRACT;
    if (a === THREE.ZeroFactor) return k.ZERO;
    if (a === THREE.OneFactor) return k.ONE;
    if (a === THREE.SrcColorFactor) return k.SRC_COLOR;
    if (a === THREE.OneMinusSrcColorFactor) return k.ONE_MINUS_SRC_COLOR;
    if (a === THREE.SrcAlphaFactor) return k.SRC_ALPHA;
    if (a === THREE.OneMinusSrcAlphaFactor) return k.ONE_MINUS_SRC_ALPHA;
    if (a === THREE.DstAlphaFactor) return k.DST_ALPHA;
    if (a === THREE.OneMinusDstAlphaFactor) return k.ONE_MINUS_DST_ALPHA;
    if (a === THREE.DstColorFactor) return k.DST_COLOR;
    if (a === THREE.OneMinusDstColorFactor) return k.ONE_MINUS_DST_COLOR;
    if (a === THREE.SrcAlphaSaturateFactor) return k.SRC_ALPHA_SATURATE;
    if (void 0 !== oa) {
      if (a === THREE.RGB_S3TC_DXT1_Format) return oa.COMPRESSED_RGB_S3TC_DXT1_EXT;
      if (a === THREE.RGBA_S3TC_DXT1_Format) return oa.COMPRESSED_RGBA_S3TC_DXT1_EXT;
      if (a === THREE.RGBA_S3TC_DXT3_Format) return oa.COMPRESSED_RGBA_S3TC_DXT3_EXT;
      if (a === THREE.RGBA_S3TC_DXT5_Format) return oa.COMPRESSED_RGBA_S3TC_DXT5_EXT
    }
    return 0
  }
  console.log("THREE.WebGLRenderer", THREE.REVISION);
  var a = a || {},
    Z = void 0 !== a.canvas ? a.canvas : document.createElement("canvas"),
    L = void 0 !== a.precision ? a.precision : "highp",
    pa = void 0 !== a.alpha ? a.alpha : !0,
    Pa = void 0 !== a.premultipliedAlpha ? a.premultipliedAlpha : !0,
    Ua = void 0 !== a.antialias ? a.antialias : !1,
    O = void 0 !== a.stencil ? a.stencil : !0,
    ka = void 0 !== a.preserveDrawingBuffer ? a.preserveDrawingBuffer : !1,
    Fa = new THREE.Color(0),
    wa = 0;
  void 0 !== a.clearColor && (console.warn("DEPRECATED: clearColor in WebGLRenderer constructor parameters is being removed. Use .setClearColor() instead."), Fa.setHex(a.clearColor));
  void 0 !== a.clearAlpha && (console.warn("DEPRECATED: clearAlpha in WebGLRenderer constructor parameters is being removed. Use .setClearColor() instead."),
    wa = a.clearAlpha);
  this.domElement = Z;
  this.context = null;
  this.devicePixelRatio = void 0 !== a.devicePixelRatio ? a.devicePixelRatio : void 0 !== window.devicePixelRatio ? window.devicePixelRatio : 1;
  this.autoUpdateObjects = this.sortObjects = this.autoClearStencil = this.autoClearDepth = this.autoClearColor = this.autoClear = !0;
  this.shadowMapEnabled = this.physicallyBasedShading = this.gammaOutput = this.gammaInput = !1;
  this.shadowMapAutoUpdate = !0;
  this.shadowMapType = THREE.PCFShadowMap;
  this.shadowMapCullFace = THREE.CullFaceFront;
  this.shadowMapCascade =
    this.shadowMapDebug = !1;
  this.maxMorphTargets = 8;
  this.maxMorphNormals = 4;
  this.autoScaleCubemaps = !0;
  this.renderPluginsPre = [];
  this.renderPluginsPost = [];
  this.info = {
    memory: {
      programs: 0,
      geometries: 0,
      textures: 0
    },
    render: {
      calls: 0,
      vertices: 0,
      faces: 0,
      points: 0
    }
  };
  var D = this,
    V = [],
    ea = 0,
    qa = null,
    eb = null,
    pb = -1,
    ub = null,
    ya = null,
    Ha = 0,
    fa = 0,
    da = -1,
    T = -1,
    aa = -1,
    na = -1,
    ha = -1,
    X = -1,
    xa = -1,
    ab = -1,
    la = null,
    ia = null,
    ra = null,
    ja = null,
    ua = 0,
    Ra = 0,
    Qa = 0,
    Xa = 0,
    Xb = 0,
    Jb = 0,
    Ab = {},
    Sa = new THREE.Frustum,
    xb = new THREE.Matrix4,
    lb = new THREE.Matrix4,
    Ga = new THREE.Vector3,
    Ca = new THREE.Vector3,
    yb = !0,
    Ib = {
      ambient: [0, 0, 0],
      directional: {
        length: 0,
        colors: [],
        positions: []
      },
      point: {
        length: 0,
        colors: [],
        positions: [],
        distances: []
      },
      spot: {
        length: 0,
        colors: [],
        positions: [],
        distances: [],
        directions: [],
        anglesCos: [],
        exponents: []
      },
      hemi: {
        length: 0,
        skyColors: [],
        groundColors: [],
        positions: []
      }
    },
    k, Rb, Yb, fb, oa;
  try {
    if (!(k = Z.getContext("experimental-webgl", {
        alpha: pa,
        premultipliedAlpha: Pa,
        antialias: Ua,
        stencil: O,
        preserveDrawingBuffer: ka
      }))) throw "Error creating WebGL context.";
  } catch (va) {
    console.error(va)
  }
  Rb =
    k.getExtension("OES_texture_float");
  k.getExtension("OES_texture_float_linear");
  Yb = k.getExtension("OES_standard_derivatives");
  fb = k.getExtension("EXT_texture_filter_anisotropic") || k.getExtension("MOZ_EXT_texture_filter_anisotropic") || k.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
  oa = k.getExtension("WEBGL_compressed_texture_s3tc") || k.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || k.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
  Rb || console.log("THREE.WebGLRenderer: Float textures not supported.");
  Yb || console.log("THREE.WebGLRenderer: Standard derivatives not supported.");
  fb || console.log("THREE.WebGLRenderer: Anisotropic texture filtering not supported.");
  oa || console.log("THREE.WebGLRenderer: S3TC compressed textures not supported.");
  void 0 === k.getShaderPrecisionFormat && (k.getShaderPrecisionFormat = function () {
    return {
      rangeMin: 1,
      rangeMax: 1,
      precision: 1
    }
  });
  k.clearColor(0, 0, 0, 1);
  k.clearDepth(1);
  k.clearStencil(0);
  k.enable(k.DEPTH_TEST);
  k.depthFunc(k.LEQUAL);
  k.frontFace(k.CCW);
  k.cullFace(k.BACK);
  k.enable(k.CULL_FACE);
  k.enable(k.BLEND);
  k.blendEquation(k.FUNC_ADD);
  k.blendFunc(k.SRC_ALPHA, k.ONE_MINUS_SRC_ALPHA);
  k.clearColor(Fa.r, Fa.g, Fa.b, wa);
  this.context = k;
  var ib = k.getParameter(k.MAX_TEXTURE_IMAGE_UNITS),
    Tb = k.getParameter(k.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
  k.getParameter(k.MAX_TEXTURE_SIZE);
  var Ub = k.getParameter(k.MAX_CUBE_MAP_TEXTURE_SIZE),
    Wa = fb ? k.getParameter(fb.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0,
    Gb = 0 < Tb,
    Bb = Gb && Rb;
  oa && k.getParameter(k.COMPRESSED_TEXTURE_FORMATS);
  var Kb = k.getShaderPrecisionFormat(k.VERTEX_SHADER,
      k.HIGH_FLOAT),
    Ka = k.getShaderPrecisionFormat(k.VERTEX_SHADER, k.MEDIUM_FLOAT);
  k.getShaderPrecisionFormat(k.VERTEX_SHADER, k.LOW_FLOAT);
  var Sb = k.getShaderPrecisionFormat(k.FRAGMENT_SHADER, k.HIGH_FLOAT),
    Lb = k.getShaderPrecisionFormat(k.FRAGMENT_SHADER, k.MEDIUM_FLOAT);
  k.getShaderPrecisionFormat(k.FRAGMENT_SHADER, k.LOW_FLOAT);
  k.getShaderPrecisionFormat(k.VERTEX_SHADER, k.HIGH_INT);
  k.getShaderPrecisionFormat(k.VERTEX_SHADER, k.MEDIUM_INT);
  k.getShaderPrecisionFormat(k.VERTEX_SHADER, k.LOW_INT);
  k.getShaderPrecisionFormat(k.FRAGMENT_SHADER,
    k.HIGH_INT);
  k.getShaderPrecisionFormat(k.FRAGMENT_SHADER, k.MEDIUM_INT);
  k.getShaderPrecisionFormat(k.FRAGMENT_SHADER, k.LOW_INT);
  var Hb = 0 < Kb.precision && 0 < Sb.precision,
    kc = 0 < Ka.precision && 0 < Lb.precision;
  "highp" === L && !Hb && (kc ? (L = "mediump", console.warn("WebGLRenderer: highp not supported, using mediump")) : (L = "lowp", console.warn("WebGLRenderer: highp and mediump not supported, using lowp")));
  "mediump" === L && !kc && (L = "lowp", console.warn("WebGLRenderer: mediump not supported, using lowp"));
  this.getContext = function () {
    return k
  };
  this.supportsVertexTextures = function () {
    return Gb
  };
  this.supportsFloatTextures = function () {
    return Rb
  };
  this.supportsStandardDerivatives = function () {
    return Yb
  };
  this.supportsCompressedTextureS3TC = function () {
    return oa
  };
  this.getMaxAnisotropy = function () {
    return Wa
  };
  this.getPrecision = function () {
    return L
  };
  this.setSize = function (a, b, c) {
    Z.width = a * this.devicePixelRatio;
    Z.height = b * this.devicePixelRatio;
    1 !== this.devicePixelRatio && !1 !== c && (Z.style.width = a + "px", Z.style.height = b + "px");
    this.setViewport(0, 0, Z.width, Z.height)
  };
  this.setViewport = function (a, b, c, d) {
    ua = void 0 !== a ? a : 0;
    Ra = void 0 !== b ? b : 0;
    Qa = void 0 !== c ? c : Z.width;
    Xa = void 0 !== d ? d : Z.height;
    k.viewport(ua, Ra, Qa, Xa)
  };
  this.setScissor = function (a, b, c, d) {
    k.scissor(a, b, c, d)
  };
  this.enableScissorTest = function (a) {
    a ? k.enable(k.SCISSOR_TEST) : k.disable(k.SCISSOR_TEST)
  };
  this.setClearColor = function (a, b) {
    Fa.set(a);
    wa = void 0 !== b ? b : 1;
    k.clearColor(Fa.r, Fa.g, Fa.b, wa)
  };
  this.setClearColorHex = function (a, b) {
    console.warn("DEPRECATED: .setClearColorHex() is being removed. Use .setClearColor() instead.");
    this.setClearColor(a, b)
  };
  this.getClearColor = function () {
    return Fa
  };
  this.getClearAlpha = function () {
    return wa
  };
  this.clear = function (a, b, c) {
    var d = 0;
    if (void 0 === a || a) d |= k.COLOR_BUFFER_BIT;
    if (void 0 === b || b) d |= k.DEPTH_BUFFER_BIT;
    if (void 0 === c || c) d |= k.STENCIL_BUFFER_BIT;
    k.clear(d)
  };
  this.clearTarget = function (a, b, c, d) {
    this.setRenderTarget(a);
    this.clear(b, c, d)
  };
  this.addPostPlugin = function (a) {
    a.init(this);
    this.renderPluginsPost.push(a)
  };
  this.addPrePlugin = function (a) {
    a.init(this);
    this.renderPluginsPre.push(a)
  };
  this.updateShadowMap = function (a, b) {
    qa = null;
    pb = ub = ab = xa = aa = -1;
    yb = !0;
    T = da = -1;
    this.shadowMapPlugin.update(a, b)
  };
  var lc = function (a) {
      a = a.target;
      a.removeEventListener("dispose", lc);
      a.__webglInit = void 0;
      void 0 !== a.__webglVertexBuffer && k.deleteBuffer(a.__webglVertexBuffer);
      void 0 !== a.__webglNormalBuffer && k.deleteBuffer(a.__webglNormalBuffer);
      void 0 !== a.__webglTangentBuffer && k.deleteBuffer(a.__webglTangentBuffer);
      void 0 !== a.__webglColorBuffer && k.deleteBuffer(a.__webglColorBuffer);
      void 0 !== a.__webglUVBuffer &&
        k.deleteBuffer(a.__webglUVBuffer);
      void 0 !== a.__webglUV2Buffer && k.deleteBuffer(a.__webglUV2Buffer);
      void 0 !== a.__webglSkinIndicesBuffer && k.deleteBuffer(a.__webglSkinIndicesBuffer);
      void 0 !== a.__webglSkinWeightsBuffer && k.deleteBuffer(a.__webglSkinWeightsBuffer);
      void 0 !== a.__webglFaceBuffer && k.deleteBuffer(a.__webglFaceBuffer);
      void 0 !== a.__webglLineBuffer && k.deleteBuffer(a.__webglLineBuffer);
      void 0 !== a.__webglLineDistanceBuffer && k.deleteBuffer(a.__webglLineDistanceBuffer);
      if (void 0 !== a.geometryGroups)
        for (var c in a.geometryGroups) {
          var d =
            a.geometryGroups[c];
          if (void 0 !== d.numMorphTargets)
            for (var e = 0, f = d.numMorphTargets; e < f; e++) k.deleteBuffer(d.__webglMorphTargetsBuffers[e]);
          if (void 0 !== d.numMorphNormals) {
            e = 0;
            for (f = d.numMorphNormals; e < f; e++) k.deleteBuffer(d.__webglMorphNormalsBuffers[e])
          }
          b(d)
        }
      b(a);
      D.info.memory.geometries--
    },
    gc = function (a) {
      a = a.target;
      a.removeEventListener("dispose", gc);
      a.image && a.image.__webglTextureCube ? k.deleteTexture(a.image.__webglTextureCube) : a.__webglInit && (a.__webglInit = !1, k.deleteTexture(a.__webglTexture));
      D.info.memory.textures--
    },
    mc = function (a) {
      a = a.target;
      a.removeEventListener("dispose", mc);
      if (a && a.__webglTexture)
        if (k.deleteTexture(a.__webglTexture), a instanceof THREE.WebGLRenderTargetCube)
          for (var b = 0; 6 > b; b++) k.deleteFramebuffer(a.__webglFramebuffer[b]), k.deleteRenderbuffer(a.__webglRenderbuffer[b]);
        else k.deleteFramebuffer(a.__webglFramebuffer), k.deleteRenderbuffer(a.__webglRenderbuffer);
      D.info.memory.textures--
    },
    uc = function (a) {
      a = a.target;
      a.removeEventListener("dispose", uc);
      vc(a)
    },
    vc = function (a) {
      var b =
        a.program;
      if (void 0 !== b) {
        a.program = void 0;
        var c, d, e = !1,
          a = 0;
        for (c = V.length; a < c; a++)
          if (d = V[a], d.program === b) {
            d.usedTimes--;
            0 === d.usedTimes && (e = !0);
            break
          } if (!0 === e) {
          e = [];
          a = 0;
          for (c = V.length; a < c; a++) d = V[a], d.program !== b && e.push(d);
          V = e;
          k.deleteProgram(b);
          D.info.memory.programs--
        }
      }
    };
  this.renderBufferImmediate = function (a, b, c) {
    a.hasPositions && !a.__webglVertexBuffer && (a.__webglVertexBuffer = k.createBuffer());
    a.hasNormals && !a.__webglNormalBuffer && (a.__webglNormalBuffer = k.createBuffer());
    a.hasUvs && !a.__webglUvBuffer &&
      (a.__webglUvBuffer = k.createBuffer());
    a.hasColors && !a.__webglColorBuffer && (a.__webglColorBuffer = k.createBuffer());
    a.hasPositions && (k.bindBuffer(k.ARRAY_BUFFER, a.__webglVertexBuffer), k.bufferData(k.ARRAY_BUFFER, a.positionArray, k.DYNAMIC_DRAW), k.enableVertexAttribArray(b.attributes.position), k.vertexAttribPointer(b.attributes.position, 3, k.FLOAT, !1, 0, 0));
    if (a.hasNormals) {
      k.bindBuffer(k.ARRAY_BUFFER, a.__webglNormalBuffer);
      if (c.shading === THREE.FlatShading) {
        var d, e, f, g, h, i, j, l, m, n, p, q = 3 * a.count;
        for (p = 0; p <
          q; p += 9) n = a.normalArray, d = n[p], e = n[p + 1], f = n[p + 2], g = n[p + 3], i = n[p + 4], l = n[p + 5], h = n[p + 6], j = n[p + 7], m = n[p + 8], d = (d + g + h) / 3, e = (e + i + j) / 3, f = (f + l + m) / 3, n[p] = d, n[p + 1] = e, n[p + 2] = f, n[p + 3] = d, n[p + 4] = e, n[p + 5] = f, n[p + 6] = d, n[p + 7] = e, n[p + 8] = f
      }
      k.bufferData(k.ARRAY_BUFFER, a.normalArray, k.DYNAMIC_DRAW);
      k.enableVertexAttribArray(b.attributes.normal);
      k.vertexAttribPointer(b.attributes.normal, 3, k.FLOAT, !1, 0, 0)
    }
    a.hasUvs && c.map && (k.bindBuffer(k.ARRAY_BUFFER, a.__webglUvBuffer), k.bufferData(k.ARRAY_BUFFER, a.uvArray, k.DYNAMIC_DRAW),
      k.enableVertexAttribArray(b.attributes.uv), k.vertexAttribPointer(b.attributes.uv, 2, k.FLOAT, !1, 0, 0));
    a.hasColors && c.vertexColors !== THREE.NoColors && (k.bindBuffer(k.ARRAY_BUFFER, a.__webglColorBuffer), k.bufferData(k.ARRAY_BUFFER, a.colorArray, k.DYNAMIC_DRAW), k.enableVertexAttribArray(b.attributes.color), k.vertexAttribPointer(b.attributes.color, 3, k.FLOAT, !1, 0, 0));
    k.drawArrays(k.TRIANGLES, 0, a.count);
    a.count = 0
  };
  this.renderBufferDirect = function (a, b, c, d, e, f) {
    if (!1 !== d.visible) {
      var h, j, l, m;
      h = F(a, b, c, d, f);
      b =
        h.attributes;
      a = e.attributes;
      c = !1;
      h = 16777215 * e.id + 2 * h.id + (d.wireframe ? 1 : 0);
      h !== ub && (ub = h, c = !0);
      c && i();
      if (f instanceof THREE.Mesh)
        if (d = a.index) {
          e = e.offsets;
          1 < e.length && (c = !0);
          for (var f = 0, n = e.length; f < n; f++) {
            var p = e[f].index;
            if (c) {
              for (j in a) "index" !== j && (l = b[j], h = a[j], m = h.itemSize, 0 <= l && (k.bindBuffer(k.ARRAY_BUFFER, h.buffer), g(l), k.vertexAttribPointer(l, m, k.FLOAT, !1, 0, 4 * p * m)));
              k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, d.buffer)
            }
            k.drawElements(k.TRIANGLES, e[f].count, k.UNSIGNED_SHORT, 2 * e[f].start);
            D.info.render.calls++;
            D.info.render.vertices += e[f].count;
            D.info.render.faces += e[f].count / 3
          }
        } else {
          if (c)
            for (j in a) "index" !== j && (l = b[j], h = a[j], m = h.itemSize, 0 <= l && (k.bindBuffer(k.ARRAY_BUFFER, h.buffer), g(l), k.vertexAttribPointer(l, m, k.FLOAT, !1, 0, 0)));
          a = e.attributes.position;
          k.drawArrays(k.TRIANGLES, 0, a.numItems / 3);
          D.info.render.calls++;
          D.info.render.vertices += a.numItems / 3;
          D.info.render.faces += a.numItems / 3 / 3
        }
      else if (f instanceof THREE.ParticleSystem) {
        if (c) {
          for (j in a) l = b[j], h = a[j], m = h.itemSize, 0 <= l && (k.bindBuffer(k.ARRAY_BUFFER,
            h.buffer), g(l), k.vertexAttribPointer(l, m, k.FLOAT, !1, 0, 0));
          a = a.position;
          k.drawArrays(k.POINTS, 0, a.numItems / 3);
          D.info.render.calls++;
          D.info.render.points += a.numItems / 3
        }
      } else if (f instanceof THREE.Line && c) {
        for (j in a) l = b[j], h = a[j], m = h.itemSize, 0 <= l && (k.bindBuffer(k.ARRAY_BUFFER, h.buffer), g(l), k.vertexAttribPointer(l, m, k.FLOAT, !1, 0, 0));
        j = f.type === THREE.LineStrip ? k.LINE_STRIP : k.LINES;
        A(d.linewidth);
        a = a.position;
        k.drawArrays(j, 0, a.numItems / 3);
        D.info.render.calls++;
        D.info.render.points += a.numItems
      }
    }
  };
  this.renderBuffer =
    function (a, b, c, d, e, f) {
      if (!1 !== d.visible) {
        var h, j, c = F(a, b, c, d, f),
          a = c.attributes,
          b = !1,
          c = 16777215 * e.id + 2 * c.id + (d.wireframe ? 1 : 0);
        c !== ub && (ub = c, b = !0);
        b && i();
        if (!d.morphTargets && 0 <= a.position) b && (k.bindBuffer(k.ARRAY_BUFFER, e.__webglVertexBuffer), g(a.position), k.vertexAttribPointer(a.position, 3, k.FLOAT, !1, 0, 0));
        else if (f.morphTargetBase) {
          c = d.program.attributes; - 1 !== f.morphTargetBase && 0 <= c.position ? (k.bindBuffer(k.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[f.morphTargetBase]), g(c.position), k.vertexAttribPointer(c.position,
            3, k.FLOAT, !1, 0, 0)) : 0 <= c.position && (k.bindBuffer(k.ARRAY_BUFFER, e.__webglVertexBuffer), g(c.position), k.vertexAttribPointer(c.position, 3, k.FLOAT, !1, 0, 0));
          if (f.morphTargetForcedOrder.length) {
            var m = 0;
            j = f.morphTargetForcedOrder;
            for (h = f.morphTargetInfluences; m < d.numSupportedMorphTargets && m < j.length;) 0 <= c["morphTarget" + m] && (k.bindBuffer(k.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[j[m]]), g(c["morphTarget" + m]), k.vertexAttribPointer(c["morphTarget" + m], 3, k.FLOAT, !1, 0, 0)), 0 <= c["morphNormal" + m] && d.morphNormals &&
              (k.bindBuffer(k.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[j[m]]), g(c["morphNormal" + m]), k.vertexAttribPointer(c["morphNormal" + m], 3, k.FLOAT, !1, 0, 0)), f.__webglMorphTargetInfluences[m] = h[j[m]], m++
          } else {
            j = [];
            h = f.morphTargetInfluences;
            var n, p = h.length;
            for (n = 0; n < p; n++) m = h[n], 0 < m && j.push([m, n]);
            j.length > d.numSupportedMorphTargets ? (j.sort(l), j.length = d.numSupportedMorphTargets) : j.length > d.numSupportedMorphNormals ? j.sort(l) : 0 === j.length && j.push([0, 0]);
            for (m = 0; m < d.numSupportedMorphTargets;) j[m] ? (n = j[m][1], 0 <=
              c["morphTarget" + m] && (k.bindBuffer(k.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[n]), g(c["morphTarget" + m]), k.vertexAttribPointer(c["morphTarget" + m], 3, k.FLOAT, !1, 0, 0)), 0 <= c["morphNormal" + m] && d.morphNormals && (k.bindBuffer(k.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[n]), g(c["morphNormal" + m]), k.vertexAttribPointer(c["morphNormal" + m], 3, k.FLOAT, !1, 0, 0)), f.__webglMorphTargetInfluences[m] = h[n]) : f.__webglMorphTargetInfluences[m] = 0, m++
          }
          null !== d.program.uniforms.morphTargetInfluences && k.uniform1fv(d.program.uniforms.morphTargetInfluences,
            f.__webglMorphTargetInfluences)
        }
        if (b) {
          if (e.__webglCustomAttributesList) {
            h = 0;
            for (j = e.__webglCustomAttributesList.length; h < j; h++) c = e.__webglCustomAttributesList[h], 0 <= a[c.buffer.belongsToAttribute] && (k.bindBuffer(k.ARRAY_BUFFER, c.buffer), g(a[c.buffer.belongsToAttribute]), k.vertexAttribPointer(a[c.buffer.belongsToAttribute], c.size, k.FLOAT, !1, 0, 0))
          }
          0 <= a.color && (k.bindBuffer(k.ARRAY_BUFFER, e.__webglColorBuffer), g(a.color), k.vertexAttribPointer(a.color, 3, k.FLOAT, !1, 0, 0));
          0 <= a.normal && (k.bindBuffer(k.ARRAY_BUFFER,
            e.__webglNormalBuffer), g(a.normal), k.vertexAttribPointer(a.normal, 3, k.FLOAT, !1, 0, 0));
          0 <= a.tangent && (k.bindBuffer(k.ARRAY_BUFFER, e.__webglTangentBuffer), g(a.tangent), k.vertexAttribPointer(a.tangent, 4, k.FLOAT, !1, 0, 0));
          0 <= a.uv && (k.bindBuffer(k.ARRAY_BUFFER, e.__webglUVBuffer), g(a.uv), k.vertexAttribPointer(a.uv, 2, k.FLOAT, !1, 0, 0));
          0 <= a.uv2 && (k.bindBuffer(k.ARRAY_BUFFER, e.__webglUV2Buffer), g(a.uv2), k.vertexAttribPointer(a.uv2, 2, k.FLOAT, !1, 0, 0));
          d.skinning && (0 <= a.skinIndex && 0 <= a.skinWeight) && (k.bindBuffer(k.ARRAY_BUFFER,
            e.__webglSkinIndicesBuffer), g(a.skinIndex), k.vertexAttribPointer(a.skinIndex, 4, k.FLOAT, !1, 0, 0), k.bindBuffer(k.ARRAY_BUFFER, e.__webglSkinWeightsBuffer), g(a.skinWeight), k.vertexAttribPointer(a.skinWeight, 4, k.FLOAT, !1, 0, 0));
          0 <= a.lineDistance && (k.bindBuffer(k.ARRAY_BUFFER, e.__webglLineDistanceBuffer), g(a.lineDistance), k.vertexAttribPointer(a.lineDistance, 1, k.FLOAT, !1, 0, 0))
        }
        f instanceof THREE.Mesh ? (d.wireframe ? (A(d.wireframeLinewidth), b && k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, e.__webglLineBuffer), k.drawElements(k.LINES,
          e.__webglLineCount, k.UNSIGNED_SHORT, 0)) : (b && k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, e.__webglFaceBuffer), k.drawElements(k.TRIANGLES, e.__webglFaceCount, k.UNSIGNED_SHORT, 0)), D.info.render.calls++, D.info.render.vertices += e.__webglFaceCount, D.info.render.faces += e.__webglFaceCount / 3) : f instanceof THREE.Line ? (f = f.type === THREE.LineStrip ? k.LINE_STRIP : k.LINES, A(d.linewidth), k.drawArrays(f, 0, e.__webglLineCount), D.info.render.calls++) : f instanceof THREE.ParticleSystem ? (k.drawArrays(k.POINTS, 0, e.__webglParticleCount),
          D.info.render.calls++, D.info.render.points += e.__webglParticleCount) : f instanceof THREE.Ribbon && (k.drawArrays(k.TRIANGLE_STRIP, 0, e.__webglVertexCount), D.info.render.calls++)
      }
    };
  this.render = function (a, b, c, d) {
    if (!1 === b instanceof THREE.Camera) console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
    else {
      var e, f, h, g, i = a.__lights,
        l = a.fog;
      pb = -1;
      yb = !0;
      !0 === a.autoUpdate && a.updateMatrixWorld();
      void 0 === b.parent && b.updateMatrixWorld();
      b.matrixWorldInverse.getInverse(b.matrixWorld);
      xb.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse);
      Sa.setFromMatrix(xb);
      this.autoUpdateObjects && this.initWebGLObjects(a);
      m(this.renderPluginsPre, a, b);
      D.info.render.calls = 0;
      D.info.render.vertices = 0;
      D.info.render.faces = 0;
      D.info.render.points = 0;
      this.setRenderTarget(c);
      (this.autoClear || d) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil);
      g = a.__webglObjects;
      d = 0;
      for (e = g.length; d < e; d++)
        if (f = g[d], h = f.object, f.id = d, f.render = !1, h.visible && (!(h instanceof THREE.Mesh || h instanceof THREE.ParticleSystem) || !h.frustumCulled || Sa.intersectsObject(h))) {
          var q = h;
          q._modelViewMatrix.multiplyMatrices(b.matrixWorldInverse, q.matrixWorld);
          q._normalMatrix.getNormalMatrix(q._modelViewMatrix);
          var q = f,
            r = q.buffer,
            s = void 0,
            t = s = void 0,
            t = q.object.material;
          if (t instanceof THREE.MeshFaceMaterial) s = r.materialIndex, s = t.materials[s], s.transparent ? (q.transparent = s, q.opaque = null) : (q.opaque = s, q.transparent = null);
          else if (s = t) s.transparent ? (q.transparent = s, q.opaque = null) : (q.opaque = s, q.transparent = null);
          f.render = !0;
          !0 === this.sortObjects && (null !== h.renderDepth ? f.z = h.renderDepth : (Ga.getPositionFromMatrix(h.matrixWorld), Ga.applyProjection(xb), f.z = Ga.z))
        } this.sortObjects && g.sort(j);
      g = a.__webglObjectsImmediate;
      d = 0;
      for (e = g.length; d < e; d++) f = g[d], h = f.object, h.visible && (h._modelViewMatrix.multiplyMatrices(b.matrixWorldInverse, h.matrixWorld), h._normalMatrix.getNormalMatrix(h._modelViewMatrix), h = f.object.material, h.transparent ? (f.transparent = h, f.opaque = null) : (f.opaque = h, f.transparent = null));
      a.overrideMaterial ? (d = a.overrideMaterial,
        this.setBlending(d.blending, d.blendEquation, d.blendSrc, d.blendDst), this.setDepthTest(d.depthTest), this.setDepthWrite(d.depthWrite), K(d.polygonOffset, d.polygonOffsetFactor, d.polygonOffsetUnits), n(a.__webglObjects, !1, "", b, i, l, !0, d), p(a.__webglObjectsImmediate, "", b, i, l, !1, d)) : (d = null, this.setBlending(THREE.NoBlending), n(a.__webglObjects, !0, "opaque", b, i, l, !1, d), p(a.__webglObjectsImmediate, "opaque", b, i, l, !1, d), n(a.__webglObjects, !1, "transparent", b, i, l, !0, d), p(a.__webglObjectsImmediate, "transparent", b,
        i, l, !0, d));
      m(this.renderPluginsPost, a, b);
      c && (c.generateMipmaps && c.minFilter !== THREE.NearestFilter && c.minFilter !== THREE.LinearFilter) && (c instanceof THREE.WebGLRenderTargetCube ? (k.bindTexture(k.TEXTURE_CUBE_MAP, c.__webglTexture), k.generateMipmap(k.TEXTURE_CUBE_MAP), k.bindTexture(k.TEXTURE_CUBE_MAP, null)) : (k.bindTexture(k.TEXTURE_2D, c.__webglTexture), k.generateMipmap(k.TEXTURE_2D), k.bindTexture(k.TEXTURE_2D, null)));
      this.setDepthTest(!0);
      this.setDepthWrite(!0)
    }
  };
  this.renderImmediateObject = function (a,
    b, c, d, e) {
    var f = F(a, b, c, d, e);
    ub = -1;
    D.setMaterialFaces(d);
    e.immediateRenderCallback ? e.immediateRenderCallback(f, k, Sa) : e.render(function (a) {
      D.renderBufferImmediate(a, f, d)
    })
  };
  this.initWebGLObjects = function (a) {
    a.__webglObjects || (a.__webglObjects = [], a.__webglObjectsImmediate = [], a.__webglSprites = [], a.__webglFlares = []);
    for (; a.__objectsAdded.length;) t(a.__objectsAdded[0], a), a.__objectsAdded.splice(0, 1);
    for (; a.__objectsRemoved.length;) v(a.__objectsRemoved[0], a), a.__objectsRemoved.splice(0, 1);
    for (var b = 0, c =
        a.__webglObjects.length; b < c; b++) {
      var g = a.__webglObjects[b].object;
      void 0 === g.__webglInit && (void 0 !== g.__webglActive && v(g, a), t(g, a));
      var i = g,
        j = i.geometry,
        m = void 0,
        n = void 0,
        p = void 0;
      if (j instanceof THREE.BufferGeometry) {
        var q = k.DYNAMIC_DRAW,
          z = !j.dynamic,
          w = j.attributes,
          y = void 0,
          A = void 0;
        for (y in w) A = w[y], A.needsUpdate && ("index" === y ? (k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, A.buffer), k.bufferData(k.ELEMENT_ARRAY_BUFFER, A.array, q)) : (k.bindBuffer(k.ARRAY_BUFFER, A.buffer), k.bufferData(k.ARRAY_BUFFER, A.array,
          q)), A.needsUpdate = !1), z && !A.dynamic && (A.array = null)
      } else if (i instanceof THREE.Mesh) {
        for (var B = 0, F = j.geometryGroupsList.length; B < F; B++)
          if (m = j.geometryGroupsList[B], p = e(i, m), j.buffersNeedUpdate && d(m, i), n = p.attributes && r(p), j.verticesNeedUpdate || j.morphTargetsNeedUpdate || j.elementsNeedUpdate || j.uvsNeedUpdate || j.normalsNeedUpdate || j.colorsNeedUpdate || j.tangentsNeedUpdate || n) {
            var C = m,
              G = i,
              H = k.DYNAMIC_DRAW,
              I = !j.dynamic,
              J = p;
            if (C.__inittedArrays) {
              var V = f(J),
                K = J.vertexColors ? J.vertexColors : !1,
                L = h(J),
                M = V ===
                THREE.SmoothShading,
                E = void 0,
                D = void 0,
                N = void 0,
                Q = void 0,
                O = void 0,
                ea = void 0,
                T = void 0,
                X = void 0,
                qa = void 0,
                fa = void 0,
                aa = void 0,
                R = void 0,
                S = void 0,
                P = void 0,
                ba = void 0,
                Z = void 0,
                da = void 0,
                ya = void 0,
                ja = void 0,
                ha = void 0,
                Ha = void 0,
                ia = void 0,
                eb = void 0,
                ka = void 0,
                na = void 0,
                la = void 0,
                ua = void 0,
                oa = void 0,
                pa = void 0,
                ra = void 0,
                Ca = void 0,
                va = void 0,
                wa = void 0,
                xa = void 0,
                pb = void 0,
                za = void 0,
                ub = void 0,
                Fa = void 0,
                Pa = void 0,
                Ra = void 0,
                bb = void 0,
                ab = void 0,
                Za = void 0,
                $a = void 0,
                Ua = void 0,
                Qa = void 0,
                Ta = 0,
                Ya = 0,
                Wa = 0,
                Xa = 0,
                Ka = 0,
                jb = 0,
                Da =
                0,
                ob = 0,
                Va = 0,
                Y = 0,
                ga = 0,
                x = 0,
                Aa = void 0,
                cb = C.__vertexArray,
                fb = C.__uvArray,
                ib = C.__uv2Array,
                Sa = C.__normalArray,
                La = C.__tangentArray,
                db = C.__colorArray,
                Ma = C.__skinIndexArray,
                Na = C.__skinWeightArray,
                yb = C.__morphTargetsArrays,
                Ab = C.__morphNormalsArrays,
                Bb = C.__webglCustomAttributesList,
                u = void 0,
                Mb = C.__faceArray,
                wb = C.__lineArray,
                qb = G.geometry,
                Gb = qb.elementsNeedUpdate,
                Hb = qb.uvsNeedUpdate,
                Rb = qb.normalsNeedUpdate,
                Sb = qb.tangentsNeedUpdate,
                Xb = qb.colorsNeedUpdate,
                Yb = qb.morphTargetsNeedUpdate,
                cc = qb.vertices,
                sa = C.faces3,
                ta = C.faces4,
                kb = qb.faces,
                Jb = qb.faceVertexUvs[0],
                Lb = qb.faceVertexUvs[1],
                dc = qb.skinIndices,
                $b = qb.skinWeights,
                ac = qb.morphTargets,
                Ib = qb.morphNormals;
              if (qb.verticesNeedUpdate) {
                E = 0;
                for (D = sa.length; E < D; E++) Q = kb[sa[E]], R = cc[Q.a], S = cc[Q.b], P = cc[Q.c], cb[Ya] = R.x, cb[Ya + 1] = R.y, cb[Ya + 2] = R.z, cb[Ya + 3] = S.x, cb[Ya + 4] = S.y, cb[Ya + 5] = S.z, cb[Ya + 6] = P.x, cb[Ya + 7] = P.y, cb[Ya + 8] = P.z, Ya += 9;
                E = 0;
                for (D = ta.length; E < D; E++) Q = kb[ta[E]], R = cc[Q.a], S = cc[Q.b], P = cc[Q.c], ba = cc[Q.d], cb[Ya] = R.x, cb[Ya + 1] = R.y, cb[Ya + 2] = R.z, cb[Ya + 3] = S.x, cb[Ya + 4] =
                  S.y, cb[Ya + 5] = S.z, cb[Ya + 6] = P.x, cb[Ya + 7] = P.y, cb[Ya + 8] = P.z, cb[Ya + 9] = ba.x, cb[Ya + 10] = ba.y, cb[Ya + 11] = ba.z, Ya += 12;
                k.bindBuffer(k.ARRAY_BUFFER, C.__webglVertexBuffer);
                k.bufferData(k.ARRAY_BUFFER, cb, H)
              }
              if (Yb) {
                bb = 0;
                for (ab = ac.length; bb < ab; bb++) {
                  E = ga = 0;
                  for (D = sa.length; E < D; E++) Ua = sa[E], Q = kb[Ua], R = ac[bb].vertices[Q.a], S = ac[bb].vertices[Q.b], P = ac[bb].vertices[Q.c], Za = yb[bb], Za[ga] = R.x, Za[ga + 1] = R.y, Za[ga + 2] = R.z, Za[ga + 3] = S.x, Za[ga + 4] = S.y, Za[ga + 5] = S.z, Za[ga + 6] = P.x, Za[ga + 7] = P.y, Za[ga + 8] = P.z, J.morphNormals && (M ? (Qa = Ib[bb].vertexNormals[Ua],
                    ha = Qa.a, Ha = Qa.b, ia = Qa.c) : ia = Ha = ha = Ib[bb].faceNormals[Ua], $a = Ab[bb], $a[ga] = ha.x, $a[ga + 1] = ha.y, $a[ga + 2] = ha.z, $a[ga + 3] = Ha.x, $a[ga + 4] = Ha.y, $a[ga + 5] = Ha.z, $a[ga + 6] = ia.x, $a[ga + 7] = ia.y, $a[ga + 8] = ia.z), ga += 9;
                  E = 0;
                  for (D = ta.length; E < D; E++) Ua = ta[E], Q = kb[Ua], R = ac[bb].vertices[Q.a], S = ac[bb].vertices[Q.b], P = ac[bb].vertices[Q.c], ba = ac[bb].vertices[Q.d], Za = yb[bb], Za[ga] = R.x, Za[ga + 1] = R.y, Za[ga + 2] = R.z, Za[ga + 3] = S.x, Za[ga + 4] = S.y, Za[ga + 5] = S.z, Za[ga + 6] = P.x, Za[ga + 7] = P.y, Za[ga + 8] = P.z, Za[ga + 9] = ba.x, Za[ga + 10] = ba.y, Za[ga + 11] =
                    ba.z, J.morphNormals && (M ? (Qa = Ib[bb].vertexNormals[Ua], ha = Qa.a, Ha = Qa.b, ia = Qa.c, eb = Qa.d) : eb = ia = Ha = ha = Ib[bb].faceNormals[Ua], $a = Ab[bb], $a[ga] = ha.x, $a[ga + 1] = ha.y, $a[ga + 2] = ha.z, $a[ga + 3] = Ha.x, $a[ga + 4] = Ha.y, $a[ga + 5] = Ha.z, $a[ga + 6] = ia.x, $a[ga + 7] = ia.y, $a[ga + 8] = ia.z, $a[ga + 9] = eb.x, $a[ga + 10] = eb.y, $a[ga + 11] = eb.z), ga += 12;
                  k.bindBuffer(k.ARRAY_BUFFER, C.__webglMorphTargetsBuffers[bb]);
                  k.bufferData(k.ARRAY_BUFFER, yb[bb], H);
                  J.morphNormals && (k.bindBuffer(k.ARRAY_BUFFER, C.__webglMorphNormalsBuffers[bb]), k.bufferData(k.ARRAY_BUFFER,
                    Ab[bb], H))
                }
              }
              if ($b.length) {
                E = 0;
                for (D = sa.length; E < D; E++) Q = kb[sa[E]], oa = $b[Q.a], pa = $b[Q.b], ra = $b[Q.c], Na[Y] = oa.x, Na[Y + 1] = oa.y, Na[Y + 2] = oa.z, Na[Y + 3] = oa.w, Na[Y + 4] = pa.x, Na[Y + 5] = pa.y, Na[Y + 6] = pa.z, Na[Y + 7] = pa.w, Na[Y + 8] = ra.x, Na[Y + 9] = ra.y, Na[Y + 10] = ra.z, Na[Y + 11] = ra.w, va = dc[Q.a], wa = dc[Q.b], xa = dc[Q.c], Ma[Y] = va.x, Ma[Y + 1] = va.y, Ma[Y + 2] = va.z, Ma[Y + 3] = va.w, Ma[Y + 4] = wa.x, Ma[Y + 5] = wa.y, Ma[Y + 6] = wa.z, Ma[Y + 7] = wa.w, Ma[Y + 8] = xa.x, Ma[Y + 9] = xa.y, Ma[Y + 10] = xa.z, Ma[Y + 11] = xa.w, Y += 12;
                E = 0;
                for (D = ta.length; E < D; E++) Q = kb[ta[E]], oa = $b[Q.a],
                  pa = $b[Q.b], ra = $b[Q.c], Ca = $b[Q.d], Na[Y] = oa.x, Na[Y + 1] = oa.y, Na[Y + 2] = oa.z, Na[Y + 3] = oa.w, Na[Y + 4] = pa.x, Na[Y + 5] = pa.y, Na[Y + 6] = pa.z, Na[Y + 7] = pa.w, Na[Y + 8] = ra.x, Na[Y + 9] = ra.y, Na[Y + 10] = ra.z, Na[Y + 11] = ra.w, Na[Y + 12] = Ca.x, Na[Y + 13] = Ca.y, Na[Y + 14] = Ca.z, Na[Y + 15] = Ca.w, va = dc[Q.a], wa = dc[Q.b], xa = dc[Q.c], pb = dc[Q.d], Ma[Y] = va.x, Ma[Y + 1] = va.y, Ma[Y + 2] = va.z, Ma[Y + 3] = va.w, Ma[Y + 4] = wa.x, Ma[Y + 5] = wa.y, Ma[Y + 6] = wa.z, Ma[Y + 7] = wa.w, Ma[Y + 8] = xa.x, Ma[Y + 9] = xa.y, Ma[Y + 10] = xa.z, Ma[Y + 11] = xa.w, Ma[Y + 12] = pb.x, Ma[Y + 13] = pb.y, Ma[Y + 14] = pb.z, Ma[Y + 15] = pb.w,
                  Y += 16;
                0 < Y && (k.bindBuffer(k.ARRAY_BUFFER, C.__webglSkinIndicesBuffer), k.bufferData(k.ARRAY_BUFFER, Ma, H), k.bindBuffer(k.ARRAY_BUFFER, C.__webglSkinWeightsBuffer), k.bufferData(k.ARRAY_BUFFER, Na, H))
              }
              if (Xb && K) {
                E = 0;
                for (D = sa.length; E < D; E++) Q = kb[sa[E]], T = Q.vertexColors, X = Q.color, 3 === T.length && K === THREE.VertexColors ? (ka = T[0], na = T[1], la = T[2]) : la = na = ka = X, db[Va] = ka.r, db[Va + 1] = ka.g, db[Va + 2] = ka.b, db[Va + 3] = na.r, db[Va + 4] = na.g, db[Va + 5] = na.b, db[Va + 6] = la.r, db[Va + 7] = la.g, db[Va + 8] = la.b, Va += 9;
                E = 0;
                for (D = ta.length; E < D; E++) Q =
                  kb[ta[E]], T = Q.vertexColors, X = Q.color, 4 === T.length && K === THREE.VertexColors ? (ka = T[0], na = T[1], la = T[2], ua = T[3]) : ua = la = na = ka = X, db[Va] = ka.r, db[Va + 1] = ka.g, db[Va + 2] = ka.b, db[Va + 3] = na.r, db[Va + 4] = na.g, db[Va + 5] = na.b, db[Va + 6] = la.r, db[Va + 7] = la.g, db[Va + 8] = la.b, db[Va + 9] = ua.r, db[Va + 10] = ua.g, db[Va + 11] = ua.b, Va += 12;
                0 < Va && (k.bindBuffer(k.ARRAY_BUFFER, C.__webglColorBuffer), k.bufferData(k.ARRAY_BUFFER, db, H))
              }
              if (Sb && qb.hasTangents) {
                E = 0;
                for (D = sa.length; E < D; E++) Q = kb[sa[E]], qa = Q.vertexTangents, Z = qa[0], da = qa[1], ya = qa[2], La[Da] =
                  Z.x, La[Da + 1] = Z.y, La[Da + 2] = Z.z, La[Da + 3] = Z.w, La[Da + 4] = da.x, La[Da + 5] = da.y, La[Da + 6] = da.z, La[Da + 7] = da.w, La[Da + 8] = ya.x, La[Da + 9] = ya.y, La[Da + 10] = ya.z, La[Da + 11] = ya.w, Da += 12;
                E = 0;
                for (D = ta.length; E < D; E++) Q = kb[ta[E]], qa = Q.vertexTangents, Z = qa[0], da = qa[1], ya = qa[2], ja = qa[3], La[Da] = Z.x, La[Da + 1] = Z.y, La[Da + 2] = Z.z, La[Da + 3] = Z.w, La[Da + 4] = da.x, La[Da + 5] = da.y, La[Da + 6] = da.z, La[Da + 7] = da.w, La[Da + 8] = ya.x, La[Da + 9] = ya.y, La[Da + 10] = ya.z, La[Da + 11] = ya.w, La[Da + 12] = ja.x, La[Da + 13] = ja.y, La[Da + 14] = ja.z, La[Da + 15] = ja.w, Da += 16;
                k.bindBuffer(k.ARRAY_BUFFER,
                  C.__webglTangentBuffer);
                k.bufferData(k.ARRAY_BUFFER, La, H)
              }
              if (Rb && V) {
                E = 0;
                for (D = sa.length; E < D; E++)
                  if (Q = kb[sa[E]], O = Q.vertexNormals, ea = Q.normal, 3 === O.length && M)
                    for (za = 0; 3 > za; za++) Fa = O[za], Sa[jb] = Fa.x, Sa[jb + 1] = Fa.y, Sa[jb + 2] = Fa.z, jb += 3;
                  else
                    for (za = 0; 3 > za; za++) Sa[jb] = ea.x, Sa[jb + 1] = ea.y, Sa[jb + 2] = ea.z, jb += 3;
                E = 0;
                for (D = ta.length; E < D; E++)
                  if (Q = kb[ta[E]], O = Q.vertexNormals, ea = Q.normal, 4 === O.length && M)
                    for (za = 0; 4 > za; za++) Fa = O[za], Sa[jb] = Fa.x, Sa[jb + 1] = Fa.y, Sa[jb + 2] = Fa.z, jb += 3;
                  else
                    for (za = 0; 4 > za; za++) Sa[jb] = ea.x, Sa[jb +
                      1] = ea.y, Sa[jb + 2] = ea.z, jb += 3;
                k.bindBuffer(k.ARRAY_BUFFER, C.__webglNormalBuffer);
                k.bufferData(k.ARRAY_BUFFER, Sa, H)
              }
              if (Hb && Jb && L) {
                E = 0;
                for (D = sa.length; E < D; E++)
                  if (N = sa[E], fa = Jb[N], void 0 !== fa)
                    for (za = 0; 3 > za; za++) Pa = fa[za], fb[Wa] = Pa.x, fb[Wa + 1] = Pa.y, Wa += 2;
                E = 0;
                for (D = ta.length; E < D; E++)
                  if (N = ta[E], fa = Jb[N], void 0 !== fa)
                    for (za = 0; 4 > za; za++) Pa = fa[za], fb[Wa] = Pa.x, fb[Wa + 1] = Pa.y, Wa += 2;
                0 < Wa && (k.bindBuffer(k.ARRAY_BUFFER, C.__webglUVBuffer), k.bufferData(k.ARRAY_BUFFER, fb, H))
              }
              if (Hb && Lb && L) {
                E = 0;
                for (D = sa.length; E < D; E++)
                  if (N =
                    sa[E], aa = Lb[N], void 0 !== aa)
                    for (za = 0; 3 > za; za++) Ra = aa[za], ib[Xa] = Ra.x, ib[Xa + 1] = Ra.y, Xa += 2;
                E = 0;
                for (D = ta.length; E < D; E++)
                  if (N = ta[E], aa = Lb[N], void 0 !== aa)
                    for (za = 0; 4 > za; za++) Ra = aa[za], ib[Xa] = Ra.x, ib[Xa + 1] = Ra.y, Xa += 2;
                0 < Xa && (k.bindBuffer(k.ARRAY_BUFFER, C.__webglUV2Buffer), k.bufferData(k.ARRAY_BUFFER, ib, H))
              }
              if (Gb) {
                E = 0;
                for (D = sa.length; E < D; E++) Mb[Ka] = Ta, Mb[Ka + 1] = Ta + 1, Mb[Ka + 2] = Ta + 2, Ka += 3, wb[ob] = Ta, wb[ob + 1] = Ta + 1, wb[ob + 2] = Ta, wb[ob + 3] = Ta + 2, wb[ob + 4] = Ta + 1, wb[ob + 5] = Ta + 2, ob += 6, Ta += 3;
                E = 0;
                for (D = ta.length; E < D; E++) Mb[Ka] =
                  Ta, Mb[Ka + 1] = Ta + 1, Mb[Ka + 2] = Ta + 3, Mb[Ka + 3] = Ta + 1, Mb[Ka + 4] = Ta + 2, Mb[Ka + 5] = Ta + 3, Ka += 6, wb[ob] = Ta, wb[ob + 1] = Ta + 1, wb[ob + 2] = Ta, wb[ob + 3] = Ta + 3, wb[ob + 4] = Ta + 1, wb[ob + 5] = Ta + 2, wb[ob + 6] = Ta + 2, wb[ob + 7] = Ta + 3, ob += 8, Ta += 4;
                k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, C.__webglFaceBuffer);
                k.bufferData(k.ELEMENT_ARRAY_BUFFER, Mb, H);
                k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, C.__webglLineBuffer);
                k.bufferData(k.ELEMENT_ARRAY_BUFFER, wb, H)
              }
              if (Bb) {
                za = 0;
                for (ub = Bb.length; za < ub; za++)
                  if (u = Bb[za], u.__original.needsUpdate) {
                    x = 0;
                    if (1 === u.size)
                      if (void 0 ===
                        u.boundTo || "vertices" === u.boundTo) {
                        E = 0;
                        for (D = sa.length; E < D; E++) Q = kb[sa[E]], u.array[x] = u.value[Q.a], u.array[x + 1] = u.value[Q.b], u.array[x + 2] = u.value[Q.c], x += 3;
                        E = 0;
                        for (D = ta.length; E < D; E++) Q = kb[ta[E]], u.array[x] = u.value[Q.a], u.array[x + 1] = u.value[Q.b], u.array[x + 2] = u.value[Q.c], u.array[x + 3] = u.value[Q.d], x += 4
                      } else {
                        if ("faces" === u.boundTo) {
                          E = 0;
                          for (D = sa.length; E < D; E++) Aa = u.value[sa[E]], u.array[x] = Aa, u.array[x + 1] = Aa, u.array[x + 2] = Aa, x += 3;
                          E = 0;
                          for (D = ta.length; E < D; E++) Aa = u.value[ta[E]], u.array[x] = Aa, u.array[x + 1] =
                            Aa, u.array[x + 2] = Aa, u.array[x + 3] = Aa, x += 4
                        }
                      }
                    else if (2 === u.size)
                      if (void 0 === u.boundTo || "vertices" === u.boundTo) {
                        E = 0;
                        for (D = sa.length; E < D; E++) Q = kb[sa[E]], R = u.value[Q.a], S = u.value[Q.b], P = u.value[Q.c], u.array[x] = R.x, u.array[x + 1] = R.y, u.array[x + 2] = S.x, u.array[x + 3] = S.y, u.array[x + 4] = P.x, u.array[x + 5] = P.y, x += 6;
                        E = 0;
                        for (D = ta.length; E < D; E++) Q = kb[ta[E]], R = u.value[Q.a], S = u.value[Q.b], P = u.value[Q.c], ba = u.value[Q.d], u.array[x] = R.x, u.array[x + 1] = R.y, u.array[x + 2] = S.x, u.array[x + 3] = S.y, u.array[x + 4] = P.x, u.array[x + 5] = P.y, u.array[x +
                          6] = ba.x, u.array[x + 7] = ba.y, x += 8
                      } else {
                        if ("faces" === u.boundTo) {
                          E = 0;
                          for (D = sa.length; E < D; E++) P = S = R = Aa = u.value[sa[E]], u.array[x] = R.x, u.array[x + 1] = R.y, u.array[x + 2] = S.x, u.array[x + 3] = S.y, u.array[x + 4] = P.x, u.array[x + 5] = P.y, x += 6;
                          E = 0;
                          for (D = ta.length; E < D; E++) ba = P = S = R = Aa = u.value[ta[E]], u.array[x] = R.x, u.array[x + 1] = R.y, u.array[x + 2] = S.x, u.array[x + 3] = S.y, u.array[x + 4] = P.x, u.array[x + 5] = P.y, u.array[x + 6] = ba.x, u.array[x + 7] = ba.y, x += 8
                        }
                      }
                    else if (3 === u.size) {
                      var W;
                      W = "c" === u.type ? ["r", "g", "b"] : ["x", "y", "z"];
                      if (void 0 === u.boundTo ||
                        "vertices" === u.boundTo) {
                        E = 0;
                        for (D = sa.length; E < D; E++) Q = kb[sa[E]], R = u.value[Q.a], S = u.value[Q.b], P = u.value[Q.c], u.array[x] = R[W[0]], u.array[x + 1] = R[W[1]], u.array[x + 2] = R[W[2]], u.array[x + 3] = S[W[0]], u.array[x + 4] = S[W[1]], u.array[x + 5] = S[W[2]], u.array[x + 6] = P[W[0]], u.array[x + 7] = P[W[1]], u.array[x + 8] = P[W[2]], x += 9;
                        E = 0;
                        for (D = ta.length; E < D; E++) Q = kb[ta[E]], R = u.value[Q.a], S = u.value[Q.b], P = u.value[Q.c], ba = u.value[Q.d], u.array[x] = R[W[0]], u.array[x + 1] = R[W[1]], u.array[x + 2] = R[W[2]], u.array[x + 3] = S[W[0]], u.array[x + 4] = S[W[1]],
                          u.array[x + 5] = S[W[2]], u.array[x + 6] = P[W[0]], u.array[x + 7] = P[W[1]], u.array[x + 8] = P[W[2]], u.array[x + 9] = ba[W[0]], u.array[x + 10] = ba[W[1]], u.array[x + 11] = ba[W[2]], x += 12
                      } else if ("faces" === u.boundTo) {
                        E = 0;
                        for (D = sa.length; E < D; E++) P = S = R = Aa = u.value[sa[E]], u.array[x] = R[W[0]], u.array[x + 1] = R[W[1]], u.array[x + 2] = R[W[2]], u.array[x + 3] = S[W[0]], u.array[x + 4] = S[W[1]], u.array[x + 5] = S[W[2]], u.array[x + 6] = P[W[0]], u.array[x + 7] = P[W[1]], u.array[x + 8] = P[W[2]], x += 9;
                        E = 0;
                        for (D = ta.length; E < D; E++) ba = P = S = R = Aa = u.value[ta[E]], u.array[x] = R[W[0]],
                          u.array[x + 1] = R[W[1]], u.array[x + 2] = R[W[2]], u.array[x + 3] = S[W[0]], u.array[x + 4] = S[W[1]], u.array[x + 5] = S[W[2]], u.array[x + 6] = P[W[0]], u.array[x + 7] = P[W[1]], u.array[x + 8] = P[W[2]], u.array[x + 9] = ba[W[0]], u.array[x + 10] = ba[W[1]], u.array[x + 11] = ba[W[2]], x += 12
                      } else if ("faceVertices" === u.boundTo) {
                        E = 0;
                        for (D = sa.length; E < D; E++) Aa = u.value[sa[E]], R = Aa[0], S = Aa[1], P = Aa[2], u.array[x] = R[W[0]], u.array[x + 1] = R[W[1]], u.array[x + 2] = R[W[2]], u.array[x + 3] = S[W[0]], u.array[x + 4] = S[W[1]], u.array[x + 5] = S[W[2]], u.array[x + 6] = P[W[0]], u.array[x +
                          7] = P[W[1]], u.array[x + 8] = P[W[2]], x += 9;
                        E = 0;
                        for (D = ta.length; E < D; E++) Aa = u.value[ta[E]], R = Aa[0], S = Aa[1], P = Aa[2], ba = Aa[3], u.array[x] = R[W[0]], u.array[x + 1] = R[W[1]], u.array[x + 2] = R[W[2]], u.array[x + 3] = S[W[0]], u.array[x + 4] = S[W[1]], u.array[x + 5] = S[W[2]], u.array[x + 6] = P[W[0]], u.array[x + 7] = P[W[1]], u.array[x + 8] = P[W[2]], u.array[x + 9] = ba[W[0]], u.array[x + 10] = ba[W[1]], u.array[x + 11] = ba[W[2]], x += 12
                      }
                    } else if (4 === u.size)
                      if (void 0 === u.boundTo || "vertices" === u.boundTo) {
                        E = 0;
                        for (D = sa.length; E < D; E++) Q = kb[sa[E]], R = u.value[Q.a], S =
                          u.value[Q.b], P = u.value[Q.c], u.array[x] = R.x, u.array[x + 1] = R.y, u.array[x + 2] = R.z, u.array[x + 3] = R.w, u.array[x + 4] = S.x, u.array[x + 5] = S.y, u.array[x + 6] = S.z, u.array[x + 7] = S.w, u.array[x + 8] = P.x, u.array[x + 9] = P.y, u.array[x + 10] = P.z, u.array[x + 11] = P.w, x += 12;
                        E = 0;
                        for (D = ta.length; E < D; E++) Q = kb[ta[E]], R = u.value[Q.a], S = u.value[Q.b], P = u.value[Q.c], ba = u.value[Q.d], u.array[x] = R.x, u.array[x + 1] = R.y, u.array[x + 2] = R.z, u.array[x + 3] = R.w, u.array[x + 4] = S.x, u.array[x + 5] = S.y, u.array[x + 6] = S.z, u.array[x + 7] = S.w, u.array[x + 8] = P.x, u.array[x + 9] =
                          P.y, u.array[x + 10] = P.z, u.array[x + 11] = P.w, u.array[x + 12] = ba.x, u.array[x + 13] = ba.y, u.array[x + 14] = ba.z, u.array[x + 15] = ba.w, x += 16
                      } else if ("faces" === u.boundTo) {
                      E = 0;
                      for (D = sa.length; E < D; E++) P = S = R = Aa = u.value[sa[E]], u.array[x] = R.x, u.array[x + 1] = R.y, u.array[x + 2] = R.z, u.array[x + 3] = R.w, u.array[x + 4] = S.x, u.array[x + 5] = S.y, u.array[x + 6] = S.z, u.array[x + 7] = S.w, u.array[x + 8] = P.x, u.array[x + 9] = P.y, u.array[x + 10] = P.z, u.array[x + 11] = P.w, x += 12;
                      E = 0;
                      for (D = ta.length; E < D; E++) ba = P = S = R = Aa = u.value[ta[E]], u.array[x] = R.x, u.array[x + 1] = R.y, u.array[x +
                        2] = R.z, u.array[x + 3] = R.w, u.array[x + 4] = S.x, u.array[x + 5] = S.y, u.array[x + 6] = S.z, u.array[x + 7] = S.w, u.array[x + 8] = P.x, u.array[x + 9] = P.y, u.array[x + 10] = P.z, u.array[x + 11] = P.w, u.array[x + 12] = ba.x, u.array[x + 13] = ba.y, u.array[x + 14] = ba.z, u.array[x + 15] = ba.w, x += 16
                    } else if ("faceVertices" === u.boundTo) {
                      E = 0;
                      for (D = sa.length; E < D; E++) Aa = u.value[sa[E]], R = Aa[0], S = Aa[1], P = Aa[2], u.array[x] = R.x, u.array[x + 1] = R.y, u.array[x + 2] = R.z, u.array[x + 3] = R.w, u.array[x + 4] = S.x, u.array[x + 5] = S.y, u.array[x + 6] = S.z, u.array[x + 7] = S.w, u.array[x + 8] = P.x,
                        u.array[x + 9] = P.y, u.array[x + 10] = P.z, u.array[x + 11] = P.w, x += 12;
                      E = 0;
                      for (D = ta.length; E < D; E++) Aa = u.value[ta[E]], R = Aa[0], S = Aa[1], P = Aa[2], ba = Aa[3], u.array[x] = R.x, u.array[x + 1] = R.y, u.array[x + 2] = R.z, u.array[x + 3] = R.w, u.array[x + 4] = S.x, u.array[x + 5] = S.y, u.array[x + 6] = S.z, u.array[x + 7] = S.w, u.array[x + 8] = P.x, u.array[x + 9] = P.y, u.array[x + 10] = P.z, u.array[x + 11] = P.w, u.array[x + 12] = ba.x, u.array[x + 13] = ba.y, u.array[x + 14] = ba.z, u.array[x + 15] = ba.w, x += 16
                    }
                    k.bindBuffer(k.ARRAY_BUFFER, u.buffer);
                    k.bufferData(k.ARRAY_BUFFER, u.array, H)
                  }
              }
              I &&
                (delete C.__inittedArrays, delete C.__colorArray, delete C.__normalArray, delete C.__tangentArray, delete C.__uvArray, delete C.__uv2Array, delete C.__faceArray, delete C.__vertexArray, delete C.__lineArray, delete C.__skinIndexArray, delete C.__skinWeightArray)
            }
          } j.verticesNeedUpdate = !1;
        j.morphTargetsNeedUpdate = !1;
        j.elementsNeedUpdate = !1;
        j.uvsNeedUpdate = !1;
        j.normalsNeedUpdate = !1;
        j.colorsNeedUpdate = !1;
        j.tangentsNeedUpdate = !1;
        j.buffersNeedUpdate = !1;
        p.attributes && s(p)
      } else if (i instanceof THREE.Ribbon) {
        p = e(i,
          j);
        n = p.attributes && r(p);
        if (j.verticesNeedUpdate || j.colorsNeedUpdate || j.normalsNeedUpdate || n) {
          var Cb = j,
            Kb = k.DYNAMIC_DRAW,
            nc = void 0,
            oc = void 0,
            pc = void 0,
            Tb = void 0,
            Ba = void 0,
            Ub = void 0,
            xc = void 0,
            yc = void 0,
            gc = void 0,
            gb = void 0,
            hc = void 0,
            Ia = void 0,
            rb = void 0,
            kc = Cb.vertices,
            lc = Cb.colors,
            mc = Cb.normals,
            uc = kc.length,
            vc = lc.length,
            Yc = mc.length,
            zc = Cb.__vertexArray,
            Ac = Cb.__colorArray,
            Bc = Cb.__normalArray,
            Zc = Cb.colorsNeedUpdate,
            $c = Cb.normalsNeedUpdate,
            Lc = Cb.__webglCustomAttributesList;
          if (Cb.verticesNeedUpdate) {
            for (nc =
              0; nc < uc; nc++) Tb = kc[nc], Ba = 3 * nc, zc[Ba] = Tb.x, zc[Ba + 1] = Tb.y, zc[Ba + 2] = Tb.z;
            k.bindBuffer(k.ARRAY_BUFFER, Cb.__webglVertexBuffer);
            k.bufferData(k.ARRAY_BUFFER, zc, Kb)
          }
          if (Zc) {
            for (oc = 0; oc < vc; oc++) Ub = lc[oc], Ba = 3 * oc, Ac[Ba] = Ub.r, Ac[Ba + 1] = Ub.g, Ac[Ba + 2] = Ub.b;
            k.bindBuffer(k.ARRAY_BUFFER, Cb.__webglColorBuffer);
            k.bufferData(k.ARRAY_BUFFER, Ac, Kb)
          }
          if ($c) {
            for (pc = 0; pc < Yc; pc++) xc = mc[pc], Ba = 3 * pc, Bc[Ba] = xc.x, Bc[Ba + 1] = xc.y, Bc[Ba + 2] = xc.z;
            k.bindBuffer(k.ARRAY_BUFFER, Cb.__webglNormalBuffer);
            k.bufferData(k.ARRAY_BUFFER, Bc, Kb)
          }
          if (Lc) {
            yc =
              0;
            for (gc = Lc.length; yc < gc; yc++)
              if (Ia = Lc[yc], Ia.needsUpdate && (void 0 === Ia.boundTo || "vertices" === Ia.boundTo)) {
                Ba = 0;
                hc = Ia.value.length;
                if (1 === Ia.size)
                  for (gb = 0; gb < hc; gb++) Ia.array[gb] = Ia.value[gb];
                else if (2 === Ia.size)
                  for (gb = 0; gb < hc; gb++) rb = Ia.value[gb], Ia.array[Ba] = rb.x, Ia.array[Ba + 1] = rb.y, Ba += 2;
                else if (3 === Ia.size)
                  if ("c" === Ia.type)
                    for (gb = 0; gb < hc; gb++) rb = Ia.value[gb], Ia.array[Ba] = rb.r, Ia.array[Ba + 1] = rb.g, Ia.array[Ba + 2] = rb.b, Ba += 3;
                  else
                    for (gb = 0; gb < hc; gb++) rb = Ia.value[gb], Ia.array[Ba] = rb.x, Ia.array[Ba + 1] =
                      rb.y, Ia.array[Ba + 2] = rb.z, Ba += 3;
                else if (4 === Ia.size)
                  for (gb = 0; gb < hc; gb++) rb = Ia.value[gb], Ia.array[Ba] = rb.x, Ia.array[Ba + 1] = rb.y, Ia.array[Ba + 2] = rb.z, Ia.array[Ba + 3] = rb.w, Ba += 4;
                k.bindBuffer(k.ARRAY_BUFFER, Ia.buffer);
                k.bufferData(k.ARRAY_BUFFER, Ia.array, Kb)
              }
          }
        }
        j.verticesNeedUpdate = !1;
        j.colorsNeedUpdate = !1;
        j.normalsNeedUpdate = !1;
        p.attributes && s(p)
      } else if (i instanceof THREE.Line) {
        p = e(i, j);
        n = p.attributes && r(p);
        if (j.verticesNeedUpdate || j.colorsNeedUpdate || j.lineDistancesNeedUpdate || n) {
          var Db = j,
            Cc = k.DYNAMIC_DRAW,
            qc = void 0,
            rc = void 0,
            sc = void 0,
            Dc = void 0,
            Oa = void 0,
            Ec = void 0,
            Qc = Db.vertices,
            Rc = Db.colors,
            Sc = Db.lineDistances,
            ad = Qc.length,
            bd = Rc.length,
            cd = Sc.length,
            Fc = Db.__vertexArray,
            Gc = Db.__colorArray,
            Tc = Db.__lineDistanceArray,
            dd = Db.colorsNeedUpdate,
            ed = Db.lineDistancesNeedUpdate,
            Mc = Db.__webglCustomAttributesList,
            Hc = void 0,
            Uc = void 0,
            hb = void 0,
            ic = void 0,
            sb = void 0,
            Ja = void 0;
          if (Db.verticesNeedUpdate) {
            for (qc = 0; qc < ad; qc++) Dc = Qc[qc], Oa = 3 * qc, Fc[Oa] = Dc.x, Fc[Oa + 1] = Dc.y, Fc[Oa + 2] = Dc.z;
            k.bindBuffer(k.ARRAY_BUFFER, Db.__webglVertexBuffer);
            k.bufferData(k.ARRAY_BUFFER, Fc, Cc)
          }
          if (dd) {
            for (rc = 0; rc < bd; rc++) Ec = Rc[rc], Oa = 3 * rc, Gc[Oa] = Ec.r, Gc[Oa + 1] = Ec.g, Gc[Oa + 2] = Ec.b;
            k.bindBuffer(k.ARRAY_BUFFER, Db.__webglColorBuffer);
            k.bufferData(k.ARRAY_BUFFER, Gc, Cc)
          }
          if (ed) {
            for (sc = 0; sc < cd; sc++) Tc[sc] = Sc[sc];
            k.bindBuffer(k.ARRAY_BUFFER, Db.__webglLineDistanceBuffer);
            k.bufferData(k.ARRAY_BUFFER, Tc, Cc)
          }
          if (Mc) {
            Hc = 0;
            for (Uc = Mc.length; Hc < Uc; Hc++)
              if (Ja = Mc[Hc], Ja.needsUpdate && (void 0 === Ja.boundTo || "vertices" === Ja.boundTo)) {
                Oa = 0;
                ic = Ja.value.length;
                if (1 === Ja.size)
                  for (hb =
                    0; hb < ic; hb++) Ja.array[hb] = Ja.value[hb];
                else if (2 === Ja.size)
                  for (hb = 0; hb < ic; hb++) sb = Ja.value[hb], Ja.array[Oa] = sb.x, Ja.array[Oa + 1] = sb.y, Oa += 2;
                else if (3 === Ja.size)
                  if ("c" === Ja.type)
                    for (hb = 0; hb < ic; hb++) sb = Ja.value[hb], Ja.array[Oa] = sb.r, Ja.array[Oa + 1] = sb.g, Ja.array[Oa + 2] = sb.b, Oa += 3;
                  else
                    for (hb = 0; hb < ic; hb++) sb = Ja.value[hb], Ja.array[Oa] = sb.x, Ja.array[Oa + 1] = sb.y, Ja.array[Oa + 2] = sb.z, Oa += 3;
                else if (4 === Ja.size)
                  for (hb = 0; hb < ic; hb++) sb = Ja.value[hb], Ja.array[Oa] = sb.x, Ja.array[Oa + 1] = sb.y, Ja.array[Oa + 2] = sb.z, Ja.array[Oa +
                    3] = sb.w, Oa += 4;
                k.bindBuffer(k.ARRAY_BUFFER, Ja.buffer);
                k.bufferData(k.ARRAY_BUFFER, Ja.array, Cc)
              }
          }
        }
        j.verticesNeedUpdate = !1;
        j.colorsNeedUpdate = !1;
        j.lineDistancesNeedUpdate = !1;
        p.attributes && s(p)
      } else if (i instanceof THREE.ParticleSystem) {
        p = e(i, j);
        n = p.attributes && r(p);
        if (j.verticesNeedUpdate || j.colorsNeedUpdate || i.sortParticles || n) {
          var Nb = j,
            Nc = k.DYNAMIC_DRAW,
            tc = i,
            tb = void 0,
            Ob = void 0,
            Pb = void 0,
            ca = void 0,
            Qb = void 0,
            bc = void 0,
            Ic = Nb.vertices,
            Oc = Ic.length,
            Pc = Nb.colors,
            Vc = Pc.length,
            ec = Nb.__vertexArray,
            fc = Nb.__colorArray,
            Vb = Nb.__sortArray,
            Wc = Nb.verticesNeedUpdate,
            Xc = Nb.colorsNeedUpdate,
            Wb = Nb.__webglCustomAttributesList,
            Eb = void 0,
            jc = void 0,
            ma = void 0,
            Fb = void 0,
            Ea = void 0,
            $ = void 0;
          if (tc.sortParticles) {
            lb.copy(xb);
            lb.multiply(tc.matrixWorld);
            for (tb = 0; tb < Oc; tb++) Pb = Ic[tb], Ga.copy(Pb), Ga.applyProjection(lb), Vb[tb] = [Ga.z, tb];
            Vb.sort(l);
            for (tb = 0; tb < Oc; tb++) Pb = Ic[Vb[tb][1]], ca = 3 * tb, ec[ca] = Pb.x, ec[ca + 1] = Pb.y, ec[ca + 2] = Pb.z;
            for (Ob = 0; Ob < Vc; Ob++) ca = 3 * Ob, bc = Pc[Vb[Ob][1]], fc[ca] = bc.r, fc[ca + 1] = bc.g, fc[ca + 2] = bc.b;
            if (Wb) {
              Eb = 0;
              for (jc =
                Wb.length; Eb < jc; Eb++)
                if ($ = Wb[Eb], void 0 === $.boundTo || "vertices" === $.boundTo)
                  if (ca = 0, Fb = $.value.length, 1 === $.size)
                    for (ma = 0; ma < Fb; ma++) Qb = Vb[ma][1], $.array[ma] = $.value[Qb];
                  else if (2 === $.size)
                for (ma = 0; ma < Fb; ma++) Qb = Vb[ma][1], Ea = $.value[Qb], $.array[ca] = Ea.x, $.array[ca + 1] = Ea.y, ca += 2;
              else if (3 === $.size)
                if ("c" === $.type)
                  for (ma = 0; ma < Fb; ma++) Qb = Vb[ma][1], Ea = $.value[Qb], $.array[ca] = Ea.r, $.array[ca + 1] = Ea.g, $.array[ca + 2] = Ea.b, ca += 3;
                else
                  for (ma = 0; ma < Fb; ma++) Qb = Vb[ma][1], Ea = $.value[Qb], $.array[ca] = Ea.x, $.array[ca +
                    1] = Ea.y, $.array[ca + 2] = Ea.z, ca += 3;
              else if (4 === $.size)
                for (ma = 0; ma < Fb; ma++) Qb = Vb[ma][1], Ea = $.value[Qb], $.array[ca] = Ea.x, $.array[ca + 1] = Ea.y, $.array[ca + 2] = Ea.z, $.array[ca + 3] = Ea.w, ca += 4
            }
          } else {
            if (Wc)
              for (tb = 0; tb < Oc; tb++) Pb = Ic[tb], ca = 3 * tb, ec[ca] = Pb.x, ec[ca + 1] = Pb.y, ec[ca + 2] = Pb.z;
            if (Xc)
              for (Ob = 0; Ob < Vc; Ob++) bc = Pc[Ob], ca = 3 * Ob, fc[ca] = bc.r, fc[ca + 1] = bc.g, fc[ca + 2] = bc.b;
            if (Wb) {
              Eb = 0;
              for (jc = Wb.length; Eb < jc; Eb++)
                if ($ = Wb[Eb], $.needsUpdate && (void 0 === $.boundTo || "vertices" === $.boundTo))
                  if (Fb = $.value.length, ca = 0, 1 === $.size)
                    for (ma =
                      0; ma < Fb; ma++) $.array[ma] = $.value[ma];
                  else if (2 === $.size)
                for (ma = 0; ma < Fb; ma++) Ea = $.value[ma], $.array[ca] = Ea.x, $.array[ca + 1] = Ea.y, ca += 2;
              else if (3 === $.size)
                if ("c" === $.type)
                  for (ma = 0; ma < Fb; ma++) Ea = $.value[ma], $.array[ca] = Ea.r, $.array[ca + 1] = Ea.g, $.array[ca + 2] = Ea.b, ca += 3;
                else
                  for (ma = 0; ma < Fb; ma++) Ea = $.value[ma], $.array[ca] = Ea.x, $.array[ca + 1] = Ea.y, $.array[ca + 2] = Ea.z, ca += 3;
              else if (4 === $.size)
                for (ma = 0; ma < Fb; ma++) Ea = $.value[ma], $.array[ca] = Ea.x, $.array[ca + 1] = Ea.y, $.array[ca + 2] = Ea.z, $.array[ca + 3] = Ea.w, ca += 4
            }
          }
          if (Wc ||
            tc.sortParticles) k.bindBuffer(k.ARRAY_BUFFER, Nb.__webglVertexBuffer), k.bufferData(k.ARRAY_BUFFER, ec, Nc);
          if (Xc || tc.sortParticles) k.bindBuffer(k.ARRAY_BUFFER, Nb.__webglColorBuffer), k.bufferData(k.ARRAY_BUFFER, fc, Nc);
          if (Wb) {
            Eb = 0;
            for (jc = Wb.length; Eb < jc; Eb++)
              if ($ = Wb[Eb], $.needsUpdate || tc.sortParticles) k.bindBuffer(k.ARRAY_BUFFER, $.buffer), k.bufferData(k.ARRAY_BUFFER, $.array, Nc)
          }
        }
        j.verticesNeedUpdate = !1;
        j.colorsNeedUpdate = !1;
        p.attributes && s(p)
      }
    }
  };
  this.initMaterial = function (a, b, c, d) {
    var e, f, h, g;
    a.addEventListener("dispose",
      uc);
    var i, j, l, m, n;
    a instanceof THREE.MeshDepthMaterial ? n = "depth" : a instanceof THREE.MeshNormalMaterial ? n = "normal" : a instanceof THREE.MeshBasicMaterial ? n = "basic" : a instanceof THREE.MeshLambertMaterial ? n = "lambert" : a instanceof THREE.MeshPhongMaterial ? n = "phong" : a instanceof THREE.LineBasicMaterial ? n = "basic" : a instanceof THREE.LineDashedMaterial ? n = "dashed" : a instanceof THREE.ParticleBasicMaterial && (n = "particle_basic");
    if (n) {
      var p = THREE.ShaderLib[n];
      a.uniforms = THREE.UniformsUtils.clone(p.uniforms);
      a.vertexShader =
        p.vertexShader;
      a.fragmentShader = p.fragmentShader
    }
    var q = e = 0,
      r = 0;
    f = p = 0;
    for (var s = b.length; f < s; f++) h = b[f], h.onlyShadow || (h instanceof THREE.DirectionalLight && e++, h instanceof THREE.PointLight && q++, h instanceof THREE.SpotLight && r++, h instanceof THREE.HemisphereLight && p++);
    f = q;
    h = r;
    g = p;
    r = p = 0;
    for (q = b.length; r < q; r++) s = b[r], s.castShadow && (s instanceof THREE.SpotLight && p++, s instanceof THREE.DirectionalLight && !s.shadowCascade && p++);
    m = p;
    Bb && d && d.useVertexTexture ? l = 1024 : (b = k.getParameter(k.MAX_VERTEX_UNIFORM_VECTORS),
      b = Math.floor((b - 20) / 4), void 0 !== d && d instanceof THREE.SkinnedMesh && (b = Math.min(d.bones.length, b), b < d.bones.length && console.warn("WebGLRenderer: too many bones - " + d.bones.length + ", this GPU supports just " + b + " (try OpenGL instead of ANGLE)")), l = b);
    a: {
      var r = a.fragmentShader,
        q = a.vertexShader,
        p = a.uniforms,
        b = a.attributes,
        s = a.defines,
        c = {
          map: !!a.map,
          envMap: !!a.envMap,
          lightMap: !!a.lightMap,
          bumpMap: !!a.bumpMap,
          normalMap: !!a.normalMap,
          specularMap: !!a.specularMap,
          vertexColors: a.vertexColors,
          fog: c,
          useFog: a.fog,
          fogExp: c instanceof THREE.FogExp2,
          sizeAttenuation: a.sizeAttenuation,
          skinning: a.skinning,
          maxBones: l,
          useVertexTexture: Bb && d && d.useVertexTexture,
          boneTextureWidth: d && d.boneTextureWidth,
          boneTextureHeight: d && d.boneTextureHeight,
          morphTargets: a.morphTargets,
          morphNormals: a.morphNormals,
          maxMorphTargets: this.maxMorphTargets,
          maxMorphNormals: this.maxMorphNormals,
          maxDirLights: e,
          maxPointLights: f,
          maxSpotLights: h,
          maxHemiLights: g,
          maxShadows: m,
          shadowMapEnabled: this.shadowMapEnabled && d.receiveShadow,
          shadowMapType: this.shadowMapType,
          shadowMapDebug: this.shadowMapDebug,
          shadowMapCascade: this.shadowMapCascade,
          alphaTest: a.alphaTest,
          metal: a.metal,
          perPixel: a.perPixel,
          wrapAround: a.wrapAround,
          doubleSided: a.side === THREE.DoubleSide,
          flipSided: a.side === THREE.BackSide
        },
        t, v, w, d = [];n ? d.push(n) : (d.push(r), d.push(q));
      for (v in s) d.push(v),
      d.push(s[v]);
      for (t in c) d.push(t),
      d.push(c[t]);n = d.join();t = 0;
      for (v = V.length; t < v; t++)
        if (d = V[t], d.code === n) {
          d.usedTimes++;
          j = d.program;
          break a
        } t = "SHADOWMAP_TYPE_BASIC";c.shadowMapType === THREE.PCFShadowMap ? t = "SHADOWMAP_TYPE_PCF" : c.shadowMapType === THREE.PCFSoftShadowMap && (t = "SHADOWMAP_TYPE_PCF_SOFT");v = [];
      for (w in s) d = s[w],
      !1 !== d && (d = "#define " + w + " " + d, v.push(d));d = v.join("\n");w = k.createProgram();v = ["precision " + L + " float;", d, Gb ? "#define VERTEX_TEXTURES" : "", D.gammaInput ? "#define GAMMA_INPUT" : "", D.gammaOutput ? "#define GAMMA_OUTPUT" : "", D.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "", "#define MAX_DIR_LIGHTS " + c.maxDirLights, "#define MAX_POINT_LIGHTS " + c.maxPointLights, "#define MAX_SPOT_LIGHTS " + c.maxSpotLights,
        "#define MAX_HEMI_LIGHTS " + c.maxHemiLights, "#define MAX_SHADOWS " + c.maxShadows, "#define MAX_BONES " + c.maxBones, c.map ? "#define USE_MAP" : "", c.envMap ? "#define USE_ENVMAP" : "", c.lightMap ? "#define USE_LIGHTMAP" : "", c.bumpMap ? "#define USE_BUMPMAP" : "", c.normalMap ? "#define USE_NORMALMAP" : "", c.specularMap ? "#define USE_SPECULARMAP" : "", c.vertexColors ? "#define USE_COLOR" : "", c.skinning ? "#define USE_SKINNING" : "", c.useVertexTexture ? "#define BONE_TEXTURE" : "", c.boneTextureWidth ? "#define N_BONE_PIXEL_X " + c.boneTextureWidth.toFixed(1) :
        "", c.boneTextureHeight ? "#define N_BONE_PIXEL_Y " + c.boneTextureHeight.toFixed(1) : "", c.morphTargets ? "#define USE_MORPHTARGETS" : "", c.morphNormals ? "#define USE_MORPHNORMALS" : "", c.perPixel ? "#define PHONG_PER_PIXEL" : "", c.wrapAround ? "#define WRAP_AROUND" : "", c.doubleSided ? "#define DOUBLE_SIDED" : "", c.flipSided ? "#define FLIP_SIDED" : "", c.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", c.shadowMapEnabled ? "#define " + t : "", c.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", c.shadowMapCascade ? "#define SHADOWMAP_CASCADE" :
        "", c.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", "uniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\n#ifdef USE_MORPHNORMALS\nattribute vec3 morphNormal0;\nattribute vec3 morphNormal1;\nattribute vec3 morphNormal2;\nattribute vec3 morphNormal3;\n#else\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"
      ].join("\n");
      t = ["precision " + L + " float;", c.bumpMap || c.normalMap ? "#extension GL_OES_standard_derivatives : enable" : "", d, "#define MAX_DIR_LIGHTS " + c.maxDirLights, "#define MAX_POINT_LIGHTS " + c.maxPointLights, "#define MAX_SPOT_LIGHTS " + c.maxSpotLights, "#define MAX_HEMI_LIGHTS " + c.maxHemiLights, "#define MAX_SHADOWS " + c.maxShadows, c.alphaTest ? "#define ALPHATEST " + c.alphaTest : "", D.gammaInput ? "#define GAMMA_INPUT" : "", D.gammaOutput ? "#define GAMMA_OUTPUT" : "", D.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "",
        c.useFog && c.fog ? "#define USE_FOG" : "", c.useFog && c.fogExp ? "#define FOG_EXP2" : "", c.map ? "#define USE_MAP" : "", c.envMap ? "#define USE_ENVMAP" : "", c.lightMap ? "#define USE_LIGHTMAP" : "", c.bumpMap ? "#define USE_BUMPMAP" : "", c.normalMap ? "#define USE_NORMALMAP" : "", c.specularMap ? "#define USE_SPECULARMAP" : "", c.vertexColors ? "#define USE_COLOR" : "", c.metal ? "#define METAL" : "", c.perPixel ? "#define PHONG_PER_PIXEL" : "", c.wrapAround ? "#define WRAP_AROUND" : "", c.doubleSided ? "#define DOUBLE_SIDED" : "", c.flipSided ? "#define FLIP_SIDED" :
        "", c.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", c.shadowMapEnabled ? "#define " + t : "", c.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", c.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"
      ].join("\n");v = J("vertex", v + q);t = J("fragment", t + r);k.attachShader(w, v);k.attachShader(w, t);k.linkProgram(w);k.getProgramParameter(w, k.LINK_STATUS) || console.error("Could not initialise shader\nVALIDATE_STATUS: " + k.getProgramParameter(w, k.VALIDATE_STATUS) + ", gl error [" +
        k.getError() + "]");k.deleteShader(t);k.deleteShader(v);w.uniforms = {};w.attributes = {};
      var z;t = "viewMatrix modelViewMatrix projectionMatrix normalMatrix modelMatrix cameraPosition morphTargetInfluences".split(" ");c.useVertexTexture ? t.push("boneTexture") : t.push("boneGlobalMatrices");
      for (z in p) t.push(z);z = t;t = 0;
      for (v = z.length; t < v; t++) p = z[t],
      w.uniforms[p] = k.getUniformLocation(w, p);t = "position normal uv uv2 tangent color skinIndex skinWeight lineDistance".split(" ");
      for (z = 0; z < c.maxMorphTargets; z++) t.push("morphTarget" +
        z);
      for (z = 0; z < c.maxMorphNormals; z++) t.push("morphNormal" + z);
      for (j in b) t.push(j);j = t;z = 0;
      for (b = j.length; z < b; z++) t = j[z],
      w.attributes[t] = k.getAttribLocation(w, t);w.id = ea++;V.push({
        program: w,
        code: n,
        usedTimes: 1
      });D.info.memory.programs = V.length;j = w
    }
    a.program = j;
    z = a.program.attributes;
    if (a.morphTargets) {
      a.numSupportedMorphTargets = 0;
      b = "morphTarget";
      for (j = 0; j < this.maxMorphTargets; j++) w = b + j, 0 <= z[w] && a.numSupportedMorphTargets++
    }
    if (a.morphNormals) {
      a.numSupportedMorphNormals = 0;
      b = "morphNormal";
      for (j = 0; j < this.maxMorphNormals; j++) w =
        b + j, 0 <= z[w] && a.numSupportedMorphNormals++
    }
    a.uniformsList = [];
    for (i in a.uniforms) a.uniformsList.push([a.uniforms[i], i])
  };
  this.setFaceCulling = function (a, b) {
    a === THREE.CullFaceNone ? k.disable(k.CULL_FACE) : (b === THREE.FrontFaceDirectionCW ? k.frontFace(k.CW) : k.frontFace(k.CCW), a === THREE.CullFaceBack ? k.cullFace(k.BACK) : a === THREE.CullFaceFront ? k.cullFace(k.FRONT) : k.cullFace(k.FRONT_AND_BACK), k.enable(k.CULL_FACE))
  };
  this.setMaterialFaces = function (a) {
    var b = a.side === THREE.DoubleSide,
      a = a.side === THREE.BackSide;
    da !==
      b && (b ? k.disable(k.CULL_FACE) : k.enable(k.CULL_FACE), da = b);
    T !== a && (a ? k.frontFace(k.CW) : k.frontFace(k.CCW), T = a)
  };
  this.setDepthTest = function (a) {
    xa !== a && (a ? k.enable(k.DEPTH_TEST) : k.disable(k.DEPTH_TEST), xa = a)
  };
  this.setDepthWrite = function (a) {
    ab !== a && (k.depthMask(a), ab = a)
  };
  this.setBlending = function (a, b, c, d) {
    a !== aa && (a === THREE.NoBlending ? k.disable(k.BLEND) : a === THREE.AdditiveBlending ? (k.enable(k.BLEND), k.blendEquation(k.FUNC_ADD), k.blendFunc(k.SRC_ALPHA, k.ONE)) : a === THREE.SubtractiveBlending ? (k.enable(k.BLEND),
      k.blendEquation(k.FUNC_ADD), k.blendFunc(k.ZERO, k.ONE_MINUS_SRC_COLOR)) : a === THREE.MultiplyBlending ? (k.enable(k.BLEND), k.blendEquation(k.FUNC_ADD), k.blendFunc(k.ZERO, k.SRC_COLOR)) : a === THREE.CustomBlending ? k.enable(k.BLEND) : (k.enable(k.BLEND), k.blendEquationSeparate(k.FUNC_ADD, k.FUNC_ADD), k.blendFuncSeparate(k.SRC_ALPHA, k.ONE_MINUS_SRC_ALPHA, k.ONE, k.ONE_MINUS_SRC_ALPHA)), aa = a);
    if (a === THREE.CustomBlending) {
      if (b !== na && (k.blendEquation(w(b)), na = b), c !== ha || d !== X) k.blendFunc(w(c), w(d)), ha = c, X = d
    } else X = ha =
      na = null
  };
  this.setTexture = function (a, b) {
    if (a.needsUpdate) {
      a.__webglInit || (a.__webglInit = !0, a.addEventListener("dispose", gc), a.__webglTexture = k.createTexture(), D.info.memory.textures++);
      k.activeTexture(k.TEXTURE0 + b);
      k.bindTexture(k.TEXTURE_2D, a.__webglTexture);
      k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL, a.flipY);
      k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL, a.premultiplyAlpha);
      k.pixelStorei(k.UNPACK_ALIGNMENT, a.unpackAlignment);
      var c = a.image,
        d = 0 === (c.width & c.width - 1) && 0 === (c.height & c.height - 1),
        e = w(a.format),
        f = w(a.type);
      N(k.TEXTURE_2D, a, d);
      var h = a.mipmaps;
      if (a instanceof THREE.DataTexture)
        if (0 < h.length && d) {
          for (var g = 0, i = h.length; g < i; g++) c = h[g], k.texImage2D(k.TEXTURE_2D, g, e, c.width, c.height, 0, e, f, c.data);
          a.generateMipmaps = !1
        } else k.texImage2D(k.TEXTURE_2D, 0, e, c.width, c.height, 0, e, f, c.data);
      else if (a instanceof THREE.CompressedTexture) {
        g = 0;
        for (i = h.length; g < i; g++) c = h[g], k.compressedTexImage2D(k.TEXTURE_2D, g, e, c.width, c.height, 0, c.data)
      } else if (0 < h.length && d) {
        g = 0;
        for (i = h.length; g < i; g++) c = h[g], k.texImage2D(k.TEXTURE_2D,
          g, e, e, f, c);
        a.generateMipmaps = !1
      } else k.texImage2D(k.TEXTURE_2D, 0, e, e, f, a.image);
      a.generateMipmaps && d && k.generateMipmap(k.TEXTURE_2D);
      a.needsUpdate = !1;
      if (a.onUpdate) a.onUpdate()
    } else k.activeTexture(k.TEXTURE0 + b), k.bindTexture(k.TEXTURE_2D, a.__webglTexture)
  };
  this.setRenderTarget = function (a) {
    var b = a instanceof THREE.WebGLRenderTargetCube;
    if (a && !a.__webglFramebuffer) {
      void 0 === a.depthBuffer && (a.depthBuffer = !0);
      void 0 === a.stencilBuffer && (a.stencilBuffer = !0);
      a.addEventListener("dispose", mc);
      a.__webglTexture =
        k.createTexture();
      D.info.memory.textures++;
      var c = 0 === (a.width & a.width - 1) && 0 === (a.height & a.height - 1),
        d = w(a.format),
        e = w(a.type);
      if (b) {
        a.__webglFramebuffer = [];
        a.__webglRenderbuffer = [];
        k.bindTexture(k.TEXTURE_CUBE_MAP, a.__webglTexture);
        N(k.TEXTURE_CUBE_MAP, a, c);
        for (var f = 0; 6 > f; f++) {
          a.__webglFramebuffer[f] = k.createFramebuffer();
          a.__webglRenderbuffer[f] = k.createRenderbuffer();
          k.texImage2D(k.TEXTURE_CUBE_MAP_POSITIVE_X + f, 0, d, a.width, a.height, 0, d, e, null);
          var h = a,
            g = k.TEXTURE_CUBE_MAP_POSITIVE_X + f;
          k.bindFramebuffer(k.FRAMEBUFFER,
            a.__webglFramebuffer[f]);
          k.framebufferTexture2D(k.FRAMEBUFFER, k.COLOR_ATTACHMENT0, g, h.__webglTexture, 0);
          y(a.__webglRenderbuffer[f], a)
        }
        c && k.generateMipmap(k.TEXTURE_CUBE_MAP)
      } else a.__webglFramebuffer = k.createFramebuffer(), a.__webglRenderbuffer = a.shareDepthFrom ? a.shareDepthFrom.__webglRenderbuffer : k.createRenderbuffer(), k.bindTexture(k.TEXTURE_2D, a.__webglTexture), N(k.TEXTURE_2D, a, c), k.texImage2D(k.TEXTURE_2D, 0, d, a.width, a.height, 0, d, e, null), d = k.TEXTURE_2D, k.bindFramebuffer(k.FRAMEBUFFER, a.__webglFramebuffer),
        k.framebufferTexture2D(k.FRAMEBUFFER, k.COLOR_ATTACHMENT0, d, a.__webglTexture, 0), a.shareDepthFrom ? a.depthBuffer && !a.stencilBuffer ? k.framebufferRenderbuffer(k.FRAMEBUFFER, k.DEPTH_ATTACHMENT, k.RENDERBUFFER, a.__webglRenderbuffer) : a.depthBuffer && a.stencilBuffer && k.framebufferRenderbuffer(k.FRAMEBUFFER, k.DEPTH_STENCIL_ATTACHMENT, k.RENDERBUFFER, a.__webglRenderbuffer) : y(a.__webglRenderbuffer, a), c && k.generateMipmap(k.TEXTURE_2D);
      b ? k.bindTexture(k.TEXTURE_CUBE_MAP, null) : k.bindTexture(k.TEXTURE_2D, null);
      k.bindRenderbuffer(k.RENDERBUFFER,
        null);
      k.bindFramebuffer(k.FRAMEBUFFER, null)
    }
    a ? (b = b ? a.__webglFramebuffer[a.activeCubeFace] : a.__webglFramebuffer, c = a.width, a = a.height, e = d = 0) : (b = null, c = Qa, a = Xa, d = ua, e = Ra);
    b !== eb && (k.bindFramebuffer(k.FRAMEBUFFER, b), k.viewport(d, e, c, a), eb = b);
    Xb = c;
    Jb = a
  };
  this.shadowMapPlugin = new THREE.ShadowMapPlugin;
  this.addPrePlugin(this.shadowMapPlugin);
  this.addPostPlugin(new THREE.SpritePlugin);
  this.addPostPlugin(new THREE.LensFlarePlugin)
};
THREE.WebGLRenderTarget = function (a, b, c) {
  this.width = a;
  this.height = b;
  c = c || {};
  this.wrapS = void 0 !== c.wrapS ? c.wrapS : THREE.ClampToEdgeWrapping;
  this.wrapT = void 0 !== c.wrapT ? c.wrapT : THREE.ClampToEdgeWrapping;
  this.magFilter = void 0 !== c.magFilter ? c.magFilter : THREE.LinearFilter;
  this.minFilter = void 0 !== c.minFilter ? c.minFilter : THREE.LinearMipMapLinearFilter;
  this.anisotropy = void 0 !== c.anisotropy ? c.anisotropy : 1;
  this.offset = new THREE.Vector2(0, 0);
  this.repeat = new THREE.Vector2(1, 1);
  this.format = void 0 !== c.format ? c.format :
    THREE.RGBAFormat;
  this.type = void 0 !== c.type ? c.type : THREE.UnsignedByteType;
  this.depthBuffer = void 0 !== c.depthBuffer ? c.depthBuffer : !0;
  this.stencilBuffer = void 0 !== c.stencilBuffer ? c.stencilBuffer : !0;
  this.generateMipmaps = !0;
  this.shareDepthFrom = null
};
THREE.WebGLRenderTarget.prototype = {
  constructor: THREE.WebGLRenderTarget,
  clone: function () {
    var a = new THREE.WebGLRenderTarget(this.width, this.height);
    a.wrapS = this.wrapS;
    a.wrapT = this.wrapT;
    a.magFilter = this.magFilter;
    a.minFilter = this.minFilter;
    a.anisotropy = this.anisotropy;
    a.offset.copy(this.offset);
    a.repeat.copy(this.repeat);
    a.format = this.format;
    a.type = this.type;
    a.depthBuffer = this.depthBuffer;
    a.stencilBuffer = this.stencilBuffer;
    a.generateMipmaps = this.generateMipmaps;
    a.shareDepthFrom = this.shareDepthFrom;
    return a
  },
  dispose: function () {
    this.dispatchEvent({
      type: "dispose"
    })
  }
};
THREE.EventDispatcher.prototype.apply(THREE.WebGLRenderTarget.prototype);
THREE.WebGLRenderTargetCube = function (a, b, c) {
  THREE.WebGLRenderTarget.call(this, a, b, c);
  this.activeCubeFace = 0
};
THREE.WebGLRenderTargetCube.prototype = Object.create(THREE.WebGLRenderTarget.prototype);
THREE.RenderableVertex = function () {
  this.positionWorld = new THREE.Vector3;
  this.positionScreen = new THREE.Vector4;
  this.visible = !0
};
THREE.RenderableVertex.prototype.copy = function (a) {
  this.positionWorld.copy(a.positionWorld);
  this.positionScreen.copy(a.positionScreen)
};
THREE.RenderableFace3 = function () {
  this.id = 0;
  this.v1 = new THREE.RenderableVertex;
  this.v2 = new THREE.RenderableVertex;
  this.v3 = new THREE.RenderableVertex;
  this.centroidModel = new THREE.Vector3;
  this.normalModel = new THREE.Vector3;
  this.normalModelView = new THREE.Vector3;
  this.vertexNormalsLength = 0;
  this.vertexNormalsModel = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
  this.vertexNormalsModelView = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
  this.material = this.color = null;
  this.uvs = [
    []
  ];
  this.z =
    0
};
THREE.RenderableFace4 = function () {
  this.id = 0;
  this.v1 = new THREE.RenderableVertex;
  this.v2 = new THREE.RenderableVertex;
  this.v3 = new THREE.RenderableVertex;
  this.v4 = new THREE.RenderableVertex;
  this.centroidModel = new THREE.Vector3;
  this.normalModel = new THREE.Vector3;
  this.normalModelView = new THREE.Vector3;
  this.vertexNormalsLength = 0;
  this.vertexNormalsModel = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
  this.vertexNormalsModelView = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3,
    new THREE.Vector3
  ];
  this.material = this.color = null;
  this.uvs = [
    []
  ];
  this.z = 0
};
THREE.RenderableObject = function () {
  this.id = 0;
  this.object = null;
  this.z = 0
};
THREE.RenderableParticle = function () {
  this.id = 0;
  this.object = null;
  this.z = this.y = this.x = 0;
  this.rotation = null;
  this.scale = new THREE.Vector2;
  this.material = null
};
THREE.RenderableLine = function () {
  this.id = 0;
  this.v1 = new THREE.RenderableVertex;
  this.v2 = new THREE.RenderableVertex;
  this.vertexColors = [new THREE.Color, new THREE.Color];
  this.material = null;
  this.z = 0
};
THREE.GeometryUtils = {
  merge: function (a, b, c) {
    var d, e, f = a.vertices.length,
      h = b instanceof THREE.Mesh ? b.geometry : b,
      g = a.vertices,
      i = h.vertices,
      j = a.faces,
      l = h.faces,
      a = a.faceVertexUvs[0],
      h = h.faceVertexUvs[0];
    void 0 === c && (c = 0);
    b instanceof THREE.Mesh && (b.matrixAutoUpdate && b.updateMatrix(), d = b.matrix, e = (new THREE.Matrix3).getNormalMatrix(d));
    for (var b = 0, m = i.length; b < m; b++) {
      var n = i[b].clone();
      d && n.applyMatrix4(d);
      g.push(n)
    }
    b = 0;
    for (m = l.length; b < m; b++) {
      var n = l[b],
        p, t, q = n.vertexNormals,
        r = n.vertexColors;
      n instanceof
      THREE.Face3 ? p = new THREE.Face3(n.a + f, n.b + f, n.c + f) : n instanceof THREE.Face4 && (p = new THREE.Face4(n.a + f, n.b + f, n.c + f, n.d + f));
      p.normal.copy(n.normal);
      e && p.normal.applyMatrix3(e).normalize();
      g = 0;
      for (i = q.length; g < i; g++) t = q[g].clone(), e && t.applyMatrix3(e).normalize(), p.vertexNormals.push(t);
      p.color.copy(n.color);
      g = 0;
      for (i = r.length; g < i; g++) t = r[g], p.vertexColors.push(t.clone());
      p.materialIndex = n.materialIndex + c;
      p.centroid.copy(n.centroid);
      d && p.centroid.applyMatrix4(d);
      j.push(p)
    }
    b = 0;
    for (m = h.length; b < m; b++) {
      c =
        h[b];
      d = [];
      g = 0;
      for (i = c.length; g < i; g++) d.push(new THREE.Vector2(c[g].x, c[g].y));
      a.push(d)
    }
  },
  removeMaterials: function (a, b) {
    for (var c = {}, d = 0, e = b.length; d < e; d++) c[b[d]] = !0;
    for (var f, h = [], d = 0, e = a.faces.length; d < e; d++) f = a.faces[d], f.materialIndex in c || h.push(f);
    a.faces = h
  },
  randomPointInTriangle: function () {
    var a = new THREE.Vector3;
    return function (b, c, d) {
      var e = new THREE.Vector3,
        f = THREE.Math.random16(),
        h = THREE.Math.random16();
      1 < f + h && (f = 1 - f, h = 1 - h);
      var g = 1 - f - h;
      e.copy(b);
      e.multiplyScalar(f);
      a.copy(c);
      a.multiplyScalar(h);
      e.add(a);
      a.copy(d);
      a.multiplyScalar(g);
      e.add(a);
      return e
    }
  }(),
  randomPointInFace: function (a, b, c) {
    var d, e, f;
    if (a instanceof THREE.Face3) return d = b.vertices[a.a], e = b.vertices[a.b], f = b.vertices[a.c], THREE.GeometryUtils.randomPointInTriangle(d, e, f);
    if (a instanceof THREE.Face4) {
      d = b.vertices[a.a];
      e = b.vertices[a.b];
      f = b.vertices[a.c];
      var b = b.vertices[a.d],
        h;
      c ? a._area1 && a._area2 ? (c = a._area1, h = a._area2) : (c = THREE.GeometryUtils.triangleArea(d, e, b), h = THREE.GeometryUtils.triangleArea(e, f, b), a._area1 = c, a._area2 = h) :
        (c = THREE.GeometryUtils.triangleArea(d, e, b), h = THREE.GeometryUtils.triangleArea(e, f, b));
      return THREE.Math.random16() * (c + h) < c ? THREE.GeometryUtils.randomPointInTriangle(d, e, b) : THREE.GeometryUtils.randomPointInTriangle(e, f, b)
    }
  },
  randomPointsInGeometry: function (a, b) {
    function c(a) {
      function b(c, d) {
        if (d < c) return c;
        var e = c + Math.floor((d - c) / 2);
        return j[e] > a ? b(c, e - 1) : j[e] < a ? b(e + 1, d) : e
      }
      return b(0, j.length - 1)
    }
    var d, e, f = a.faces,
      h = a.vertices,
      g = f.length,
      i = 0,
      j = [],
      l, m, n, p;
    for (e = 0; e < g; e++) d = f[e], d instanceof THREE.Face3 ?
      (l = h[d.a], m = h[d.b], n = h[d.c], d._area = THREE.GeometryUtils.triangleArea(l, m, n)) : d instanceof THREE.Face4 && (l = h[d.a], m = h[d.b], n = h[d.c], p = h[d.d], d._area1 = THREE.GeometryUtils.triangleArea(l, m, p), d._area2 = THREE.GeometryUtils.triangleArea(m, n, p), d._area = d._area1 + d._area2), i += d._area, j[e] = i;
    d = [];
    for (e = 0; e < b; e++) h = THREE.Math.random16() * i, h = c(h), d[e] = THREE.GeometryUtils.randomPointInFace(f[h], a, !0);
    return d
  },
  triangleArea: function () {
    var a = new THREE.Vector3,
      b = new THREE.Vector3;
    return function (c, d, e) {
      a.subVectors(d,
        c);
      b.subVectors(e, c);
      a.cross(b);
      return 0.5 * a.length()
    }
  }(),
  center: function (a) {
    a.computeBoundingBox();
    var b = a.boundingBox,
      c = new THREE.Vector3;
    c.addVectors(b.min, b.max);
    c.multiplyScalar(-0.5);
    a.applyMatrix((new THREE.Matrix4).makeTranslation(c.x, c.y, c.z));
    a.computeBoundingBox();
    return c
  },
  triangulateQuads: function (a) {
    var b, c, d, e, f = [],
      h = [],
      g = [];
    b = 0;
    for (c = a.faceUvs.length; b < c; b++) h[b] = [];
    b = 0;
    for (c = a.faceVertexUvs.length; b < c; b++) g[b] = [];
    b = 0;
    for (c = a.faces.length; b < c; b++)
      if (d = a.faces[b], d instanceof THREE.Face4) {
        e =
          d.a;
        var i = d.b,
          j = d.c,
          l = d.d,
          m = new THREE.Face3,
          n = new THREE.Face3;
        m.color.copy(d.color);
        n.color.copy(d.color);
        m.materialIndex = d.materialIndex;
        n.materialIndex = d.materialIndex;
        m.a = e;
        m.b = i;
        m.c = l;
        n.a = i;
        n.b = j;
        n.c = l;
        4 === d.vertexColors.length && (m.vertexColors[0] = d.vertexColors[0].clone(), m.vertexColors[1] = d.vertexColors[1].clone(), m.vertexColors[2] = d.vertexColors[3].clone(), n.vertexColors[0] = d.vertexColors[1].clone(), n.vertexColors[1] = d.vertexColors[2].clone(), n.vertexColors[2] = d.vertexColors[3].clone());
        f.push(m,
          n);
        d = 0;
        for (e = a.faceVertexUvs.length; d < e; d++) a.faceVertexUvs[d].length && (m = a.faceVertexUvs[d][b], i = m[1], j = m[2], l = m[3], m = [m[0].clone(), i.clone(), l.clone()], i = [i.clone(), j.clone(), l.clone()], g[d].push(m, i));
        d = 0;
        for (e = a.faceUvs.length; d < e; d++) a.faceUvs[d].length && (i = a.faceUvs[d][b], h[d].push(i, i))
      } else {
        f.push(d);
        d = 0;
        for (e = a.faceUvs.length; d < e; d++) h[d].push(a.faceUvs[d][b]);
        d = 0;
        for (e = a.faceVertexUvs.length; d < e; d++) g[d].push(a.faceVertexUvs[d][b])
      } a.faces = f;
    a.faceUvs = h;
    a.faceVertexUvs = g;
    a.computeCentroids();
    a.computeFaceNormals();
    a.computeVertexNormals();
    a.hasTangents && a.computeTangents()
  },
  setMaterialIndex: function (a, b, c, d) {
    a = a.faces;
    d = d || a.length - 1;
    for (c = c || 0; c <= d; c++) a[c].materialIndex = b
  }
};
THREE.ImageUtils = {
  crossOrigin: "anonymous",
  loadTexture: function (a, b, c) {
    var d = new Image,
      e = new THREE.Texture(d, b),
      b = new THREE.ImageLoader;
    b.crossOrigin = this.crossOrigin;
    b.load(a, function (a) {
      e.image = a;
      e.needsUpdate = !0;
      c && c(e)
    });
    e.sourceFile = a;
    return e
  },
  loadCompressedTexture: function (a, b, c, d) {
    var e = new THREE.CompressedTexture;
    e.mapping = b;
    var f = new XMLHttpRequest;
    f.onload = function () {
      var a = THREE.ImageUtils.parseDDS(f.response, !0);
      e.format = a.format;
      e.mipmaps = a.mipmaps;
      e.image.width = a.width;
      e.image.height =
        a.height;
      e.generateMipmaps = !1;
      e.needsUpdate = !0;
      c && c(e)
    };
    f.onerror = d;
    f.open("GET", a, !0);
    f.responseType = "arraybuffer";
    f.send(null);
    return e
  },
  loadTextureCube: function (a, b, c, d) {
    var e = [];
    e.loadCount = 0;
    var f = new THREE.Texture;
    f.image = e;
    void 0 !== b && (f.mapping = b);
    f.flipY = !1;
    for (var b = 0, h = a.length; b < h; ++b) {
      var g = new Image;
      e[b] = g;
      g.onload = function () {
        e.loadCount += 1;
        6 === e.loadCount && (f.needsUpdate = !0, c && c(f))
      };
      g.onerror = d;
      g.crossOrigin = this.crossOrigin;
      g.src = a[b]
    }
    return f
  },
  loadCompressedTextureCube: function (a,
    b, c, d) {
    var e = [];
    e.loadCount = 0;
    var f = new THREE.CompressedTexture;
    f.image = e;
    void 0 !== b && (f.mapping = b);
    f.flipY = !1;
    f.generateMipmaps = !1;
    b = function (a, b) {
      return function () {
        var d = THREE.ImageUtils.parseDDS(a.response, !0);
        b.format = d.format;
        b.mipmaps = d.mipmaps;
        b.width = d.width;
        b.height = d.height;
        e.loadCount += 1;
        6 === e.loadCount && (f.format = d.format, f.needsUpdate = !0, c && c(f))
      }
    };
    if (a instanceof Array)
      for (var h = 0, g = a.length; h < g; ++h) {
        var i = {};
        e[h] = i;
        var j = new XMLHttpRequest;
        j.onload = b(j, i);
        j.onerror = d;
        i = a[h];
        j.open("GET",
          i, !0);
        j.responseType = "arraybuffer";
        j.send(null)
      } else j = new XMLHttpRequest, j.onload = function () {
        var a = THREE.ImageUtils.parseDDS(j.response, !0);
        if (a.isCubemap) {
          for (var b = a.mipmaps.length / a.mipmapCount, d = 0; d < b; d++) {
            e[d] = {
              mipmaps: []
            };
            for (var h = 0; h < a.mipmapCount; h++) e[d].mipmaps.push(a.mipmaps[d * a.mipmapCount + h]), e[d].format = a.format, e[d].width = a.width, e[d].height = a.height
          }
          f.format = a.format;
          f.needsUpdate = !0;
          c && c(f)
        }
      }, j.onerror = d, j.open("GET", a, !0), j.responseType = "arraybuffer", j.send(null);
    return f
  },
  parseDDS: function (a,
    b) {
    function c(a) {
      return a.charCodeAt(0) + (a.charCodeAt(1) << 8) + (a.charCodeAt(2) << 16) + (a.charCodeAt(3) << 24)
    }
    var d = {
        mipmaps: [],
        width: 0,
        height: 0,
        format: null,
        mipmapCount: 1
      },
      e = c("DXT1"),
      f = c("DXT3"),
      h = c("DXT5"),
      g = new Int32Array(a, 0, 31);
    if (542327876 !== g[0]) return console.error("ImageUtils.parseDDS(): Invalid magic number in DDS header"), d;
    if (!g[20] & 4) return console.error("ImageUtils.parseDDS(): Unsupported format, must contain a FourCC code"), d;
    var i = g[21];
    switch (i) {
      case e:
        e = 8;
        d.format = THREE.RGB_S3TC_DXT1_Format;
        break;
      case f:
        e = 16;
        d.format = THREE.RGBA_S3TC_DXT3_Format;
        break;
      case h:
        e = 16;
        d.format = THREE.RGBA_S3TC_DXT5_Format;
        break;
      default:
        return console.error("ImageUtils.parseDDS(): Unsupported FourCC code: ", String.fromCharCode(i & 255, i >> 8 & 255, i >> 16 & 255, i >> 24 & 255)), d
    }
    d.mipmapCount = 1;
    g[2] & 131072 && !1 !== b && (d.mipmapCount = Math.max(1, g[7]));
    d.isCubemap = g[28] & 512 ? !0 : !1;
    d.width = g[4];
    d.height = g[3];
    for (var g = g[1] + 4, f = d.width, h = d.height, i = d.isCubemap ? 6 : 1, j = 0; j < i; j++) {
      for (var l = 0; l < d.mipmapCount; l++) {
        var m = Math.max(4, f) /
          4 * Math.max(4, h) / 4 * e,
          n = {
            data: new Uint8Array(a, g, m),
            width: f,
            height: h
          };
        d.mipmaps.push(n);
        g += m;
        f = Math.max(0.5 * f, 1);
        h = Math.max(0.5 * h, 1)
      }
      f = d.width;
      h = d.height
    }
    return d
  },
  getNormalMap: function (a, b) {
    var c = function (a) {
        var b = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
        return [a[0] / b, a[1] / b, a[2] / b]
      },
      b = b | 1,
      d = a.width,
      e = a.height,
      f = document.createElement("canvas");
    f.width = d;
    f.height = e;
    var h = f.getContext("2d");
    h.drawImage(a, 0, 0);
    for (var g = h.getImageData(0, 0, d, e).data, i = h.createImageData(d, e), j = i.data, l = 0; l < d; l++)
      for (var m =
          0; m < e; m++) {
        var n = 0 > m - 1 ? 0 : m - 1,
          p = m + 1 > e - 1 ? e - 1 : m + 1,
          t = 0 > l - 1 ? 0 : l - 1,
          q = l + 1 > d - 1 ? d - 1 : l + 1,
          r = [],
          s = [0, 0, g[4 * (m * d + l)] / 255 * b];
        r.push([-1, 0, g[4 * (m * d + t)] / 255 * b]);
        r.push([-1, -1, g[4 * (n * d + t)] / 255 * b]);
        r.push([0, -1, g[4 * (n * d + l)] / 255 * b]);
        r.push([1, -1, g[4 * (n * d + q)] / 255 * b]);
        r.push([1, 0, g[4 * (m * d + q)] / 255 * b]);
        r.push([1, 1, g[4 * (p * d + q)] / 255 * b]);
        r.push([0, 1, g[4 * (p * d + l)] / 255 * b]);
        r.push([-1, 1, g[4 * (p * d + t)] / 255 * b]);
        n = [];
        t = r.length;
        for (p = 0; p < t; p++) {
          var q = r[p],
            v = r[(p + 1) % t],
            q = [q[0] - s[0], q[1] - s[1], q[2] - s[2]],
            v = [v[0] - s[0], v[1] - s[1], v[2] - s[2]];
          n.push(c([q[1] * v[2] - q[2] * v[1], q[2] * v[0] - q[0] * v[2], q[0] * v[1] - q[1] * v[0]]))
        }
        r = [0, 0, 0];
        for (p = 0; p < n.length; p++) r[0] += n[p][0], r[1] += n[p][1], r[2] += n[p][2];
        r[0] /= n.length;
        r[1] /= n.length;
        r[2] /= n.length;
        s = 4 * (m * d + l);
        j[s] = 255 * ((r[0] + 1) / 2) | 0;
        j[s + 1] = 255 * ((r[1] + 1) / 2) | 0;
        j[s + 2] = 255 * r[2] | 0;
        j[s + 3] = 255
      }
    h.putImageData(i, 0, 0);
    return f
  },
  generateDataTexture: function (a, b, c) {
    for (var d = a * b, e = new Uint8Array(3 * d), f = Math.floor(255 * c.r), h = Math.floor(255 * c.g), c = Math.floor(255 * c.b), g = 0; g < d; g++) e[3 * g] = f, e[3 * g + 1] = h, e[3 * g + 2] = c;
    a = new THREE.DataTexture(e,
      a, b, THREE.RGBFormat);
    a.needsUpdate = !0;
    return a
  }
};
THREE.SceneUtils = {
  createMultiMaterialObject: function (a, b) {
    for (var c = new THREE.Object3D, d = 0, e = b.length; d < e; d++) c.add(new THREE.Mesh(a, b[d]));
    return c
  },
  detach: function (a, b, c) {
    a.applyMatrix(b.matrixWorld);
    b.remove(a);
    c.add(a)
  },
  attach: function (a, b, c) {
    var d = new THREE.Matrix4;
    d.getInverse(c.matrixWorld);
    a.applyMatrix(d);
    b.remove(a);
    c.add(a)
  }
};
THREE.FontUtils = {
  faces: {},
  face: "helvetiker",
  weight: "normal",
  style: "normal",
  size: 150,
  divisions: 10,
  getFace: function () {
    return this.faces[this.face][this.weight][this.style]
  },
  loadFace: function (a) {
    var b = a.familyName.toLowerCase();
    this.faces[b] = this.faces[b] || {};
    this.faces[b][a.cssFontWeight] = this.faces[b][a.cssFontWeight] || {};
    this.faces[b][a.cssFontWeight][a.cssFontStyle] = a;
    return this.faces[b][a.cssFontWeight][a.cssFontStyle] = a
  },
  drawText: function (a) {
    for (var b = this.getFace(), c = this.size / b.resolution, d =
        0, e = String(a).split(""), f = e.length, h = [], a = 0; a < f; a++) {
      var g = new THREE.Path,
        g = this.extractGlyphPoints(e[a], b, c, d, g),
        d = d + g.offset;
      h.push(g.path)
    }
    return {
      paths: h,
      offset: d / 2
    }
  },
  extractGlyphPoints: function (a, b, c, d, e) {
    var f = [],
      h, g, i, j, l, m, n, p, t, q, r, s = b.glyphs[a] || b.glyphs["?"];
    if (s) {
      if (s.o) {
        b = s._cachedOutline || (s._cachedOutline = s.o.split(" "));
        j = b.length;
        for (a = 0; a < j;) switch (i = b[a++], i) {
          case "m":
            i = b[a++] * c + d;
            l = b[a++] * c;
            e.moveTo(i, l);
            break;
          case "l":
            i = b[a++] * c + d;
            l = b[a++] * c;
            e.lineTo(i, l);
            break;
          case "q":
            i = b[a++] *
              c + d;
            l = b[a++] * c;
            p = b[a++] * c + d;
            t = b[a++] * c;
            e.quadraticCurveTo(p, t, i, l);
            if (h = f[f.length - 1]) {
              m = h.x;
              n = h.y;
              h = 1;
              for (g = this.divisions; h <= g; h++) {
                var v = h / g;
                THREE.Shape.Utils.b2(v, m, p, i);
                THREE.Shape.Utils.b2(v, n, t, l)
              }
            }
            break;
          case "b":
            if (i = b[a++] * c + d, l = b[a++] * c, p = b[a++] * c + d, t = b[a++] * -c, q = b[a++] * c + d, r = b[a++] * -c, e.bezierCurveTo(i, l, p, t, q, r), h = f[f.length - 1]) {
              m = h.x;
              n = h.y;
              h = 1;
              for (g = this.divisions; h <= g; h++) v = h / g, THREE.Shape.Utils.b3(v, m, p, q, i), THREE.Shape.Utils.b3(v, n, t, r, l)
            }
        }
      }
      return {
        offset: s.ha * c,
        path: e
      }
    }
  }
};
THREE.FontUtils.generateShapes = function (a, b) {
  var b = b || {},
    c = void 0 !== b.curveSegments ? b.curveSegments : 4,
    d = void 0 !== b.font ? b.font : "helvetiker",
    e = void 0 !== b.weight ? b.weight : "normal",
    f = void 0 !== b.style ? b.style : "normal";
  THREE.FontUtils.size = void 0 !== b.size ? b.size : 100;
  THREE.FontUtils.divisions = c;
  THREE.FontUtils.face = d;
  THREE.FontUtils.weight = e;
  THREE.FontUtils.style = f;
  c = THREE.FontUtils.drawText(a).paths;
  d = [];
  e = 0;
  for (f = c.length; e < f; e++) Array.prototype.push.apply(d, c[e].toShapes());
  return d
};
(function (a) {
  var b = function (a) {
    for (var b = a.length, e = 0, f = b - 1, h = 0; h < b; f = h++) e += a[f].x * a[h].y - a[h].x * a[f].y;
    return 0.5 * e
  };
  a.Triangulate = function (a, d) {
    var e = a.length;
    if (3 > e) return null;
    var f = [],
      h = [],
      g = [],
      i, j, l;
    if (0 < b(a))
      for (j = 0; j < e; j++) h[j] = j;
    else
      for (j = 0; j < e; j++) h[j] = e - 1 - j;
    var m = 2 * e;
    for (j = e - 1; 2 < e;) {
      if (0 >= m--) {
        console.log("Warning, unable to triangulate polygon!");
        break
      }
      i = j;
      e <= i && (i = 0);
      j = i + 1;
      e <= j && (j = 0);
      l = j + 1;
      e <= l && (l = 0);
      var n;
      a: {
        var p = n = void 0,
          t = void 0,
          q = void 0,
          r = void 0,
          s = void 0,
          v = void 0,
          z = void 0,
          C =
          void 0,
          p = a[h[i]].x,
          t = a[h[i]].y,
          q = a[h[j]].x,
          r = a[h[j]].y,
          s = a[h[l]].x,
          v = a[h[l]].y;
        if (1E-10 > (q - p) * (v - t) - (r - t) * (s - p)) n = !1;
        else {
          var F = void 0,
            H = void 0,
            I = void 0,
            G = void 0,
            A = void 0,
            K = void 0,
            B = void 0,
            J = void 0,
            N = void 0,
            y = void 0,
            N = J = B = C = z = void 0,
            F = s - q,
            H = v - r,
            I = p - s,
            G = t - v,
            A = q - p,
            K = r - t;
          for (n = 0; n < e; n++)
            if (!(n === i || n === j || n === l))
              if (z = a[h[n]].x, C = a[h[n]].y, B = z - p, J = C - t, N = z - q, y = C - r, z -= s, C -= v, N = F * y - H * N, B = A * J - K * B, J = I * C - G * z, 0 <= N && 0 <= J && 0 <= B) {
                n = !1;
                break a
              } n = !0
        }
      }
      if (n) {
        f.push([a[h[i]], a[h[j]], a[h[l]]]);
        g.push([h[i], h[j], h[l]]);
        i = j;
        for (l = j + 1; l < e; i++, l++) h[i] = h[l];
        e--;
        m = 2 * e
      }
    }
    return d ? g : f
  };
  a.Triangulate.area = b;
  return a
})(THREE.FontUtils);
self._typeface_js = {
  faces: THREE.FontUtils.faces,
  loadFace: THREE.FontUtils.loadFace
};
THREE.typeface_js = self._typeface_js;
THREE.Curve = function () {};
THREE.Curve.prototype.getPoint = function () {
  console.log("Warning, getPoint() not implemented!");
  return null
};
THREE.Curve.prototype.getPointAt = function (a) {
  a = this.getUtoTmapping(a);
  return this.getPoint(a)
};
THREE.Curve.prototype.getPoints = function (a) {
  a || (a = 5);
  var b, c = [];
  for (b = 0; b <= a; b++) c.push(this.getPoint(b / a));
  return c
};
THREE.Curve.prototype.getSpacedPoints = function (a) {
  a || (a = 5);
  var b, c = [];
  for (b = 0; b <= a; b++) c.push(this.getPointAt(b / a));
  return c
};
THREE.Curve.prototype.getLength = function () {
  var a = this.getLengths();
  return a[a.length - 1]
};
THREE.Curve.prototype.getLengths = function (a) {
  a || (a = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200);
  if (this.cacheArcLengths && this.cacheArcLengths.length == a + 1 && !this.needsUpdate) return this.cacheArcLengths;
  this.needsUpdate = !1;
  var b = [],
    c, d = this.getPoint(0),
    e, f = 0;
  b.push(0);
  for (e = 1; e <= a; e++) c = this.getPoint(e / a), f += c.distanceTo(d), b.push(f), d = c;
  return this.cacheArcLengths = b
};
THREE.Curve.prototype.updateArcLengths = function () {
  this.needsUpdate = !0;
  this.getLengths()
};
THREE.Curve.prototype.getUtoTmapping = function (a, b) {
  var c = this.getLengths(),
    d = 0,
    e = c.length,
    f;
  f = b ? b : a * c[e - 1];
  for (var h = 0, g = e - 1, i; h <= g;)
    if (d = Math.floor(h + (g - h) / 2), i = c[d] - f, 0 > i) h = d + 1;
    else if (0 < i) g = d - 1;
  else {
    g = d;
    break
  }
  d = g;
  if (c[d] == f) return d / (e - 1);
  h = c[d];
  return c = (d + (f - h) / (c[d + 1] - h)) / (e - 1)
};
THREE.Curve.prototype.getTangent = function (a) {
  var b = a - 1E-4,
    a = a + 1E-4;
  0 > b && (b = 0);
  1 < a && (a = 1);
  b = this.getPoint(b);
  return this.getPoint(a).clone().sub(b).normalize()
};
THREE.Curve.prototype.getTangentAt = function (a) {
  a = this.getUtoTmapping(a);
  return this.getTangent(a)
};
THREE.Curve.Utils = {
  tangentQuadraticBezier: function (a, b, c, d) {
    return 2 * (1 - a) * (c - b) + 2 * a * (d - c)
  },
  tangentCubicBezier: function (a, b, c, d, e) {
    return -3 * b * (1 - a) * (1 - a) + 3 * c * (1 - a) * (1 - a) - 6 * a * c * (1 - a) + 6 * a * d * (1 - a) - 3 * a * a * d + 3 * a * a * e
  },
  tangentSpline: function (a) {
    return 6 * a * a - 6 * a + (3 * a * a - 4 * a + 1) + (-6 * a * a + 6 * a) + (3 * a * a - 2 * a)
  },
  interpolate: function (a, b, c, d, e) {
    var a = 0.5 * (c - a),
      d = 0.5 * (d - b),
      f = e * e;
    return (2 * b - 2 * c + a + d) * e * f + (-3 * b + 3 * c - 2 * a - d) * f + a * e + b
  }
};
THREE.Curve.create = function (a, b) {
  a.prototype = Object.create(THREE.Curve.prototype);
  a.prototype.getPoint = b;
  return a
};
THREE.CurvePath = function () {
  this.curves = [];
  this.bends = [];
  this.autoClose = !1
};
THREE.CurvePath.prototype = Object.create(THREE.Curve.prototype);
THREE.CurvePath.prototype.add = function (a) {
  this.curves.push(a)
};
THREE.CurvePath.prototype.checkConnection = function () {};
THREE.CurvePath.prototype.closePath = function () {
  var a = this.curves[0].getPoint(0),
    b = this.curves[this.curves.length - 1].getPoint(1);
  a.equals(b) || this.curves.push(new THREE.LineCurve(b, a))
};
THREE.CurvePath.prototype.getPoint = function (a) {
  for (var b = a * this.getLength(), c = this.getCurveLengths(), a = 0; a < c.length;) {
    if (c[a] >= b) return b = c[a] - b, a = this.curves[a], b = 1 - b / a.getLength(), a.getPointAt(b);
    a++
  }
  return null
};
THREE.CurvePath.prototype.getLength = function () {
  var a = this.getCurveLengths();
  return a[a.length - 1]
};
THREE.CurvePath.prototype.getCurveLengths = function () {
  if (this.cacheLengths && this.cacheLengths.length == this.curves.length) return this.cacheLengths;
  var a = [],
    b = 0,
    c, d = this.curves.length;
  for (c = 0; c < d; c++) b += this.curves[c].getLength(), a.push(b);
  return this.cacheLengths = a
};
THREE.CurvePath.prototype.getBoundingBox = function () {
  var a = this.getPoints(),
    b, c, d, e, f, h;
  b = c = Number.NEGATIVE_INFINITY;
  e = f = Number.POSITIVE_INFINITY;
  var g, i, j, l, m = a[0] instanceof THREE.Vector3;
  l = m ? new THREE.Vector3 : new THREE.Vector2;
  i = 0;
  for (j = a.length; i < j; i++) g = a[i], g.x > b ? b = g.x : g.x < e && (e = g.x), g.y > c ? c = g.y : g.y < f && (f = g.y), m && (g.z > d ? d = g.z : g.z < h && (h = g.z)), l.add(g);
  a = {
    minX: e,
    minY: f,
    maxX: b,
    maxY: c,
    centroid: l.divideScalar(j)
  };
  m && (a.maxZ = d, a.minZ = h);
  return a
};
THREE.CurvePath.prototype.createPointsGeometry = function (a) {
  a = this.getPoints(a, !0);
  return this.createGeometry(a)
};
THREE.CurvePath.prototype.createSpacedPointsGeometry = function (a) {
  a = this.getSpacedPoints(a, !0);
  return this.createGeometry(a)
};
THREE.CurvePath.prototype.createGeometry = function (a) {
  for (var b = new THREE.Geometry, c = 0; c < a.length; c++) b.vertices.push(new THREE.Vector3(a[c].x, a[c].y, a[c].z || 0));
  return b
};
THREE.CurvePath.prototype.addWrapPath = function (a) {
  this.bends.push(a)
};
THREE.CurvePath.prototype.getTransformedPoints = function (a, b) {
  var c = this.getPoints(a),
    d, e;
  b || (b = this.bends);
  d = 0;
  for (e = b.length; d < e; d++) c = this.getWrapPoints(c, b[d]);
  return c
};
THREE.CurvePath.prototype.getTransformedSpacedPoints = function (a, b) {
  var c = this.getSpacedPoints(a),
    d, e;
  b || (b = this.bends);
  d = 0;
  for (e = b.length; d < e; d++) c = this.getWrapPoints(c, b[d]);
  return c
};
THREE.CurvePath.prototype.getWrapPoints = function (a, b) {
  var c = this.getBoundingBox(),
    d, e, f, h, g, i;
  d = 0;
  for (e = a.length; d < e; d++) f = a[d], h = f.x, g = f.y, i = h / c.maxX, i = b.getUtoTmapping(i, h), h = b.getPoint(i), g = b.getNormalVector(i).multiplyScalar(g), f.x = h.x + g.x, f.y = h.y + g.y;
  return a
};
THREE.Gyroscope = function () {
  THREE.Object3D.call(this)
};
THREE.Gyroscope.prototype = Object.create(THREE.Object3D.prototype);
THREE.Gyroscope.prototype.updateMatrixWorld = function (a) {
  this.matrixAutoUpdate && this.updateMatrix();
  if (this.matrixWorldNeedsUpdate || a) this.parent ? (this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorld.decompose(this.translationWorld, this.quaternionWorld, this.scaleWorld), this.matrix.decompose(this.translationObject, this.quaternionObject, this.scaleObject), this.matrixWorld.compose(this.translationWorld, this.quaternionObject, this.scaleWorld)) : this.matrixWorld.copy(this.matrix),
    this.matrixWorldNeedsUpdate = !1, a = !0;
  for (var b = 0, c = this.children.length; b < c; b++) this.children[b].updateMatrixWorld(a)
};
THREE.Gyroscope.prototype.translationWorld = new THREE.Vector3;
THREE.Gyroscope.prototype.translationObject = new THREE.Vector3;
THREE.Gyroscope.prototype.quaternionWorld = new THREE.Quaternion;
THREE.Gyroscope.prototype.quaternionObject = new THREE.Quaternion;
THREE.Gyroscope.prototype.scaleWorld = new THREE.Vector3;
THREE.Gyroscope.prototype.scaleObject = new THREE.Vector3;
THREE.Path = function (a) {
  THREE.CurvePath.call(this);
  this.actions = [];
  a && this.fromPoints(a)
};
THREE.Path.prototype = Object.create(THREE.CurvePath.prototype);
THREE.PathActions = {
  MOVE_TO: "moveTo",
  LINE_TO: "lineTo",
  QUADRATIC_CURVE_TO: "quadraticCurveTo",
  BEZIER_CURVE_TO: "bezierCurveTo",
  CSPLINE_THRU: "splineThru",
  ARC: "arc",
  ELLIPSE: "ellipse"
};
THREE.Path.prototype.fromPoints = function (a) {
  this.moveTo(a[0].x, a[0].y);
  for (var b = 1, c = a.length; b < c; b++) this.lineTo(a[b].x, a[b].y)
};
THREE.Path.prototype.moveTo = function (a, b) {
  var c = Array.prototype.slice.call(arguments);
  this.actions.push({
    action: THREE.PathActions.MOVE_TO,
    args: c
  })
};
THREE.Path.prototype.lineTo = function (a, b) {
  var c = Array.prototype.slice.call(arguments),
    d = this.actions[this.actions.length - 1].args,
    d = new THREE.LineCurve(new THREE.Vector2(d[d.length - 2], d[d.length - 1]), new THREE.Vector2(a, b));
  this.curves.push(d);
  this.actions.push({
    action: THREE.PathActions.LINE_TO,
    args: c
  })
};
THREE.Path.prototype.quadraticCurveTo = function (a, b, c, d) {
  var e = Array.prototype.slice.call(arguments),
    f = this.actions[this.actions.length - 1].args,
    f = new THREE.QuadraticBezierCurve(new THREE.Vector2(f[f.length - 2], f[f.length - 1]), new THREE.Vector2(a, b), new THREE.Vector2(c, d));
  this.curves.push(f);
  this.actions.push({
    action: THREE.PathActions.QUADRATIC_CURVE_TO,
    args: e
  })
};
THREE.Path.prototype.bezierCurveTo = function (a, b, c, d, e, f) {
  var h = Array.prototype.slice.call(arguments),
    g = this.actions[this.actions.length - 1].args,
    g = new THREE.CubicBezierCurve(new THREE.Vector2(g[g.length - 2], g[g.length - 1]), new THREE.Vector2(a, b), new THREE.Vector2(c, d), new THREE.Vector2(e, f));
  this.curves.push(g);
  this.actions.push({
    action: THREE.PathActions.BEZIER_CURVE_TO,
    args: h
  })
};
THREE.Path.prototype.splineThru = function (a) {
  var b = Array.prototype.slice.call(arguments),
    c = this.actions[this.actions.length - 1].args,
    c = [new THREE.Vector2(c[c.length - 2], c[c.length - 1])];
  Array.prototype.push.apply(c, a);
  c = new THREE.SplineCurve(c);
  this.curves.push(c);
  this.actions.push({
    action: THREE.PathActions.CSPLINE_THRU,
    args: b
  })
};
THREE.Path.prototype.arc = function (a, b, c, d, e, f) {
  var h = this.actions[this.actions.length - 1].args;
  this.absarc(a + h[h.length - 2], b + h[h.length - 1], c, d, e, f)
};
THREE.Path.prototype.absarc = function (a, b, c, d, e, f) {
  this.absellipse(a, b, c, c, d, e, f)
};
THREE.Path.prototype.ellipse = function (a, b, c, d, e, f, h) {
  var g = this.actions[this.actions.length - 1].args;
  this.absellipse(a + g[g.length - 2], b + g[g.length - 1], c, d, e, f, h)
};
THREE.Path.prototype.absellipse = function (a, b, c, d, e, f, h) {
  var g = Array.prototype.slice.call(arguments),
    i = new THREE.EllipseCurve(a, b, c, d, e, f, h);
  this.curves.push(i);
  i = i.getPoint(h ? 1 : 0);
  g.push(i.x);
  g.push(i.y);
  this.actions.push({
    action: THREE.PathActions.ELLIPSE,
    args: g
  })
};
THREE.Path.prototype.getSpacedPoints = function (a) {
  a || (a = 40);
  for (var b = [], c = 0; c < a; c++) b.push(this.getPoint(c / a));
  return b
};
THREE.Path.prototype.getPoints = function (a, b) {
  if (this.useSpacedPoints) return console.log("tata"), this.getSpacedPoints(a, b);
  var a = a || 12,
    c = [],
    d, e, f, h, g, i, j, l, m, n, p, t, q;
  d = 0;
  for (e = this.actions.length; d < e; d++) switch (f = this.actions[d], h = f.action, f = f.args, h) {
    case THREE.PathActions.MOVE_TO:
      c.push(new THREE.Vector2(f[0], f[1]));
      break;
    case THREE.PathActions.LINE_TO:
      c.push(new THREE.Vector2(f[0], f[1]));
      break;
    case THREE.PathActions.QUADRATIC_CURVE_TO:
      g = f[2];
      i = f[3];
      m = f[0];
      n = f[1];
      0 < c.length ? (h = c[c.length - 1], p = h.x,
        t = h.y) : (h = this.actions[d - 1].args, p = h[h.length - 2], t = h[h.length - 1]);
      for (f = 1; f <= a; f++) q = f / a, h = THREE.Shape.Utils.b2(q, p, m, g), q = THREE.Shape.Utils.b2(q, t, n, i), c.push(new THREE.Vector2(h, q));
      break;
    case THREE.PathActions.BEZIER_CURVE_TO:
      g = f[4];
      i = f[5];
      m = f[0];
      n = f[1];
      j = f[2];
      l = f[3];
      0 < c.length ? (h = c[c.length - 1], p = h.x, t = h.y) : (h = this.actions[d - 1].args, p = h[h.length - 2], t = h[h.length - 1]);
      for (f = 1; f <= a; f++) q = f / a, h = THREE.Shape.Utils.b3(q, p, m, j, g), q = THREE.Shape.Utils.b3(q, t, n, l, i), c.push(new THREE.Vector2(h, q));
      break;
    case THREE.PathActions.CSPLINE_THRU:
      h =
        this.actions[d - 1].args;
      q = [new THREE.Vector2(h[h.length - 2], h[h.length - 1])];
      h = a * f[0].length;
      q = q.concat(f[0]);
      q = new THREE.SplineCurve(q);
      for (f = 1; f <= h; f++) c.push(q.getPointAt(f / h));
      break;
    case THREE.PathActions.ARC:
      g = f[0];
      i = f[1];
      n = f[2];
      j = f[3];
      h = f[4];
      m = !!f[5];
      p = h - j;
      t = 2 * a;
      for (f = 1; f <= t; f++) q = f / t, m || (q = 1 - q), q = j + q * p, h = g + n * Math.cos(q), q = i + n * Math.sin(q), c.push(new THREE.Vector2(h, q));
      break;
    case THREE.PathActions.ELLIPSE:
      g = f[0];
      i = f[1];
      n = f[2];
      l = f[3];
      j = f[4];
      h = f[5];
      m = !!f[6];
      p = h - j;
      t = 2 * a;
      for (f = 1; f <= t; f++) q = f / t, m ||
        (q = 1 - q), q = j + q * p, h = g + n * Math.cos(q), q = i + l * Math.sin(q), c.push(new THREE.Vector2(h, q))
  }
  d = c[c.length - 1];
  1E-10 > Math.abs(d.x - c[0].x) && 1E-10 > Math.abs(d.y - c[0].y) && c.splice(c.length - 1, 1);
  b && c.push(c[0]);
  return c
};
THREE.Path.prototype.toShapes = function (a) {
  var b, c, d, e, f = [],
    h = new THREE.Path;
  b = 0;
  for (c = this.actions.length; b < c; b++) d = this.actions[b], e = d.args, d = d.action, d == THREE.PathActions.MOVE_TO && 0 != h.actions.length && (f.push(h), h = new THREE.Path), h[d].apply(h, e);
  0 != h.actions.length && f.push(h);
  if (0 == f.length) return [];
  var g;
  e = [];
  if (1 == f.length) return d = f[0], g = new THREE.Shape, g.actions = d.actions, g.curves = d.curves, e.push(g), e;
  b = !THREE.Shape.Utils.isClockWise(f[0].getPoints());
  if (a ? !b : b) {
    g = new THREE.Shape;
    b = 0;
    for (c =
      f.length; b < c; b++) d = f[b], h = THREE.Shape.Utils.isClockWise(d.getPoints()), (h = a ? !h : h) ? (g.actions = d.actions, g.curves = d.curves, e.push(g), g = new THREE.Shape) : g.holes.push(d)
  } else {
    g = void 0;
    b = 0;
    for (c = f.length; b < c; b++) d = f[b], h = THREE.Shape.Utils.isClockWise(d.getPoints()), (h = a ? !h : h) ? (g && e.push(g), g = new THREE.Shape, g.actions = d.actions, g.curves = d.curves) : g.holes.push(d);
    e.push(g)
  }
  return e
};
THREE.Shape = function () {
  THREE.Path.apply(this, arguments);
  this.holes = []
};
THREE.Shape.prototype = Object.create(THREE.Path.prototype);
THREE.Shape.prototype.extrude = function (a) {
  return new THREE.ExtrudeGeometry(this, a)
};
THREE.Shape.prototype.makeGeometry = function (a) {
  return new THREE.ShapeGeometry(this, a)
};
THREE.Shape.prototype.getPointsHoles = function (a) {
  var b, c = this.holes.length,
    d = [];
  for (b = 0; b < c; b++) d[b] = this.holes[b].getTransformedPoints(a, this.bends);
  return d
};
THREE.Shape.prototype.getSpacedPointsHoles = function (a) {
  var b, c = this.holes.length,
    d = [];
  for (b = 0; b < c; b++) d[b] = this.holes[b].getTransformedSpacedPoints(a, this.bends);
  return d
};
THREE.Shape.prototype.extractAllPoints = function (a) {
  return {
    shape: this.getTransformedPoints(a),
    holes: this.getPointsHoles(a)
  }
};
THREE.Shape.prototype.extractPoints = function (a) {
  return this.useSpacedPoints ? this.extractAllSpacedPoints(a) : this.extractAllPoints(a)
};
THREE.Shape.prototype.extractAllSpacedPoints = function (a) {
  return {
    shape: this.getTransformedSpacedPoints(a),
    holes: this.getSpacedPointsHoles(a)
  }
};
THREE.Shape.Utils = {
  removeHoles: function (a, b) {
    var c = a.concat(),
      d = c.concat(),
      e, f, h, g, i, j, l, m, n, p, t = [];
    for (i = 0; i < b.length; i++) {
      j = b[i];
      Array.prototype.push.apply(d, j);
      f = Number.POSITIVE_INFINITY;
      for (e = 0; e < j.length; e++) {
        n = j[e];
        p = [];
        for (m = 0; m < c.length; m++) l = c[m], l = n.distanceToSquared(l), p.push(l), l < f && (f = l, h = e, g = m)
      }
      e = 0 <= g - 1 ? g - 1 : c.length - 1;
      f = 0 <= h - 1 ? h - 1 : j.length - 1;
      var q = [j[h], c[g], c[e]];
      m = THREE.FontUtils.Triangulate.area(q);
      var r = [j[h], j[f], c[g]];
      n = THREE.FontUtils.Triangulate.area(r);
      p = g;
      l = h;
      g += 1;
      h += -1;
      0 >
        g && (g += c.length);
      g %= c.length;
      0 > h && (h += j.length);
      h %= j.length;
      e = 0 <= g - 1 ? g - 1 : c.length - 1;
      f = 0 <= h - 1 ? h - 1 : j.length - 1;
      q = [j[h], c[g], c[e]];
      q = THREE.FontUtils.Triangulate.area(q);
      r = [j[h], j[f], c[g]];
      r = THREE.FontUtils.Triangulate.area(r);
      m + n > q + r && (g = p, h = l, 0 > g && (g += c.length), g %= c.length, 0 > h && (h += j.length), h %= j.length, e = 0 <= g - 1 ? g - 1 : c.length - 1, f = 0 <= h - 1 ? h - 1 : j.length - 1);
      m = c.slice(0, g);
      n = c.slice(g);
      p = j.slice(h);
      l = j.slice(0, h);
      f = [j[h], j[f], c[g]];
      t.push([j[h], c[g], c[e]]);
      t.push(f);
      c = m.concat(p).concat(l).concat(n)
    }
    return {
      shape: c,
      isolatedPts: t,
      allpoints: d
    }
  },
  triangulateShape: function (a, b) {
    var c = THREE.Shape.Utils.removeHoles(a, b),
      d = c.allpoints,
      e = c.isolatedPts,
      c = THREE.FontUtils.Triangulate(c.shape, !1),
      f, h, g, i, j = {};
    f = 0;
    for (h = d.length; f < h; f++) i = d[f].x + ":" + d[f].y, void 0 !== j[i] && console.log("Duplicate point", i), j[i] = f;
    f = 0;
    for (h = c.length; f < h; f++) {
      g = c[f];
      for (d = 0; 3 > d; d++) i = g[d].x + ":" + g[d].y, i = j[i], void 0 !== i && (g[d] = i)
    }
    f = 0;
    for (h = e.length; f < h; f++) {
      g = e[f];
      for (d = 0; 3 > d; d++) i = g[d].x + ":" + g[d].y, i = j[i], void 0 !== i && (g[d] = i)
    }
    return c.concat(e)
  },
  isClockWise: function (a) {
    return 0 > THREE.FontUtils.Triangulate.area(a)
  },
  b2p0: function (a, b) {
    var c = 1 - a;
    return c * c * b
  },
  b2p1: function (a, b) {
    return 2 * (1 - a) * a * b
  },
  b2p2: function (a, b) {
    return a * a * b
  },
  b2: function (a, b, c, d) {
    return this.b2p0(a, b) + this.b2p1(a, c) + this.b2p2(a, d)
  },
  b3p0: function (a, b) {
    var c = 1 - a;
    return c * c * c * b
  },
  b3p1: function (a, b) {
    var c = 1 - a;
    return 3 * c * c * a * b
  },
  b3p2: function (a, b) {
    return 3 * (1 - a) * a * a * b
  },
  b3p3: function (a, b) {
    return a * a * a * b
  },
  b3: function (a, b, c, d, e) {
    return this.b3p0(a, b) + this.b3p1(a, c) + this.b3p2(a, d) +
      this.b3p3(a, e)
  }
};
THREE.LineCurve = function (a, b) {
  this.v1 = a;
  this.v2 = b
};
THREE.LineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.LineCurve.prototype.getPoint = function (a) {
  var b = this.v2.clone().sub(this.v1);
  b.multiplyScalar(a).add(this.v1);
  return b
};
THREE.LineCurve.prototype.getPointAt = function (a) {
  return this.getPoint(a)
};
THREE.LineCurve.prototype.getTangent = function () {
  return this.v2.clone().sub(this.v1).normalize()
};
THREE.QuadraticBezierCurve = function (a, b, c) {
  this.v0 = a;
  this.v1 = b;
  this.v2 = c
};
THREE.QuadraticBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.QuadraticBezierCurve.prototype.getPoint = function (a) {
  var b;
  b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
  a = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
  return new THREE.Vector2(b, a)
};
THREE.QuadraticBezierCurve.prototype.getTangent = function (a) {
  var b;
  b = THREE.Curve.Utils.tangentQuadraticBezier(a, this.v0.x, this.v1.x, this.v2.x);
  a = THREE.Curve.Utils.tangentQuadraticBezier(a, this.v0.y, this.v1.y, this.v2.y);
  b = new THREE.Vector2(b, a);
  b.normalize();
  return b
};
THREE.CubicBezierCurve = function (a, b, c, d) {
  this.v0 = a;
  this.v1 = b;
  this.v2 = c;
  this.v3 = d
};
THREE.CubicBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.CubicBezierCurve.prototype.getPoint = function (a) {
  var b;
  b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
  a = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
  return new THREE.Vector2(b, a)
};
THREE.CubicBezierCurve.prototype.getTangent = function (a) {
  var b;
  b = THREE.Curve.Utils.tangentCubicBezier(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
  a = THREE.Curve.Utils.tangentCubicBezier(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
  b = new THREE.Vector2(b, a);
  b.normalize();
  return b
};
THREE.SplineCurve = function (a) {
  this.points = void 0 == a ? [] : a
};
THREE.SplineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.SplineCurve.prototype.getPoint = function (a) {
  var b = new THREE.Vector2,
    c = [],
    d = this.points,
    e;
  e = (d.length - 1) * a;
  a = Math.floor(e);
  e -= a;
  c[0] = 0 == a ? a : a - 1;
  c[1] = a;
  c[2] = a > d.length - 2 ? d.length - 1 : a + 1;
  c[3] = a > d.length - 3 ? d.length - 1 : a + 2;
  b.x = THREE.Curve.Utils.interpolate(d[c[0]].x, d[c[1]].x, d[c[2]].x, d[c[3]].x, e);
  b.y = THREE.Curve.Utils.interpolate(d[c[0]].y, d[c[1]].y, d[c[2]].y, d[c[3]].y, e);
  return b
};
THREE.EllipseCurve = function (a, b, c, d, e, f, h) {
  this.aX = a;
  this.aY = b;
  this.xRadius = c;
  this.yRadius = d;
  this.aStartAngle = e;
  this.aEndAngle = f;
  this.aClockwise = h
};
THREE.EllipseCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.EllipseCurve.prototype.getPoint = function (a) {
  var b = this.aEndAngle - this.aStartAngle;
  this.aClockwise || (a = 1 - a);
  b = this.aStartAngle + a * b;
  a = this.aX + this.xRadius * Math.cos(b);
  b = this.aY + this.yRadius * Math.sin(b);
  return new THREE.Vector2(a, b)
};
THREE.ArcCurve = function (a, b, c, d, e, f) {
  THREE.EllipseCurve.call(this, a, b, c, c, d, e, f)
};
THREE.ArcCurve.prototype = Object.create(THREE.EllipseCurve.prototype);
THREE.LineCurve3 = THREE.Curve.create(function (a, b) {
  this.v1 = a;
  this.v2 = b
}, function (a) {
  var b = new THREE.Vector3;
  b.subVectors(this.v2, this.v1);
  b.multiplyScalar(a);
  b.add(this.v1);
  return b
});
THREE.QuadraticBezierCurve3 = THREE.Curve.create(function (a, b, c) {
  this.v0 = a;
  this.v1 = b;
  this.v2 = c
}, function (a) {
  var b, c;
  b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
  c = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
  a = THREE.Shape.Utils.b2(a, this.v0.z, this.v1.z, this.v2.z);
  return new THREE.Vector3(b, c, a)
});
THREE.CubicBezierCurve3 = THREE.Curve.create(function (a, b, c, d) {
  this.v0 = a;
  this.v1 = b;
  this.v2 = c;
  this.v3 = d
}, function (a) {
  var b, c;
  b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
  c = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
  a = THREE.Shape.Utils.b3(a, this.v0.z, this.v1.z, this.v2.z, this.v3.z);
  return new THREE.Vector3(b, c, a)
});
THREE.SplineCurve3 = THREE.Curve.create(function (a) {
  this.points = void 0 == a ? [] : a
}, function (a) {
  var b = new THREE.Vector3,
    c = [],
    d = this.points,
    e, a = (d.length - 1) * a;
  e = Math.floor(a);
  a -= e;
  c[0] = 0 == e ? e : e - 1;
  c[1] = e;
  c[2] = e > d.length - 2 ? d.length - 1 : e + 1;
  c[3] = e > d.length - 3 ? d.length - 1 : e + 2;
  e = d[c[0]];
  var f = d[c[1]],
    h = d[c[2]],
    c = d[c[3]];
  b.x = THREE.Curve.Utils.interpolate(e.x, f.x, h.x, c.x, a);
  b.y = THREE.Curve.Utils.interpolate(e.y, f.y, h.y, c.y, a);
  b.z = THREE.Curve.Utils.interpolate(e.z, f.z, h.z, c.z, a);
  return b
});
THREE.ClosedSplineCurve3 = THREE.Curve.create(function (a) {
  this.points = void 0 == a ? [] : a
}, function (a) {
  var b = new THREE.Vector3,
    c = [],
    d = this.points,
    e;
  e = (d.length - 0) * a;
  a = Math.floor(e);
  e -= a;
  a += 0 < a ? 0 : (Math.floor(Math.abs(a) / d.length) + 1) * d.length;
  c[0] = (a - 1) % d.length;
  c[1] = a % d.length;
  c[2] = (a + 1) % d.length;
  c[3] = (a + 2) % d.length;
  b.x = THREE.Curve.Utils.interpolate(d[c[0]].x, d[c[1]].x, d[c[2]].x, d[c[3]].x, e);
  b.y = THREE.Curve.Utils.interpolate(d[c[0]].y, d[c[1]].y, d[c[2]].y, d[c[3]].y, e);
  b.z = THREE.Curve.Utils.interpolate(d[c[0]].z,
    d[c[1]].z, d[c[2]].z, d[c[3]].z, e);
  return b
});
THREE.AnimationHandler = function () {
  var a = [],
    b = {},
    c = {
      update: function (b) {
        for (var c = 0; c < a.length; c++) a[c].update(b)
      },
      addToUpdate: function (b) {
        -1 === a.indexOf(b) && a.push(b)
      },
      removeFromUpdate: function (b) {
        b = a.indexOf(b); - 1 !== b && a.splice(b, 1)
      },
      add: function (a) {
        void 0 !== b[a.name] && console.log("THREE.AnimationHandler.add: Warning! " + a.name + " already exists in library. Overwriting.");
        b[a.name] = a;
        if (!0 !== a.initialized) {
          for (var c = 0; c < a.hierarchy.length; c++) {
            for (var d = 0; d < a.hierarchy[c].keys.length; d++)
              if (0 > a.hierarchy[c].keys[d].time &&
                (a.hierarchy[c].keys[d].time = 0), void 0 !== a.hierarchy[c].keys[d].rot && !(a.hierarchy[c].keys[d].rot instanceof THREE.Quaternion)) {
                var g = a.hierarchy[c].keys[d].rot;
                a.hierarchy[c].keys[d].rot = new THREE.Quaternion(g[0], g[1], g[2], g[3])
              } if (a.hierarchy[c].keys.length && void 0 !== a.hierarchy[c].keys[0].morphTargets) {
              g = {};
              for (d = 0; d < a.hierarchy[c].keys.length; d++)
                for (var i = 0; i < a.hierarchy[c].keys[d].morphTargets.length; i++) {
                  var j = a.hierarchy[c].keys[d].morphTargets[i];
                  g[j] = -1
                }
              a.hierarchy[c].usedMorphTargets = g;
              for (d = 0; d < a.hierarchy[c].keys.length; d++) {
                var l = {};
                for (j in g) {
                  for (i = 0; i < a.hierarchy[c].keys[d].morphTargets.length; i++)
                    if (a.hierarchy[c].keys[d].morphTargets[i] === j) {
                      l[j] = a.hierarchy[c].keys[d].morphTargetsInfluences[i];
                      break
                    } i === a.hierarchy[c].keys[d].morphTargets.length && (l[j] = 0)
                }
                a.hierarchy[c].keys[d].morphTargetsInfluences = l
              }
            }
            for (d = 1; d < a.hierarchy[c].keys.length; d++) a.hierarchy[c].keys[d].time === a.hierarchy[c].keys[d - 1].time && (a.hierarchy[c].keys.splice(d, 1), d--);
            for (d = 0; d < a.hierarchy[c].keys.length; d++) a.hierarchy[c].keys[d].index =
              d
          }
          d = parseInt(a.length * a.fps, 10);
          a.JIT = {};
          a.JIT.hierarchy = [];
          for (c = 0; c < a.hierarchy.length; c++) a.JIT.hierarchy.push(Array(d));
          a.initialized = !0
        }
      },
      get: function (a) {
        if ("string" === typeof a) {
          if (b[a]) return b[a];
          console.log("THREE.AnimationHandler.get: Couldn't find animation " + a);
          return null
        }
      },
      parse: function (a) {
        var b = [];
        if (a instanceof THREE.SkinnedMesh)
          for (var c = 0; c < a.bones.length; c++) b.push(a.bones[c]);
        else d(a, b);
        return b
      }
    },
    d = function (a, b) {
      b.push(a);
      for (var c = 0; c < a.children.length; c++) d(a.children[c],
        b)
    };
  c.LINEAR = 0;
  c.CATMULLROM = 1;
  c.CATMULLROM_FORWARD = 2;
  return c
}();
THREE.Animation = function (a, b, c) {
  this.root = a;
  this.data = THREE.AnimationHandler.get(b);
  this.hierarchy = THREE.AnimationHandler.parse(a);
  this.currentTime = 0;
  this.timeScale = 1;
  this.isPlaying = !1;
  this.loop = this.isPaused = !0;
  this.interpolationType = void 0 !== c ? c : THREE.AnimationHandler.LINEAR;
  this.points = [];
  this.target = new THREE.Vector3
};
THREE.Animation.prototype.play = function (a, b) {
  if (!1 === this.isPlaying) {
    this.isPlaying = !0;
    this.loop = void 0 !== a ? a : !0;
    this.currentTime = void 0 !== b ? b : 0;
    var c, d = this.hierarchy.length,
      e;
    for (c = 0; c < d; c++) {
      e = this.hierarchy[c];
      e.matrixAutoUpdate = !0;
      void 0 === e.animationCache && (e.animationCache = {}, e.animationCache.prevKey = {
        pos: 0,
        rot: 0,
        scl: 0
      }, e.animationCache.nextKey = {
        pos: 0,
        rot: 0,
        scl: 0
      }, e.animationCache.originalMatrix = e instanceof THREE.Bone ? e.skinMatrix : e.matrix);
      var f = e.animationCache.prevKey;
      e = e.animationCache.nextKey;
      f.pos = this.data.hierarchy[c].keys[0];
      f.rot = this.data.hierarchy[c].keys[0];
      f.scl = this.data.hierarchy[c].keys[0];
      e.pos = this.getNextKeyWith("pos", c, 1);
      e.rot = this.getNextKeyWith("rot", c, 1);
      e.scl = this.getNextKeyWith("scl", c, 1)
    }
    this.update(0)
  }
  this.isPaused = !1;
  THREE.AnimationHandler.addToUpdate(this)
};
THREE.Animation.prototype.pause = function () {
  !0 === this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this);
  this.isPaused = !this.isPaused
};
THREE.Animation.prototype.stop = function () {
  this.isPaused = this.isPlaying = !1;
  THREE.AnimationHandler.removeFromUpdate(this)
};
THREE.Animation.prototype.update = function (a) {
  if (!1 !== this.isPlaying) {
    var b = ["pos", "rot", "scl"],
      c, d, e, f, h, g, i, j, l;
    l = this.currentTime += a * this.timeScale;
    j = this.currentTime %= this.data.length;
    parseInt(Math.min(j * this.data.fps, this.data.length * this.data.fps), 10);
    for (var m = 0, n = this.hierarchy.length; m < n; m++) {
      a = this.hierarchy[m];
      i = a.animationCache;
      for (var p = 0; 3 > p; p++) {
        c = b[p];
        h = i.prevKey[c];
        g = i.nextKey[c];
        if (g.time <= l) {
          if (j < l)
            if (this.loop) {
              h = this.data.hierarchy[m].keys[0];
              for (g = this.getNextKeyWith(c, m, 1); g.time <
                j;) h = g, g = this.getNextKeyWith(c, m, g.index + 1)
            } else {
              this.stop();
              return
            }
          else {
            do h = g, g = this.getNextKeyWith(c, m, g.index + 1); while (g.time < j)
          }
          i.prevKey[c] = h;
          i.nextKey[c] = g
        }
        a.matrixAutoUpdate = !0;
        a.matrixWorldNeedsUpdate = !0;
        d = (j - h.time) / (g.time - h.time);
        e = h[c];
        f = g[c];
        if (0 > d || 1 < d) console.log("THREE.Animation.update: Warning! Scale out of bounds:" + d + " on bone " + m), d = 0 > d ? 0 : 1;
        if ("pos" === c)
          if (c = a.position, this.interpolationType === THREE.AnimationHandler.LINEAR) c.x = e[0] + (f[0] - e[0]) * d, c.y = e[1] + (f[1] - e[1]) * d, c.z = e[2] +
            (f[2] - e[2]) * d;
          else {
            if (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) this.points[0] = this.getPrevKeyWith("pos", m, h.index - 1).pos, this.points[1] = e, this.points[2] = f, this.points[3] = this.getNextKeyWith("pos", m, g.index + 1).pos, d = 0.33 * d + 0.33, e = this.interpolateCatmullRom(this.points, d), c.x = e[0], c.y = e[1], c.z = e[2], this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD && (d = this.interpolateCatmullRom(this.points, 1.01 * d),
              this.target.set(d[0], d[1], d[2]), this.target.sub(c), this.target.y = 0, this.target.normalize(), d = Math.atan2(this.target.x, this.target.z), a.rotation.set(0, d, 0))
          }
        else "rot" === c ? THREE.Quaternion.slerp(e, f, a.quaternion, d) : "scl" === c && (c = a.scale, c.x = e[0] + (f[0] - e[0]) * d, c.y = e[1] + (f[1] - e[1]) * d, c.z = e[2] + (f[2] - e[2]) * d)
      }
    }
  }
};
THREE.Animation.prototype.interpolateCatmullRom = function (a, b) {
  var c = [],
    d = [],
    e, f, h, g, i, j;
  e = (a.length - 1) * b;
  f = Math.floor(e);
  e -= f;
  c[0] = 0 === f ? f : f - 1;
  c[1] = f;
  c[2] = f > a.length - 2 ? f : f + 1;
  c[3] = f > a.length - 3 ? f : f + 2;
  f = a[c[0]];
  g = a[c[1]];
  i = a[c[2]];
  j = a[c[3]];
  c = e * e;
  h = e * c;
  d[0] = this.interpolate(f[0], g[0], i[0], j[0], e, c, h);
  d[1] = this.interpolate(f[1], g[1], i[1], j[1], e, c, h);
  d[2] = this.interpolate(f[2], g[2], i[2], j[2], e, c, h);
  return d
};
THREE.Animation.prototype.interpolate = function (a, b, c, d, e, f, h) {
  a = 0.5 * (c - a);
  d = 0.5 * (d - b);
  return (2 * (b - c) + a + d) * h + (-3 * (b - c) - 2 * a - d) * f + a * e + b
};
THREE.Animation.prototype.getNextKeyWith = function (a, b, c) {
  for (var d = this.data.hierarchy[b].keys, c = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? c < d.length - 1 ? c : d.length - 1 : c % d.length; c < d.length; c++)
    if (void 0 !== d[c][a]) return d[c];
  return this.data.hierarchy[b].keys[0]
};
THREE.Animation.prototype.getPrevKeyWith = function (a, b, c) {
  for (var d = this.data.hierarchy[b].keys, c = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? 0 < c ? c : 0 : 0 <= c ? c : c + d.length; 0 <= c; c--)
    if (void 0 !== d[c][a]) return d[c];
  return this.data.hierarchy[b].keys[d.length - 1]
};
THREE.KeyFrameAnimation = function (a, b, c) {
  this.root = a;
  this.data = THREE.AnimationHandler.get(b);
  this.hierarchy = THREE.AnimationHandler.parse(a);
  this.currentTime = 0;
  this.timeScale = 0.001;
  this.isPlaying = !1;
  this.loop = this.isPaused = !0;
  this.JITCompile = void 0 !== c ? c : !0;
  a = 0;
  for (b = this.hierarchy.length; a < b; a++) {
    var c = this.data.hierarchy[a].sids,
      d = this.hierarchy[a];
    if (this.data.hierarchy[a].keys.length && c) {
      for (var e = 0; e < c.length; e++) {
        var f = c[e],
          h = this.getNextKeyWith(f, a, 0);
        h && h.apply(f)
      }
      d.matrixAutoUpdate = !1;
      this.data.hierarchy[a].node.updateMatrix();
      d.matrixWorldNeedsUpdate = !0
    }
  }
};
THREE.KeyFrameAnimation.prototype.play = function (a, b) {
  if (!this.isPlaying) {
    this.isPlaying = !0;
    this.loop = void 0 !== a ? a : !0;
    this.currentTime = void 0 !== b ? b : 0;
    this.startTimeMs = b;
    this.startTime = 1E7;
    this.endTime = -this.startTime;
    var c, d = this.hierarchy.length,
      e, f;
    for (c = 0; c < d; c++) e = this.hierarchy[c], f = this.data.hierarchy[c], void 0 === f.animationCache && (f.animationCache = {}, f.animationCache.prevKey = null, f.animationCache.nextKey = null, f.animationCache.originalMatrix = e instanceof THREE.Bone ? e.skinMatrix : e.matrix), e = this.data.hierarchy[c].keys,
      e.length && (f.animationCache.prevKey = e[0], f.animationCache.nextKey = e[1], this.startTime = Math.min(e[0].time, this.startTime), this.endTime = Math.max(e[e.length - 1].time, this.endTime));
    this.update(0)
  }
  this.isPaused = !1;
  THREE.AnimationHandler.addToUpdate(this)
};
THREE.KeyFrameAnimation.prototype.pause = function () {
  this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this);
  this.isPaused = !this.isPaused
};
THREE.KeyFrameAnimation.prototype.stop = function () {
  this.isPaused = this.isPlaying = !1;
  THREE.AnimationHandler.removeFromUpdate(this);
  for (var a = 0; a < this.data.hierarchy.length; a++) {
    var b = this.hierarchy[a],
      c = this.data.hierarchy[a];
    if (void 0 !== c.animationCache) {
      var d = c.animationCache.originalMatrix;
      b instanceof THREE.Bone ? (d.copy(b.skinMatrix), b.skinMatrix = d) : (d.copy(b.matrix), b.matrix = d);
      delete c.animationCache
    }
  }
};
THREE.KeyFrameAnimation.prototype.update = function (a) {
  if (this.isPlaying) {
    var b, c, d, e, f = this.data.JIT.hierarchy,
      h, g, i;
    g = this.currentTime += a * this.timeScale;
    h = this.currentTime %= this.data.length;
    h < this.startTimeMs && (h = this.currentTime = this.startTimeMs + h);
    e = parseInt(Math.min(h * this.data.fps, this.data.length * this.data.fps), 10);
    if ((i = h < g) && !this.loop) {
      for (var a = 0, j = this.hierarchy.length; a < j; a++) {
        var l = this.data.hierarchy[a].keys,
          f = this.data.hierarchy[a].sids;
        d = l.length - 1;
        e = this.hierarchy[a];
        if (l.length) {
          for (l =
            0; l < f.length; l++) h = f[l], (g = this.getPrevKeyWith(h, a, d)) && g.apply(h);
          this.data.hierarchy[a].node.updateMatrix();
          e.matrixWorldNeedsUpdate = !0
        }
      }
      this.stop()
    } else if (!(h < this.startTime)) {
      a = 0;
      for (j = this.hierarchy.length; a < j; a++) {
        d = this.hierarchy[a];
        b = this.data.hierarchy[a];
        var l = b.keys,
          m = b.animationCache;
        if (this.JITCompile && void 0 !== f[a][e]) d instanceof THREE.Bone ? (d.skinMatrix = f[a][e], d.matrixWorldNeedsUpdate = !1) : (d.matrix = f[a][e], d.matrixWorldNeedsUpdate = !0);
        else if (l.length) {
          this.JITCompile && m && (d instanceof THREE.Bone ? d.skinMatrix = m.originalMatrix : d.matrix = m.originalMatrix);
          b = m.prevKey;
          c = m.nextKey;
          if (b && c) {
            if (c.time <= g) {
              if (i && this.loop) {
                b = l[0];
                for (c = l[1]; c.time < h;) b = c, c = l[b.index + 1]
              } else if (!i)
                for (var n = l.length - 1; c.time < h && c.index !== n;) b = c, c = l[b.index + 1];
              m.prevKey = b;
              m.nextKey = c
            }
            c.time >= h ? b.interpolate(c, h) : b.interpolate(c, c.time)
          }
          this.data.hierarchy[a].node.updateMatrix();
          d.matrixWorldNeedsUpdate = !0
        }
      }
      if (this.JITCompile && void 0 === f[0][e]) {
        this.hierarchy[0].updateMatrixWorld(!0);
        for (a = 0; a < this.hierarchy.length; a++) f[a][e] =
          this.hierarchy[a] instanceof THREE.Bone ? this.hierarchy[a].skinMatrix.clone() : this.hierarchy[a].matrix.clone()
      }
    }
  }
};
THREE.KeyFrameAnimation.prototype.getNextKeyWith = function (a, b, c) {
  b = this.data.hierarchy[b].keys;
  for (c %= b.length; c < b.length; c++)
    if (b[c].hasTarget(a)) return b[c];
  return b[0]
};
THREE.KeyFrameAnimation.prototype.getPrevKeyWith = function (a, b, c) {
  b = this.data.hierarchy[b].keys;
  for (c = 0 <= c ? c : c + b.length; 0 <= c; c--)
    if (b[c].hasTarget(a)) return b[c];
  return b[b.length - 1]
};
THREE.CubeCamera = function (a, b, c) {
  THREE.Object3D.call(this);
  var d = new THREE.PerspectiveCamera(90, 1, a, b);
  d.up.set(0, -1, 0);
  d.lookAt(new THREE.Vector3(1, 0, 0));
  this.add(d);
  var e = new THREE.PerspectiveCamera(90, 1, a, b);
  e.up.set(0, -1, 0);
  e.lookAt(new THREE.Vector3(-1, 0, 0));
  this.add(e);
  var f = new THREE.PerspectiveCamera(90, 1, a, b);
  f.up.set(0, 0, 1);
  f.lookAt(new THREE.Vector3(0, 1, 0));
  this.add(f);
  var h = new THREE.PerspectiveCamera(90, 1, a, b);
  h.up.set(0, 0, -1);
  h.lookAt(new THREE.Vector3(0, -1, 0));
  this.add(h);
  var g = new THREE.PerspectiveCamera(90,
    1, a, b);
  g.up.set(0, -1, 0);
  g.lookAt(new THREE.Vector3(0, 0, 1));
  this.add(g);
  var i = new THREE.PerspectiveCamera(90, 1, a, b);
  i.up.set(0, -1, 0);
  i.lookAt(new THREE.Vector3(0, 0, -1));
  this.add(i);
  this.renderTarget = new THREE.WebGLRenderTargetCube(c, c, {
    format: THREE.RGBFormat,
    magFilter: THREE.LinearFilter,
    minFilter: THREE.LinearFilter
  });
  this.updateCubeMap = function (a, b) {
    var c = this.renderTarget,
      n = c.generateMipmaps;
    c.generateMipmaps = !1;
    c.activeCubeFace = 0;
    a.render(b, d, c);
    c.activeCubeFace = 1;
    a.render(b, e, c);
    c.activeCubeFace =
      2;
    a.render(b, f, c);
    c.activeCubeFace = 3;
    a.render(b, h, c);
    c.activeCubeFace = 4;
    a.render(b, g, c);
    c.generateMipmaps = n;
    c.activeCubeFace = 5;
    a.render(b, i, c)
  }
};
THREE.CubeCamera.prototype = Object.create(THREE.Object3D.prototype);
THREE.CombinedCamera = function (a, b, c, d, e, f, h) {
  THREE.Camera.call(this);
  this.fov = c;
  this.left = -a / 2;
  this.right = a / 2;
  this.top = b / 2;
  this.bottom = -b / 2;
  this.cameraO = new THREE.OrthographicCamera(a / -2, a / 2, b / 2, b / -2, f, h);
  this.cameraP = new THREE.PerspectiveCamera(c, a / b, d, e);
  this.zoom = 1;
  this.toPerspective()
};
THREE.CombinedCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.CombinedCamera.prototype.toPerspective = function () {
  this.near = this.cameraP.near;
  this.far = this.cameraP.far;
  this.cameraP.fov = this.fov / this.zoom;
  this.cameraP.updateProjectionMatrix();
  this.projectionMatrix = this.cameraP.projectionMatrix;
  this.inPerspectiveMode = !0;
  this.inOrthographicMode = !1
};
THREE.CombinedCamera.prototype.toOrthographic = function () {
  var a = this.cameraP.aspect,
    b = (this.cameraP.near + this.cameraP.far) / 2,
    b = Math.tan(this.fov / 2) * b,
    a = 2 * b * a / 2,
    b = b / this.zoom,
    a = a / this.zoom;
  this.cameraO.left = -a;
  this.cameraO.right = a;
  this.cameraO.top = b;
  this.cameraO.bottom = -b;
  this.cameraO.updateProjectionMatrix();
  this.near = this.cameraO.near;
  this.far = this.cameraO.far;
  this.projectionMatrix = this.cameraO.projectionMatrix;
  this.inPerspectiveMode = !1;
  this.inOrthographicMode = !0
};
THREE.CombinedCamera.prototype.setSize = function (a, b) {
  this.cameraP.aspect = a / b;
  this.left = -a / 2;
  this.right = a / 2;
  this.top = b / 2;
  this.bottom = -b / 2
};
THREE.CombinedCamera.prototype.setFov = function (a) {
  this.fov = a;
  this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic()
};
THREE.CombinedCamera.prototype.updateProjectionMatrix = function () {
  this.inPerspectiveMode ? this.toPerspective() : (this.toPerspective(), this.toOrthographic())
};
THREE.CombinedCamera.prototype.setLens = function (a, b) {
  void 0 === b && (b = 24);
  var c = 2 * THREE.Math.radToDeg(Math.atan(b / (2 * a)));
  this.setFov(c);
  return c
};
THREE.CombinedCamera.prototype.setZoom = function (a) {
  this.zoom = a;
  this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic()
};
THREE.CombinedCamera.prototype.toFrontView = function () {
  this.rotation.x = 0;
  this.rotation.y = 0;
  this.rotation.z = 0;
  this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toBackView = function () {
  this.rotation.x = 0;
  this.rotation.y = Math.PI;
  this.rotation.z = 0;
  this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toLeftView = function () {
  this.rotation.x = 0;
  this.rotation.y = -Math.PI / 2;
  this.rotation.z = 0;
  this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toRightView = function () {
  this.rotation.x = 0;
  this.rotation.y = Math.PI / 2;
  this.rotation.z = 0;
  this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toTopView = function () {
  this.rotation.x = -Math.PI / 2;
  this.rotation.y = 0;
  this.rotation.z = 0;
  this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toBottomView = function () {
  this.rotation.x = Math.PI / 2;
  this.rotation.y = 0;
  this.rotation.z = 0;
  this.rotationAutoUpdate = !1
};
THREE.CircleGeometry = function (a, b, c, d) {
  THREE.Geometry.call(this);
  var a = a || 50,
    c = void 0 !== c ? c : 0,
    d = void 0 !== d ? d : 2 * Math.PI,
    b = void 0 !== b ? Math.max(3, b) : 8,
    e, f = [];
  e = new THREE.Vector3;
  var h = new THREE.Vector2(0.5, 0.5);
  this.vertices.push(e);
  f.push(h);
  for (e = 0; e <= b; e++) {
    var g = new THREE.Vector3,
      i = c + e / b * d;
    g.x = a * Math.cos(i);
    g.y = a * Math.sin(i);
    this.vertices.push(g);
    f.push(new THREE.Vector2((g.x / a + 1) / 2, (g.y / a + 1) / 2))
  }
  c = new THREE.Vector3(0, 0, 1);
  for (e = 1; e <= b; e++) this.faces.push(new THREE.Face3(e, e + 1, 0, [c, c, c])), this.faceVertexUvs[0].push([f[e],
    f[e + 1], h
  ]);
  this.computeCentroids();
  this.computeFaceNormals();
  this.boundingSphere = new THREE.Sphere(new THREE.Vector3, a)
};
THREE.CircleGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CubeGeometry = function (a, b, c, d, e, f) {
  function h(a, b, c, d, e, f, h, q) {
    var r, s = g.widthSegments,
      v = g.heightSegments,
      z = e / 2,
      C = f / 2,
      F = g.vertices.length;
    if ("x" === a && "y" === b || "y" === a && "x" === b) r = "z";
    else if ("x" === a && "z" === b || "z" === a && "x" === b) r = "y", v = g.depthSegments;
    else if ("z" === a && "y" === b || "y" === a && "z" === b) r = "x", s = g.depthSegments;
    var H = s + 1,
      I = v + 1,
      G = e / s,
      A = f / v,
      K = new THREE.Vector3;
    K[r] = 0 < h ? 1 : -1;
    for (e = 0; e < I; e++)
      for (f = 0; f < H; f++) {
        var B = new THREE.Vector3;
        B[a] = (f * G - z) * c;
        B[b] = (e * A - C) * d;
        B[r] = h;
        g.vertices.push(B)
      }
    for (e =
      0; e < v; e++)
      for (f = 0; f < s; f++) a = new THREE.Face4(f + H * e + F, f + H * (e + 1) + F, f + 1 + H * (e + 1) + F, f + 1 + H * e + F), a.normal.copy(K), a.vertexNormals.push(K.clone(), K.clone(), K.clone(), K.clone()), a.materialIndex = q, g.faces.push(a), g.faceVertexUvs[0].push([new THREE.Vector2(f / s, 1 - e / v), new THREE.Vector2(f / s, 1 - (e + 1) / v), new THREE.Vector2((f + 1) / s, 1 - (e + 1) / v), new THREE.Vector2((f + 1) / s, 1 - e / v)])
  }
  THREE.Geometry.call(this);
  var g = this;
  this.width = a;
  this.height = b;
  this.depth = c;
  this.widthSegments = d || 1;
  this.heightSegments = e || 1;
  this.depthSegments =
    f || 1;
  a = this.width / 2;
  b = this.height / 2;
  c = this.depth / 2;
  h("z", "y", -1, -1, this.depth, this.height, a, 0);
  h("z", "y", 1, -1, this.depth, this.height, -a, 1);
  h("x", "z", 1, 1, this.width, this.depth, b, 2);
  h("x", "z", 1, -1, this.width, this.depth, -b, 3);
  h("x", "y", 1, -1, this.width, this.height, c, 4);
  h("x", "y", -1, -1, this.width, this.height, -c, 5);
  this.computeCentroids();
  this.mergeVertices()
};
THREE.CubeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CylinderGeometry = function (a, b, c, d, e, f) {
  THREE.Geometry.call(this);
  this.radiusTop = a = void 0 !== a ? a : 20;
  this.radiusBottom = b = void 0 !== b ? b : 20;
  this.height = c = void 0 !== c ? c : 100;
  this.radialSegments = d = d || 8;
  this.heightSegments = e = e || 1;
  this.openEnded = f = void 0 !== f ? f : !1;
  var h = c / 2,
    g, i, j = [],
    l = [];
  for (i = 0; i <= e; i++) {
    var m = [],
      n = [],
      p = i / e,
      t = p * (b - a) + a;
    for (g = 0; g <= d; g++) {
      var q = g / d,
        r = new THREE.Vector3;
      r.x = t * Math.sin(2 * q * Math.PI);
      r.y = -p * c + h;
      r.z = t * Math.cos(2 * q * Math.PI);
      this.vertices.push(r);
      m.push(this.vertices.length - 1);
      n.push(new THREE.Vector2(q,
        1 - p))
    }
    j.push(m);
    l.push(n)
  }
  c = (b - a) / c;
  for (g = 0; g < d; g++) {
    0 !== a ? (m = this.vertices[j[0][g]].clone(), n = this.vertices[j[0][g + 1]].clone()) : (m = this.vertices[j[1][g]].clone(), n = this.vertices[j[1][g + 1]].clone());
    m.setY(Math.sqrt(m.x * m.x + m.z * m.z) * c).normalize();
    n.setY(Math.sqrt(n.x * n.x + n.z * n.z) * c).normalize();
    for (i = 0; i < e; i++) {
      var p = j[i][g],
        t = j[i + 1][g],
        q = j[i + 1][g + 1],
        r = j[i][g + 1],
        s = m.clone(),
        v = m.clone(),
        z = n.clone(),
        C = n.clone(),
        F = l[i][g].clone(),
        H = l[i + 1][g].clone(),
        I = l[i + 1][g + 1].clone(),
        G = l[i][g + 1].clone();
      this.faces.push(new THREE.Face4(p,
        t, q, r, [s, v, z, C]));
      this.faceVertexUvs[0].push([F, H, I, G])
    }
  }
  if (!1 === f && 0 < a) {
    this.vertices.push(new THREE.Vector3(0, h, 0));
    for (g = 0; g < d; g++) p = j[0][g], t = j[0][g + 1], q = this.vertices.length - 1, s = new THREE.Vector3(0, 1, 0), v = new THREE.Vector3(0, 1, 0), z = new THREE.Vector3(0, 1, 0), F = l[0][g].clone(), H = l[0][g + 1].clone(), I = new THREE.Vector2(H.u, 0), this.faces.push(new THREE.Face3(p, t, q, [s, v, z])), this.faceVertexUvs[0].push([F, H, I])
  }
  if (!1 === f && 0 < b) {
    this.vertices.push(new THREE.Vector3(0, -h, 0));
    for (g = 0; g < d; g++) p = j[i][g + 1],
      t = j[i][g], q = this.vertices.length - 1, s = new THREE.Vector3(0, -1, 0), v = new THREE.Vector3(0, -1, 0), z = new THREE.Vector3(0, -1, 0), F = l[i][g + 1].clone(), H = l[i][g].clone(), I = new THREE.Vector2(H.u, 1), this.faces.push(new THREE.Face3(p, t, q, [s, v, z])), this.faceVertexUvs[0].push([F, H, I])
  }
  this.computeCentroids();
  this.computeFaceNormals()
};
THREE.CylinderGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ExtrudeGeometry = function (a, b) {
  "undefined" !== typeof a && (THREE.Geometry.call(this), a = a instanceof Array ? a : [a], this.shapebb = a[a.length - 1].getBoundingBox(), this.addShapeList(a, b), this.computeCentroids(), this.computeFaceNormals())
};
THREE.ExtrudeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ExtrudeGeometry.prototype.addShapeList = function (a, b) {
  for (var c = a.length, d = 0; d < c; d++) this.addShape(a[d], b)
};
THREE.ExtrudeGeometry.prototype.addShape = function (a, b) {
  function c(a, b, c) {
    b || console.log("die");
    return b.clone().multiplyScalar(c).add(a)
  }

  function d(a, b, c) {
    var d = THREE.ExtrudeGeometry.__v1,
      e = THREE.ExtrudeGeometry.__v2,
      f = THREE.ExtrudeGeometry.__v3,
      g = THREE.ExtrudeGeometry.__v4,
      h = THREE.ExtrudeGeometry.__v5,
      i = THREE.ExtrudeGeometry.__v6;
    d.set(a.x - b.x, a.y - b.y);
    e.set(a.x - c.x, a.y - c.y);
    d = d.normalize();
    e = e.normalize();
    f.set(-d.y, d.x);
    g.set(e.y, -e.x);
    h.copy(a).add(f);
    i.copy(a).add(g);
    if (h.equals(i)) return g.clone();
    h.copy(b).add(f);
    i.copy(c).add(g);
    f = d.dot(g);
    g = i.sub(h).dot(g);
    0 === f && (console.log("Either infinite or no solutions!"), 0 === g ? console.log("Its finite solutions.") : console.log("Too bad, no solutions."));
    g /= f;
    return 0 > g ? (b = Math.atan2(b.y - a.y, b.x - a.x), a = Math.atan2(c.y - a.y, c.x - a.x), b > a && (a += 2 * Math.PI), c = (b + a) / 2, a = -Math.cos(c), c = -Math.sin(c), new THREE.Vector2(a, c)) : d.multiplyScalar(g).add(h).sub(a).clone()
  }

  function e(c, d) {
    var e, f;
    for (O = c.length; 0 <= --O;) {
      e = O;
      f = O - 1;
      0 > f && (f = c.length - 1);
      for (var g = 0, h = p + 2 * l,
          g = 0; g < h; g++) {
        var i = pa * g,
          j = pa * (g + 1),
          m = d + e + i,
          i = d + f + i,
          n = d + f + j,
          j = d + e + j,
          q = c,
          r = g,
          s = h,
          t = e,
          w = f,
          m = m + J,
          i = i + J,
          n = n + J,
          j = j + J;
        B.faces.push(new THREE.Face4(m, i, n, j, null, null, v));
        m = z.generateSideWallUV(B, a, q, b, m, i, n, j, r, s, t, w);
        B.faceVertexUvs[0].push(m)
      }
    }
  }

  function f(a, b, c) {
    B.vertices.push(new THREE.Vector3(a, b, c))
  }

  function h(c, d, e, f) {
    c += J;
    d += J;
    e += J;
    B.faces.push(new THREE.Face3(c, d, e, null, null, s));
    c = f ? z.generateBottomUV(B, a, b, c, d, e) : z.generateTopUV(B, a, b, c, d, e);
    B.faceVertexUvs[0].push(c)
  }
  var g = void 0 !== b.amount ? b.amount :
    100,
    i = void 0 !== b.bevelThickness ? b.bevelThickness : 6,
    j = void 0 !== b.bevelSize ? b.bevelSize : i - 2,
    l = void 0 !== b.bevelSegments ? b.bevelSegments : 3,
    m = void 0 !== b.bevelEnabled ? b.bevelEnabled : !0,
    n = void 0 !== b.curveSegments ? b.curveSegments : 12,
    p = void 0 !== b.steps ? b.steps : 1,
    t = b.extrudePath,
    q, r = !1,
    s = b.material,
    v = b.extrudeMaterial,
    z = void 0 !== b.UVGenerator ? b.UVGenerator : THREE.ExtrudeGeometry.WorldUVGenerator,
    C, F, H, I;
  t && (q = t.getSpacedPoints(p), r = !0, m = !1, C = void 0 !== b.frames ? b.frames : new THREE.TubeGeometry.FrenetFrames(t, p,
    !1), F = new THREE.Vector3, H = new THREE.Vector3, I = new THREE.Vector3);
  m || (j = i = l = 0);
  var G, A, K, B = this,
    J = this.vertices.length,
    n = a.extractPoints(n),
    N = n.shape,
    n = n.holes;
  if (t = !THREE.Shape.Utils.isClockWise(N)) {
    N = N.reverse();
    A = 0;
    for (K = n.length; A < K; A++) G = n[A], THREE.Shape.Utils.isClockWise(G) && (n[A] = G.reverse());
    t = !1
  }
  var y = THREE.Shape.Utils.triangulateShape(N, n),
    t = N;
  A = 0;
  for (K = n.length; A < K; A++) G = n[A], N = N.concat(G);
  var M, w, Z, L, pa = N.length,
    Pa = y.length,
    Ua = [],
    O = 0,
    ka = t.length;
  M = ka - 1;
  for (w = O + 1; O < ka; O++, M++, w++) M === ka &&
    (M = 0), w === ka && (w = 0), Ua[O] = d(t[O], t[M], t[w]);
  var Fa = [],
    wa, D = Ua.concat();
  A = 0;
  for (K = n.length; A < K; A++) {
    G = n[A];
    wa = [];
    O = 0;
    ka = G.length;
    M = ka - 1;
    for (w = O + 1; O < ka; O++, M++, w++) M === ka && (M = 0), w === ka && (w = 0), wa[O] = d(G[O], G[M], G[w]);
    Fa.push(wa);
    D = D.concat(wa)
  }
  for (M = 0; M < l; M++) {
    G = M / l;
    Z = i * (1 - G);
    w = j * Math.sin(G * Math.PI / 2);
    O = 0;
    for (ka = t.length; O < ka; O++) L = c(t[O], Ua[O], w), f(L.x, L.y, -Z);
    A = 0;
    for (K = n.length; A < K; A++) {
      G = n[A];
      wa = Fa[A];
      O = 0;
      for (ka = G.length; O < ka; O++) L = c(G[O], wa[O], w), f(L.x, L.y, -Z)
    }
  }
  w = j;
  for (O = 0; O < pa; O++) L = m ? c(N[O], D[O],
    w) : N[O], r ? (H.copy(C.normals[0]).multiplyScalar(L.x), F.copy(C.binormals[0]).multiplyScalar(L.y), I.copy(q[0]).add(H).add(F), f(I.x, I.y, I.z)) : f(L.x, L.y, 0);
  for (G = 1; G <= p; G++)
    for (O = 0; O < pa; O++) L = m ? c(N[O], D[O], w) : N[O], r ? (H.copy(C.normals[G]).multiplyScalar(L.x), F.copy(C.binormals[G]).multiplyScalar(L.y), I.copy(q[G]).add(H).add(F), f(I.x, I.y, I.z)) : f(L.x, L.y, g / p * G);
  for (M = l - 1; 0 <= M; M--) {
    G = M / l;
    Z = i * (1 - G);
    w = j * Math.sin(G * Math.PI / 2);
    O = 0;
    for (ka = t.length; O < ka; O++) L = c(t[O], Ua[O], w), f(L.x, L.y, g + Z);
    A = 0;
    for (K = n.length; A <
      K; A++) {
      G = n[A];
      wa = Fa[A];
      O = 0;
      for (ka = G.length; O < ka; O++) L = c(G[O], wa[O], w), r ? f(L.x, L.y + q[p - 1].y, q[p - 1].x + Z) : f(L.x, L.y, g + Z)
    }
  }
  if (m) {
    i = 0 * pa;
    for (O = 0; O < Pa; O++) g = y[O], h(g[2] + i, g[1] + i, g[0] + i, !0);
    i = pa * (p + 2 * l);
    for (O = 0; O < Pa; O++) g = y[O], h(g[0] + i, g[1] + i, g[2] + i, !1)
  } else {
    for (O = 0; O < Pa; O++) g = y[O], h(g[2], g[1], g[0], !0);
    for (O = 0; O < Pa; O++) g = y[O], h(g[0] + pa * p, g[1] + pa * p, g[2] + pa * p, !1)
  }
  g = 0;
  e(t, g);
  g += t.length;
  A = 0;
  for (K = n.length; A < K; A++) G = n[A], e(G, g), g += G.length
};
THREE.ExtrudeGeometry.WorldUVGenerator = {
  generateTopUV: function (a, b, c, d, e, f) {
    b = a.vertices[e].x;
    e = a.vertices[e].y;
    c = a.vertices[f].x;
    f = a.vertices[f].y;
    return [new THREE.Vector2(a.vertices[d].x, a.vertices[d].y), new THREE.Vector2(b, e), new THREE.Vector2(c, f)]
  },
  generateBottomUV: function (a, b, c, d, e, f) {
    return this.generateTopUV(a, b, c, d, e, f)
  },
  generateSideWallUV: function (a, b, c, d, e, f, h, g) {
    var b = a.vertices[e].x,
      c = a.vertices[e].y,
      e = a.vertices[e].z,
      d = a.vertices[f].x,
      i = a.vertices[f].y,
      f = a.vertices[f].z,
      j = a.vertices[h].x,
      l = a.vertices[h].y,
      h = a.vertices[h].z,
      m = a.vertices[g].x,
      n = a.vertices[g].y,
      a = a.vertices[g].z;
    return 0.01 > Math.abs(c - i) ? [new THREE.Vector2(b, 1 - e), new THREE.Vector2(d, 1 - f), new THREE.Vector2(j, 1 - h), new THREE.Vector2(m, 1 - a)] : [new THREE.Vector2(c, 1 - e), new THREE.Vector2(i, 1 - f), new THREE.Vector2(l, 1 - h), new THREE.Vector2(n, 1 - a)]
  }
};
THREE.ExtrudeGeometry.__v1 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v2 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v3 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v4 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v5 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v6 = new THREE.Vector2;
THREE.ShapeGeometry = function (a, b) {
  THREE.Geometry.call(this);
  !1 === a instanceof Array && (a = [a]);
  this.shapebb = a[a.length - 1].getBoundingBox();
  this.addShapeList(a, b);
  this.computeCentroids();
  this.computeFaceNormals()
};
THREE.ShapeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ShapeGeometry.prototype.addShapeList = function (a, b) {
  for (var c = 0, d = a.length; c < d; c++) this.addShape(a[c], b);
  return this
};
THREE.ShapeGeometry.prototype.addShape = function (a, b) {
  void 0 === b && (b = {});
  var c = b.material,
    d = void 0 === b.UVGenerator ? THREE.ExtrudeGeometry.WorldUVGenerator : b.UVGenerator,
    e, f, h, g = this.vertices.length;
  e = a.extractPoints(void 0 !== b.curveSegments ? b.curveSegments : 12);
  var i = e.shape,
    j = e.holes;
  if (!THREE.Shape.Utils.isClockWise(i)) {
    i = i.reverse();
    e = 0;
    for (f = j.length; e < f; e++) h = j[e], THREE.Shape.Utils.isClockWise(h) && (j[e] = h.reverse())
  }
  var l = THREE.Shape.Utils.triangulateShape(i, j);
  e = 0;
  for (f = j.length; e < f; e++) h = j[e],
    i = i.concat(h);
  j = i.length;
  f = l.length;
  for (e = 0; e < j; e++) h = i[e], this.vertices.push(new THREE.Vector3(h.x, h.y, 0));
  for (e = 0; e < f; e++) j = l[e], i = j[0] + g, h = j[1] + g, j = j[2] + g, this.faces.push(new THREE.Face3(i, h, j, null, null, c)), this.faceVertexUvs[0].push(d.generateBottomUV(this, a, b, i, h, j))
};
THREE.LatheGeometry = function (a, b, c, d) {
  THREE.Geometry.call(this);
  for (var b = b || 12, c = c || 0, d = d || 2 * Math.PI, e = 1 / (a.length - 1), f = 1 / b, h = 0, g = b; h <= g; h++)
    for (var i = c + h * f * d, j = Math.cos(i), l = Math.sin(i), i = 0, m = a.length; i < m; i++) {
      var n = a[i],
        p = new THREE.Vector3;
      p.x = j * n.x - l * n.y;
      p.y = l * n.x + j * n.y;
      p.z = n.z;
      this.vertices.push(p)
    }
  c = a.length;
  h = 0;
  for (g = b; h < g; h++) {
    i = 0;
    for (m = a.length - 1; i < m; i++) d = b = i + c * h, l = b + c, j = b + 1 + c, this.faces.push(new THREE.Face4(d, l, j, b + 1)), j = h * f, b = i * e, d = j + f, l = b + e, this.faceVertexUvs[0].push([new THREE.Vector2(j,
      b), new THREE.Vector2(d, b), new THREE.Vector2(d, l), new THREE.Vector2(j, l)])
  }
  this.mergeVertices();
  this.computeCentroids();
  this.computeFaceNormals();
  this.computeVertexNormals()
};
THREE.LatheGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.PlaneGeometry = function (a, b, c, d) {
  THREE.Geometry.call(this);
  this.width = a;
  this.height = b;
  this.widthSegments = c || 1;
  this.heightSegments = d || 1;
  for (var c = a / 2, e = b / 2, d = this.widthSegments, f = this.heightSegments, h = d + 1, g = f + 1, i = this.width / d, j = this.height / f, l = new THREE.Vector3(0, 0, 1), a = 0; a < g; a++)
    for (b = 0; b < h; b++) this.vertices.push(new THREE.Vector3(b * i - c, -(a * j - e), 0));
  for (a = 0; a < f; a++)
    for (b = 0; b < d; b++) c = new THREE.Face4(b + h * a, b + h * (a + 1), b + 1 + h * (a + 1), b + 1 + h * a), c.normal.copy(l), c.vertexNormals.push(l.clone(), l.clone(),
      l.clone(), l.clone()), this.faces.push(c), this.faceVertexUvs[0].push([new THREE.Vector2(b / d, 1 - a / f), new THREE.Vector2(b / d, 1 - (a + 1) / f), new THREE.Vector2((b + 1) / d, 1 - (a + 1) / f), new THREE.Vector2((b + 1) / d, 1 - a / f)]);
  this.computeCentroids()
};
THREE.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.RingGeometry = function (a, b, c, d, e, f) {
  THREE.Geometry.call(this);
  for (var a = a || 0, b = b || 50, e = void 0 !== e ? e : 0, f = void 0 !== f ? f : 2 * Math.PI, c = void 0 !== c ? Math.max(3, c) : 8, d = void 0 !== d ? Math.max(3, d) : 8, h = [], g = a, i = (b - a) / d, a = 0; a <= d; a++) {
    for (b = 0; b <= c; b++) {
      var j = new THREE.Vector3,
        l = e + b / c * f;
      j.x = g * Math.cos(l);
      j.y = g * Math.sin(l);
      this.vertices.push(j);
      h.push(new THREE.Vector2((j.x / g + 1) / 2, -(j.y / g + 1) / 2 + 1))
    }
    g += i
  }
  e = new THREE.Vector3(0, 0, 1);
  for (a = 0; a < d; a++) {
    f = a * c;
    for (b = 0; b <= c; b++) {
      var l = b + f,
        i = l + a,
        j = l + c + a,
        m = l + c + 1 + a;
      this.faces.push(new THREE.Face3(i,
        j, m, [e, e, e]));
      this.faceVertexUvs[0].push([h[i], h[j], h[m]]);
      i = l + a;
      j = l + c + 1 + a;
      m = l + 1 + a;
      this.faces.push(new THREE.Face3(i, j, m, [e, e, e]));
      this.faceVertexUvs[0].push([h[i], h[j], h[m]])
    }
  }
  this.computeCentroids();
  this.computeFaceNormals();
  this.boundingSphere = new THREE.Sphere(new THREE.Vector3, g)
};
THREE.RingGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.SphereGeometry = function (a, b, c, d, e, f, h) {
  THREE.Geometry.call(this);
  this.radius = a = a || 50;
  this.widthSegments = b = Math.max(3, Math.floor(b) || 8);
  this.heightSegments = c = Math.max(2, Math.floor(c) || 6);
  this.phiStart = d = void 0 !== d ? d : 0;
  this.phiLength = e = void 0 !== e ? e : 2 * Math.PI;
  this.thetaStart = f = void 0 !== f ? f : 0;
  this.thetaLength = h = void 0 !== h ? h : Math.PI;
  var g, i, j = [],
    l = [];
  for (i = 0; i <= c; i++) {
    var m = [],
      n = [];
    for (g = 0; g <= b; g++) {
      var p = g / b,
        t = i / c,
        q = new THREE.Vector3;
      q.x = -a * Math.cos(d + p * e) * Math.sin(f + t * h);
      q.y = a * Math.cos(f + t * h);
      q.z = a * Math.sin(d + p * e) * Math.sin(f + t * h);
      this.vertices.push(q);
      m.push(this.vertices.length - 1);
      n.push(new THREE.Vector2(p, 1 - t))
    }
    j.push(m);
    l.push(n)
  }
  for (i = 0; i < this.heightSegments; i++)
    for (g = 0; g < this.widthSegments; g++) {
      var b = j[i][g + 1],
        c = j[i][g],
        d = j[i + 1][g],
        e = j[i + 1][g + 1],
        f = this.vertices[b].clone().normalize(),
        h = this.vertices[c].clone().normalize(),
        m = this.vertices[d].clone().normalize(),
        n = this.vertices[e].clone().normalize(),
        p = l[i][g + 1].clone(),
        t = l[i][g].clone(),
        q = l[i + 1][g].clone(),
        r = l[i + 1][g + 1].clone();
      Math.abs(this.vertices[b].y) ===
        this.radius ? (this.faces.push(new THREE.Face3(b, d, e, [f, m, n])), this.faceVertexUvs[0].push([p, q, r])) : Math.abs(this.vertices[d].y) === this.radius ? (this.faces.push(new THREE.Face3(b, c, d, [f, h, m])), this.faceVertexUvs[0].push([p, t, q])) : (this.faces.push(new THREE.Face4(b, c, d, e, [f, h, m, n])), this.faceVertexUvs[0].push([p, t, q, r]))
    }
  this.computeCentroids();
  this.computeFaceNormals();
  this.boundingSphere = new THREE.Sphere(new THREE.Vector3, a)
};
THREE.SphereGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TextGeometry = function (a, b) {
  var b = b || {},
    c = THREE.FontUtils.generateShapes(a, b);
  b.amount = void 0 !== b.height ? b.height : 50;
  void 0 === b.bevelThickness && (b.bevelThickness = 10);
  void 0 === b.bevelSize && (b.bevelSize = 8);
  void 0 === b.bevelEnabled && (b.bevelEnabled = !1);
  THREE.ExtrudeGeometry.call(this, c, b)
};
THREE.TextGeometry.prototype = Object.create(THREE.ExtrudeGeometry.prototype);
THREE.TorusGeometry = function (a, b, c, d, e) {
  THREE.Geometry.call(this);
  this.radius = a || 100;
  this.tube = b || 40;
  this.radialSegments = c || 8;
  this.tubularSegments = d || 6;
  this.arc = e || 2 * Math.PI;
  e = new THREE.Vector3;
  a = [];
  b = [];
  for (c = 0; c <= this.radialSegments; c++)
    for (d = 0; d <= this.tubularSegments; d++) {
      var f = d / this.tubularSegments * this.arc,
        h = 2 * c / this.radialSegments * Math.PI;
      e.x = this.radius * Math.cos(f);
      e.y = this.radius * Math.sin(f);
      var g = new THREE.Vector3;
      g.x = (this.radius + this.tube * Math.cos(h)) * Math.cos(f);
      g.y = (this.radius + this.tube *
        Math.cos(h)) * Math.sin(f);
      g.z = this.tube * Math.sin(h);
      this.vertices.push(g);
      a.push(new THREE.Vector2(d / this.tubularSegments, c / this.radialSegments));
      b.push(g.clone().sub(e).normalize())
    }
  for (c = 1; c <= this.radialSegments; c++)
    for (d = 1; d <= this.tubularSegments; d++) {
      var e = (this.tubularSegments + 1) * c + d - 1,
        f = (this.tubularSegments + 1) * (c - 1) + d - 1,
        h = (this.tubularSegments + 1) * (c - 1) + d,
        g = (this.tubularSegments + 1) * c + d,
        i = new THREE.Face4(e, f, h, g, [b[e], b[f], b[h], b[g]]);
      i.normal.add(b[e]);
      i.normal.add(b[f]);
      i.normal.add(b[h]);
      i.normal.add(b[g]);
      i.normal.normalize();
      this.faces.push(i);
      this.faceVertexUvs[0].push([a[e].clone(), a[f].clone(), a[h].clone(), a[g].clone()])
    }
  this.computeCentroids()
};
THREE.TorusGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TorusKnotGeometry = function (a, b, c, d, e, f, h) {
  function g(a, b, c, d, e) {
    var f = Math.cos(a),
      g = Math.sin(a),
      a = b / c * a,
      b = Math.cos(a),
      f = 0.5 * (d * (2 + b)) * f,
      g = 0.5 * d * (2 + b) * g,
      d = 0.5 * e * d * Math.sin(a);
    return new THREE.Vector3(f, g, d)
  }
  THREE.Geometry.call(this);
  this.radius = a || 100;
  this.tube = b || 40;
  this.radialSegments = c || 64;
  this.tubularSegments = d || 8;
  this.p = e || 2;
  this.q = f || 3;
  this.heightScale = h || 1;
  this.grid = Array(this.radialSegments);
  c = new THREE.Vector3;
  d = new THREE.Vector3;
  e = new THREE.Vector3;
  for (a = 0; a < this.radialSegments; ++a) {
    this.grid[a] =
      Array(this.tubularSegments);
    b = 2 * (a / this.radialSegments) * this.p * Math.PI;
    f = g(b, this.q, this.p, this.radius, this.heightScale);
    b = g(b + 0.01, this.q, this.p, this.radius, this.heightScale);
    c.subVectors(b, f);
    d.addVectors(b, f);
    e.crossVectors(c, d);
    d.crossVectors(e, c);
    e.normalize();
    d.normalize();
    for (b = 0; b < this.tubularSegments; ++b) {
      var i = 2 * (b / this.tubularSegments) * Math.PI,
        h = -this.tube * Math.cos(i),
        i = this.tube * Math.sin(i),
        j = new THREE.Vector3;
      j.x = f.x + h * d.x + i * e.x;
      j.y = f.y + h * d.y + i * e.y;
      j.z = f.z + h * d.z + i * e.z;
      this.grid[a][b] =
        this.vertices.push(j) - 1
    }
  }
  for (a = 0; a < this.radialSegments; ++a)
    for (b = 0; b < this.tubularSegments; ++b) {
      var e = (a + 1) % this.radialSegments,
        f = (b + 1) % this.tubularSegments,
        c = this.grid[a][b],
        d = this.grid[e][b],
        e = this.grid[e][f],
        f = this.grid[a][f],
        h = new THREE.Vector2(a / this.radialSegments, b / this.tubularSegments),
        i = new THREE.Vector2((a + 1) / this.radialSegments, b / this.tubularSegments),
        j = new THREE.Vector2((a + 1) / this.radialSegments, (b + 1) / this.tubularSegments),
        l = new THREE.Vector2(a / this.radialSegments, (b + 1) / this.tubularSegments);
      this.faces.push(new THREE.Face4(c, d, e, f));
      this.faceVertexUvs[0].push([h, i, j, l])
    }
  this.computeCentroids();
  this.computeFaceNormals();
  this.computeVertexNormals()
};
THREE.TorusKnotGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry = function (a, b, c, d, e) {
  THREE.Geometry.call(this);
  this.path = a;
  this.segments = b || 64;
  this.radius = c || 1;
  this.radialSegments = d || 8;
  this.closed = e || !1;
  this.grid = [];
  var f, h, d = this.segments + 1,
    g, i, j, e = new THREE.Vector3,
    l, m, b = new THREE.TubeGeometry.FrenetFrames(this.path, this.segments, this.closed);
  l = b.normals;
  m = b.binormals;
  this.tangents = b.tangents;
  this.normals = l;
  this.binormals = m;
  for (b = 0; b < d; b++) {
    this.grid[b] = [];
    c = b / (d - 1);
    j = a.getPointAt(c);
    f = l[b];
    h = m[b];
    for (c = 0; c < this.radialSegments; c++) g = 2 * (c / this.radialSegments) *
      Math.PI, i = -this.radius * Math.cos(g), g = this.radius * Math.sin(g), e.copy(j), e.x += i * f.x + g * h.x, e.y += i * f.y + g * h.y, e.z += i * f.z + g * h.z, this.grid[b][c] = this.vertices.push(new THREE.Vector3(e.x, e.y, e.z)) - 1
  }
  for (b = 0; b < this.segments; b++)
    for (c = 0; c < this.radialSegments; c++) e = this.closed ? (b + 1) % this.segments : b + 1, l = (c + 1) % this.radialSegments, a = this.grid[b][c], d = this.grid[e][c], e = this.grid[e][l], l = this.grid[b][l], m = new THREE.Vector2(b / this.segments, c / this.radialSegments), f = new THREE.Vector2((b + 1) / this.segments, c / this.radialSegments),
      h = new THREE.Vector2((b + 1) / this.segments, (c + 1) / this.radialSegments), i = new THREE.Vector2(b / this.segments, (c + 1) / this.radialSegments), this.faces.push(new THREE.Face4(a, d, e, l)), this.faceVertexUvs[0].push([m, f, h, i]);
  this.computeCentroids();
  this.computeFaceNormals();
  this.computeVertexNormals()
};
THREE.TubeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry.FrenetFrames = function (a, b, c) {
  new THREE.Vector3;
  var d = new THREE.Vector3;
  new THREE.Vector3;
  var e = [],
    f = [],
    h = [],
    g = new THREE.Vector3,
    i = new THREE.Matrix4,
    b = b + 1,
    j, l, m;
  this.tangents = e;
  this.normals = f;
  this.binormals = h;
  for (j = 0; j < b; j++) l = j / (b - 1), e[j] = a.getTangentAt(l), e[j].normalize();
  f[0] = new THREE.Vector3;
  h[0] = new THREE.Vector3;
  a = Number.MAX_VALUE;
  j = Math.abs(e[0].x);
  l = Math.abs(e[0].y);
  m = Math.abs(e[0].z);
  j <= a && (a = j, d.set(1, 0, 0));
  l <= a && (a = l, d.set(0, 1, 0));
  m <= a && d.set(0, 0, 1);
  g.crossVectors(e[0],
    d).normalize();
  f[0].crossVectors(e[0], g);
  h[0].crossVectors(e[0], f[0]);
  for (j = 1; j < b; j++) f[j] = f[j - 1].clone(), h[j] = h[j - 1].clone(), g.crossVectors(e[j - 1], e[j]), 1E-4 < g.length() && (g.normalize(), d = Math.acos(THREE.Math.clamp(e[j - 1].dot(e[j]), -1, 1)), f[j].applyMatrix4(i.makeRotationAxis(g, d))), h[j].crossVectors(e[j], f[j]);
  if (c) {
    d = Math.acos(THREE.Math.clamp(f[0].dot(f[b - 1]), -1, 1));
    d /= b - 1;
    0 < e[0].dot(g.crossVectors(f[0], f[b - 1])) && (d = -d);
    for (j = 1; j < b; j++) f[j].applyMatrix4(i.makeRotationAxis(e[j], d * j)), h[j].crossVectors(e[j],
      f[j])
  }
};
THREE.PolyhedronGeometry = function (a, b, c, d) {
  function e(a) {
    var b = a.normalize().clone();
    b.index = g.vertices.push(b) - 1;
    var c = Math.atan2(a.z, -a.x) / 2 / Math.PI + 0.5,
      a = Math.atan2(-a.y, Math.sqrt(a.x * a.x + a.z * a.z)) / Math.PI + 0.5;
    b.uv = new THREE.Vector2(c, 1 - a);
    return b
  }

  function f(a, b, c) {
    var d = new THREE.Face3(a.index, b.index, c.index, [a.clone(), b.clone(), c.clone()]);
    d.centroid.add(a).add(b).add(c).divideScalar(3);
    g.faces.push(d);
    d = Math.atan2(d.centroid.z, -d.centroid.x);
    g.faceVertexUvs[0].push([h(a.uv, a, d), h(b.uv, b, d),
      h(c.uv, c, d)
    ])
  }

  function h(a, b, c) {
    0 > c && 1 === a.x && (a = new THREE.Vector2(a.x - 1, a.y));
    0 === b.x && 0 === b.z && (a = new THREE.Vector2(c / 2 / Math.PI + 0.5, a.y));
    return a.clone()
  }
  THREE.Geometry.call(this);
  for (var c = c || 1, d = d || 0, g = this, i = 0, j = a.length; i < j; i++) e(new THREE.Vector3(a[i][0], a[i][1], a[i][2]));
  for (var l = this.vertices, a = [], i = 0, j = b.length; i < j; i++) {
    var m = l[b[i][0]],
      n = l[b[i][1]],
      p = l[b[i][2]];
    a[i] = new THREE.Face3(m.index, n.index, p.index, [m.clone(), n.clone(), p.clone()])
  }
  i = 0;
  for (j = a.length; i < j; i++) {
    n = a[i];
    l = d;
    b = Math.pow(2,
      l);
    Math.pow(4, l);
    for (var l = e(g.vertices[n.a]), m = e(g.vertices[n.b]), t = e(g.vertices[n.c]), n = [], p = 0; p <= b; p++) {
      n[p] = [];
      for (var q = e(l.clone().lerp(t, p / b)), r = e(m.clone().lerp(t, p / b)), s = b - p, v = 0; v <= s; v++) n[p][v] = 0 == v && p == b ? q : e(q.clone().lerp(r, v / s))
    }
    for (p = 0; p < b; p++)
      for (v = 0; v < 2 * (b - p) - 1; v++) l = Math.floor(v / 2), 0 == v % 2 ? f(n[p][l + 1], n[p + 1][l], n[p][l]) : f(n[p][l + 1], n[p + 1][l + 1], n[p + 1][l])
  }
  i = 0;
  for (j = this.faceVertexUvs[0].length; i < j; i++) d = this.faceVertexUvs[0][i], a = d[0].x, b = d[1].x, l = d[2].x, m = Math.max(a, Math.max(b, l)),
    n = Math.min(a, Math.min(b, l)), 0.9 < m && 0.1 > n && (0.2 > a && (d[0].x += 1), 0.2 > b && (d[1].x += 1), 0.2 > l && (d[2].x += 1));
  i = 0;
  for (j = this.vertices.length; i < j; i++) this.vertices[i].multiplyScalar(c);
  this.mergeVertices();
  this.computeCentroids();
  this.computeFaceNormals();
  this.boundingSphere = new THREE.Sphere(new THREE.Vector3, c)
};
THREE.PolyhedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.IcosahedronGeometry = function (a, b) {
  this.radius = a;
  this.detail = b;
  var c = (1 + Math.sqrt(5)) / 2;
  THREE.PolyhedronGeometry.call(this, [
    [-1, c, 0],
    [1, c, 0],
    [-1, -c, 0],
    [1, -c, 0],
    [0, -1, c],
    [0, 1, c],
    [0, -1, -c],
    [0, 1, -c],
    [c, 0, -1],
    [c, 0, 1],
    [-c, 0, -1],
    [-c, 0, 1]
  ], [
    [0, 11, 5],
    [0, 5, 1],
    [0, 1, 7],
    [0, 7, 10],
    [0, 10, 11],
    [1, 5, 9],
    [5, 11, 4],
    [11, 10, 2],
    [10, 7, 6],
    [7, 1, 8],
    [3, 9, 4],
    [3, 4, 2],
    [3, 2, 6],
    [3, 6, 8],
    [3, 8, 9],
    [4, 9, 5],
    [2, 4, 11],
    [6, 2, 10],
    [8, 6, 7],
    [9, 8, 1]
  ], a, b)
};
THREE.IcosahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.OctahedronGeometry = function (a, b) {
  THREE.PolyhedronGeometry.call(this, [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1]
  ], [
    [0, 2, 4],
    [0, 4, 3],
    [0, 3, 5],
    [0, 5, 2],
    [1, 2, 5],
    [1, 5, 3],
    [1, 3, 4],
    [1, 4, 2]
  ], a, b)
};
THREE.OctahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TetrahedronGeometry = function (a, b) {
  THREE.PolyhedronGeometry.call(this, [
    [1, 1, 1],
    [-1, -1, 1],
    [-1, 1, -1],
    [1, -1, -1]
  ], [
    [2, 1, 0],
    [0, 3, 2],
    [1, 3, 0],
    [2, 3, 1]
  ], a, b)
};
THREE.TetrahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ParametricGeometry = function (a, b, c, d) {
  THREE.Geometry.call(this);
  var e = this.vertices,
    f = this.faces,
    h = this.faceVertexUvs[0],
    d = void 0 === d ? !1 : d,
    g, i, j, l, m = b + 1;
  for (g = 0; g <= c; g++) {
    l = g / c;
    for (i = 0; i <= b; i++) j = i / b, j = a(j, l), e.push(j)
  }
  var n, p, t, q;
  for (g = 0; g < c; g++)
    for (i = 0; i < b; i++) a = g * m + i, e = g * m + i + 1, l = (g + 1) * m + i, j = (g + 1) * m + i + 1, n = new THREE.Vector2(i / b, g / c), p = new THREE.Vector2((i + 1) / b, g / c), t = new THREE.Vector2(i / b, (g + 1) / c), q = new THREE.Vector2((i + 1) / b, (g + 1) / c), d ? (f.push(new THREE.Face3(a, e, l)), f.push(new THREE.Face3(e,
      j, l)), h.push([n, p, t]), h.push([p, q, t])) : (f.push(new THREE.Face4(a, e, j, l)), h.push([n, p, q, t]));
  this.computeCentroids();
  this.computeFaceNormals();
  this.computeVertexNormals()
};
THREE.ParametricGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.AxisHelper = function (a) {
  var a = a || 1,
    b = new THREE.Geometry;
  b.vertices.push(new THREE.Vector3, new THREE.Vector3(a, 0, 0), new THREE.Vector3, new THREE.Vector3(0, a, 0), new THREE.Vector3, new THREE.Vector3(0, 0, a));
  b.colors.push(new THREE.Color(16711680), new THREE.Color(16755200), new THREE.Color(65280), new THREE.Color(11206400), new THREE.Color(255), new THREE.Color(43775));
  a = new THREE.LineBasicMaterial({
    vertexColors: THREE.VertexColors
  });
  THREE.Line.call(this, b, a, THREE.LinePieces)
};
THREE.AxisHelper.prototype = Object.create(THREE.Line.prototype);
THREE.ArrowHelper = function (a, b, c, d) {
  THREE.Object3D.call(this);
  void 0 === d && (d = 16776960);
  void 0 === c && (c = 1);
  this.position = b;
  b = new THREE.Geometry;
  b.vertices.push(new THREE.Vector3(0, 0, 0));
  b.vertices.push(new THREE.Vector3(0, 1, 0));
  this.line = new THREE.Line(b, new THREE.LineBasicMaterial({
    color: d
  }));
  this.line.matrixAutoUpdate = !1;
  this.add(this.line);
  b = new THREE.CylinderGeometry(0, 0.05, 0.25, 5, 1);
  b.applyMatrix((new THREE.Matrix4).makeTranslation(0, 0.875, 0));
  this.cone = new THREE.Mesh(b, new THREE.MeshBasicMaterial({
    color: d
  }));
  this.cone.matrixAutoUpdate = !1;
  this.add(this.cone);
  this.setDirection(a);
  this.setLength(c)
};
THREE.ArrowHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.ArrowHelper.prototype.setDirection = function () {
  var a = new THREE.Vector3,
    b;
  return function (c) {
    0.99999 < c.y ? this.quaternion.set(0, 0, 0, 1) : -0.99999 > c.y ? this.quaternion.set(1, 0, 0, 0) : (a.set(c.z, 0, -c.x).normalize(), b = Math.acos(c.y), this.quaternion.setFromAxisAngle(a, b))
  }
}();
THREE.ArrowHelper.prototype.setLength = function (a) {
  this.scale.set(a, a, a)
};
THREE.ArrowHelper.prototype.setColor = function (a) {
  this.line.material.color.setHex(a);
  this.cone.material.color.setHex(a)
};
THREE.BoxHelper = function (a) {
  var b = [new THREE.Vector3(1, 1, 1), new THREE.Vector3(-1, 1, 1), new THREE.Vector3(-1, -1, 1), new THREE.Vector3(1, -1, 1), new THREE.Vector3(1, 1, -1), new THREE.Vector3(-1, 1, -1), new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, -1, -1)];
  this.vertices = b;
  var c = new THREE.Geometry;
  c.vertices.push(b[0], b[1], b[1], b[2], b[2], b[3], b[3], b[0], b[4], b[5], b[5], b[6], b[6], b[7], b[7], b[4], b[0], b[4], b[1], b[5], b[2], b[6], b[3], b[7]);
  THREE.Line.call(this, c, new THREE.LineBasicMaterial({
    color: 16776960
  }), THREE.LinePieces);
  void 0 !== a && this.update(a)
};
THREE.BoxHelper.prototype = Object.create(THREE.Line.prototype);
THREE.BoxHelper.prototype.update = function (a) {
  var b = a.geometry;
  null === b.boundingBox && b.computeBoundingBox();
  var c = b.boundingBox.min,
    b = b.boundingBox.max,
    d = this.vertices;
  d[0].set(b.x, b.y, b.z);
  d[1].set(c.x, b.y, b.z);
  d[2].set(c.x, c.y, b.z);
  d[3].set(b.x, c.y, b.z);
  d[4].set(b.x, b.y, c.z);
  d[5].set(c.x, b.y, c.z);
  d[6].set(c.x, c.y, c.z);
  d[7].set(b.x, c.y, c.z);
  this.geometry.computeBoundingSphere();
  this.geometry.verticesNeedUpdate = !0;
  this.matrixAutoUpdate = !1;
  this.matrixWorld = a.matrixWorld
};
THREE.BoundingBoxHelper = function (a, b) {
  var c = b || 8947848;
  this.object = a;
  this.box = new THREE.Box3;
  THREE.Mesh.call(this, new THREE.CubeGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
    color: c,
    wireframe: !0
  }))
};
THREE.BoundingBoxHelper.prototype = Object.create(THREE.Mesh.prototype);
THREE.BoundingBoxHelper.prototype.update = function () {
  this.box.setFromObject(this.object);
  this.box.size(this.scale);
  this.box.center(this.position)
};
THREE.CameraHelper = function (a) {
  function b(a, b, d) {
    c(a, d);
    c(b, d)
  }

  function c(a, b) {
    d.vertices.push(new THREE.Vector3);
    d.colors.push(new THREE.Color(b));
    void 0 === f[a] && (f[a] = []);
    f[a].push(d.vertices.length - 1)
  }
  var d = new THREE.Geometry,
    e = new THREE.LineBasicMaterial({
      color: 16777215,
      vertexColors: THREE.FaceColors
    }),
    f = {};
  b("n1", "n2", 16755200);
  b("n2", "n4", 16755200);
  b("n4", "n3", 16755200);
  b("n3", "n1", 16755200);
  b("f1", "f2", 16755200);
  b("f2", "f4", 16755200);
  b("f4", "f3", 16755200);
  b("f3", "f1", 16755200);
  b("n1", "f1", 16755200);
  b("n2", "f2", 16755200);
  b("n3", "f3", 16755200);
  b("n4", "f4", 16755200);
  b("p", "n1", 16711680);
  b("p", "n2", 16711680);
  b("p", "n3", 16711680);
  b("p", "n4", 16711680);
  b("u1", "u2", 43775);
  b("u2", "u3", 43775);
  b("u3", "u1", 43775);
  b("c", "t", 16777215);
  b("p", "c", 3355443);
  b("cn1", "cn2", 3355443);
  b("cn3", "cn4", 3355443);
  b("cf1", "cf2", 3355443);
  b("cf3", "cf4", 3355443);
  THREE.Line.call(this, d, e, THREE.LinePieces);
  this.camera = a;
  this.matrixWorld = a.matrixWorld;
  this.matrixAutoUpdate = !1;
  this.pointMap = f;
  this.update()
};
THREE.CameraHelper.prototype = Object.create(THREE.Line.prototype);
THREE.CameraHelper.prototype.update = function () {
  var a = new THREE.Vector3,
    b = new THREE.Camera,
    c = new THREE.Projector;
  return function () {
    function d(d, h, g, i) {
      a.set(h, g, i);
      c.unprojectVector(a, b);
      d = e.pointMap[d];
      if (void 0 !== d) {
        h = 0;
        for (g = d.length; h < g; h++) e.geometry.vertices[d[h]].copy(a)
      }
    }
    var e = this;
    b.projectionMatrix.copy(this.camera.projectionMatrix);
    d("c", 0, 0, -1);
    d("t", 0, 0, 1);
    d("n1", -1, -1, -1);
    d("n2", 1, -1, -1);
    d("n3", -1, 1, -1);
    d("n4", 1, 1, -1);
    d("f1", -1, -1, 1);
    d("f2", 1, -1, 1);
    d("f3", -1, 1, 1);
    d("f4", 1, 1, 1);
    d("u1",
      0.7, 1.1, -1);
    d("u2", -0.7, 1.1, -1);
    d("u3", 0, 2, -1);
    d("cf1", -1, 0, 1);
    d("cf2", 1, 0, 1);
    d("cf3", 0, -1, 1);
    d("cf4", 0, 1, 1);
    d("cn1", -1, 0, -1);
    d("cn2", 1, 0, -1);
    d("cn3", 0, -1, -1);
    d("cn4", 0, 1, -1);
    this.geometry.verticesNeedUpdate = !0
  }
}();
THREE.DirectionalLightHelper = function (a, b) {
  THREE.Object3D.call(this);
  this.light = a;
  this.light.updateMatrixWorld();
  this.matrixWorld = a.matrixWorld;
  this.matrixAutoUpdate = !1;
  var c = new THREE.PlaneGeometry(b, b),
    d = new THREE.MeshBasicMaterial({
      wireframe: !0,
      fog: !1
    });
  d.color.copy(this.light.color).multiplyScalar(this.light.intensity);
  this.lightPlane = new THREE.Mesh(c, d);
  this.add(this.lightPlane);
  c = new THREE.Geometry;
  c.vertices.push(new THREE.Vector3);
  c.vertices.push(new THREE.Vector3);
  c.computeLineDistances();
  d = new THREE.LineBasicMaterial({
    fog: !1
  });
  d.color.copy(this.light.color).multiplyScalar(this.light.intensity);
  this.targetLine = new THREE.Line(c, d);
  this.add(this.targetLine);
  this.update()
};
THREE.DirectionalLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.DirectionalLightHelper.prototype.update = function () {
  var a = new THREE.Vector3;
  return function () {
    a.getPositionFromMatrix(this.light.matrixWorld).negate();
    this.lightPlane.lookAt(a);
    this.lightPlane.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
    this.targetLine.geometry.vertices[1].copy(a);
    this.targetLine.geometry.verticesNeedUpdate = !0;
    this.targetLine.material.color.copy(this.lightPlane.material.color)
  }
}();
THREE.FaceNormalsHelper = function (a, b, c, d) {
  this.object = a;
  this.size = b || 1;
  for (var a = c || 16776960, d = d || 1, b = new THREE.Geometry, c = 0, e = this.object.geometry.faces.length; c < e; c++) b.vertices.push(new THREE.Vector3), b.vertices.push(new THREE.Vector3);
  THREE.Line.call(this, b, new THREE.LineBasicMaterial({
    color: a,
    linewidth: d
  }), THREE.LinePieces);
  this.matrixAutoUpdate = !1;
  this.normalMatrix = new THREE.Matrix3;
  this.update()
};
THREE.FaceNormalsHelper.prototype = Object.create(THREE.Line.prototype);
THREE.FaceNormalsHelper.prototype.update = function () {
  var a = new THREE.Vector3;
  return function () {
    this.object.updateMatrixWorld(!0);
    this.normalMatrix.getNormalMatrix(this.object.matrixWorld);
    for (var b = this.geometry.vertices, c = this.object.geometry.faces, d = this.object.matrixWorld, e = 0, f = c.length; e < f; e++) {
      var h = c[e];
      a.copy(h.normal).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size);
      var g = 2 * e;
      b[g].copy(h.centroid).applyMatrix4(d);
      b[g + 1].addVectors(b[g], a)
    }
    this.geometry.verticesNeedUpdate = !0;
    return this
  }
}();
THREE.GridHelper = function (a, b) {
  var c = new THREE.Geometry,
    d = new THREE.LineBasicMaterial({
      vertexColors: THREE.VertexColors
    });
  this.color1 = new THREE.Color(4473924);
  this.color2 = new THREE.Color(8947848);
  for (var e = -a; e <= a; e += b) {
    c.vertices.push(new THREE.Vector3(-a, 0, e), new THREE.Vector3(a, 0, e), new THREE.Vector3(e, 0, -a), new THREE.Vector3(e, 0, a));
    var f = 0 === e ? this.color1 : this.color2;
    c.colors.push(f, f, f, f)
  }
  THREE.Line.call(this, c, d, THREE.LinePieces)
};
THREE.GridHelper.prototype = Object.create(THREE.Line.prototype);
THREE.GridHelper.prototype.setColors = function (a, b) {
  this.color1.set(a);
  this.color2.set(b);
  this.geometry.colorsNeedUpdate = !0
};
THREE.HemisphereLightHelper = function (a, b) {
  THREE.Object3D.call(this);
  this.light = a;
  this.light.updateMatrixWorld();
  this.matrixWorld = a.matrixWorld;
  this.matrixAutoUpdate = !1;
  this.colors = [new THREE.Color, new THREE.Color];
  var c = new THREE.SphereGeometry(b, 4, 2);
  c.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI / 2));
  for (var d = 0; 8 > d; d++) c.faces[d].color = this.colors[4 > d ? 0 : 1];
  d = new THREE.MeshBasicMaterial({
    vertexColors: THREE.FaceColors,
    wireframe: !0
  });
  this.lightSphere = new THREE.Mesh(c, d);
  this.add(this.lightSphere);
  this.update()
};
THREE.HemisphereLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.HemisphereLightHelper.prototype.update = function () {
  var a = new THREE.Vector3;
  return function () {
    this.colors[0].copy(this.light.color).multiplyScalar(this.light.intensity);
    this.colors[1].copy(this.light.groundColor).multiplyScalar(this.light.intensity);
    this.lightSphere.lookAt(a.getPositionFromMatrix(this.light.matrixWorld).negate());
    this.lightSphere.geometry.colorsNeedUpdate = !0
  }
}();
THREE.PointLightHelper = function (a, b) {
  this.light = a;
  this.light.updateMatrixWorld();
  var c = new THREE.SphereGeometry(b, 4, 2),
    d = new THREE.MeshBasicMaterial({
      wireframe: !0,
      fog: !1
    });
  d.color.copy(this.light.color).multiplyScalar(this.light.intensity);
  THREE.Mesh.call(this, c, d);
  this.matrixWorld = this.light.matrixWorld;
  this.matrixAutoUpdate = !1
};
THREE.PointLightHelper.prototype = Object.create(THREE.Mesh.prototype);
THREE.PointLightHelper.prototype.update = function () {
  this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
};
THREE.SpotLightHelper = function (a) {
  THREE.Object3D.call(this);
  this.light = a;
  this.light.updateMatrixWorld();
  this.matrixWorld = a.matrixWorld;
  this.matrixAutoUpdate = !1;
  a = new THREE.CylinderGeometry(0, 1, 1, 8, 1, !0);
  a.applyMatrix((new THREE.Matrix4).makeTranslation(0, -0.5, 0));
  a.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI / 2));
  var b = new THREE.MeshBasicMaterial({
    wireframe: !0,
    fog: !1
  });
  this.cone = new THREE.Mesh(a, b);
  this.add(this.cone);
  this.update()
};
THREE.SpotLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.SpotLightHelper.prototype.update = function () {
  var a = new THREE.Vector3;
  return function () {
    var b = this.light.distance ? this.light.distance : 1E4,
      c = b * Math.tan(this.light.angle);
    this.cone.scale.set(c, c, b);
    this.cone.lookAt(a.getPositionFromMatrix(this.light.matrixWorld).negate());
    this.cone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
  }
}();
THREE.VertexNormalsHelper = function (a, b, c, d) {
  this.object = a;
  this.size = b || 1;
  for (var b = c || 16711680, d = d || 1, c = new THREE.Geometry, a = a.geometry.faces, e = 0, f = a.length; e < f; e++)
    for (var h = 0, g = a[e].vertexNormals.length; h < g; h++) c.vertices.push(new THREE.Vector3), c.vertices.push(new THREE.Vector3);
  THREE.Line.call(this, c, new THREE.LineBasicMaterial({
    color: b,
    linewidth: d
  }), THREE.LinePieces);
  this.matrixAutoUpdate = !1;
  this.normalMatrix = new THREE.Matrix3;
  this.update()
};
THREE.VertexNormalsHelper.prototype = Object.create(THREE.Line.prototype);
THREE.VertexNormalsHelper.prototype.update = function () {
  var a = new THREE.Vector3;
  return function () {
    var b = ["a", "b", "c", "d"];
    this.object.updateMatrixWorld(!0);
    this.normalMatrix.getNormalMatrix(this.object.matrixWorld);
    for (var c = this.geometry.vertices, d = this.object.geometry.vertices, e = this.object.geometry.faces, f = this.object.matrixWorld, h = 0, g = 0, i = e.length; g < i; g++)
      for (var j = e[g], l = 0, m = j.vertexNormals.length; l < m; l++) {
        var n = j.vertexNormals[l];
        c[h].copy(d[j[b[l]]]).applyMatrix4(f);
        a.copy(n).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size);
        a.add(c[h]);
        h += 1;
        c[h].copy(a);
        h += 1
      }
    this.geometry.verticesNeedUpdate = !0;
    return this
  }
}();
THREE.VertexTangentsHelper = function (a, b, c, d) {
  this.object = a;
  this.size = b || 1;
  for (var b = c || 255, d = d || 1, c = new THREE.Geometry, a = a.geometry.faces, e = 0, f = a.length; e < f; e++)
    for (var h = 0, g = a[e].vertexTangents.length; h < g; h++) c.vertices.push(new THREE.Vector3), c.vertices.push(new THREE.Vector3);
  THREE.Line.call(this, c, new THREE.LineBasicMaterial({
    color: b,
    linewidth: d
  }), THREE.LinePieces);
  this.matrixAutoUpdate = !1;
  this.update()
};
THREE.VertexTangentsHelper.prototype = Object.create(THREE.Line.prototype);
THREE.VertexTangentsHelper.prototype.update = function () {
  var a = new THREE.Vector3;
  return function () {
    var b = ["a", "b", "c", "d"];
    this.object.updateMatrixWorld(!0);
    for (var c = this.geometry.vertices, d = this.object.geometry.vertices, e = this.object.geometry.faces, f = this.object.matrixWorld, h = 0, g = 0, i = e.length; g < i; g++)
      for (var j = e[g], l = 0, m = j.vertexTangents.length; l < m; l++) {
        var n = j.vertexTangents[l];
        c[h].copy(d[j[b[l]]]).applyMatrix4(f);
        a.copy(n).transformDirection(f).multiplyScalar(this.size);
        a.add(c[h]);
        h += 1;
        c[h].copy(a);
        h += 1
      }
    this.geometry.verticesNeedUpdate = !0;
    return this
  }
}();
THREE.WireframeHelper = function (a) {
  for (var b = [0, 0], c = {}, d = function (a, b) {
      return a - b
    }, e = ["a", "b", "c", "d"], f = new THREE.Geometry, h = a.geometry.vertices, g = a.geometry.faces, i = 0, j = g.length; i < j; i++)
    for (var l = g[i], m = l instanceof THREE.Face4 ? 4 : 3, n = 0; n < m; n++) {
      b[0] = l[e[n]];
      b[1] = l[e[(n + 1) % m]];
      b.sort(d);
      var p = b.toString();
      void 0 === c[p] && (f.vertices.push(h[b[0]]), f.vertices.push(h[b[1]]), c[p] = !0)
    }
  THREE.Line.call(this, f, new THREE.LineBasicMaterial({
    color: 16777215
  }), THREE.LinePieces);
  this.matrixAutoUpdate = !1;
  this.matrixWorld =
    a.matrixWorld
};
THREE.WireframeHelper.prototype = Object.create(THREE.Line.prototype);
THREE.ImmediateRenderObject = function () {
  THREE.Object3D.call(this);
  this.render = function () {}
};
THREE.ImmediateRenderObject.prototype = Object.create(THREE.Object3D.prototype);
THREE.LensFlare = function (a, b, c, d, e) {
  THREE.Object3D.call(this);
  this.lensFlares = [];
  this.positionScreen = new THREE.Vector3;
  this.customUpdateCallback = void 0;
  void 0 !== a && this.add(a, b, c, d, e)
};
THREE.LensFlare.prototype = Object.create(THREE.Object3D.prototype);
THREE.LensFlare.prototype.add = function (a, b, c, d, e, f) {
  void 0 === b && (b = -1);
  void 0 === c && (c = 0);
  void 0 === f && (f = 1);
  void 0 === e && (e = new THREE.Color(16777215));
  void 0 === d && (d = THREE.NormalBlending);
  c = Math.min(c, Math.max(0, c));
  this.lensFlares.push({
    texture: a,
    size: b,
    distance: c,
    x: 0,
    y: 0,
    z: 0,
    scale: 1,
    rotation: 1,
    opacity: f,
    color: e,
    blending: d
  })
};
THREE.LensFlare.prototype.updateLensFlares = function () {
  var a, b = this.lensFlares.length,
    c, d = 2 * -this.positionScreen.x,
    e = 2 * -this.positionScreen.y;
  for (a = 0; a < b; a++) c = this.lensFlares[a], c.x = this.positionScreen.x + d * c.distance, c.y = this.positionScreen.y + e * c.distance, c.wantedRotation = 0.25 * c.x * Math.PI, c.rotation += 0.25 * (c.wantedRotation - c.rotation)
};
THREE.MorphBlendMesh = function (a, b) {
  THREE.Mesh.call(this, a, b);
  this.animationsMap = {};
  this.animationsList = [];
  var c = this.geometry.morphTargets.length;
  this.createAnimation("__default", 0, c - 1, c / 1);
  this.setAnimationWeight("__default", 1)
};
THREE.MorphBlendMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.MorphBlendMesh.prototype.createAnimation = function (a, b, c, d) {
  b = {
    startFrame: b,
    endFrame: c,
    length: c - b + 1,
    fps: d,
    duration: (c - b) / d,
    lastFrame: 0,
    currentFrame: 0,
    active: !1,
    time: 0,
    direction: 1,
    weight: 1,
    directionBackwards: !1,
    mirroredLoop: !1
  };
  this.animationsMap[a] = b;
  this.animationsList.push(b)
};
THREE.MorphBlendMesh.prototype.autoCreateAnimations = function (a) {
  for (var b = /([a-z]+)(\d+)/, c, d = {}, e = this.geometry, f = 0, h = e.morphTargets.length; f < h; f++) {
    var g = e.morphTargets[f].name.match(b);
    if (g && 1 < g.length) {
      var i = g[1];
      d[i] || (d[i] = {
        start: Infinity,
        end: -Infinity
      });
      g = d[i];
      f < g.start && (g.start = f);
      f > g.end && (g.end = f);
      c || (c = i)
    }
  }
  for (i in d) g = d[i], this.createAnimation(i, g.start, g.end, a);
  this.firstAnimation = c
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function (a) {
  if (a = this.animationsMap[a]) a.direction = 1, a.directionBackwards = !1
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function (a) {
  if (a = this.animationsMap[a]) a.direction = -1, a.directionBackwards = !0
};
THREE.MorphBlendMesh.prototype.setAnimationFPS = function (a, b) {
  var c = this.animationsMap[a];
  c && (c.fps = b, c.duration = (c.end - c.start) / c.fps)
};
THREE.MorphBlendMesh.prototype.setAnimationDuration = function (a, b) {
  var c = this.animationsMap[a];
  c && (c.duration = b, c.fps = (c.end - c.start) / c.duration)
};
THREE.MorphBlendMesh.prototype.setAnimationWeight = function (a, b) {
  var c = this.animationsMap[a];
  c && (c.weight = b)
};
THREE.MorphBlendMesh.prototype.setAnimationTime = function (a, b) {
  var c = this.animationsMap[a];
  c && (c.time = b)
};
THREE.MorphBlendMesh.prototype.getAnimationTime = function (a) {
  var b = 0;
  if (a = this.animationsMap[a]) b = a.time;
  return b
};
THREE.MorphBlendMesh.prototype.getAnimationDuration = function (a) {
  var b = -1;
  if (a = this.animationsMap[a]) b = a.duration;
  return b
};
THREE.MorphBlendMesh.prototype.playAnimation = function (a) {
  var b = this.animationsMap[a];
  b ? (b.time = 0, b.active = !0) : console.warn("animation[" + a + "] undefined")
};
THREE.MorphBlendMesh.prototype.stopAnimation = function (a) {
  if (a = this.animationsMap[a]) a.active = !1
};
THREE.MorphBlendMesh.prototype.update = function (a) {
  for (var b = 0, c = this.animationsList.length; b < c; b++) {
    var d = this.animationsList[b];
    if (d.active) {
      var e = d.duration / d.length;
      d.time += d.direction * a;
      if (d.mirroredLoop) {
        if (d.time > d.duration || 0 > d.time) d.direction *= -1, d.time > d.duration && (d.time = d.duration, d.directionBackwards = !0), 0 > d.time && (d.time = 0, d.directionBackwards = !1)
      } else d.time %= d.duration, 0 > d.time && (d.time += d.duration);
      var f = d.startFrame + THREE.Math.clamp(Math.floor(d.time / e), 0, d.length - 1),
        h = d.weight;
      f !== d.currentFrame && (this.morphTargetInfluences[d.lastFrame] = 0, this.morphTargetInfluences[d.currentFrame] = 1 * h, this.morphTargetInfluences[f] = 0, d.lastFrame = d.currentFrame, d.currentFrame = f);
      e = d.time % e / e;
      d.directionBackwards && (e = 1 - e);
      this.morphTargetInfluences[d.currentFrame] = e * h;
      this.morphTargetInfluences[d.lastFrame] = (1 - e) * h
    }
  }
};
THREE.LensFlarePlugin = function () {
  function a(a, c) {
    var d = b.createProgram(),
      e = b.createShader(b.FRAGMENT_SHADER),
      f = b.createShader(b.VERTEX_SHADER),
      g = "precision " + c + " float;\n";
    b.shaderSource(e, g + a.fragmentShader);
    b.shaderSource(f, g + a.vertexShader);
    b.compileShader(e);
    b.compileShader(f);
    b.attachShader(d, e);
    b.attachShader(d, f);
    b.linkProgram(d);
    return d
  }
  var b, c, d, e, f, h, g, i, j, l, m, n, p;
  this.init = function (t) {
    b = t.context;
    c = t;
    d = t.getPrecision();
    e = new Float32Array(16);
    f = new Uint16Array(6);
    t = 0;
    e[t++] = -1;
    e[t++] = -1;
    e[t++] = 0;
    e[t++] = 0;
    e[t++] = 1;
    e[t++] = -1;
    e[t++] = 1;
    e[t++] = 0;
    e[t++] = 1;
    e[t++] = 1;
    e[t++] = 1;
    e[t++] = 1;
    e[t++] = -1;
    e[t++] = 1;
    e[t++] = 0;
    e[t++] = 1;
    t = 0;
    f[t++] = 0;
    f[t++] = 1;
    f[t++] = 2;
    f[t++] = 0;
    f[t++] = 2;
    f[t++] = 3;
    h = b.createBuffer();
    g = b.createBuffer();
    b.bindBuffer(b.ARRAY_BUFFER, h);
    b.bufferData(b.ARRAY_BUFFER, e, b.STATIC_DRAW);
    b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
    b.bufferData(b.ELEMENT_ARRAY_BUFFER, f, b.STATIC_DRAW);
    i = b.createTexture();
    j = b.createTexture();
    b.bindTexture(b.TEXTURE_2D, i);
    b.texImage2D(b.TEXTURE_2D, 0, b.RGB, 16, 16,
      0, b.RGB, b.UNSIGNED_BYTE, null);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
    b.bindTexture(b.TEXTURE_2D, j);
    b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, 16, 16, 0, b.RGBA, b.UNSIGNED_BYTE, null);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
    0 >= b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS) ? (l = !1, m = a(THREE.ShaderFlares.lensFlare, d)) : (l = !0, m = a(THREE.ShaderFlares.lensFlareVertexTexture, d));
    n = {};
    p = {};
    n.vertex = b.getAttribLocation(m, "position");
    n.uv = b.getAttribLocation(m, "uv");
    p.renderType = b.getUniformLocation(m, "renderType");
    p.map = b.getUniformLocation(m, "map");
    p.occlusionMap = b.getUniformLocation(m, "occlusionMap");
    p.opacity =
      b.getUniformLocation(m, "opacity");
    p.color = b.getUniformLocation(m, "color");
    p.scale = b.getUniformLocation(m, "scale");
    p.rotation = b.getUniformLocation(m, "rotation");
    p.screenPosition = b.getUniformLocation(m, "screenPosition")
  };
  this.render = function (a, d, e, f) {
    var a = a.__webglFlares,
      v = a.length;
    if (v) {
      var z = new THREE.Vector3,
        C = f / e,
        F = 0.5 * e,
        H = 0.5 * f,
        I = 16 / f,
        G = new THREE.Vector2(I * C, I),
        A = new THREE.Vector3(1, 1, 0),
        K = new THREE.Vector2(1, 1),
        B = p,
        I = n;
      b.useProgram(m);
      b.enableVertexAttribArray(n.vertex);
      b.enableVertexAttribArray(n.uv);
      b.uniform1i(B.occlusionMap, 0);
      b.uniform1i(B.map, 1);
      b.bindBuffer(b.ARRAY_BUFFER, h);
      b.vertexAttribPointer(I.vertex, 2, b.FLOAT, !1, 16, 0);
      b.vertexAttribPointer(I.uv, 2, b.FLOAT, !1, 16, 8);
      b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
      b.disable(b.CULL_FACE);
      b.depthMask(!1);
      var J, N, y, M, w;
      for (J = 0; J < v; J++)
        if (I = 16 / f, G.set(I * C, I), M = a[J], z.set(M.matrixWorld.elements[12], M.matrixWorld.elements[13], M.matrixWorld.elements[14]), z.applyMatrix4(d.matrixWorldInverse), z.applyProjection(d.projectionMatrix), A.copy(z), K.x = A.x * F + F,
          K.y = A.y * H + H, l || 0 < K.x && K.x < e && 0 < K.y && K.y < f) {
          b.activeTexture(b.TEXTURE1);
          b.bindTexture(b.TEXTURE_2D, i);
          b.copyTexImage2D(b.TEXTURE_2D, 0, b.RGB, K.x - 8, K.y - 8, 16, 16, 0);
          b.uniform1i(B.renderType, 0);
          b.uniform2f(B.scale, G.x, G.y);
          b.uniform3f(B.screenPosition, A.x, A.y, A.z);
          b.disable(b.BLEND);
          b.enable(b.DEPTH_TEST);
          b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
          b.activeTexture(b.TEXTURE0);
          b.bindTexture(b.TEXTURE_2D, j);
          b.copyTexImage2D(b.TEXTURE_2D, 0, b.RGBA, K.x - 8, K.y - 8, 16, 16, 0);
          b.uniform1i(B.renderType, 1);
          b.disable(b.DEPTH_TEST);
          b.activeTexture(b.TEXTURE1);
          b.bindTexture(b.TEXTURE_2D, i);
          b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
          M.positionScreen.copy(A);
          M.customUpdateCallback ? M.customUpdateCallback(M) : M.updateLensFlares();
          b.uniform1i(B.renderType, 2);
          b.enable(b.BLEND);
          N = 0;
          for (y = M.lensFlares.length; N < y; N++) w = M.lensFlares[N], 0.001 < w.opacity && 0.001 < w.scale && (A.x = w.x, A.y = w.y, A.z = w.z, I = w.size * w.scale / f, G.x = I * C, G.y = I, b.uniform3f(B.screenPosition, A.x, A.y, A.z), b.uniform2f(B.scale, G.x, G.y), b.uniform1f(B.rotation, w.rotation), b.uniform1f(B.opacity,
            w.opacity), b.uniform3f(B.color, w.color.r, w.color.g, w.color.b), c.setBlending(w.blending, w.blendEquation, w.blendSrc, w.blendDst), c.setTexture(w.texture, 1), b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0))
        } b.enable(b.CULL_FACE);
      b.enable(b.DEPTH_TEST);
      b.depthMask(!0)
    }
  }
};
THREE.ShadowMapPlugin = function () {
  var a, b, c, d, e, f, h = new THREE.Frustum,
    g = new THREE.Matrix4,
    i = new THREE.Vector3,
    j = new THREE.Vector3,
    l = new THREE.Vector3;
  this.init = function (g) {
    a = g.context;
    b = g;
    var g = THREE.ShaderLib.depthRGBA,
      h = THREE.UniformsUtils.clone(g.uniforms);
    c = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h
    });
    d = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
      morphTargets: !0
    });
    e = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
      skinning: !0
    });
    f = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
      morphTargets: !0,
      skinning: !0
    });
    c._shadowPass = !0;
    d._shadowPass = !0;
    e._shadowPass = !0;
    f._shadowPass = !0
  };
  this.render = function (a, c) {
    b.shadowMapEnabled && b.shadowMapAutoUpdate && this.update(a, c)
  };
  this.update = function (m, n) {
    var p, t, q, r, s, v, z, C, F, H = [];
    r = 0;
    a.clearColor(1, 1, 1, 1);
    a.disable(a.BLEND);
    a.enable(a.CULL_FACE);
    a.frontFace(a.CCW);
    b.shadowMapCullFace === THREE.CullFaceFront ?
      a.cullFace(a.FRONT) : a.cullFace(a.BACK);
    b.setDepthTest(!0);
    p = 0;
    for (t = m.__lights.length; p < t; p++)
      if (q = m.__lights[p], q.castShadow)
        if (q instanceof THREE.DirectionalLight && q.shadowCascade)
          for (s = 0; s < q.shadowCascadeCount; s++) {
            var I;
            if (q.shadowCascadeArray[s]) I = q.shadowCascadeArray[s];
            else {
              F = q;
              z = s;
              I = new THREE.DirectionalLight;
              I.isVirtual = !0;
              I.onlyShadow = !0;
              I.castShadow = !0;
              I.shadowCameraNear = F.shadowCameraNear;
              I.shadowCameraFar = F.shadowCameraFar;
              I.shadowCameraLeft = F.shadowCameraLeft;
              I.shadowCameraRight = F.shadowCameraRight;
              I.shadowCameraBottom = F.shadowCameraBottom;
              I.shadowCameraTop = F.shadowCameraTop;
              I.shadowCameraVisible = F.shadowCameraVisible;
              I.shadowDarkness = F.shadowDarkness;
              I.shadowBias = F.shadowCascadeBias[z];
              I.shadowMapWidth = F.shadowCascadeWidth[z];
              I.shadowMapHeight = F.shadowCascadeHeight[z];
              I.pointsWorld = [];
              I.pointsFrustum = [];
              C = I.pointsWorld;
              v = I.pointsFrustum;
              for (var G = 0; 8 > G; G++) C[G] = new THREE.Vector3, v[G] = new THREE.Vector3;
              C = F.shadowCascadeNearZ[z];
              F = F.shadowCascadeFarZ[z];
              v[0].set(-1, -1, C);
              v[1].set(1, -1, C);
              v[2].set(-1,
                1, C);
              v[3].set(1, 1, C);
              v[4].set(-1, -1, F);
              v[5].set(1, -1, F);
              v[6].set(-1, 1, F);
              v[7].set(1, 1, F);
              I.originalCamera = n;
              v = new THREE.Gyroscope;
              v.position = q.shadowCascadeOffset;
              v.add(I);
              v.add(I.target);
              n.add(v);
              q.shadowCascadeArray[s] = I;
              console.log("Created virtualLight", I)
            }
            z = q;
            C = s;
            F = z.shadowCascadeArray[C];
            F.position.copy(z.position);
            F.target.position.copy(z.target.position);
            F.lookAt(F.target);
            F.shadowCameraVisible = z.shadowCameraVisible;
            F.shadowDarkness = z.shadowDarkness;
            F.shadowBias = z.shadowCascadeBias[C];
            v = z.shadowCascadeNearZ[C];
            z = z.shadowCascadeFarZ[C];
            F = F.pointsFrustum;
            F[0].z = v;
            F[1].z = v;
            F[2].z = v;
            F[3].z = v;
            F[4].z = z;
            F[5].z = z;
            F[6].z = z;
            F[7].z = z;
            H[r] = I;
            r++
          } else H[r] = q, r++;
    p = 0;
    for (t = H.length; p < t; p++) {
      q = H[p];
      q.shadowMap || (s = THREE.LinearFilter, b.shadowMapType === THREE.PCFSoftShadowMap && (s = THREE.NearestFilter), q.shadowMap = new THREE.WebGLRenderTarget(q.shadowMapWidth, q.shadowMapHeight, {
        minFilter: s,
        magFilter: s,
        format: THREE.RGBAFormat
      }), q.shadowMapSize = new THREE.Vector2(q.shadowMapWidth, q.shadowMapHeight), q.shadowMatrix = new THREE.Matrix4);
      if (!q.shadowCamera) {
        if (q instanceof THREE.SpotLight) q.shadowCamera = new THREE.PerspectiveCamera(q.shadowCameraFov, q.shadowMapWidth / q.shadowMapHeight, q.shadowCameraNear, q.shadowCameraFar);
        else if (q instanceof THREE.DirectionalLight) q.shadowCamera = new THREE.OrthographicCamera(q.shadowCameraLeft, q.shadowCameraRight, q.shadowCameraTop, q.shadowCameraBottom, q.shadowCameraNear, q.shadowCameraFar);
        else {
          console.error("Unsupported light type for shadow");
          continue
        }
        m.add(q.shadowCamera);
        !0 === m.autoUpdate && m.updateMatrixWorld()
      }
      q.shadowCameraVisible &&
        !q.cameraHelper && (q.cameraHelper = new THREE.CameraHelper(q.shadowCamera), q.shadowCamera.add(q.cameraHelper));
      if (q.isVirtual && I.originalCamera == n) {
        s = n;
        r = q.shadowCamera;
        v = q.pointsFrustum;
        F = q.pointsWorld;
        i.set(Infinity, Infinity, Infinity);
        j.set(-Infinity, -Infinity, -Infinity);
        for (z = 0; 8 > z; z++) C = F[z], C.copy(v[z]), THREE.ShadowMapPlugin.__projector.unprojectVector(C, s), C.applyMatrix4(r.matrixWorldInverse), C.x < i.x && (i.x = C.x), C.x > j.x && (j.x = C.x), C.y < i.y && (i.y = C.y), C.y > j.y && (j.y = C.y), C.z < i.z && (i.z = C.z), C.z > j.z &&
          (j.z = C.z);
        r.left = i.x;
        r.right = j.x;
        r.top = j.y;
        r.bottom = i.y;
        r.updateProjectionMatrix()
      }
      r = q.shadowMap;
      v = q.shadowMatrix;
      s = q.shadowCamera;
      s.position.getPositionFromMatrix(q.matrixWorld);
      l.getPositionFromMatrix(q.target.matrixWorld);
      s.lookAt(l);
      s.updateMatrixWorld();
      s.matrixWorldInverse.getInverse(s.matrixWorld);
      q.cameraHelper && (q.cameraHelper.visible = q.shadowCameraVisible);
      q.shadowCameraVisible && q.cameraHelper.update();
      v.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
      v.multiply(s.projectionMatrix);
      v.multiply(s.matrixWorldInverse);
      g.multiplyMatrices(s.projectionMatrix, s.matrixWorldInverse);
      h.setFromMatrix(g);
      b.setRenderTarget(r);
      b.clear();
      F = m.__webglObjects;
      q = 0;
      for (r = F.length; q < r; q++)
        if (z = F[q], v = z.object, z.render = !1, v.visible && v.castShadow && (!(v instanceof THREE.Mesh || v instanceof THREE.ParticleSystem) || !v.frustumCulled || h.intersectsObject(v))) v._modelViewMatrix.multiplyMatrices(s.matrixWorldInverse, v.matrixWorld), z.render = !0;
      q = 0;
      for (r = F.length; q < r; q++) z = F[q], z.render && (v = z.object, z = z.buffer, G = v.material instanceof THREE.MeshFaceMaterial ?
        v.material.materials[0] : v.material, C = 0 < v.geometry.morphTargets.length && G.morphTargets, G = v instanceof THREE.SkinnedMesh && G.skinning, C = v.customDepthMaterial ? v.customDepthMaterial : G ? C ? f : e : C ? d : c, z instanceof THREE.BufferGeometry ? b.renderBufferDirect(s, m.__lights, null, C, z, v) : b.renderBuffer(s, m.__lights, null, C, z, v));
      F = m.__webglObjectsImmediate;
      q = 0;
      for (r = F.length; q < r; q++) z = F[q], v = z.object, v.visible && v.castShadow && (v._modelViewMatrix.multiplyMatrices(s.matrixWorldInverse, v.matrixWorld), b.renderImmediateObject(s,
        m.__lights, null, c, v))
    }
    p = b.getClearColor();
    t = b.getClearAlpha();
    a.clearColor(p.r, p.g, p.b, t);
    a.enable(a.BLEND);
    b.shadowMapCullFace === THREE.CullFaceFront && a.cullFace(a.BACK)
  }
};
THREE.ShadowMapPlugin.__projector = new THREE.Projector;
THREE.SpritePlugin = function () {
  function a(a, b) {
    return a.z !== b.z ? b.z - a.z : b.id - a.id
  }
  var b, c, d, e, f, h, g, i, j, l;
  this.init = function (a) {
    b = a.context;
    c = a;
    d = a.getPrecision();
    e = new Float32Array(16);
    f = new Uint16Array(6);
    a = 0;
    e[a++] = -1;
    e[a++] = -1;
    e[a++] = 0;
    e[a++] = 0;
    e[a++] = 1;
    e[a++] = -1;
    e[a++] = 1;
    e[a++] = 0;
    e[a++] = 1;
    e[a++] = 1;
    e[a++] = 1;
    e[a++] = 1;
    e[a++] = -1;
    e[a++] = 1;
    e[a++] = 0;
    e[a++] = 1;
    a = 0;
    f[a++] = 0;
    f[a++] = 1;
    f[a++] = 2;
    f[a++] = 0;
    f[a++] = 2;
    f[a++] = 3;
    h = b.createBuffer();
    g = b.createBuffer();
    b.bindBuffer(b.ARRAY_BUFFER, h);
    b.bufferData(b.ARRAY_BUFFER,
      e, b.STATIC_DRAW);
    b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
    b.bufferData(b.ELEMENT_ARRAY_BUFFER, f, b.STATIC_DRAW);
    var a = THREE.ShaderSprite.sprite,
      n = b.createProgram(),
      p = b.createShader(b.FRAGMENT_SHADER),
      t = b.createShader(b.VERTEX_SHADER),
      q = "precision " + d + " float;\n";
    b.shaderSource(p, q + a.fragmentShader);
    b.shaderSource(t, q + a.vertexShader);
    b.compileShader(p);
    b.compileShader(t);
    b.attachShader(n, p);
    b.attachShader(n, t);
    b.linkProgram(n);
    i = n;
    j = {};
    l = {};
    j.position = b.getAttribLocation(i, "position");
    j.uv = b.getAttribLocation(i,
      "uv");
    l.uvOffset = b.getUniformLocation(i, "uvOffset");
    l.uvScale = b.getUniformLocation(i, "uvScale");
    l.rotation = b.getUniformLocation(i, "rotation");
    l.scale = b.getUniformLocation(i, "scale");
    l.alignment = b.getUniformLocation(i, "alignment");
    l.color = b.getUniformLocation(i, "color");
    l.map = b.getUniformLocation(i, "map");
    l.opacity = b.getUniformLocation(i, "opacity");
    l.useScreenCoordinates = b.getUniformLocation(i, "useScreenCoordinates");
    l.sizeAttenuation = b.getUniformLocation(i, "sizeAttenuation");
    l.screenPosition = b.getUniformLocation(i,
      "screenPosition");
    l.modelViewMatrix = b.getUniformLocation(i, "modelViewMatrix");
    l.projectionMatrix = b.getUniformLocation(i, "projectionMatrix");
    l.fogType = b.getUniformLocation(i, "fogType");
    l.fogDensity = b.getUniformLocation(i, "fogDensity");
    l.fogNear = b.getUniformLocation(i, "fogNear");
    l.fogFar = b.getUniformLocation(i, "fogFar");
    l.fogColor = b.getUniformLocation(i, "fogColor");
    l.alphaTest = b.getUniformLocation(i, "alphaTest")
  };
  this.render = function (d, e, f, t) {
    var q = d.__webglSprites,
      r = q.length;
    if (r) {
      var s = j,
        v = l,
        z = t /
        f,
        f = 0.5 * f,
        C = 0.5 * t;
      b.useProgram(i);
      b.enableVertexAttribArray(s.position);
      b.enableVertexAttribArray(s.uv);
      b.disable(b.CULL_FACE);
      b.enable(b.BLEND);
      b.bindBuffer(b.ARRAY_BUFFER, h);
      b.vertexAttribPointer(s.position, 2, b.FLOAT, !1, 16, 0);
      b.vertexAttribPointer(s.uv, 2, b.FLOAT, !1, 16, 8);
      b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
      b.uniformMatrix4fv(v.projectionMatrix, !1, e.projectionMatrix.elements);
      b.activeTexture(b.TEXTURE0);
      b.uniform1i(v.map, 0);
      var F = s = 0,
        H = d.fog;
      H ? (b.uniform3f(v.fogColor, H.color.r, H.color.g, H.color.b),
        H instanceof THREE.Fog ? (b.uniform1f(v.fogNear, H.near), b.uniform1f(v.fogFar, H.far), b.uniform1i(v.fogType, 1), F = s = 1) : H instanceof THREE.FogExp2 && (b.uniform1f(v.fogDensity, H.density), b.uniform1i(v.fogType, 2), F = s = 2)) : (b.uniform1i(v.fogType, 0), F = s = 0);
      for (var I, G, A = [], H = 0; H < r; H++) I = q[H], G = I.material, I.visible && 0 !== G.opacity && (G.useScreenCoordinates ? I.z = -I.position.z : (I._modelViewMatrix.multiplyMatrices(e.matrixWorldInverse, I.matrixWorld), I.z = -I._modelViewMatrix.elements[14]));
      q.sort(a);
      for (H = 0; H < r; H++) I =
        q[H], G = I.material, I.visible && 0 !== G.opacity && (G.map && G.map.image && G.map.image.width) && (b.uniform1f(v.alphaTest, G.alphaTest), !0 === G.useScreenCoordinates ? (b.uniform1i(v.useScreenCoordinates, 1), b.uniform3f(v.screenPosition, (I.position.x * c.devicePixelRatio - f) / f, (C - I.position.y * c.devicePixelRatio) / C, Math.max(0, Math.min(1, I.position.z))), A[0] = c.devicePixelRatio, A[1] = c.devicePixelRatio) : (b.uniform1i(v.useScreenCoordinates, 0), b.uniform1i(v.sizeAttenuation, G.sizeAttenuation ? 1 : 0), b.uniformMatrix4fv(v.modelViewMatrix,
          !1, I._modelViewMatrix.elements), A[0] = 1, A[1] = 1), e = d.fog && G.fog ? F : 0, s !== e && (b.uniform1i(v.fogType, e), s = e), e = 1 / (G.scaleByViewport ? t : 1), A[0] *= e * z * I.scale.x, A[1] *= e * I.scale.y, b.uniform2f(v.uvScale, G.uvScale.x, G.uvScale.y), b.uniform2f(v.uvOffset, G.uvOffset.x, G.uvOffset.y), b.uniform2f(v.alignment, G.alignment.x, G.alignment.y), b.uniform1f(v.opacity, G.opacity), b.uniform3f(v.color, G.color.r, G.color.g, G.color.b), b.uniform1f(v.rotation, I.rotation), b.uniform2fv(v.scale, A), c.setBlending(G.blending, G.blendEquation,
          G.blendSrc, G.blendDst), c.setDepthTest(G.depthTest), c.setDepthWrite(G.depthWrite), c.setTexture(G.map, 0), b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0));
      b.enable(b.CULL_FACE)
    }
  }
};
THREE.DepthPassPlugin = function () {
  this.enabled = !1;
  this.renderTarget = null;
  var a, b, c, d, e, f, h = new THREE.Frustum,
    g = new THREE.Matrix4;
  this.init = function (g) {
    a = g.context;
    b = g;
    var g = THREE.ShaderLib.depthRGBA,
      h = THREE.UniformsUtils.clone(g.uniforms);
    c = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h
    });
    d = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
      morphTargets: !0
    });
    e = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
      skinning: !0
    });
    f = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
      morphTargets: !0,
      skinning: !0
    });
    c._shadowPass = !0;
    d._shadowPass = !0;
    e._shadowPass = !0;
    f._shadowPass = !0
  };
  this.render = function (a, b) {
    this.enabled && this.update(a, b)
  };
  this.update = function (i, j) {
    var l, m, n, p, t, q;
    a.clearColor(1, 1, 1, 1);
    a.disable(a.BLEND);
    b.setDepthTest(!0);
    !0 === i.autoUpdate && i.updateMatrixWorld();
    j.matrixWorldInverse.getInverse(j.matrixWorld);
    g.multiplyMatrices(j.projectionMatrix,
      j.matrixWorldInverse);
    h.setFromMatrix(g);
    b.setRenderTarget(this.renderTarget);
    b.clear();
    q = i.__webglObjects;
    l = 0;
    for (m = q.length; l < m; l++)
      if (n = q[l], t = n.object, n.render = !1, t.visible && (!(t instanceof THREE.Mesh || t instanceof THREE.ParticleSystem) || !t.frustumCulled || h.intersectsObject(t))) t._modelViewMatrix.multiplyMatrices(j.matrixWorldInverse, t.matrixWorld), n.render = !0;
    var r;
    l = 0;
    for (m = q.length; l < m; l++)
      if (n = q[l], n.render && (t = n.object, n = n.buffer, !(t instanceof THREE.ParticleSystem) || t.customDepthMaterial))(r =
        t.material instanceof THREE.MeshFaceMaterial ? t.material.materials[0] : t.material) && b.setMaterialFaces(t.material), p = 0 < t.geometry.morphTargets.length && r.morphTargets, r = t instanceof THREE.SkinnedMesh && r.skinning, p = t.customDepthMaterial ? t.customDepthMaterial : r ? p ? f : e : p ? d : c, n instanceof THREE.BufferGeometry ? b.renderBufferDirect(j, i.__lights, null, p, n, t) : b.renderBuffer(j, i.__lights, null, p, n, t);
    q = i.__webglObjectsImmediate;
    l = 0;
    for (m = q.length; l < m; l++) n = q[l], t = n.object, t.visible && (t._modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,
      t.matrixWorld), b.renderImmediateObject(j, i.__lights, null, c, t));
    l = b.getClearColor();
    m = b.getClearAlpha();
    a.clearColor(l.r, l.g, l.b, m);
    a.enable(a.BLEND)
  }
};
THREE.ShaderFlares = {
  lensFlareVertexTexture: {
    vertexShader: "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility =        visibility.r / 9.0;\nvVisibility *= 1.0 - visibility.g / 9.0;\nvVisibility *=       visibility.b / 9.0;\nvVisibility *= 1.0 - visibility.a / 9.0;\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
    fragmentShader: "uniform lowp int renderType;\nuniform sampler2D map;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
  },
  lensFlare: {
    vertexShader: "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
    fragmentShader: "precision mediump float;\nuniform lowp int renderType;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a;\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a;\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a;\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
  }
};
THREE.ShaderSprite = {
  sprite: {
    vertexShader: "uniform int useScreenCoordinates;\nuniform int sizeAttenuation;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( sizeAttenuation == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
    fragmentShader: "uniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nuniform int fogType;\nuniform vec3 fogColor;\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nuniform float alphaTest;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\nif ( texture.a < alphaTest ) discard;\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\nif ( fogType > 0 ) {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat fogFactor = 0.0;\nif ( fogType == 1 ) {\nfogFactor = smoothstep( fogNear, fogFar, depth );\n} else {\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n}\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}\n}"
  }
};