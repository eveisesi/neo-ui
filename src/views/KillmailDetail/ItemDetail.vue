<template>
    <b-table-simple hover responsive table-variant="active">
        <b-tbody>
            <b-tr>
                <b-td colspan="4" class="text-center">
                    <strong>Ship</strong>
                </b-td>
            </b-tr>
            <b-tr>
                <b-td>
                    <img :src="EVEONLINE_IMAGE+'types/'+victim.ship.id+'/icon?size=32'" />
                </b-td>
                <b-td>{{victim.ship.name}}</b-td>
                <b-td>
                    <span class="text-danger">1</span>
                </b-td>

                <b-td>
                    <span class="float-right">{{humanize(victim.shipValue)}} ISK</span>
                </b-td>
            </b-tr>
            <b-tr v-if="sections.high.items.length">
                <b-td colspan="4" class="text-center">
                    <strong>High Slots</strong>
                </b-td>
            </b-tr>
            <b-tr
                v-for="item in sections.high.items"
                :key="item.id"
                :variant="item.quantityDropped>0?'success':''"
            >
                <b-td>
                    <img :src="EVEONLINE_IMAGE+'types/'+item.itemTypeID+'/icon?size=32'" />
                </b-td>
                <b-td>{{item.type.name}}</b-td>
                <b-td v-if="item.quantityDestroyed > 0">
                    <span class="text-danger">{{item.quantityDestroyed}}</span>
                </b-td>
                <b-td v-else-if="item.quantityDropped > 0">{{item.quantityDropped}}</b-td>
                <b-td>
                    <span class="float-right">{{humanize(item.totalValue)}} ISK</span>
                </b-td>
            </b-tr>
            <b-tr v-if="sections.high.items.length">
                <b-td colspan="3"></b-td>
                <b-td>
                    <span class="float-right">{{humanize(sections.high.total)}} ISK</span>
                </b-td>
            </b-tr>
            <b-tr v-if="sections.med.items.length">
                <b-td colspan="4" class="text-center">
                    <strong>Med Slots</strong>
                </b-td>
            </b-tr>
            <b-tr
                v-for="item in sections.med.items"
                :key="item.id"
                :variant="item.quantityDropped>0?'success':''"
            >
                <b-td>
                    <img :src="EVEONLINE_IMAGE+'types/'+item.itemTypeID+'/icon?size=32'" />
                </b-td>
                <b-td>{{item.type.name}}</b-td>
                <b-td v-if="item.quantityDestroyed > 0">
                    <span class="text-danger">{{item.quantityDestroyed}}</span>
                </b-td>
                <b-td v-else-if="item.quantityDropped > 0">{{item.quantityDropped}}</b-td>
                <b-td>
                    <span class="float-right">{{humanize(item.totalValue)}} ISK</span>
                </b-td>
            </b-tr>
            <b-tr v-if="sections.med.items.length">
                <b-td colspan="3"></b-td>
                <b-td>
                    <span class="float-right">{{humanize(sections.med.total)}} ISK</span>
                </b-td>
            </b-tr>
            <b-tr v-if="sections.low.items.length">
                <b-td colspan="4" class="text-center">
                    <strong>Low Slots</strong>
                </b-td>
            </b-tr>
            <b-tr
                v-for="item in sections.low.items"
                :key="item.id"
                :variant="item.quantityDropped>0?'success':''"
            >
                <b-td>
                    <img :src="EVEONLINE_IMAGE+'types/'+item.itemTypeID+'/icon?size=32'" />
                </b-td>
                <b-td>{{item.type.name}}</b-td>
                <b-td v-if="item.quantityDestroyed > 0">
                    <span class="text-danger">{{item.quantityDestroyed}}</span>
                </b-td>
                <b-td v-else-if="item.quantityDropped > 0">{{item.quantityDropped}}</b-td>
                <b-td>
                    <span class="float-right">{{humanize(item.totalValue)}} ISK</span>
                </b-td>
            </b-tr>
            <b-tr v-if="sections.low.items.length">
                <b-td colspan="3"></b-td>
                <b-td>
                    <span class="float-right">{{humanize(sections.low.total)}} ISK</span>
                </b-td>
            </b-tr>
            <b-tr v-if="sections.rigs.items.length">
                <b-td colspan="4" class="text-center">
                    <strong>Rig Slots</strong>
                </b-td>
            </b-tr>
            <b-tr
                v-for="item in sections.rigs.items"
                :key="item.id"
                :variant="item.quantityDropped>0?'success':''"
            >
                <b-td>
                    <img :src="EVEONLINE_IMAGE+'types/'+item.itemTypeID+'/icon?size=32'" />
                </b-td>
                <b-td>{{item.type.name}}</b-td>
                <b-td v-if="item.quantityDestroyed > 0">
                    <span class="text-danger">{{item.quantityDestroyed}}</span>
                </b-td>
                <b-td v-else-if="item.quantityDropped > 0">{{item.quantityDropped}}</b-td>
                <b-td>
                    <span class="float-right">{{humanize(item.totalValue)}} ISK</span>
                </b-td>
            </b-tr>
            <b-tr v-if="sections.rigs.items.length">
                <b-td colspan="3"></b-td>
                <b-td>
                    <span class="float-right">{{humanize(sections.rigs.total)}} ISK</span>
                </b-td>
            </b-tr>
            <b-tr v-if="sections.subs.items.length">
                <b-td colspan="4" class="text-center">
                    <strong>Sub Systems</strong>
                </b-td>
            </b-tr>
            <b-tr
                v-for="item in sections.subs.items"
                :key="item.id"
                :variant="item.quantityDropped>0?'success':''"
            >
                <b-td>
                    <img :src="EVEONLINE_IMAGE+'types/'+item.itemTypeID+'/icon?size=32'" />
                </b-td>
                <b-td>{{item.type.name}}</b-td>
                <b-td v-if="item.quantityDestroyed > 0">
                    <span class="text-danger">{{item.quantityDestroyed}}</span>
                </b-td>
                <b-td v-else-if="item.quantityDropped > 0">{{item.quantityDropped}}</b-td>
                <b-td>
                    <span class="float-right">{{humanize(item.totalValue)}} ISK</span>
                </b-td>
            </b-tr>
            <b-tr v-if="sections.subs.items.length">
                <b-td colspan="3"></b-td>
                <b-td>
                    <span class="float-right">{{humanize(sections.subs.total)}} ISK</span>
                </b-td>
            </b-tr>
            <b-tr v-if="sections.cargo.items.length">
                <b-td colspan="4" class="text-center">
                    <strong>Cargo</strong>
                </b-td>
            </b-tr>
            <b-tr
                v-for="item in sections.cargo.items"
                :key="item.id"
                :variant="item.quantityDropped>0?'success':''"
            >
                <b-td>
                    <img :src="EVEONLINE_IMAGE+'types/'+item.itemTypeID+'/icon?size=32'" />
                </b-td>
                <b-td>{{item.type.name}}</b-td>
                <b-td v-if="item.quantityDestroyed > 0">
                    <span class="text-danger">{{item.quantityDestroyed}}</span>
                </b-td>
                <b-td v-else-if="item.quantityDropped > 0">{{item.quantityDropped}}</b-td>
                <b-td>
                    <span class="float-right">{{humanize(item.totalValue)}} ISK</span>
                </b-td>
            </b-tr>
            <b-tr v-if="sections.cargo.items.length">
                <b-td colspan="3"></b-td>
                <b-td>
                    <span class="float-right">{{humanize(sections.cargo.total)}} ISK</span>
                </b-td>
            </b-tr>
        </b-tbody>
    </b-table-simple>
</template>

<script>
import numeral from "numeral";

import { EVEONLINE_IMAGE } from "@/util/const/urls";
import {
    SHIP_HIGH_SLOT_FLAG_IDS,
    SHIP_MED_SLOT_FLAG_IDS,
    SHIP_LOW_SLOT_FLAG_IDS,
    SHIP_RIG_SLOT_FLAG_IDS,
    SHIP_SUB_SYSTEM_SLOT_FLAG_IDS
} from "@/util/const/flags";

export default {
    name: "ItemDetail",
    props: ["victim"],
    data() {
        return {
            EVEONLINE_IMAGE: EVEONLINE_IMAGE,
            sections: []
        };
    },
    methods: {
        humanize(total) {
            return numeral(total).format("0,0.00");
        },
        determineRowColor(item) {
            if (item.quantityDestroyed > 0) {
                return "danger";
            }
        },
        buildSections() {
            let sections = {
                high: {
                    total: 0.0,
                    items: []
                },
                med: {
                    total: 0.0,
                    items: []
                },
                low: {
                    total: 0.0,
                    items: []
                },
                rigs: {
                    total: 0.0,
                    items: []
                },
                subs: {
                    total: 0.0,
                    items: []
                },
                cargo: {
                    total: 0.0,
                    items: []
                }
            };
            this.victim.items.forEach(item => {
                if (SHIP_HIGH_SLOT_FLAG_IDS.includes(item.flag)) {
                    sections.high.items.push(item);
                } else if (SHIP_MED_SLOT_FLAG_IDS.includes(item.flag)) {
                    sections.med.items.push(item);
                } else if (SHIP_LOW_SLOT_FLAG_IDS.includes(item.flag)) {
                    sections.low.items.push(item);
                } else if (SHIP_RIG_SLOT_FLAG_IDS.includes(item.flag)) {
                    sections.rigs.items.push(item);
                } else if (SHIP_SUB_SYSTEM_SLOT_FLAG_IDS.includes(item.flag)) {
                    sections.subs.items.push(item);
                } else {
                    sections.cargo.items.push(item);
                }
            });

            for (const section in sections) {
                let items = [];
                sections[section].items.forEach((item, i) => {
                    sections[section].total += item.totalValue;
                });

                for (let i = 0; i < sections[section].items.length; i++) {
                    let item = sections[section].items[i];
                    let existing = items.filter(
                        newItem =>
                            item.itemTypeID === newItem.itemTypeID &&
                            ((newItem.quantityDropped > 0 &&
                                item.quantityDropped > 0) ||
                                (newItem.quantityDestroyed > 0 &&
                                    item.quantityDestroyed > 0))
                    );

                    if (existing.length == 0) {
                        items.push(item);
                    } else {
                        let destroyed = existing.find(
                            existingItem => existingItem.quantityDestroyed > 0
                        );
                        if (item.quantityDestroyed > 0 && destroyed) {
                            // The incoming item was destroyed, lets see if there are any existing items that were destroyed
                            destroyed.quantityDestroyed +=
                                item.quantityDestroyed;
                            continue;
                        }
                        let dropped = existing.find(
                            existingItem => existingItem.quantityDropped > 0
                        );
                        if (item.quantityDropped > 0 && dropped) {
                            dropped.quantityDropped += item.quantityDropped;

                            continue;
                        }
                    }
                }

                // let total = 0;
                // console.log(items);
                // // for (let item in items) {
                // //     console.log(item.quantityDestroyed, item.quantityDropped);
                // //     if (item.quantityDestroyed) {
                // //         total += item.quantityDestroyed * item.itemValue;
                // //     }
                // //     if (item.quantityDropped) {
                // //         total += item.quantityDropped * item.itemValue;
                // //     }
                // // }

                // // console.log(section, total);
                // sections[section].total = total;
                sections[section].items = items;
            }

            return sections;
        }
    },
    created() {
        this.sections = this.buildSections();
    }
};
</script>