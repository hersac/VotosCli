from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
import json
from waitress import serve

app = Flask(__name__)
cors = CORS(app)

'''-----------------Views Usuario-----------------'''

from Controladores.UsuarioController import UsuarioController
usuarioController = UsuarioController()

@app.route("/", methods=['GET'])
def test():
    json = {}
    json["message"]="Corriendo servidor..."
    return jsonify(json)

@app.route("/usuarios", methods=['GET'])
def getUsuarios():
    json=usuarioController.index()
    return jsonify(json)

@app.route("/usuario/<string:id>", methods=['GET'])
def getUsuario(id):
    json=usuarioController.mostrar(id)
    return jsonify(json)

'''Metodo Post'''
@app.route("/addUsuario/rol/<string:rolId>", methods=['POST'])
def crearUsuario(rolId):
    data = request.get_json()
    json = usuarioController.crear(data, rolId)
    return jsonify(json)

@app.route("/validacion", methods=['POST'])
def login():
    data = request.get_json()
    json=usuarioController.login(data)
    return jsonify(json)

'''Metodo Put'''
@app.route("/updateUsuario/<string:id>/rol/<string:rolId>", methods=['PUT'])
def actualizarUsuario(id, rolId):
    data=request.get_json()
    print(data)
    json=usuarioController.actualizar(id, data, rolId)
    return jsonify(json)

'''Metodo Delete'''
@app.route("/borrarUsuario/<string:id>", methods=['DELETE'])
def eliminarUsuario(id):
    json=usuarioController.borrar(id)
    return jsonify(json)

'''-----------------Views Roles-----------------'''

from Controladores.RolController import RolController
rolController = RolController()

'''Metodo Get'''
@app.route("/roles", methods=['GET'])
def getRoles():
    json=rolController.index()
    return jsonify(json)

@app.route("/rol/<string:id>", methods=['GET'])
def getRol(id):
    json=rolController.mostrar(id)
    return jsonify(json)

'''Metodo Post'''
@app.route("/addRol/", methods=['POST'])
def crearRol():
    data = request.get_json()
    json = rolController.crear(data)
    return jsonify(json)

'''Metodo Put'''
@app.route("/updateRol/<string:id>", methods=['PUT'])
def actualizarRol(id):
    data=request.get_json()
    json=rolController.actualizar(id,data)
    return jsonify(json)

'''Metodo Delete'''
@app.route("/borrarRol/<string:id>", methods=['DELETE'])
def eliminarRol(id):
    json=rolController.borrar(id)
    return jsonify(json)



'''-----------------Views Permisos-----------------'''

from Controladores.PermisosController import PermisosController
permisosController=PermisosController()

'''Metodo Get'''
@app.route("/permisos", methods=['GET'])
def getPermisos():
    json=permisosController.index()
    return jsonify(json)

@app.route("/permiso/<string:id>", methods=['GET'])
def getPermiso(id):
    json=permisosController.mostrar(id)
    return jsonify(json)

'''Metodo Post'''
@app.route("/addPermiso", methods=['POST'])
def crearPermiso():
    data=request.get_json()
    json=permisosController.crear(data)
    return jsonify(json)

'''Metodo Put'''
@app.route("/updatePermiso/<string:id>", methods=['PUT'])
def actualizarPermiso(id):
    data=request.get_json()
    json=permisosController.actualizar(id,data)
    return jsonify(json)

'''Metodo Delete'''
@app.route("/borrarPermiso/<string:id>", methods=['DELETE'])
def eliminarPermiso(id):
    json=permisosController.borrar(id)
    return jsonify(json)



'''-----------------Views PermisosRol-----------------'''

from Controladores.PermisosRolController import PermisosRolController
permisosRolController = PermisosRolController()

'''Metodo Get'''
@app.route("/permisosRoles", methods=['GET'])
def getPermisosRol():
    json=permisosRolController.index()
    return jsonify(json)

@app.route("/permisoRol/<string:id>", methods=['GET'])
def getPermisoRol(id):
    json=permisosRolController.mostrar(id)
    return jsonify(json)

'''Metodo Post'''
@app.route("/addPermisoRol/rol/<string:rolId>/permiso/<permisoId>", methods=['POST'])
def crearPermisoRol(rolId, permisoId):
    data=request.get_json()
    json=permisosRolController.crear(data, rolId, permisoId)
    return jsonify(json)

@app.route("/validarPermisos", methods=['POST'])
def validarPermisos():
    data = request.get_json()
    json=permisosRolController.validar(data)
    return jsonify(json)

'''Metodo Put'''
@app.route("/updatePermisoRol/<string:id>/rol/<string:rolId>/permiso/<string:permisoId>", methods=['PUT'])
def actualizarPermisoRol(id, rolId, permisoId):
    data=request.get_json()
    json=permisosRolController.actualizar(id,data, rolId, permisoId)
    return jsonify(json)

'''Metodo Delete'''
@app.route("/borrarPermisoRol/<string:id>", methods=['DELETE'])
def eliminarPermisoRol(id):
    json=permisosRolController.borrar(id)
    return jsonify(json)


'''------------------------------------------------'''

def cargarArchivoConf():
    with open('config.json') as archivo:
        data = json.load(archivo)
    return data

if __name__=='__main__':
    dataConfig = cargarArchivoConf()
    print("Corriendo servidor : "+"http://"+dataConfig["host"]+":"+str(dataConfig["port"]))
    serve(app,host=dataConfig["host"],port=dataConfig["port"])


