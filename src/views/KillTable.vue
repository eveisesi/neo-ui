<template>
    <b-table striped hover :items="killmails" :fields="fields" @row-dblclicked="handleDblClick">
        <template v-slot:cell(datetime)="data">
            <span class="mr-2">
                {{data.value.split("|")[0]}}
                <br />
                {{data.value.split("|")[1]}}
            </span>
        </template>
        <template v-slot:cell(shipData)="data">
            <img
                :src="imageURL+'types/'+(data.item.victim.ship != null ? data.item.victim.ship.id :1 )+'/render?size=64'"
                class="rounded"
            />
        </template>
        <template v-slot:cell(system)="data">
            {{data.value.name}}
            <br />Insert Region Name
        </template>
        <template v-slot:cell(victim)="data">
            <img
                :src="imageURL+ (data.value.alliance != null ? 'alliances/'+data.value.alliance.id: (data.value.corporation != null ? 'corporations/'+data.value.corporation.id: 1)) + '/logo?size=64'"
                class="float-left mr-2"
            />
            {{data.value.character != null ? data.value.character.name : '' }}
            <br />
            {{data.value.alliance != null ? data.value.alliance.name : data.value.corporation.name }}
        </template>
        <template v-slot:cell(finalBlow)="data">
            <img
                :src="imageURL+'alliances/'+data.value.alliance.id+'/logo?size=64'"
                v-if="data.value.alliance != null"
                class="float-left mr-2"
            />
            <img
                :src="imageURL+'corporations/'+data.value.corporation.id+'/logo?size=64'"
                v-else-if="data.value.corporation != null"
                class="float-left mr-2"
            />
            <img
                :src="imageURL+'types/'+data.value.ship.id+'/render?size=64'"
                v-else
                class="float-left mr-2"
            />
            <div v-if="data.value.character">{{data.value.character.name}}</div>
            <div v-if="data.value.alliance">{{data.value.alliance.name}}</div>
            <div v-else-if="data.value.corporations">{{data.value.corporations.name}}</div>
            <div v-else>{{data.value.ship.name}}</div>
        </template>
    </b-table>
</template>

<script>
import moment from "moment";

export default {
    name: "KillTable",
    props: ["killmails"],
    data() {
        return {
            imageURL: "https://image.eveonline.com/",
            fields: [
                {
                    key: "datetime",
                    thStyle: {
                        width: "100px !important"
                    },
                    formatter: (value, key, item) => {
                        const date = moment(
                            item.killmail_time,
                            "YYYY-MM-DDTHH:mm:ssZ"
                        ).format("YYYY-MM-DD");
                        const time = moment(
                            item.killmail_time,
                            "YYYY-MM-DDTHH:mm:ssZ"
                        ).format("HH:mm:ss");

                        return date + "|" + time;
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
                name: "Kill",
                params: { id: item.id, hash: item.hash }
            });
        }
    }
};
</script>

