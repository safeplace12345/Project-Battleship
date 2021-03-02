const {test, expect} = require('@jest/globals');
const ship = require('./ship');
it('It creates Objects', () => {
  expect(typeof ship).toBe('object');
});
