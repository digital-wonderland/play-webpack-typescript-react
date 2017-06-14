'use strict'

const babelJest = require('babel-jest')

module.exports = {
  process (src, path) {
    const isJavaScript = path.endsWith('.js') || path.endsWith('.jsx')

    if (isJavaScript) {
      src = babelJest.process(src, isJavaScript ? path : 'file.js')
    }

    return src
  }
}
