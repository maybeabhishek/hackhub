from flask import Flask, render_template, jsonify, request, redirect, url_for

app = Flask(__name__)

@app.route("/")
def renderRoot():      
	return redirect(url_for("update"))

@app.route("/sendData",method = ['GET'])
def update():
    if request.method == 'GET':
        data = {}
        data['val']=4
        return jsonify(data)

# =========
# Start App
# =========


if __name__ == "__main__":
	app.run(debug = True, host='0.0.0.0', port=8000, passthrough_errors=True)
