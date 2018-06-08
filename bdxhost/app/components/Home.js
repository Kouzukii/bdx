// @flow
import React, {Component} from 'react';
import Paper from "@material-ui/core/es/Paper";
import Typography from "@material-ui/core/es/Typography";
import {withStyles} from "@material-ui/core/es/styles";
import qs from "querystring";
import ExplorerTable from "../containers/ExplorerTable";
import ResourceView from "../containers/ResourceView";
import {combine} from "../utils/PathUtils";

type Props = {
  classes: any,
  location: any
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
    margin: '10px'
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
    const {
      classes,
      location
    } = this.props;

    return (
      <div>
        <div className={classes.container} data-tid="container">
          <ResourceView path={location.search ? combine(location.pathname, qs.parse(location.search.slice(1)).file) : undefined} />
          <Paper className={classes.paper}>
            <Typography className={classes.heading} variant="headline">Home</Typography>
            <ExplorerTable path={location.pathname} />
          </Paper>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Home);