import time, threading
from socket import *

'''
# Use EthereumHandler
from EthereumHandler import EthereumHandler
eth2 = EthereumHandler()
'''

host = '0.0.0.0'
port = 9988


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
    for s_data in finalData:
        print("--------------------")
        print("ID    : ", s_data[0])
        print("Date  : ", s_data[1])
        print("Time  : ", s_data[2])
        print("Lati  : ", s_data[3])
        print("Long  : ", s_data[4])
        print("Acc_X : ", s_data[5])
        print("Acc_Y : ", s_data[6])
        print("Acc_Z : ", s_data[7])
        print("Temp  : ", s_data[8])
        print("Humi  : ", s_data[9])
        print("Radio : ", s_data[10])
        print("BatmV : ", s_data[11][:-2])
        print("--------------------")

    '''
    # Use EthereumHandler
    for s_data in finalData:
        eth2.passSensorData(s_data[0], s_data[1], s_data[2], s_data[3],
                            s_data[4], s_data[5], s_data[6], s_data[7],
                            s_data[8], s_data[9], s_data[10], s_data[11][:-2])
    '''

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