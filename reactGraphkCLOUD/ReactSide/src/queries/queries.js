import { gql } from '@apollo/client';
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
        sensor{
            id
            sensorData{
                currentStatus 
                time_recorded
                GPS_longitude
                GPS_Latitude 
                accX
                accZ 
                temp 
                humidity
                radio
                alarm
            }
        }
        currentStatus
        date_unix
        classification
        type
        place_of_occurence
        drumHistory {
            inTransitData{
                date_unix
                carrier
                transportation_schedule
                status
            }
            packagingData{
                classification
                type
                date_unix
                place_of_occurence
                wasteAcceptanceRequest
            }
            temporaryStorageData{
                date_unix
                longitude
                latitude
                storage_schedule
            }
            takingOverData{
                date_unix
				acquisition
                transferee
                transportation_schedule
                wasteAcceptanceRequest
            }
        }
    }
  }`

export { getBooksQuery, getQuery };

