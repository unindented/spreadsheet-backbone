define(function (require) {
  'use strict';

  var Cells         = require('src/collections/cells');
  var FormulaParser = require('src/utils/formula_parser');

  describe('FormulaParser', function() {
    var cells;
    var a1;
    var a2;
    var a3;

    beforeEach(function () {
      cells = new Cells();
      a1 = cells.add({id: 'A1'});
      a2 = cells.add({id: 'A2', formula: '2'});
      a3 = cells.add({id: 'A3', formula: '3'});
    });

    describe('#parse', function () {
      it('parses an empty formula', function () {
        a1.set('formula', null, {silent: true});
        var formula = FormulaParser.parse(a1);
        expect(formula.refs).toBeEmpty();
        expect(formula.run()).toBeNull();
      });

      it('parses a static formula', function () {
        a1.set('formula', '1', {silent: true});
        var formula = FormulaParser.parse(a1);
        expect(formula.refs).toBeEmpty();
        expect(formula.run()).toBe('1');
      });

      it('parses a dynamic `concat` formula with one argument', function () {
        a1.set('formula', '=CONCAT(A2)', {silent: true});
        var formula = FormulaParser.parse(a1);
        expect(formula.refs).toContain('A2');
        expect(formula.run()).toBe('2');
      });

      it('parses a dynamic `concat` formula with multiple arguments', function () {
        a1.set('formula', '=CONCAT(A2,A3,4)', {silent: true});
        var formula = FormulaParser.parse(a1);
        expect(formula.refs).toContain('A2');
        expect(formula.refs).toContain('A3');
        expect(formula.run()).toBe('234');
      });

      it('parses a dynamic `prod` formula with one argument', function () {
        a1.set('formula', '=PROD(A2)', {silent: true});
        var formula = FormulaParser.parse(a1);
        expect(formula.refs).toContain('A2');
        expect(formula.run()).toBe('2');
      });

      it('parses a dynamic `prod` formula with multiple arguments', function () {
        a1.set('formula', '=PROD(A2,A3,4)', {silent: true});
        var formula = FormulaParser.parse(a1);
        expect(formula.refs).toContain('A2');
        expect(formula.refs).toContain('A3');
        expect(formula.run()).toBe('24');
      });

      it('parses a dynamic `sum` formula with one argument', function () {
        a1.set('formula', '=SUM(A2)', {silent: true});
        var formula = FormulaParser.parse(a1);
        expect(formula.refs).toContain('A2');
        expect(formula.run()).toBe('2');
      });

      it('parses a dynamic `sum` formula with multiple arguments', function () {
        a1.set('formula', '=SUM(A2,A3,4)', {silent: true});
        var formula = FormulaParser.parse(a1);
        expect(formula.refs).toContain('A2');
        expect(formula.refs).toContain('A3');
        expect(formula.run()).toBe('9');
      });
    });

  });
});
