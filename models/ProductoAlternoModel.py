# app/models/producto.py
from config.db import bd, ma, app

class ProductoAlterno(bd.Model):
    __tablename__ = "productos_alternos"
    id = bd.Column(bd.Integer, primary_key=True)
    id_producto_principal = bd.Column(bd.Integer, bd.ForeignKey('productos.id'))
    id_producto_alterno = bd.Column(bd.Integer, bd.ForeignKey('productos.id'))

    def __init__(self, id_producto_principal, id_producto_alterno):
        self.id_producto_principal = id_producto_principal
        self.id_producto_alterno = id_producto_alterno

with app.app_context():
    bd.create_all()

class ProductoAlternoSchema(ma.Schema):
    class Meta:
        fields = ('id', 'id_producto_principal', 'id_producto_alterno')
