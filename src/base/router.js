define(function (require) {
  'use strict';

  // Dependencies.
  var $        = require('jquery');
  var _        = require('underscore');
  var Backbone = require('backbone');

  /**
   * Base router.
   */
  var Router = Backbone.Router.extend({

    start: function () {
      Backbone.history.start();
      return this;
    },

    attach: function (view, selector) {
      this._views = this._views || [];

      this._views.push(view);
      $(selector).html(view.render().el);

      return this;
    },

    remove: function () {
      _.invoke(this._views, 'remove');
      return this;
    }

  });

  return Router;
});
