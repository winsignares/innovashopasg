# app/models/usuario.py
from config.db import bd, ma, app

class Modulo(bd.Model):
    __tablename__ = "modulos"
    id = bd.Column(bd.Integer, primary_key=True)
    nombre = bd.Column(bd.String(50))
    descripcion = bd.Column(bd.String(50))

    def __init__(self, nombre, descripcion):
        self.nombre = nombre
        self.descripcion = descripcion

with app.app_context():
    bd.create_all()

class ModuloSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre', 'descripcion')
