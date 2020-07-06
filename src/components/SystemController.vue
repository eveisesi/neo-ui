<template>
    <!-- <Loading v-if="$apollo.loading"></Loading>
    <Error v-else-if="error" :error="error"></Error>-->
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
                                    :src="EVEONLINE_IMAGE+'types/6/render?size=128'"
                                    rounded
                                    fluid
                                    height="128"
                                    width="128"
                                />
                            </td>
                            <b-td>System</b-td>
                            <b-td>{{information.name}}</b-td>
                        </tr>
                        <b-tr v-if="information.constellation">
                            <b-td>Constellation</b-td>
                            <b-td>
                                <router-link :to="{name:'constellations', params:{id: information.constellation.id}}">{{information.constellation.name}}</router-link>
                            </b-td>
                        </b-tr>
                        <b-tr v-if="information.constellation && information.constellation.region">
                            <b-td>Region</b-td>
                            <b-td>
                                <router-link :to="{name:'regions', params:{id: information.constellation.region.id}}">{{information.constellation.region.name}}</router-link>
                            </b-td>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="12">
                <h4 class="text-center">Most Valuable Kills - Last 7 Days</h4>
                <hr style="background-color: white" />
                <ComponentLoading v-if="$apollo.queries.mv.loading" />
                <Error v-else-if="$apollo.queries.mv.error" />
                <KillmailHighlight
                    :mv="mv"
                    v-else
                />
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="12">
                <ComponentLoading v-if="$apollo.queries.killmails.loading" />
                <Error v-else-if="$apollo.queries.killmails.error" />
                <div v-else>
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
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>


<script>
import { KILLMAILS, SYSTEM_INFORMATION, MOST_VALUABLE } from "@/util/queries";
import ComponentLoading from "@/views/util/ComponentLoading";
import Error from "@/views/util/Error";
import { EVEONLINE_IMAGE } from "../util/const/urls";
import numeral from "numeral";

import KillTable from "@/views/KillTable";
import KillmailHighlight from "@/views/KillmailHighlight";

export default {
    name: "SystemController",
    components: {
        ComponentLoading,
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
    methods: {
        handlePagination(page) {
            this.$router.push({
                name: "systems",
                params: { id: this.information.id },
                query: { page: page }
            });
        },
        humanize(total) {
            return numeral(total).format("0,0");
        }
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
    apollo: {
        killmails: {
            query: KILLMAILS,
            variables() {
                return {
                    entity: "system",
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
            query: SYSTEM_INFORMATION,
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
                    type: "system",
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