<template>
    <b-container>
        <b-row>
            <b-col lg="12">
                <div class="mt-5">
                    <b-alert show variant="danger">
                        <h4 class="mt-3">Thats not good, an error has occurred</h4>
                        <h5>{{error}}</h5>
                        <p>Please try refreshing. If that does not work, find the dev and let him know that shit is broken</p>
                    </b-alert>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: "Loading",
    props: {
        error: {
            type: String
        }
    }
};
</script>