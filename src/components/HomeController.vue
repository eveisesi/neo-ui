<template>
    <div>
        <Loading v-if="$apollo.loading"></Loading>
        <Error v-else-if="$apollo.error"></Error>
        <b-container
            class="mt-2"
            v-else
        >
            <b-row class="mb-2">
                <b-col lg="12">
                    <h4 class="text-center">Most Valuable Kills - Last 7 Days</h4>
                    <hr style="background-color: white" />
                    <KillmailHighlight :mv="mv" />
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
    </div>
</template>

<script>
import Loading from "@/views/util/Loading";
import Error from "@/views/util/Error";
import { RECENT_KILLMAILS, MOST_VALUABLE } from "../util/queries";
import { AbbreviateNumber } from "../util/abbreviate";
import KillTable from "@/views/KillTable";
import KillmailHighlight from "@/views/KillmailHighlight";

export default {
    name: "HomeController",
    components: {
        Loading,
        Error,
        KillTable,
        KillmailHighlight
    },
    apollo: {
        killmails: {
            query: RECENT_KILLMAILS
        },
        mv: {
            query: MOST_VALUABLE
        }
    },
    methods: {
        AbbreviateNumber(total) {
            return AbbreviateNumber(total);
        }
    }
};
</script>
