<template>
    <div>
        <HomeView :killmails="killmails" v-if="!$apollo.loading"></HomeView>
        <Loading v-else></Loading>
    </div>
</template>

<script>
import HomeView from "@/views/HomeView";
import Loading from "@/views/util/Loading";
import { RECENT_KILLMAILS } from "@/util/queries";

export default {
    name: "HomeController",
    components: {
        HomeView,
        Loading
    },
    apollo: {
        killmails: {
            query: RECENT_KILLMAILS
        }
    }
};
</script>
