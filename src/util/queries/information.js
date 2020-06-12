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
        }
    }
`;

// const SHIP_INFORMATION = gql`
//     query SHIP_INFORMATION($id: Int!) {
//         information: corporationByCorporationID(id: $id) {
//             id
//             name
//             ticker
//             alliance {
//                 id
//                 name
//                 ticker
//             }
//         }
//     }
// `;

export { CHARACTER_INFORMATION, CORPORATION_INFORMATION, ALLIANCE_INFORMATION };
