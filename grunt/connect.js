module.exports = function () {
  'use strict';

  var options = function (index) {
    return {
      options: {
        livereload: true,
        open: false,

        base: {
          path: '.',
          options: {
            index: index
          }
        }
      }
    };
  };

  return {
    dev:  options('index.dev.html'),
    prod: options('index.prod.html'),
    spec: options('_SpecRunner.html')
  };
};
