<template>
  <div id="container"></div>
</template>
<script>
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
// GUI 使用
/**
 * 1.AxesHelper坐标系
 * 2.GUI 使用
 */
export default {
  computed: {},
  data() {
    return {};
  },
  watch: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {

      const container = document.getElementById("container");

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);

      const renderer = new THREE.WebGLRenderer();

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      container.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry(1, 1, 1);

      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

      const cube = new THREE.Mesh(geometry, material);

      scene.add(cube);

      camera.position.set(2, 3, 5);

      camera.lookAt(0, 0, 0);

      const axesHelper = new THREE.AxesHelper(5);

      scene.add(axesHelper);

      const controls = new OrbitControls(camera, renderer.domElement);

      function animate() {

        controls.update();

        requestAnimationFrame(animate);

        renderer.render(scene, camera);

      }

      animate();

      window.onresize = function() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

      };


      let eventObj = {
        Fullscreen: function() {
          document.body.requestFullscreen();
        },
      };

      const gui = new GUI();
      gui.add(eventObj, "Fullscreen").name("全屏");

      const folder = gui.addFolder("cube - position");
      folder.add(cube.position, "x", -5, 5).name("position - x");
      folder.add(cube.position, "y", -5, 5).name("position - y");
      folder.add(cube.position, "z", -5, 5).name("position - z").onFinishChange((v) => {
        console.log(v, "onFinishChange");
      }).onChange((v) => {
        console.log(v, "onChange");
      });

      gui.add(material, "wireframe").name("线框模式");


      const colorParams = {
        cubeColor: "#ff0000",
      };

      gui.addColor(colorParams, "cubeColor").name("color").onChange((v) => {
        cube.material.color.set(v);
      });

    },
  },
};
</script>

<style lang="less" scoped>
</style>
