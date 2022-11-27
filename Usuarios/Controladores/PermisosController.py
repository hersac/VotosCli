from Modelos.Permisos import Permisos
from Repositorios.PermisosRepository import PermisosRepository

class PermisosController():
    def __init__(self):
        self.permisosRepositorio = PermisosRepository()

    def index(self):
        return self.permisosRepositorio.findAll()

    def crear(self, infoPermiso):
        nuevoPermiso = Permisos(infoPermiso)
        return self.permisosRepositorio.save(nuevoPermiso)

    def mostrar(self, id):
        elPermiso = Permisos(self.permisosRepositorio.findById(id))
        return elPermiso.__dict__

    def actualizar(self, id, infoPermiso):
        permisoActual = Permisos(self.permisosRepositorio.findById(id))
        permisoActual.permisUrl = infoPermiso["permisUrl"]
        permisoActual.permisMethod = infoPermiso["permisMethod"]
        return self.permisosRepositorio.save(permisoActual)

    def borrar(self,id):
        return self.permisosRepositorio.delete(id)