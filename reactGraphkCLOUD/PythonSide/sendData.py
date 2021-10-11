import serial
import time
from EthereumHandler import EthereumHandler
from time import time, sleep
ser = serial.Serial('/dev/ttyACM0', 115200)
ser.flushInput()
eth2 = EthereumHandler()


starttime = time()
sensorId = 2

def writeSensorDataToBlockchain():
    try:
        print("reading new value ...")
        ser_bytes = ser.readline()
        # decoded_bytes = float(ser_bytes[0:len(ser_bytes)-2].decode("utf-8"))
        bytes_array = (ser_bytes.decode('utf-8')).split(',')
        print(len(bytes_array))
        dicID = {
            "Sensor Id":0, 
                "Date":1,
                "Time":2,
                "Latitude":3,
                "Longitude":4,
                "Acceleration X":5,
                "Acceleration Y":6,
                "Acceleration Z": 7,
                "Temperature":8,
                "Humidity":9,
                "Radioactivity":10
        }
        dicValues = {
                "Sensor Id":0, 
                "Date":0,
                "Time":0,
                "Latitude":0,
                "Longitude":0,
                "Acceleration X":0,
                "Acceleration Y":0,
                "Acceleration Z":0,
                "Temperature":0,
                "Humidity":0,
                "Radioactivity":0
        }
        if (len(bytes_array) == 11):
            print(bytes_array)
            for key in dicID:
                id = dicID[key]
                dicValues[id] = bytes_array[id] if bytes_array[id] else "0"
                numeric_filter = filter(str.isdigit, dicValues[id])
                numeric_string = "".join(numeric_filter)
                dicValues[id] = int(numeric_string)
                print(key + " is "+ str(dicValues[id]))
        else:
            for key in dicID:
                id = dicID[key]
                dicValues[id] = 0
        eth2.passSensorData(sensorId, dicValues["Time"], \
            dicValues["Latitude"], dicValues["Longitude"], dicValues["Acceleration X"], \
            dicValues["Acceleration Y"], dicValues["Acceleration Z"], dicValues["Temperature"], \
            dicValues["Humidity"], dicValues["Radioactivity"], 0)

    except Exception as e:
        print(e)

while True:
    writeSensorDataToBlockchain()
    sleep(120.0)