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
    for (var key in source) {
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

  }
};
module.exports = Util;