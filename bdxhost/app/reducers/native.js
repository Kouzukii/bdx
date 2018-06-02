// @flow
import type NativeServer from "../native";
import {NATIVE_HELLO, SERVER_CREATED} from "../actions/native";

export type nativeStateType = {
  +server?: NativeServer,
  +ready: boolean
};

type actionType = {
  type: string,
  server?: NativeServer
};

const initialState = () => ({
  ready: false
});

export default function native(state: nativeStateType = initialState(), action: actionType): nativeStateType {
  switch (action.type) {
    case SERVER_CREATED:
      return {server: action.server, ready: false};
    case NATIVE_HELLO:
      return {...state, ready: true};
    default:
      return state;
  }
}
