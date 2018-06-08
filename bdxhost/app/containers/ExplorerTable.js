import {connect} from 'react-redux';
import {loadPath} from '../actions/explorer';
import ExplorerTable from "../components/ExplorerTable";

function mapStateToProps(state) {
  return {
    entries: state.explorer.entries,
    loadedPath: state.explorer.path,
    errorLoading: state.explorer.error,
    loading: state.explorer.loading
  };
}

const mapDispatchToProps = {
    loadPath
};

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerTable);
