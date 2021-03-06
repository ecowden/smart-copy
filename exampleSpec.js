'use strict'

const test = require('ava')

const smartCopy = require('./index')

test('Copy properties to an object', async t => {
  // const smartCopy = require('smart-copy')

  // The object we're copying to
  const target = {}

  // Definition of allowable properties, and their defaults
  const properties = {
    enabled: true,
    name: undefined  // use `undefined` for properties with no meaningful default
  }

  // Data to be copied
  const data = {
    name: 'Jimmy Bond',
    secretAgent: true  // won't be copied, since no entry exists in `properties`
  }

  smartCopy(target, properties, data)

  // defaulted to true, as set in the props object
  t.is(target.enabled, true)

  // copied from the data, since it matches an entry in the properties
  t.is(target.name, 'Jimmy Bond')

  // not copied from data, since no property is defined
  t.false(target.hasOwnProperty('secretAgent'))
})

test('Copy properties in a constructor', async t => {
  // const smartCopy = require('smart-copy')

  // Definition of allowable properties, and their defaults
  const properties = {
    enabled: true,
    name: undefined  // use `undefined` for properties with no meaningful default
  }

  // A class with a (smart) copy constructor
  class Target {
    constructor(data) {
      smartCopy(this, properties, data)
    }
  }

  // Create a new instance with data
  const target = new Target({
    name: 'Jimmy Bond',
    secretAgent: true  // won't be copied, since no entry exists in `properties`
  })

  // defaulted to true, as set in the props object
  t.is(target.enabled, true)

  // copied from the data, since it matches an entry in the properties
  t.is(target.name, 'Jimmy Bond')

  // not copied from data, since no property is defined
  t.false(target.hasOwnProperty('secretAgent'))
})
