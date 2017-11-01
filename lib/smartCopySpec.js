'use strict'

const test = require('ava')
const smartCopy = require('./smartCopy')

test('copies a key from the opts to the target when it exists as a defined property', async t => {
  const target = {}
  const props = {
    key: undefined
  }
  const opts = {
    key: 'value'
  }

  smartCopy(target, props, opts)

  t.is(target.key, 'value')
})

test('copies a default property from the props to the target when no matching opt exists', async t => {
  const target = {}
  const props = {
    key: 'value'
  }
  const opts = {}

  smartCopy(target, props, opts)

  t.is(target.key, 'value')
})

test('prefers an entry from the opts object over a default in the props object', async t => {
  const target = {}
  const props = {
    key: 'wrong'
  }
  const opts = {
    key: 'value'
  }

  smartCopy(target, props, opts)

  t.is(target.key, 'value')
})

test('ignores an entry in the opts object when not defined in the props object', async t => {
  const target = {}
  const props = {}
  const opts = {
    key: 'value'
  }

  smartCopy(target, props, opts)

  t.is(target.key, undefined)
})
