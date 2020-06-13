<template>
    <Loading v-if="$apollo.loading"></Loading>
    <Error v-else-if="error" :error="error"></Error>
    <ShipOverview :killmails="killmails" :information="information" :mv="mv" :page="page" v-else />
</template>


<script>
import { KILLMAILS, TYPE_INFORMATION, MOST_VALUABLE } from "@/util/queries";
import Loading from "@/views/util/Loading";
import Error from "@/views/util/Error";

import ShipOverview from "@/views/ShipOverview";

export default {
    name: "ShipController",
    components: {
        ShipOverview,
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
                    entity: "ship",
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
            query: TYPE_INFORMATION,
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
                    type: "ship",
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