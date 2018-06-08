// @flow

import * as React from 'react';
import TableRow from '@material-ui/core/es/TableRow';
import TableCell from '@material-ui/core/es/TableCell';
import FolderIcon from '@material-ui/icons/Folder';
import withStyles from '@material-ui/core/es/styles/withStyles';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import GoUpIcon from '@material-ui/icons/Reply';
import prettyBytes from 'pretty-bytes';
import { withRouter } from 'react-router-dom';

type Props = {
  type: string,
  name: string,
  realName?: ?string,
  size?: number,
  target: any,
  classes: any,
  history: any
};

const styles = theme => ({
  cell: {
    display: 'flex',
    alignItems: 'center'
  },
  text: {
    marginLeft: theme.spacing.unit
  },
  secondaryText: {
    marginLeft: theme.spacing.unit,
    color: theme.palette.text.secondary
  }
});

class ExplorerTableEntry extends React.Component<Props> {
  props: Props;

  getIcon() {
    switch (this.props.type) {
      case 'directory':
        return <FolderIcon />;
      case 'file':
        return <FileIcon />;
      case 'go-up':
        return <GoUpIcon />;
      default:
        return null;
    }
  }

  render() {
    const { name, target, size, classes, history, realName } = this.props;

    return (
      <TableRow
        onClick={() => history.push(target)}
        hover
        className={classes.row}
      >
        <TableCell>
          <span className={classes.cell}>
            {this.getIcon()}
            {realName && <span className={classes.text}>{realName}</span>}
            <span className={realName ? classes.secondaryText : classes.text}>
              {name}
            </span>
          </span>
        </TableCell>
        <TableCell>{size && prettyBytes(size)}</TableCell>
      </TableRow>
    );
  }
}

export default withRouter(withStyles(styles)(ExplorerTableEntry));
