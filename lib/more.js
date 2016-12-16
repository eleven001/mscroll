'use strict'
import _ from './util.js';
import $ from 'zepto-modules/_custom';
export default class More {
  constructor(el, options) {

    this.$el = _.isString(el) ? $(el) : el;
    this.el = this.$el[0];
    this.options = _.extend({
      main: 'body',
      more: _.noop
    }, options);
    this.$main = _.isString(this.options.main) ? $(el) : el;
  }
  start() {
    this.$main.off('scroll').on('scroll', _.throttle((e) => {
      if (this.el && this.el.getBoundingClientRect().bottom < document.body.clientHeight + 25) {
        this.options.more.call(this);
      }
    }, 200));
  }
}