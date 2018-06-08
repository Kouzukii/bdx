// @flow
import * as React from 'react';
import Table from "@material-ui/core/es/Table";
import TableHead from "@material-ui/core/es/TableHead";
import TableRow from "@material-ui/core/es/TableRow";
import TableCell from "@material-ui/core/es/TableCell";
import TableBody from "@material-ui/core/es/TableBody";
import ExplorerTableEntry from "./ExplorerTableEntry";
import type {fileEntry} from "../reducers/explorer";
import {combine, parent} from "../utils/PathUtils";
import {match} from "../utils/RealNames";

type Props = {
  path: string,
  loadedPath: string,
  entries: fileEntry[],
  loadPath: (string) => void,
  loading: boolean,
  errorLoading: boolean
};

export default class ExplorerTable extends React.Component<Props> {
  props: Props;

  render() {
    const {
      path,
      entries,
      loadedPath,
      loadPath,
      loading,
      errorLoading
    } = this.props;

    if (!loading && !errorLoading && loadedPath.toLowerCase() !== path.toLowerCase()) {
      loadPath(path);
    }

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{width: 'auto'}}>Filename</TableCell>
            <TableCell style={{width: 120}}>Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {path !== '/' && <ExplorerTableEntry
            key=".."
            target={parent(path)}
            name=".."
            type="go-up"
          />}
          {entries.filter(e => e.type === 'directory').map(e => (
            <ExplorerTableEntry
              key={e.name}
              type={e.type}
              name={e.name}
              size={e.size}
              realName={match(combine(path, e.name))}
              target={combine(path, e.name)}
            />
          ))}
          {entries.filter(e => e.type === 'file').map(e => (
            <ExplorerTableEntry
              key={e.name}
              type={e.type}
              name={e.name}
              size={e.size}
              realName={match(combine(path, e.name))}
              target={`${path}?file=${encodeURIComponent(e.name)}`}
            />
          ))}
        </TableBody>
      </Table>
    );
  }
}