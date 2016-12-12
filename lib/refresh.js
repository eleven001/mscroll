'use strict'

import _ from './util.js';
var $ = require('zepto-modules/_custom');

const _start = Symbol();
const _move = Symbol();
const _end = Symbol();

export default class Pull {
  constructor(el, options) {
    this.$el = _.isString(el) ? $(el) : el;
    this.enabled = true;
    this.options = _.extend({
      start: _.noop,
      move: _.noop,
      onRefresh: _.noop,
      distance: 40
    }, options);

    this.$el.on('touchstart', this[_start].bind(this))
            .on('touchmove', this[_move].bind(this))
            .on('touchend', this[_end].bind(this));   
  }
  /**
   * private method
  */
  [_start](e) {
    if (!this.enabled) {
      return;
    }
    let point = e.touches ? e.touches[0] : e;
    this.statX = this.EndX = point.pageX;
    this.startY = this.EndY = point.pageY;

    this.options.start.call(this, e);
  }
  
  [_move](e) {

  }

  [_end](e) {

  }
}