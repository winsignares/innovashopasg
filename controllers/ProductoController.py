import os

from flask import Blueprint, jsonify, request, current_app
from config.db import bd,ma
from datetime import datetime 

from models.ProductoModel import Producto, ProductoSchema
from models.UsuarioModel import Usuario, UsuarioSchema
from models.ProductoAlternoModel import ProductoAlterno, ProductoAlternoSchema
from models.InventarioProvedorModel import InventarioProveedor, InventarioProveedorSchema
from models.ProvedorModel import Proveedor, ProveedorSchema
from models.OrdenCompraProductosModel import OrdenCompraProductos,OrdenCompraProductosSchema  
from models.OrdenCompraModel import OrdenCompra,OrdenCompraSchema   
from models.CotizacionModel import Cotizacion, CotizacionSchema
from models.CotizacionProductosModel import CotizacionProductos, CotizacionProductosSchema
from models.FacturaOrdenCompraModel import FacturaOrdenCompra, FacturaOrdenCompraSchema

producto_schema = ProductoSchema()
productos_schema = ProductoSchema(many=True)

ruta_producto = Blueprint('ruta_producto', __name__)

# Directorio para cargar imágenes
UPLOAD_FOLDER = os.path.join('static', 'imgs', 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Función para verificar si la extensión del archivo es permitida
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Ruta para cargar una imagen
@ruta_producto.route('/upload-imagen', methods=['POST'])
def upload_imagen():
    if 'imagen' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['imagen']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = file.filename
        file_path = os.path.join(current_app.root_path, UPLOAD_FOLDER, filename)
        try:
            file.save(file_path)
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        file_url = os.path.join('static', 'imgs', 'uploads', filename)
        return jsonify({"url": file_url}), 201

    return jsonify({"error": "File not allowed"}), 400


@ruta_producto.route('/actualizar/compra', methods=['POST'])
def actualizar_stock_compra():
    data = request.json
    id_producto = data.get('producto_id')
    cantidad = data.get('cantidad')

    producto = Producto.query.get(id_producto)
    if producto is None:
         return jsonify({'error': 'Producto no encontrado'}), 404

    producto.stock_actual = (producto.stock_actual-cantidad)

    inventario_proveedor = InventarioProveedor.query.filter_by(id_producto=id_producto).first()
    if not inventario_proveedor:
        return jsonify({"message": "Inventario del proveedor no encontrado"}), 404

    inventario_proveedor.cantidad =   (inventario_proveedor.cantidad-cantidad)
    bd.session.commit()
    return jsonify({'mensaje': 'Stock actualizado exitosamente'}) 


@ruta_producto.route('/actualizar', methods=['POST'])
def actualizar_stock():
    data = request.json
    id_producto = data.get('producto_id')
    cantidad = data.get('cantidad')
    id_usuario_emisor = data.get('id_usuario_emisor')
  

    producto = Producto.query.get(id_producto)
    if producto is None:
         return jsonify({'error': 'Producto no encontrado'}), 404

    producto.stock_actual = cantidad+ producto.stock_actual 

    inventario_proveedor = InventarioProveedor.query.filter_by(id_producto=id_producto).first()
    if not inventario_proveedor:
        return jsonify({"message": "Inventario del proveedor no encontrado"}), 404

    inventario_proveedor.cantidad += cantidad

    nueva_orden = OrdenCompra(
        fecha=datetime .now(),
        id_usuario_emisor=id_usuario_emisor,  # Cambiar según la lógica de tu aplicación
        estado=1
    )

    bd.session.add(nueva_orden)
    bd.session.commit()
    nueva_factura_orden_compra = FacturaOrdenCompra(
        id_orden_compra=nueva_orden.id,
        fecha=datetime.now(),
        estado=1  # Puedes ajustar el estado según tu lógica
    )

    bd.session.add(nueva_factura_orden_compra)
    bd.session.commit()

    nueva_orden_producto = OrdenCompraProductos(
        id_orden_compra=nueva_orden.id,
        id_producto=id_producto,
        id_proveedor=inventario_proveedor.id_proveedor,
        precio_unitario=producto.precio_unitario,
        cantidad=cantidad,
        descuento=producto.descuento,
        iva=producto.iva
    )

    bd.session.add(nueva_orden_producto)
    bd.session.commit()

    return jsonify({"message": "Stock y orden de compra actualizados exitosamente"}), 200

@ruta_producto.route('/productos', methods=['GET']) # Asegúrate de que la ruta coincida
def productos():
    productos = Producto.query.all()
    producto_schema = ProductoSchema(many=True)
    output = producto_schema.dump(productos)
    
    return jsonify(output)

@ruta_producto.route('/productos/<int:id>', methods=['PUT'])
def actualizar_producto(id):
    producto = Producto.query.get(id)
    
    if not producto:
        return jsonify({"error": "Producto no encontrado"}), 404

    # Actualizar los campos del producto con los datos del request
    producto.nombre = request.json.get('nombre', producto.nombre)
    producto.descripcion = request.json.get('descripcion', producto.descripcion)
    producto.codigo = request.json.get('codigo', producto.codigo)
    producto.precio_unitario = request.json.get('precio_unitario', producto.precio_unitario)
    producto.img = request.json.get('img', producto.img)
    producto.stock_actual = request.json.get('stock_actual', producto.stock_actual)
    producto.stock_minimo = request.json.get('stock_minimo', producto.stock_minimo)
    producto.descuento = request.json.get('descuento', producto.descuento)
    producto.estado = request.json.get('estado', producto.estado)
    producto.iva = request.json.get('iva', producto.iva)

    bd.session.commit()

    return jsonify({"mensaje": "Producto actualizado exitosamente", "producto": producto_schema.dump(producto)}), 200


@ruta_producto.route('/productos-listado', methods=['GET'])
def productoslistado():
 
    productos = Producto.query.all()
    
    producto_schema = ProductoSchema(many=True)
    output = producto_schema.dump(productos)
    
    return jsonify(output)
    
@ruta_producto.route('/nombres-proveedores', methods=['GET'])
def obtener_nombres_proveedores():
    try:
        # Obtener los nombres de los proveedores desde la base de datos
        proveedores = Proveedor.query.all()

        # Crear una lista para almacenar los nombres de los proveedores
        nombres_proveedores = []

        # Iterar sobre cada proveedor y obtener su nombre
        for proveedor in proveedores:
            nombre_proveedor = {
                'id': proveedor.id,
                'nombre': proveedor.nombre
            }
            # Agregar el nombre del proveedor a la lista
            nombres_proveedores.append(nombre_proveedor)

        # Devolver la lista de nombres de proveedores como respuesta
        return jsonify(nombres_proveedores), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# @ruta_producto.route('/productos/guardar', methods=['POST'])
# def guardar_producto():
    # data = request.json
    
    # nuevo_producto = Producto(
    #     nombre=data.get('nombre'),
    #     codigo=data.get('codigo'),
    #     precio_unitario=data.get('precio_unitario'),
    #     stock_actual=data.get('stock_actual'),
    #     stock_minimo=data.get('stock_minimo'),
    #     iva=data.get('iva'),
    #     img="",
    #     descripcion="",
    #     descuento=0,
    #     estado=0  
    # )
    # bd.session.add(nuevo_producto)
    bd.session.commit()

# para el stock
@ruta_producto.route('/productos-con-proveedores', methods=['GET'])
def obtener_productos_con_proveedores():
    try:
        # Obtener la lista de productos desde la base de datos
        productos = Producto.query.all()

        # Crear una lista para almacenar los datos de los productos con sus proveedores
        productos_con_proveedores = []

        # Iterar sobre cada producto y obtener su proveedor asociado
        for producto in productos:
            proveedor = None
            inventario_proveedor = InventarioProveedor.query.filter_by(id_producto=producto.id).first()
            if inventario_proveedor:
                proveedor = Proveedor.query.get(inventario_proveedor.id_proveedor)

            # Crear un diccionario con los datos del producto y su proveedor
            producto_info = {
                'id': producto.id,
                'nombre': producto.nombre,
                'stock_actual': producto.stock_actual,
                'descripcion': producto.descripcion,
                'stock_minimo': producto.stock_minimo,
                'orden_de_compra': '',  # Agrega la lógica para obtener la orden de compra si es necesario
                'proveedor': proveedor.nombre if proveedor else '',
                'proveedor_id': proveedor.id if proveedor else '',
                'precio_unitario':producto.precio_unitario,
                'iva':producto.iva
            }

            # Agregar el diccionario a la lista de productos con proveedores
            productos_con_proveedores.append(producto_info)

        # Devolver la lista combinada de productos y proveedores como respuesta
        
        return jsonify(productos_con_proveedores), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Ruta para guardar producto alterno
@ruta_producto.route('/productos-guardar', methods=['POST'])
def guardar_productos():
    data = request.json
    
    nuevo_producto = Producto(
        nombre=data.get('nombre'),
        codigo=data.get('codigo'),
        precio_unitario=data.get('precio_unitario'),
        stock_actual=data.get('stock_actual'),
        stock_minimo=data.get('stock_minimo'),
        iva=data.get('iva'),
        img=data.get('img'),
        descripcion="",
        descuento=0,
        estado=0  
    )
    id_proveedor = data.get('id_proveedor')
    cantidad = data.get('cantidad')

    bd.session.add(nuevo_producto)
    bd.session.commit()
    # Guardar en inventario proveedor
    inventario_proveedor = InventarioProveedor(id_proveedor=id_proveedor, id_producto=nuevo_producto.id, cantidad=cantidad)
    bd.session.add(inventario_proveedor)
    bd.session.commit()

    
    data = request.json
    id_producto_principal = data.get('id_producto_principal')
    ids_productos_alternos = data.get('ids_productos_alternos', [])

    for id_producto_alterno in ids_productos_alternos:
        nuevo_producto_alterno = ProductoAlterno(id_producto_principal=id_producto_principal,
                                                 id_producto_alterno=id_producto_alterno)
        bd.session.add(nuevo_producto_alterno)

    bd.session.commit()
    return jsonify({"id": nuevo_producto.id}), 201
    
@ruta_producto.route('/productos/alternos/guardar', methods=['POST'])
def guardar_producto_alterno():
    data = request.json
    id_producto_principal = data.get('id_producto_principal')
    ids_productos_alternos = data.get('ids_productos_alternos', [])

    for id_producto_alterno in ids_productos_alternos:
        nuevo_producto_alterno = ProductoAlterno(id_producto_principal=id_producto_principal,
                                                 id_producto_alterno=id_producto_alterno)
        bd.session.add(nuevo_producto_alterno)

    bd.session.commit()
    return jsonify({"message": "Productos alternos guardados exitosamente"}), 201

@ruta_producto.route('/producto/<int:id>/proveedor', methods=['GET'])
def get_proveedor_por_producto(id):
    # Código para obtener el proveedor
    proveedor_id = ''  

    # Obtener el proveedor si existe
    inventario_proveedor = InventarioProveedor.query.filter_by(id_producto=id).first()
    if inventario_proveedor:
        proveedor = Proveedor.query.get(inventario_proveedor.id_proveedor)
        if proveedor:
            proveedor_id = str(proveedor.id)  # Convertir el ID del proveedor a cadena

    # Devolver solo el ID del proveedor como una cadena
    return proveedor_id, 200