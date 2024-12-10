<template>
  <div id="container"></div>
</template>
<script>
import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

/**
 * 1.加载 glb 文件
 * 2.加载压缩过的模型
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


      let mixer;

      const clock = new THREE.Clock();
      const container = document.getElementById("container");

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      const pmremGenerator = new THREE.PMREMGenerator(renderer);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xbfe3dd);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(renderer), 0.04).texture;

      const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
      camera.position.set(5, 2, 8);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enabled = true;
      controls.target.set(0, 0, 0);
      controls.update();
      controls.enablePan = false;
      controls.enableDamping = true;

      // 实例化加载器draco
      const dracoLoader = new DRACOLoader();
      // 设置draco路径
      dracoLoader.setDecoderPath("draco/");

      const loader = new GLTFLoader();
      // 设置gltf加载器draco解码器
      loader.setDRACOLoader(dracoLoader);
      loader.load("models/test1.glb", function(gltf) {

        console.log(gltf, "-");
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(0.5, 0.5, 0.5);
        scene.add(model);

        mixer = new THREE.AnimationMixer(model);
        // mixer.clipAction(gltf.animations[0]).play();

        renderer.setAnimationLoop(animate);

      }, undefined, function(e) {

        console.error(e);

      });


      window.onresize = function() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

      };


      function animate() {

        const delta = clock.getDelta();

        mixer.update(delta);

        controls.update();

        renderer.render(scene, camera);

      }

    },
  },
};
</script>

<style lang="less" scoped>
</style>
