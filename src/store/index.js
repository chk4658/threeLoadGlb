import Vue from "vue";
import Vuex from "vuex";

//getters
import getters from "./getters";

// modules
import app from "./modules/app";
import user from "./modules/user";
import permission from "./modules/permission";

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [],
    state: {},
    getters: {
        ...getters,
    },
    mutations: {},
    actions: {},
    modules: {
        app,
        user,
        permission,
    },
});
