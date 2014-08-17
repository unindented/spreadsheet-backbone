define(function (require) {
  'use strict';

  var $        = require('jquery');
  var Cells    = require('src/collections/cells');
  var CellView = require('src/views/cell/cell');

  describe('Cell', function() {
    var cell;

    beforeEach(function () {
      var collection = new Cells();
      var model = collection.add({id: 'A1'});

      cell = new CellView({model: model});
      cell.render();
    });

    afterEach(function () {
      cell.remove();
    });

    describe('#remove', function () {
      it('removes the associated model from its collection', function () {
        var collection = cell.model.collection;
        expect(collection.length).toBe(1);
        cell.remove();
        expect(collection.length).toBe(0);
      });
    });

    describe('#render', function () {
      it('renders a div tag', function () {
        expect(cell.$el).toHaveTagName('div');
      });

      it('renders a tag with class `cell`', function () {
        expect(cell.$el).toHaveClassName('cell');
      });

      it('renders an input field with class `value`', function () {
        expect(cell.$el).toHaveSelector('input.value');
      });

      it('renders an input field with class `formula`', function () {
        expect(cell.$el).toHaveSelector('input.formula');
      });
    });

    describe('#confirm', function () {
      beforeEach(function () {
        cell.model.set({formula: 'foobar'});
        cell.$('input.formula').val('foobaz');
      });

      it('updates the `formula` field of the model with the value of the input', function () {
        cell.confirm();
        expect(cell.model.get('formula')).toBe('foobaz');
      });
    });

    describe('#revert', function () {
      beforeEach(function () {
        cell.model.set({formula: 'foobar'});
        cell.$('input.formula').val('foobaz');
      });

      it('reverts the value of the input to the `formula` field of the model', function () {
        cell.revert();
        expect(cell.$('input.formula').val()).toBe('foobar');
      });
    });

    describe('#focus', function () {
      it('adds the class `focused`', function () {
        cell.blur();
        cell.focus();
        expect(cell.$el).toHaveClassName('focused');
      });
    });

    describe('#blur', function () {
      it('removes the class `focused`', function () {
        cell.focus();
        cell.blur();
        expect(cell.$el).not.toHaveClassName('focused');
      });
    });

    describe('@click', function () {
      it('focuses on the cell', function () {
        spyOn(cell, 'focus');
        cell.$el.click();
        expect(cell.focus).toHaveBeenCalled();
      });
    });

    describe('@keydown', function () {
      var trigger = function ($elem, which) {
        var evt = $.Event('keydown');
        evt.which = which;
        $elem.trigger(evt);
      };

      describe('with TAB', function () {
        it('confirms', function () {
          spyOn(cell, 'confirm');
          trigger(cell.$('.formula'), 9);
          expect(cell.confirm).toHaveBeenCalled();
        });
      });

      describe('with ENTER', function () {
        it('confirms', function () {
          spyOn(cell, 'confirm');
          trigger(cell.$('.formula'), 13);
          expect(cell.confirm).toHaveBeenCalled();
        });
      });

      describe('with ESC', function () {
        it('reverts', function () {
          spyOn(cell, 'revert');
          trigger(cell.$('.formula'), 27);
          expect(cell.revert).toHaveBeenCalled();
        });
      });
    });

  });
});
