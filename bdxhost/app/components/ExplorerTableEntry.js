// @flow

import * as React from 'react';
import TableRow from '@material-ui/core/es/TableRow';
import TableCell from '@material-ui/core/es/TableCell';
import FolderIcon from "@material-ui/icons/Folder";
import withStyles from "@material-ui/core/es/styles/withStyles";
import FileIcon from "@material-ui/icons/AttachFile";
import prettyBytes from 'pretty-bytes';

type Props = {
  type: string,
  name: string,
  size?: number,
  onClick?: () => void,
  classes: any
};

const styles = {
  row: {
    cursor: 'pointer'
  }
};

class ExplorerTableEntry extends React.Component<Props> {
  props: Props;

  render() {
    const {
      name,
      onClick,
      size,
      type,
      classes
    } = this.props;

    return (
      <TableRow hover onClick={onClick} className={classes.row}>
        <TableCell>
          {type === 'directory' ? <FolderIcon/> : <FileIcon/>}
          {name}
        </TableCell>
        <TableCell>{size && prettyBytes(size)}</TableCell>
      </TableRow>
    )
  }
}

export default withStyles(styles)(ExplorerTableEntry);