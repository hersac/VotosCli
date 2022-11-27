from Modelos.Usuario import Usuario
from Modelos.Rol import Rol
from Repositorios.UsuarioRepository import UsuarioRepository
from Repositorios.RolRepository import RolRepository


class UsuarioController():
    def __init__(self):
        self.usuarioRepositorio = UsuarioRepository()
        self.rolRepositorio = RolRepository()

    def index(self):
        return self.usuarioRepositorio.findAll()

    def crear(self, infoUsuario, rolId):
        nuevoUsuario = Usuario(infoUsuario)
        rolAsignado = Rol(self.rolRepositorio.findById(rolId))
        nuevoUsuario.rol = rolAsignado
        return self.usuarioRepositorio.save(nuevoUsuario)

    def mostrar(self, id):
        elUsuario = Usuario(self.usuarioRepositorio.findById(id))
        return elUsuario.__dict__

    def actualizar(self, id, infoUsuario, rolId):
        usuarioActual = Usuario(self.usuarioRepositorio.findById(id))
        rolNuevo = Rol(self.rolRepositorio.findById(rolId))
        usuarioActual.rol = rolNuevo
        usuarioActual.email = infoUsuario["email"]
        usuarioActual.passwd = infoUsuario["passwd"]
        return self.usuarioRepositorio.save(usuarioActual)

    def borrar(self,id):
        return self.usuarioRepositorio.delete(id)

    def login(self, data):
        email = data["email"]
        password = data["passwd"]
        usuario = self.usuarioRepositorio.getListarUsuarios(email)

        for x in usuario:
            if email == x["email"] and password == x["passwd"]:
                return self.usuarioRepositorio.getListarUsuarios(data["email"])

            else:
                return "Usuario o Contraseña incorrecto", 401

