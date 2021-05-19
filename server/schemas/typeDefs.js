const { gql } = require("apollo-server-express");

/*

User - it can be provider / consumer
Parking place is master table for Parking Detail. as its info rarely get change
Invetory represents providers entry for parking availabilty it can be durarion or one day.
Reservation represents when Parking taken by Consumer and did payment process.

*/
const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    phone: String
    parkingPlace: [ParkingPlace]
    bookings: [Reservation]
  }

  type ParkingPlace {
    _id: ID
    apt: String
    street: String
    city: String
    state: String
    zip: String
    isCoveredParking: Boolean
    capacity: Int
    latLng: [String]
    provider: User
    inventory: [Inventory]
  }

  type Inventory {
    _id: ID
    startDate: String
    price: Int
    isAvailable: Boolean
    parkingPlace: ParkingPlace
  }

  type Reservation {
    _id: ID
    startDate: String
    parkingPlace: ParkingPlace
    consumer: User
    stripeSessionId: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Checkout {
    session: ID
  }

  type Query {
    user: User
    inventory(inventory: ID): [Inventory]
    getAllInventories(city: String, startDate: String): [Inventory]
    getInventoryById(_id: ID!): Inventory
    getMyInventories: [Inventory]
    getConsumerReservations(startDate: String): [Reservation]
    getMyReservations: [Reservation]
    checkout(price: Int!): Checkout
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      phone: String!
    ): Auth

    editUser(
      firstName: String
      lastName: String
      email: String
      password: String
      phone: String
    ): Auth

    addParkingPlace(
      apt: String!
      street: String!
      city: String!
      state: String!
      zip: String!
      isCoveredParking: Boolean!
      capacity: Int!
      latLng: [String]
    ): ParkingPlace

    editParkingPlace(
      _id: ID!
      apt: String
      street: String
      city: String
      state: String
      zip: String
      isCoveredParking: Boolean
      capacity: Int
      latLng: [String]
    ): ParkingPlace

    addInventory(startDate: String!, price: Int!, parkingPlace: ID!): Inventory
    login(email: String!, password: String!): Auth
    addReservation(
      startDate: String!
      parkingPlace: ID!
      inventoryId: ID!
      stripeSessionId: String!
      name: String!
      lastName: String!
      email: String!
      address: String!
      price: Int!
    ): Reservation
  }
`;

module.exports = typeDefs;
