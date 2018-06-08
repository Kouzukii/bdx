// @flow
import * as React from 'react';
import Table from '@material-ui/core/es/Table';
import TableHead from '@material-ui/core/es/TableHead';
import TableRow from '@material-ui/core/es/TableRow';
import TableCell from '@material-ui/core/es/TableCell';
import TableBody from '@material-ui/core/es/TableBody';
import withStyles from '@material-ui/core/es/styles/withStyles';
import ExplorerTableEntry from './ExplorerTableEntry';
import type { fileEntry } from '../reducers/explorer';
import { combine, parent } from '../utils/PathUtils';
import { match } from '../utils/RealNames';
import LoadingOverlay from './LoadingOverlay';

type Props = {
  classes: any,
  path: string,
  loadedPath: string,
  entries: fileEntry[],
  loadPath: string => void,
  loading: boolean,
  errorLoading: boolean,
  history: any
};

const styles = {
  root: {
    display: 'flex'
  },
  fileNameCell: {
    width: 'auto'
  },
  sizeCell: {
    width: 120
  }
};

class ExplorerTable extends React.Component<Props> {
  props: Props;

  constructor(props: Props) {
    super(props);

    props.loadPath(props.path);
  }

  componentWillUpdate(nextProps: Props) {
    const { path, loadedPath, loadPath, loading, errorLoading } = nextProps;

    if (
      !loading &&
      !errorLoading &&
      loadedPath.toLowerCase() !== path.toLowerCase()
    ) {
      loadPath(path);
    }
  }

  moveTo = (destination: string) => () => this.props.history.push(destination);

  render() {
    const { path, entries, loading, classes } = this.props;

    return (
      <div className={classes.root}>
        {loading && <LoadingOverlay />}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell classname={classes.fileNameCell}>Filename</TableCell>
              <TableCell classname={classes.sizeCell}>Size</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {path !== '/' && (
              <ExplorerTableEntry
                key=".."
                onClick={this.moveTo(parent(path))}
                name=".."
                type="go-up"
              />
            )}
            {entries
              .filter(e => e.type === 'directory')
              .map(e => (
                <ExplorerTableEntry
                  key={e.name}
                  type={e.type}
                  name={e.name}
                  size={e.size}
                  realName={match(combine(path, e.name))}
                  onClick={this.moveTo(combine(path, e.name))}
                />
              ))}
            {entries
              .filter(e => e.type === 'file')
              .map(e => (
                <ExplorerTableEntry
                  key={e.name}
                  type={e.type}
                  name={e.name}
                  size={e.size}
                  realName={match(combine(path, e.name))}
                  onClick={this.moveTo(
                    `${path}?file=${encodeURIComponent(e.name)}`
                  )}
                />
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(ExplorerTable);
