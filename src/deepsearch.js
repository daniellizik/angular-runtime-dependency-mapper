export default function deepsearch(tree) {

  return function recurse(callback, node = tree) {
    const type = Object.prototype.toString.call(node)
    const isArr = type === '[object Array]'
    const isObj = type === '[object Object]'
    const iterable = isArr ? node : Object.keys(node)
    const result = callback(node)
    if (result)
      return result
    else if (!isArr && !isObj)
      return result
    for (const key of iterable) {
      const next = node.hasOwnProperty(key) ? node[key] : key
      const found = recurse(callback, next || {})
      if (found)
        return found
    }
  }

}
