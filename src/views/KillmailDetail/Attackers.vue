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
                        v-else-if="finalBlow.ship"
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
                        v-else-if="mostDamage.ship"
                        class="rounded"
                    />
                </b-td>
            </b-tr>
            <b-tr>
                <b-td class="text-center">
                    <div v-if="finalBlow.character">
                        <router-link :to="{name:'characters', params: {id: finalBlow.character.id}}">
                            {{finalBlow.character.name}}
                        </router-link>
                        <span v-if="finalBlow.corporation">[<router-link :to="{name:'corporations', params:{id: finalBlow.corporation.id}}">{{finalBlow.corporation.ticker}}</router-link>]</span>

                    </div>
                    <span v-else>{{finalBlow.ship.name}}</span>
                </b-td>
                <b-td class="text-center">
                    <div v-if="mostDamage.character">
                        <router-link
                            v-if="mostDamage.character"
                            :to="{name:'characters',
                            params:{id:
                            mostDamage.character.id}}"
                        >
                            {{finalBlow.character.name}}
                        </router-link>
                        <span v-if="mostDamage.corporation">[<router-link :to="{name:'corporations', params:{id: mostDamage.corporation.id}}">{{mostDamage.corporation.ticker}}</router-link>]</span>
                    </div>
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
            <b-tr
                v-for="attacker in killmail.attackers"
                :key="attacker.id"
            >
                <b-td
                    style="width: 66px"
                    class="p-0"
                >
                    <img
                        :src="EVEONLINE_IMAGE+'characters/'+attacker.character.id+'/portrait?size=64'"
                        v-if="attacker.character"
                        class="float-left"
                        style="height:64px; width:64px"
                    />
                    <img
                        :src="EVEONLINE_IMAGE+'types/'+attacker.ship.id+'/icon?size=64'"
                        v-else
                        class="float-left"
                        style="height:64px; width:64px"
                    />
                </b-td>
                <b-td
                    style="width: 34px"
                    class="p-0"
                >
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
                    <router-link
                        v-if="attacker.character"
                        :to="{name:'characters', params:{id: attacker.character.id}}"
                    >{{attacker.character.name}}</router-link>
                    <router-link
                        v-else-if="attacker.corporation"
                        :to="{name:'corporations', params:{id: attacker.corporation.id}}"
                    >{{attacker.corporation.name}}</router-link>
                    <span v-else>{{attacker.ship.name}}</span>

                    <router-link
                        v-if="attacker.corporation"
                        :to="{name:'corporations', params:{id: attacker.corporation.id}}"
                    >
                        <br />
                        {{attacker.corporation.name}}
                    </router-link>
                    <router-link
                        v-if="attacker.alliance"
                        :to="{name:'alliances', params:{id: attacker.alliance.id}}"
                    >
                        <br />
                        {{attacker.alliance.name}}
                    </router-link>
                </b-td>
                <b-td>
                    <span class="float-right">{{humanize((attacker.damageDone/killmail.victim.damageTaken)*100)}}%</span>
                    <br>
                    <span class="float-right">{{humanize((attacker.damageDone))}}</span>
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
            mostDamage: null,
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
        },
    },
    created() {
        this.mostDamage = this.killmail.attackers.reduce((prev, current) => {
            return prev.damageDone > current.damageDone ? prev : current;
        });
        this.finalBlow = this.killmail.attackers.find(
            (attacker) => attacker.finalBlow
        );
    },
};
</script>