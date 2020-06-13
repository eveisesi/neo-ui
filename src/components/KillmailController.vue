<template>
    <Loading v-if="$apollo.loading"></Loading>
    <Error
        v-else-if="error"
        :error="error"
    ></Error>
    <b-container v-else>
        <b-row>
            <b-col lg="12">
                <h2>Killmail {{killmail.id}} Overview</h2>
                <hr style="background-color: white" />
            </b-col>
        </b-row>
        <b-row>
            <b-col
                md="8"
                class="p-0"
            >
                <b-row>
                    <b-col
                        lg="6"
                        class="p-0"
                    >
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
import { KILLMAIL } from "../util/queries/index";
import Loading from "@/views/util/Loading";
import Error from "@/views/util/Error";

import FittingWheel from "@/views/KillmailDetail/FittingWheel";
import VictimInfo from "@/views/KillmailDetail/VictimInfo";
import ItemDetail from "@/views/KillmailDetail/ItemDetail";
import Attackers from "@/views/KillmailDetail/Attackers";

export default {
    name: "KillmailController",
    components: {
        Loading,
        Error,
        FittingWheel,
        VictimInfo,
        ItemDetail,
        Attackers
    },
    data() {
        return {
            id: this.$route.params.id,
            hash: this.$route.params.hash,
            error: ""
        };
    },
    apollo: {
        killmail: {
            query: KILLMAIL,
            variables() {
                return {
                    id: this.id,
                    hash: this.hash
                };
            },
            result(result, key) {
                this.error = JSON.stringify(result.message);
            }
        }
    }
};
</script>