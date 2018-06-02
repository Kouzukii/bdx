// @flow
import * as React from 'react';
import Table from "@material-ui/core/es/Table";
import TableHead from "@material-ui/core/es/TableHead";
import TableRow from "@material-ui/core/es/TableRow";
import TableCell from "@material-ui/core/es/TableCell";
import TableBody from "@material-ui/core/es/TableBody";
import npath from "path";
import normalize from "normalize-path";
import ExplorerTableEntry from "./ExplorerTableEntry";
import type {fileEntry} from "../reducers/explorer";

type Props = {
  path: string,
  entries: fileEntry[],
  moveToFolder: (string) => void
};

export default class ExplorerTable extends React.Component<Props> {
  props: Props;

  render() {
    const {
      path,
      moveToFolder,
      entries
    } = this.props;

    if (path === "") {
      moveToFolder("/");
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
            onClick={() => moveToFolder(normalize(npath.dirname(path)))}
            name=".."
            type="directory"
          />}
          {entries.filter(e => e.type === 'directory').map(e => (
            <ExplorerTableEntry
              key={e.name}
              type={e.type}
              name={e.name}
              size={e.size}
              onClick={() => moveToFolder(normalize(npath.join(path, e.name)))}
            />
          ))}
          {entries.filter(e => e.type === 'file').map(e => (
            <ExplorerTableEntry
              key={e.name}
              type={e.type}
              name={e.name}
              size={e.size}
            />
          ))}
        </TableBody>
      </Table>
    );
  }
}