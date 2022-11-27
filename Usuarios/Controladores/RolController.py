from Modelos.Rol import Rol
from Repositorios.RolRepository import RolRepository

class RolController():
    def __init__(self):
        self.rolRepositorio = RolRepository()

    def index(self):
        return self.rolRepositorio.findAll()

    def crear(self, infoRol):
        nuevoRol = Rol(infoRol)
        return self.rolRepositorio.save(nuevoRol)

    def mostrar(self, id):
        elRol = Rol(self.rolRepositorio.findById(id))
        return elRol.__dict__

    def actualizar(self, id, infoRol):
        rolActual = Rol(self.rolRepositorio.findById(id))
        rolActual.rolName = infoRol["rolName"]
        return self.rolRepositorio.save(rolActual)

    def borrar(self,id):
        return self.rolRepositorio.delete(id)
