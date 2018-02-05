import { getSnapshot } from 'mobx-state-tree';

interface LooseObject {
  [key: string]: any;
}

class Store {
  private imports = {};
  public setup(stores) {
    if (!stores) {
      throw new Error('Must provide atleast 1 mst model.');
    }
    this.imports = stores;
    return this;
  }

  public create(state = {}) {
    if (Object.keys(this.imports).length === 0) {
      throw new Error('You must run the setup function before create.');
    }
    Object.keys(this.imports).forEach(key => {
      const StoreModel = this.imports[key];
      try {
        const instance = StoreModel.create(state[key]);
        this[key] = instance;
      } catch (err) {
        throw new Error(err);
      }
    });
    return this;
  }

  public getJSON() {
    const stores = {};
    Object.keys(this.imports).forEach((key: string) => {
      const instance = this[key];
      stores[key] = getSnapshot(instance);
    });
    return stores;
  }

  public destroy() {
    Object.keys(this.imports).forEach((key: string) => {
      delete this.imports[key];
      delete this[key];
    });
  }
}

export default new Store() as Store & LooseObject;
