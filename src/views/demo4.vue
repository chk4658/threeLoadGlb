<template>
  <div id="container"></div>

</template>
<script>
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/**
 * 1.线性雾和指数雾
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

      // scene.fog = new THREE.Fog( 0xcccccc, 0.1, 50 );
      scene.fog = new THREE.FogExp2( 0xcccccc, 0.1 );

      scene.background = new THREE.Color(0xcccccc)

      const axesHelper = new THREE.AxesHelper(5);
      axesHelper.position.set(0, 0, 0);
      scene.add(axesHelper);


      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

      const renderer = new THREE.WebGLRenderer();

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      container.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry( 1, 1, 50 );
      const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
      const cube = new THREE.Mesh(geometry, material);

      scene.add(cube);

      camera.position.set(10, 10, 10);

      camera.lookAt(0, 0, 0);


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

    },
  },
};
</script>

<style lang="less" scoped>
</style>
