'use strict'

module.exports = function assign(target, props, opts) {
  // Copy options first
  for (const [key, value] of Object.entries(opts)) {
    if (props.hasOwnProperty(key)) {
      target[key] = value
    }
  }
  // Copy defaults from opts
  for (const [key, value] of Object.entries(props)) {
    if (!target.hasOwnProperty(key)) {
      target[key] = value
    }
  }
}
