# app/models/usuario.py
from config.db import bd, ma, app

class Empresa(bd.Model):
    __tablename__ = "empresas"
    id = bd.Column(bd.Integer, primary_key=True)
    nombre = bd.Column(bd.String(50))
    nit = bd.Column(bd.Integer)
    correo = bd.Column(bd.String(50))
    url_asociada = bd.Column(bd.String(50))
    porcentaje_ganancia = bd.Column(bd.Integer)
    iva_establecido = bd.Column(bd.Integer)
    descuento_general = bd.Column(bd.Integer)
    vigencia_licencia_fin = bd.Column(bd.String(50))

    def __init__(self, nombre, nit, correo, url_asociada, porcentaje_ganancia, iva_establecido, descuento_general, vigencia_licencia_fin):
        self.nombre = nombre
        self.nit = nit
        self.correo = correo
        self.url_asociada = url_asociada
        self.porcentaje_ganancia = porcentaje_ganancia
        self.iva_establecido = iva_establecido
        self.descuento_general = descuento_general
        self.vigencia_licencia_fin = vigencia_licencia_fin

with app.app_context():
    bd.create_all()

class EmpresaSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre', 'nit', 'correo', 'url_asociada', 'porcentaje_ganancia', 'iva_establecido', 'descuento_general', 'vigencia_licencia_fin')
