import { connect } from 'react-redux';
import ResourceView from '../components/ResourceView';
import {
  errorWhileOpeningFile,
  loadFile,
  upscaleImage
} from '../actions/preview';
import type { rootStateType } from '../reducers';

function mapStateToProps(state: rootStateType) {
  return {
    loadedPath: state.preview.path,
    fileType: state.preview.fileType,
    errorLoading: state.preview.error,
    loading: state.preview.loading,
    map: state.preview.map,
    normalMap: state.preview.normalMap,
    specularMap: state.preview.specularMap
  };
}

const mapDispatchToProps = {
  errorWhileOpeningFile,
  loadFile,
  upscaleImage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResourceView);
