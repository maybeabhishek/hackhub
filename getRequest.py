import requests

def getData():
    try:
        URL = "http://172.16.45.14:8000/sendData"
        r = requests.get(url = URL) 
        data = r.json()
        return data
    except:
        return '404'
