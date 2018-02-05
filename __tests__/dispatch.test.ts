import { types } from 'mobx-state-tree';
import Store from '../src/store';
import dispatch from '../src/dispatch';

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

describe('dispatch.ts', () => {
  it('can dispatch functions', () => {
    const store = Store.setup({ count });
    store.create({ count: { text: 'hello' } });

    expect(store.count.text).toBe('hello');
    expect(store.count.tags).toContain('foo');

    dispatch('count.change', 'foo');
    dispatch('count.changeType', ['cofveve']);

    expect(store.count.text).toBe('foo');
    expect(store.count.tags).toContain('cofveve');
    store.destroy();
  });

  it('should throw an error when no function is found', () => {
    const store = Store.setup({ count });
    store.create({ count: { text: 'hello' } });

    expect(() => dispatch('count.notFound', ['bar'])).toThrow();
    store.destroy();
  });
});
