define(function (require) {
  'use strict';

  // Dependencies.
  var _        = require('underscore');
  var Backbone = require('backbone');

  /**
   * Base view that allows for nested views.
   */
  var View = Backbone.View.extend({

    constructor: function (options) {
      this._setup();

      options = _.extend({}, _.result(this, 'defaults'), options);
      Backbone.View.call(this, options);
    },

    // PUBLIC

    append: function (view, selector, attach) {
      this._addChild(view, selector, 'append', attach);
      return this;
    },

    prepend: function (view, selector, attach) {
      this._addChild(view, selector, 'prepend', attach);
      return this;
    },

    // PRIVATE

    _setup: function () {
      this._children = [];
      this.render = this._wrapRender();
      this.remove = this._wrapRemove();
    },

    _addChild: function (view, selector, method, attach) {
      var child = { view: view, selector: selector, method: method || 'append' };

      var removeFromParent = function (child) {
        this._children = _.without(this._children, child);
      };
      view._removeFromParent = _.bind(removeFromParent, this, child);

      this._children.push(child);

      if (attach) {
        this._attachChild(child);
      }
    },

    _removeChildren: function () {
      _.each(this._children, function (child) {
        child.view.remove();
      });
      this._children = [];
    },

    _removeFromParent: function () {
    },

    _wrapRender: function () {
      var wrapper = function (render) {
        var args = _.rest(arguments);

        render.apply(this, args);
        this._attachChildren();

        return View.prototype.render.apply(this, args);
      };

      var originalRender = _.bind(this.render, this);
      return _.wrap(originalRender, wrapper);
    },

    _wrapRemove: function () {
      var wrapper = function (remove) {
        var args = _.rest(arguments);

        this._removeFromParent();
        this._removeChildren();
        remove.apply(this, args);

        return View.prototype.remove.apply(this, args);
      };

      var originalRemove = _.bind(this.remove, this);
      return _.wrap(originalRemove, wrapper);
    },

    _attachChild: function (child) {
      var target = child.selector ? this.$(child.selector) : this.$el;
      child.view.render();
      target[child.method](child.view.$el);
    },

    _attachChildren: function () {
      _.each(this._children, function (child) {
        this._attachChild(child);
        child.view.delegateEvents();
      }, this);
    }
  });

  return View;
});
