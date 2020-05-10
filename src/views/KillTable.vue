<template>
    <b-table
        :items="killmails"
        :fields="fields"
        @row-dblclicked="handleDblClick"
        :tbody-tr-class="DetermineRowClass"
        t
    >
        <!-- Killmail Date Time and Value -->
        <template v-slot:cell(datetime)="data">
            <span class="mr-2">
                <router-link
                    :to="{name: 'kill',params: { id: data.item.id, hash: data.item.hash }}"
                >
                    {{data.value.date}}
                    <br />
                    {{data.value.time}}
                    <br />
                    {{data.value.value}}
                </router-link>
            </span>
        </template>
        <!-- Killmail Victim Ship Image -->
        <template v-slot:cell(shipData)="data">
            <img
                :src="EVEONLINE_IMAGE+'types/'+(data.item.victim.ship != null ? data.item.victim.ship.id :1 )+'/render?size=64'"
                class="rounded"
            />
        </template>
        <!-- Killmail System Information -->
        <template v-slot:cell(system)="data">
            {{data.value.name}} (
            <span
                :class="data.value.security >= 0 ? 'text-success' : 'text-danger'"
            >{{data.value.security.toFixed(2)}}</span>)
            <br />
            {{data.value.constellation.region.name}}
        </template>
        <!-- Kilmail Victim Information  -->
        <template v-slot:cell(victim)="data">
            <img
                :src="EVEONLINE_IMAGE+ (data.value.alliance != null ? 'alliances/'+data.value.alliance.id: (data.value.corporation != null ? 'corporations/'+data.value.corporation.id: 1)) + '/logo?size=64'"
                class="float-left mr-2"
            />
            <router-link
                v-if="data.value.character"
                :to="{name:'characters', params:{characterID: data.value.character.id}}"
            >{{data.value.character != null ? data.value.character.name : '' }}</router-link>
            <br />
            <router-link
                v-if="data.value.alliance != null"
                :to="{name:'alliances', params:{allianceID: data.value.alliance.id}}"
            >{{data.value.alliance.name}}</router-link>
            <router-link
                v-else
                :to="{name:'corporations', params:{corporationID: data.value.corporation.id}}"
            >{{data.value.corporation.name}}</router-link>
        </template>
        <!-- Kilmail Final Blow Information  -->
        <template v-slot:cell(finalBlow)="data">
            <img
                :src="EVEONLINE_IMAGE+'alliances/'+data.value.alliance.id+'/logo?size=64'"
                v-if="data.value.alliance != null"
                class="float-left mr-2"
            />
            <img
                :src="EVEONLINE_IMAGE+'corporations/'+data.value.corporation.id+'/logo?size=64'"
                v-else-if="data.value.corporation != null"
                class="float-left mr-2"
            />
            <img
                :src="EVEONLINE_IMAGE+'types/'+data.value.ship.id+'/icon?size=64'"
                v-else-if="data.value.ship != null"
                class="float-left mr-2"
            />
            <router-link
                :to="{name: 'characters', params: {characterID: data.value.character.id}}"
                v-if="data.value.character"
            >
                {{data.value.character.name}}
                <br />
            </router-link>
            <router-link
                v-if="data.value.alliance"
                :to="{name:'alliances', params:{allianceID: data.value.alliance.id}}"
            >{{data.value.alliance.name}}</router-link>
            <router-link
                v-else-if="data.value.corporations"
                :to="{name:'corporations', params:{allianceID: data.value.corporation.id}}"
            >{{data.value.corporation.name}}</router-link>
            <div v-else-if="data.value.ship != null">{{data.value.ship.name}}</div>
        </template>
    </b-table>
</template>

<script>
import moment from "moment";
import { EVEONLINE_IMAGE } from "@/util/const/urls";
import { AbbreviateNumber } from "../util/abbreviate";

export default {
    name: "KillTable",
    props: {
        killmails: {
            type: Array,
            required: true
        },
        scope: {
            type: String
        },
        target: {
            type: Number
        }
    },
    data() {
        return {
            EVEONLINE_IMAGE: EVEONLINE_IMAGE,
            fields: [
                {
                    key: "datetime",
                    thStyle: {
                        width: "100px !important"
                    },
                    formatter: (value, key, item) => {
                        const date = moment(
                            item.killmailTime,
                            "YYYY-MM-DDTHH:mm:ssZ"
                        ).format("YYYY-MM-DD");

                        const time = moment(
                            item.killmailTime,
                            "YYYY-MM-DDTHH:mm:ssZ"
                        ).format("HH:mm:ss");

                        return {
                            date: date,
                            time: time,
                            value: AbbreviateNumber(item.totalValue)
                        };
                    }
                },
                {
                    key: "shipData"
                },
                "system",
                "victim",
                {
                    key: "finalBlow",
                    formatter: (value, key, item) => {
                        return item.attackers.find(
                            attacker => attacker.finalBlow
                        );
                    }
                }
            ]
        };
    },
    methods: {
        handleDblClick(item, index, event) {
            this.$router.push({
                name: "kill",
                params: { id: item.id, hash: item.hash }
            });
        },
        AbbreviateNumber(total) {
            return AbbreviateNumber(total);
        },
        DetermineRowClass(item, type) {
            if (!this.scope || !this.target) {
                return "";
            }

            switch (this.scope) {
                // case "character":
                //     if (
                //         item.victim.character &&
                //         item.victim.character.id != this.target
                //     ) {
                //         return "table-success";
                //     } else {
                //         return "table-danger";
                //     }
                // case "corporation":
                //     if (
                //         item.victim.corporation &&
                //         item.victim.corporation.id != this.target
                //     ) {
                //         return "table-success";
                //     } else {
                //         return "table-danger";
                //     }
                // case "alliance":
                //     if (
                //         item.victim.alliance &&
                //         item.victim.alliance.id != this.target
                //     ) {
                //         return "table-success";
                //     } else {
                //         return "table-danger";
                //     }
                default:
                    return "";
            }
        }
    }
};
</script>

