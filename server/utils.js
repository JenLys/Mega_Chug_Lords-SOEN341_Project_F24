/**
 * Removes the given keys from the given object.
 * Uses Reflect.deleteProperty, so no error will appear if the key is not in the object
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