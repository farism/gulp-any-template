/* global describe, it */

const expect = require('chai').expect
const assert = require('stream-assert')
const File = require('vinyl')
const fs = require('fs')
const path = require('path')

const anyTemplate = require('../')

const output = fs.readFileSync(fixture('index.html'))

function fixture(glob) {
  return path.join(__dirname, 'fixture', glob)
}

function assertEquals() {
  return assert.first(function(dep) {
    expect(dep.contents).to.eql(output)
  })
}

describe('gulp-any-template', function() {
  var stream

  beforeEach(function() {
    stream = anyTemplate({ title: 'gulp-any-template' })
  })

  it('should work in buffer mode', function(done) {
    stream.pipe(assertEquals()).pipe(assert.end(done))
    stream.write(
      new File({
        path: fixture('index.hbs'),
        contents: fs.readFileSync(fixture('index.hbs')),
      })
    )
    stream.end()
  })

  it('should emit error on streamed file', function(done) {
    stream
      .once('error', function(err) {
        expect(err.message).to.eql('gulp-any-template: Streaming not supported')
      })
      .pipe(assert.end(done))
    stream.write({
      isNull: function() {
        return false
      },
      isStream: function() {
        return true
      },
    })
    stream.end()
  })

  it('should emit error on unsupported extension', function(done) {
    stream
      .once('error', function(err) {
        expect(err.message).to.eql(
          'gulp-any-template: Template extension not supported'
        )
      })
      .pipe(assert.end(done))
    stream.write(
      new File({
        path: fixture('index.foobar'),
      })
    )
    stream.end()
  })

  it('should ignore null files', function(done) {
    stream.pipe(assert.length(0)).pipe(assert.end(done))
    stream.write(new File())
    stream.end()
  })

  it('should work for .dust templates', function(done) {
    stream.pipe(assertEquals()).pipe(assert.end(done))
    stream.write(
      new File({
        path: fixture('index.dust'),
        contents: fs.readFileSync(fixture('index.dust')),
      })
    )
    stream.end()
  })

  it('should work for .ejs templates', function(done) {
    stream.pipe(assertEquals()).pipe(assert.end(done))
    stream.write(
      new File({
        path: fixture('index.ejs'),
        contents: fs.readFileSync(fixture('index.ejs')),
      })
    )
    stream.end()
  })

  it('should work for .hbs templates', function(done) {
    stream.pipe(assertEquals()).pipe(assert.end(done))
    stream.write(
      new File({
        path: fixture('index.hbs'),
        contents: fs.readFileSync(fixture('index.hbs')),
      })
    )
    stream.end()
  })

  it('should work for .hogan templates', function(done) {
    stream.pipe(assertEquals()).pipe(assert.end(done))
    stream.write(
      new File({
        path: fixture('index.hogan'),
        contents: fs.readFileSync(fixture('index.hogan')),
      })
    )
    stream.end()
  })

  it('should work for .lodash templates', function(done) {
    stream.pipe(assertEquals()).pipe(assert.end(done))
    stream.write(
      new File({
        path: fixture('index.lodash'),
        contents: fs.readFileSync(fixture('index.lodash')),
      })
    )
    stream.end()
  })

  it('should work for .mustache templates', function(done) {
    stream.pipe(assertEquals()).pipe(assert.end(done))
    stream.write(
      new File({
        path: fixture('index.mustache'),
        contents: fs.readFileSync(fixture('index.mustache')),
      })
    )
    stream.end()
  })

  it('should work for .pug templates', function(done) {
    stream.pipe(assertEquals()).pipe(assert.end(done))
    stream.write(
      new File({
        path: fixture('index.pug'),
        contents: fs.readFileSync(fixture('index.pug')),
      })
    )
    stream.end()
  })

  it('should work for .swig templates', function(done) {
    stream.pipe(assertEquals()).pipe(assert.end(done))
    stream.write(
      new File({
        path: fixture('index.swig'),
        contents: fs.readFileSync(fixture('index.swig')),
      })
    )
    stream.end()
  })

  it('should work for .underscore templates', function(done) {
    stream.pipe(assertEquals()).pipe(assert.end(done))
    stream.write(
      new File({
        path: fixture('index.underscore'),
        contents: fs.readFileSync(fixture('index.underscore')),
      })
    )
    stream.end()
  })
})
