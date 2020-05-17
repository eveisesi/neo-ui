<template>
    <b-container>
        <b-row>
            <b-col md="6">
                <b-table-simple>
                    <b-tbody>
                        <tr>
                            <td rowspan="4" width="130">
                                <b-img
                                    :src="EVEONLINE_IMAGE+'corporations/'+information.id+'/logo?size=128'"
                                    rounded
                                    fluid
                                    height="128"
                                    width="128"
                                />
                            </td>
                            <b-td>Corporation</b-td>
                            <b-td>
                                <router-link
                                    :to="{name:'corporations', params:{id: information.id}}"
                                >{{information.name}}</router-link>
                            </b-td>
                        </tr>
                        <tr v-if="information.alliance">
                            <td>Alliance</td>

                            <td>
                                <router-link
                                    :to="{name:'alliances', params:{id: information.alliance.id}}"
                                >{{information.alliance.name}}</router-link>
                            </td>
                        </tr>
                    </b-tbody>
                </b-table-simple>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="12">
                <h4 class="text-center">Most Valuable Kills - Last 7 Days</h4>
                <KillmailHighlight :mvk="mvk" />
            </b-col>
        </b-row>
        <b-row></b-row>
        <b-row>
            <b-col sm="12">
                <h3>Recent Activity</h3>
                <KillTable :killmails="killmails" scope="character" :target="information.id" />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { EVEONLINE_IMAGE } from "../../util/const/urls";

import KillTable from "..//KillTable";
import KillmailHighlight from "..//KillmailHighlight";

export default {
    name: "CorporationOverview",
    props: ["killmails", "information", "mvk"],
    data() {
        return {
            EVEONLINE_IMAGE: EVEONLINE_IMAGE
        };
    },
    components: {
        KillTable,
        KillmailHighlight
    }
};
</script>