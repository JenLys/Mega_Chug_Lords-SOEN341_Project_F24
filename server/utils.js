/**
 * Returns new object with only the keys specified. If a key is not found 
 * then it is ignored
 * @export
 * @param {Object} obj Object 
 * @param {Array<String>} props keys to remove from object
 * @return {Object} 
 */
export function keepKeys(obj, subset) {
  return subset
    .filter(key => key in obj)
    .reduce((obj2, key) => (obj2[key] = obj[key], obj2), {})
}