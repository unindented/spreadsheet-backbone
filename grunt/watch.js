module.exports = {
  phantom: {
    files: ['src/**/*', 'test/**/*'],
    tasks: ['lint:app', 'test:phantom']
  },

  browser: {
    files: ['src/**/*', 'test/**/*'],
    tasks: ['lint:app'],

    options: {
      livereload: true
    }
  }
};
