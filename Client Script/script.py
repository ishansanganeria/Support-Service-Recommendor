import subprocess

#RETURNS CAPACITY OF THE BATTERY IN PERCENTAGE
def batteryCapacity():
    p = subprocess.Popen(["acpi", "-V"], stdout=subprocess.PIPE)
    result = p.communicate()[0]
    arr = (result.split('\n'))[1].split(' ')
    arr_len = len(arr)
    battery_capacity = arr[arr_len-1]
    return battery_capacity

#RETURNS TEMPERATURE OF THE SYSTEM IN CELCIUS
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
    return core_temperature[1:5]

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
    return int(float(arr[8]))

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
            line_len = len(line)
            try:
                line.remove('')
            except ValueError:
                break
        available += int(line[1])
        used += int(line[2])
    
    return int(((float(used))/available)*100)

