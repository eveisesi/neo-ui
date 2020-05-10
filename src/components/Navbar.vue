<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-container>
            <b-navbar-brand href="/">New Eden Obituary</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-nav-dropdown right>
                    <template v-slot:button-content>
                        <img :src="imageUrl" />
                    </template>
                    <div v-if="this.isLoggedIn">
                        <b-dropdown-item>My Killboard</b-dropdown-item>
                        <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                    </div>
                    <div v-else>
                        <b-dropdown-item href="/login">Login</b-dropdown-item>
                    </div>
                </b-nav-dropdown>
            </b-navbar-nav>
        </b-container>
    </b-navbar>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import jwt_decode from "jwt-decode";

export default {
    name: "Navbar",
    computed: {
        imageUrl() {
            return `https://images.evetech.net/Character/${this.getCharacterIDFromUser}_32.jpg`;
        },
        isLoggedIn() {
            return this.getToken() != "";
        },
        getCharacterIDFromUser() {
            const token = this.getToken();
            if (token == "") {
                return 1;
            }
            const decoded = jwt_decode(token);
            return parseInt(decoded.sub.split(":")[2]);
        }
    },
    methods: {
        ...mapGetters(["getToken", "getUser"]),
        ...mapActions(["logout"]),
        ...mapState(["user"])
    },
    watch: {
        characterID(newV, oldV) {
            console.log("newV", newV, "oldV", oldV);
        }
    }
};
</script>

<style>
</style>