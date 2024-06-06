# app/models/rol.py
from config.db import bd, ma, app

class Rol(bd.Model):
    __tablename__ = "roles"
    id = bd.Column(bd.Integer, primary_key=True)
    rol = bd.Column(bd.String(50))

    def __init__(self, rol):
        self.rol = rol

with app.app_context():
    bd.create_all()

class RolSchema(ma.Schema):
    class Meta:
        fields = ('id', 'rol')
