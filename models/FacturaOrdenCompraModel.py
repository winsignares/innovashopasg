# app/models/factura_orden_compra.py
from config.db import bd, ma, app

class FacturaOrdenCompra(bd.Model):
    __tablename__ = "factura_orden_compra"
    id = bd.Column(bd.Integer, primary_key=True)
    id_orden_compra = bd.Column(bd.Integer, bd.ForeignKey('orden_compra.id'))
    fecha = bd.Column(bd.Date)
    estado = bd.Column(bd.Integer)

    def __init__(self, id_orden_compra, fecha, estado):
        self.id_orden_compra = id_orden_compra
        self.fecha = fecha
        self.estado = estado

with app.app_context():
    bd.create_all()

class FacturaOrdenCompraSchema(ma.Schema):
    class Meta:
        fields = ('id', 'id_orden_compra', 'fecha', 'estado')
