// @flow
import * as THREE from "three";
import {ResizeSensor} from "css-element-queries";
import OrbitControls from "./OrbitControls";
import DDSLoader from "./DDSLoader";

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: OrbitControls;
let clock: THREE.Clock;
let loader: DDSLoader;
let meshes: Array<THREE.Mesh> = [];

export function setMeshes(value: Array<THREE.Mesh>) {
  scene.remove(...meshes);
  meshes = value;
  if (meshes.length) {
    scene.add(...meshes);
  }
}

export function resetCamera() {
  camera.position.set(0, 150, -200);
  camera.setRotationFromEuler(new THREE.Euler(0, 180, 0));
  controls.update();
}

const renderFrame = () => {
  requestAnimationFrame(renderFrame);
  const delta = clock.getDelta();
  meshes.forEach(mesh => mesh.rotateY(0.5 * delta));
  renderer.render(scene, camera);
  controls.update();
};

function prepareScene() {
  scene = new THREE.Scene();

  const lights = [
    new THREE.PointLight(0xffffff, 1, 1000),
    new THREE.PointLight(0xffffff, 1, 1000),
    new THREE.PointLight(0xffffff, 1, 1000)
  ];

  lights[0].position.set(0, 400, 0);
  lights[1].position.set(200, 400, 200);
  lights[2].position.set(-200, -200, -200);

  lights.push(new THREE.PointLightHelper(lights[0], 1), new THREE.PointLightHelper(lights[1], 1), new THREE.PointLightHelper(lights[2], 1));
  lights.push(new THREE.AmbientLight(0x3A3A3A));

  scene.add(...lights);
}

export function load(path: string) {
  const texture = loader.load(path);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function init(canvas: HTMLCanvasElement) {
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  clock = new THREE.Clock();
  camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 1, 10000);
  controls = new OrbitControls(camera, canvas);
  controls.target = new THREE.Vector3(0, 120, 0);
  loader = new DDSLoader();
  prepareScene();
  resetCamera();
  renderFrame();

  /* eslint-disable no-new */
  new ResizeSensor(canvas.parentElement, () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  });
}