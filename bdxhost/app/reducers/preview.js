// @flow

import {
  FILE_GET,
  FILE_GET_FAILED,
  FILE_GET_SUCCESS,
  FILE_READ_FAILED
} from '../actions/preview';

export type previewStateType = {
  +path: string | null,
  +fileType: string | null,
  +loading: boolean,
  +error: boolean
};

type actionType = any;

const initialState = () => ({
  path: null,
  fileType: null,
  loading: false,
  error: false
});

export default function preview(
  state: previewStateType = initialState(),
  action: actionType
): previewStateType {
  switch (action.type) {
    case FILE_GET:
      return { ...state, error: false, path: null, loading: true };
    case FILE_GET_FAILED:
      return { ...state, error: true, loading: false };
    case FILE_GET_SUCCESS:
      return {
        path: action.path,
        fileType: action.fileType,
        error: false,
        loading: false
      };
    case FILE_READ_FAILED:
      return { ...state, error: true };
    default:
      return state;
  }
}
