# app/models/inventario_proveedor.py
from config.db import bd, ma, app

class InventarioProveedor(bd.Model):
    __tablename__ = "inventario_proveedor"
    id = bd.Column(bd.Integer, primary_key=True)
    id_proveedor = bd.Column(bd.Integer, bd.ForeignKey('proveedores.id'))
    id_producto = bd.Column(bd.Integer, bd.ForeignKey('productos.id'))
    cantidad = bd.Column(bd.Integer)

    def __init__(self, id_proveedor, id_producto, cantidad):
        self.id_proveedor = id_proveedor
        self.id_producto = id_producto
        self.cantidad = cantidad

with app.app_context():
    bd.create_all()

class InventarioProveedorSchema(ma.Schema):
    class Meta:
        fields = ('id', 'id_proveedor', 'id_producto', 'cantidad')
