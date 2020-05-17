<template>
    <Loading v-if="$apollo.loading"></Loading>
    <Error v-else-if="error" :error="error"></Error>
    <CharacterOverview :killmails="killmails" :information="information" :mvk="mvk" v-else />
</template>

<script>
import { CHARACTEROVERVIEW } from "@/util/queries";
import Loading from "@/views/util/Loading";
import Error from "@/views/util/Error";

import CharacterOverview from "@/views/CharacterOverview/CharacterOverview";

export default {
    name: "CharacterController",
    components: {
        CharacterOverview,
        Loading,
        Error
    },
    data() {
        return {
            characterID: this.$route.params.id,
            killmails: [],
            information: {},
            mvk: [],
            error: ""
        };
    },
    apollo: {
        killmails: {
            query: CHARACTEROVERVIEW,
            variables() {
                return {
                    type: "character",
                    id: this.characterID,
                    age: 7,
                    limit: 7,
                    page: 1
                };
            },
            result(result, key) {
                this.killmails = result.data.killmails;
                this.information = result.data.information;
                this.mvk = result.data.mvk;
            },
            error(error) {
                this.error = JSON.stringify(error.message);
            }
        }
    }
};
</script>