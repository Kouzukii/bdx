// @flow

import NativeServer from "../native";

type actionType = {
  +type: string
};

export const SERVER_CREATED = "SERVER_CREATED";
export const NATIVE_HELLO = "NATIVE_HELLO";
export const NATIVE_INIT = "NATIVE_INIT";
export const NATIVE_CLOSE = "NATIVE_CLOSE";

export function initServer() {
  return (
    dispatch: (action: actionType) => void
  ) => {
    const server = new NativeServer();
    dispatch({type: SERVER_CREATED, server});
    server.start(dispatch);
    server.send({type: NATIVE_INIT});
  };
}

