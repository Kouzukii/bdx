// @flow

import type { rootStateType } from '../reducers';

type actionType = {
  +type: string
};

export const FILE_GET = 'FILE_GET';
export const FILE_GET_FAILED = 'FILE_GET_FAILED';
export const FILE_GET_SUCCESS = 'FILE_GET_SUCCESS';
export const FILE_READ_FAILED = 'FILE_READ_FAILED';
export const FILE_UPSCALE = 'FILE_UPSCALE';
export const FILE_UPSCALE_FAILED = 'FILE_UPSCALE_FAILED';
export const FILE_UPSCALE_SUCCESS = 'FILE_UPSCALE_SUCCESS';

export function loadFile(path: string, extractTextures: boolean) {
  return (
    dispatch: (action: actionType) => void,
    getState: () => rootStateType
  ) => {
    const { ready, server } = getState().native;
    if (!ready || !server) return;
    const msg = {
      type: FILE_GET,
      path: path,
      extractTextures: extractTextures
    };
    dispatch(msg);
    server.send(msg);
  };
}

export function errorWhileOpeningFile(error: Error) {
  return { type: FILE_READ_FAILED, error: error };
}

export function upscaleImage(type: string, path: string) {
  return (
    dispatch: (action: actionType) => void,
    getState: () => rootStateType
  ) => {
    const { ready, server } = getState().native;
    if (!ready || !server) return;
    const msg = {
      type: FILE_UPSCALE,
      path: path,
      textureType: type
    };
    dispatch(msg);
    server.send(msg);
  };
}
