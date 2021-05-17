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
    provider: User
    reservations: [Reservation]
    inventory: [Inventory]
  }

  type Inventory {
    _id: ID
    startDate: String
    price:Int
    isAvailable:Boolean
    parkingPlace: ParkingPlace
  }

  type Reservation {
    _id: ID
    startDate: String
    parkingPlace: ParkingPlace
    consumer: User
    stripeTransaction: String
  }

  type Auth {
    token: ID
    user: User
  }

 
type Query {
    me: User  
    inventory(inventory: ID): [Inventory]
    getAllParking(city:String,startDate:String): [Inventory]
    getParkingByInventoryId(_id:ID!):Inventory
    getUsersHistory:User
}

type Mutation {
  
  addUser(
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    phone: String!
  ): Auth

  addParkingPlace(
    apt: String!
    street: String!
    city: String!
    state: String!
    zip: String!
    isCoveredParking: Boolean!
    capacity: Int!
  ): ParkingPlace

  addInventory(startDate: String!, price: Int!, parkingPlace: ID!): Inventory
  login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;



  
    // getAllInventoryByParkingId(startDate:String!,parkingPlace:ID!) : Inventory
    // getAllInventory(_id : ID!) : User
    // getActiveReservation(startDate:String): [ParkingPlace]