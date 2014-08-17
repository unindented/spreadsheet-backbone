define(function (require) {
  'use strict';

  var Base      = require('src/base/router');
  var TableView = require('src/views/table/table');

  /**
   * Main router.
   */
  var Router = Base.extend({

    routes: {
      '': 'index'
    },

    index: function () {
      var view = new TableView();
      this.attach(view, '#content');
    }

  });

  return Router;
});
