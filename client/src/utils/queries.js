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

export const QUERY_ALL_PARKING = gql`
query getAllParking($city: String,$startDate:String){
      getAllParking(city: $city, startDate:$startDate){
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
        }
      }
}
`;