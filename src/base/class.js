define(function (require) {
  'use strict';

  // Dependencies.
  var _        = require('underscore');
  var Backbone = require('backbone');

  /**
   * Generic class.
   */
  var Class = function (options) {
    this.initialize.call(this, options);
  };

  _.extend(Class.prototype, Backbone.Events, {
    initialize: function () {}
  });

  Class.extend = Backbone.Model.extend;

  return Class;
});
