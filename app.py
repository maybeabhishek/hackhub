import time, requests
from flask import Flask, render_template, jsonify, request, redirect, url_for
from department import Department
from deviceCount import devCount

app = Flask(__name__)
dep = Department()

@app.context_processor
def inject_user():
		return dict(depID = dep.depID)
dev = devCount()
@app.route("/")
def renderRoot():
	if(not dep.depID):
	    return render_template("area.html")       
	return render_template("index.html", dev = dev)

@app.route("/setDept", methods = ["POST"])
def setDevice():
	if request.method == "POST":
		dep.setDepID(request.form['depID'])
		print("Device set as: ", dep.depID)
		return redirect(url_for("renderRoot"))

# =========
# Start App
# =========


if __name__ == "__main__":
	app.run(debug = True, host='0.0.0.0', port=8080, passthrough_errors=True)
