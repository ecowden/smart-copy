'use strict'

const test = require('ava')

const index = require('./index')
const smartCopy = require('./lib/smartCopy')

test('index exports the smartCopy function', function* (t) {
  t.is(index, smartCopy)
})
