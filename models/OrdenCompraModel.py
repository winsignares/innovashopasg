# app/models/orden_compra.py
from config.db import bd, ma, app

class OrdenCompra(bd.Model):
    __tablename__ = "orden_compra"
    id = bd.Column(bd.Integer, primary_key=True)
    fecha = bd.Column(bd.Date)
    id_usuario_emisor = bd.Column(bd.Integer, bd.ForeignKey('usuarios.id'))
    estado = bd.Column(bd.Integer)

    def __init__(self, fecha, id_usuario_emisor, estado):
        self.fecha = fecha
        self.id_usuario_emisor = id_usuario_emisor
        self.estado = estado

with app.app_context():
    bd.create_all()

class OrdenCompraSchema(ma.Schema):
    class Meta:
        fields = ('id', 'fecha', 'id_usuario_emisor', 'estado')
