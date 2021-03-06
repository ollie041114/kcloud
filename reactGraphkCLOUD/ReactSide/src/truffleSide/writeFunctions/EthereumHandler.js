import { contract, signedTransaction, web3 } from "./signedTransact";

class EthereumHandler {
    constructor(){}

    async _enrollment(drum_id, time, sensor_id, globalCallback) {
        const func = contract.methods.enrollment(
            web3.utils.toBN(drum_id),
            web3.utils.toBN(time),
            web3.utils.toBN(sensor_id)
        )
        .encodeABI();
        signedTransaction(func, globalCallback);
    }

    _packaging(drum_id, time, classification, w_type, date_unix, place_of_occurence, dose_rate, fileUrl, globalCallback) {
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
            signedTransaction(func, globalCallback);
    }

    _transit(drum_id, time, carrier, transportation_schedule, globalCallback) {
        const func = contract.methods.transit(
            web3.utils.toBN(drum_id), 
            web3.utils.toBN(time), 
            carrier.toString(), 
            transportation_schedule.toString()
            )
            .encodeABI();
            signedTransaction(func, globalCallback);
    }

    _temporaryStorage(drum_id, time, longitude, latitude, storage_id, storage_schedule, globalCallback) {
        const func = contract.methods.temporaryStorage(
            web3.utils.toBN(drum_id), 
            web3.utils.toBN(time), 
            web3.utils.toBN(longitude), 
            web3.utils.toBN(latitude), 
            web3.utiils.toBN(storage_id), 
            storage_schedule.toString()
            )
            .encodeABI();
            signedTransaction(func, globalCallback);
    }

    _takingOver(drum_id, time, acquisition, transferee, transportation_schedule, fileUrl, globalCallback) {
        const func = contract.methods.takingOver(
            web3.utils.toBN(drum_id), 
            web3.utils.toBN(time), 
            acquisition.toString(), 
            transferee.toString(), 
            transportation_schedule.toString(), 
            fileUrl.toString()
            )
            .encodeABI();
            signedTransaction(func, globalCallback);
    }
}

export default EthereumHandler;