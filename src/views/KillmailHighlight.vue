<template>
    <div>
        <b-card-group deck>
            <b-card
                v-for="killmail in mvk"
                :key="killmail.id"
                :img-src="EVEONLINE_IMAGE+'types/'+killmail.victim.ship.id+'/render?size=128'"
                :img-alt="killmail.victim.ship.name"
                img-height="128"
                img-width="128"
                no-body
                style="max-width: 138px"
            >
                <b-card-text class="text-center mt-2 mb-1">
                    {{killmail.victim.ship.name}}
                    <br />
                    <router-link
                        v-if="killmail.victim.character"
                        :to="{name:'kill', params: {id: killmail.id, hash: killmail.hash}}"
                    >{{AbbreviateNumber(killmail.totalValue)}} ISK</router-link>

                    <br />
                    <router-link
                        v-if="killmail.victim.character"
                        :to="{name:'characters', params:{id:killmail.victim.character.id}}"
                    >{{killmail.victim.character.name}}</router-link>
                    <router-link
                        v-else
                        :to="{name:'corporations', params:{id:killmail.victim.corporation.id}}"
                    >{{killmail.victim.corporation.name}}</router-link>
                </b-card-text>
            </b-card>
        </b-card-group>
        <hr style="background-color: white" v-if="mvk.length > 0" />
    </div>
</template>

<script>
import { EVEONLINE_IMAGE } from "@/util/const/urls";
import { AbbreviateNumber } from "../util/abbreviate";

export default {
    name: "KillmailHighlight",
    props: ["mvk"],
    data() {
        return {
            EVEONLINE_IMAGE: EVEONLINE_IMAGE
        };
    },

    methods: {
        AbbreviateNumber(total) {
            return AbbreviateNumber(total);
        }
    }
};
</script>