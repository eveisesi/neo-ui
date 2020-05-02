<template>
    <b-container class="mt-2">
        <b-row>
            <b-col lg="12">
                <h4 class="text-center">Most Valuable Kills - Last 7 Days</h4>
                <b-table-simple>
                    <b-tbody>
                        <b-tr>
                            <b-td
                                v-for="killmail in mvk"
                                :key="killmail.id"
                                class="text-center"
                            >{{killmail.victim.ship.name}}</b-td>
                        </b-tr>
                        <b-tr>
                            <b-td v-for="killmail in mvk" :key="killmail.id">
                                <b-img
                                    :src="EVEONLINE_IMAGE+'types/'+killmail.victim.ship.id+'/render?size=256'"
                                    fluid
                                    rounded
                                ></b-img>
                            </b-td>
                        </b-tr>
                        <b-tr>
                            <b-td v-for="killmail in mvk" :key="killmail.id" class="text-center">
                                {{AbbreviateNumber(killmail.totalValue)}} ISK
                                <br />
                                <span
                                    v-if="killmail.victim.character"
                                >{{killmail.victim.character.name}}</span>
                                <span
                                    v-else-if="killmail.victim.corporation"
                                >{{killmail.victim.corporation.name}}</span>
                            </b-td>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
            </b-col>
        </b-row>
        <b-row>
            <b-col lg="12">
                <h3>Most Recent Killmails</h3>
                <KillTable :killmails="killmails" />
            </b-col>
        </b-row>
    </b-container>
</template>


<script>
import numeral from "numeral";
import { AbbreviateNumber } from "../util/abbreviate";

import KillTable from "./KillTable";
import { EVEONLINE_IMAGE } from "@/util/const/urls";

export default {
    name: "HomeView",
    data() {
        return {
            EVEONLINE_IMAGE: EVEONLINE_IMAGE
        };
    },
    props: {
        killmails: Array,
        mvk: Array
    },
    components: {
        KillTable
    },
    methods: {
        AbbreviateNumber(total) {
            // return numeral(total).format("0,0.00");
            return AbbreviateNumber(total);
        }
    }
};
</script>
