import {gql} from '@apollo/client';
const getQuery = gql`
    {
        temporaryStorageDatas{
            drum{
                drum{
                    place_of_occurence
                }
            }
            storage_id
            longitude
            latitude
        }
    }
`
const getBooksQuery = gql`
  {
    drums(first: 5) {
        id
        sensor
        classification
        type
        place_of_occurence
        currentStatus
    }
  }`

  export {getBooksQuery, getQuery};

