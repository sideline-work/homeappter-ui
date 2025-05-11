/**
 * @params data an object to be flatten
 */
export function flattenData(data: any): any {
  const toReturn = {};
  for (const i in data) {
    if (!data.hasOwnProperty(i)) {
      continue;
    }

    if (typeof data[i] === 'object') {
      const flatObject = flattenData(data[i]);
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) {
          continue;
        }
        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = data[i];
    }
  }
  return toReturn;
}
