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
    drums {
        id
        currentStatus
        date_unix
        classification
        type
        place_of_occurence

        drumHistory {
            inTransitData{
                carrier
                transportation_schedule
                status
                drum {
                  id
                }
            }
            packagingData{
                classification
                type
                date_unix
                place_of_occurence
                wasteAcceptanceRequest
            }
            temporaryStorageData{
                longitude
                latitude
                storage_schedule
            }
            takingOverData{
				acquisition
                transferee
                transportation_schedule
                wasteAcceptanceRequest
            }
        }
    }
  }`

  export {getBooksQuery, getQuery};

