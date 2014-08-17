define(function (require) {
  'use strict';

  // Styles.
  require('css!normalize');
  require('css!src/app/app');

  // Dependencies.
  var Class  = require('src/base/class');
  var Router = require('src/routers/router');

  /**
   * Main app.
   */
  var App = Class.extend({

    initialize: function () {
      this._router = new Router();
    },

    start: function () {
      this._router.start.apply(this._router, arguments);
      return this;
    }

  });

  return App;
});
