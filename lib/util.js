'use strict'

export default class Util {
  type(obj) {
    return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
  }

  isString(val) {
    return this.type(val) === 'String';
  }

  isArray(val) {
    return this.type(val) === 'Array';
  }

  isObject(val) {
    return this.type(val) === 'Object';
  }
  isWindow(val) {
    return obj != null && obj == obj.window; 
  }
  /**
   * isPlainObject
   * @return 
  */
  isPlainObject(val) {
    return isObject(val) && !isWindow(val) && Object.getPrototypeOf(obj) == Object.prototype;
  }

  _extend(target, source, deep) {
    for (key in source) {
      if (deep && (this.isPlainObject(source[key]) || this.isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {}
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = []
        _extend(target[key], source[key], deep)
      } else if (source[key] !== undefined) {
        target[key] = source[key];
      }
    }
  }
  extend(target, source, deep) {
    var args = slice.call(arguments, 1)   
    args.forEach(function(arg){ extend(target, arg, deep) })
    return target
  }
  /**
    * noop
    *@ description return a void function
  */
  noop() {

  }
}