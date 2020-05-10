
<template>
    <Loading />
</template>

<script>
import queryString from "query-string";
import { mapActions, mapGetters } from "vuex";
import router from "../router";

import Loading from "@/views/util/Loading.vue";

export default {
    name: "AuthCallback",
    async created() {
        const parsed = queryString.parse(location.search);
        await this.token(parsed);
        router.push("/");
    },
    methods: { ...mapActions(["token"]) },
    components: {
        Loading
    }
};
</script>

