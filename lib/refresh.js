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
  }
}