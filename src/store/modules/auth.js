import jwt_decode from "jwt-decode";
import axios from "axios";
import store from "..";

const state = {
    token: "",
    user: null
};

if (localStorage.getItem("neo-token") != null) {
    const token = localStorage.getItem("neo-token");
    const user = jwt_decode(token);
    user.id = user.sub.split(":")[2];

    state.user = user;
    state.token = token;
}

const getters = {
    getToken(state) {
        return state.token;
    },
    getUser(state) {
        return state.user;
    }
};

const API_URL = "http://192.168.1.242:42000";

const actions = {
    generate: async ({}, scopes = []) => {
        let response = await axios.get(`${API_URL}/auth/state`, {
            params: scopes.length > 0 ? { scopes: scopes.join(" ") } : {}
        });
        return response.data.url;
    },
    token: async ({ commit }, params = {}) => {
        let response = await axios.post(`${API_URL}/auth/token`, null, {
            params: params
        });

        if (response.status != 204) {
            return;
        }
        const token = response.headers["x-neo-token"];
        let decoded = jwt_decode(token);
        decoded.id = decoded.sub.split(":")[2];
        localStorage.setItem("neo-token", token);
        commit("storeToken", token);
        console.log("Logging Decoded from Token action", decoded);
        commit("storeUser", decoded);
    },
    logout: ({ commit }) => {
        commit("storeToken", "");
        commit("storeUser", null);
        localStorage.removeItem("neo-token");
    }
};

const mutations = {
    storeToken(state, payload) {
        state.token = payload;
    },
    storeUser(state, payload) {
        state.user = payload;
    }
};

export default { state, getters, actions, mutations };
