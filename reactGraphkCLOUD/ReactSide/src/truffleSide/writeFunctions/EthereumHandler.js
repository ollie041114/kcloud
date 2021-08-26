import { contract, signedTransaction, web3 } from "./signedTransact";

class EthereumHandler {
    constructor(){}

    _enrollment(drum_id, time, sensor_id) {
        const drum_id2 = parseInt(drum_id);
        const time2 = parseInt(time);
        const sensor_id2 = parseInt(sensor_id);
        const func = contract.methods.enrollment(
            web3.utils.toBN(drum_id),
            web3.utils.toBN(parseInt(sensor_id)),
            web3.utils.toBN(time)
        )
        .encodeABI();
        signedTransaction(func);
    }

    _packaging(drum_id, time, classification, w_type, date_unix, place_of_occurence, dose_rate, fileUrl) {
        const func = contract.methods.packaging(
            web3.utils.toBN(drum_id), 
            web3.utils.toBN(time), 
            classification.toString(), 
            w_type.toString(), 
            web3.utils.toBN(date_unix), 
            place_of_occurence.toString(), 
            web3.utils.toBN(dose_rate),
            fileUrl.toString()
            )
            .encodeABI();
        signedTransaction(func);
    }

    _transit(drum_id, time, carrier, transportation_schedule) {
        const func = contract.methods.transit(
            web3.utils.toBN(drum_id), 
            web3.utils.toBN(time), 
            carrier.toString(), 
            transportation_schedule.toString()
            )
            .encodeABI();
        signedTransaction(func);
    }

    _temporaryStorage(drum_id, time, longitude, latitude, storage_id, storage_schedule) {
        const func = contract.methods.temporaryStorage(
            web3.utils.toBN(drum_id), 
            web3.utils.toBN(time), 
            web3.utils.toBN(longitude), 
            web3.utils.toBN(latitude), 
            web3.utiils.toBN(storage_id), 
            storage_schedule.toString()
            )
            .encodeABI();
        signedTransaction(func);
    }

    _takingOver(drum_id, time, acquisition, transferee, transportation_schedule, hash_waste_acceptance, fileUrl) {
        const func = contract.methods.takingOver(
            web3.utils.toBN(drum_id), 
            web3.utils.toBN(time), 
            acquisition.toString(), 
            transferee.toString(), 
            transportation_schedule.toString(), 
            web3.utils.toBN(hash_waste_acceptance),
            fileUrl.toString()
            )
            .encodeABI();
        signedTransaction(func);
    }
}

export default EthereumHandler;