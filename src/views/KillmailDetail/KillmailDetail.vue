<template>
    <b-container>
        <b-row>
            <b-col md="8" class="p-0">
                <b-table-simple>
                    <b-tbody>
                        <b-tr>
                            <b-td class="p-0" style="vertical-align:top;">
                                <FittingWheel :victim="killmail.victim" class="mt-2" />
                            </b-td>
                            <b-td class="p-0">
                                <VictimInfo :killmail="killmail" class="mt-2" />
                            </b-td>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
                <hr />
                <ItemDetail :items="killmail.victim.items" />
            </b-col>

            <b-col md="4" class="p-1 mt-1">
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