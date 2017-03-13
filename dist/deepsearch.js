'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepsearch;
function deepsearch(tree) {

  return function recurse(callback) {
    var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : tree;

    var type = Object.prototype.toString.call(node);
    var isArr = type === '[object Array]';
    var isObj = type === '[object Object]';
    var iterable = isArr ? node : Object.keys(node);
    var result = callback(node);
    if (result) return result;else if (!isArr && !isObj) return result;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = iterable[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        var next = node.hasOwnProperty(key) ? node[key] : key;
        var found = recurse(callback, next || {});
        if (found) return found;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };
}
//# sourceMappingURL=deepsearch.js.map