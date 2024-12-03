/**
 * 走菜单，走权限控制
 * @type {[null,null]}
 */

export const asyncRouterMap = [];

/**
 * 基础路由
 * @type { *[] }
 */
export var constantRouterMap = [
    {
        path: "/",
        redirect: "/demo1",
    },
    {
        path: "/demo1",
        name: "demo1",
        component: () => import("@/views/demo1"),
    },
];
