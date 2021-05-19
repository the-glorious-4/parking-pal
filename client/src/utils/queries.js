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
            }
        }
    }
`;

export const QUERY_ACTIVE_RESERVATIONS = gql`
    query getConsumerReservations ($startDate: String) {
        getConsumerReservations (startDate: $startDate) {
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
            }
            stripeTransaction
        }
    }
`;

export const QUERY_ALL_PARKING = gql`
query getAllInventories($city: String,$startDate:String){
    getAllInventories(city: $city, startDate:$startDate){
        _id
        startDate,
        price
        isAvailable
        parkingPlace{
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
