define(function (require) {
  'use strict';

  var Backbone = require('backbone');
  var App      = require('src/app/app');

  describe('App', function() {
    var app;

    beforeEach(function () {
      app = new App();
    });

    describe('#start', function () {
      it('starts the router', function () {
        spyOn(Backbone.history, 'start');
        app.start();
        expect(Backbone.history.start).toHaveBeenCalled();
      });
    });

  });
});
