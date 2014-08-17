define(function (require) {
  'use strict';

  // Dependencies.
  var _             = require('underscore');
  var Model         = require('src/base/model');
  var Collection    = require('src/base/collection');
  var FormulaParser = require('src/utils/formula_parser');
  var LoopDetector  = require('src/utils/loop_detector');

  /**
   * Cell model.
   */
  var Cell = Model.extend({

    defaults: {
      value:   null,
      error:   null,
      formula: null
    },

    // PUBLIC

    initialize: function () {
      // Cells on which this one depends.
      this.parents = new Collection();
      // Cells that depend on this one.
      this.children = new Collection();

      if (this.hasFormula()) {
        this._onChangeFormula();
      }

      this.listenTo(this, 'change:value',   this._onChangeValue);
      this.listenTo(this, 'change:error',   this._onChangeError);
      this.listenTo(this, 'change:formula', this._onChangeFormula);
    },

    hasFormula: function () {
      return this.has('formula');
    },

    hasDependencies: function () {
      return (this.parents.length > 0);
    },

    isDependedOn: function () {
      return (this.children.length > 0);
    },

    value: function () {
      return this.get('_formula').run();
    },

    update: function () {
      // This call can cause an infinite cascade of events, as formulas are
      // evaluated at runtime. We'll need to detect loops in the graph first.
      if (LoopDetector.detect(this)) {
        this.error('#LOOP');
      }
      else {
        this.set({value: this.value()});
      }

      return this;
    },

    error: function (error) {
      // This call cannot cause an infinite cascade of events, as `error` is a
      // constant value, and Backbone only triggers a `change` event if the old
      // and new values are different.
      this.set({error: error});
      this.set({value: null}, {silent: true});

      return this;
    },

    // PRIVATE

    _onChangeValue: function () {
      this.children.invoke('update');
    },

    _onChangeError: function () {
      this.children.invoke('error', this.get('error'));
    },

    _onChangeFormula: function () {
      var cells = this.collection;

      var oldFormula = this.get('_formula');
      var oldRefs    = oldFormula && oldFormula.refs;

      var newFormula = FormulaParser.parse(this);
      var newRefs    = newFormula && newFormula.refs;

      // Clear errors in the graph before updating dependencies.
      this.error(null);

      // Remove this cell from the list of dependencies of all other cells
      // referenced in the old formula.
      _.each(oldRefs, function (id) {
        var oldRef = cells.getOrCreate(id);
        oldRef.children.remove(this);
        this.parents.remove(oldRef);
      }, this);

      // Add this cell to the list of dependencies of all other cells referenced
      // in the new formula.
      _.each(newRefs, function (id) {
        var newRef = cells.getOrCreate(id);
        newRef.children.add(this);
        this.parents.add(newRef);
      }, this);

      // Update the parsed formula for this cell.
      this.set({_formula: newFormula});

      // Cause a cascade of updates.
      this.update();
    }

  });

  return Cell;
});
