from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
import json
from waitress import serve
import datetime
import requests
import re
from flask_jwt_extended import create_access_token, verify_jwt_in_request
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

app = Flask(__name__)
cors = CORS(app)

app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)

@app.route("/login", methods=["POST"])
def create_token():
    data = request.get_json()
    #headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"]+'/validacion'
    response = requests.post(url, json=data)
    if response.status_code == 200:
        user = response.json()
        for x in user:
            expires = datetime.timedelta(seconds=60 * 60 * 24)
            access_token = create_access_token(identity=x["_id"], expires_delta=expires)
            return jsonify({"token": access_token, "_id": x["_id"], "rol":x["rol"]["rolName"], "email":x["email"], "passwd":x["passwd"], "rolId":x["rol"]["_id"]})
    else:
        return jsonify({"msg": "Bad username or password"}), 401

@app.route("/registrar", methods=["POST"])
def registrarse():
    data = request.get_json()
    url = dataConfig["url-backend-security"]+'/addUsuario/rol/636f152f20aa2b3be79c14cc'
    response = requests.post(url, json=data)
    if response.status_code == 200:
        user = response.json()
        return user
    else:
        return jsonify({"msg": "Bad username or password"}), 401



'''--------------------------------------------------------------------'''


@app.route("/", methods=['GET'])
def test():
    json = {}
    json["message"] = "Server running ..."
    return jsonify(json)


def loadFileConfig():
    with open('config.json') as f:
        data = json.load(f)
    return data


if __name__ == '__main__':
    dataConfig = loadFileConfig()
    print("Server running : "+"http://"+dataConfig["url-backend"]+":" +
          str(dataConfig["port"]))
    serve(app, host=dataConfig["url-backend"], port=dataConfig["port"])
