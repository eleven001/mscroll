'use strict'

import _ from './util.js';

exprot default class Pull {
  constructor(el, options) {
    this.$el = _.isString(el) ? document.querySelector(el) : el;
    this.options = _.extend({
      start: _.noop,
      move: _.noop,
      onRefresh: _.noop,
      distance: 40
    }, options);

    this.$el.on('touchstart', this._start)
  }
  _start(e) {
    let point = e.touches ? e.touches[0] : e;
    this.statX = this.EndX = point.pageX;
    this.startY = this.EndY = point.pageY;
  }
  
}