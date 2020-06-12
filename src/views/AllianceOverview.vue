<template>
    <b-container>
        <b-row>
            <b-col md="6">
                <b-table-simple>
                    <b-tbody>
                        <tr>
                            <td rowspan="4" width="130">
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
                                <router-link
                                    :to="{name:'alliances', params:{id: information.id}}"
                                >{{information.name}}</router-link>
                            </b-td>
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
                <hr style="background-color: white" />
                <KillTable :killmails="killmails" scope="character" :target="information.id" />
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
import { EVEONLINE_IMAGE } from "../util/const/urls";

import KillTable from "./KillTable";
import KillmailHighlight from "./KillmailHighlight";

export default {
    name: "AllianceOverview",
    props: ["killmails", "information", "mv"],
    data() {
        return {
            EVEONLINE_IMAGE: EVEONLINE_IMAGE
        };
    },
    computed: {
        compPage: {
            get: function() {
                let result =
                    this.$router.currentRoute.query &&
                    this.$router.currentRoute.query.page
                        ? this.$router.currentRoute.query.page
                        : 1;
                return result;
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
        }
    },
    components: {
        KillTable,
        KillmailHighlight
    }
};
</script>