from Modelos.PermisosRol import PermisosRol
from Modelos.Rol import Rol
from Modelos.Permisos import Permisos
from Repositorios.PermisosRolRepository import PermisosRolRepository
from Repositorios.RolRepository import RolRepository
from Repositorios.PermisosRepository import PermisosRepository
from bson import ObjectId

class PermisosRolController():
    def __init__(self):
        self.permisosRolRepositorio = PermisosRolRepository()
        self.rolRepositorio = RolRepository()
        self.permisosRepositorio = PermisosRepository()

    def index(self):
        return self.permisosRolRepositorio.findAll()

    def crear(self, infoPermisoRol, rolId, permisoId):
        nuevoPermisoRol = PermisosRol(infoPermisoRol)
        rolAsignado = Rol(self.rolRepositorio.findById(rolId))
        permisoAsignado = Permisos(self.permisosRepositorio.findById(permisoId))
        nuevoPermisoRol.rolId = rolAsignado
        nuevoPermisoRol.permisoId = permisoAsignado
        return self.permisosRolRepositorio.save(nuevoPermisoRol)

    def mostrar(self, id):
        elPermiso = PermisosRol(self.permisosRolRepositorio.findById(id))
        return elPermiso.__dict__

    def actualizar(self, id, infoPermisoRol, rolId, permisoId):
        permisoRolActual = PermisosRol(self.permisosRolRepositorio.findById(id))
        nuevoRol = Rol(self.rolRepositorio.findById(rolId))
        nuevoPermiso = Permisos(self.permisosRepositorio.findById(permisoId))
        permisoRolActual.rolId = nuevoRol
        permisoRolActual.permisoId = nuevoPermiso
        return self.permisosRolRepositorio.save(permisoRolActual)

    def borrar(self, id):
        return self.permisosRolRepositorio.delete(id)

    def validar(self, data):
        rol = data["rolId"]
        permiso = data["permisoId"]
        permisoRol = self.permisosRolRepositorio.getPermisosRol(rol)
        valores1 = []
        valores2 = []

        for x in permisoRol:
            y = x["rolId"]
            for z in y:
                a = y[z]
                valores1.append(""+a)

        for i in permisoRol:
            j = i["permisoId"]
            for k in j:
                l = j[k]
                valores2.append(""+l)

        for m in valores1:
            for n in valores2:

                if rol == m and permiso == n:
                    return self.permisosRepositorio.getListarPermisos(permiso)
                else:
                    return "No tienes permisos para acceder", 401
