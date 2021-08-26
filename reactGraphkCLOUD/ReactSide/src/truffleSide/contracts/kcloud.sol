pragma solidity ^0.8.6;


import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract KCLOUD {
    // events 
    event NewDrumEnrolled(uint drum_id, uint time, uint sensor_id);
    event DrumPackaged(uint drum_id, uint time, string classification, string w_type, uint date_unix, string place_of_occurence, uint dose_rate, string waste_acceptance_request);
    event DrumInTransit(uint drum_id, uint time, string carrier, string transportation_schedule);
    event TemporaryStorage(uint drum_id, uint time, uint longitude, uint latitude, uint storage_id,  string storage_schedule);
    event TakingOver(uint drum_id, uint time, string acquisition, string transferee, string transportation_schedule, string waste_acceptance_request);

    
    event SensorDataEvent(uint drum_id, uint time, string what, string message, uint value, uint expected_value);
    event GPSDataEvent(uint drum_id, uint time, uint longitude, uint latitude);
    
    
    
    function enrollment(uint drum_id, uint time, uint sensor_id) public {
        emit NewDrumEnrolled(drum_id, time, sensor_id);        
    }

    
    function packaging(uint drum_id, uint time, string memory classification, string memory w_type, uint date_unix, string memory place_of_occurence, uint dose_rate, string memory waste_acceptance_request) public {
        emit DrumPackaged(drum_id, time, classification, w_type, date_unix, place_of_occurence, dose_rate, waste_acceptance_request);        
    }
    
    function check(uint drum_id, uint time, uint decimals, uint cWLiquidD_CS, uint cWLiquidD_PS, uint WFilterD_CS, uint WResinD_CS, uint paper_compression) private {
        string memory alarm;
        
        uint[5] memory values = [cWLiquidD_CS, cWLiquidD_PS, WFilterD_CS, WResinD_CS, paper_compression];
        string[5] memory type_name = ["Concentrated Waste Liquid Drum - Cement Solidification", "Concentrated Waste Liquid Drum - Paraffin Solidification",
        "Waste filter drum - cement Solidification", "Waste resin drum - cement Solidification", "Jagchadrum - Desalted Paper Compression"]; 
        uint256[5] memory normal_range = [uint256(10), uint256(15), uint256(10), uint256(10), uint256(2)];
        
        
        // check if normal 
        for (uint i = 0; i <= values.length; i++){
            
            if (values[i] <= normal_range[i]){
                alarm = "normal";
                emit SensorDataEvent(drum_id, time, type_name[i], alarm, values[i], normal_range[i]);
            }
            
            if (values[i] > normal_range[i]){
                alarm = "danger";
                emit SensorDataEvent(drum_id, time, type_name[i], alarm, values[i], normal_range[i]);
            }
            
            if (normal_range[i] - values[i] > 2) {
                alarm = "border";
                emit SensorDataEvent(drum_id, time, type_name[i], alarm, values[i], normal_range[i]);
            }
            
            if (values[i] == 0) {
                alarm = "danger";
                emit SensorDataEvent(drum_id, time, type_name[i], alarm, values[i], normal_range[i]);
            }
        }
    }
    
    function checkGPS(uint drum_id, uint time, uint decimals, uint longitude, uint latitude) private{
        if (1 == 1) {
            emit GPSDataEvent(drum_id, time, longitude, latitude);
        }
    }
    struct SensorData{
        uint decimals;
        uint cWLiquidD_CS;
        uint cWLiquidD_PS;
        uint WFilterD_CS;
        uint WResinD_CS;
        uint paper_compression;
        uint longitude;
        uint latitude;
    }
    
    
    modifier checksSensorData(uint drum_id, uint time, uint[] memory sensor_data) {
        
        SensorData memory m = SensorData({
        
            decimals: sensor_data[0],
            cWLiquidD_CS: sensor_data[1],
            cWLiquidD_PS: sensor_data[2],
            WFilterD_CS: sensor_data[3],
            WResinD_CS: sensor_data[4],
            paper_compression: sensor_data[5],
            longitude: sensor_data[6],
            latitude: sensor_data[7]
        });
        
        check(drum_id, time, m.decimals, m.cWLiquidD_CS, m.cWLiquidD_PS, m.WFilterD_CS, m.WResinD_CS, m.paper_compression);
        checkGPS(drum_id, time, m.decimals, m.longitude, m.latitude);
        _;
    }
    
    function transit(uint drum_id, uint time, string memory carrier, string memory transportation_schedule) public {
           emit DrumInTransit(drum_id, time, carrier, transportation_schedule);
    }
    
    function passSensorData(uint drum_id, uint time, uint[] memory sensor_data) checksSensorData(drum_id, time, sensor_data) public{
                    
    }
    
    function temporaryStorage(uint drum_id, uint time, uint longitude, uint latitude, uint storage_id, string memory storage_schedule) public{
           emit TemporaryStorage(drum_id, time, longitude, latitude, storage_id, storage_schedule);
    }

    function takingOver(uint drum_id, uint time, string memory acquisition, string memory transferee, string memory transportation_schedule, string memory waste_acceptance_handover) public {
           emit TakingOver(drum_id, time, acquisition, transferee, transportation_schedule, waste_acceptance_handover);
    }
}