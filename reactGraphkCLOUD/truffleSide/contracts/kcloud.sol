pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract KCLOUD {
    // events 
    event NewDrumEnrolled(string drum_id, uint time, string sensor_id);
    event DrumPackaged(string drum_id, uint time, string classification, string w_type, uint date_unix, string place_of_occurence, uint radioactive_concentration, uint pollution_level, string waste_acceptance_request);
    event DrumInTransit(string drum_id, uint time, string carrier, string transportation_schedule);
    event TemporaryStorage(string drum_id, uint time, uint longitude, uint latitude, uint storage_id,  string storage_schedule);
    event DrumInTransit2(string drum_id, uint time, string carrier, string transportation_schedule);    
    event TakingOver(string drum_id, uint time, string acquisition, string transferee, string transportation_schedule, string waste_acceptance_request);
    event NewAlarmEvent(uint data_id, string drum_id, string alarm);
    event AlarmDismissedEvent(uint data_id, string drum_id, string alarm);
    event SensorDataEvent(string drum_id, uint time, uint data_id, uint latitude, uint longitude, uint accX);
    event SensorDataEvent2(uint data_id, uint accZ, uint temp, uint humi, uint radio, string alarm);
    event GPSDataEvent(string drum_id, uint time, uint longitude, uint latitude);
    event sensorToDrumPairingEvent(string drum_id, string sensor_id);
  
    mapping (string => string) private sensorToDrumID;
    mapping (string => Drum) private drumIDToDrum;
    
    struct Drum{
        string drum_id;
        string classification;
        string w_type;
    }

    function enrollment(string memory drum_id, uint time, string memory sensor_id) public {
        emit NewDrumEnrolled(drum_id, time, sensor_id);        
        sensorToDrumID[sensor_id] = drum_id;
        
        Drum memory my_drum;
        my_drum.drum_id = drum_id;
        drumIDToDrum[drum_id] = my_drum;
    }

    
    function packaging(string memory drum_id, uint time, string memory classification, string memory w_type, uint date_unix, string memory place_of_occurence, uint radioactive_concentration, uint pollution_level, string memory waste_acceptance_request) public {
        drumIDToDrum[drum_id].classification = classification;
        drumIDToDrum[drum_id].w_type = w_type; 
        
        emit DrumPackaged(drum_id, time, classification, w_type, date_unix, place_of_occurence, radioactive_concentration, pollution_level, waste_acceptance_request);        
    }
    
    
    function checkGPS(string memory drum_id, uint time, uint decimals, uint longitude, uint latitude) private{
            emit GPSDataEvent(drum_id, time, longitude, latitude);
    }
    
    function transit(string memory drum_id, uint time, string memory carrier, string memory transportation_schedule) public {
           emit DrumInTransit(drum_id, time, carrier, transportation_schedule);
    }
    function transit2(string memory drum_id, uint time, string memory carrier, string memory transportation_schedule) public {
           emit DrumInTransit2(drum_id, time, carrier, transportation_schedule);
    }
    function checkRadio(string memory sensor_id, uint radio) public returns (string memory) {
        string memory drum_id = sensorToDrumID[sensor_id];
        
        string memory classification = drumIDToDrum[drum_id].classification;
        uint norm; 

        if (compareStrings(classification, "Concentrated waste liquid drum - cement solidification")){
            norm = uint256(10);
        }
        if (compareStrings(classification, "Concentrated waste liquid drum - Paraffin solidification")){
            norm = uint256(15);
        }
        if (compareStrings(classification, "Waste filter drum - cement solidifcation")){
            norm = uint256(10);
        }
        if (compareStrings(classification, "Waste resin drum - cement solidifcation")){
            norm = uint256(10);
        }
        if (compareStrings(classification, "Jagchadrum - Desalted Paper Compression")){
            norm = uint256(2);
        }

        string memory alarm;
            
        if (radio <= norm){
                alarm = "normal";
                //emit SensorDataEvent(drum_id, time, type_name[i], alarm, values[i], normal_range[i]);
        }
            
        if (radio > norm){
                alarm = "danger";
                //emit SensorDataEvent(drum_id, time, type_name[i], alarm, values[i], normal_range[i]);
        }
            
        if (radio - norm > 2) {
                alarm = "border";
                //emit SensorDataEvent(drum_id, time, type_name[i], alarm, values[i], normal_range[i]);
        }
            
        if (norm == 0) {
                alarm = "danger";
                //emit SensorDataEvent(drum_id, time, type_name[i], alarm, values[i], normal_range[i]);
        }
        
        return alarm; 
        }
    function changeSensor(string memory drum_id, string memory sensor_id) public {
            sensorToDrumID[sensor_id] = drum_id; 
            emit sensorToDrumPairingEvent(drum_id, sensor_id);
    }

    function passSensorData(uint data_id, string memory sensor_id, uint time, uint latitude, uint longitude, uint accX, uint accY, uint accZ, uint temp, uint humi, uint radio) public{
           string memory drum_id = sensorToDrumID[sensor_id];
           string memory alarm = checkRadio(sensor_id, radio);

           emit SensorDataEvent(drum_id, time, data_id, latitude, longitude, accX);
           emit SensorDataEvent2(data_id, accZ, temp, humi, radio, alarm);
    }
    function temporaryStorage(string memory drum_id, uint time, uint longitude, uint latitude, uint storage_id, string memory storage_schedule) public{
           emit TemporaryStorage(drum_id, time, longitude, latitude, storage_id, storage_schedule);
    }

    function takingOver(string memory drum_id, uint time, string memory acquisition, string memory transferee, string memory transportation_schedule, string memory waste_acceptance_handover) public {
           emit TakingOver(drum_id, time, acquisition, transferee, transportation_schedule, waste_acceptance_handover);
    }
    function compareStrings(string memory a, string memory b) private pure returns (bool) {
            return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function NewAlarm(uint data_id, string memory drum_id, string memory alarm) public {
           emit NewAlarmEvent(data_id, drum_id, alarm);
    }
    function dismissAlarm(uint data_id, string memory drum_id, string memory alarm) public {
            emit AlarmDismissedEvent(data_id, drum_id, alarm);
    }

}