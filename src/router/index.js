import Vue from "vue";
import VueRouter from "vue-router";
import HomeController from "../components/HomeController";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeController,
    },
    {
        path: "/login",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../components/Login.vue"),
    },
    {
        path: "/auth/callback",
        name: "AuthCallback",
        component: () => import("../components/AuthCallback.vue"),
    },
    {
        path: "/kill/:id/:hash",
        name: "kill",
        component: () => import("@/components/KillmailController.vue"),
    },
    {
        path: "/characters/:characterID",
        name: "characters",
        component: () => import("@/components/CharacterController.vue"),
    },
    {
        path: "/corporations/:corporationID",
        name: "corporations",
        component: () => import("@/components/CorporationController.vue"),
    },
    {
        path: "/alliances/:allianceID",
        name: "alliances",
        component: () => import("@/components/AllianceController.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
