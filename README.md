# smart-copy

A shortcut for copying properties to new objects with a little smarts:

- Easily specify defaults
- Prevent copying unwanted properties

Branch | Status
------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Master | [![Build Status](https://travis-ci.org/ecowden/smart-copy.png?branch=master)](https://travis-ci.org/ecowden/smart-copy) [![Coverage Status](https://coveralls.io/repos/github/ecowden/smart-copy/badge.svg?branch=master)](https://coveralls.io/github/ecowden/smart-copy?branch=master) [![NSP Status](https://nodesecurity.io/orgs/ecowden/projects/161d459d-c5b8-482b-8c04-d1f4c51e1edb/badge)](https://nodesecurity.io/orgs/ecowden/projects/161d459d-c5b8-482b-8c04-d1f4c51e1edb) | g
All    | [![Build Status](https://travis-ci.org/ecowden/smart-copy.png)](https://travis-ci.org/ecowden/smart-copy)

## Usage

Install the library,

```
npm install --save smart-copy
```

### Copy Properties from a Data Object

```javascript
const smartCopy = require('smart-copy')

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
```

### Create a Class with a (Smart) Copy Constructor

A common pattern is to create a class that accepts defined data. This is easy by using `smart-copy` from the constructor:

```javascript
const smartCopy = require('smart-copy')

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
```

## API

### `smartCopy(target, properties, data)`

Copy key-value pairs from `data` defined in the `properties` to the `target`.

Remember our goals:

- Easily specify defaults
- Prevent copying unwanted properties

The `properties` object acts as a list of both defaults and allowed entries. If a key exists in the `properties` but does not exist in the `data`, it will use the value from `properties` as a default. If a key is not defined in `properties`, it will not be copied from the `data`. This prevents accidentally or maliciously copying entries you might not want in the target object.

If an entry doesn't have a meaningful default, set the property to `undefined`. This will let `smart-copy` know that it is allowed, and will set it to `undefined` if nothing is passed in the `data`.

This module uses [`Object.hasOwnProperty(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) to determine if a property exists rather than just checking for `undefined` values, so that you can explicitly used `undefined` as a value in both `properties` and `data`.
