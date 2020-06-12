<template>
    <Loading v-if="$apollo.loading"></Loading>
    <Error v-else-if="error" :error="error"></Error>
    <AllianceOverview
        :killmails="killmails"
        :information="information"
        :mv="mv"
        :page="page"
        v-else
    />
</template>


<script>
import { KILLMAILS, ALLIANCE_INFORMATION, MOST_VALUABLE } from "@/util/queries";
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
            mv: [],
            error: ""
        };
    },
    apollo: {
        killmails: {
            query: KILLMAILS,
            variables() {
                return {
                    entity: "alliance",
                    id: this.id,
                    page: this.page
                };
            },
            result(result, key) {
                this.killmails = result.data.killmails;
            },
            error(error) {
                this.error = JSON.stringify(error.message);
            }
        },
        information: {
            query: ALLIANCE_INFORMATION,
            variables() {
                return {
                    id: this.id
                };
            },
            result(result, key) {
                this.information = result.data.information;
            },
            error(result, key) {
                this.error = JSON.stringify(error.message);
            }
        },
        mv: {
            query: MOST_VALUABLE,
            variables() {
                return {
                    category: "kill",
                    entity: "alliance",
                    id: this.id,
                    age: 7,
                    limit: 6
                };
            },
            result(result, key) {
                this.mv = result.data.mv;
            },
            error(result, key) {
                this.error = JSON.stringify(error.message);
            }
        }
    },
    created() {
        console.log(KILLMAILS);
    }
};
</script>