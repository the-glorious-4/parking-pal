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
        latLng
        inventory {
          _id
          startDate
          price
          isAvailable
        }
      }
    }
  }
`;

export const INVENTORY_HISTORY = gql`
  {
    getMyInventories {
      _id
      startDate
      price
      isAvailable
      parkingPlace {
        _id
        apt
        street
        city
        state
        zip
        isCoveredParking
        capacity
        latLng
      }
    }
  }
`;

export const QUERY_ACTIVE_RESERVATIONS = gql`
  query getConsumerReservations($startDate: String) {
    getConsumerReservations(startDate: $startDate) {
      _id
      startDate
      consumer {
        _id
      }
      parkingPlace {
        _id
        apt
        street
        city
        state
        zip
        isCoveredParking
        capacity
        latLng
      }
      stripeSessionId
    }
  }
`;

export const QUERY_ALL_PARKING = gql`
  query getAllInventories($city: String, $startDate: String) {
    getAllInventories(city: $city, startDate: $startDate) {
      _id
      startDate
      price
      isAvailable
      parkingPlace {
        _id
        apt
        street
        city
        state
        isCoveredParking
        capacity
        latLng
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query checkout($price: Int!) {
    checkout(price: $price) {
      session
    }
  }
`;
