<template>
  <div id="container"></div>

</template>
<script>
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/**
 * 1.光线投射实现3D场景交互事件
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

      scene.background = new THREE.Color(0xcccccc);

      const axesHelper = new THREE.AxesHelper(5);
      axesHelper.position.set(0, 0, 0);
      scene.add(axesHelper);


      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

      const renderer = new THREE.WebGLRenderer();

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      container.appendChild(renderer.domElement);


      const sphere1 = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x00FF00 }),
      );
      sphere1.position.x = -2;
      scene.add(sphere1);

      const sphere2 = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x0000FF }),
      );
      scene.add(sphere2);

      const sphere3 = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xFF00FF }),
      );
      sphere3.position.x = 2;
      scene.add(sphere3);

      // 创建射线
      const raycaster = new THREE.Raycaster();
      // 创建鼠标向量
      const mouse = new THREE.Vector2();

      window.addEventListener("click", (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // 通过摄像机和鼠标位置更新射线
        raycaster.setFromCamera(mouse, camera);

        // 计算射线与物体的焦点
        const intersects = raycaster.intersectObjects([sphere1, sphere2, sphere3]);
        console.log(intersects);

        if (intersects.length > 0) {
          intersects[0].object.material.color.set(0xff0000);
        }
      });


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
