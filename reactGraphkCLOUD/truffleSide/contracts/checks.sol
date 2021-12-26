pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract checks {

    function between(uint x, uint min, uint max) private returns (bool){
        return x >= min && x <= max;
    }
    function basic_check(uint radio, uint min, uint max, uint variation) private returns (string memory){
        if (between(radio, min, max)){
            return "Normal";        
        }
        if (between(radio, min - variation, max + variation)){
            return "Border";
        }
        if (!between(radio, min - variation, max + variation)){
            return "Danger";
        }
        if (radio==0){
            return "Border";
        }
        return "Problem";
    }
      function append(string memory a, string memory b) public returns (string memory) {
        return string(abi.encodePacked(a, b));
    }
    function uint2str(uint _i) public returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
    function checkTemperature(string memory sensor_id, uint temperature) public returns (string memory) {
        uint max = uint(22);
        uint min = uint(32);
        uint variation = uint(5);
        return basic_check(temperature, min, max, variation);
    }
    function checkRadio(string memory sensor_id, uint radio) public returns (string memory) {
        uint max = uint(0);
        uint min = uint(5);
        uint variation = uint(2);
        return basic_check(radio, min, max, variation);
    }
    function checkHumidity(string memory sensor_id, uint humidity) public returns (string memory) {
        uint max = uint(22);
        uint min = uint(44);
        uint variation = uint(10);
        return basic_check(humidity, min, max, variation);
    }
}