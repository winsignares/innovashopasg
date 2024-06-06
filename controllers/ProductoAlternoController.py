from flask import Blueprint, jsonify
from models.ProductoAlternoModel import ProductoAlterno, ProductoAlternoSchema

# producto_schema = ProductoAlterno()
productos_schema = ProductoAlternoSchema(many=True)

ruta_producto_alterno = Blueprint('ruta_producto_alterno', __name__)

# Ruta para obtener todos los productos alternos
@ruta_producto_alterno.route('/productos_alternos', methods=['GET'])
def obtener_productos_alternos():
    todos_los_productos_alternos = ProductoAlternoSchema.query.all()
    resultado = productos_schema.dump(todos_los_productos_alternos)
    return jsonify(resultado)
