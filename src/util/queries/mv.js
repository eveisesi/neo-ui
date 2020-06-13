import gql from "graphql-tag";

const MOST_VALUABLE = gql`
    query(
        $category: Category = all
        $type: Entity = all
        $id: Int
        $age: Int = 7
        $limit: Int = 6
    ) {
        mv: mvByEntityID(
            category: $category
            entity: $type
            id: $id
            age: $age
            limit: $limit
        ) {
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

export { MOST_VALUABLE };
