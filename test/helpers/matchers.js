(function (window, jasmine) {
  'use strict';

  beforeEach(function() {
    jasmine.addMatchers({
      toBeEmpty: function () {
        return {
          compare: function (actual) {
            return {pass: actual.length === 0};
          }
        };
      },

      toHaveTagName: function () {
        return {
          compare: function ($elem, expected) {
            var actual = $elem.prop('tagName').toLowerCase();
            return {pass: actual === expected};
          }
        };
      },

      toHaveClassName: function () {
        return {
          compare: function ($elem, expected) {
            var actual = $elem.prop('className');
            return {pass: actual.indexOf(expected) >= 0};
          }
        };
      },

      toHaveId: function () {
        return {
          compare: function ($elem, expected) {
            var actual = $elem.prop('id');
            return {pass: actual === expected};
          }
        };
      },

      toHaveSelector: function () {
        return {
          compare: function ($elem, selector, times) {
            var actual = $elem.find(selector).length;
            return {pass: (times != null ? actual === times : actual > 0)};
          }
        };
      },

      toHaveText: function () {
        return {
          compare: function ($elem, expected) {
            var actual = $elem.text();
            if (expected && typeof expected.test === 'function') {
              return {pass: expected.test(actual)};
            } else {
              return {pass: actual.indexOf(expected) !== -1};
            }
          }
        };
      },

      toHaveCss: function () {
        return {
          compare: function ($elem, css) {
            var prop, value;
            for (prop in css) {
              if (css.hasOwnProperty(prop)) {
                value = css[prop];
                if ($elem.css(prop) !== value) {
                  return {pass: false};
                }
              }
            }
            return {pass: true};
          }
        };
      }
    });
  });
})(this, this.jasmine);
