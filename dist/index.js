(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.renoir = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
(function (global){
(function(){
var _$module_2 = { exports: {} };
(function (global){
(function (global, factory) {
	typeof _$module_2.exports === 'object' && "object" !== 'undefined' ? _$module_2.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.typeDetect = factory());
}(this, (function () { 'use strict';

/* !
 * type-detect
 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var promiseExists = typeof Promise === 'function';

/* eslint-disable no-undef */
var globalObject = typeof self === 'object' ? self : global; // eslint-disable-line id-blacklist

var symbolExists = typeof Symbol !== 'undefined';
var mapExists = typeof Map !== 'undefined';
var setExists = typeof Set !== 'undefined';
var weakMapExists = typeof WeakMap !== 'undefined';
var weakSetExists = typeof WeakSet !== 'undefined';
var dataViewExists = typeof DataView !== 'undefined';
var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== 'undefined';
var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== 'undefined';
var setEntriesExists = setExists && typeof Set.prototype.entries === 'function';
var mapEntriesExists = mapExists && typeof Map.prototype.entries === 'function';
var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf(new Set().entries());
var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf(new Map().entries());
var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === 'function';
var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === 'function';
var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(''[Symbol.iterator]());
var toStringLeftSliceLength = 8;
var toStringRightSliceLength = -1;
/**
 * ### typeOf (obj)
 *
 * Uses `Object.prototype.toString` to determine the type of an object,
 * normalising behaviour across engine versions & well optimised.
 *
 * @param {Mixed} object
 * @return {String} object type
 * @api public
 */
function typeDetect(obj) {
  /* ! Speed optimisation
   * Pre:
   *   string literal     x 3,039,035 ops/sec ±1.62% (78 runs sampled)
   *   boolean literal    x 1,424,138 ops/sec ±4.54% (75 runs sampled)
   *   number literal     x 1,653,153 ops/sec ±1.91% (82 runs sampled)
   *   undefined          x 9,978,660 ops/sec ±1.92% (75 runs sampled)
   *   function           x 2,556,769 ops/sec ±1.73% (77 runs sampled)
   * Post:
   *   string literal     x 38,564,796 ops/sec ±1.15% (79 runs sampled)
   *   boolean literal    x 31,148,940 ops/sec ±1.10% (79 runs sampled)
   *   number literal     x 32,679,330 ops/sec ±1.90% (78 runs sampled)
   *   undefined          x 32,363,368 ops/sec ±1.07% (82 runs sampled)
   *   function           x 31,296,870 ops/sec ±0.96% (83 runs sampled)
   */
  var typeofObj = typeof obj;
  if (typeofObj !== 'object') {
    return typeofObj;
  }

  /* ! Speed optimisation
   * Pre:
   *   null               x 28,645,765 ops/sec ±1.17% (82 runs sampled)
   * Post:
   *   null               x 36,428,962 ops/sec ±1.37% (84 runs sampled)
   */
  if (obj === null) {
    return 'null';
  }

  /* ! Spec Conformance
   * Test: `Object.prototype.toString.call(window)``
   *  - Node === "[object global]"
   *  - Chrome === "[object global]"
   *  - Firefox === "[object Window]"
   *  - PhantomJS === "[object Window]"
   *  - Safari === "[object Window]"
   *  - IE 11 === "[object Window]"
   *  - IE Edge === "[object Window]"
   * Test: `Object.prototype.toString.call(this)``
   *  - Chrome Worker === "[object global]"
   *  - Firefox Worker === "[object DedicatedWorkerGlobalScope]"
   *  - Safari Worker === "[object DedicatedWorkerGlobalScope]"
   *  - IE 11 Worker === "[object WorkerGlobalScope]"
   *  - IE Edge Worker === "[object WorkerGlobalScope]"
   */
  if (obj === globalObject) {
    return 'global';
  }

  /* ! Speed optimisation
   * Pre:
   *   array literal      x 2,888,352 ops/sec ±0.67% (82 runs sampled)
   * Post:
   *   array literal      x 22,479,650 ops/sec ±0.96% (81 runs sampled)
   */
  if (
    Array.isArray(obj) &&
    (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))
  ) {
    return 'Array';
  }

  // Not caching existence of `window` and related properties due to potential
  // for `window` to be unset before tests in quasi-browser environments.
  if (typeof window === 'object' && window !== null) {
    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/multipage/browsers.html#location)
     * WhatWG HTML$7.7.3 - The `Location` interface
     * Test: `Object.prototype.toString.call(window.location)``
     *  - IE <=11 === "[object Object]"
     *  - IE Edge <=13 === "[object Object]"
     */
    if (typeof window.location === 'object' && obj === window.location) {
      return 'Location';
    }

    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/#document)
     * WhatWG HTML$3.1.1 - The `Document` object
     * Note: Most browsers currently adher to the W3C DOM Level 2 spec
     *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-26809268)
     *       which suggests that browsers should use HTMLTableCellElement for
     *       both TD and TH elements. WhatWG separates these.
     *       WhatWG HTML states:
     *         > For historical reasons, Window objects must also have a
     *         > writable, configurable, non-enumerable property named
     *         > HTMLDocument whose value is the Document interface object.
     * Test: `Object.prototype.toString.call(document)``
     *  - Chrome === "[object HTMLDocument]"
     *  - Firefox === "[object HTMLDocument]"
     *  - Safari === "[object HTMLDocument]"
     *  - IE <=10 === "[object Document]"
     *  - IE 11 === "[object HTMLDocument]"
     *  - IE Edge <=13 === "[object HTMLDocument]"
     */
    if (typeof window.document === 'object' && obj === window.document) {
      return 'Document';
    }

    if (typeof window.navigator === 'object') {
      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/multipage/webappapis.html#mimetypearray)
       * WhatWG HTML$8.6.1.5 - Plugins - Interface MimeTypeArray
       * Test: `Object.prototype.toString.call(navigator.mimeTypes)``
       *  - IE <=10 === "[object MSMimeTypesCollection]"
       */
      if (typeof window.navigator.mimeTypes === 'object' &&
          obj === window.navigator.mimeTypes) {
        return 'MimeTypeArray';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
       * WhatWG HTML$8.6.1.5 - Plugins - Interface PluginArray
       * Test: `Object.prototype.toString.call(navigator.plugins)``
       *  - IE <=10 === "[object MSPluginsCollection]"
       */
      if (typeof window.navigator.plugins === 'object' &&
          obj === window.navigator.plugins) {
        return 'PluginArray';
      }
    }

    if ((typeof window.HTMLElement === 'function' ||
        typeof window.HTMLElement === 'object') &&
        obj instanceof window.HTMLElement) {
      /* ! Spec Conformance
      * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
      * WhatWG HTML$4.4.4 - The `blockquote` element - Interface `HTMLQuoteElement`
      * Test: `Object.prototype.toString.call(document.createElement('blockquote'))``
      *  - IE <=10 === "[object HTMLBlockElement]"
      */
      if (obj.tagName === 'BLOCKQUOTE') {
        return 'HTMLQuoteElement';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/#htmltabledatacellelement)
       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableDataCellElement`
       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
       *       which suggests that browsers should use HTMLTableCellElement for
       *       both TD and TH elements. WhatWG separates these.
       * Test: Object.prototype.toString.call(document.createElement('td'))
       *  - Chrome === "[object HTMLTableCellElement]"
       *  - Firefox === "[object HTMLTableCellElement]"
       *  - Safari === "[object HTMLTableCellElement]"
       */
      if (obj.tagName === 'TD') {
        return 'HTMLTableDataCellElement';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/#htmltableheadercellelement)
       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableHeaderCellElement`
       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
       *       which suggests that browsers should use HTMLTableCellElement for
       *       both TD and TH elements. WhatWG separates these.
       * Test: Object.prototype.toString.call(document.createElement('th'))
       *  - Chrome === "[object HTMLTableCellElement]"
       *  - Firefox === "[object HTMLTableCellElement]"
       *  - Safari === "[object HTMLTableCellElement]"
       */
      if (obj.tagName === 'TH') {
        return 'HTMLTableHeaderCellElement';
      }
    }
  }

  /* ! Speed optimisation
  * Pre:
  *   Float64Array       x 625,644 ops/sec ±1.58% (80 runs sampled)
  *   Float32Array       x 1,279,852 ops/sec ±2.91% (77 runs sampled)
  *   Uint32Array        x 1,178,185 ops/sec ±1.95% (83 runs sampled)
  *   Uint16Array        x 1,008,380 ops/sec ±2.25% (80 runs sampled)
  *   Uint8Array         x 1,128,040 ops/sec ±2.11% (81 runs sampled)
  *   Int32Array         x 1,170,119 ops/sec ±2.88% (80 runs sampled)
  *   Int16Array         x 1,176,348 ops/sec ±5.79% (86 runs sampled)
  *   Int8Array          x 1,058,707 ops/sec ±4.94% (77 runs sampled)
  *   Uint8ClampedArray  x 1,110,633 ops/sec ±4.20% (80 runs sampled)
  * Post:
  *   Float64Array       x 7,105,671 ops/sec ±13.47% (64 runs sampled)
  *   Float32Array       x 5,887,912 ops/sec ±1.46% (82 runs sampled)
  *   Uint32Array        x 6,491,661 ops/sec ±1.76% (79 runs sampled)
  *   Uint16Array        x 6,559,795 ops/sec ±1.67% (82 runs sampled)
  *   Uint8Array         x 6,463,966 ops/sec ±1.43% (85 runs sampled)
  *   Int32Array         x 5,641,841 ops/sec ±3.49% (81 runs sampled)
  *   Int16Array         x 6,583,511 ops/sec ±1.98% (80 runs sampled)
  *   Int8Array          x 6,606,078 ops/sec ±1.74% (81 runs sampled)
  *   Uint8ClampedArray  x 6,602,224 ops/sec ±1.77% (83 runs sampled)
  */
  var stringTag = (symbolToStringTagExists && obj[Symbol.toStringTag]);
  if (typeof stringTag === 'string') {
    return stringTag;
  }

  var objPrototype = Object.getPrototypeOf(obj);
  /* ! Speed optimisation
  * Pre:
  *   regex literal      x 1,772,385 ops/sec ±1.85% (77 runs sampled)
  *   regex constructor  x 2,143,634 ops/sec ±2.46% (78 runs sampled)
  * Post:
  *   regex literal      x 3,928,009 ops/sec ±0.65% (78 runs sampled)
  *   regex constructor  x 3,931,108 ops/sec ±0.58% (84 runs sampled)
  */
  if (objPrototype === RegExp.prototype) {
    return 'RegExp';
  }

  /* ! Speed optimisation
  * Pre:
  *   date               x 2,130,074 ops/sec ±4.42% (68 runs sampled)
  * Post:
  *   date               x 3,953,779 ops/sec ±1.35% (77 runs sampled)
  */
  if (objPrototype === Date.prototype) {
    return 'Date';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-promise.prototype-@@tostringtag)
   * ES6$25.4.5.4 - Promise.prototype[@@toStringTag] should be "Promise":
   * Test: `Object.prototype.toString.call(Promise.resolve())``
   *  - Chrome <=47 === "[object Object]"
   *  - Edge <=20 === "[object Object]"
   *  - Firefox 29-Latest === "[object Promise]"
   *  - Safari 7.1-Latest === "[object Promise]"
   */
  if (promiseExists && objPrototype === Promise.prototype) {
    return 'Promise';
  }

  /* ! Speed optimisation
  * Pre:
  *   set                x 2,222,186 ops/sec ±1.31% (82 runs sampled)
  * Post:
  *   set                x 4,545,879 ops/sec ±1.13% (83 runs sampled)
  */
  if (setExists && objPrototype === Set.prototype) {
    return 'Set';
  }

  /* ! Speed optimisation
  * Pre:
  *   map                x 2,396,842 ops/sec ±1.59% (81 runs sampled)
  * Post:
  *   map                x 4,183,945 ops/sec ±6.59% (82 runs sampled)
  */
  if (mapExists && objPrototype === Map.prototype) {
    return 'Map';
  }

  /* ! Speed optimisation
  * Pre:
  *   weakset            x 1,323,220 ops/sec ±2.17% (76 runs sampled)
  * Post:
  *   weakset            x 4,237,510 ops/sec ±2.01% (77 runs sampled)
  */
  if (weakSetExists && objPrototype === WeakSet.prototype) {
    return 'WeakSet';
  }

  /* ! Speed optimisation
  * Pre:
  *   weakmap            x 1,500,260 ops/sec ±2.02% (78 runs sampled)
  * Post:
  *   weakmap            x 3,881,384 ops/sec ±1.45% (82 runs sampled)
  */
  if (weakMapExists && objPrototype === WeakMap.prototype) {
    return 'WeakMap';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-dataview.prototype-@@tostringtag)
   * ES6$24.2.4.21 - DataView.prototype[@@toStringTag] should be "DataView":
   * Test: `Object.prototype.toString.call(new DataView(new ArrayBuffer(1)))``
   *  - Edge <=13 === "[object Object]"
   */
  if (dataViewExists && objPrototype === DataView.prototype) {
    return 'DataView';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%mapiteratorprototype%-@@tostringtag)
   * ES6$23.1.5.2.2 - %MapIteratorPrototype%[@@toStringTag] should be "Map Iterator":
   * Test: `Object.prototype.toString.call(new Map().entries())``
   *  - Edge <=13 === "[object Object]"
   */
  if (mapExists && objPrototype === mapIteratorPrototype) {
    return 'Map Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%setiteratorprototype%-@@tostringtag)
   * ES6$23.2.5.2.2 - %SetIteratorPrototype%[@@toStringTag] should be "Set Iterator":
   * Test: `Object.prototype.toString.call(new Set().entries())``
   *  - Edge <=13 === "[object Object]"
   */
  if (setExists && objPrototype === setIteratorPrototype) {
    return 'Set Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%arrayiteratorprototype%-@@tostringtag)
   * ES6$22.1.5.2.2 - %ArrayIteratorPrototype%[@@toStringTag] should be "Array Iterator":
   * Test: `Object.prototype.toString.call([][Symbol.iterator]())``
   *  - Edge <=13 === "[object Object]"
   */
  if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
    return 'Array Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%stringiteratorprototype%-@@tostringtag)
   * ES6$21.1.5.2.2 - %StringIteratorPrototype%[@@toStringTag] should be "String Iterator":
   * Test: `Object.prototype.toString.call(''[Symbol.iterator]())``
   *  - Edge <=13 === "[object Object]"
   */
  if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
    return 'String Iterator';
  }

  /* ! Speed optimisation
  * Pre:
  *   object from null   x 2,424,320 ops/sec ±1.67% (76 runs sampled)
  * Post:
  *   object from null   x 5,838,000 ops/sec ±0.99% (84 runs sampled)
  */
  if (objPrototype === null) {
    return 'Object';
  }

  return Object
    .prototype
    .toString
    .call(obj)
    .slice(toStringLeftSliceLength, toStringRightSliceLength);
}

return typeDetect;

})));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
_$module_2 = _$module_2.exports
var _$module_1 = {};
"use strict";Object.defineProperty(_$module_1,"__esModule",{value:!0}),_$module_1.numberDetect=void 0;var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},__dummy_undefined$0 = 0,_typeDetect2=_interopRequireDefault(_$module_2);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var isNaN=function(e){return e!=e},breakdownNumber=function(e){return isNaN(e)?"NaN":isFinite(e)?"number":"Infinity"},breakdownObject=function(e){return null===e?"null":(0,_typeDetect2.default)(e)},hashTable={number:breakdownNumber,object:breakdownObject},numberDetect=_$module_1.numberDetect=function(e){var t=void 0===e?"undefined":_typeof(e);return hashTable[t]?hashTable[t](e):t};
var _$module_8 = {};
'use strict';

Object.defineProperty(_$module_8, "__esModule", {
    value: true
});
var hi = _$module_8.hi = 'Hello';

/* eslint-disable no-eq-null */
var isNull = _$module_8.isNull = function isNull(x) {
    return x == null;
};
var isNotNull = _$module_8.isNotNull = function isNotNull(x) {
    return x != null;
};
/* eslint-enable no-eq-null */

var isError = _$module_8.isError = function isError(x) {
    return Object.prototype.toString.call(x) === '[object Error]';
};

var throwError = _$module_8.throwError = function throwError(message) {
    return function () {

        throw new Error(message);
    };
};

var innerGetBetween = function innerGetBetween(min, max, x) {
    return Number.isNaN(min) || Number.isNaN(max) || Number.isNaN(x) ? throwError('getBetween: invalid parameters.') : Math.max(min, Math.min(max, x));
};

var getBetween = _$module_8.getBetween = function getBetween(min, max) {
    return function (x) {
        return innerGetBetween(min - 0, max - 0, x - 0);
    };
};
var _$module_3 = {};
'use strict';

Object.defineProperty(_$module_3, "__esModule", {
    value: true
});
_$module_3.getSequentialArray = _$module_3.getBlankArray = undefined;

/* removed: var _$module_1 = require('number-detect'); */;

/* removed: var _$module_8 = require('./utils.js'); */;

var getBlankArray = _$module_3.getBlankArray = function getBlankArray(arrSize) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return Number.isNaN(arrSize - 0) ? (0, _$module_8.throwError)('getBlankArray: invalid parameter.') : Array(arrSize - 0).fill(base);
};

var getSequentialArray = _$module_3.getSequentialArray = function getSequentialArray(arrSize) {
    var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var firstValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    return (0, _$module_1.numberDetect)(arrSize) !== 'number' || (0, _$module_1.numberDetect)(step) !== 'number' || (0, _$module_1.numberDetect)(firstValue) !== 'number' ? (0, _$module_8.throwError)('getSequentialArray: invalid parameter(s)') : getBlankArray(arrSize).map(function (_, i) {
        return firstValue + i * step;
    });
};
var _$module_4 = {};
'use strict';

Object.defineProperty(_$module_4, "__esModule", {
    value: true
});
_$module_4.Right = _$module_4.Left = undefined;

/* removed: var _$module_8 = require('./utils.js'); */;

var getErrorObj = function getErrorObj(err) {
    return (0, _$module_8.isError)(err) ? err : typeof err === 'string' ? new Error(err) : new Error('Called Left() with a non-error value.');
};

var Left = _$module_4.Left = function Left(err) {
    return Object.freeze({

        isLeft: function isLeft() {
            return true;
        },
        isRight: function isRight() {
            return false;
        },
        left: function left() {
            return getErrorObj(err);
        },
        right: (0, _$module_8.throwError)('Cannot call right on an left either.'),
        isEither: function isEither() {
            return true;
        }

    });
};

var Right = _$module_4.Right = function Right(data) {
    return (0, _$module_8.isNull)(data) ? Left(new TypeError('Called Right() with a null or void value.')) : (0, _$module_8.isError)(data) ? Left(data) : Object.freeze({
        isLeft: function isLeft() {
            return false;
        },
        isRight: function isRight() {
            return true;
        },
        left: (0, _$module_8.throwError)('Cannot call left on an right either.'),
        right: function right() {
            return data;
        },
        isEither: function isEither() {
            return true;
        }
    });
};
var _$module_5 = {};
"use strict";

Object.defineProperty(_$module_5, "__esModule", {
    value: true
});
var filterObject = _$module_5.filterObject = function filterObject(base) {
    return function (obj) {

        var filtered = {};

        for (var prop in base) {
            if (base.hasOwnProperty(prop)) filtered[prop] = obj[prop] || base[prop];
        }return filtered;
    };
};
var _$module_6 = {};
'use strict';

Object.defineProperty(_$module_6, "__esModule", {
    value: true
});
_$module_6.trampoline = undefined;

var ___typeof_6 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* removed: var _$module_8 = require('./utils.js'); */;

var trampoline = _$module_6.trampoline = function trampoline(fn) {
    return function (input) {

        if ((typeof input === 'undefined' ? 'undefined' : ___typeof_6(input)) !== 'object') return null;

        var accum = input.accum,
            current = input.current;


        while ((0, _$module_8.isNotNull)(current)) {
            var _fn = fn({ accum: accum, current: current });

            accum = _fn.accum;
            current = _fn.current;
        }

        return accum;
    };
};
var _$module_7 = {};
'use strict';

Object.defineProperty(_$module_7, "__esModule", {
    value: true
});
_$module_7.typeCheck = undefined;

/* removed: var _$module_1 = require('number-detect'); */;

/* removed: var _$module_4 = require('./either.js'); */;

var typeCheck = _$module_7.typeCheck = function typeCheck(checksEnabled) {
    return function (targetType) {
        return function (eth) {

            if (!checksEnabled || eth.isLeft()) return eth;

            var ethType = (0, _$module_1.numberDetect)(eth.right());

            if (ethType === targetType) return eth;

            return (0, _$module_4.Left)('Type check failed: ' + targetType + ' expected but ' + ethType + ' detected.');
        };
    };
};
var _$module_9 = {};
'use strict';

Object.defineProperty(_$module_9, "__esModule", {
  value: true
});

/* removed: var _$module_8 = require('./core/utils.js'); */;

Object.keys(_$module_8).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(_$module_9, key, {
    enumerable: true,
    get: function get() {
      return _$module_8[key];
    }
  });
});

/* removed: var _$module_3 = require('./core/array.js'); */;

Object.keys(_$module_3).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(_$module_9, key, {
    enumerable: true,
    get: function get() {
      return _$module_3[key];
    }
  });
});

/* removed: var _$module_4 = require('./core/either.js'); */;

Object.keys(_$module_4).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(_$module_9, key, {
    enumerable: true,
    get: function get() {
      return _$module_4[key];
    }
  });
});

/* removed: var _$module_6 = require('./core/trampoline.js'); */;

Object.keys(_$module_6).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(_$module_9, key, {
    enumerable: true,
    get: function get() {
      return _$module_6[key];
    }
  });
});

/* removed: var _$module_7 = require('./core/type_check.js'); */;

Object.keys(_$module_7).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(_$module_9, key, {
    enumerable: true,
    get: function get() {
      return _$module_7[key];
    }
  });
});

/* removed: var _$module_5 = require('./core/objects.js'); */;

Object.keys(_$module_5).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(_$module_9, key, {
    enumerable: true,
    get: function get() {
      return _$module_5[key];
    }
  });
});
}());

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});