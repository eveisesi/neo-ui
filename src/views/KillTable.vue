<template>
    <b-table-simple response>
        <b-tr>
            <b-th style="width: 100px !important">
                Date Time
            </b-th>
            <b-th class="text-center">
                Ship
            </b-th>
            <b-th class="text-center">
                System
            </b-th>
            <b-th class="text-center">
                Victim
            </b-th>
            <b-th class="text-center">
                Final Blow
            </b-th>
        </b-tr>
        <b-tr
            v-for="killmail in killmails"
            :key="killmail.id"
            :class="DetermineRowClass(killmail)"
        >
            <b-td>
                <router-link :to='{name:"kill", params: {id: killmail.id, hash: killmail.hash}}'>
                    {{fmtDate(killmail.killmailTime)}}
                    <br>
                    {{fmtTime(killmail.killmailTime)}}
                    <br>
                    {{AbbreviateNumber(killmail.totalValue)}}
                </router-link>
            </b-td>
            <b-td class="text-center">
                <img
                    :src="EVEONLINE_IMAGE+'types/'+(killmail.victim.ship != null ? killmail.victim.ship.id :1 )+'/render?size=64'"
                    class="rounded"
                />
            </b-td>
            <b-td>
                <router-link :to='{name:"systems", params: {id: killmail.system.id}}'>{{killmail.system.name}}</router-link>
                (<span :class="killmail.system.security >= 0 ? 'text-success' : 'text-danger'">{{killmail.system.security.toFixed(2)}}</span>)
                <br>
                <router-link :to='{name: "constellations", params: {id: killmail.system.constellation.id}}'>{{killmail.system.constellation.name}}</router-link>
                <br />
                <router-link :to='{name: "regions", params: {id: killmail.system.constellation.region.id}}'>{{killmail.system.constellation.region.name}}</router-link>
            </b-td>
            <!-- Victim Column -->
            <b-td>
                <img
                    :src="EVEONLINE_IMAGE+ (killmail.victim.alliance != null ? 'alliances/'+killmail.victim.alliance.id: (killmail.victim.corporation != null ? 'corporations/'+killmail.victim.corporation.id: 1)) + '/logo?size=64'"
                    class="float-left mr-2"
                />
                <router-link
                    v-if="killmail.victim.character"
                    :to="{name:'characters', params:{id: killmail.victim.character.id}}"
                >{{killmail.victim.character != null ? killmail.victim.character.name : '' }}</router-link>
                <br />
                <router-link
                    v-if="killmail.victim.corporation != null"
                    :to="{name:'corporations', params:{id: killmail.victim.corporation.id}}"
                >{{killmail.victim.corporation.name}}</router-link>
                <router-link
                    v-if="killmail.victim.alliance != null"
                    :to="{name:'alliances', params:{id: killmail.victim.alliance.id}}"
                >{{killmail.victim.alliance.name}}</router-link>

            </b-td>
            <!-- Attacker (Final Blow Column) -->
            <b-td>
                <img
                    :src="EVEONLINE_IMAGE+'alliances/'+finalBlow(killmail.attackers).alliance.id+'/logo?size=64'"
                    v-if="finalBlow(killmail.attackers).alliance != null"
                    class="float-left mr-2"
                />
                <img
                    :src="EVEONLINE_IMAGE+'corporations/'+finalBlow(killmail.attackers).corporation.id+'/logo?size=64'"
                    v-else-if="finalBlow(killmail.attackers).corporation != null"
                    class="float-left mr-2"
                />
                <img
                    :src="EVEONLINE_IMAGE+'types/'+finalBlow(killmail.attackers).ship.id+'/icon?size=64'"
                    v-else-if="finalBlow(killmail.attackers).ship != null"
                    class="float-left mr-2"
                />
                <router-link
                    :to="{name: 'characters', params:{id: finalBlow(killmail.attackers).character.id}}"
                    v-if="finalBlow(killmail.attackers).character"
                >
                    {{finalBlow(killmail.attackers).character.name}}
                    <br />
                </router-link>
                <router-link
                    v-if="finalBlow(killmail.attackers).alliance"
                    :to="{name:'alliances', params:{id: finalBlow(killmail.attackers).alliance.id}}"
                >{{finalBlow(killmail.attackers).alliance.name}}</router-link>
                <router-link
                    v-else-if="finalBlow(killmail.attackers).corporations"
                    :to="{name:'corporations', params:{id: finalBlow(killmail.attackers).corporation.id}}"
                >{{finalBlow(killmail.attackers).corporation.name}}</router-link>
                <div v-else-if="finalBlow(killmail.attackers).ship != null">{{finalBlow(killmail.attackers).ship.name}}</div>
            </b-td>
        </b-tr>
    </b-table-simple>
</template>

<script>
import moment from "moment";
import { EVEONLINE_IMAGE } from "@/util/const/urls";
import { AbbreviateNumber } from "../util/abbreviate";

export default {
    name: "KillTable",
    props: ["killmails", "scope", "target"],
    computed: {},
    data() {
        return {
            EVEONLINE_IMAGE: EVEONLINE_IMAGE,
        };
    },
    methods: {
        fmtDate: (time) => {
            return moment(time, "YYYY-MM-DDTHH:mm:ssZ").format("YYYY-MM-DD");
        },
        fmtTime: (time) => {
            return moment(time, "YYYY-MM-DDTHH:mm:ssZ").format("HH:mm:ss");
        },
        finalBlow: (attackers) => {
            return attackers.find((attacker) => attacker.finalBlow);
        },
        AbbreviateNumber(total) {
            return AbbreviateNumber(total);
        },
        DetermineRowClass(item) {
            if (!this.scope || !this.target) {
                return "";
            }

            switch (this.scope) {
                case "character":
                    if (
                        item.victim.character &&
                        item.victim.character.id != this.target
                    ) {
                        return "success";
                    } else {
                        return "danger";
                    }
                case "corporation":
                    if (
                        item.victim.corporation &&
                        item.victim.corporation.id != this.target
                    ) {
                        return "success";
                    } else {
                        return "danger";
                    }
                case "alliance":
                    if (
                        item.victim.alliance &&
                        item.victim.alliance.id != this.target
                    ) {
                        return "success";
                    } else {
                        return "danger";
                    }
                default:
                    return "success";
            }
        },
    },
};
</script>

<style scoped>
.success {
    background: #006400;
}
.danger {
    background: #a12121;
}
</style>