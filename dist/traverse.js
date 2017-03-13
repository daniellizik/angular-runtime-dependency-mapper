"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = traverse;
function traverse(tree) {

  return function recurse(callback) {
    var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : tree;
    var list = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var nextList = callback(list, node);
    if (node.childNodes) {
      return node.childNodes.reduce(function (acc, child) {
        return recurse(callback, child, acc);
      }, nextList);
    } else {
      return nextList;
    }
  };
}
//# sourceMappingURL=traverse.js.map