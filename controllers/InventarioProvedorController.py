from flask import Blueprint, jsonify, request
from config.db import bd
from models.InventarioProvedorModel import InventarioProveedor, InventarioProveedorSchema

inventario_proveedor_schema = InventarioProveedorSchema()
inventarios_proveedor_schema = InventarioProveedorSchema(many=True)

ruta_inventario_proveedor = Blueprint('ruta_inventario_proveedor', __name__)

# Ruta para obtener el inventario de un proveedor por su ID de proveedor
@ruta_inventario_proveedor.route('/inventario_proveedor/<int:id_proveedor>', methods=['GET'])
def obtener_inventario_proveedor(id_proveedor):
    inventario_proveedor = InventarioProveedor.query.filter_by(id_proveedor=id_proveedor).all()
    resultado = inventarios_proveedor_schema.dump(inventario_proveedor)
    return jsonify(resultado)

@ruta_inventario_proveedor.route('/inventario_proveedor/agregar_stock', methods=['POST'])
def agregar_stock_inventario_proveedor():
    # Obtener los datos del cuerpo de la solicitud
    data = request.json
    id_proveedor = data.get('id_provedor')
    id_producto = data.get('id_producto')
    cantidad = data.get('cantidad')

    # Verificar si el producto ya existe en el inventario del proveedor
    inventario_existente = InventarioProveedor.query.filter_by(id_proveedor=id_proveedor, id_producto=id_producto).first()

    if inventario_existente:
        # Si el producto ya existe, sumar la cantidad recibida a la cantidad actual
        inventario_existente.cantidad += int(cantidad)
    # else:
    #     # Si el producto no existe, crear un nuevo registro en el inventario del proveedor
    #     nuevo_inventario = InventarioProveedor(id_proveedor=id_proveedor, id_producto=id_producto, cantidad=cantidad)
    #     bd.session.add(nuevo_inventario)

    # Guardar los cambios en la base de datos
    bd.session.commit()

    return jsonify({'message': 'Stock agregado exitosamente'}), 200