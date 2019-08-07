import subprocess, json
import requests, urllib

#RETURNS CAPACITY OF THE BATTERY IN PERCENTAGE
def batteryCapacity():
    p = subprocess.Popen(["acpi", "-V"], stdout=subprocess.PIPE)
    result = p.communicate()[0]
    arr = (result.split('\n'))[1].split(' ')
    return int(arr[4]);

def RepresentsInt(s):
    try: 
        int(s)
        return True
    except ValueError:
        return False

def totalRAM():
    p = subprocess.Popen("free", stdout=subprocess.PIPE)
    result = p.communicate()[0]
    arr = (result.split('\n'))[1].split(' ')
    while True:
        try:
            arr.remove('')
        except ValueError:
            break
    return int(arr[1])

def totalDisk():    
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
    return available

def totalCPU():
    p = subprocess.Popen("lscpu", stdout=subprocess.PIPE)
    result = p.communicate()[0]
    arr = result.split('\n')
    for line in arr:
        if line.find('name') > 0:
            words = line.split(' ')
            word_number = len(words) - 1
            return words[word_number]

data = {
    "serialNumber": 12345,
    "batteryCapacity": batteryCapacity(),
    "totalRAM": totalRAM(),
    "totalCPU": totalCPU(),
    "totalDisk": totalDisk()
}

json_data = json.dumps(data)
json_data_enc = urllib.quote(json_data, safe='')
url = 'http://localhost:8080/newsystem/' + json_data_enc
r = requests.get(url)
print r