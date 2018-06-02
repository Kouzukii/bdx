// @flow

import {FOLDER_GET, FOLDER_GET_FAILED, FOLDER_SUCCESS} from "../actions/explorer";

export type fileEntry = {
  name: string,
  type: 'directory' | 'file',
  size?: number
};

export type explorerStateType = {
  +path: string,
  +entries: fileEntry[],
  +loading: boolean,
  +error: boolean
};

type folderGetType = {
  type: typeof FOLDER_GET,
  path: string
};

type folderGetFailedType = {
  type: typeof FOLDER_GET_FAILED
};

type folderGetSuccessType = {
  type: typeof FOLDER_SUCCESS,
  path: string,
  entries: fileEntry[]
};

type actionType = folderGetType | folderGetFailedType | folderGetSuccessType | any;

const initialState = () => ({
  path: "",
  entries: [],
  loading: false,
  error: false
});

export default function explorer(state: explorerStateType = initialState(), action: actionType): explorerStateType {
  switch (action.type) {
    case FOLDER_GET:
      return {...state, loading: true};
    case FOLDER_GET_FAILED:
      return {...state, error: true, loading: false};
    case FOLDER_SUCCESS:
      return {path: action.path, entries: action.entries, error: false, loading: false};
    default:
      return state;
  }
}
