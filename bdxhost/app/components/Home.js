// @flow
import React, { Component } from 'react';
import Paper from '@material-ui/core/es/Paper';
import Typography from '@material-ui/core/es/Typography';
import { withStyles } from '@material-ui/core/es/styles';
import qs from 'querystring';
import path from 'path';
import ExplorerTable from '../containers/ExplorerTable';
import ResourceView from '../containers/ResourceView';
import { combine } from '../utils/PathUtils';

type Props = {
  classes: any,
  loc: any
};

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    position: 'absolute',
    overflow: 'hidden'
  },
  heading: {
    margin: '15px 15px 0 15px'
  },
  paper: {
    position: 'relative',
    width: '900px',
    height: '100%',
    overflow: 'auto',
    margin: 0,
    padding: 0
  }
};

class Home extends Component<Props> {
  props: Props;

  render() {
    const { classes, loc } = this.props;

    return (
      <div>
        <div className={classes.container} data-tid="container">
          <ResourceView
            path={
              loc.search
                ? combine(loc.pathname, qs.parse(loc.search.slice(1)).file)
                : undefined
            }
          />
          <Paper className={classes.paper}>
            <Typography className={classes.heading} variant="headline">
              {path.basename(loc.pathname) || 'Root'}
            </Typography>
            <ExplorerTable path={loc.pathname} />
          </Paper>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Home);
