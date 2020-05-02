import gql from "graphql-tag";

const RECENT_KILLMAILS = gql`
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

const KILLMAIL = gql`
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
const SEVENDAYMVK = gql`
    query {
        mvk: killmailTopByAge {
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

export { RECENT_KILLMAILS, KILLMAIL, SEVENDAYMVK };
