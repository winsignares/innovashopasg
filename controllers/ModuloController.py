from flask import Blueprint, jsonify
from models.ModuloModel import Modulo, ModuloSchema

modulo_schema = ModuloSchema()
modulos_schema = ModuloSchema(many=True)

ruta_modulo = Blueprint('ruta_modulo', __name__)

# Ruta para obtener todos los módulos
@ruta_modulo.route('/modulos', methods=['GET'])
def obtener_modulos():
    todos_los_modulos = Modulo.query.all()
    resultado = modulos_schema.dump(todos_los_modulos)
    return jsonify(resultado)
