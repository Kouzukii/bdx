// @flow
import * as React from 'react';
import {connect} from 'react-redux';
import CircularProgress from "@material-ui/core/es/CircularProgress";

type Props = {
  children: any,
  ready: boolean
};

class App extends React.Component<Props> {
  props: Props;

  render() {
    if (!this.props.ready) {
      return (
        <div style={{display:'flex',margin:'auto'}}>
          <CircularProgress size={60} />
        </div>
      )
    }

    return <div>{this.props.children}</div>;
  }
}

function mapStateToProps(state) {
  return {
    ready: state.native.ready
  };
}

export default connect(mapStateToProps)(App);