import gql from "graphql-tag";

const CHARACTER_INFORMATION = gql`
    query CharacterInformation($id: Int!) {
        information: characterByCharacterID(id: $id) {
            id
            name
            securityStatus
            corporation {
                id
                name
                ticker
                alliance {
                    id
                    name
                    ticker
                }
            }
        }
    }
`;

const CORPORATION_INFORMATION = gql`
    query CorporationInformation($id: Int!) {
        information: corporationByCorporationID(id: $id) {
            id
            name
            ticker
            memberCount
            alliance {
                id
                name
                ticker
            }
        }
    }
`;

const ALLIANCE_INFORMATION = gql`
    query AllianceInformation($id: Int!) {
        information: allianceByAllianceID(id: $id) {
            id
            name
            ticker
            memberCount
        }
    }
`;

const TYPE_INFORMATION = gql`
    query TypeInformation($id: Int!) {
        information: typeByTypeID(id: $id) {
            id
            name
            group {
                id
                name
                category {
                    id
                    name
                }
            }
        }
    }
`;

const GROUP_INFORMATION = gql`
    query GROUP_INFORMATION($id: Int!) {
        information: groupByGroupID(id: $id) {
            id
            name
            category {
                id
                name
            }
        }
    }
`;

const SYSTEM_INFORMATION = gql`
    query SystemInformation($id: Int!) {
        information: solarSystemBySolarSystemID(id: $id) {
            id
            name
            constellation {
                id
                name
                region {
                    id
                    name
                }
            }
        }
    }
`;

const CONSTELLATION_INFORMATION = gql`
    query ConstellationInformation($id: Int!) {
        information: constellationByConstellationID(id: $id) {
            id
            name
            region {
                id
                name
            }
        }
    }
`;

const REGION_INFORMATION = gql`
    query RegionInformation($id: Int!) {
        information: regionByRegionID(id: $id) {
            id
            name
        }
    }
`;

export {
    CHARACTER_INFORMATION,
    CORPORATION_INFORMATION,
    ALLIANCE_INFORMATION,
    TYPE_INFORMATION,
    GROUP_INFORMATION,
    SYSTEM_INFORMATION,
    CONSTELLATION_INFORMATION,
    REGION_INFORMATION,
};
