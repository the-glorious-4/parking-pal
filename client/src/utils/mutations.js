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

export const ADD_PARKINGPLACE = gql`
    mutation addParkingPlace($apt: String!, $street: String!, $city: String!, $state: String!, $zip:String!, $isCoveredParking:Boolean!, $capacity: Int!) {
        addParkingPlace(apt:$apt, street: $street, city: $city, state: $state, zip: $zip, isCoveredParking:$isCoveredParking, capacity: $capacity) {
            user {
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

export const ADD_INVENTORY = gql`
    mutation addInventory($startDate: String!, $price: Int!, $parkingPlace: ID!) {
        addInventory(startDate:startDate,price:price,parkingPlace:$parkingPlace){
            _id
            startDate
            price
            isAvailable
            parkingPlace{
              _id
            }
          }
    }
`;
