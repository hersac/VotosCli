from Repositorios.InterfaceRepository import InterfaceRepository
from Modelos.Usuario import Usuario

from bson import ObjectId

class UsuarioRepository(InterfaceRepository[Usuario]):
    def getListarUsuarios(self, email):
        consulta = {"email": email}
        return self.query(consulta)
