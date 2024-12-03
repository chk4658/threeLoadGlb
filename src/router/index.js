import Vue from "vue";
import VueRouter from "vue-router";
import { constantRouterMap } from "./router.config";

Vue.use(VueRouter);

// 解决路由跳转异常问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

const routes = constantRouterMap;
const router = new VueRouter({
  mode: "history",
  base: '',
  routes,
});

export default router;
