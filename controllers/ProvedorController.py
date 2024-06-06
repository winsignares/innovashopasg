from flask import Blueprint, jsonify, request
from config.db import bd
from models.ProvedorModel import Proveedor, ProveedorSchema
from models.ProductoModel import Producto, ProductoSchema
from models.InventarioProvedorModel import InventarioProveedor, InventarioProveedorSchema

proveedor_schema = ProveedorSchema()
proveedores_schema = ProveedorSchema(many=True)

productos_schema = ProductoSchema()
inventarios_proveedor_schema = InventarioProveedorSchema()

ruta_proveedor = Blueprint('ruta_proveedor', __name__)

# Ruta para obtener todos los proveedores
@ruta_proveedor.route('/proveedores', methods=['GET'])
def obtener_proveedores():
    todos_los_proveedores = Proveedor.query.all()
    resultado = proveedores_schema.dump(todos_los_proveedores)
    return jsonify(resultado)

@ruta_proveedor.route('/proveedores', methods=['POST'])
def crear_proveedor():
    nombre = request.json['nombre']
    nit = request.json['nit']
    direccion = request.json.get('direccion', '')  # Si la dirección es opcional
    estado = request.json['estado']

    nuevo_proveedor = Proveedor(nombre=nombre, nit=nit, correo=direccion, estado=estado)

    try:
        bd.session.add(nuevo_proveedor)
        bd.session.commit()
    except Exception as e:
        bd.session.rollback()
        return jsonify({'message': 'Error al crear el proveedor', 'error': str(e)}), 500

    return proveedor_schema.jsonify(nuevo_proveedor), 201

# Ruta para editar un proveedor
@ruta_proveedor.route('/provedores/<int:id>', methods=['PUT'])
def editar_proveedor(id):
    proveedor = Proveedor.query.get(id)
    if not proveedor:
        return jsonify({'message': 'Proveedor no encontrado'}), 200

    nombre = request.json['nombre']
    nit = request.json['nit']
    correo = request.json['correo']
    estado = request.json['estado']

    proveedor.nombre = nombre
    proveedor.nit = nit
    proveedor.correo = correo
    proveedor.estado = estado

    bd.session.commit()

    return jsonify({'message': 'Proveedor actualizado correctamente'}), 200

@ruta_proveedor.route('/proveedores/<int:id>/stock', methods=['GET'])
def obtener_proveedor_inventario(id):
    proveedor = Proveedor.query.get(id)
    if not proveedor:
        return jsonify({'message': 'Proveedor no encontrado'}), 404

    inventario = InventarioProveedor.query.filter_by(id_proveedor=id).all()
    productos = []
    for item in inventario:
        producto = Producto.query.get(item.id_producto)
        if producto:
            producto_data = producto.to_dict()
            producto_data['cantidad'] = item.cantidad
            productos.append(producto_data)

    proveedor_data = proveedor_schema.dump(proveedor)
    proveedor_data['productos'] = productos

    return jsonify(proveedor_data), 200