import gql from "graphql-tag";

export const QUERY_USER = gql`
  {
    user {
      _id
      firstName
      lastName
      email
      phone
      parkingPlace {
        _id
        apt
        street
        city
        state
        zip
        isCoveredParking
        capacity
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query checkout ($price: Int!) {
    checkout(price: $price) {
      session
    }
  }
`;
