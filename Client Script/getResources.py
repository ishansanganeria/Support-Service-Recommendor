##################################################################################################
############## PRINTS A JSON OBJECT CONTAINING DETAILS ABOUT SYSTEM RESOURCE STATUS ##############
##################################################################################################

import subprocess, json
import requests, urllib

#RETURNS CAPACITY OF THE BATTERY IN PERCENTAGE
def batteryLife():
    p = subprocess.Popen(["acpi", "-V"], stdout=subprocess.PIPE)
    result = p.communicate()[0]
    arr = (result.split('\n'))[1].split(' ')
    arr_len = len(arr)
    battery_capacity = arr[arr_len-1]
    ind = battery_capacity.find('%')
    return int(battery_capacity[:ind])

def temperature():
    p = subprocess.Popen("sensors", stdout=subprocess.PIPE)
    result = p.communicate()[0]
    arr = (result.split('\n'))
    count = 0
    for x in arr:
        count = count + 1
        if x.find('ISA adapter') != -1:
            break
    core_temperature = (arr[count].split(' '))[4]
    core_temperature_len = len(core_temperature)
    return float(core_temperature[1:5])

#TELLS WHETHER A STRING IS A NUMBER
def RepresentsInt(s):
    try: 
        int(s)
        return True
    except ValueError:
        return False

#RETURN THE PERCENTAGE OF RAM BEING USED
def ramStatus():
    p = subprocess.Popen("free", stdout=subprocess.PIPE)
    result = p.communicate()[0]
    arr = (result.split('\n'))[1].split(' ')
    flag  = 0
    for x in arr:
        if RepresentsInt(x):
            if flag == 0:
                total = int(x,10)
                flag = 1
            elif flag == 1:
                used = int(x,10)
                break
    return int((float(used)/total)*100)

#RETURNS THE PERCENTAGE OF CPU BEING USED
def cpuStatus():
    p = subprocess.Popen("mpstat", stdout=subprocess.PIPE)
    result = p.communicate()[0]
    arr = (result.split('\n'))
    arr_len = len(arr)
    arr = arr[arr_len-2].split(' ')
    while True:
        try:
            arr.remove('')
        except ValueError:
            break
    return int(float(arr[3]))

#RETURNS THE PERCENTAGE OF HDD/SDD BEING USED
def diskStatus():    
    p = subprocess.Popen("df", stdout=subprocess.PIPE)
    result = p.communicate()[0]
    arr = result.split('\n')
    arr_len = len(arr) - 1
    available = 0
    used = 0

    for x in range(1,arr_len):
        line =  arr[x].split(' ')
        line = list(line)
        while True:
            try:
                line.remove('')
            except ValueError:
                break
        available += int(line[1])
        used += int(line[2])
    
    return int(((float(used))/available)*100)

data = {
    "serialNumber": 12345,
    "batteryLife": batteryLife(),
    "temperature": temperature(),
    "ram": ramStatus(),
    "cpu": cpuStatus(),
    "disk": diskStatus()
}

json_data = json.dumps(data)
json_data_enc = urllib.quote(json_data, safe='')
url = 'http://localhost:8080/notification/' + json_data_enc
r = requests.get(url)
print r