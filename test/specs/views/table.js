define(function (require) {
  'use strict';

  var Cells     = require('src/collections/cells');
  var TableView = require('src/views/table/table');

  describe('Table', function() {
    var table;

    beforeEach(function () {
      var collection = new Cells();

      table = new TableView({collection: collection});
      table.render();
    });

    afterEach(function () {
      table.remove();
    });

    describe('#render', function () {
      it('renders a table tag', function () {
        expect(table.$el).toHaveTagName('table');
      });

      it('renders a tag with class `table`', function () {
        expect(table.$el).toHaveClassName('table');
      });

      it('renders rows 1 to 100 and columns A to Z', function () {
        expect(table.$el).toHaveSelector('td', 2600);
      });

      it('assigns an ID to each cell', function () {
        expect(table.$el).toHaveSelector('#A1');
        expect(table.$el).toHaveSelector('#Z100');
      });
    });

    describe('@click', function () {
      it('creates a child view for that cell if one does not exist', function () {
        expect(table.$el).not.toHaveSelector('#B2 .cell');
        table.$('#B2').click();
        expect(table.$el).toHaveSelector('#B2 .cell');
      });

      it('does not create a child view for that cell if one exists', function () {
        table.$('#B2').click();
        expect(table.$el).toHaveSelector('#B2 .cell', 1);
        table.$('#B2').click();
        expect(table.$el).toHaveSelector('#B2 .cell', 1);
      });
    });

  });
});
