import gql from 'graphql-tag';

export const QUERY_ALL_PARKING = gql`
  {
    getAllParking {
      _id
      apt
      street
      city
      state
      zip
      isCoveredParking
    }
  }
`;