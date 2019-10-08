import requests

url = 'http://localhost:3000/hairball'
filename = 'hairball.json'
payload = ''
with open(filename, 'r') as f:
    payload = f.read()
print("Payload length:", len(payload))
status = requests.post(url,
                        data=payload,
                        headers={'Content-Type': 'application/json'});
print('Response:', status)
