<template>
    <KillmailDetail v-if="!$apollo.loading" :killmail="killmail" />
    <Loading v-else />
</template>

<script>
import { KILLMAIL } from "@/util/queries";
import KillmailDetail from "@/views/KillmailDetail/KillmailDetail";
import Loading from "@/views/util/Loading";

export default {
    name: "KillmailController",
    components: {
        KillmailDetail,
        Loading
    },
    data() {
        return {
            id: this.$route.params.id,
            hash: this.$route.params.hash
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
            }
        }
    }
};
</script>