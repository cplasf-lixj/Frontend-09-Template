var assert = require('assert');

import {add, multi} from "../add.js"
it('1 + 2 should be 3', function() {
  assert.equal(add(1,2), 3);
});
it('2 * 3 should be 6', function() {
  assert.equal(multi(2,3), 6);
});