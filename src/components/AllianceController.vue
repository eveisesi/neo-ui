<template>
    <Loading v-if="$apollo.loading"></Loading>
    <Error
        v-else-if="error"
        :error="error"
    ></Error>
    <b-container v-else>
        <b-row>
            <b-col md="6">
                <b-table-simple>
                    <b-tbody>
                        <tr>
                            <td
                                rowspan="3"
                                width="130"
                            >
                                <b-img
                                    :src="EVEONLINE_IMAGE+'alliances/'+information.id+'/logo?size=128'"
                                    rounded
                                    fluid
                                    height="128"
                                    width="128"
                                />
                            </td>
                            <b-td>Alliance</b-td>
                            <b-td>
                                {{information.name}} [{{information.ticker}}]
                            </b-td>
                        </tr>
                        <b-tr>
                            <b-td>Member Count</b-td>
                            <b-td>{{humanize(information.memberCount)}}</b-td>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="12">
                <h4 class="text-center">Most Valuable Kills - Last 7 Days</h4>
                <hr style="background-color: white" />
                <KillmailHighlight :mv="mv" />
            </b-col>
        </b-row>
        <b-row></b-row>
        <b-row>
            <b-col sm="12">
                <div class="float-right mt-2">
                    <b-pagination
                        v-model="compPage"
                        total-rows="500"
                        per-page="50"
                        @change="handlePagination"
                        hide-ellipsis
                    ></b-pagination>
                </div>
                <h3>Recent Activity</h3>
                <hr style="background-color: white" />
                <KillTable
                    :killmails="killmails"
                    scope="alliance"
                    :target="information.id"
                />
                <b-pagination
                    v-model="compPage"
                    total-rows="500"
                    per-page="50"
                    @change="handlePagination"
                    hide-ellipsis
                    align="center"
                ></b-pagination>
            </b-col>
        </b-row>
    </b-container>
</template>


<script>
import { KILLMAILS, ALLIANCE_INFORMATION, MOST_VALUABLE } from "@/util/queries";
import Loading from "@/views/util/Loading";
import Error from "@/views/util/Error";

import { EVEONLINE_IMAGE } from "../util/const/urls";
import numeral from "numeral";

import KillTable from "@/views/KillTable";
import KillmailHighlight from "@/views/KillmailHighlight";

export default {
    name: "AllianceController",
    components: {
        Loading,
        Error,
        KillTable,
        KillmailHighlight
    },
    props: ["id", "page"],
    data() {
        return {
            EVEONLINE_IMAGE: EVEONLINE_IMAGE,
            killmails: [],
            information: {},
            mv: [],
            error: ""
        };
    },
    computed: {
        compPage: {
            get: function() {
                return this.$router.currentRoute.query &&
                    this.$router.currentRoute.query.page
                    ? this.$router.currentRoute.query.page
                    : 1;
            },
            set: function(newValue) {
                this.page = newValue;
            }
        }
    },
    methods: {
        handlePagination(page) {
            this.$router.push({
                name: "alliances",
                params: { id: this.information.id },
                query: { page: page }
            });
        },
        humanize(total) {
            return numeral(total).format("0,0");
        }
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
            result(result, key) {
                this.error = JSON.stringify(result.message);
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
                this.error = JSON.stringify(result.message);
            }
        },
        mv: {
            query: MOST_VALUABLE,
            variables() {
                return {
                    category: "kill",
                    type: "alliance",
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