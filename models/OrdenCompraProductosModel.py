# app/models/orden_compra_productos.py
from config.db import bd, ma, app

class OrdenCompraProductos(bd.Model):
    __tablename__ = "orden_compra_productos"
    id = bd.Column(bd.Integer, primary_key=True)
    id_orden_compra = bd.Column(bd.Integer, bd.ForeignKey('orden_compra.id'))
    id_producto = bd.Column(bd.Integer, bd.ForeignKey('productos.id'))
    id_proveedor = bd.Column(bd.Integer, bd.ForeignKey('proveedores.id'))
    precio_unitario = bd.Column(bd.Float)
    cantidad = bd.Column(bd.Integer)
    descuento = bd.Column(bd.Float)
    iva = bd.Column(bd.Float)

    def __init__(self, id_orden_compra, id_producto, id_proveedor, precio_unitario, cantidad, descuento, iva):
        self.id_orden_compra = id_orden_compra
        self.id_producto = id_producto
        self.id_proveedor = id_proveedor
        self.precio_unitario = precio_unitario
        self.cantidad = cantidad
        self.descuento = descuento
        self.iva = iva

with app.app_context():
    bd.create_all()

class OrdenCompraProductosSchema(ma.Schema):
    class Meta:
        fields = ('id', 'id_orden_compra', 'id_producto', 'id_proveedor', 'precio_unitario', 'cantidad', 'descuento', 'iva')
