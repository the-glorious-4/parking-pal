import gql from 'graphql-tag';

export const QUERY_USER_PROFILE = gql`
    {
        me {
            firstName,
            lastName,
            email,
            phone,
            parkingPlace {
                    _id
                    apt
                    street,
                    city,
                    state,
                    zip,
                    isCoveredParking
                    capacity
                    inventory {
                        startDate
                        price
                       
                    } 
            }
    
        }
     }
`;