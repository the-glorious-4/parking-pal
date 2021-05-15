const { gql } = require('apollo-server-express');

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
  phone:Int,
  parkingPlace: [ParkingPlace],
}

type ParkingPlace {
  _id: ID
  apt: String
  street: String
  city: String
  state: String
  zip:String
  isCoveredParking:Boolean
  capacity: Int
  price:Int
  provider: User


}

type Inventory {
  _id: ID
  startDate: String
  endDate:String
  parkingPlace : ParkingPlace
}

type Reservation {
  _id: ID
  startDate: String
  endDate:String
  parkingPlace : ParkingPlace
  consumer: User
  stripeTransaction : String
}

type Auth {
  token: ID
  user: User
}

type Query {
  Inventory(parkingPlace: ID): [Inventory]
  user: User
}

type Mutation {
  addUser(firstName: String!, lastName: String!, email: String!, password: String!,phone : String!): Auth
  
  addParkingPlace(apt: String!
    street: String!
    city: String!
    state: String!
    zip:String!
    isCoveredParking:Boolean!
    capacity: Int!
    price:Int!
    startDate:String!
    endDate:String
    provider:ID) : User

  availParking(startDate:String,endDate:String): Inventory
  login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;
