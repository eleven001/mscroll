'use strict'
import _ from './util.js';
import $ from 'zepto-modules/_custom';
const _start = Symbol();
const _move = Symbol();
const _end = Symbol();

export default class Pull {
  constructor(el, options) {
    this.$el = _.isString(el) ? $(el) : el;
    this.el = this.$el[0];
    const children = this.$el.children();
    this.enabled = true;
    this.canfresh = false;
    this.msgWrapStyle = children[0].style;
    this.contentWrapStyle = children[1].style;    
    this.options = _.extend({
      start: _.noop,
      move: _.noop,
      end: _.noop,
      onRefresh: _.noop,     
      distance: 40,
      msgs: ['下拉刷新...', '释放刷新']
    }, options);
    this.msgElement = this.options.msgElement ? _.isString(this.options.msgElement) ? $(this.options.msgElement) : this.options.msgElement : $(children[0]);
    this.$el.on('touchstart', this[_start].bind(this))
            .on('touchmove', this[_move].bind(this))
            .on('touchend', this[_end].bind(this));
  }
  /**
   * private method
  */
  [_start](e) {
    this.enabled = true;
    let point = e.touches ? e.touches[0] : e;
    this.statX = this.endX = point.pageX;
    this.startY = this.endY = point.pageY;    
    this.contentWrapStyle[_.prefix.transition] = 'none';
    this.msgElement.html('');
    this.msgWrapStyle.display = 'block';    
    this.options.start.call(this, e);
  }
  
  [_move](e) {
    if (!this.enabled) {
      return;
    }

    const point = e.touches ? e.touches[0] : e;
    const isTop = this.el.scrollTop === 0;
    const totaldistance = this.options.distance * 2;
    this.endX = point.pageX;
    this.endY = point.pageY;
    if (isTop) {
      let diffY = this.endY - this.startY;
      let diffX = Math.max(0, this.endX - this.startX);
      diffY = Math.max(0, diffY);
      diffY = Math.min(diffY, totaldistance);
      
      if (diffY < diffX) {
        this.enabled = false;
        return;
      }

      if (diffY > this.options.distance * 1.5) {
        this.msgElement.html(this.options.msgs[1]);
        this.canfresh = true;        
      } else if (diffY > 0) {
        this.msgElement.html(this.options.msgs[0]);
        this.canfresh = false;
      } else {
        this.canfresh = false;
      }

      this.msgWrapStyle[_.prefix.transform] = 'translate3d(0,' + diffY + 'px, 0)';
      this.contentWrapStyle[_.prefix.transform] = 'translate3d(0,' + diffY + 'px, 0)';
      this.options.move.call(this, diffY);
    } else {
      this.enabled = false;
    }
  }

  [_end](e) {
    if (!this.enabled) {
      return;
    }
    if (this.canfresh) {
      this.options.onRefresh.call(this);
    } else {
      this.backTop();
    }
    this.options.end.call(this);
  }
  changeMsg(msg) {
    this.msgElement.html(msg);
  }

  backTop() {
    this.msgWrapStyle[_.prefix.transform] = 'translate3d(0, 0, 0)';    
    this.contentWrapStyle[_.prefix.transform] = 'translate3d(0, 0, 0)';
    this.msgElement.hide();
  }
}