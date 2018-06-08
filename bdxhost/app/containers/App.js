// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import LoadingOverlay from '../components/LoadingOverlay';

type Props = {
  children: any,
  ready: boolean
};

class App extends React.Component<Props> {
  props: Props;

  render() {
    if (!this.props.ready) {
      return <LoadingOverlay />;
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
