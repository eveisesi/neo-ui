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
                        <b-tr>
                            <b-td
                                rowspan="4"
                                width="130"
                            >
                                <b-img
                                    :src="EVEONLINE_IMAGE+'types/'+information.id+'/render?size=128'"
                                    rounded
                                    fluid
                                    height="128"
                                    width="128"
                                />
                            </b-td>
                            <b-td>Ship</b-td>
                            <b-td>
                                {{information.name}}
                                <span v-if="information.group">
                                    (
                                    <router-link :to="{name:'shipGroups', params:{id: information.group.id}}">{{information.group.name}}</router-link>)
                                </span>
                            </b-td>
                        </b-tr>
                        <b-tr>
                            <b-td v-if="information.group"></b-td>
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
                    scope="character"
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
import { KILLMAILS, TYPE_INFORMATION, MOST_VALUABLE } from "@/util/queries";
import Loading from "@/views/util/Loading";
import Error from "@/views/util/Error";

import { EVEONLINE_IMAGE } from "../util/const/urls";
import numeral from "numeral";

import KillTable from "@/views/KillTable";
import KillmailHighlight from "@/views/KillmailHighlight";

export default {
    name: "ShipController",
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
                name: "ships",
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