define(function (require) {
  'use strict';

  // Dependencies.
  var _     = require('underscore');
  var Class = require('src/base/class');

  /**
   * Class that detects loops in the graph of cells.
   */
  var LoopDetector = Class.extend({

    // PUBLIC

    detect: function (root) {
      var hasLoop = false;

      var cell = null;
      var unvisited = [root];

      while (!hasLoop && unvisited.length > 0) {
        cell = unvisited.pop();
        unvisited.unshift.apply(unvisited, cell.children.models);

        hasLoop = _.contains(unvisited, root);
      }

      return hasLoop;
    }

  });

  return new LoopDetector();
});
