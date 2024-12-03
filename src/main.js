import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
// reset css
import "@/styles/normalize.css";
import "@/styles/common.less";
import "@/styles/transition.less";


// permission
import "@/router/permission.js";

//svg-icon
import "@/icons";

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
