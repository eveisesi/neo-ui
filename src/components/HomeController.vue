<template>
    <div>
        <Loading v-if="$apollo.loading"></Loading>
        <Error v-else-if="$apollo.error"></Error>
        <HomeView :killmails="killmails" :mvk="mvk" v-else></HomeView>
    </div>
</template>

<script>
import HomeView from "@/views/HomeView";
import Loading from "@/views/util/Loading";
import Error from "@/views/util/Error";
import { RECENT_KILLMAILS, MostValuableKills } from "@/util/queries";

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
        mvk: {
            query: MostValuableKills,
            variables() {
                return {
                    type: "all",
                    limit: 7,
                    age: 7
                };
            }
        }
    },
    created() {
        console.log(this.$apollo);
    }
};
</script>
