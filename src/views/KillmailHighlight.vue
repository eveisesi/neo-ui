<template>
    <div>
        <b-row cols-lg="6" cols-sm="3" cols="1">
            <b-col v-for="killmail in mv" :key="killmail.id" class="mt-2">
                <b-card
                    :img-src="EVEONLINE_IMAGE+'types/'+killmail.victim.ship.id+'/render?size=128'"
                    :img-alt="killmail.victim.ship.name"
                    no-body
                >
                    <b-card-text class="text-center mt-2 mb-1">
                        <router-link
                            :to="{name:'ships', params:{id:killmail.victim.ship.id}}"
                        >{{killmail.victim.ship.name}}</router-link>
                        <br />
                        <router-link
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
            </b-col>
        </b-row>
        <hr style="background-color: white" v-if="mv.length > 0" />
    </div>
</template>

<script>
import { EVEONLINE_IMAGE } from "@/util/const/urls";
import { AbbreviateNumber } from "../util/abbreviate";

export default {
    name: "KillmailHighlight",
    props: ["mv"],
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