// @flow
import React, {Component} from 'react';
import Paper from "@material-ui/core/es/Paper";
import Typography from "@material-ui/core/es/Typography";
import {withStyles} from "@material-ui/core/es/styles";
import type { WithStyles } from "@material-ui/core/es/styles";
import ExplorerTable from "../containers/ExplorerTable";

type Props = WithStyles<>;

const styles = {
  container: {
    display: 'flex',
    width: '100%'
  },
  heading: {
    margin: '10px'
  },
  paper: {
    width: '100%'
  }
};

class Home extends Component<Props> {
  props: Props;

  render() {
    const {
      classes
    } = this.props;

    return (
      <div>
        <div className={classes.container} data-tid="container">
          <Paper className={classes.paper}>
            <Typography className={classes.heading} variant="headline">Home</Typography>
            <ExplorerTable />
          </Paper>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Home);