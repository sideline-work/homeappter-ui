/**
 * @params data an object to be unflatten
 */
export function unflattenData(data: any): any {
  const result = {};
  for (const i in data) {
    if (data.hasOwnProperty(i)) {
      const keys = i.split('.');
      keys.reduce((r, e, j) => {
        return (
          r[e] ||
          (r[e] = isNaN(Number(keys[j + 1]))
            ? keys.length - 1 === j
              ? data[i]
              : typeof e === 'object'
              ? []
              : {}
            : [])
        );
      }, result);
    }
  }
  return result;
}
