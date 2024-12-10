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
        redirect: "/test",
    },
    {
        path: "/test",
        name: "test",
        component: () => import("@/views/demo5"),
    },
];
