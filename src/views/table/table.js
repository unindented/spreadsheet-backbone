define(function (require) {
  'use strict';

  // Styles.
  require('css!src/views/table/table');

  // Template.
  var template = require('jst!src/views/table/table');

  // Dependencies.
  var $        = require('jquery');
  var _        = require('underscore');
  var Base     = require('src/base/view');
  var Cells    = require('src/collections/cells');
  var CellView = require('src/views/cell/cell');

  /**
   * Table view that contains all cell views.
   */
  var Table = Base.extend({

    defaults: {
      rows: 100,
      cols: 26
    },

    events: {
      'click td': '_onClick'
    },

    tagName:   'table',
    className: 'table',
    template:  template,

    // PUBLIC

    initialize: function (options) {
      this._rows = options.rows;
      this._cols = options.cols;

      if (options.collection == null) {
        this.collection = new Cells();
      }
    },

    render: function () {
      var rows = _.range(1, this._rows + 1);
      var cols = _.map(_.range(1, this._cols + 1), function (c) {
        return String.fromCharCode(64 + c);
      });

      this.$el.html(this.template({
        rows: rows,
        cols: cols
      }));

      return this;
    },

    // PRIVATE

    _hasCellWithId: function (id) {
      return (this.$('#' + id + ' .cell').length > 0);
    },

    _onClick: function (evt) {
      var id = $(evt.target).closest('[id]').attr('id');

      // Try to find a cell with the clicked ID. If one is not found, create it
      // and attach it at the right point.
      if (!this._hasCellWithId(id)) {
        var cell = this.collection.getOrCreate(id);
        var view = new CellView({model: cell});

        this.append(view, '#' + id, true);
        view.focus();
      }
    }

  });

  return Table;
});
