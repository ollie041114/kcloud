import { BigInt } from "@graphprotocol/graph-ts"
import {
  kcloud,
  DrumInTransit,
  DrumPackaged,
  GPSDataEvent,
  NewDrumEnrolled,
  SensorDataEvent,
  TakingOver,
  TemporaryStorage
} from "../generated/kcloud/kcloud"
import {
  Drum,
  Sensor,
  DrumHistory,
  InTransitData,
  PackagingData,
  TemporaryStorageData,
  TakingOverData,
  SensorData,
} from "../generated/schema"


export function handleGPSDataEvent(event: GPSDataEvent): void {}

export function handleNewDrumEnrolled(event: NewDrumEnrolled): void {
  let new_drum = new Drum(event.params.drum_id.toHex());
  let new_sensor = new Sensor(event.params.sensor_id.toHex());

  new_sensor.drum = new_drum.id;

  let drumHistory = DrumHistory.load(event.params.drum_id.toHex());
  if (drumHistory == null){
    drumHistory = new DrumHistory(event.params.drum_id.toHex());
  }

  drumHistory.drum = new_drum.id;
  new_drum.currentStatus = "Enrolled";

  new_drum.save()
}



export function handleDrumPackaged(event: DrumPackaged): void {
  let my_drum = Drum.load(event.params.drum_id.toHex());

  let drumHistory = DrumHistory.load(event.params.drum_id.toHex());
    if (drumHistory == null){
      drumHistory = new DrumHistory(event.params.drum_id.toHex());
    }
  drumHistory.drum = my_drum.id;

  my_drum.classification = event.params.classification;
  my_drum.type = event.params.w_type;
  my_drum.date_unix = event.params.date_unix;
  my_drum.place_of_occurence = event.params.place_of_occurence;
  my_drum.currentStatus = "Packaged";
  my_drum.wasteAcceptanceRequest = event.params.waste_acceptance_request;
  let packagingData = new PackagingData(event.params.drum_id.toHex());
  drumHistory.packagingData = packagingData.id;  

  packagingData.wasteAcceptanceRequest = my_drum.wasteAcceptanceRequest;
  packagingData.classification = my_drum.classification;
  packagingData.type = my_drum.type;
  packagingData.date_unix = my_drum.date_unix;
  packagingData.place_of_occurence = my_drum.place_of_occurence;
  
  
  my_drum.save()
  packagingData.save()
  drumHistory.save()
}


export function handleDrumInTransit(event: DrumInTransit): void {
  let my_drum = Drum.load(event.params.drum_id.toHex());

  let drumHistory = DrumHistory.load(event.params.drum_id.toHex());
    if (drumHistory == null){
      drumHistory = new DrumHistory(event.params.drum_id.toHex());
    }
  drumHistory.drum = my_drum.id;

  
  my_drum.currentStatus = "In Transit";
    
  let inTransitData = new InTransitData(event.params.drum_id.toHex());
  drumHistory.inTransitData = inTransitData.id;  

  inTransitData.date_unix = event.params.time;
  inTransitData.carrier = event.params.carrier;
  inTransitData.transportation_schedule = event.params.transportation_schedule;
  //inTransitData.status = event.params.;
  drumHistory.inTransitData = inTransitData.id;
  
  my_drum.save()
  drumHistory.save()
  inTransitData.save()
}


export function handleTakingOver(event: TakingOver): void {
  let my_drum = Drum.load(event.params.drum_id.toHex());

  let drumHistory = DrumHistory.load(event.params.drum_id.toHex());
    if (drumHistory == null){
      drumHistory = new DrumHistory(event.params.drum_id.toHex());
    }
  drumHistory.drum = my_drum.id;
    
  my_drum.currentStatus = "Taken Over";
  my_drum.wasteAcceptanceRequest = event.params.waste_acceptance_request;
  let takingOverData = new TakingOverData(event.params.drum_id.toHex());
  drumHistory.takingOverData = takingOverData.id;  

  takingOverData.date_unix = event.params.time;
  takingOverData.acquisition = event.params.acquisition;
  takingOverData.transferee = event.params.transferee;
  takingOverData.transportation_schedule = event.params.transportation_schedule;
  takingOverData.wasteAcceptanceRequest = event.params.waste_acceptance_request;
  //inTransitData.status = event.params.;
  drumHistory.takingOverData = takingOverData.id;
  
  my_drum.save()
  drumHistory.save()
  takingOverData.save()
}

export function handleSensorDataEvent(event: SensorDataEvent): void {

}
export function handleTemporaryStorage(event: TemporaryStorage): void {
  let my_drum = Drum.load(event.params.drum_id.toHex());

  let drumHistory = DrumHistory.load(event.params.drum_id.toHex());
    if (drumHistory == null){
      drumHistory = new DrumHistory(event.params.drum_id.toHex());
    }
  drumHistory.drum = my_drum.id;

  
  my_drum.currentStatus = "In Temporary Storage";
    
  let temporaryStorageData = new TemporaryStorageData(event.params.drum_id.toHex());
  drumHistory.temporaryStorageData = temporaryStorageData.id;
  temporaryStorageData.date_unix = event.params.time;
  temporaryStorageData.storage_id = event.params.storage_id;
  temporaryStorageData.longitude = event.params.longitude;
  temporaryStorageData.latitude = event.params.latitude;
  temporaryStorageData.storage_schedule = event.params.storage_schedule;
 
  //inTransitData.status = event.params.;
  drumHistory.temporaryStorageData = temporaryStorageData.id;
  
  my_drum.save()
  drumHistory.save()
  temporaryStorageData.save()
}