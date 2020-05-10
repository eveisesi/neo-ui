<template>
    <b-container class="mt-2">
        <b-row class="mb-2">
            <b-col lg="12">
                <h4 class="text-center">Most Valuable Kills - Last 7 Days</h4>
                <hr style="background-color: white" />
                <KillmailHighlight :mvk="mvk" />
                <hr style="background-color: white" />
            </b-col>
        </b-row>

        <b-row>
            <b-col lg="12">
                <h3>Most Recent Killmails</h3>
                <hr style="background-color: white" />
                <KillTable :killmails="killmails" />
            </b-col>
        </b-row>
    </b-container>
</template>


<script>
import numeral from "numeral";
import { AbbreviateNumber } from "../util/abbreviate";

import KillTable from "./KillTable";
import KillmailHighlight from "./KillmailHighlight";

export default {
    name: "HomeView",
    props: {
        killmails: Array,
        mvk: Array
    },
    components: {
        KillTable,
        KillmailHighlight
    },
    methods: {
        AbbreviateNumber(total) {
            // return numeral(total).format("0,0.00");
            return AbbreviateNumber(total);
        }
    }
};
</script>
