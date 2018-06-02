import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ExplorerActions from '../actions/explorer';
import ExplorerTable from "../components/ExplorerTable";

function mapStateToProps(state) {
  return {
    path: state.explorer.path,
    entries: state.explorer.entries
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ExplorerActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerTable);
