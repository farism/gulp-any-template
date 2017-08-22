const File = require('vinyl')
const fs = require('fs')
const path = require('path')
const through = require('through2')

const dust = require('dustjs-linkedin')
const ejs = require('ejs')
const handlebars = require('handlebars')
const hogan = require('hogan.js')
const lodash = require('lodash.template')
const mustache = require('mustache')
const pug = require('pug')
const swig = require('swig')
const underscore = require('underscore.template')

const PLUGIN = 'gulp-any-template'

dust.config.whitespace = true

function compileDust(template, params) {
  return new Promise(function(resolve, reject) {
    dust.loadSource(dust.compile(template, 'template'))
    dust.render('template', params, function(err, output) {
      if (err) {
        reject(err)
      } else {
        resolve(output)
      }
    })
  })
}

function compileEJS(template, params) {
  return new Promise(function(resolve, reject) {
    try {
      const output = ejs.render(template, params)
      resolve(output)
    } catch (err) {
      reject(err)
    }
  })
}

function compileHandlebars(template, params) {
  return new Promise(function(resolve, reject) {
    const output = handlebars.compile(template)(params)
    resolve(output)
  })
}

function compileHogan(template, params) {
  return new Promise(function(resolve, reject) {
    const output = hogan.compile(template).render(params)
    resolve(output)
  })
}

function compileLodash(template, params) {
  return new Promise(function(resolve, reject) {
    const output = lodash(template)(params)
    resolve(output)
  })
}

function compileMustache(template, params) {
  return new Promise(function(resolve, reject) {
    const output = mustache.render(template, params)
    resolve(output)
  })
}

function compilePug(template, params) {
  return new Promise(function(resolve, reject) {
    const output = pug.render(template, params)
    resolve(output)
  })
}

function compileSwig(template, params) {
  return new Promise(function(resolve, reject) {
    const output = swig.compile(template)(params)
    resolve(output)
  })
}

function compileUnderscore(template, params) {
  return new Promise(function(resolve, reject) {
    const output = underscore(template)(params)
    resolve(output)
  })
}

const compilers = {
  '.dust': compileDust,
  '.ejs': compileEJS,
  '.hbs': compileHandlebars,
  '.hogan': compileHogan,
  '.lodash': compileLodash,
  '.mustache': compileMustache,
  '.pug': compilePug,
  '.swig': compileSwig,
  '.underscore': compileUnderscore,
}

module.exports = function(params) {
  const transform = function(file, encode, callback) {
    if (file.isNull()) {
      return callback()
    }

    if (file.isStream()) {
      this.emit(
        'error',
        new Error('gulp-any-template: Streaming not supported')
      )
      return callback()
    }

    const compiler = compilers[path.extname(file.path)]

    if (!compiler) {
      this.push(file)
      return callback()
    }

    const _this = this

    compiler(String(file.contents), params)
      .then(function(result) {
        _this.push(
          new File({
            path: file.path,
            contents: Buffer(result),
          })
        )
        callback()
      })
      .catch(function(err) {
        this.emit('error', new Error(err.message))
        callback()
      })
  }

  return through.obj(transform)
}
