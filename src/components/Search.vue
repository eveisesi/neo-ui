<template>
    <!-- <b-nav-form>
        
    </b-nav-form>-->
    <vue-bootstrap-typeahead
        class="mt-1"
        style="min-width: 250px"
        v-model="term"
        :data="results"
        :serializer="item => item.name"
        @input="getResults"
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

export default {
    name: "Search",
    components: {
        VueBootstrapTypeahead
    },
    data() {
        return {
            EVEONLINE_IMAGE: EVEONLINE_IMAGE,
            results: [],
            term: "",
            shouldSkip: true
        };
    },
    apollo: {
        search: {
            query: SEARCHABLE_ENTITIES,
            variables() {
                return {
                    term: this.term
                };
            },
            result(result, key) {
                this.results = result.data.search;
            },
            debounce: 500,
            skip() {
                return this.term.length < 3;
            }
        }
    },
    methods: {
        getResults() {
            return this.$apollo.queries.search.refetch();
        },
        handleSelection(item) {
            this.$router.push({ name: item.type, params: { id: item.id } });
        }
    }
};
</script>