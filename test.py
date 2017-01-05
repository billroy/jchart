import json
import random
import requests

url = 'http://localhost:3000/xychart'

def r():
    return random.randrange(-1000, 1000)

colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']

def rc():
    return random.choice(colors)

data = [
    {'name': 'alice', 'x': r(), 'y': r(), 'z': r(), 'color': rc()},
    {'name': 'bob', 'x': r(), 'y': r(), 'z': r(), 'color': rc()},
    {'name': 'charlie', 'x': r(), 'y': r(), 'z': r(), 'color': rc()}
]
print 'Posting:', data
status = requests.post(url,
                        data=json.dumps(data),
                        headers={'Content-Type': 'application/json'});
print 'Response:', status
