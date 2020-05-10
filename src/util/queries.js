import gql from "graphql-tag";

export const RECENT_KILLMAILS = gql`
    query {
        killmails: killmailRecent(page: 1) {
            id
            hash
            killmailTime
            totalValue
            system {
                id
                name
                security
                constellation {
                    id
                    name
                    region {
                        id
                        name
                    }
                }
            }
            attackers {
                character {
                    id
                    name
                }
                alliance {
                    id
                    name
                }
                corporation {
                    id
                    name
                }
                ship {
                    id
                    name
                }
                weapon {
                    id
                    name
                }
                finalBlow
            }
            victim {
                character {
                    id
                    name
                }
                alliance {
                    id
                    name
                }
                corporation {
                    id
                    name
                }
                ship {
                    id
                    name
                }
            }
        }
    }
`;

export const ALLIANCEOVERVIEW = gql`
    query AllianceOverview(
        $type: Entity!
        $id: Int!
        $page: Int
        $age: Int
        $limit: Int
    ) {
        killmails: killmailsByEntityID(entity: $type, id: $id, page: $page) {
            id
            hash
            killmailTime
            totalValue
            system {
                id
                name
                security
                constellation {
                    id
                    name
                    region {
                        id
                        name
                    }
                }
            }
            attackers {
                character {
                    id
                    name
                }
                alliance {
                    id
                    name
                }
                corporation {
                    id
                    name
                }
                ship {
                    id
                    name
                }
                weapon {
                    id
                    name
                }
                finalBlow
            }
            victim {
                character {
                    id
                    name
                }
                alliance {
                    id
                    name
                }
                corporation {
                    id
                    name
                }
                ship {
                    id
                    name
                }
            }
        }
        information: allianceByAllianceID(id: $id) {
            id
            name
            ticker
        }
        mvk: mvkByEntityID(entity: $type, id: $id, age: $age, limit: $limit) {
            id
            hash
            totalValue
            victim {
                character {
                    id
                    name
                }
                ship {
                    id
                    name
                    group {
                        id
                        name
                    }
                }
                corporation {
                    id
                    name
                }
            }
        }
    }
`;

export const CHARACTEROVERVIEW = gql`
    query CharacterOverview(
        $type: Entity!
        $id: Int!
        $page: Int
        $age: Int
        $limit: Int
    ) {
        killmails: killmailsByEntityID(entity: $type, id: $id, page: $page) {
            id
            hash
            killmailTime
            totalValue
            system {
                id
                name
                security
                constellation {
                    id
                    name
                    region {
                        id
                        name
                    }
                }
            }
            attackers {
                character {
                    id
                    name
                }
                alliance {
                    id
                    name
                }
                corporation {
                    id
                    name
                }
                ship {
                    id
                    name
                }
                weapon {
                    id
                    name
                }
                finalBlow
            }
            victim {
                character {
                    id
                    name
                }
                alliance {
                    id
                    name
                }
                corporation {
                    id
                    name
                }
                ship {
                    id
                    name
                }
            }
        }
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
        mvk: mvkByEntityID(entity: $type, id: $id, age: $age, limit: $limit) {
            id
            hash
            totalValue
            victim {
                character {
                    id
                    name
                }
                ship {
                    id
                    name
                    group {
                        id
                        name
                    }
                }
                corporation {
                    id
                    name
                }
            }
        }
    }
`;

export const CORPORATIONOVERVIEW = gql`
    query CorporationOverview(
        $type: Entity!
        $id: Int!
        $page: Int
        $age: Int
        $limit: Int
    ) {
        killmails: killmailsByEntityID(entity: $type, id: $id, page: $page) {
            id
            hash
            killmailTime
            totalValue
            system {
                id
                name
                security
                constellation {
                    id
                    name
                    region {
                        id
                        name
                    }
                }
            }
            attackers {
                character {
                    id
                    name
                }
                alliance {
                    id
                    name
                }
                corporation {
                    id
                    name
                }
                ship {
                    id
                    name
                }
                weapon {
                    id
                    name
                }
                finalBlow
            }
            victim {
                character {
                    id
                    name
                }
                alliance {
                    id
                    name
                }
                corporation {
                    id
                    name
                }
                ship {
                    id
                    name
                }
            }
        }
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
        mvk: mvkByEntityID(entity: $type, id: $id, age: $age, limit: $limit) {
            id
            hash
            totalValue
            victim {
                character {
                    id
                    name
                }
                ship {
                    id
                    name
                    group {
                        id
                        name
                    }
                }
                corporation {
                    id
                    name
                }
            }
        }
    }
`;

export const KILLMAIL = gql`
    # Write your query or mutation here
    query($id: Int!, $hash: String!) {
        killmail(id: $id, hash: $hash) {
            id
            hash
            killmailTime
            destroyedValue
            droppedValue
            fittedValue
            totalValue
            system {
                id
                name
                security
                constellation {
                    id
                    name
                    region {
                        id
                        name
                    }
                }
            }
            attackers {
                id
                characterID
                character {
                    id
                    name
                }
                alliance {
                    id
                    name
                }
                corporation {
                    id
                    name
                }
                ship {
                    id
                    name
                }
                weapon {
                    id
                    name
                }
                damageDone
                finalBlow
                securityStatus
            }
            victim {
                character {
                    id
                    name
                }
                alliance {
                    id
                    name
                }
                corporation {
                    id
                    name
                }
                ship {
                    id
                    name
                    group {
                        id
                        name
                    }
                    attributes {
                        typeID
                        attributeID
                        value
                    }
                }
                damageTaken
                shipValue
                position {
                    x
                    y
                    z
                }
                fitted {
                    id
                    itemTypeID
                    flag
                    quantityDropped
                    quantityDestroyed
                    itemValue
                    totalValue
                    type {
                        id
                        name
                        groupID
                        attributes {
                            typeID
                            attributeID
                            value
                        }
                        group {
                            categoryID
                        }
                    }
                    typeflag {
                        id
                        name
                        text
                    }
                }
                items {
                    id
                    itemTypeID
                    flag
                    quantityDropped
                    quantityDestroyed
                    itemValue
                    totalValue
                    type {
                        id
                        name
                        groupID
                        attributes {
                            typeID
                            attributeID
                            value
                        }
                        group {
                            categoryID
                        }
                    }
                    typeflag {
                        id
                        name
                        text
                    }
                    items {
                        id
                        itemTypeID
                        flag
                        quantityDropped
                        quantityDestroyed
                        itemValue
                        totalValue
                        type {
                            id
                            name
                            groupID
                            attributes {
                                typeID
                                attributeID
                                value
                            }
                            group {
                                categoryID
                            }
                        }
                        typeflag {
                            id
                            name
                            text
                        }
                    }
                }
            }
        }
    }
`;

export const MostValuableKills = gql`
    query($type: Entity!, $age: Int, $limit: Int) {
        mvk: mvkByEntityID(entity: $type, id: 0, age: $age, limit: $limit) {
            id
            hash
            totalValue
            victim {
                character {
                    id
                    name
                }
                ship {
                    id
                    name
                    group {
                        id
                        name
                    }
                }
                corporation {
                    id
                    name
                }
            }
        }
    }
`;
