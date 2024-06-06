from flask import Blueprint, jsonify
from models.FacturaOrdenCompraModel import FacturaOrdenCompra, FacturaOrdenCompraSchema

factura_orden_compra_schema = FacturaOrdenCompraSchema()
facturas_orden_compra_schema = FacturaOrdenCompraSchema(many=True)

ruta_factura_orden_compra = Blueprint('ruta_factura_orden_compra', __name__)

# Ruta para obtener todas las facturas de orden de compra
@ruta_factura_orden_compra.route('/facturas_orden_compra', methods=['GET'])
def obtener_facturas_orden_compra():
    todas_las_facturas_orden_compra = FacturaOrdenCompra.query.all()
    resultado = facturas_orden_compra_schema.dump(todas_las_facturas_orden_compra)
    return jsonify(resultado)
