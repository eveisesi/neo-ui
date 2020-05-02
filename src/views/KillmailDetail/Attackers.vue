<template>
    <div>
        <b-table-simple table-variant="active">
            <b-tr>
                <b-td class="text-center">Final Blow</b-td>
                <b-td class="text-center">Most Damage</b-td>
            </b-tr>
            <b-tr class="text-center">
                <b-td class="text-center">
                    <img
                        :src="EVEONLINE_IMAGE+'characters/'+finalBlow.character.id+'/portrait?size=64'"
                        class="rounded"
                        v-if="finalBlow.character"
                    />
                    <img
                        :src="EVEONLINE_IMAGE+'types/'+finalBlow.ship.id+'/icon?size=64'"
                        class="rounded"
                        v-else
                    />
                </b-td>
                <b-td class="text-center">
                    <img
                        :src="EVEONLINE_IMAGE+'characters/'+mostDamage.character.id+'/portrait?size=64'"
                        v-if="mostDamage.character"
                        class="rounded"
                    />
                    <img
                        :src="EVEONLINE_IMAGE+'types/'+mostDamage.ship.id+'/icon?size=64'"
                        v-else
                        class="rounded"
                    />
                </b-td>
            </b-tr>
            <b-tr>
                <b-td class="text-center">
                    <span v-if="finalBlow.character">{{finalBlow.character.name}}</span>
                    <span v-else>{{finalBlow.ship.name}}</span>
                </b-td>
                <b-td class="text-center">
                    <span v-if="mostDamage.character">{{mostDamage.character.name}}</span>
                    <span v-else>{{mostDamage.ship.name}}</span>
                </b-td>
            </b-tr>
        </b-table-simple>
        <b-table-simple table-variant="active">
            <b-tr>
                <b-td colspan="3">{{killmail.attackers.length}} Involved</b-td>
                <b-td>
                    <span class="float-right">Damage</span>
                </b-td>
            </b-tr>
            <b-tr v-for="attacker in killmail.attackers" :key="attacker.id">
                <b-td style="width: 66px" class="p-0">
                    <img
                        :src="getAttackerCharacterPortraitURL(attacker)"
                        class="float-left"
                        style="height:64px; width:64px"
                    />
                </b-td>
                <b-td style="width: 34px" class="p-0">
                    <img
                        :src="EVEONLINE_IMAGE+'types/'+attacker.ship.id+'/icon?size=32'"
                        v-if="attacker.ship"
                        style="height:32px; width:32px"
                    />
                    <br />
                    <img
                        :src="EVEONLINE_IMAGE+'types/'+attacker.weapon.id+'/icon?size=32'"
                        v-if="attacker.weapon"
                        style="height:32px; width:32px"
                    />
                </b-td>
                <b-td>
                    <span v-if="attacker.character">{{attacker.character.name}}</span>
                    <span v-else-if="attacker.corporation">{{attacker.corporation.name}}</span>
                    <span v-else>{{attacker.ship.name}}</span>

                    <span v-if="attacker.corporation">
                        <br />
                        {{attacker.corporation.name}}
                    </span>
                    <span v-if="attacker.alliance">
                        <br />
                        {{attacker.alliance.name}}
                    </span>
                </b-td>
                <b-td>
                    <span
                        class="float-right"
                    >{{humanize((attacker.damageDone/killmail.victim.damageTaken)*100)}}%</span>
                </b-td>
            </b-tr>
        </b-table-simple>
    </div>
</template>

<script>
import { EVEONLINE_IMAGE } from "@/util/const/urls";
import numeral from "numeral";

export default {
    name: "Attackers",
    data() {
        return {
            EVEONLINE_IMAGE: EVEONLINE_IMAGE,
            finalBlow: null,
            mostDamage: null
        };
    },
    props: ["killmail"],
    methods: {
        humanize(total) {
            return numeral(total).format("0,0");
        },
        getAttackerCharacterPortraitURL(attacker) {
            if (attacker.character != null) {
                return `${this.EVEONLINE_IMAGE}characters/${attacker.character.id}/portrait?size=64`;
            }
            return `${this.EVEONLINE_IMAGE}types/${attacker.ship.id}/icon?size=64`;
        }
    },
    created() {
        this.mostDamage = this.killmail.attackers.reduce((prev, current) => {
            return prev.damageDone > current.damageDone ? prev : current;
        });
        this.finalBlow = this.killmail.attackers.find(
            attacker => attacker.finalBlow
        );
    }
};
</script>