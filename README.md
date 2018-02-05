# Mobx State Tree Utils

Collection of utilities to help you use mst for server side rendering and more.

# Features

* Server and client hydration
* dispatch actions

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
import mymodel from './stores/mymodel';

export default store.setup({ mymodel });
```

## Initialize stores

Somewhere on the server initialize your models by calling `store.create(state)`.

## Dehydrate

Dehydrate your state on the server

```js
import { dehydrate } from 'mst-utils';

window.__STATE = hydrate();
```

## Rehydrate

Rehydrates your state from the server. Should be called in your index client file.

```js
import { rehydrate } from 'mst-utils';

rehydrate();
```

## Rehydrate

Dispatch any function from your mst models in the store.

```js
import { dispatch } from 'mst-utils';

dispatch('todos.addTodo', 'My todo');
```

# Credit

Thanks to [Claudio Savino](https://github.com/foxhound87) for `rfx-core` which inspired me to create `mst-utils`.
