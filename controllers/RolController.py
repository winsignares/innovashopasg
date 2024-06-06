from flask import Blueprint, jsonify
from config.db import bd, ma, app

from models.RolModel import Rol, RolSchema

# rol_schema = Rol()
roles_schema = RolSchema(many=True)

ruta_roles = Blueprint('ruta_roles', __name__)

# Ruta para obtener todos los roless
@ruta_roles.route('/roles', methods=['GET'])
def obtener_roless():
    roles = Rol.query.all()
    resultado = roles_schema.dump(roles)
    return jsonify(resultado)
