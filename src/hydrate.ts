import Store from './store';

export function dehydrate() {
  return JSON.stringify(Store.getJSON());
}

export function rehydrate() {
  return Store.create((<any>window).__STATE);
}
