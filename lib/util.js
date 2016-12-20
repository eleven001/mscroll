'use strict'
let _extend = Symbol();

var  Util  = {
  type: function(obj) {
    return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
  },

  isString: function (val) {
    return this.type(val) === 'String';
  },

  isArray: function (val) {
    return this.type(val) === 'Array';
  },

  isObject: function(val) {
    return this.type(val) === 'Object';
  },
  isWindow: function(val) {
    return obj != null && obj == obj.window; 
  },
  /**
   * isPlainObject
   * @return 
  */
  isPlainObject: function(val) {
    return isObject(val) && !isWindow(val) && Object.getPrototypeOf(obj) == Object.prototype;
  },
  /**
   * _extend
   * private method
  */
  [_extend]: function(target, source, deep) {
    for (let key in source) {
      if (deep && (this.isPlainObject(source[key]) || this.isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {};
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = [];
        _extend(target[key], source[key], deep);
      } else if (source[key] !== undefined) {
        target[key] = source[key];
      }
    }
  },
 
  extend: function(target, source, deep) {    
    this[_extend] (target, source, deep);
    return target;
  },
  /**
    * noop
    *@ description return a void function
  */
  noop: function() {
  },
  now: Date.now || function() {
    return  new Date().getTime();
  },
  throttle: function(func, wait = 200) {
    let  previous = 0, result = this.noop, timeout = null;
    let args;
    return  () => {
      let now = this.now();
      if (!previous) {
        previous = now;
      }
      
      let remaining = wait - (now - previous);
      args = arguments;
      if (remaining < 0) {       
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(this, args);
      } else if (!timeout) {
        timeout = setTimeout(()=>{
          previous = now;
          timeout = null;
          result = func.apply(this, args);
        }, remaining);
      }

      return result;
    }
  },
  prefix: (function () {
    var _elementStyle = document.createElement('div').style;
    var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'];
    var _vendor = (function () {
      for (let i = 0, len = vendors.length; i < len; i++) {
        if (vendors[i] + 'ransform' in _elementStyle) {
          return vendors[i].substring(0, vendors[i].length - 1);
        }
      }
      return false;
    })();
    function prefixStyle(style) {
      if (_vendor === false) return false;
      if (_vendor === '') return style;
      return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
    }
    function cssStyle(style) {
      return _vendor ? '-' + _vendor + '-transform': 'transform';
    }
    return {
      vendor: _vendor,
      style: prefixStyle,
      transform: prefixStyle('transform'),
      cssTransform: cssStyle('transform'),
      transition: prefixStyle('transition')
    }
  })()
};
module.exports = Util;