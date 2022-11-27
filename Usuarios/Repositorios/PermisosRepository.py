from Repositorios.InterfaceRepository import InterfaceRepository
from Modelos.Permisos import Permisos
from bson import ObjectId

class PermisosRepository(InterfaceRepository[Permisos]):
    def getListarPermisos(self, permisoId):
        consulta = {"_id":ObjectId(permisoId)}
        print("desde el repositorio de permisos")
        print(consulta)
        print(self.query(consulta))
        return self.query(consulta)