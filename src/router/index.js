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
        props: (router) => {
            return {
                id: router.params.id,
                hash: router.params.hash,
            };
        },
    },
    {
        path: "/characters/:id",
        name: "characters",
        component: () => import("@/components/CharacterController.vue"),
        props: (router) => {
            return {
                id: router.params.id,
                page: router.query.page ? router.query.page : 1,
            };
        },
    },
    {
        path: "/corporations/:id",
        name: "corporations",
        component: () => import("@/components/CorporationController.vue"),
        props: (router) => {
            return {
                id: router.params.id,
                page: router.query.page ? router.query.page : 1,
            };
        },
    },
    {
        path: "/alliances/:id",
        name: "alliances",
        component: () => import("@/components/AllianceController.vue"),
        props: (router) => {
            return {
                id: router.params.id,
                page: router.query.page ? router.query.page : 1,
            };
        },
    },
    {
        path: "/ships/:id",
        name: "ships",
        component: () => import("@/components/ShipController.vue"),
        props: (router) => {
            return {
                id: router.params.id,
                page: router.query.page ? router.query.page : 1,
            };
        },
    },
    {
        path: "/shipGroups/:id",
        name: "shipGroups",
        component: () => import("@/components/ShipGroupController.vue"),
        props: (router) => {
            return {
                id: router.params.id,
                page: router.query.page ? router.query.page : 1,
            };
        },
    },
    {
        path: "/systems/:id",
        name: "systems",
        component: () => import("@/components/SystemController.vue"),
        props: (router) => {
            return {
                id: router.params.id,
                page: router.query.page ? router.query.page : 1,
            };
        },
    },
    {
        path: "/constellations/:id",
        name: "constellations",
        component: () => import("@/components/ConstellationController.vue"),
        props: (router) => {
            return {
                id: router.params.id,
                page: router.query.page ? router.query.page : 1,
            };
        },
    },
    {
        path: "/regions/:id",
        name: "regions",
        component: () => import("@/components/RegionController.vue"),
        props: (router) => {
            return {
                id: router.params.id,
                page: router.query.page ? router.query.page : 1,
            };
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
