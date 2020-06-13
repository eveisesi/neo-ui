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
                                rowspan="4"
                                width="130"
                            >
                                <b-img
                                    :src="EVEONLINE_IMAGE+'characters/'+information.id+'/portrait?size=128'"
                                    rounded
                                    fluid
                                    height="128"
                                    width="128"
                                />
                            </td>
                            <b-td>Character</b-td>
                            <b-td>
                                <router-link :to="{name:'characters', params:{id: information.id}}">{{information.name}}</router-link>
                            </b-td>
                        </tr>
                        <tr>
                            <b-td>Corporation:</b-td>
                            <b-td>
                                <router-link :to="{name:'corporations', params:{id: information.corporation.id}}">{{information.corporation.name}}</router-link>
                            </b-td>
                        </tr>
                        <tr v-if="information.corporation.alliance">
                            <td>Alliance</td>
                            <td>
                                <router-link :to="{name:'alliances', params:{id: information.corporation.alliance.id}}">{{information.corporation.alliance.name}}</router-link>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Security Status
                            </td>
                            <td>
                                {{information.securityStatus.toFixed(2)}}
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
                <hr style="background-color: white;" />
                <KillTable
                    :killmails="killmails"
                    scope="character"
                    :target="this.id"
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
import Loading from "@/views/util/Loading";
import Error from "@/views/util/Error";

import { EVEONLINE_IMAGE } from "../util/const/urls";

import numeral from "numeral";

import KillTable from "@/views/KillTable";
import KillmailHighlight from "@/views/KillmailHighlight";
import {
    KILLMAILS,
    CHARACTER_INFORMATION,
    MOST_VALUABLE
} from "../util/queries";

export default {
    name: "CharacterController",
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
                name: "characters",
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
                    entity: "character",
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
            query: CHARACTER_INFORMATION,
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
                    type: "character",
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