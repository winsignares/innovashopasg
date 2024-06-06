from flask import Blueprint, jsonify
from models.OrdenCompraProductosModel import OrdenCompraProductos, OrdenCompraProductosSchema

orden_compra_productos_schema = OrdenCompraProductosSchema()
ordenes_compra_productos_schema = OrdenCompraProductosSchema(many=True)

ruta_orden_compra_productos = Blueprint('ruta_orden_compra_productos', __name__)

# Ruta para obtener los productos de una orden de compra por su ID de orden de compra
@ruta_orden_compra_productos.route('/orden_compra_productos/<int:id_orden_compra>', methods=['GET'])
def obtener_productos_de_orden_compra(id_orden_compra):
    productos_de_orden_compra = OrdenCompraProductos.query.filter_by(id_orden_compra=id_orden_compra).all()
    resultado = ordenes_compra_productos_schema.dump(productos_de_orden_compra)
    return jsonify(resultado)
