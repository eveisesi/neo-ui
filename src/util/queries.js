import gql from "graphql-tag";

const RECENT_KILLMAILS = gql`
    query {
        killmails: killmailRecent(page: 1) {
            id
            hash
            killmail_time
            system {
                id
                name
                security
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
                }
                damageTaken
                position {
                    x
                    y
                    z
                }
                items {
                    id
                    itemTypeID
                    type {
                        id
                        name
                    }
                    items {
                        id
                        itemTypeID
                        type {
                            id
                            name
                        }
                    }
                }
            }
        }
    }
`;

const KILLMAIL = gql`
    query($id: Int!, $hash: String!) {
        killmail(id: $id, hash: $hash) {
            id
            hash
            killmail_time
            system {
                id
                name
                security
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
                items {
                    id
                    itemTypeID
                    flag
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

export { RECENT_KILLMAILS, KILLMAIL };
