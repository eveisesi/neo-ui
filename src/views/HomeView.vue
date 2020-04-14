<template>
    <b-container class="mt-2">
        <b-row>
            <b-col lg="9">
                <h3>Most Recent Killmails</h3>
                <KillTable :killmails="killmails" />
            </b-col>
        </b-row>
    </b-container>
</template>


<script>
import KillTable from "./KillTable";
export default {
    name: "HomeView",
    data() {
        return {
            imageURL: "https://image.eveonline.com/",
            fields: [
                {
                    key: "datetime",
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
                    key: "ship",
                    formatter: (value, key, item) => {
                        return (
                            '<img src="https://images.evetech.net/types/' +
                            item.victim.ship.id +
                            '/render?size=64"/>'
                        );
                    }
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
    props: {
        killmails: Array
    },
    components: {
        KillTable
    }
};
</script>
