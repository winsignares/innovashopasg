from flask import Blueprint, jsonify
from models.CotizacionProductosModel import CotizacionProductos, CotizacionProductosSchema

cotizacion_productos_schema = CotizacionProductosSchema()
cotizacion_productos_schema_many = CotizacionProductosSchema(many=True)

ruta_cotizacion_productos = Blueprint('ruta_cotizacion_productos', __name__)

# Ruta para obtener los productos de una cotización por su ID de cotización
@ruta_cotizacion_productos.route('/cotizacion_productos/<int:id_cotizacion>', methods=['GET'])
def obtener_productos_de_cotizacion(id_cotizacion):
    productos_de_cotizacion = CotizacionProductos.query.filter_by(id_cotizacion=id_cotizacion).all()
    resultado = cotizacion_productos_schema_many.dump(productos_de_cotizacion)
    return jsonify(resultado)
