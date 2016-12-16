/**
 * global mocha
*/

let expect = require('chai').expect;
let _ = require('../../lib/util.js');

describe('util', function () {
  describe('#isString', function () {
    it('shound be String when type is string', function() {
      expect(_.isString('a')).to.be.true;
    })
  });
  describe('#isArray', function () {
    it('shound be Array when type is array', function() {
      expect(_.isArray([1, 2])).to.be.true;
    })
  });
});