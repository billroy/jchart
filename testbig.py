import json
import math
import random
import requests

url = 'http://localhost:3000/xychart'

def r():
    return random.randrange(-1000, 1000)

colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']

def rc():
    return random.choice(colors)

fn = ['alice', 'bob', 'charlie', 'dave', 'ed', 'fred', 'george']
ln = ['zulu', 'yankee', 'xray', 'whiskey', 'victor', 'uniform']

def rn():
    return random.choice(fn) + '.' + random.choice(ln) + '.' + str(random.randrange(1000,9999))

data = []
i = 0
n = 1000

while (i < n):
    i= i + 1
    new_item = {'name': rn(), 'x': r(), 'y': r(), 'z': r(), 'color': rc()}
    print 'New item:', new_item
    data.append(new_item)

payload = json.dumps(data)
print 'Data length:', len(payload)
#print 'Posting:', data

status = requests.post(url,
                        data=payload,
                        headers={'Content-Type': 'application/json'});
print 'Response:', status
