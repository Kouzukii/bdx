// @flow
import * as React from 'react';
import * as THREE from 'three';
import { readFile } from 'fs';
import * as Renderer from '../utils/Renderer';

type Props = {
  path: ?string,
  loadedPath: ?string,
  fileType: ?string,
  errorWhileOpeningFile: Error => void,
  loadFile: (?string, boolean) => void,
  loading: boolean,
  errorLoading: boolean
};

export default class ResourceView extends React.Component<Props> {
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

            const mat = new THREE.MeshPhongMaterial({
              side: THREE.DoubleSide,
              vertexColors: THREE.NoColors,
              map: mesh.texturePath && Renderer.load(mesh.texturePath),
              normalMap:
                mesh.normTexturePath && Renderer.load(mesh.normTexturePath),
              specularMap:
                mesh.specTexturePath && Renderer.load(mesh.specTexturePath),
              transparent: true,
              alphaTest: 0.05
            });

            return new THREE.Mesh(geom, mat);
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
    const { path, loadedPath } = this.props;

    if (nextProps.path && path !== nextProps.path) {
      nextProps.loadFile(nextProps.path, true);
    }
    if (loadedPath !== nextProps.loadedPath) {
      this.updateMesh(nextProps.loadedPath);
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
