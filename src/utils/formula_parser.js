define(function (require) {
  'use strict';

  // Dependencies.
  var _     = require('underscore');
  var Class = require('src/base/class');

  // Regex for parsing formulas.
  var FORMULA_REGEX = /^=([A-Z]+)\(([^)]*)\)$/i;

  /**
   * Class that parses a formula.
   */
  var FormulaParser = Class.extend({

    // PUBLIC

    parse: function (cell) {
      var formula = cell.get('formula');
      var cells   = cell.collection;

      if (this._isFormula(formula) && this._isDynamicFormula(formula)) {
        return this._parseDynamicFormula(formula, cells);
      }
      else {
        return this._parseStaticFormula(formula, cells);
      }
    },

    // FORMULAS

    concat: function (cells, args) {
      return _.reduce(this._values(cells, args), function (memo, arg) {
        return memo + arg;
      }, '', this);
    },

    prod: function (cells, args) {
      return _.reduce(this._values(cells, args), function (memo, arg) {
        return memo * parseInt(arg, 10);
      }, 1, this);
    },

    sum: function (cells, args) {
      return _.reduce(this._values(cells, args), function (memo, arg) {
        return memo + parseInt(arg, 10);
      }, 0, this);
    },

    // PRIVATE

    _values: function (cells, args) {
      return _.map(args, function (arg) {
        if (this._isCell(arg)) {
          arg = cells.getOrCreate(arg).get('value');
        }
        return arg;
      }, this);
    },

    _isCell: function (arg) {
      var code = arg.charCodeAt(0);
      return (code >= 65 && code <= 90);
    },

    _isFormula: function (formula) {
      return _.isString(formula);
    },

    _isDynamicFormula: function (formula) {
      var match = formula.match(FORMULA_REGEX);
      return (match != null);
    },

    _parseDynamicFormula: function (formula, cells) {
      var self  = this;
      var match = formula.match(FORMULA_REGEX);
      var func  = match[1].toLowerCase();
      var args  = _.map(match[2].split(/\s*,\s*/), function (arg) {
        return arg.toUpperCase();
      });

      return {
        refs: _.filter(args, self._isCell),

        run: function () {
          return '' + self[func].call(self, cells, args);
        }
      };
    },

    _parseStaticFormula: function (formula) {
      return {
        refs: [],

        run: function () {
          return formula;
        }
      };
    }

  });

  return new FormulaParser();
});
