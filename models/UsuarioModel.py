# app/models/usuario.py
from config.db import bd, ma, app

class Usuario(bd.Model):
    __tablename__ = "usuarios"
    id = bd.Column(bd.Integer, primary_key=True)
    rol_id = bd.Column(bd.Integer, bd.ForeignKey('roles.id'))
    nombre = bd.Column(bd.String(50))
    apellidos = bd.Column(bd.String(50))
    usuario = bd.Column(bd.String(50))
    contraseña = bd.Column(bd.String(50))
    cedula = bd.Column(bd.String(50))
    direccion = bd.Column(bd.String(100))
    telefono = bd.Column(bd.String(15))

    def __init__(self, rol_id, nombre, apellidos, usuario, contraseña, cedula, direccion, telefono):
        self.rol_id = rol_id
        self.nombre = nombre
        self.apellidos = apellidos
        self.usuario = usuario
        self.contraseña = contraseña
        self.cedula = cedula
        self.direccion = direccion
        self.telefono = telefono

with app.app_context():
    bd.create_all()

class UsuarioSchema(ma.Schema):
    class Meta:
        fields = ('id', 'rol_id', 'nombre', 'apellidos', 'usuario', 'contraseña', 'cedula', 'direccion', 'telefono')
