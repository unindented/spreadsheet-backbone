require.config({
  baseUrl: '.',

  paths: {
    jquery:     'vendor/jquery/dist/jquery',
    underscore: 'vendor/underscore/underscore',
    backbone:   'vendor/backbone/backbone',
    normalize:  'vendor/normalize-css/normalize'
  },

  map: {
    '*': {
      jst: 'vendor/requirejs-template-plugins/jst',
      css: 'vendor/requirejs-style-plugins/css'
    }
  }
});

define(function (require) {
  'use strict';

  var App = require('src/app/app');

  window.app = new App();
  window.app.start();
});
