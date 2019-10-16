import json
import requests

url = 'http://localhost:3000/hairball'

companiesFilename = 'for_ticker.txt'
companiesPayload = ''
with open(companiesFilename, 'r') as f:
    companiesPayload = f.read()
print("Companies payload length:", len(companiesPayload))
companies = json.loads(companiesPayload)
companiesOut = []
for key in companies:
    companiesOut.append({
        'ticker': companies[key]['label'],
        'coords': [companies[key]['dimension']['0'], companies[key]['dimension']['1'], 0],
        'log2multiplier': companies[key]['log2multiplier'],
        'major': companies[key]['major'],
        'ratio': companies[key]['ratio'],
        'name': companies[key]['name'],
        'color': companies[key]['color'],
        'change_as_pct': companies[key]['change_as_pct'],
        'minor': companies[key]['minor']
    })
print('Companies loaded: ', len(companiesOut))

datesFilename = 'for_date.txt'
datesPayload = ''
with open(datesFilename, 'r') as f:
    datesPayload = f.read()
print("Dates payload length:", len(datesPayload))
dates = json.loads(datesPayload)
datesOut = []
for key in dates:
    datesOut.append({
        'label': dates[key]['label'],
        'coords': [dates[key]['dimension']['0'], dates[key]['dimension']['1'], 0],
        'log2multiplier': dates[key]['log2multiplier']
    })
print('Dates loaded: ', len(datesOut));

# sort the datesOut array by label
datesOut.sort(key = lambda x: x['label'])

chart_spec = {
    'title': 'hairball explorer',
    'banner': 'files: ' + companiesFilename + ' ' + datesFilename,
    'companies': companiesOut,
    'dates': datesOut
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
