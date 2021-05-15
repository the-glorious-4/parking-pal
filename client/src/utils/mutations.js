import gql from "graphql-tag";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                firstName
                lastName
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $phone: String!) {
        addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, phone: $phone) {
            token
            user {
                _id
                firstName
                lastName
            }
        }
    }
`;
