# Mobx State Tree Utils

Collection of utilities to help you use mst for server side rendering and more.

# Features

* Server and client hydration
* dispatch mobx-state-tree actions

# Installation

```js
yarn add mst-utils
```

or

```js
npm install mst-utils
```

# Getting Started

```js
import { store } from 'mst-utils';
import counter from './stores/counter';

export default store.setup({ counter });
```

## Initialize stores

Somewhere on the server initialize your models by calling `store.create(state)`.

## Dehydrate

Dehydrate your state on the server

```js
import { dehydrate } from 'mst-utils';

const state = hydrate();

// Do something with state
window.__STATE = state
```

## Rehydrate

Rehydrates your state from the server. Should be called in your index client file.

```js
import { rehydrate } from 'mst-utils';

rehydrate();
```

## Dispatch

Dispatch any function from your mst models in the store.

```js
import { dispatch } from 'mst-utils';

dispatch('counter.increment');
```
