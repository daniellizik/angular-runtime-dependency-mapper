export default function traverse(tree) {

  return function recurse(callback, node = tree, list = []) {
    const nextList = callback(list, node)
    if (node.childNodes) {
      return node.childNodes.reduce((acc, child) => {
        return recurse(callback, child, acc)
      }, nextList)
    } else {
      return nextList
    }
  }

}
