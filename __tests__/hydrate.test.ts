import { types } from 'mobx-state-tree';
import Store from '../src/store';
import { dehydrate, rehydrate } from '../src/hydrate';

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

describe('hydrate.ts', () => {
  it('should dehydrate', () => {
    const store = Store.setup({ count });
    const state = { count: { text: 'hello' } };
    store.create(state);
    expect(dehydrate()).toMatchSnapshot();
    store.destroy();
  });

  it('should rehydrate', () => {
    const store = Store.setup({ count });
    const state = { count: { text: 'hello' } };
    (window as any).__STATE = state;

    rehydrate();

    expect(store.count.text).toBe('hello');
    store.destroy();
  });
});
