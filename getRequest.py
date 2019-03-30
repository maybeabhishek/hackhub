import requests

def getData():
    URL = "http://172.16.45.14:8000/sendData"
    r = requests.get(url = URL) 
    data = r.json()
    return data
