import { types, destroy } from 'mobx-state-tree';
import Store from '../src/store';

describe('store.ts', () => {
  test('can compose models', () => {
    const count = types
      .model('Count', {
        text: types.string,
        tags: types.optional(types.array(types.string), ['foo'])
      })
      .actions(self => ({
        change(val) {
          self.text = val;
        },
        changeType(val) {
          self.tags = val;
        }
      }));
    const store = Store.setup({ count });
    store.create({ count: { text: 'hello' } });
    expect(store.count.text).toBe('hello');
    store.count.change('foo');
    expect(store.count.text).toBe('foo');
    store.destroy();
  });

  test('should throw when invalid opt are provided', () => {
    const count = types
      .model('Count', {
        text: types.string,
        tags: types.optional(types.array(types.string), ['foo'])
      })
      .actions(self => ({
        change(val) {
          self.text = val;
        },
        changeType(val) {
          self.tags = val;
        }
      }));
    const store1 = types
      .model('Store1', {
        text: types.string
      })
      .actions(self => ({
        change(val) {
          self.text = val;
        }
      }));
    const store = Store.setup({ count, store1 });
    expect(() => store.create({ count: { text: 'hello' } })).toThrow();
    store.destroy();
  });

  test('should throw when invalid opt are provided', () => {
    expect(() => (Store as any).setup()).toThrow();
  });

  test('should throw when creating store before setup', () => {
    expect(() => Store.create()).toThrow();
  });
});
