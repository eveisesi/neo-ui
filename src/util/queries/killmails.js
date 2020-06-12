import gql from "graphql-tag";

const KILLMAIL = gql`
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

const KILLMAILS = gql`
    query EntityKillmails($entity: Entity!, $id: Int!, $page: Int = 1) {
        killmails: killmailsByEntityID(entity: $entity, id: $id, page: $page) {
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

const RECENT_KILLMAILS = gql`
    query RecentKillmails($page: Int = 1) {
        killmails: killmailRecent(page: $page) {
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

export { KILLMAIL, KILLMAILS, RECENT_KILLMAILS };
