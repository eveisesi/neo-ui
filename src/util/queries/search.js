import gql from "graphql-tag";

const SEARCHABLE_ENTITIES = gql`
    query($term: String!) {
        search(term: $term) {
            id
            name
            type
            image
        }
    }
`;

export { SEARCHABLE_ENTITIES };
