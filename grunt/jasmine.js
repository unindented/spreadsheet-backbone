module.exports = {
  spec: {
    options: {
      helpers: 'test/helpers/**/*.js',
      specs:   'test/specs/**/*.js',

      template: require('grunt-template-jasmine-requirejs'),

      templateOptions: {
        version: 'vendor/requirejs/require.js',
        requireConfigFile: 'src/main.js'
      }
    }
  }
};
