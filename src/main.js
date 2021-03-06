import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/dist/cyborg/bootstrap.min.css";
import Vue from "vue";
import VueApollo from "vue-apollo";
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from "./App.vue";
import router from "./router";
import store from "./store";
import { API_URL } from "./util/const/urls";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";

// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: `${API_URL}/query`,
    // useGETForQueries: true,
});



// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
});

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
});

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueApollo);
Vue.use(VueAxios, axios)

new Vue({
    router,
    store,
    apolloProvider,
    render: (h) => h(App),
}).$mount("#app");
