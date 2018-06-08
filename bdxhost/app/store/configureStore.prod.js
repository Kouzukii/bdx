// @flow
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import type { rootStateType } from '../reducers';
import rootReducer from '../reducers';

const history = createHashHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function configureStore(initialState?: rootStateType) {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
