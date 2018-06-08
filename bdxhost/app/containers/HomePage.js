// @flow
import { connect } from 'react-redux';
import Home from '../components/Home';
import type { rootStateType } from '../reducers';

function mapStateToProps(state: rootStateType) {
  return {
    loc: state.router.location
  };
}

export default connect(mapStateToProps)(Home);
