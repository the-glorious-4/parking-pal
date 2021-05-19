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
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $phone: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      phone: $phone
    ) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const ADD_PARKINGPLACE = gql`
  mutation addParkingPlace(
    $apt: String!
    $street: String!
    $city: String!
    $state: String!
    $zip: String!
    $isCoveredParking: Boolean!
    $capacity: Int!
    $latLng: [String]
  ) {
    addParkingPlace(
      apt: $apt
      street: $street
      city: $city
      state: $state
      zip: $zip
      isCoveredParking: $isCoveredParking
      capacity: $capacity
      latLng: $latLng
    ) {
      _id
      apt
      street
      city
      state
      zip
      isCoveredParking
      capacity
      latLng
      provider {
        _id
        email
      }
    }
  }
`;

export const ADD_INVENTORY = gql`
  mutation addInventory($startDate: String!, $price: Int!, $parkingPlace: ID!) {
    addInventory(
      startDate: startDate
      price: price
      parkingPlace: $parkingPlace
    ) {
      _id
      startDate
      price
      isAvailable
      parkingPlace {
        _id
        latLng
      }
    }
  }
`;

export const ADD_RESERVATION = gql`
  mutation addReservation(
    $inventoryId: ID!
    $startDate: String!
    $stripeTransaction: String!
    $parkingPlace: ID!
    $name: String!
    $lastName: String!
    $email: String!
    $address: String!
    $price: Int!
  ) {
    addReservation(
      inventoryId: $inventoryId
      startDate: $startDate
      stripeTransaction: $stripeTransaction
      parkingPlace: $parkingPlace
      name: $name
      lastName: $lastName
      email: $email
      address: $address
      price: $price
    ) {
      _id
      startDate
      consumer {
        _id
      }
    }
  }
`;
