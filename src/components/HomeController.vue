<template>
    <div>
        <Loading v-if="$apollo.loading"></Loading>
        <Error v-else-if="$apollo.error"></Error>
        <HomeView :killmails="killmails" :mv="mv" v-else></HomeView>
    </div>
</template>

<script>
import HomeView from "@/views/HomeView";
import Loading from "@/views/util/Loading";
import Error from "@/views/util/Error";
import { RECENT_KILLMAILS, MOST_VALUABLE } from "../util/queries";

export default {
    name: "HomeController",
    components: {
        HomeView,
        Loading,
        Error
    },
    apollo: {
        killmails: {
            query: RECENT_KILLMAILS
        },
        mv: {
            query: MOST_VALUABLE
        }
    }
};
</script>
