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
from alarmChecking import raiseRadioAlarm
from alarmChecking import raiseGPSAlarm
from web3 import Web3
import codecs
import time as timely
import random
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

    def injectFakeData(self): 
        ConstCoordinates =  [
      [
        129.220133,
        35.237844
      ],
      [
        129.220818,
        35.238873
      ],
      [
        129.22151,
        35.239915
      ],
      [
        129.22154,
        35.239961
      ],
      [
        129.220378,
        35.240659
      ],
      [
        129.220377,
        35.240686
      ],
      [
        129.220368,
        35.241619
      ],
      [
        129.220518,
        35.242663
      ],
      [
        129.220699,
        35.243707
      ],
      [
        129.220839,
        35.244531
      ],
      [
        129.221068,
        35.245888
      ],
      [
        129.220931,
        35.248103
      ],
      [
        129.220738,
        35.250489
      ],
      [
        129.221627,
        35.252294
      ],
      [
        129.22302,
        35.254502
      ],
      [
        129.224199,
        35.25637
      ],
      [
        129.22529,
        35.258089
      ],
      [
        129.226376,
        35.259834
      ],
      [
        129.226925,
        35.262349
      ],
      [
        129.227259,
        35.263825
      ],
      [
        129.228064,
        35.26593
      ],
      [
        129.228889,
        35.268158
      ],
      [
        129.2299,
        35.270583
      ],
      [
        129.230771,
        35.272681
      ],
      [
        129.231646,
        35.274836
      ],
      [
        129.232303,
        35.276994
      ],
      [
        129.23284,
        35.280451
      ],
      [
        129.233605,
        35.285082
      ],
      [
        129.235132,
        35.289441
      ],
      [
        129.235192,
        35.289574
      ],
      [
        129.235444,
        35.290066
      ],
      [
        129.235879,
        35.291541
      ],
      [
        129.236423,
        35.29143
      ],
      [
        129.237349,
        35.294235
      ],
      [
        129.240258,
        35.295386
      ],
      [
        129.240452,
        35.295445
      ],
      [
        129.240196,
        35.296564
      ]
    ]

        coordinates = [[ 129.221005, 35.245507 ],[ 129.220935, 35.248061 ],[ 129.220771, 35.249657 ],[ 129.220943, 35.251197 ],[ 129.22326, 35.254883 ],[ 129.225193, 35.257944 ],[ 129.225394, 35.258148 ],[ 129.226935, 35.260116 ],[ 129.226503, 35.260214 ],[ 129.225732, 35.25916 ],[ 129.225193, 35.257944 ],[ 129.2274, 35.260647 ],[ 129.230817, 35.262274 ],[ 129.232548, 35.26329 ],[ 129.232895, 35.264133 ],[ 129.233716, 35.266458 ],[ 129.233644, 35.266538 ],[ 129.233786, 35.26652 ],[ 129.235344, 35.26652 ],[ 129.2368, 35.266458 ],[ 129.238135, 35.266591 ],[ 129.238645, 35.266389 ],[ 129.239286, 35.266385 ],[ 129.23938, 35.266992 ],[ 129.239631, 35.26715 ],[ 129.238445, 35.267492 ],[ 129.237429, 35.267703 ],[ 129.235747, 35.267711 ],[ 129.234761, 35.267715 ],[ 129.234749, 35.267715 ],[ 129.234669, 35.266529 ],[ 129.234603, 35.266526 ],[ 129.233786, 35.26652 ],[ 129.233716, 35.266458 ],[ 129.233737, 35.266574 ],[ 129.234022, 35.268203 ],[ 129.233156, 35.2697 ],[ 129.231253, 35.271124 ],[ 129.230803, 35.27176 ],[ 129.230837, 35.271883 ],[ 129.23154, 35.274133 ],[ 129.232586, 35.278702 ],[ 129.232688, 35.279458 ],[ 129.233333, 35.283421 ],[ 129.234007, 35.286954 ],[ 129.235192, 35.289574 ],[ 129.235257, 35.2897 ],[ 129.235879, 35.291541 ],[ 129.236423, 35.29143 ],[ 129.237293, 35.294074 ],[ 129.240301, 35.295399 ]]
        sensor_list = ["1", "0x320050", "0x610051", "0x3D0050", "0x1A0050"]
        
        # for sensorId in sensor_list:
        #     nonce = 0        
        # 
        x = 1
        nonce = 0
        sensorId = sensor_list[0]
        counter = 0
        for x in range(0, len(coordinates)):
            dataId = str(uuid.uuid1().int>>32)
            sensorId = "1"
            time = int(timely.time() + 60*x)
            longitude = int(coordinates[x][0]*10**6)
            latitude = int(coordinates[x][1]*10**6)
            accX = int(random.randint(23, 26))
            accY = int(random.randint(20, 25))
            accZ = int(random.randint(15, 25)) 
            temp = int(str(random.randint(32, 48)))
            humi = int(random.uniform(15, 20))
            radio = int(random.uniform(0, 3)*10)
            end = int(0)

            KCLOUD_txn = self.KCLOUD.functions.passSensorData(\
                dataId, sensorId, time, latitude, longitude, accX, \
                accY, accZ, temp, humi, radio)\
            .buildTransaction({'chainId': 1500, 'gas': 800000, 'gasPrice': self.w3.toWei('200', 'gwei'), 'nonce': (self.w3.eth.getTransactionCount(self.account._address)+counter)})
            nonce = nonce + 1
            signed_txn = self.w3.eth.account.sign_transaction(KCLOUD_txn, private_key = self.private_key_bytes)
            txn_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
            counter = counter + 1

            if raiseRadioAlarm(radio, time):
                KCLOUD_txn = self.KCLOUD.functions.generateRadioAlarm(dataId, sensorId, time)\
                .buildTransaction({'chainId': 1500, 'gas': 800000, 'gasPrice': self.w3.toWei('200', 'gwei'), 'nonce': (self.w3.eth.getTransactionCount(self.account._address)+counter)})
                nonce = nonce + 1
                signed_txn = self.w3.eth.account.sign_transaction(KCLOUD_txn, private_key = self.private_key_bytes)
                txn_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
                
                counter = counter + 1
            if raiseGPSAlarm(coordinates[x], dataId, sensorId, time, ConstCoordinates):
                KCLOUD_txn = self.KCLOUD.functions.generateGPSAlarm(dataId, sensorId, time)\
                .buildTransaction({'chainId': 1500, 'gas': 800000, 'gasPrice': self.w3.toWei('200', 'gwei'), 'nonce': (self.w3.eth.getTransactionCount(self.account._address)+counter)})
                nonce = nonce + 1
                signed_txn = self.w3.eth.account.sign_transaction(KCLOUD_txn, private_key = self.private_key_bytes)
                txn_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
            
                counter = counter + 1
            print(txn_hash)

    def enrollDrum(self):
        for x in range(0, 3):
            KCLOUD_txn = self.KCLOUD.functions.passSensorData(\
            1+x, "sensorId", 1, 1, 1, 1, \
            1, 1, 1, 1, 1)\
        .buildTransaction({'chainId': 1500, 'gas': 800000, 'gasPrice': self.w3.toWei('20', 'gwei'), 'nonce': (self.w3.eth.getTransactionCount(self.account._address) + x)})
  
            signed_txn = self.w3.eth.account.sign_transaction(KCLOUD_txn, private_key = self.private_key_bytes)
            txn_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
            print(txn_hash)
    def passSensorData(self, _sensorId, _time, _latitude, _longitude, _accX, _accY, _accZ, _temp, _humi, _radio, _end, nonce):
        dataId = int(uuid.uuid1().int>>32)
        sensorId = str(_sensorId)
        time = int(_time)
        latitude = int(_latitude)
        longitude = int(_longitude)
        accX = int(_accX)
        accY = int(_accY)
        accZ = int(_accZ) 
        temp = int(float(_temp)*100) 
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
        .buildTransaction({'chainId': 1500, 'gas': 800000, 'gasPrice': self.w3.toWei('20', 'gwei'), 'nonce': (self.w3.eth.getTransactionCount(self.account._address) + nonce)})
       # self.KCLOUD_txn = self.KCLOUD.functions.passSensorData(_sensorId, _time, [_latitude, _longitude, _accX, _accY, _accZ, _temp, _humi, _radio]).buildTransaction({'chainId': 3, 'gas': 8000000, 'gasPrice': self.w3.toWei('20', 'gwei'), 'nonce': self.w3.eth.getTransactionCount(self.account._address), 'value': 0})


        signed_txn = self.w3.eth.account.sign_transaction(KCLOUD_txn, private_key = self.private_key_bytes)
        txn_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)

        print(KCLOUD_txn)
        print(txn_hash.hex())
eth2 = EthereumHandler()
eth2.injectFakeData()
