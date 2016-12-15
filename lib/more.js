'use strict'
import _ from './util.js'

export default class More {
  constructor(el, options) {
    this.$el = _.isString(el) ? $(el) : el;
    this.options = _.extend({
      main: 'body',

    }, options);
    this.$main = _.isString(this.options.main) ? $(el) : el;

  }
  start() {
    this.$main.off('scroll').on('scroll', function () {
          
    });
  }
}