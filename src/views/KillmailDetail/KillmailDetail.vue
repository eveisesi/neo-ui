<template>
    <b-container>
        <b-row>
            <b-col lg="8">
                <FittingWheel :victim="killmail.victim" class="mt-2" />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import FittingWheel from "./FittingWheel";

export default {
    name: "KillmailDetail",
    props: ["killmail"],
    components: {
        FittingWheel
    }
};
</script>