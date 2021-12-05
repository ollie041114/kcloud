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
        description = self.data_json['networks']['3']['address']
        return (description)
    def get_abi(self):
        data_abi = self.data_json['abi']
        return data_abi

    def __init__(self):
        self.data = open("../truffleSide/build/contracts/KCLOUD.json")
        self.data_json = json.load(self.data)


        self.infura_provider = 'https://ropsten.infura.io/v3/f54c17f8fd334d78bcb2117202fe7ce0'
        self.contract_address = self.get_address()
        self.private_key_string = "7ae4495b934af72e8ce1d5792f98c119f1d831690ee27dcfeee4c077d7f4f7b3"    

        self.w3 = Web3(Web3.HTTPProvider(self.infura_provider))
        f = open("../truffleSide/build/contracts/KCLOUD.json")

        

        self.KCLOUD = self.w3.eth.contract(address = self.contract_address, abi = self.get_abi())
 
        self.private_key_bytes = Web3.toBytes(hexstr=self.private_key_string)
        self.account = self.w3.eth.account.privateKeyToAccount(self.private_key_bytes)

    def passSensorData(self, _sensorId, _time, _latitude, _longitude, _accX, _accY, _accZ, _temp, _humi, _radio, _end):
        dataId = int(uuid.uuid1().int>>64)
        sensorId = int(_sensorId)
        time = int(_time)
        latitude = int(_latitude)
        longitude = int(_longitude)
        accX = int(_accX)
        accY = int(_accY)
        accZ = int(_accZ) 
        temp = int(_temp) 
        humi = int(_humi)
        radio = int(_radio)
        end = int(_end)
        self.KCLOUD_txn = self.KCLOUD.functions.passSensorData(\
            dataId, sensorId, time, latitude, longitude, accX, \
            accY, accZ, temp, humi, radio)\
        .buildTransaction({'chainId': 3, 'nonce': self.w3.eth.getTransactionCount(self.account._address)})
       # self.KCLOUD_txn = self.KCLOUD.functions.passSensorData(_sensorId, _time, [_latitude, _longitude, _accX, _accY, _accZ, _temp, _humi, _radio]).buildTransaction({'chainId': 3, 'gas': 8000000, 'gasPrice': self.w3.toWei('20', 'gwei'), 'nonce': self.w3.eth.getTransactionCount(self.account._address), 'value': 0})


        signed_txn = self.w3.eth.account.sign_transaction(self.KCLOUD_txn, private_key = self.private_key_bytes)

        self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        print("DataID: ",dataId, "SensorID:", sensorId);
        print(self.KCLOUD_txn)