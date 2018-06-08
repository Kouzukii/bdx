// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import type { counterStateType } from './counter';
import counter from './counter';
import type { nativeStateType } from './native';
import native from './native';
import type { explorerStateType } from './explorer';
import explorer from './explorer';
import type { previewStateType } from './preview';
import preview from './preview';

export type rootStateType = {
  +counter: counterStateType,
  +native: nativeStateType,
  +explorer: explorerStateType,
  +preview: previewStateType
};

const rootReducer = combineReducers({
  counter,
  native,
  explorer,
  preview,
  router
});

export default rootReducer;
