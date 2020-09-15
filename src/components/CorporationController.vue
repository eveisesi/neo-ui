<template>
    <b-container>
        <b-row>
            <b-col md="6">
                <ComponentLoading v-if="$apollo.queries.information.loading" />
                <Error v-else-if="$apollo.queries.information.error" />
                <b-table-simple v-else>
                    <b-tbody>
                        <tr>
                            <td
                                rowspan="4"
                                width="130"
                            >
                                <b-img
                                    :src="EVEONLINE_IMAGE+'corporations/'+information.id+'/logo?size=128'"
                                    rounded
                                    fluid
                                    height="128"
                                    width="128"
                                />
                            </td>
                            <b-td>Corporation</b-td>
                            <b-td>{{information.name}}</b-td>
                        </tr>
                        <b-tr>
                            <b-td>Member Count</b-td>
                            <b-td>{{humanize(information.memberCount)}}</b-td>
                        </b-tr>
                        <tr v-if="information.alliance">
                            <td>Alliance</td>

                            <td>
                                <router-link :to="{name:'alliances', params:{id: information.alliance.id}}">{{information.alliance.name}}</router-link>
                            </td>
                        </tr>
                    </b-tbody>
                </b-table-simple>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="12">
                <h4 class="text-center">Most Valuable Kills - Last 7 Days</h4>
                <hr style="background-color: white" />
                <ComponentLoading v-if="$apollo.queries.information.loading" />
                <Error v-else-if="$apollo.queries.information.error" />
                <KillmailHighlight
                    :mv="mv"
                    v-else
                />
            </b-col>
        </b-row>
        <b-row>
            <ComponentLoading v-if="$apollo.queries.information.loading" />
            <Error v-else-if="$apollo.queries.information.error" />
            <b-col
                lg="12"
                v-else
            >
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
                    scope="corporation"
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
import numeral from "numeral";

import {
    CORPORATION_INFORMATION,
    MOST_VALUABLE,
    KILLMAILS,
} from "../util/queries";
import { EVEONLINE_IMAGE } from "../util/const/urls";
import ComponentLoading from "@/views/util/ComponentLoading";
import Error from "@/views/util/Error";
import KillTable from "@/views/KillTable";
import KillmailHighlight from "@/views/KillmailHighlight";

export default {
    name: "CorporationController",
    components: {
        KillTable,
        KillmailHighlight,
        ComponentLoading,
        Error,
    },
    props: ["id", "page"],
    data() {
        return {
            EVEONLINE_IMAGE: EVEONLINE_IMAGE,
            killmails: [],
            information: {},
            mv: [],
            error: "",
        };
    },
    computed: {
        compPage: {
            get: function () {
                return this.$router.currentRoute.query &&
                    this.$router.currentRoute.query.page
                    ? this.$router.currentRoute.query.page
                    : 1;
            },
            set: function (newValue) {
                this.page = newValue;
            },
        },
    },
    methods: {
        handlePagination(page) {
            this.$router.push({
                name: "corporations",
                params: { id: this.information.id },
                query: { page: page },
            });
        },
        humanize(total) {
            return numeral(total).format("0,0");
        },
    },
    apollo: {
        killmails: {
            query: KILLMAILS,
            variables() {
                return {
                    entity: "corporation",
                    id: this.id,
                    page: this.page,
                };
            },
            result(result, key) {
                this.killmails = result.data.killmails;
            },
            result(result, key) {
                this.error = JSON.stringify(result.message);
            },
        },
        information: {
            query: CORPORATION_INFORMATION,
            variables() {
                return {
                    id: this.id,
                };
            },
            result(result, key) {
                this.information = result.data.information;
            },
            error(result, key) {
                this.error = JSON.stringify(result.message);
            },
        },
        mv: {
            query: MOST_VALUABLE,
            variables() {
                return {
                    category: "kill",
                    type: "corporation",
                    id: this.id,
                    age: 7,
                    limit: 6,
                };
            },
            result(result, key) {
                this.mv = result.data.mv;
            },
            error(result, key) {
                this.error = JSON.stringify(result.message);
            },
        },
    },
};
</script>
