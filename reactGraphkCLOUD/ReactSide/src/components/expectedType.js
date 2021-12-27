// The typeof operator maps an operand to one of six values:
// "string", "number", "object", "function", "undefined" and "boolean".

function tryNumber(param) {
    try {
       if (param == ""|| param == null || isNaN(Number(param))){  
            throw new Error('oops');
        } else {
        return true;
        }
      } catch(e) {
        return "number";
      }
}
function tryString(param) {
    try {
        if (param == null || param === ""){
            console.log(param.toString()); 
            throw new Error('oops');            
         }
         return true;
       } catch(e) {
        console.log(e);
         return "string";
       }
}

const expectedType = {
    "enrollment": {
        "Drum id": (e)=> tryString(e),
        "Time": (e)=> tryNumber(e),
        "Sensor Id": (e)=> tryString(e)
    },
    "packaging": {
        "Drum id": (e)=> tryString(e),
        "Time": (e)=> tryNumber(e),
        "Classification": (e)=> tryString(e),
        "Type": (e)=> tryString(e),
        "Date of Occurence": (e)=> tryNumber(e),
        "Place of Occurence": (e)=> tryString(e),
        "Surface radiation dose rate": (e)=> tryNumber(e),
        "Waste Acceptance Request": (e)=> tryString(e)
    },
    "transit": {
        "Drum id": (e)=> tryString(e),
        "Time": (e)=> tryNumber(e),
        "Carrier": (e)=> tryString(e),
        "Transportation Schedule": (e)=> tryString(e)
    },
    "temporaryStorage": {
        "Drum id": (e)=> tryString(e),
        "Time": (e)=> tryNumber(e),
        "Storage id": (e)=> tryNumber(e),
        "Longitude": (e)=> tryNumber(e),
        "Latitude": (e)=> tryNumber(e),
        "Storage schedule": (e)=> tryString(e)
    },
    "takingOver": {
        "Drum id": (e)=> tryString(e),
        "Time": (e)=> tryNumber(e),
        "Acquisition": (e)=> tryString(e),
        "Transferee": (e)=> tryString(e),
        "Transportation schedule": (e)=> tryString(e),
        "Waste acceptance handover": (e)=> tryString(e),
    }
};
export function checkConform(stage, params){
    var counter = -1;
    var obj = expectedType[stage]
    for (const property in obj) {
        counter++;
        console.log(params[counter])
        var result = obj[property](params[counter]);
        if (result != true){
            return `*${property} should be a ${result}`;           
        } else {
            continue;
        }
    }
    return ("Ok")
}


console.log(checkConform("enrollment", ["12", "ed", "12"]));