# app/models/factura_cotizacion.py
from config.db import bd, ma, app

class FacturaCotizacion(bd.Model):
    __tablename__ = "factura_cotizacion"
    id = bd.Column(bd.Integer, primary_key=True)
    id_cotizacion = bd.Column(bd.Integer, bd.ForeignKey('cotizaciones.id'))
    fecha = bd.Column(bd.Date)
    estado = bd.Column(bd.Integer)

    def __init__(self, id_cotizacion, fecha, estado):
        self.id_cotizacion = id_cotizacion
        self.fecha = fecha
        self.estado = estado

with app.app_context():
    bd.create_all()

class FacturaCotizacionSchema(ma.Schema):
    class Meta:
        fields = ('id', 'id_cotizacion', 'fecha', 'estado')
