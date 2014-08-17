define(function (require) {
  'use strict';

  var $      = require('jquery');
  var Router = require('src/routers/router');

  describe('Router', function() {
    var content;
    var router;

    beforeEach(function () {
      content = $('<div id="content"/>').appendTo('body');
      router  = new Router();
    });

    afterEach(function () {
      router.remove();
      content.remove();
    });

    describe('#index', function () {
      it('adds a new table to the page', function () {
        router.index();
        expect($('body')).toHaveSelector('.table');
      });
    });

  });
});
