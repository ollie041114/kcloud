import time, threading
from time import mktime
from socket import *
import datetime 

# Use EthereumHandler
from EthereumHandler import EthereumHandler
eth2 = EthereumHandler()


host = '0.0.0.0'
port = 9988

def DateTimeToUNIX(date, time):
    print("DateUNIX is: ", date)
    print("TimeUNIX is: ", time)
    year = int("20"+date[0:2].lstrip('0'))
    month = int(date[2:4].lstrip('0'))
    day = int(date[4:6].lstrip('0'))

    hour = (time[0:2].lstrip('0'))
    if not hour:
        hour = int(0)
    else:
        hour = int(hour)
    minute = (time[2:4].lstrip('0'))
    if not minute:
        minute = int(0)
    else:
        minute = int(minute)
    second = (time[4:6].lstrip('0'))
    if not second:
        second = int(0)
    else:
        second = int(second)


    datetimey = datetime.datetime(year, month, day, hour, minute)
    print(datetimey)
    timestamp = mktime(datetimey.timetuple())
    print("Timestamp is: ", timestamp)
    return int(timestamp)

def pass_data(packetData):
    processedData = []

    ''' Remove all chracter('$') of packet
        and splitting each data '''
    for data in packetData:
        #print(data)
        tempList = data.split("$")

        if len(tempList) != 0:
            for tempData in tempList:
                processedData.append(tempData)
        else:
            processedData.append(data)

    ''' Remove duplicate data '''
    dataSet = set(processedData)
    eachData = list(dataSet)
    #print("[eachData]\n", eachData)

    finalData = []

    for module_data in eachData:
        finalData.append(module_data.split(","))
    #print("[finalData]\n", finalData)

    print("[Check received data]")
    nonce = 0
    for s_data in finalData:
        print("--------------------")
        dicValues = {
            "Sensor Id":s_data[0], 
            "UNIXtimestamp":DateTimeToUNIX(s_data[1], s_data[2]),
            "Latitude":s_data[3],
            "Longitude":s_data[4],
            "Acceleration X":s_data[5],
            "Acceleration Y":s_data[6],
            "Acceleration Z":s_data[7],
            "Temperature":s_data[8],
            "Humidity":s_data[9],
            "Radioactivity":s_data[10],
            "BatmV": s_data[11][:-2]
        }
        print(dicValues)
        print("--------------------")
        # UNIXtimestamp = DateTimeToUNIX(dicValues["Date"], dicValues["Time"])
        eth2.passSensorData(dicValues["Sensor Id"], dicValues["UNIXtimestamp"], \
            dicValues["Latitude"], dicValues["Longitude"], dicValues["Acceleration X"], \
            dicValues["Acceleration Y"], dicValues["Acceleration Z"], dicValues["Temperature"], \
            dicValues["Humidity"], dicValues["Radioactivity"], 0, nonce)
        nonce = nonce + 1

def receved_data_handler(sock, packetData):
    while True:
        data = sock.recv(1024)
        msg = data.decode(encoding="utf-8")
        #print("recv msg:", msg)

        ''' Remove end of packet '''
        if len(msg) != 0:
            ''' Remove first chracter('$') of packet
                and generate packetData '''
            packetData.append(msg[1:])

        ''' Check end of data '''
        if not data:
            pass_data(packetData)

            break

''' Server Socket open '''
server_socket = socket(AF_INET, SOCK_STREAM)
server_socket.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
server_socket.bind((host, port))
server_socket.listen()
print("TCP Socket Server Start")

''' Multiple client connection '''
while True:
    ''' Ready to connection'''
    client_sock, addr = server_socket.accept()
    packetData = []
    ''' Connection complete, Socket open, Thread assignment '''
    th = threading.Thread(target=receved_data_handler, args=(client_sock, packetData))
    th.start()
    print("Connected Client IP Address : ", addr)

server_socket.close()