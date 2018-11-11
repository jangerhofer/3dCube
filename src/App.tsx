import React, { Component } from "react";
import * as THREE from "three";
import { times } from "lodash";

export default class ThreeSceneComponent extends Component {
  private mount: HTMLDivElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private light: THREE.Light;
  private cube: THREE.Mesh;
  private frameId: number;

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    //ADD SCENE
    this.scene = new THREE.Scene();
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(100, width / height);
    this.camera.position.z = 5;
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#000000");
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    const group = new THREE.Group();

    const singleLED = this.createLED();

    const dim = 3;
    times(dim, z => {
      times(dim, x => {
        times(dim, y => {
          const newLED = singleLED.clone();
          newLED.position.set(x * 1, y * 1, z * 1);
          group.add(newLED);
        });
      });
    });

    this.scene.add(group);

    this.start();
  }

  createLED() {
    // Test sphere
    var sphere = new THREE.SphereBufferGeometry(0.2, 50, 50);
    var bulbLight = new THREE.PointLight(0xffee88, 1, 100, 2);
    var bulbMat = new THREE.MeshStandardMaterial({
      emissive: "rgb(255,50,0)",
      emissiveIntensity: 1,
      color: "rgb(255,0,0)"
    });
    bulbLight.add(new THREE.Mesh(sphere, bulbMat));
    // bulbLight.position.set(0,0,0);
    bulbLight.castShadow = true;
    return bulbLight;
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  animate = () => {
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.02;
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };
  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };
  render() {
    return (
      <div
        style={{ width: "850px", height: "1000px" }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}
