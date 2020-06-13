import gql from "graphql-tag";

const CHARACTER_INFORMATION = gql`
    query CHARACTER_INFORMATION($id: Int!) {
        information: characterByCharacterID(id: $id) {
            id
            name
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
    query CORPORATION_INFORMATION($id: Int!) {
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
    query ALLIANCE_INFORMATION($id: Int!) {
        information: allianceByAllianceID(id: $id) {
            id
            name
            ticker
            memberCount
        }
    }
`;

const TYPE_INFORMATION = gql`
    query TYPE_INFORMATION($id: Int!) {
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

export {
    CHARACTER_INFORMATION,
    CORPORATION_INFORMATION,
    ALLIANCE_INFORMATION,
    TYPE_INFORMATION,
    GROUP_INFORMATION,
};
