// @flow
import * as React from 'react';
import * as THREE from 'three';
import { readFile } from 'fs';
import * as Renderer from '../utils/Renderer';
import MaterialManager from '../utils/MaterialManager';

type Props = {
  path: ?string,
  loadedPath: ?string,
  fileType: ?string,
  errorWhileOpeningFile: Error => void,
  loadFile: (?string, boolean) => void,
  upscaleImage: (string, string) => void,
  loading: boolean,
  errorLoading: boolean,
  map?: string,
  normalMap?: string,
  specularMap?: string
};

type State = {
  manager: MaterialManager
};

export default class ResourceView extends React.Component<Props, State> {
  canvas = React.createRef();

  componentDidMount() {
    if (!this.canvas.current) throw new Error('canvas not initialized');
    Renderer.init(this.canvas.current);

    if (this.props.path) {
      this.props.loadFile(this.props.path, true);
    }
    this.updateMesh(this.props.loadedPath);
  }

  updateMesh(path: ?string) {
    if (path) {
      readFile(path, (err, data) => {
        if (err) {
          this.props.errorWhileOpeningFile(err);
          return;
        }
        if (this.props.fileType === 'PAC') {
          const js = JSON.parse(data.toString());

          const meshes = js.meshes.map(mesh => {
            const geom = new THREE.BufferGeometry();

            const vert = mesh.lods[0].positions;
            const normal = mesh.lods[0].normals;
            const faces = mesh.lods[0].faceIndices;
            const uv = mesh.lods[0].uvs;

            geom.setIndex(faces);
            geom.addAttribute(
              'position',
              new THREE.Float32BufferAttribute(vert, 3)
            );
            geom.addAttribute(
              'normal',
              new THREE.Float32BufferAttribute(normal, 3)
            );
            geom.addAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));

            const manager = new MaterialManager(
              {
                map: mesh.texturePath,
                normalMap: mesh.normTexturePath,
                specularMap: mesh.specTexturePath
              },
              this.props.upscaleImage
            );
            this.setState({ manager });
            return new THREE.Mesh(geom, manager.material);
          });
          Renderer.resetCamera();
          Renderer.setMeshes(meshes);
        }
      });
    } else {
      Renderer.setMeshes([]);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { path, loadedPath, map, normalMap, specularMap } = this.props;

    if (nextProps.path && path !== nextProps.path) {
      nextProps.loadFile(nextProps.path, true);
    }
    if (loadedPath !== nextProps.loadedPath) {
      this.updateMesh(nextProps.loadedPath);
    }
    if (nextProps.map && nextProps.map !== map) {
      this.state.manager.updateImage('map', nextProps.map);
    }
    if (nextProps.normalMap && nextProps.normalMap !== normalMap) {
      this.state.manager.updateImage('normalMap', nextProps.normalMap);
    }
    if (nextProps.specularMap && nextProps.specularMap !== specularMap) {
      this.state.manager.updateImage('specularMap', nextProps.specularMap);
    }
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <canvas style={{ width: '100%', height: '100%' }} ref={this.canvas} />
      </div>
    );
  }
}
