import * as cloneDeepLodash from 'lodash';

export function cloneDeep<T>(val: T): T {
  return cloneDeepLodash.cloneDeep(val) as T;
}
