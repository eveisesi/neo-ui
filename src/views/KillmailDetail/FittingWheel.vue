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
                    mask:
                        "position:absolute; left: 0px; top: 0 px; width:398px; height:398px; z-index:-1;",
                    panel:
                        "position:absolute; left: 0px; top: 0 px; width:398px; height:398px",
                    high27:
                        "position:absolute; left:73px; top:60px; width:32px; height:32px;",
                    high28:
                        "position:absolute; left:102px; top:42px; width:32px; height:32px;",
                    high29:
                        "position:absolute; left:134px; top:27px; width:32px; height:32px;",
                    high30:
                        "position:absolute; left:169px; top:21px; width:32px; height:32px;",
                    high31:
                        "position:absolute; left:203px; top:22px; width:32px; height:32px;",
                    high32:
                        "position:absolute; left:238px; top:30px; width:32px; height:32px;",
                    high33:
                        "position:absolute; left:270px; top:45px; width:32px; height:32px;",
                    high34:
                        "position:absolute; left:295px; top:64px; width:32px; height:32px;",
                    high27c:
                        "position:absolute; left:94px; top:88px; width:24px; height:24px;",
                    high28c:
                        "position:absolute; left:119px; top:70px; width:24px; height:24px;",
                    high29c:
                        "position:absolute; left:146px; top:58px; width:24px; height:24px;",
                    high30c:
                        "position:absolute; left:175px; top:52px; width:24px; height:24px;",
                    high31c:
                        "position:absolute; left:204px; top:52px; width:24px; height:24px;",
                    high32c:
                        "position:absolute; left:232px; top:60px; width:24px; height:24px;",
                    high33c:
                        "position:absolute; left:258px; top:72px; width:24px; height:24px;",
                    high34c:
                        "position:absolute; left:280px; top:91px; width:24px; height:24px;",
                    med19:
                        "position:absolute; left:26px; top:140px; width:32px; height:32px;",
                    med20:
                        "position:absolute; left:24px; top:176px; width:32px; height:32px;",
                    med21:
                        "position:absolute; left:23px; top:212px; width:32px; height:32px;",
                    med22:
                        "position:absolute; left:30px; top:245px; width:32px; height:32px;",
                    med23:
                        "position:absolute; left:46px; top:278px; width:32px; height:32px;",
                    med24:
                        "position:absolute; left:69px; top:304px; width:32px; height:32px;",
                    med25:
                        "position:absolute; left:100px; top:328px; width:32px; height:32px;",
                    med26:
                        "position:absolute; left:133px; top:342px; width:32px; height:32px;",
                    med19c:
                        "position:absolute; left:59px; top:154px; width:24px; height:24px;",
                    med20c:
                        "position:absolute; left:54px; top:182px; width:24px; height:24px;",
                    med21c:
                        "position:absolute; left:56px; top:210px; width:24px; height:24px;",
                    med22c:
                        "position:absolute; left:62px; top:238px; width:24px; height:24px;",
                    med23c:
                        "position:absolute; left:76px; top:265px; width:24px; height:24px;",
                    med24c:
                        "position:absolute; left:94px; top:288px; width:24px; height:24px;",
                    med25c:
                        "position:absolute; left:118px; top:305px; width:24px; height:24px;",
                    med26c:
                        "position:absolute; left:146px; top:318px; width:24px; height:24px;",
                    low11:
                        "position:absolute; left:344px; top:143px; width:32px; height:32px;",
                    low12:
                        "position:absolute; left:350px; top:178px; width:32px; height:32px;",
                    low13:
                        "position:absolute; left:349px; top:213px; width:32px; height:32px;",
                    low14:
                        "position:absolute; left:340px; top:246px; width:32px; height:32px;",
                    low15:
                        "position:absolute; left:323px; top:277px; width:32px; height:32px;",
                    low16:
                        "position:absolute; left:300px; top:304px; width:32px; height:32px;",
                    low17:
                        "position:absolute; left:268px; top:324px; width:32px; height:32px;",
                    low18:
                        "position:absolute; left:234px; top:338px; width:32px; height:32px;",
                    low11c:
                        "position:absolute; left:315px; top:150px; width:24px; height:24px;",
                    low12c:
                        "position:absolute; left:319px; top:179px; width:24px; height:24px;",
                    low13c:
                        "position:absolute; left:318px; top:206px; width:24px; height:24px;",
                    low14c:
                        "position:absolute; left:310px; top:234px; width:24px; height:24px;",
                    low15c:
                        "position:absolute; left:297px; top:261px; width:24px; height:24px;",
                    low16c:
                        "position:absolute; left:275px; top:283px; width:24px; height:24px;",
                    low17c:
                        "position:absolute; left:251px; top:300px; width:24px; height:24px;",
                    low18c:
                        "position:absolute; left:225px; top:310px; width:24px; height:24px;",
                    rig92:
                        "position:absolute; left:148px; top:259px; width:32px; height:32px;",
                    rig93:
                        "position:absolute; left:185px; top:267px; width:32px; height:32px;",
                    rig94:
                        "position:absolute; left:221px; top:259px; width:32px; height:32px;",
                    sub125:
                        "position:absolute; left:117px; top:131px; width:32px; height:32px;",
                    sub126:
                        "position:absolute; left:147px; top:108px; width:32px; height:32px;",
                    sub127:
                        "position:absolute; left:184px; top:98px; width:32px; height:32px;",
                    sub128:
                        "position:absolute; left:221px; top:107px; width:32px; height:32px;",
                    sub129:
                        "position:absolute; left:250px; top:131px; width:32px; height:32px;"
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
            return this.victim.fitted.filter(item => {
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
            return this.victim.fitted.filter(item => {
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
            return this.victim.fitted.filter(item => {
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
            return this.victim.fitted.filter(item => {
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
            return this.victim.fitted.filter(item => {
                return SHIP_SUB_SYSTEM_SLOT_FLAG_IDS.includes(item.flag);
            });
        }
    },
    created() {}
};
</script>