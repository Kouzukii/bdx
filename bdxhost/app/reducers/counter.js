// @flow
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';

export type counterStateType = number;

type actionType = {
  +type: string
};

export default function counter(
  state: counterStateType = 0,
  action: actionType
) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
}
