define(function (require) {
  'use strict';

  // Dependencies.
  var Collection = require('src/base/collection');
  var Cell       = require('src/models/cell');

  /**
   * Cell collection.
   */
  var Cells = Collection.extend({

    model: Cell,

    getOrCreate: function (id) {
      var cell = this.get(id);

      if (cell == null) {
        cell = this.add({id: id});
      }

      return cell;
    }

  });

  return Cells;
});
