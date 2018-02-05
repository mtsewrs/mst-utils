import store from './store';
import get from 'lodash.get';

export default function dispatch(opt, ...args) {
  const fn = get(store, opt);
  if (typeof fn !== 'function') {
    throw new Error('Not a function');
  }

  return fn(...args);
}
