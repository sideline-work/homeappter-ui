import { HttpParams } from '@angular/common/http';
import { flattenData } from './flatten-data';

/**
 * @params data an object to be converted to HttpParams
 */
export function buildHttpParams(data: any): HttpParams {
  let params: HttpParams = new HttpParams();

  const flatObject = flattenData(data);
  for (const key in flatObject) {
    if (flatObject[key] || typeof flatObject[key] === 'boolean') {
      // keys - variable to store the flatten keys of the object
      const keys = key.split('.');
      let finalKey = key;
      if (!isNaN(parseInt(keys[keys.length - 1], 10))) {
        // remove the last key if a number
        finalKey = keys.slice(0, keys.length - 1).join('.');
      }
      params = params.append(finalKey, flatObject[key]);
    }
  }
  return params;
}
