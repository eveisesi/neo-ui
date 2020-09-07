import gql from "graphql-tag";

const KILLMAIL = gql`
    query Killmail($id: Int!) {
        killmail(id: $id) {
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
                    ticker
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
                    itemTypeID
                    flag
                    quantityDropped
                    quantityDestroyed
                    itemValue
                    totalValue
                    type {
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
    query Killmails($entity: Entity!, $id: Int!, $page: Int = 1) {
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
    query ($page: Int = 1) {
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
            attackers(finalBlowOnly: true) {
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
