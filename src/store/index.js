import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth
    }
});

if (module.hot) {
    // accept actions and mutations as hot modules
    module.hot.accept(["./modules/auth"], () => {
        // require the updated modules
        // have to add .default here due to babel 6 module output

        store.hotUpdate({
            modules: {
                auth: require("./modules/auth").default // swap in the new modules and mutations
            }
        });
    });
}

export default store;
