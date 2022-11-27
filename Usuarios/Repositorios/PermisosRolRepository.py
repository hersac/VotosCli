from Repositorios.InterfaceRepository import InterfaceRepository
from Modelos.PermisosRol import PermisosRol
from bson.dbref import DBRef
from bson import ObjectId

class PermisosRolRepository(InterfaceRepository[PermisosRol]):
    def getPermisosRol(self, rolId):
        consulta = {"rolId" : DBRef("rol", ObjectId(rolId))}
        return self.query(consulta)