module.exports = {
  'build':          ['requirejs'],

  'serve:dev':      ['connect:dev:keepalive'],
  'serve:prod':     ['connect:prod:keepalive'],

  'lint:grunt':     ['jshint:grunt'],
  'lint:app':       ['jshint:app'],

  'test:phantom':   ['jasmine:spec'],
  'test:browser':   ['jasmine:spec:build', 'connect:spec:keepalive'],

  'follow:phantom': ['jasmine:spec', 'watch:phantom'],
  'follow:browser': ['jasmine:spec:build', 'connect:spec', 'watch:browser'],

  'default':        ['lint:grunt', 'lint:app', 'test:phantom']
};
