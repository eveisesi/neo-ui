<template>
    <vue-bootstrap-typeahead
        class="mt-1"
        style="min-width: 250px"
        v-model="term"
        :data="results"
        :serializer="item => item.name"
        @hit="handleSelection"
        placeholder="Search"
    >
        <template
            slot="suggestion"
            slot-scope="{ data, htmlText }"
        >
            <div class="d-flex align-items-center">
                <img
                    class="rounded-circle"
                    :src="EVEONLINE_IMAGE+data.image+'?size=32'"
                    style="width: 32px; height: 32px"
                />
                <span
                    class="ml-4"
                    v-html="htmlText"
                ></span>
            </div>
        </template>
    </vue-bootstrap-typeahead>
</template>

<script>
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import { SEARCHABLE_ENTITIES } from "../util/queries";
import { EVEONLINE_IMAGE } from "../util/const/urls";
import _ from "underscore";

const APP_URL = process.env.VUE_APP_API_URL;

export default {
    name: "Search",
    components: {
        VueBootstrapTypeahead
    },
    data() {
        return {
            EVEONLINE_IMAGE: EVEONLINE_IMAGE,
            results: [],
            term: ""
        };
    },

    methods: {
        getResults() {
            if (this.term.length <= 1) {
                return;
            }
            this.$http
                .get(`${APP_URL}/search?term=${this.term}`)
                .then(response => {
                    this.results = response.data;
                });
            return;
        },
        handleSelection(item) {
            console.log(item);
            this.$router.push({ name: item.type, params: { id: item.id } });
        }
    },
    watch: {
        term: _.debounce(function() {
            this.getResults();
        }, 500)
    }
};
</script>