import time, requests
from flask import Flask, render_template, jsonify, request, redirect, url_for
from department import Department
from deviceCount import devCount
from random import randint
from device import Device
from getRequest import getData
from getPi import getPi
import os

app = Flask(__name__)
dep = Department()
device = []

@app.context_processor
def inject_user():
	return dict(depID = dep.depID)



@app.route("/")
def renderRoot():
	if(not dep.depID):
	    return render_template("area.html")       
	return redirect(url_for("update"))

@app.route("/update")
def update():
    dev = devCount()
    devPi = getPi()
    for i in range(dev):
        device.append(Device(100+i,"Connected"))
    data = getData()
    print(data['val'])
    return render_template("index.html",dev = dev, devPi = devPi)

@app.route("/setDept", methods = ["POST"])
def setDevice():
	if request.method == "POST":
		dep.setDepID(request.form['depID'])
		print("Device set as: ", dep.depID)
		return redirect(url_for("renderRoot"))

@app.route("/delete")
def delete():
    out = os.popen("echo 'Disconnect\r\n' > /dev/ttyACM0").read()
    return redirect(url_for("update"))
    
@app.route("/vis")
def vis():
    return render_template("vis.html")

# =========
# Start App
# =========


if __name__ == "__main__":
	app.run(debug = True, host='0.0.0.0', port=8000, passthrough_errors=True)
