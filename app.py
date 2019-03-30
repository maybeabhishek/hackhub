from flask import Flask, render_template, jsonify, request, redirect, url_for
from motorspeed import *
app = Flask(__name__)

@app.route("/")
def renderRoot():      
	return redirect(url_for("update"))

@app.route("/sendData",methods = ['GET'])
def update():
    if request.method == 'GET':
        dataser = motser()
        data['val']=dataser[1]
        return jsonify(data)

# =========
# Start App
# =========


if __name__ == "__main__":
	app.run(debug = True, host='0.0.0.0', port=8000, passthrough_errors=True)
