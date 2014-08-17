define(function (require) {
  'use strict';

  // Styles.
  require('css!src/views/cell/cell');

  // Template.
  var template = require('jst!src/views/cell/cell');

  // Dependencies.
  var $    = require('jquery');
  var Base = require('src/base/view');

  /**
   * Cell view that allows the user to edit a cell.
   */
  var Cell = Base.extend({

    events: {
      'click':            '_onClick',
      'focus   .formula': '_onFocus',
      'blur    .formula': '_onBlur',
      'keydown .formula': '_onKeyDown'
    },

    className: 'cell',
    template:  template,

    // PUBLIC

    initialize: function () {
      this.listenTo(this.model, 'change:error', this.render);
      this.listenTo(this.model, 'change:value', this.render);
    },

    remove: function () {
      if (this.model.collection != null) {
        this.model.collection.remove(this.model);
      }

      return this;
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));

      this.$value   = this.$('.value');
      this.$formula = this.$('.formula');

      return this;
    },

    confirm: function () {
      this.model.set('formula', $.trim(this.$formula.val()) || null);
      return this;
    },

    revert: function () {
      this.$formula.val(this.model.get('formula'));
      return this;
    },

    focus: function () {
      this.$el.addClass('focused');
      this.$formula.focus();
      return this;
    },

    blur: function () {
      this.$formula.blur();
      this.$el.removeClass('focused');
      return this;
    },

    // PRIVATE

    _onClick: function (evt) {
      evt.stopPropagation();

      this.focus();
    },

    _onFocus: function () {
      this.$el.addClass('focused');
    },

    _onBlur: function () {
      this.$el.removeClass('focused');

      this.confirm();

      if (!this.model.hasFormula() && !this.model.isDependedOn()) {
        this.remove();
      }
    },

    _onKeyDown: function (evt) {
      switch (evt.which) {
      case 9:
      case 13:
        this._onKeyDownConfirm(evt);
        break;
      case 27:
        this._onKeyDownRevert(evt);
        break;
      }
    },

    _onKeyDownConfirm: function (evt) {
      evt.preventDefault();

      this.blur();
    },

    _onKeyDownRevert: function (evt) {
      evt.preventDefault();

      this.revert();
      this.blur();
    }

  });

  return Cell;
});
