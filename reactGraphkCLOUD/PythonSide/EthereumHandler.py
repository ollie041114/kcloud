# import json
# import serial
# from web3 import Web3
        # 
    # except:
        # print("Keyboard Interrupt")
        # break
# 
# Getting the json file
import json
import uuid
from web3 import Web3
import codecs

class EthereumHandler:
    def get_address(self):
        description = self.data_json['networks']['1500']['address']
        return (description)
    def get_abi(self):
        data_abi = self.data_json['abi']
        return data_abi

    def __init__(self):
        self.data = open("../truffleSide/build/contracts/KCLOUD.json")
        self.data_json = json.load(self.data)


        self.infura_provider = 'http://localhost:8545'
        self.contract_address = self.get_address()
        self.private_key_string = "fcf36e0625ea8cfdd7e771bea899f0816c4cf98a04d70df7f16d51a1cdc15f18"    

        self.w3 = Web3(Web3.HTTPProvider(self.infura_provider))
        f = open("../truffleSide/build/contracts/KCLOUD.json")

        

        self.KCLOUD = self.w3.eth.contract(address = self.contract_address, abi = self.get_abi())
 
        self.private_key_bytes = Web3.toBytes(hexstr=self.private_key_string)
        self.account = self.w3.eth.account.privateKeyToAccount(self.private_key_bytes)
    # def enrollDrum(self):
    #     for x in range(0, 3):
    #         KCLOUD_txn = self.KCLOUD.functions.passSensorData(\
    #         1+x, "sensorId", 1, 1, 1, 1, \
    #         1, 1, 1, 1, 1)\
    #     .buildTransaction({'chainId': 1500, 'gas': 800000, 'gasPrice': self.w3.toWei('20', 'gwei'), 'nonce': (self.w3.eth.getTransactionCount(self.account._address) + x)})
  
    #         signed_txn = self.w3.eth.account.sign_transaction(KCLOUD_txn, private_key = self.private_key_bytes)
    #         txn_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    #         print(txn_hash)
    def passSensorData(self, _sensorId, _time, _latitude, _longitude, _accX, _accY, _accZ, _temp, _humi, _radio, _end, nonce):
        dataId = str(uuid.uuid1().int>>32)
        sensorId = str(_sensorId)
        time = int(_time)
        latitude = int(float(_latitude)*10**5)
        longitude = int(float(_longitude)*10**5)
        accX = int(_accX)
        accY = int(_accY)
        accZ = int(_accZ) 
        temp = int(str(35.68*100)[0:2]) 
        humi = int(_humi)
        radio = int(float(_radio)*10)
        end = int(_end)
        print("Nonce is ",self.w3.eth.getTransactionCount(self.account._address))
        print("Address is ",self.account._address)
        print("The arguments are",dataId, " ",sensorId, " ",time, " ",latitude, " ",longitude, " ",accX, " ",\
            accY, " ", accZ, " ", temp, " ", humi, " ", radio)
        KCLOUD_txn = self.KCLOUD.functions.passSensorData(\
            dataId, sensorId, time, latitude, longitude, accX, \
            accY, accZ, temp, humi, radio)\
        .buildTransaction({'chainId': 1500, 'gas': 800000, 'gasPrice': self.w3.toWei('20', 'gwei'), 'nonce': (self.w3.eth.getTransactionCount(self.account._address))+nonce})
        signed_txn = self.w3.eth.account.sign_transaction(KCLOUD_txn, private_key = self.private_key_bytes)
        txn_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)

        print(KCLOUD_txn)
        print(txn_hash.hex())

eth2 = EthereumHandler()
# eth2.enrollDrum()