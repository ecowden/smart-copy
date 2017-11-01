'use strict'

module.exports = function assign(target, props, data) {
  // Copy data first
  for (const [key, value] of Object.entries(data)) {
    if (props.hasOwnProperty(key)) {
      target[key] = value
    }
  }
  // Copy defaults from properties
  for (const [key, value] of Object.entries(props)) {
    if (!target.hasOwnProperty(key)) {
      target[key] = value
    }
  }
}
