// @flow

import type {rootStateType} from "../reducers";

type actionType = {
  +type: string
};

export const FOLDER_GET = "FOLDER_GET";
export const FOLDER_GET_FAILED = "FOLDER_GET_FAILED";
export const FOLDER_GET_SUCCESS = "FOLDER_GET_SUCCESS";

export function loadPath(path: string) {
  return (
    dispatch: (action: actionType) => void,
    getState: () => rootStateType
  ) => {
    const {ready, server} = getState().native;
    if (!ready || !server) return;
    const msg = {type: FOLDER_GET, path: path};
    dispatch(msg);
    server.send(msg);
  };
}

