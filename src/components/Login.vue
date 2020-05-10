<template>
    <b-container>
        <b-row>
            <b-col lg="8" offset="2">
                <b-card
                    bg-variant="secondary"
                    text-variant="white"
                    title="Welcome, please login to continue"
                    class="mt-4"
                >
                    Please check the box for the information you would like to allow N.E.O to access.
                    <b-form-group label="Form-checkbox-group stacked checkboxes">
                        <b-form-checkbox-group
                            v-model="scopes.selected"
                            :options="scopes.options"
                            name="selected-scopes"
                            stacked
                        ></b-form-checkbox-group>
                    </b-form-group>
                    <a @click="login">
                        <img
                            src="https://web.ccpgamescdn.com/eveonlineassets/developers/eve-sso-login-black-large.png"
                        />
                    </a>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "Login",
    data() {
        return {
            scopes: {
                selected: [
                    "esi-killmails.read_killmails.v1",
                    "esi-killmails.read_corporation_killmails.v1",
                    "esi-fittings.write_fittings.v1"
                ],
                options: [
                    {
                        text: "Allow N.E.O to read my killmails",
                        value: "esi-killmails.read_killmails.v1"
                    },
                    {
                        text:
                            "Allow N.E.O to read my corporation's killmails (Must be Director or CEO)",
                        value: "esi-killmails.read_corporation_killmails.v1"
                    },
                    {
                        text: "Allow N.E.O to write fittings for me",
                        value: "esi-fittings.write_fittings.v1"
                    }
                ]
            }
        };
    },
    methods: {
        ...mapActions(["generate"]),
        ...mapGetters(["getAuthURL"]),
        async login() {
            window.location = await this.generate(this.scopes.selected);
        }
    }
};
</script>
 