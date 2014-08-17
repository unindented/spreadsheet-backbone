define(function (require) {
  'use strict';

  var Cells = require('src/collections/cells');

  describe('Cell', function() {
    var cells;
    var a1;

    beforeEach(function () {
      cells = new Cells();
      a1 = cells.add({id: 'A1'});
    });

    describe('~value', function () {
      it('defaults to null', function () {
        expect(a1.get('value')).toBeNull();
      });
    });

    describe('~error', function () {
      it('defaults to null', function () {
        expect(a1.get('error')).toBeNull();
      });
    });

    describe('~formula', function () {
      it('defaults to null', function () {
        expect(a1.get('formula')).toBeNull();
      });
    });

    describe('#hasFormula', function () {
      it('returns false if the cell has a formula', function () {
        a1.set('formula', null);
        expect(a1.hasFormula()).toBe(false);
      });

      it('returns true if the cell has a formula', function () {
        a1.set('formula', '1');
        expect(a1.hasFormula()).toBe(true);
      });
    });

    describe('#hasDependencies', function () {
      it('returns false if the cell has no dependencies', function () {
        a1.set('formula', '1');
        expect(a1.hasDependencies()).toBe(false);
      });

      it('returns true if the cell has dependencies', function () {
        a1.set('formula', '=SUM(A2,1)');
        expect(a1.hasDependencies()).toBe(true);
      });
    });

    describe('#isDependedOn', function () {
      var a2;

      beforeEach(function () {
        a2 = cells.add({id: 'A2'}, {merge: true});
      });

      it('returns false if the cell has no dependencies', function () {
        a2.set('formula', '1');
        expect(a1.isDependedOn()).toBe(false);
      });

      it('returns true if the cell has dependencies', function () {
        a2.set('formula', '=SUM(A1,1)');
        expect(a1.isDependedOn()).toBe(true);
      });
    });

    describe('with a formula containing a constant value', function () {
      it('updates its value', function () {
        a1.set('formula', '1');
        expect(a1.get('value')).toBe('1');
      });
    });

    describe('with a formula containing another cell', function () {
      var a2;
      var a3;

      beforeEach(function () {
        a2 = cells.add({id: 'A2', formula: '2'}, {merge: true});
        a3 = cells.add({id: 'A3', formula: '3'}, {merge: true});
      });

      it('updates its value when setting the formula', function () {
        a1.set('formula', '=SUM(A2, 1)');
        expect(a1.get('value')).toBe('3');
      });

      it('updates its value when changing associated cells', function () {
        a1.set('formula', '=SUM(A2, 1)');
        a2.set('value', '22');
        expect(a1.get('value')).toBe('23');
      });

      it('updates its value when changing the formula', function () {
        a1.set('formula', '=SUM(A2, 1)');
        a1.set('formula', '=SUM(A3, 1)');
        expect(a1.get('value')).toBe('4');
      });

      it('updates its parent dependencies when changing the formula', function () {
        a1.set('formula', '=SUM(A2, 1)');
        expect(a1.parents.length).toBe(1);
        a1.set('formula', '=SUM(A3, 1)');
        expect(a1.parents.length).toBe(1);
      });

      it('updates its child dependencies when changing the formula', function () {
        a1.set('formula', '=SUM(A2, 1)');
        a1.set('formula', '=SUM(A3, 1)');
        expect(a2.children.length).toBe(0);
        expect(a3.children.length).toBe(1);
      });
    });

    describe('with a formula containing a loop', function () {
      var a2;
      var a3;
      var a4;

      beforeEach(function () {
        a2 = cells.add({id: 'A2', formula: '=SUM(A3, 1)'}, {merge: true});
        a3 = cells.add({id: 'A3', formula: '=SUM(A1, 1)'}, {merge: true});
        a4 = cells.add({id: 'A4', formula: '=SUM(10, 1)'}, {merge: true});
      });

      it('flags the necessary cells when the loop is introduced', function () {
        a1.set('formula', '1');
        a1.set('formula', '=SUM(A2, 1)');
        expect(a1.get('error')).toBe('#LOOP');
        expect(a2.get('error')).toBe('#LOOP');
        expect(a3.get('error')).toBe('#LOOP');
        expect(a4.get('error')).toBeNull();
      });

      it('unflags the necessary cells when the loop is removed', function () {
        a1.set('formula', '=SUM(A2, 1)');
        a1.set('formula', '1');
        expect(a1.get('error')).toBeNull();
        expect(a2.get('error')).toBeNull();
        expect(a3.get('error')).toBeNull();
        expect(a4.get('error')).toBeNull();
      });
    });

    describe('with another formula containing a loop', function () {
      var a2;
      var a3;
      var a4;
      var a5;

      beforeEach(function () {
        a5 = cells.add({id: 'A5', formula: '=SUM(10, 1)'}, {merge: true});
        a4 = cells.add({id: 'A4', formula: '=SUM(A1, 1)'}, {merge: true});
        a3 = cells.add({id: 'A3', formula: '=SUM(A4, 1)'}, {merge: true});
        a2 = cells.add({id: 'A2', formula: '=SUM(A3, 1)'}, {merge: true});
      });

      it('flags the necessary cells when the loop is introduced', function () {
        a1.set('formula', '1');
        a1.set('formula', '=SUM(A4, 1)');
        expect(a1.get('error')).toBe('#LOOP');
        expect(a2.get('error')).toBe('#LOOP');
        expect(a3.get('error')).toBe('#LOOP');
        expect(a4.get('error')).toBe('#LOOP');
        expect(a5.get('error')).toBeNull();
      });

      it('unflags the necessary cells when the loop is removed', function () {
        a1.set('formula', '=SUM(A4, 1)');
        a1.set('formula', '1');
        expect(a1.get('error')).toBeNull();
        expect(a2.get('error')).toBeNull();
        expect(a3.get('error')).toBeNull();
        expect(a4.get('error')).toBeNull();
        expect(a5.get('error')).toBeNull();
      });
    });

  });
});
