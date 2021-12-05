import serial
import datetime 
import threading 
from EthereumHandler import EthereumHandler
from time import time, sleep, mktime
eth2 = EthereumHandler()


starttime = time()
sensorId = 6
def DateTimeToUNIX(date, time):
    print("DateUNIX is: ", date)
    print("TimeUNIX is: ", time)
    year = int("20"+date[0:2].lstrip('0'))
    month = int(date[2:4].lstrip('0'))
    day = int(date[4:6].lstrip('0'))

    hour = int(time[0:2].lstrip('0'))

    minute = int(time[2:4].lstrip('0'))
    second = int(time[4:6].lstrip('0'))

    datetimey = datetime.datetime(year, month, day, hour, minute)
    print(datetimey)
    timestamp = mktime(datetimey.timetuple())
    print("Timestamp is: ", timestamp)
    return int(timestamp)




def writeSensorDataToBlockchain():
    try:
        ser = serial.Serial('/dev/ttyACM0', 115200)
        print("reading new value ...")
        ser_bytes = ser.readline()
        # decoded_bytes = float(ser_bytes[0:len(ser_bytes)-2].decode("utf-8"))
        bytes_array = (ser_bytes.decode('utf-8')).split(',')
        print("The length is: ", len(bytes_array))
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
                dicValues[key] = bytes_array[id] if bytes_array[id] else "0"
                if key!="Date" and key!="Time":
                    numeric_filter = filter(str.isdigit, dicValues[key])
                    numeric_string = "".join(numeric_filter)
                    dicValues[key] = int(numeric_string)
            print("Here, the value is : ",dicValues)
            UNIXtimestamp = DateTimeToUNIX(dicValues["Date"], dicValues["Time"])
            eth2.passSensorData(sensorId, UNIXtimestamp, \
            dicValues["Latitude"], dicValues["Longitude"], dicValues["Acceleration X"], \
            dicValues["Acceleration Y"], dicValues["Acceleration Z"], dicValues["Temperature"], \
            dicValues["Humidity"], dicValues["Radioactivity"], 0)
            return True
        else:
            for key in dicID:
                id = dicID[key]
                dicValues[id] = 0
            return False
        ser.flushInput()

    except Exception as e:
        print(e)
thread = threading.Thread(target = writeSensorDataToBlockchain)
while True:
    if writeSensorDataToBlockchain()==False:
        continue
    sleep(120.0)
