define(function (require) {
  'use strict';

  var Cells        = require('src/collections/cells');
  var LoopDetector = require('src/utils/loop_detector');

  describe('LoopDetector', function() {
    var cells;
    var a1;
    var a2;
    var a3;

    beforeEach(function () {
      cells = new Cells();
      a1 = cells.add({id: 'A1'});
      a2 = cells.add({id: 'A2'});
      a3 = cells.add({id: 'A3'});
    });

    describe('#detect', function () {
      it('does nothing when there are no loops', function () {
        a1.set('formula', '1');
        a2.set('formula', '=SUM(A1,1)');
        a3.set('formula', '=SUM(A1,A2)');
        expect(LoopDetector.detect(a1)).toBe(false);
        expect(LoopDetector.detect(a2)).toBe(false);
        expect(LoopDetector.detect(a3)).toBe(false);
      });

      it('flags the necessary cells when there is a loop', function () {
        a1.set('formula', '1');
        a2.set('formula', '=SUM(A3,1)');
        a3.set('formula', '=SUM(A2,1)');
        expect(LoopDetector.detect(a1)).toBe(false);
        expect(LoopDetector.detect(a2)).toBe(true);
        expect(LoopDetector.detect(a3)).toBe(true);
      });
    });

  });
});
