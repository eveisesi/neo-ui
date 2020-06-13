<template>
    <Loading v-if="$apollo.loading"></Loading>
    <Error v-else-if="error" :error="error"></Error>
    <ShipGroupOverview
        :killmails="killmails"
        :information="information"
        :mv="mv"
        :page="page"
        v-else
    />
</template>


<script>
import { KILLMAILS, GROUP_INFORMATION, MOST_VALUABLE } from "@/util/queries";
import Loading from "@/views/util/Loading";
import Error from "@/views/util/Error";

import ShipGroupOverview from "@/views/ShipGroupOverview";

export default {
    name: "ShipGroupController",
    components: {
        ShipGroupOverview,
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
                    entity: "shipGroup",
                    id: this.id,
                    page: this.page
                };
            },
            result(result, key) {
                this.killmails = result.data.killmails;
            },
            result(result, key) {
                this.error = JSON.stringify(result.message);
            }
        },
        information: {
            query: GROUP_INFORMATION,
            variables() {
                return {
                    id: this.id
                };
            },
            result(result, key) {
                this.information = result.data.information;
            },
            error(result, key) {
                this.error = JSON.stringify(result.message);
            }
        },
        mv: {
            query: MOST_VALUABLE,
            variables() {
                return {
                    category: "kill",
                    type: "shipGroup",
                    id: this.id,
                    age: 7,
                    limit: 6
                };
            },
            result(result, key) {
                this.mv = result.data.mv;
            },
            error(result, key) {
                this.error = JSON.stringify(result.message);
            }
        }
    }
};
</script>