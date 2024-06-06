# app/models/cotizacion.py
from config.db import bd, ma, app

class Cotizacion(bd.Model):
    __tablename__ = "cotizaciones"
    id = bd.Column(bd.Integer, primary_key=True)
    id_vendedor = bd.Column(bd.Integer, bd.ForeignKey('usuarios.id'))
    id_cliente = bd.Column(bd.Integer, bd.ForeignKey('usuarios.id'))
    detalles = bd.Column(bd.String(200))
    valor_total = bd.Column(bd.Float)
    fecha = bd.Column(bd.Date)
    estado = bd.Column(bd.Integer)

    def __init__(self, id_vendedor, id_cliente, detalles, valor_total, fecha, estado):
        self.id_vendedor = id_vendedor
        self.id_cliente = id_cliente
        self.detalles = detalles
        self.valor_total = valor_total
        self.fecha = fecha
        self.estado = estado

with app.app_context():
    bd.create_all()

class CotizacionSchema(ma.Schema):
    class Meta:
        fields = ('id', 'id_vendedor', 'id_cliente', 'detalles', 'valor_total', 'fecha', 'estado')
