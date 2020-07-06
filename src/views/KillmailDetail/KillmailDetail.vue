<template>
    <b-container>
        <b-row>
            <b-col lg="12">
                <h2>Killmail {{killmail.id}} Overview</h2>
                <hr style="background-color: white" />
            </b-col>
        </b-row>
        <b-row>
            <b-col md="8">
                <b-row>
                    <b-col lg="6">
                        <FittingWheel :victim="killmail.victim" />
                    </b-col>
                    <b-col lg="6">
                        <VictimInfo
                            :killmail="killmail"
                            class="mt-2"
                        />
                    </b-col>
                </b-row>
                <h3>Item(s) Dropped/Destroyed</h3>
                <hr style="background-color:white;" />
                <ItemDetail :victim="killmail.victim" />
            </b-col>
            <b-col
                md="4"
                class="p-1 mt-1"
            >
                <Attackers :killmail="killmail" />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import FittingWheel from "./FittingWheel";
import VictimInfo from "./VictimInfo";
import ItemDetail from "./ItemDetail";
import Attackers from "./Attackers";

export default {
    name: "KillmailDetail",
    props: ["killmail"],
    components: {
        FittingWheel,
        VictimInfo,
        ItemDetail,
        Attackers
    }
};
</script>