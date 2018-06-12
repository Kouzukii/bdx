// @flow
import * as THREE from 'three';
import * as Renderer from './Renderer';

type types = 'map' | 'normalMap' | 'specularMap';

type mapPaths = {
  map: ?string,
  normalMap: ?string,
  specularMap: ?string
};

export default class MaterialManager {
  _material: THREE.MeshPhongMaterial;
  maps: mapPaths;
  upscaleImage: (string, string) => void;

  constructor(maps: mapPaths, upscaleImage: (string, string) => void) {
    this.maps = maps;
    this.upscaleImage = upscaleImage;
  }

  verifyTexture(type: types, texture: THREE.Texture) {
    if (
      THREE.Math.isPowerOfTwo(texture.image.width) &&
      THREE.Math.isPowerOfTwo(texture.image.height)
    ) {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    } else if (texture.image.width && texture.image.height && this.maps[type]) {
      this.upscaleImage(type, this.maps[type]);
    }
  }

  updateImage(type: types, newPath: string) {
    this._material[type] = Renderer.load(newPath, t =>
      this.verifyTexture(type, t)
    );
    this._material.needsUpdate = true;
  }

  handleDiffuse = (texture: THREE.Texture) => {
    this.verifyTexture('map', texture);
  };

  handleNormal = (texture: THREE.Texture) => {
    this.verifyTexture('normalMap', texture);
  };

  handleSpecular = (texture: THREE.Texture) => {
    this.verifyTexture('specularMap', texture);
  };

  handleDiffuseFail = () => {
    // TODO
  };

  handleNormalFail = () => {
    // TODO
  };

  handleSpecularFail = () => {
    // TODO
  };

  get material() {
    if (this._material) return this._material;
    this._material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      vertexColors: THREE.NoColors,
      map:
        this.maps.map &&
        Renderer.load(
          this.maps.map,
          this.handleDiffuse,
          undefined,
          this.handleDiffuseFail
        ),
      normalMap:
        this.maps.normalMap &&
        Renderer.load(
          this.maps.normalMap,
          this.handleNormal,
          undefined,
          this.handleNormalFail
        ),
      specularMap:
        this.maps.specularMap &&
        Renderer.load(
          this.maps.specularMap,
          this.handleSpecular,
          undefined,
          this.handleSpecularFail
        ),
      transparent: true,
      alphaTest: 0.05
    });
    return this._material;
  }
}
