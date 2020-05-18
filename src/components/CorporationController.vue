<template>
    <Loading v-if="$apollo.loading"></Loading>
    <Error v-else-if="error" :error="error"></Error>
    <CorporationOverview
        :killmails="killmails"
        :information="information"
        :mvk="mvk"
        :page="page"
        v-else
    />
</template>

<script>
import { CORPORATIONOVERVIEW } from "@/util/queries";
import Loading from "@/views/util/Loading";
import Error from "@/views/util/Error";

import CorporationOverview from "@/views/CorporationOverview";

export default {
    name: "CorporationController",
    components: {
        CorporationOverview,
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
            query: CORPORATIONOVERVIEW,
            variables() {
                return {
                    type: "corporation",
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
