<template>
    <Loading v-if="$apollo.loading"></Loading>
    <Error v-else-if="error" :error="error"></Error>
    <KillmailDetail :killmail="killmail" v-else />
</template>

<script>
import { KILLMAIL } from "../util/queries/index";
import Loading from "@/views/util/Loading";
import Error from "@/views/util/Error";

import KillmailDetail from "@/views/KillmailDetail/KillmailDetail";

export default {
    name: "KillmailController",
    components: {
        KillmailDetail,
        Loading,
        Error
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