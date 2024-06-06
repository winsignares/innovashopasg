# app/models/proveedor.py
from config.db import bd, ma, app

class Proveedor(bd.Model):
    __tablename__ = "proveedores"
    id = bd.Column(bd.Integer, primary_key=True)
    nombre = bd.Column(bd.String(50))
    nit = bd.Column(bd.String(50))
    correo = bd.Column(bd.String(50))
    estado = bd.Column(bd.String(50))

    def __init__(self, nombre, nit, correo, estado):
        self.nombre = nombre
        self.nit = nit
        self.correo = correo
        self.estado = estado

with app.app_context():
    bd.create_all()

class ProveedorSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre', 'nit', 'correo', 'estado')
