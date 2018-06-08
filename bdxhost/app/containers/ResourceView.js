import { connect } from 'react-redux';
import ResourceView from '../components/ResourceView';
import { errorWhileOpeningFile, loadFile } from '../actions/preview';
import type { rootStateType } from '../reducers';

function mapStateToProps(state: rootStateType) {
  return {
    loadedPath: state.preview.path,
    fileType: state.preview.fileType,
    errorLoading: state.preview.error,
    loading: state.preview.loading
  };
}

const mapDispatchToProps = {
  errorWhileOpeningFile,
  loadFile
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourceView);
