# This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
import math
import pickle

#eth2 = EthereumHandler()

def calcCrow(lat1, lon1, lat2, lon2):
  R = 6371 #km
  dLat = toRad(lat2-lat1)
  dLon = toRad(lon2-lon1)
  lat1 = toRad(lat1)
  lat2 = toRad(lat2)

  a = math.sin(dLat/2) * math.sin(dLat/2) + math.sin(dLon/2) * math.sin(dLon/2) * math.cos(lat1) * math.cos(lat2); 
  c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
  d = R * c
  return d
counter = 0

def raiseGPSAlarm(setCoordinate, data_id, sensor_id, time, ConstCoordinates):
  minimum = 0
  def checkDistance():
    maxAllowedDistance = 0.1 #km
    minimum = calcCrow(setCoordinate[1], setCoordinate[0], ConstCoordinates[0][1], ConstCoordinates[1][0])
    for i in range (0, len(ConstCoordinates)):
      distance = calcCrow(setCoordinate[1], setCoordinate[0], ConstCoordinates[i][1], ConstCoordinates[i][0])
      if (distance < minimum):
        minimum = distance
    print("The difference here is ")
    print(minimum)
    return minimum>maxAllowedDistance
  alreadyExists = False
  if checkDistance()==True:
    print(str(checkDistance())+", "+str(minimum))
    return True 
  else:
    return False
    #   eth2.passSensorData(dicValues["Sensor Id"], dicValues["UNIXtimestamp"], \
    #         dicValues["Latitude"], dicValues["Longitude"], dicValues["Acceleration X"], \
    #         dicValues["Acceleration Y"], dicValues["Acceleration Z"], dicValues["Temperature"], \
    #         dicValues["Humidity"], dicValues["Radioactivity"], 0, nonce)

def toRad(Value): 
    return Value * math.pi/ 180

coordinates = [[ 129.221005, 35.245507 ],[ 129.220935, 35.248061 ],[ 129.220771, 35.249657 ],[ 129.220943, 35.251197 ],[ 129.22326, 35.254883 ],[ 129.225193, 35.257944 ],[ 129.225394, 35.258148 ],[ 129.226935, 35.260116 ],[ 129.226503, 35.260214 ],[ 129.225732, 35.25916 ],[ 129.225193, 35.257944 ],[ 129.2274, 35.260647 ],[ 129.230817, 35.262274 ],[ 129.232548, 35.26329 ],[ 129.232895, 35.264133 ],[ 129.233716, 35.266458 ],[ 129.233644, 35.266538 ],[ 129.233786, 35.26652 ],[ 129.235344, 35.26652 ],[ 129.2368, 35.266458 ],[ 129.238135, 35.266591 ],[ 129.238645, 35.266389 ],[ 129.239286, 35.266385 ],[ 129.23938, 35.266992 ],[ 129.239631, 35.26715 ],[ 129.238445, 35.267492 ],[ 129.237429, 35.267703 ],[ 129.235747, 35.267711 ],[ 129.234761, 35.267715 ],[ 129.234749, 35.267715 ],[ 129.234669, 35.266529 ],[ 129.234603, 35.266526 ],[ 129.233786, 35.26652 ],[ 129.233716, 35.266458 ],[ 129.233737, 35.266574 ],[ 129.234022, 35.268203 ],[ 129.233156, 35.2697 ],[ 129.231253, 35.271124 ],[ 129.230803, 35.27176 ],[ 129.230837, 35.271883 ],[ 129.23154, 35.274133 ],[ 129.232586, 35.278702 ],[ 129.232688, 35.279458 ],[ 129.233333, 35.283421 ],[ 129.234007, 35.286954 ],[ 129.235192, 35.289574 ],[ 129.235257, 35.2897 ],[ 129.235879, 35.291541 ],[ 129.236423, 35.29143 ],[ 129.237293, 35.294074 ],[ 129.240301, 35.295399 ]]

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

def raiseRadioAlarm(radio, time):

  # Get the list of past temperature points, add the new point
  radioPoint = RadioPoint(radio, time)
  try:
    with open('config.dictionary', 'rb') as config_dictionary_file:
      listOfRadios = pickle.load(config_dictionary_file)
  except:
    listOfRadios = []
  listOfRadios.append(radioPoint)


  # Save the result
  with open('config.dictionary', 'wb') as config_dictionary_file:
    # Step 3
    pickle.dump(listOfRadios, config_dictionary_file)
  
  listOfRadios.sort(key=lambda x: x.time, reverse=True)
  
  startAlarmChecking = False
  timePassed = 0.0
  for i in range(0, len(listOfRadios)):
    radioPoint = listOfRadios[i]
    timePassed = (time-radioPoint.time)/(60*60)
    if abs(time-radioPoint.time)>60*60:
      startAlarmChecking = True
      break
  if startAlarmChecking==True:
    meanLastHour = sum([x.value for x in listOfRadios[0:i+1]])/len(listOfRadios[0:i+1])
    # print(temperature, meanLastHour)
    if abs(radio-meanLastHour)>(0.15*meanLastHour):
      print("Alarm generated")
      return True

  else:
    print("No alarm checking, only ", timePassed, " hours passed since first measurement")
    return False



class RadioPoint():
  def __init__(self, value, time):
    self.value = value 
    self.time = time


for setCoordinate in coordinates:
    raiseGPSAlarm(setCoordinate, 1, 1, 1, ConstCoordinates)
