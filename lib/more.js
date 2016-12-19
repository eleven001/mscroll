'use strict'
import _ from './util.js';
import $ from 'zepto-modules/_custom';
export default class More {
  constructor(el, options) {

    this.$el = _.isString(el) ? $(el) : el;
    this.el = this.$el[0];
    this.options = _.extend({
      main: 'body'
    }, options);
    this.$main = _.isString(this.options.main) ? $(this.options.main) : this.options.main;    
  }
  start() {
    if (this.options.more) {
      this.$el.one('load-bottom',this.options.more);
    }
    
    this.$main.off('scroll').on('scroll', _.throttle((e) => {
      if (this.el && this.el.getBoundingClientRect().bottom < document.body.clientHeight + 25) {        
        this.$el.trigger('load-bottom');        
      }
    }, 200));
  }
  $() {
    return $;
  }
}