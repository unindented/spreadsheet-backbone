define(function (require) {
  'use strict';

  var Cells = require('src/collections/cells');

  describe('Cells', function() {
    var cells;

    beforeEach(function () {
      cells = new Cells();
    });

    describe('#getOrCreate', function () {
      it('creates a new cell with that ID if it did not exist', function () {
        var cell = cells.getOrCreate('A1');
        expect(cell.get('id')).toBe('A1');
      });

      it('returns the cell with that ID if it did exist', function () {
        cells.add({id: 'A1'});

        var cell = cells.getOrCreate('A1');
        expect(cell.get('id')).toBe('A1');
      });
    });

  });
});
