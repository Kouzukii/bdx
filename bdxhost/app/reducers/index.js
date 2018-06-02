// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import native from './native';
import type {counterStateType} from "./counter";
import type {nativeStateType} from "./native";
import explorer from "./explorer";
import type {explorerStateType} from "./explorer";

export type rootStateType = {
  +counter: counterStateType,
  +native: nativeStateType,
  +explorer: explorerStateType
};

const rootReducer = combineReducers({
  counter,
  native,
  explorer,
  router
});

export default rootReducer;
