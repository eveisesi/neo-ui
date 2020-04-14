<template>
    <div style="position: relative; height:398px; width:398px; z-index: 3">
        <div :style="styles.panel.mask">
            <img src="./img/tyrannis.png" />
        </div>
        <div :style="styles.panel.mask">
            <img
                v-if="shipHighSlotCount() != undefined"
                :src="getSlotImgURL(shipHighSlotCount().value, 'h')"
                style="border:0px"
            />
        </div>
        <div :style="styles.panel.mask">
            <img
                v-if="shipMedSlotCount() != undefined"
                :src="getSlotImgURL(shipMedSlotCount().value, 'm')"
                style="border:0px"
            />
        </div>
        <div :style="styles.panel.mask">
            <img
                v-if="shipLowSlotCount() != undefined"
                :src="getSlotImgURL(shipLowSlotCount().value, 'l')"
                style="border:0px"
            />
        </div>
        <div :style="styles.panel.mask">
            <img
                v-if="shipRigSlotCount() != undefined"
                :src="getSlotImgURL(shipRigSlotCount().value, 'r')"
                style="border:0px"
            />
        </div>
        <div :style="styles.panel.mask">
            <img
                v-if="shipSubsystemSlotCount() != undefined"
                :src="getSlotImgURL(shipSubsystemSlotCount().value, 's')"
                style="border:0px"
            />
        </div>
        <div v-for="slot in SHIP_HIGH_SLOT_FLAG_IDS" :key="slot">
            <div
                :style="styles.panel['high' + slot]"
                v-if="getModule(shipHighPowerModules(), slot) != undefined"
            >
                <img
                    :src="EVEONLINE_IMAGE+'types/'+getModule(shipHighPowerModules(), slot).itemTypeID+'/icon?size=32'"
                />
            </div>
            <div
                :style="styles.panel['high'+slot+'c']"
                v-if="getModuleAmmo(shipHighPowerModules(), slot) != undefined"
            >
                <img
                    :src="EVEONLINE_IMAGE+'types/'+getModuleAmmo(shipHighPowerModules(), slot).itemTypeID+'/icon?size=32'"
                />
            </div>
        </div>
        <div v-for="slot in SHIP_MED_SLOT_FLAG_IDS" :key="slot">
            <div
                :style="styles.panel['med' + slot]"
                v-if="getModule(shipMedPowerModules(), slot) != undefined"
            >
                <img
                    :src="EVEONLINE_IMAGE+'types/'+getModule(shipMedPowerModules(), slot).itemTypeID+'/icon?size=32'"
                />
            </div>
            <div
                :style="styles.panel['med'+slot+'c']"
                v-if="getModuleAmmo(shipMedPowerModules(), slot) != undefined"
            >
                <img
                    :src="EVEONLINE_IMAGE+'types/'+getModuleAmmo(shipMedPowerModules(), slot).itemTypeID+'/icon?size=32'"
                />
            </div>
        </div>
        <div v-for="slot in SHIP_LOW_SLOT_FLAG_IDS" :key="slot">
            <div
                :style="styles.panel['low' + slot]"
                v-if="getModule(shipLowPowerModules(), slot) != undefined"
            >
                <img
                    :src="EVEONLINE_IMAGE+'types/'+getModule(shipLowPowerModules(), slot).itemTypeID+'/icon?size=32'"
                />
            </div>
            <div
                :style="styles.panel['low'+slot+'c']"
                v-if="getModuleAmmo(shipLowPowerModules(), slot) != undefined"
            >
                <img
                    :src="EVEONLINE_IMAGE+'types/'+getModuleAmmo(shipLowPowerModules(), slot).itemTypeID+'/icon?size=32'"
                />
            </div>
        </div>
        <div v-for="slot in SHIP_RIG_SLOT_FLAG_IDS" :key="slot">
            <div
                :style="styles.panel['rig' + slot]"
                v-if="getModule(shipRigModules(), slot) != undefined"
            >
                <img
                    :src="EVEONLINE_IMAGE+'types/'+getModule(shipRigModules(), slot).itemTypeID+'/icon?size=32'"
                />
            </div>
        </div>
        <div v-for="slot in SHIP_SUB_SYSTEM_SLOT_FLAG_IDS" :key="slot">
            <div
                :style="styles.panel['sub' + slot]"
                v-if="getModule(shipSubsystemModules(), slot) != undefined"
            >
                <img
                    :src="EVEONLINE_IMAGE+'types/'+getModule(shipSubsystemModules(), slot).itemTypeID+'/icon?size=32'"
                />
            </div>
        </div>
        <div
            id="bigship"
            style="position:absolute; left:72px; top:71px; width:256px; height:256px; z-index:-2;"
        >
            <img :src="EVEONLINE_IMAGE+'types/'+victim.ship.id+'/render?size=256'" />
        </div>
    </div>
</template>

<script>
import { EVEONLINE_IMAGE } from "@/util/const/urls";
import {
    SHIP_HIGH_SLOT_FLAG_IDS,
    SHIP_MED_SLOT_FLAG_IDS,
    SHIP_LOW_SLOT_FLAG_IDS,
    SHIP_RIG_SLOT_FLAG_IDS,
    SHIP_SUB_SYSTEM_SLOT_FLAG_IDS
} from "@/util/const/flags";
import { slots } from "./fittingWheelPositions";

export default {
    name: "FittingWheel",
    props: {
        victim: {
            required: true
        }
    },
    data() {
        return {
            SHIP_HIGH_SLOT_FLAG_IDS: SHIP_HIGH_SLOT_FLAG_IDS,
            SHIP_MED_SLOT_FLAG_IDS: SHIP_MED_SLOT_FLAG_IDS,
            SHIP_LOW_SLOT_FLAG_IDS: SHIP_LOW_SLOT_FLAG_IDS,
            SHIP_RIG_SLOT_FLAG_IDS: SHIP_RIG_SLOT_FLAG_IDS,
            SHIP_SUB_SYSTEM_SLOT_FLAG_IDS: SHIP_SUB_SYSTEM_SLOT_FLAG_IDS,
            EVEONLINE_IMAGE: EVEONLINE_IMAGE,
            styles: {
                panel: {
                    mask: slots.mask,
                    panel: slots.panel,
                    high27: slots.high1,
                    high28: slots.high2,
                    high29: slots.high3,
                    high30: slots.high4,
                    high31: slots.high5,
                    high32: slots.high6,
                    high33: slots.high7,
                    high34: slots.high8,
                    high27c: slots.high1c,
                    high28c: slots.high2c,
                    high29c: slots.high3c,
                    high30c: slots.high4c,
                    high31c: slots.high5c,
                    high32c: slots.high6c,
                    high33c: slots.high7c,
                    high34c: slots.high8c,
                    med19: slots.med1,
                    med20: slots.med2,
                    med21: slots.med3,
                    med22: slots.med4,
                    med23: slots.med5,
                    med24: slots.med6,
                    med25: slots.med7,
                    med26: slots.med8,
                    med19c: slots.med1c,
                    med20c: slots.med2c,
                    med21c: slots.med3c,
                    med22c: slots.med4c,
                    med23c: slots.med5c,
                    med24c: slots.med6c,
                    med25c: slots.med7c,
                    med26c: slots.med8c,
                    low11: slots.low1,
                    low12: slots.low2,
                    low13: slots.low3,
                    low14: slots.low4,
                    low15: slots.low5,
                    low16: slots.low6,
                    low17: slots.low7,
                    low18: slots.low8,
                    low11c: slots.low1c,
                    low12c: slots.low2c,
                    low13c: slots.low3c,
                    low14c: slots.low4c,
                    low15c: slots.low5c,
                    low16c: slots.low6c,
                    low17c: slots.low7c,
                    low18c: slots.low8c,
                    rig92: slots.rig1,
                    rig93: slots.rig2,
                    rig94: slots.rig3,
                    sub125: slots.sub1,
                    sub126: slots.sub2,
                    sub127: slots.sub3,
                    sub128: slots.sub4,
                    sub129: slots.sub5
                }
            }
        };
    },
    methods: {
        getSlotImgURL(id, slot) {
            return require(`./img/${id}${slot}.png`);
        },

        getModule(modules, flagID) {
            return modules.find(
                item => item.flag == flagID && item.type.group.categoryID != 8
            );
        },
        getModuleAmmo(modules, flagID) {
            return modules.find(
                item => item.flag == flagID && item.type.group.categoryID == 8
            );
        },

        // Returns number of high slots ship can have
        shipHighSlotCount() {
            return this.victim.ship.attributes.find(
                attribute => attribute.attributeID == 14
            );
        },
        // Returns High Power Modules and ammo fitted to the ship
        shipHighPowerModules() {
            return this.victim.items.filter(item => {
                return SHIP_HIGH_SLOT_FLAG_IDS.includes(item.flag);
            });
        },

        // Returns number of med slots ship can have
        shipMedSlotCount() {
            return this.victim.ship.attributes.find(
                attribute => attribute.attributeID == 13
            );
        },
        // Returns Med Power Modules and ammo fitted to the ship
        shipMedPowerModules() {
            return this.victim.items.filter(item => {
                return SHIP_MED_SLOT_FLAG_IDS.includes(item.flag);
            });
        },

        // Returns number of low slots ship can have
        shipLowSlotCount() {
            return this.victim.ship.attributes.find(
                attribute => attribute.attributeID == 12
            );
        },
        // Returns Low Power Modules and ammo fitted to the ship
        shipLowPowerModules() {
            return this.victim.items.filter(item => {
                return SHIP_LOW_SLOT_FLAG_IDS.includes(item.flag);
            });
        },

        // Returns number of rig slots ship can have
        shipRigSlotCount() {
            return this.victim.ship.attributes.find(
                attribute => attribute.attributeID == 1137
            );
        },
        // Returns Rig Modules fitted to the ship
        shipRigModules() {
            return this.victim.items.filter(item => {
                return SHIP_RIG_SLOT_FLAG_IDS.includes(item.flag);
            });
        },

        // Returns number of subsystem slots ship can have
        // TODO: Update to reflect number of items on KM, not the attribute
        // Attribute always return 2 i think
        shipSubsystemSlotCount() {
            return this.victim.ship.attributes.find(
                attribute => attribute.attributeID == 1367
            );
        },

        // Returns SubSystem Modules fitted to the ship
        shipSubsystemModules() {
            return this.victim.items.filter(item => {
                return SHIP_SUB_SYSTEM_SLOT_FLAG_IDS.includes(item.flag);
            });
        }
    },
    created() {}
};
</script>