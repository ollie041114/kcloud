import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import BrandingWatermarkTwoToneIcon from '@material-ui/icons/BrandingWatermarkTwoTone';
import PanToolTwoToneIcon from '@material-ui/icons/PanToolTwoTone';
import TimelapseTwoToneIcon from '@material-ui/icons/TimelapseTwoTone';
import FeaturedVideoTwoToneIcon from '@material-ui/icons/FeaturedVideoTwoTone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faArchive, faShuttleVan, faPeopleCarry, faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { NoSchemaIntrospectionCustomRule } from 'graphql';

export var itemsList = []


// Fetch it the drum, it will give you a list of history! 
export function getExtendedDrumData(drum, props) {
    var packagingData;
    var inTransitData;
    var takingOverData;
    var temporaryStorageData;
    var history = drum.drumHistory[0];
    var missing_label = "not yet available";
    if (history) {
        if (history.packagingData && history) { packagingData = history.packagingData } else {
            packagingData = {
                classification: missing_label,
                date_unix: missing_label,
                place_of_occurence: missing_label,
                type: missing_label,
                wasteAcceptanceRequest: missing_label
            }
        };
        if (history.inTransitData) { inTransitData = history.inTransitData } else {
            inTransitData = {
                carrier: missing_label,
                transportation_schedule: missing_label,
                status: missing_label,
                type: missing_label
            }
        };
        if (history.takingOverData) { takingOverData = history.takingOverData } else {
            takingOverData = {
                acquisition: missing_label,
                transferee: missing_label,
                transportation_schedule: missing_label,
                wasteAcceptanceRequest: missing_label
            }
        };
        if (history.temporaryStorageData) { temporaryStorageData = history.temporaryStorageData } else {
            temporaryStorageData = {
                storage_id: missing_label,
                longitude: missing_label,
                latitude: missing_label,
                storage_schedule: missing_label
            };
        };
    } else {
        packagingData = {
            classification: missing_label,
            date_unix: missing_label,
            place_of_occurence: missing_label,
            type: missing_label,
            wasteAcceptanceRequest: missing_label
        };
        inTransitData = {
            carrier: missing_label,
            transportation_schedule: missing_label,
            status: missing_label,
            type: missing_label
        };
        takingOverData = {
            acquisition: missing_label,
            transferee: missing_label,
            transportation_schedule: missing_label,
            wasteAcceptanceRequest: missing_label
        };
        temporaryStorageData = {
            storage_id: missing_label,
            longitude: missing_label,
            latitude: missing_label,
            storage_schedule: missing_label
        };

    }
    var ExtendedStatusTracker
    var StatusArray = ["Enrolled", "Packaged", "In Transit", "Taken Over", "In Temporary Storage"];
    var ColorArray = ["grey", "grey", "grey", "grey", "grey"];
    for (var i = 0; i < StatusArray.length; i++) {
        if (StatusArray[i] != drum.currentStatus) {
            ColorArray[i] = "primary";
        } else {
            ExtendedStatusTracker = i;
            ColorArray[i] = "primary";
            break;
        }
    }
    var itemsList = [
        {
            text: "Enrolled",
            rawIcon: faFileAlt,
            icon: <FontAwesomeIcon icon={faFileAlt} />,
            color: ColorArray[0],
            data: {
                id: drum.sensor.id,
                sensorId: 5,
                date_unix: drum.date_unix
            }
        }, {
            text: "Packaged",
            rawIcon: faArchive,
            icon: <FontAwesomeIcon icon={faArchive} />,
            color: ColorArray[1],
            data: {
                classification: packagingData.classification,
                date_unix: packagingData.date_unix,
                place_of_occurence: packagingData.place_of_occurence,
                type: packagingData.type,
                wasteAcceptanceRequest: packagingData.wasteAcceptanceRequest
            }
        }, {
            text: 'In Transit',
            rawIcon: faShuttleVan,
            icon: <FontAwesomeIcon icon={faShuttleVan} />,
            color: ColorArray[2],
            data: {
                carrier: inTransitData.carrier,
                transportation_schedule: inTransitData.transportation_schedule,
                status: inTransitData.status,
                type: inTransitData.type
            }
        }, {
            text: 'Taken Over',
            rawIcon: faPeopleCarry,
            icon: <FontAwesomeIcon icon={faPeopleCarry} />,
            color: ColorArray[3],
            data: {
                acquisition: takingOverData.acquisition,
                transferee: takingOverData.transferee,
                transportation_schedule: takingOverData.transportation_schedule,
                wasteAcceptanceRequest: takingOverData.wasteAcceptanceRequest
            }
        }, {
            text: 'In Temporary Storage',
            rawIcon: faWarehouse,
            icon: <FontAwesomeIcon icon={faWarehouse} />,
            color: ColorArray[4],
            data: {
                storage_id: temporaryStorageData.storage_id,
                longitude: temporaryStorageData.longitude,
                latitude: temporaryStorageData.latitude,
                storage_schedule: temporaryStorageData.storage_schedule
            }
        }];
    var ExtendedStatus = itemsList[ExtendedStatusTracker];
    var sensorData = drum.sensorData;

    // Constructing the radioactivity data 
    function between(x, min, max) {
        console.log("X is "+x+", Min is "+min+", Max is "+max, ", Verdict is "+(x >= min && x <= max));
        return x >= min && x <= max;
    }

    function determine_status(status) {
        var status;
        var description;
        if (status == "Normal") {
            description = "Information matches, or stays within normal ranges"
            return description;
        }
        if (status == "Danger") {
            description = "Information is inconsistent, or is out of normal range"
        }
        return description;
    }
    function determine_color(status) {
        var color;
        switch (status) {
            case "Normal":
                color = "#56f000"
                break
            case "Danger":
                color = "#ff3838"
                break
        }
        return color;
    }
    // Radioactiviy
    var radio = sensorData.map(item => {
        var norm = [0, 2];
        var variation = 1;
        var value = item.radio/10;
        var status = item.rAlarm.message;
        var description = determine_status(status)
        var color = determine_color(status)
        return {
            name: "Radioactivity",
            value: value,
            unit: "uSV/h",
            date: new Date(item.time_recorded*1000),
            // Value, [upper_normal, lower_normal], border_boundary
            status: status,
            description: description,
            norm: norm,
            color: color
        };
    })
    // Temperature
    var temp = sensorData.map(item => {
        var norm = [0, 40];
        var variation = 5;
        var value = item.temp;
        var status = item.tAlarm.message
        var description = determine_status(status)
        var color = determine_color(status)
        return {
            name: "Temperature",
            value: value,
            unit: "°C",
            date: new Date(item.time_recorded*1000),
            // Value, [upper_normal, lower_normal], border_boundary
            description: description,
            status: status,
            norm: norm,
            color: color
        };
    })
    // Acceleration
    var acceleration = sensorData.map(item => {
        var norm = [0, 55];
        var variation = 5;
        var status=item.aAlarm.message
        var description = determine_status(status)
        var color = determine_color(status)
        return {
            name: "Acceleration",
            value: (item.accX + item.accZ)/2,
            unit: "m/s",
            date: new Date(item.time_recorded*1000),
            // Value, [upper_normal, lower_normal], border_boundary
            status: status,
            description: description,
            norm: norm,
            color: color
        };
    })
    // Current Status
    var currentStatus = sensorData.map(item => {
        var norm = [22, 32];
        var variation = 5;
        var status = (item.rAlarm.message)
        var description = determine_status(status)
        var color = determine_color(status)
        return {
            value: item.currentStatus,
            date: new Date(item.time_recorded*1000),
            currentStatus: item.currentStatus,
            status: status,
            description: description,
            norm: norm,
            color: color
        };
    })
    var time_recorded = sensorData.map(item => {
        return new Date(item.time_recorded*1000);
    })

    var drumInformation = {
        basicInfo: {
            id: drum.id,
            classification: drum.classification,
            type: drum.type,
            date_unix: drum.date_unix,
            place_of_occurence: drum.place_of_occurence,
            currentStatus: drum.currentStatus,
            icon: ExtendedStatus.icon,
        },
        sensorData: {
            sensor_id: drum.sensor.id,
            radio: radio, // array of radioactivity points, each with status and color
            temp: temp,
            acceleration: acceleration,
            currentStatus: currentStatus,
            time_recorded: time_recorded
        },
        fullDrumHistory: itemsList,
        currentStatusInfo: ExtendedStatus, // Actually just an item in itemsList corresponding to current status
        location: {
            type: "Point",
            coordinates: (props != null ? ([props[0], props[1]]) : ([0, 1]))
        },
        graphCopy: drum
    }
    return drumInformation;
}