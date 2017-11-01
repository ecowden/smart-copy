'use strict'

const test = require('ava')
const smartCopy = require('./smartCopy')

test('copies a key from the data to the target when it exists as a defined property', async t => {
  const target = {}
  const props = {
    key: undefined
  }
  const data = {
    key: 'value'
  }

  smartCopy(target, props, data)

  t.is(target.key, 'value')
})

test('copies a default property from the properties when no matching data entry exists', async t => {
  const target = {}
  const props = {
    key: 'value'
  }
  const data = {}

  smartCopy(target, props, data)

  t.is(target.key, 'value')
})

test('prefers an entry from the data object over a default in the props object', async t => {
  const target = {}
  const props = {
    key: 'wrong'
  }
  const data = {
    key: 'value'
  }

  smartCopy(target, props, data)

  t.is(target.key, 'value')
})

test('ignores an entry in the data object when not defined in the props object', async t => {
  const target = {}
  const props = {}
  const data = {
    key: 'value'
  }

  smartCopy(target, props, data)

  t.is(target.key, undefined)
})
