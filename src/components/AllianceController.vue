<template>
    <Loading v-if="$apollo.loading"></Loading>
    <Error v-else-if="error" :error="error"></Error>
    <AllianceOverview
        :killmails="killmails"
        :information="information"
        :mvk="mvk"
        :page="page"
        v-else
    />
</template>


<script>
import { ALLIANCEOVERVIEW } from "@/util/queries";
import Loading from "@/views/util/Loading";
import Error from "@/views/util/Error";

import AllianceOverview from "@/views/AllianceOverview";

export default {
    name: "AllianceController",
    components: {
        AllianceOverview,
        Loading,
        Error
    },
    props: ["id", "page"],
    data() {
        return {
            killmails: [],
            information: {},
            mvk: [],
            error: ""
        };
    },
    apollo: {
        killmails: {
            query: ALLIANCEOVERVIEW,
            variables() {
                return {
                    type: "alliance",
                    id: this.id,
                    age: 7,
                    limit: 7,
                    page: this.page
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