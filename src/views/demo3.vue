<template>
  <div id="container"></div>

</template>
<script>
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/**
 * 1.创建几何体
 * 2.通过索引顶点共用
 * 3.添加组，按组设置材质
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

      const axesHelper = new THREE.AxesHelper(5);
      axesHelper.position.set(0, 0, 0);
      scene.add(axesHelper);


      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

      const renderer = new THREE.WebGLRenderer();

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      container.appendChild(renderer.domElement);

      const geometry = new THREE.BufferGeometry();

      // 逆时针为正面
      const vertices = new Float32Array([
        -1, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0.0,
      ]);

      geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

      const indices = new Uint16Array([0, 1, 2, 2, 3, 0, 3, 0, 1]);
      // 设置索引
      geometry.setIndex(new THREE.BufferAttribute(indices, 1));

      geometry.addGroup(0,3,0)
      geometry.addGroup(3,3,1)

      const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide, wireframe: false });
      const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide, wireframe: false });

      const cube = new THREE.Mesh(geometry, [material, material1]);

      scene.add(cube);

      camera.position.set(5, 5, 5);

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
