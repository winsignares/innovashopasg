# app/models/cotizacion_productos.py
from config.db import bd, ma, app

class CotizacionProductos(bd.Model):
    __tablename__ = "cotizacion_productos"
    id = bd.Column(bd.Integer, primary_key=True)
    id_cotizacion = bd.Column(bd.Integer, bd.ForeignKey('cotizaciones.id'))
    id_producto = bd.Column(bd.Integer, bd.ForeignKey('productos.id'))
    id_proveedor = bd.Column(bd.Integer, bd.ForeignKey('proveedores.id'))
    precio_unitario = bd.Column(bd.Float)
    cantidad = bd.Column(bd.Integer)
    descuento = bd.Column(bd.Float)
    iva = bd.Column(bd.Float)

    def __init__(self, id_cotizacion, id_producto, id_proveedor, precio_unitario, cantidad, descuento, iva):
        self.id_cotizacion = id_cotizacion
        self.id_producto = id_producto
        self.id_proveedor = id_proveedor
        self.precio_unitario = precio_unitario
        self.cantidad = cantidad
        self.descuento = descuento
        self.iva = iva

with app.app_context():
    bd.create_all()

class CotizacionProductosSchema(ma.Schema):
    class Meta:
        fields = ('id', 'id_cotizacion', 'id_producto', 'id_proveedor', 'precio_unitario', 'cantidad', 'descuento', 'iva')
