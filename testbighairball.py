import datetime
import json
import math
import random
import requests

url = 'http://localhost:3000/hairball'

def r():
    #return random.randrange(-1000, 1000)
    magnitude = random.randrange(0, 1000)
    magnitude = (magnitude * magnitude) / 1000
    sign = random.choice([1, -1])
    return round((magnitude * sign) / 1000, 3)

colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']

def rc():
    return random.choice(colors)

def rl():
    return random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ')

def rt():
    return rl() + rl() + rl() + rl()

num_companies = 500
companies = []
for i in range(num_companies):
    new_company = {'ticker': rt(), 'coords': [r(), r(), r()], 'color': rc()}
    print('New company:', new_company)
    companies.append(new_company)

num_dates = 1000
dates = []
date = datetime.date(2010,1,1)

x = 0.
y = 0.
z = 0.

for i in range(num_dates):
    x = x + r()/10
    y = y + r()/10
    z = z + r()/100 + .00001
    new_date = {'label': str(date), 'coords': [round(x, 3), round(y, 3), round(z, 3)]}
    dates.append(new_date)
    date += datetime.timedelta(days=1)

chart_spec = {
    'title': 'Test data generated by testbighairball.py',
    'banner': 'job:xyz54 iteration:332 chi^2: 332.53',
    'companies': companies,
    'dates': dates
}

payload = json.dumps(chart_spec)
print('Data length:', len(payload))
#print 'Posting:', data
with open('hairball-generated.json', 'w') as f:
    f.write(payload)

status = requests.post(url,
                        data=payload,
                        headers={'Content-Type': 'application/json'});
print('Response:', status)
